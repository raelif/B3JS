// /=====================================================================\
//	MUTATORS
// \=====================================================================/
Blockly.Blocks['arg_create_with_container'] = {
	init: function() {
		this.setColour(50);
		this.appendStatementInput('STACK');
		this.setTooltip("");
		this.contextMenu = false;
	}
};

Blockly.Blocks['arg_create_with_item'] = {
	init: function() {
		this.setColour(50);
		this.appendDummyInput()
				.appendField("arg");
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.setTooltip("");
		this.contextMenu = false;
	}
};

// /=====================================================================\
//	MUTATOR FUNCTIONS
// \=====================================================================/
function argMutationToDom() {
	var container = document.createElement('mutation');
	container.setAttribute('args', this.itemCount_);
	return container;
}

function argDomToMutation(xmlElement) {
	this.itemCount_ = parseInt(xmlElement.getAttribute('args'), 10);
	this.updateShape_();
}

function argDecompose(workspace) {
	var containerBlock = workspace.newBlock('arg_create_with_container');
	containerBlock.initSvg();
	var connection = containerBlock.getInput('STACK').connection;
	for (var i = 0; i < this.itemCount_; i++) {
		var itemBlock = workspace.newBlock('arg_create_with_item');
		itemBlock.initSvg();
		connection.connect(itemBlock.previousConnection);
		connection = itemBlock.nextConnection;
	}
	return containerBlock;
}

function argCompose(containerBlock) {
	var itemBlock = containerBlock.getInputTargetBlock('STACK');
	// Count number of inputs.
	var connections = [];
	while (itemBlock) {
		connections.push(itemBlock.valueConnection_);
		itemBlock = itemBlock.nextConnection &&
				itemBlock.nextConnection.targetBlock();
	}
	// Disconnect any children that don't belong.
	for (var i = 0; i < this.itemCount_; i++) {
		var connection = this.getInput('ADD' + i).connection.targetConnection;
		if (connection && connections.indexOf(connection) == -1) {
			connection.disconnect();
		}
	}
	this.itemCount_ = connections.length;
	this.updateShape_();
	// Reconnect any child blocks.
	for (var i = 0; i < this.itemCount_; i++) {
		Blockly.Mutator.reconnect(connections[i], this, 'ADD' + i);
	}
}

function argUpdateShape() {
	if (this.itemCount_ && this.getInput('EMPTY')) {
		this.removeInput('EMPTY');
	}
	// Add new inputs.
	for (var i = 0; i < this.itemCount_; i++) {
		if (!this.getInput('ADD' + i)) {
			var input = this.appendValueInput('ADD' + i).setCheck("Number");
			if (i == 0) {
				input.appendField("with args");
			}
		}
	}
	// Remove deleted inputs.
	while (this.getInput('ADD' + i)) {
		this.removeInput('ADD' + i);
		i++;
	}
}

// /=====================================================================\
//	BLOCKS
// \=====================================================================/
Blockly.Blocks['eb3js_dummy'] = {
	init: function() {
		this.appendDummyInput()
				.appendField("dummy");
		this.setInputsInline(true);
		this.setColour(50);
		this.setTooltip("");
		this.setHelpUrl("");
	}
};

Blockly.Blocks['eb3js_scene'] = {
	init: function() {
		this.appendDummyInput()
				.appendField("scene");
		this.setOutput(true, "Scene");
		this.setColour(50);
		this.setMutator(new Blockly.Mutator(['arg_create_with_item']));
		this.setInputsInline(true);
		this.setTooltip("");
		this.setHelpUrl("https://threejs.org/docs/index.html#api/en/scenes/Scene");
	},
	mutationToDom: argMutationToDom,
	domToMutation: argDomToMutation,
	decompose: argDecompose,
	compose: argCompose,
	updateShape_: argUpdateShape
};

Blockly.Blocks['eb3js_scene_add'] = {
	init: function() {
		this.appendValueInput("RECEIVER")
				.setCheck(["Scene", "Camera", "Geometry"])
				.appendField("add to")
				.appendField(new Blockly.FieldDropdown([["Scene","SCENE"], ["Camera","CAMERA"], ["Geometry","GEOMETRY"]]), "NAME");
		this.appendValueInput("ELEMENT")
				.setCheck("String")
				.appendField("element");
		this.setInputsInline(true);
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(50);
		this.setTooltip("");
		this.setHelpUrl("");
	}
};

// /=====================================================================\
//	BLOCKS_CODE
// \=====================================================================/
Blockly.JavaScript['eb3js_dummy'] = function(block) {
	// TODO: Assemble JavaScript into code variable.
	var code =
	// Scene - Context
		"var scene = new THREE.Scene();\n"+
		"var context = webglCanvas.getContext( 'webgl2' );\n"+

		// Camera ~ Can use outside Scope!!!
		"camera = new THREE.PerspectiveCamera( 75, webglCanvas.offsetWidth/webglCanvas.offsetHeight, 0.1, 1000 );\n"+

		// Renderer
		"renderer = new THREE.WebGLRenderer( { canvas: webglCanvas, context: context } );\n"+
		"renderer.setSize( webglCanvas.offsetWidth, webglCanvas.offsetHeight );\n"+

		// Cube = Geometry + Material
		"var geometry = new THREE.BoxGeometry( 1, 1, 1 );\n"+
		"var material = new THREE.MeshBasicMaterial( { color: 0xB30033 } );\n"+
		"var cube = new THREE.Mesh( geometry, material );\n"+
		"scene.add( cube );\n"+

		"camera.position.z = 5;\n"+

		"var animate = function () {\n"+
		"	requestAnimationFrame( animate );\n"+

		"	cube.rotation.x += 0.01;\n"+
		"	cube.rotation.y += 0.01;\n"+

		"	renderer.render( scene, camera );\n"+
		"};\n"+
		"animate();\n";

	// TODO: Change ORDER_NONE to the correct strength.
	return code;
};

Blockly.JavaScript['eb3js_scene'] = function(block) {
	// Retrieve args list
	var args = [block.itemCount_];
  for (var i = 0; i < block.itemCount_; i++) {
    args[i] = Blockly.JavaScript.valueToCode(block, 'ADD' + i,
        Blockly.JavaScript.ORDER_COMMA) || 'null';
  }
	// TODO: Assemble JavaScript into code variable.
	var code = "new THREE.Scene()";
	console.log(args);

	// TODO: Change ORDER_NONE to the correct strength.
	return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['eb3js_scene_add'] = function(block) {
	var dropdown_name = block.getFieldValue('NAME');
	var value_receiver = Blockly.JavaScript.valueToCode(block, 'RECEIVER', Blockly.JavaScript.ORDER_ATOMIC);
	var value_element = Blockly.JavaScript.valueToCode(block, 'ELEMENT', Blockly.JavaScript.ORDER_ATOMIC);
	// TODO: Assemble JavaScript into code variable.
	var code = '...;\n';
	return code;
};

//	=====================================================================
