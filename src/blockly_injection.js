// /=====================================================================\
//	Globals ~ all accessors
// \=====================================================================/
var webglArea = document.getElementById("webglArea");
var webglCanvas = document.getElementById("webglCanvas");

var blocklyArea = document.getElementById("blocklyArea");
var blocklyDiv = document.getElementById("blocklyDiv");

var xhr = new XMLHttpRequest();
var workspace = undefined;

// /=====================================================================\
//	onload ~ onresize
// \=====================================================================/
xhr.onload = function () {
	if (xhr.readyState === 4 && xhr.status === 200) {

		var options = {
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
			}
		};

		workspace = Blockly.inject(blocklyDiv, options);

		var onresize = function(e) {
			// Compute the absolute coordinates and dimensions of blocklyArea.
			var element = blocklyArea;
			var x = 0;
			var y = 0;
			do {
				x += element.offsetLeft;
				y += element.offsetTop;
				element = element.offsetParent;
			} while (element);

			// Position blocklyDiv over blocklyArea.
			blocklyDiv.style.left = x + "px";
			blocklyDiv.style.top = y + "px";
			blocklyDiv.style.width = blocklyArea.offsetWidth + "px";
			blocklyDiv.style.height = blocklyArea.offsetHeight + "px";
			Blockly.svgResize(workspace);

			// Resize webglCanvas.
			webglCanvas.style.width = webglArea.offsetWidth + "px";
			webglCanvas.style.height = webglArea.offsetHeight + "px";
		};

		window.addEventListener("resize", onresize, false);
		onresize();
		Blockly.svgResize(workspace);
	}
};

xhr.overrideMimeType("text/xml");
xhr.open("GET", "src/toolbox.xml", true);
xhr.send();

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
//	void showCode()
// \=====================================================================/
function showCode() {
	// Generate JavaScript code and display it.
	Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
	var code = Blockly.JavaScript.workspaceToCode(workspace);
	alert(code);

	//var xml = Blockly.Xml.workspaceToDom(workspace);
	//var xml_text = Blockly.Xml.domToText(xml);
}

// /=====================================================================\
//	void runCode()
// \=====================================================================/
function runCode() {
	// Generate JavaScript code and run it.
	window.LoopTrap = 1000;
	Blockly.JavaScript.INFINITE_LOOP_TRAP =
			'if (--window.LoopTrap == 0) throw "Infinite loop.";\n';
	var code = Blockly.JavaScript.workspaceToCode(workspace);
	Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
	try {
		eval(code);
	} catch (e) {
		alert(e);
	}
}
