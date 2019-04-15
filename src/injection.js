// /=====================================================================\
//	Globals ~ all accessors
// \=====================================================================/
const webglArea = document.getElementById('webglArea');
const webglCanvas = document.getElementById('webglCanvas');

const blocklyArea = document.getElementById('blocklyArea');
const blocklyDiv = document.getElementById('blocklyDiv');

const tr_lang = {
	en : {
		file : 'File',
		saveButton : 'Save Project',
		importButton : 'Import Project',
		genButton : 'Generate Javascript',
		uploadButton : 'Upload Resources',
		view : 'View',
		canvEnlButton : 'Canvas Fullscreen',
		wrksEnlButton : 'Workspace Fullscreen',
		languageButton : 'Language:\
			Eng <input id="enLan" type="radio" name="lan" onclick="changeLanguage(this)" value="en" checked="checked">\
			Ita <input id="itLan" type="radio" name="lan" onclick="changeLanguage(this)" value="it">',
		showButton : 'Show Code',
		stopButton : 'Stop',
		runButton : 'Run'
	},
	it : {
		file : 'File',
		saveButton : 'Salva Progetto',
		importButton : 'Importa Progetto',
		genButton : 'Genera Javascript',
		uploadButton : 'Carica Risorse',
		view : 'Vista',
		canvEnlButton : 'Canvas a Schermo Intero',
		wrksEnlButton : 'Workspace a Schermo Intero',
		languageButton : 'Lingua:\
			Eng <input id="enLan" type="radio" name="lan" onclick="changeLanguage(this)" value="en">\
			Ita <input id="itLan" type="radio" name="lan" onclick="changeLanguage(this)" value="it" checked="checked">',
		showButton : 'Mostra Codice',
		stopButton : 'Ferma',
		runButton : 'Esegui'
	}
};

const valDex = {
	'camera': new Map(),
	'geometry': new Map(),
	'light': new Map(),
	'material': new Map(),
	'mesh': new Map()
};

var workspace;
var elapsed_time = 0;
var usr_res = {};

var scene = new THREE.Scene();
var current_camera;
var renderer;
var anim_id;
var shadow_mapping = false;
var global_clock = new THREE.Clock();

Blockly.JavaScript.addReservedWords('\
	webglArea,\
	webglCanvas,\
	blocklyArea,\
	blocklyDiv,\
	tr_lang\
	valDex,\
	workspace,\
	elapsed_time,\
	usr_res,\
	scene,\
	current_camera,\
	renderer,\
	anim_id,\
	shadow_mapping,\
	global_clock,\
	keyCode,\
	targetMesh\
');

// /=====================================================================\
//	void setVal(block, type)
// \=====================================================================/
function setVal(block, type) {
	Blockly.Events.disable();
	block.setDisabled(false);
	const name = block.getFieldValue('NAME');
	if (name && name !== '' && !valDex[type[2]].has(name)) {
		const subtype = type[2]==='mesh'?
		(type[3]==='group'?'GROUP':
		(type[3]==='from'?'IMPORT':'MESH')):block.getFieldValue('TYPE');

		valDex[type[2]].set(name, [block.id, subtype]);
		Blockly.JavaScript.addReservedWords(type[2] + '_' + name);
	}
	Blockly.Events.enable();
}

// /=====================================================================\
//	void chooseName(block, type)
// \=====================================================================/
function chooseName(block, type) {
	// Fetch name
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
	// Valid name => add to valDex
	if (name !== null && name !== '') {
		block.setFieldValue(name, 'NAME'); // -> trigger change
		setVal(block, type);
	}
	// Non valid name
	else {
		block.dispose(true); // -> trigger delete
	}
}

// /=====================================================================\
//	void forget(block)
// \=====================================================================/
function forget(block) {
	// Existence filter
	if (!block) return;

	// Otherwise forget block
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
	// Existence filter
	if (!block || !block.getField('FIELD')) return;

	// Otherwise reset block
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
	// Existence filter
	if (!block) return;

	// Adjust render_block
	if (block.type === 'b3js_render_loop') {
		if (workspace.getBlocksByType('b3js_render_loop').length > 1) {
			forget(block);
			return;
		}
	}

	// Take field id
	const type = block.type.split('_');
	const fid = type[0]==='b3js'?
		(type[1]==='value'?'VAL':
		(type[1]==='set'||type[1]==='getfrom'?'FIELD':
		(type[1]==='update'?'COMPONENT':null))):null;

	Blockly.Events.disable();
	block.setDisabled(false);

	if (!fid) {
		Blockly.Events.enable();
		return;
	}

	// Adjust value/set/update_block
	if (valDex[type[2]]) {
		// If valDex not empty...
		if (valDex[type[2]].size > 0) {
			// ...but val not present
			if (type[1] === 'value' && !workspace.getBlockById(block.getFieldValue(fid))) {
				forget(block);
			}
			// Else if present => flicker
			else {
				// Only for set/update/get_block
				flicker(block.getInputTargetBlock('INPUT'));

				// For all blocks
				const field = block.getFieldValue(fid);
				if (field) {
					block.setFieldValue('', fid);
					block.setFieldValue(field, fid);

					// Additional work for getfrom with component
					const comp = block.getFieldValue('COMP');
					if (comp) {
						block.updateShape_(comp);
					}

					// Invalid option => reset
					const text = block.getField(fid).getText(); // SAFE fid != null
					if (text === text.toUpperCase()) {
						reset(block); // no following instruction after disable
					}
				}
			}
		}
		// If empty => forget
		else if (type[1] === 'value') {
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
		// If create_block
		if (type[1] === 'create') {
			// Name != ''
			if (block.getFieldValue('NAME') !== '') {
				// Name © valdDex => block copied
				if (valDex[type[2]].has(block.getFieldValue('NAME'))) {
					chooseName(block, type);
				}
				// Paste deleted block
				else {
					setVal(block, type);
				}
				console.log(valDex);
			}
		}
		// Else value/set/update_block
		else {
			// val not present => need flicker
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
	if (typeof s === 'string')
		return parseInt(s.replace('#', '0x').replace(/'/g, ''), 16);
	else return s;
}

// /=====================================================================\
//	int rad(angle)
// \=====================================================================/
function rad(angle) {
	return ((360 + (angle % 360)) % 360) * Math.PI / 180;
}

// /=====================================================================\
//	Mesh findMesh(o3d, index)
// \=====================================================================/
function findMesh(o3d, index) {
	var ithMesh = undefined;
	var count = 0;
	o3d.traverse((child) => {
		if (child.isMesh) {
			if(count === index) {
				ithMesh = child;
			}
			count++;
		}
	});
	return ithMesh;
}

// /=====================================================================\
//	[] toUpdate(type, num)
// \=====================================================================/
function toUpdate(type, num) {
	const slaves = [];
	slaves.push(type[0] + '_value_' + type[2]);
	slaves.push(type[0] + '_set_' + type[2]);
	slaves.push(type[0] + '_update_' + type[2]);
	slaves.push(type[0] + '_getfrom_' + type[2]);
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
			// Single create_block
			if (event.ids.length === 1) {
				recover(block, block.type.split('_'));
			}
			// ids > 1, no parent and create ? => pasted create_mesh
			else if (block.getParent() === null && block.type.indexOf('create_mesh') >= 0) {
				flicker(block.getInputTargetBlock('GEOMETRY'));
				flicker(block.getInputTargetBlock('MATERIAL'));
				flicker(block.getInputTargetBlock('VALUE'));
				recover(block, block.type.split('_'));
				console.log(valDex);
			}
			// Multiple create_blocks => undo cataclysm
			else {
				// Clear valDex
				Object.keys(valDex).forEach((k) => valDex[k].clear());

				// Reload valDex...
				workspace.getAllBlocks().forEach((b) => {
					if (b.type.indexOf('b3js_create') >= 0)
						setVal(b, b.type.split('_'));
				});

				// ...and correct blocks
				workspace.getAllBlocks().forEach((b) => { flicker(b); });
				console.log(valDex);
			}
		}
		break;

		case Blockly.Events.DELETE: {
			// Clear valDex
			Object.keys(valDex).forEach((k) => valDex[k].clear());

			// Reload valDex...
			workspace.getAllBlocks().forEach((b) => {
				if (b.type.indexOf('b3js_create') >= 0)
					setVal(b, b.type.split('_'));
			});

			// ...and correct blocks
			workspace.getAllBlocks().forEach((b) => { flicker(b); });
			console.log(valDex);
		}
		break;

		case Blockly.Events.MOVE: {
			const type = block.type.split('_');
			if (type[0] === 'b3js') {
				// Move unnamed block
				if (type[1] === 'create') {
					if (block.getFieldValue('NAME') === '') {
						chooseName(block, type);
						console.log(valDex);
					}
				}
				// Move value_blocks inside/outside set/update/get_blocks
				else if (type[1] === 'value') {
					const id = event.newParentId ? event.newParentId : event.oldParentId ? event.oldParentId : null;
					// Reset set/update_block
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
					// Try to change name of create_block
					if (event.name === 'NAME') {
							workspace.undoStack_.pop(); // -> forget
					}
					// Try to change type of create_block
					else if (event.name === 'TYPE') {
						const types = toUpdate(type, 3);
						const name = block.getFieldValue('NAME');

						// Adjust set/update/get_blocks when changing create_blocks
						workspace.getAllBlocks().forEach((b) => {
							if (types.indexOf(b.type) >= 0) {
								// INPUT cannot be different from value_block
								const input = b.getInputTargetBlock('INPUT');
								if (input && input.getField('VAL') && input.getField('VAL').getText() === name)
									flicker(b);
							}
						});
					}
				}
				// Change value_block field
				else if (type[1] === 'value') {
					if (event.name === 'VAL') {
						const types = toUpdate(type, 3);
						const parent = block.getParent();
						// Adjust set/value/get_block when changing value_block
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
				media : '../lib/media/',
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
	if (document.getElementById('language').lang === 'en')
		xhr.open('GET', 'src/toolbox_en.xml', true);
	else
		xhr.open('GET', 'src/toolbox_it.xml', true);
	xhr.send();
}

// /=====================================================================\
//	void saveProject(type)
// \=====================================================================/
function saveProject(type) {
	const filename = prompt('Save As');
	if (filename !== null && filename !== '') {
		// Generate JavaScript or Xml and save them.
		var content = null;
		if (type === 'js') {
			Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
			const code = Blockly.JavaScript.workspaceToCode(workspace);
			content = 'data:text/javascript; charset=utf-8,' + encodeURIComponent(code);
		}
		else {
			const xml = Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(workspace));

			var comment = '';
			Object.keys(valDex).forEach((k) => {
				comment += '<!--' + k + ':';
				comment += Array.from(valDex[k]).reduce(((res, e) => res + e[0]+'='+e[1][1] + ' '), '');
				comment += '-->\n';
			});
			content = 'data:text/javascript; charset=utf-8,' + encodeURIComponent(xml + '\n' + comment);
		}

		const download = document.createElement('a');
		download.style.display = 'none';
		download.setAttribute('href', content);
		download.setAttribute('download', filename + '.' + type);

		document.body.appendChild(download);
		download.click();
		document.body.removeChild(download);
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
//	void changeLanguage(radio)
// \=====================================================================/
function changeLanguage(radio) {
	var language = document.getElementById('language');
	if (language)
		document.head.removeChild(language);

	language = document.createElement('script');
	language.setAttribute('id', 'language');
	language.setAttribute('lang', radio.value);
	language.setAttribute('type', 'text/javascript');
	language.setAttribute('src', 'lib/msg/js/' + radio.value + '.js');
	document.head.appendChild(language);

	document.querySelectorAll('a').forEach((a) => {
		if (a.id === 'languageButton')
			a.innerHTML = tr_lang[radio.value][a.id];
		else
			a.textContent = tr_lang[radio.value][a.id];
	});

	loadWorkspace();
	stopCode();
}

// /=====================================================================\
//	void preLoad()
// \=====================================================================/
function preLoad() {
	const promises = [];
	workspace.getBlocksByType('b3js_create_mesh_from_file').forEach((b) => {
		const key = 'mesh_' + b.getFieldValue('NAME');
		const file_name = b.getInputTargetBlock('VALUE').getFieldValue('TEXT');

		if (file_name.indexOf('.obj') >= 0) {
			const mtl = file_name.replace('.obj', '.mtl');
			promises.push(new Promise((resolve, reject) => {
				new THREE.MTLLoader().setResourcePath('./resources/uploads/')
					.load('./resources/uploads/' + mtl, (m) => {
						new THREE.OBJLoader().setMaterials(m)
							.load('./resources/uploads/' + file_name, (obj) => resolve([key, obj]), undefined, reject);
					});
			}));
		}
		else if (file_name.indexOf('.dae') >= 0) {
			promises.push(new Promise((resolve, reject) => {
				new THREE.ColladaLoader()
					.load('./resources/uploads/' + file_name, (dae) => resolve([key, dae]), undefined, reject);
			}));
		}
		else if (file_name.indexOf('.gltf') >= 0) {
			promises.push(new Promise((resolve, reject) => {
				new THREE.GLTFLoader()
					.load('./resources/uploads/' + file_name, (gltf) => resolve([key, gltf]), undefined, reject);
			}));
		}
	});

	return promises;
}

// /=====================================================================\
//	void showCode()
// \=====================================================================/
function showCode() {
	Promise.all(preLoad()).then((neverland) => {
		if (neverland && !anim_id)
			neverland.forEach((p) => {usr_res[p[0]] = p[1];});
		console.log(usr_res);

		// Generate JavaScript code and display it.
		Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
		const code = Blockly.JavaScript.workspaceToCode(workspace);
		alert(code);
	}).catch((err) => {
		console.log(err);
	});
}

// /=====================================================================\
//	void stopCode()
// \=====================================================================/
function stopCode() {
	// Remove listeners
	webglCanvas.onclick = null;
	window.onkeypress = null;

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
	Promise.all(preLoad()).then((neverland) => {
		if (neverland)
			neverland.forEach((p) => {usr_res[p[0]] = p[1];});

		// Generate JavaScript code and run it.
		window.LoopTrap = 1000;
		Blockly.JavaScript.INFINITE_LOOP_TRAP =
				'if (--window.LoopTrap == 0) throw \'Infinite loop.\';\n';
		const code = Blockly.JavaScript.workspaceToCode(workspace);
		Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
		stopCode();
		try {
			eval(code);
		}
		catch (e) {
			stopCode();
			alert(e);
		}
	}).catch((err) => {
		console.log(err);
	});
}
