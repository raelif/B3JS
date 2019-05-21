// /=====================================================================\
//	Globals ~ all accessors
// \=====================================================================/
const webglArea = document.getElementById('webglArea');
const webglCanvas = document.getElementById('webglCanvas');

const blocklyArea = document.getElementById('blocklyArea');
const blocklyDiv = document.getElementById('blocklyDiv');

const alertArea = document.getElementById('alertArea');
const alertPre = document.getElementById('alertPre');
const okButton = document.getElementById('okButton');

const valDex = {
	'camera': new Map(),
	'geometry': new Map(),
	'light': new Map(),
	'material': new Map(),
	'mesh': new Map()
};

var workspace;
var elapsed_time = 0;
var usr_res;

var demo_msgs, demo_goal, demo_lvl;

var scene = new THREE.Scene();
var current_camera;
var renderer;
var anim_id;
var shadow_mapping = false;
var global_clock = new THREE.Clock();

Blockly.JavaScript.addReservedWords('global_language'+'lang_elem'+'tr_lang'+
	'webglArea'+'webglCanvas'+'blocklyArea'+'blocklyDiv'+'alertArea'+'alertPre'+'okButton'+
	'valDex'+'workspace'+'elapsed_time'+'usr_res'+'demo_msgs'+'demo_goal'+'demo_lvl'+
	'scene'+'current_camera'+'renderer'+'anim_id'+'shadow_mapping'+'global_clock');

document.querySelectorAll('a').forEach((a) => {
	if (a.id === 'languageButton')
		a.innerHTML = tr_lang[global_language][a.id];
	else
		a.textContent = tr_lang[global_language][a.id];
});

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
		if (valDex['camera'].size < 1 || workspace.getBlocksByType('b3js_render_loop').length > 1) {
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
				var temp = block.getFieldValue(fid);
				if (temp) {
					block.setFieldValue('', fid);
					block.setFieldValue(temp, fid);

					// Additional work for getfrom with component
					temp = block.getFieldValue('COMP');
					if (temp) {
						block.setFieldValue('', 'COMP');
						block.setFieldValue(temp, 'COMP');
					}

					// Invalid option => reset
					temp = block.getField(fid).getText(); // SAFE fid != null
					if (temp === temp.toUpperCase()) {
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
				//console.log(valDex);
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
				//console.log(valDex);
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
				workspace.getAllBlocks().forEach((b) => {
					if (b.type.indexOf('b3js') >= 0)
						flicker(b);
				});
				//console.log(valDex);
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
			workspace.getAllBlocks().forEach((b) => {
				if (b.type.indexOf('b3js') >= 0)
					flicker(b);
			});
			//console.log(valDex);
		}
		break;

		case Blockly.Events.MOVE: {
			const type = block.type.split('_');
			if (type[0] === 'b3js') {
				// Move unnamed block
				if (type[1] === 'create') {
					if (block.getFieldValue('NAME') === '') {
						chooseName(block, type);
						//console.log(valDex);
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
//	void loadWorkspace(toolbox)
// \=====================================================================/
async function loadWorkspace(toolbox) {
	const xhr = new XMLHttpRequest();

	xhr.onload = function() {
		if (this.readyState === 4 && this.status === 200) {

			const options = {
				toolbox : this.response,
				collapse : true,
				comments : true,
				disable : true,
				maxBlocks : Infinity,
				trashcan : true,
				horizontalLayout : false,
				toolboxPosition : 'start',
				css : true,
				media : 'lib/media/',
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
					startScale : toolbox ? 0.25 : 0.75,
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
	if (!toolbox) {
		if (document.getElementById('language').lang === 'en')
			xhr.open('GET', 'src/toolbox_en.xml', true);
		else
			xhr.open('GET', 'src/toolbox_it.xml', true);
	}
	else {
		xhr.open('GET', toolbox, true);
	}
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
//	void importProject(file)
// \=====================================================================/
function importProject(file) {
	const importedXml = !file ? document.getElementById('importedXml').files[0] : file;

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
			});

			workspace.getAllBlocks().forEach((b) => {
				if (b.type.indexOf('b3js') >= 0)
					flicker(b);
			});
			//console.log(valDex);
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
//	void playDemo(name, lvl)
// \=====================================================================/
async function playDemo(name, lvl) {
	// Retrieve level
	demo_lvl = !lvl ? JSON.parse(localStorage.getItem(name)) : lvl;
	if (demo_lvl === null)
		demo_lvl = '1';
	if (name !== 'lan')
		localStorage.setItem(name, JSON.stringify(demo_lvl));

	// Async-Await
	try {
		// Load workspace
		await loadWorkspace('demos/' + name + '/' + global_language + '/toolbox_' + demo_lvl + '.xml');
	}
	catch(e) {
		console.log(e);
	}

	// Load conditions
		const msgol = new XMLHttpRequest();
		msgol.open('GET', 'demos/' + name + '/' + global_language + '/' + name + '_' + demo_lvl + '.txt');
		msgol.onload = function() {
			const temp = this.response.split('// Function levelCleared()');
			demo_msgs = temp[0];
			demo_goal = temp[1];
			alertPre.textContent = demo_msgs;
			okButton.textContent = 'OK';
			alertArea.style.display = 'block';

			// Load project
			const proj = new XMLHttpRequest();
			proj.open('GET', 'demos/' + name + '/' + name + '_' + demo_lvl + '.xml');
			proj.onload = function() {
				importProject(new Blob([this.response], {type: 'text/xml'}));
			};
			proj.send();
		};
		msgol.send();
}

// /=====================================================================\
//	void showMsg()
// \=====================================================================/
function showMsg() {
	okButton.textContent = 'OK';
	alertPre.textContent = demo_msgs;
	alertArea.style.display = 'block';
}

// /=====================================================================\
//	void startOver(name)
// \=====================================================================/
function startOver(name) {
	localStorage.setItem(name, JSON.stringify('1'));
	playDemo(name);
}

// /=====================================================================\
//	void exitDemo()
// \=====================================================================/
function exitDemo() {
	demo_msgs = undefined;
	demo_goal = undefined;
	alertArea.style.display = 'none';
	loadWorkspace();
	stopCode();
}

// /=====================================================================\
//	void vanish()
// \=====================================================================/
function vanish() {
	alertArea.style.display = 'none';
	if (okButton.textContent === tr_lang[global_language]['advance']) {
		stopCode();
		playDemo('snake', JSON.stringify((parseInt(demo_lvl, 10) + 1)));
	}
}

// /=====================================================================\
//	void askToAdvance()
// \=====================================================================/
function askToAdvance() {
	okButton.textContent = tr_lang[global_language]['advance'];
	alertPre.textContent = tr_lang[global_language]['congrats'];
	alertArea.style.display = 'block';
}

// /=====================================================================\
//	void openFullScreen(div)
// \=====================================================================/
function openFullscreen(div) {
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
	stopCode();
	localStorage.setItem('lan', JSON.stringify(radio.value));
	location.reload();
}

// /=====================================================================\
//	void preLoad()
// \=====================================================================/
function preLoad() {
	const promises = [];
	usr_res = {};
	workspace.getBlocksByType('b3js_create_mesh_from_file').forEach((b) => {
		const key = 'mesh_' + b.getFieldValue('NAME');
		const file_name = b.getInputTargetBlock('VALUE').getFieldValue('TEXT');

		if (file_name.indexOf('.obj') >= 0) {
			const mtl = file_name.replace('.obj', '.mtl');
			promises.push(new Promise((resolve, reject) => {
				new THREE.MTLLoader().setResourcePath('./resources/')
					.load('./resources/' + mtl, (m) => {
						new THREE.OBJLoader().setMaterials(m)
							.load('./resources/' + file_name, (obj) => resolve([key, obj]), undefined, reject);
					});
			}));
		}
		else if (file_name.indexOf('.dae') >= 0) {
			promises.push(new Promise((resolve, reject) => {
				new THREE.ColladaLoader()
					.load('./resources/' + file_name, (dae) => resolve([key, dae]), undefined, reject);
			}));
		}
		else if (file_name.indexOf('.gltf') >= 0 || file_name.indexOf('.glb') >= 0) {
			promises.push(new Promise((resolve, reject) => {
				new THREE.GLTFLoader()
					.load('./resources/' + file_name, (gltf) => resolve([key, gltf]), undefined, reject);
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
		//console.log(usr_res);

		// Generate JavaScript code and display it.
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
	window.onkeydown = null;

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
		//console.log(usr_res);

		stopCode();

		const code = Blockly.JavaScript.workspaceToCode(workspace);
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
