// /=====================================================================\
//	Globals ~ all accessors
// \=====================================================================/
const webglArea = document.getElementById('webglArea');
const webglCanvas = document.getElementById('webglCanvas');

const blocklyArea = document.getElementById('blocklyArea');
const blocklyDiv = document.getElementById('blocklyDiv');

const checkExp = document.getElementById('checkExp');

const valDex = {
	'camera': new Map(),
	'geometry': new Map(),
	'light': new Map(),
	'material': new Map(),
	'mesh': new Map()
};

var workspace;
var elapsed_time = 0;
var user_resources = {};

var scene = new THREE.Scene();
var current_camera;
var renderer;
var anim_id;
var shadow_mapping = false;
var global_mixer;
var global_clock = new THREE.Clock();

Blockly.JavaScript.addReservedWords('\
	webglArea,\
	webglCanvas,\
	blocklyArea,\
	blocklyDiv,\
	checkExp,\
	valDex,\
	workspace,\
	elapsed_time,\
	scene,\
	current_camera,\
	renderer,\
	anim_id,\
	shadow_mapping,\
	global_mixer,\
	global_clock\
');

// /=====================================================================\
//	void setVal(block, type)
// \=====================================================================/
function setVal(block, type) {
	Blockly.Events.disable();
	block.setDisabled(false);
	const name = block.getFieldValue('NAME');
	if (name && name !== '' && !valDex[type[2]].has(name)) {
		var subtype = null;
		if (type[2] === 'mesh') {
			if (type[3] === 'group') {
				subtype = 'GROUP';
			}
			else {
				subtype = 'MESH'
			}
		}
		else {
			subtype = block.getFieldValue('TYPE');
		}
		valDex[type[2]].set(name, [block.id, subtype]);
		Blockly.JavaScript.addReservedWords(type[2] + '_' + name);
	}
	Blockly.Events.enable();
}

// /=====================================================================\
//	void chooseName(block, type)
// \=====================================================================/
function chooseName(block, type) {
	// fetch name
	// .replace(/\W/g, ''); || .replace(/[^a-z0-9 ]/gi, '');
	let name = prompt('Type name of element:');
	if (name) {
		name = name.replace(/\W/g, '');
	}
	while (valDex[type[2]].has(name) || workspace.getVariableMap().getVariable(type[2] + '_' + name)) {
		name = prompt('Name already in use! Choose a different one:');
		if (name) {
			name = name.replace(/\W/g, '');
		}
	}
	// valid name => add to valDex
	if (name !== null && name !== '') {
		block.setFieldValue(name, 'NAME'); // -> trigger change
		setVal(block, type);
	}
	// non valid name
	else {
		block.dispose(true); // -> trigger delete
	}
}

// /=====================================================================\
//	void forget(block)
// \=====================================================================/
function forget(block) {
	// existence filter
	if (!block) return;

	// oth forget block
	Blockly.Events.disable();
	block.dispose(true);
	workspace.undoStack_ = workspace.undoStack_.filter((e) => e.blockId !== block.id);
	workspace.redoStack_ = workspace.redoStack_.filter((e) => e.blockId !== block.id);
	Blockly.Events.enable();
}

// /=====================================================================\
//	void reset(block)
// \=====================================================================/
function reset(block) {
	// existence filter
	if (!block || !block.getField('FIELD')) return;

	// oth reset block
	Blockly.Events.disable();
	if (typeof block.updateShape_ === 'function')
		block.updateShape_(block.getField('FIELD').getOptions()[0][1]);
	block.setFieldValue(block.getField('FIELD').getOptions()[0][1], 'FIELD');
	Blockly.Events.enable();
}

// /=====================================================================\
//	void flicker(block)
// \=====================================================================/
function flicker(block) {
	// existence filter
	if (!block) return;

	// take field id...
	const type = block.type.split('_');
	var fid = null;
	if (type[0] === 'b3js') {
		if (type[1] === 'value')
			fid = 'VAL';
		else if (type[1] === 'set')
			fid = 'FIELD';
		else if (type[1] === 'update')
			fid = 'COMPONENT';
	}

	Blockly.Events.disable();
	block.setDisabled(false);

	if (!fid) {
		Blockly.Events.enable();
		return;
	}

	// ...and flicker block
	if (valDex[type[2]]) {
		// if valDex not empty...
		if (valDex[type[2]].size > 0) {
			// ...but val not present
			if (fid === 'VAL' && !workspace.getBlockById(block.getFieldValue(fid))) {
				forget(block);
			}
			// else if present => flicker
			else {
				// only for set/update_block
				flicker(block.getInputTargetBlock('INPUT'));

				// for all blocks
				const field = block.getFieldValue(fid);
				if (field) {
					block.setFieldValue('', fid);
					block.setFieldValue(field, fid);
					// invalid option => reset
					const text = block.getField(fid).getText();
					if (text === text.toUpperCase()) {
						reset(block); // no following instruction after disable
					}
				}
			}
		}
		// if empty => forget
		else {
			forget(block.getInputTargetBlock('VALUE'))
			forget(block);
		}
	}
	Blockly.Events.enable();
}

// /=====================================================================\
//	void recover(block, type)
// \=====================================================================/
function recover(block, type) {
	if (type[0] === 'b3js') {
		// if create_block
		if (type[1] === 'create') {
			// name != ''
			if (block.getFieldValue('NAME') !== '') {
				// name © valdDex => block copied
				if (valDex[type[2]].has(block.getFieldValue('NAME'))) {
					chooseName(block, type);
				}
				// paste deleted block
				else {
					setVal(block, type);
				}
				console.log(valDex);
			}
		}
		// else value/set/update
		else {
			// id not present => need flicker
			if (!workspace.getBlockById(block.getFieldValue('VAL'))) {
				flicker(block);
			}
		}
	}
}

// /=====================================================================\
//	int hex(s)
// \=====================================================================/
function hex(s) {
	return parseInt(s.replace('#', '0x').replace(/'/g, ''), 16);
}

// /=====================================================================\
//	int rad(angle)
// \=====================================================================/
function rad(angle) {
	return ((360 + (angle % 360)) % 360) * Math.PI / 180;
}

// /=====================================================================\
//	[] toUpdate(type, num)
// \=====================================================================/
function toUpdate(type, num) {
	const slaves = [];
	slaves.push(type[0] + '_value_' + type[2]);
	slaves.push(type[0] + '_set_' + type[2]);
	slaves.push(type[0] + '_update_' + type[2]);
	return slaves.slice(-num);
}

// /=====================================================================\
//	void onresize()
// \=====================================================================/
function onresize() {
	// Resize webglCanvas.
	webglCanvas.style.width = webglArea.offsetWidth + 'px';
	webglCanvas.style.height = webglArea.offsetHeight + 'px';

	if (renderer && current_camera) {
		if (current_camera.isOrthographicCamera) {
			current_camera.left = webglArea.offsetWidth / -current_camera.fovscale;
			current_camera.right = webglArea.offsetWidth / current_camera.fovscale;
			current_camera.top = webglArea.offsetHeight / current_camera.fovscale;
			current_camera.bottom = webglArea.offsetHeight / -current_camera.fovscale;
		}
		else {
			current_camera.aspect = webglArea.offsetWidth/webglArea.offsetHeight;
		}
		current_camera.updateProjectionMatrix();
		renderer.setSize(webglArea.offsetWidth, webglArea.offsetHeight);
	}

	// Resize blocklyDiv
	blocklyDiv.style.width = blocklyArea.offsetWidth + 'px';
	blocklyDiv.style.height = blocklyArea.offsetHeight + 'px';
	Blockly.svgResize(workspace);
}
window.addEventListener('resize', onresize, false);

// /=====================================================================\
//	void valManagement(event)
// \=====================================================================/
function valManagement(event) {
	const block = workspace.getBlockById(event.blockId);

	if (event.type !== Blockly.Events.DELETE && !block)
		return;

	switch (event.type) {
		case Blockly.Events.CREATE: {
			// single create_block
			if (event.ids.length === 1) {
				recover(block, block.type.split('_'))
			}
			// ids > 1, no parent and create ? => pasted create_mesh
			else if (block.getParent() === null && block.type.indexOf('create_mesh') >= 0) {
				flicker(block.getInputTargetBlock('GEOMETRY'));
				flicker(block.getInputTargetBlock('MATERIAL'));
				flicker(block.getInputTargetBlock('VALUE'));
				recover(block, block.type.split('_'));
				console.log(valDex);
			}
			// multiple create_blocks => undo cataclysm
			else {
				// clear valDex
				Object.keys(valDex).forEach((k) => valDex[k].clear());

				// reload valDex
				workspace.getAllBlocks().forEach((b) => {
					if (b.type.indexOf('b3js_create') >= 0)
						setVal(b, b.type.split('_'));
				});

				// and correct blocks
				workspace.getAllBlocks().forEach((b) => { flicker(b); });
				console.log(valDex);
			}
		}
		break;

		case Blockly.Events.DELETE: {
			// clear valDex
			Object.keys(valDex).forEach((k) => valDex[k].clear());

			// reload valDex
			workspace.getAllBlocks().forEach((b) => {
				if (b.type.indexOf('b3js_create') >= 0)
					setVal(b, b.type.split('_'));
			});

			// and correct blocks
			workspace.getAllBlocks().forEach((b) => { flicker(b); });
			console.log(valDex);
		}
		break;

		case Blockly.Events.MOVE: {
			const type = block.type.split('_');
			if (type[0] === 'b3js') {
				// move unnamed block
				if (type[1] === 'create') {
					if (block.getFieldValue('NAME') === '') {
						chooseName(block, type);
						console.log(valDex);
					}
				}
				// move value_blocks inside/outside set/update_blocks
				else if (type[1] === 'value') {
					const id = event.newParentId ? event.newParentId : event.oldParentId ? event.oldParentId : null;
					// reset set/update_block
					if (id) {
						flicker(workspace.getBlockById(id));
					}
				}
			}
		}
		break;

		case Blockly.Events.CHANGE: {
			const type = block.type.split('_');
			if (type[0] === 'b3js') {
				if (type[1] === 'create') {
					// try to change name of create_block
					if (event.name === 'NAME') {
							workspace.undoStack_.pop(); // -> forget
					}
					// try to change type of create_block
					else if (event.name === 'TYPE') {
						const types = toUpdate(type, 2);
						const name = block.getFieldValue('NAME');

						// adjust set/update_blocks when changing create_blocks
						workspace.getAllBlocks().forEach((b) => {
							if (types.indexOf(b.type) >= 0) {
								// flicker set/update_block
								const input = b.getInputTargetBlock('INPUT');
								if (input && input.getField('VAL').getText() === name)
									flicker(b);
							}
						});
					}
				}
				// change value_block field
				else if (type[1] === 'value') {
					if (event.name === 'VAL') {
						const types = toUpdate(type, 2);
						const parent = block.getParent();
						// adjust set/value_block when changing value block
						if (parent && types.indexOf(parent.type) >= 0) {
							if (parent.getInputWithBlock(block).name === 'INPUT') {
								flicker(parent);
							}
						}
					}
				}
			}
		}
		break;

		case Blockly.Events.UI: {
			if (event.element === 'click') {
				const now = performance.now();
				if (now - elapsed_time < 250) {
					const check = block.isCollapsed();
					block.setCollapsed(!check);
				}
				else if (now - elapsed_time < 750) {
					const check = block.getInputsInline();
					block.setInputsInline(!check);
				}
				elapsed_time = now;
			}
		}
		break;
	}
}

// /=====================================================================\
//	void loadWorkspace()
// \=====================================================================/
function loadWorkspace() {
	const xhr = new XMLHttpRequest();

	xhr.onload = function() {
		if (xhr.readyState === 4 && xhr.status === 200) {

			const options = {
				toolbox : xhr.responseText,
				collapse : true,
				comments : true,
				disable : true,
				maxBlocks : Infinity,
				trashcan : true,
				horizontalLayout : false,
				toolboxPosition : 'start',
				css : true,
				media : 'https://blockly-demo.appspot.com/static/media/',
				rtl : false,
				scrollbars : true,
				sounds : true,
				oneBasedIndex : true,
				grid : {
					spacing : 20,
					length : 1,
					colour : '#888',
					snap : true
				},
				zoom : {
					controls : false,
					wheel : true,
					startScale : 0.75,
					maxScale : 1,
					minScale : 0.25,
					scaleSpeed : 1.2
				}
			};

			if (workspace) {
				workspace.dispose();
				Object.keys(valDex)
					.forEach((k) => valDex[k].clear());
			}
			workspace = Blockly.inject(blocklyDiv, options);
			workspace.addChangeListener(valManagement);
			blocklyArea.appendChild(document.getElementsByClassName('blocklyWidgetDiv')[0]);
			blocklyArea.appendChild(document.getElementsByClassName('blocklyTooltipDiv')[0]);
			onresize();
		}
	};

	xhr.overrideMimeType('text/xml');
	if (checkExp.checked) {
		xhr.open('GET', 'src/e_toolbox.xml', true);
	}
	else {
		xhr.open('GET', 'src/toolbox.xml', true);
	}
	xhr.send();
}

// /=====================================================================\
//	void saveProject()
// \=====================================================================/
function saveProject() {
	// Generate JavaScript and Xml and save them.
	Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
	const code = Blockly.JavaScript.workspaceToCode(workspace);
	const xml_text = Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(workspace));

	var comment = '';
	Object.keys(valDex).forEach((k) => {
		comment += '<!--' + k + ':';
		comment += Array.from(valDex[k]).reduce(((res, e) => res + e[0]+'='+e[1][1] + ' '), '');
		comment += '-->\n';
	});

	const filename = prompt('Save As');
	console.log('Saved ' + filename);

	const downloadFile = function(content, type) {
		const download = document.createElement('a');
		download.style.display = 'none';
		download.setAttribute('href', 'data:text/' + type + '; charset=utf-8,' + encodeURIComponent(content));
		type === 'xml' ? type = type : type = 'js';
		download.setAttribute('download', filename + '.' + type);

		document.body.appendChild(download);
		download.click();
		document.body.removeChild(download);
	};

	if (filename !== null && filename !== '') {
		downloadFile(code, 'javascript');
		downloadFile(xml_text + '\n' + comment, 'xml');
	}
}

// /=====================================================================\
//	void importProject()
// \=====================================================================/
function importProject() {
	const importedXml = document.getElementById('importedXml').files[0];
	if (importedXml !== null && importedXml.type === 'text/xml') {
		const fileReader = new FileReader();
		fileReader.onload = function(e) {
			Blockly.Events.disable();
			const textFromFile = e.target.result;
			var invalid = false;

			// clear
			workspace.clear();
			workspace.clearUndo();
			Object.keys(valDex)
				.forEach((k) => valDex[k].clear());

			// reload valDex
			textFromFile.split('\n').slice(1).forEach((line) => {
				const s = line.slice(4,-4).split(':');
				if (s.length === 2) {
					s[1].split(' ').forEach((e) => {
						const nv = e.split('=');
						if (valDex[s[0]]) {
							valDex[s[0]].set(nv[0], [nv[1]]);
							Blockly.JavaScript.addReservedWords(s[0] + '_' + nv[0]);
						}
						else {
							invalid = true;
						}
					});
				}
			});

			// validity check
			if (invalid) {
				Blockly.Events.enable();
				alert('Invalid B3JS project!');
				return;
			}

			// load workspace
			Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(textFromFile), workspace);
			workspace.getAllBlocks().forEach((b) => {
				if (b.type.indexOf('b3js_create') >= 0) {
					const type = b.type.split('_')[2];
					valDex[type].get(b.getFieldValue('NAME')).unshift(b.id);
				}
				else {
					flicker(b);
				}
			});
			console.log(valDex);
			Blockly.Events.enable();
		};
		fileReader.readAsText(importedXml, 'UTF-8');
	}
	else {
		alert('File is not a proper .xml!');
	}
	stopCode();
}

// /=====================================================================\
//	void loadResource()
// \=====================================================================/
function loadResource() {
	const loadedRes = document.getElementById('loadedRes').files;
	const files = [];

	if (loadedRes !== null) {
		for (let i = 0, n = loadedRes.length; i < n; i++) {
			(function(file) {
				const fileReader = new FileReader();

				fileReader.onload = function(e) {
					// load model in user_resources
					if (file.name.indexOf('.obj') >= 0) {
						const mtl = file.name.replace('.obj', '.mtl');
						new THREE.MTLLoader().setResourcePath('./resources/uploads/')
							.load('./resources/uploads/' + mtl, (m) => {
								user_resources['\'' + file.name + '\''] =
									new THREE.OBJLoader().setMaterials(m).parse(e.target.result);
							});
					}
					else if (file.name.indexOf('.dae') >= 0) {
						user_resources['\'' + file.name + '\''] =
							new THREE.ColladaLoader()
								.parse(e.target.result, './resources/uploads/');
					}
					else if (file.name.indexOf('.gltf') >= 0) {
						new THREE.GLTFLoader()
							.parse(e.target.result, './resources/uploads/',
								(gl) => {user_resources['\'' + file.name + '\''] = gl;});
					}

					// alert user_resources
					files.push(file.name);
					if (files.length === n) {
						console.log(user_resources);
						alert(files + '\nLOADED!');
					}
				};

				fileReader.readAsText(file);
			})(loadedRes[i]);
		}
	}
}

// /=====================================================================\
//	void openFullScreen(div)
// \=====================================================================/
function openFullscreen(div) {
	console.log(document.fullscreenElement);
	if (div.requestFullscreen) {
		div.requestFullscreen();
	} else if (div.mozRequestFullScreen) { //Firefox
		div.mozRequestFullScreen();
	} else if (div.webkitRequestFullscreen) { //Chrome, Safari & Opera
		div.webkitRequestFullscreen();
	} else if (div.msRequestFullscreen) { //IE/Edge
		div.msRequestFullscreen();
	}
}

// /=====================================================================\
//	void expertMode()
// \=====================================================================/
function expertMode() {
	checkExp.checked = !checkExp.checked;
	loadWorkspace();
	stopCode();
}

// /=====================================================================\
//	void showCode()
// \=====================================================================/
function showCode() {
	// Generate JavaScript code and display it.
	Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
	const code = Blockly.JavaScript.workspaceToCode(workspace);
	alert(code);
}

// /=====================================================================\
//	void stopCode()
// \=====================================================================/
function stopCode() {
	// Stop rendering and clear canvas.
	if (anim_id && renderer) {
		cancelAnimationFrame(anim_id);
		renderer.setClearColor(0x000000);
		renderer.clear();
		renderer.dispose();
		scene = new THREE.Scene();
	}
}

// /=====================================================================\
//	void runCode()
// \=====================================================================/
function runCode() {
	// Generate JavaScript code and run it.
	window.LoopTrap = 1000;
	Blockly.JavaScript.INFINITE_LOOP_TRAP =
			'if (--window.LoopTrap == 0) throw \'Infinite loop.\';\n';
	const code = Blockly.JavaScript.workspaceToCode(workspace);
	Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
	stopCode();
	try {
		eval(code);
	} catch (e) {
		alert(e);
	}
}
