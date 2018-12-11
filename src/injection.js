// /=====================================================================\
//	Globals ~ all accessors
// \=====================================================================/
const webglArea = document.getElementById('webglArea');
const webglCanvas = document.getElementById('webglCanvas');

const blocklyArea = document.getElementById('blocklyArea');
const blocklyDiv = document.getElementById('blocklyDiv');

const checkExp = document.getElementById('checkExp');

const valDex = {
	'Camera': new Map(),
	'Element': new Map(),
	'Geometry': new Map(),
	'Light': new Map(),
	'Material': new Map(),
	'Mesh': new Map()
}

var workspace;

var camera;
var renderer;

// /=====================================================================\
//	void onresize()
// \=====================================================================/
function onresize() {
	// Resize webglCanvas.
	webglCanvas.style.width = webglArea.offsetWidth + "px";
	webglCanvas.style.height = webglArea.offsetHeight + "px";

	if (renderer && camera) {
		camera.aspect = webglArea.offsetWidth/webglArea.offsetHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(webglArea.offsetWidth, webglArea.offsetHeight);
	}

	// Resize blocklyDiv
	blocklyDiv.style.width = blocklyArea.offsetWidth + "px";
	blocklyDiv.style.height = blocklyArea.offsetHeight + "px";
	Blockly.svgResize(workspace);
}
window.addEventListener('resize', onresize, false);

// /=====================================================================\
//	void typeCreation(block, type)
// \=====================================================================/
function typeCreation(block, type) {
	// new typing
	if (block.getFieldValue("NAME") === "") {
		// fetch name .replace(/\W/g, ""); || .replace(/[^a-z0-9 ]/gi, "");
		let name = prompt("Type name of element:");
		while (valDex[type].has(name)) {
			name = prompt("Name already in use! Choose a different one:");
		}
		block.workspace.cancelCurrentGesture();

		// valid name -> add to valDex
		if (name !== null && name !== "") {
			valDex[type].set(name, valDex[type].size.toString());
			block.setFieldValue(name, "NAME");
			console.log(valDex);
		}
		// non valid name
		else {
			block.dispose();
		}
	}
	// importing or trying to duplicate a create_element
	else {
		if (workspace.getAllBlocks().map((e) => e.getFieldValue("NAME"))
			.reduce(((res, e) => res + (e === block.getFieldValue("NAME") ? 1 : 0)), 0) > 1) {
			block.dispose();
			alert("No twin elements can exist!!!");
		}
	}
}

// /=====================================================================\
//	void valManagement(event)
// \=====================================================================/
function valManagement(event) {
	const block = workspace.getBlockById(event.blockId);

	switch (event.type) {
		case Blockly.Events.BLOCK_CREATE:
			const action_type = block.type.split("_");
			// new create_element
			if (action_type[0] === 'create') {
				typeCreation(block, action_type[1].replace(/\b\w/g, l => l.toUpperCase()));
			}
			break;

		case Blockly.Events.BLOCK_DELETE:
			// reload valDex
			Object.keys(valDex)
				.forEach((e) => valDex[e].clear());

			workspace.getAllBlocks()
				.filter((b) => {if (b.type.split("_")[0] === 'create') return b;})
				.forEach((b) => {
					const type = b.type.split("_")[1].replace(/\b\w/g, l => l.toUpperCase());
					valDex[type].set(b.getFieldValue("NAME"), valDex[type].size.toString())
				});

			// correct value_
			workspace.getAllBlocks()
				.filter((b) => {if (b.type.split("_")[0] === 'value') return b;})
				.forEach((b) => {
					const type = b.type.split("_")[1].replace(/\b\w/g, l => l.toUpperCase());
					if (b.getField("DROP").getText() !== "" && !valDex[type].has(b.getField("DROP").getText()))
						b.dispose();
					else
						b.setFieldValue(valDex[type].get(b.getField("DROP").getText()), "DROP");
				});

			console.log(valDex);
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
				trashcan : false,
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
				valDex.clear();
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
	const comment = Array.from(valDex).map((e) => e[0]).reduce(((res, e) => res + e + "\t"), "<!--") + "-->";

	const filename = prompt("Save As");
	console.log("Saved " + filename);

	const downloadFile = function(content, type) {
		const download = document.createElement('a');
		download.style.display = 'none';
		download.setAttribute('href', "data:text/" + type + "; charset=utf-8,"
			+ encodeURIComponent(content));
		type === 'xml' ? type = type : type = 'js';
		download.setAttribute('download', filename + "." + type);

		document.body.appendChild(download);
		download.click();
		document.body.removeChild(download);
	};

	if (filename !== null && filename !== "") {
		downloadFile(code, 'javascript');
		downloadFile(xml_text + "\n" + comment, 'xml');
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
			const textFromFile = e.target.result;
			// clear
			workspace.clear();
			valDex.clear();

			// reload valDex
			textFromFile.split("\n")[1]
				.slice(4,-4)
					.split("\t")
					.forEach((e) => valDex.set(e, valDex.size.toString()));

			// load workspace
			Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(textFromFile), workspace);
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
//	void runCode()
// \=====================================================================/
function runCode() {
	// Generate JavaScript code and run it.
	window.LoopTrap = 1000;
	Blockly.JavaScript.INFINITE_LOOP_TRAP =
			'if (--window.LoopTrap == 0) throw "Infinite loop.";\n';
	const code = Blockly.JavaScript.workspaceToCode(workspace);
	Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
	try {
		eval(code);
	} catch (e) {
		alert(e);
	}
}
