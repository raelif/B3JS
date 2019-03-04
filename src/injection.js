// /=====================================================================\
//	Globals ~ all accessors
// \=====================================================================/
const webglArea = document.getElementById('webglArea');
const webglCanvas = document.getElementById('webglCanvas');

const blocklyArea = document.getElementById('blocklyArea');
const blocklyDiv = document.getElementById('blocklyDiv');

const checkExp = document.getElementById('checkExp');

const valDex = {
	'Block': new Map(),
	'Camera': new Map(),
	'Geometry': new Map(),
	'Light': new Map(),
	'Material': new Map(),
	'Mesh': new Map()
};

var workspace;

var scene = new THREE.Scene();
var current_camera;
var anim_id;
var renderer;

// /=====================================================================\
//	void setVal(block, type)
// \=====================================================================/
function setVal(block, type) {
	Blockly.Events.disable();
	const name = block.getFieldValue('NAME');
	if (name && name !== '' && !valDex[type].has(name)) {
		valDex[type].set(name, [block.id, block.getFieldValue('TYPE')]);
		valDex['Block'].set(block.id, [name, type]);
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
	while (valDex[type].has(name)) {
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
		block.dispose(); // -> trigger delete
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
	block.dispose();
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

	// oth flicker block
	Blockly.Events.disable();
	const fid = block.type.search('b3js_value') >= 0 ? 'VAL' : block.type.search('b3js_set') >= 0 ? 'FIELD' : null;
	if (fid) {
		const type = block.type.split('_')[2].replace(/\b\w/g, l => l.toUpperCase());
		// if valDex not empty...
		if (valDex[type].size > 0) {
			block.setDisabled(false);
			// ...but val not present
			if (fid === 'VAL' && !valDex['Block'].has(block.getFieldValue(fid))) {
				block.setFieldValue(valDex[type].values().next().value[0], fid);
			}
			// else if present => flicker
			else {
				// only for set_block
				flicker(block.getInputTargetBlock('INPUT'));

				// for all blocks
				const field = block.getFieldValue(fid);
				if (field) {
					block.setFieldValue('', fid);
					block.setFieldValue(field, fid);
				}
			}
		}
		// if empty => dispose and forget
		else {
			forget(block.getInputTargetBlock('VALUE'))
			forget(block);
		}
	}
	Blockly.Events.enable();
}

// /=====================================================================\
//	int hex(s)
// \=====================================================================/
function hex(s) {
	return parseInt(s.replace('#', '0x').replace(/'/g, ''), 16);
}

// /=====================================================================\
//	void onresize()
// \=====================================================================/
function onresize() {
	// Resize webglCanvas.
	webglCanvas.style.width = webglArea.offsetWidth + 'px';
	webglCanvas.style.height = webglArea.offsetHeight + 'px';

	if (renderer && current_camera) {
		current_camera.aspect = webglArea.offsetWidth/webglArea.offsetHeight;
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
				if (block.type.search('b3js') >= 0) {
					const type = block.type.split('_')[2].replace(/\b\w/g, l => l.toUpperCase());
					// if create_block
					if (block.type.search('create') >= 0) {
						// name != ''
						if (block.getFieldValue('NAME') !== '') {
							// name © valdDex => block copied
							if (valDex[type].has(block.getFieldValue('NAME'))) {
								chooseName(block, type);
							}
							// paste deleted block
							else {
								setVal(block, type);
							}
							console.log(valDex);
						}
					}
					// else value_block/set_block
					else if (block.type.search('value') >= 0 || block.type.search('set') >= 0) {
						// id not present => need flicker
						if (!valDex['Block'].has(block.getFieldValue('VAL'))) {
							flicker(block);
						}
					}
				}
			}

			// multiple create_blocks => undo cataclysm
			else {
				// first reload valDex...
				workspace.getAllBlocks().forEach((b) => {
					if (b.type.search('b3js') >= 0) {
						const type = b.type.split('_')[2].replace(/\b\w/g, l => l.toUpperCase());
						if (b.type.search('create') >= 0) {
							setVal(b, type);
						}
						// ...then correct other blocks
						else {
							flicker(b);
						}
					}
				});
			}
		}
		break;

		case Blockly.Events.DELETE: {
			const del_type = event.oldXml.attributes[0].value;

			// clear valDex
			event.ids.forEach((id) => {
				if (valDex['Block'].has(id)) {
					valDex[valDex['Block'].get(id)[1]].clear();
					valDex['Block'].delete(id);
				}
			});

			if (del_type.search('b3js_create') >= 0) {
				const type = del_type.split('_')[2].replace(/\b\w/g, l => l.toUpperCase());
				const set_type = del_type.replace('create', 'set');
				const value_type = del_type.replace('create', 'value');

				// first reload valDex...
				workspace.getAllBlocks()
					.filter((b) => b.type === del_type)
					.forEach((b) => {setVal(b, type);});

				// ...then correct...
				workspace.getAllBlocks()
					.forEach((b) => {if (b.type === value_type || b.type === set_type) {flicker(b);}});

				console.log(valDex);
			}
		}
		break;

		case Blockly.Events.MOVE: {
			if (block.type.search('b3js') >= 0) {
				if (block.type.search('create') >= 0) {
					const type = block.type.split('_')[2].replace(/\b\w/g, l => l.toUpperCase());
					if (block.getFieldValue('NAME') === '') {
						chooseName(block, type);
						console.log(valDex);
					}
				}
				// move value_blocks inside/outside set_blocks
				else if (block.type.search('value')  >= 0) {
					const id = event.newParentId ? event.newParentId : event.oldParentId ? event.oldParentId : null;
					if (id) {
						// reset set_block
						reset(workspace.getBlockById(id));
					}
				}
			}
		}
		break;

		case Blockly.Events.CHANGE: {
			if (block.type.search('b3js') >= 0) {
				if (block.type.search('create') >= 0) {
					if (event.name === 'NAME') {
							workspace.undoStack_.pop(); // -> forget
					}
					else if (event.name === 'TYPE') {
						const set_type = block.type.replace('create', 'set');
						const name = block.getFieldValue('NAME');

						// adjust set_blocks when changing create_blocks
						workspace.getAllBlocks()
							.filter((b) => b.type === set_type)
							.forEach((b) => {
								// reset set_block
								const input = b.getInputTargetBlock('INPUT');
								if (input && input.getField('VAL').getText() === name) {
									reset(b);
								}
						});
					}
				}
				// change value_block field
				else if (block.type.search('value') >= 0) {
					if (event.name === 'VAL') {
						const set_type = block.type.replace('value', 'set');
						const parent = block.getParent();
						// adjust set block when changing value block
						if (parent && parent.type === set_type) {
							if (parent.getInputWithBlock(block).name === 'INPUT') {
								reset(parent);
							}
						}
					}
				}
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
					maxScale : 3,
					minScale : 0.3,
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
		if (k !== 'Block') {
			comment += '<!--' + k + ':';
			comment += Array.from(valDex[k]).reduce(((res, e) => res + e[0]+'='+e[1][1] + ' '), '');
			comment += '-->\n';
		}
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
						valDex[s[0]].set(nv[0], [nv[1]]);
					});
				}
			});

			// load workspace
			Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(textFromFile), workspace);
			workspace.getAllBlocks().forEach((b) => {
				if (b.type.search('b3js_create') >= 0) {
					const type = b.type.split('_')[2].replace(/\b\w/g, l => l.toUpperCase());
					valDex[type].get(b.getFieldValue('NAME')).unshift(b.id);
					valDex['Block'].set(b.id, [b.getFieldValue('NAME'), type]);
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
}

// /=====================================================================\
//	void openFullScreen()
// \=====================================================================/
function openFullscreen() {
	if (webglCanvas.requestFullscreen) {
		webglCanvas.requestFullscreen();
	} else if (webglCanvas.mozRequestFullScreen) { //Firefox
		webglCanvas.mozRequestFullScreen();
	} else if (webglCanvas.webkitRequestFullscreen) { //Chrome, Safari & Opera
		webglCanvas.webkitRequestFullscreen();
	} else if (webglCanvas.msRequestFullscreen) { //IE/Edge
		webglCanvas.msRequestFullscreen();
	}
}

// /=====================================================================\
//	void expertMode()
// \=====================================================================/
function expertMode() {
	stopCode();
	checkExp.checked = !checkExp.checked;
	loadWorkspace();
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
	stopCode();
	window.LoopTrap = 1000;
	Blockly.JavaScript.INFINITE_LOOP_TRAP =
			'if (--window.LoopTrap == 0) throw \'Infinite loop.\';\n';
	const code = Blockly.JavaScript.workspaceToCode(workspace);
	Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
	try {
		eval(code);
	} catch (e) {
		alert(e);
	}
}
