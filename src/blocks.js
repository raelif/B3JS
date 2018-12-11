// /=====================================================================\
//  BLOCKS
// \=====================================================================/
Blockly.Blocks['dummy'] = {
	init: function() {
		this.appendDummyInput()
				.appendField("dummy");
		this.setInputsInline(true);
		this.setColour(50);
	this.setTooltip("");
	this.setHelpUrl("");
	this.mixin(DUMMY_MIXIN);
	this.setMutator(new Blockly.Mutator(['dummy_with_item']));
	}
};

Blockly.Blocks['value_element'] = {
	init: function() {
		this.appendDummyInput()
				.appendField(new Blockly.FieldDropdown(() => value_option('Element')), "DROP");
		this.setOutput(true, null);
		this.setColour(50);
	this.setTooltip("Retrieve an Element.");
	this.setHelpUrl("");
	this.setDisabled(valDex['Element'].size === 0);
	}
};

Blockly.Blocks['create_element'] = {
	init: function() {
		this.appendDummyInput()
				.appendField("element")
				.appendField(new Blockly.FieldTextInput("", (s) => null), "NAME");
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(50);
	this.setTooltip("Create a new Element.");
	this.setHelpUrl("");
	}
};

Blockly.Blocks['add_scene'] = {
	init: function() {
		this.appendValueInput("ELEMENT")
				.setCheck(["Camera", "Light", "Mesh"])
				.appendField("add");
		this.appendDummyInput()
				.appendField("to scene");
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(0);
	this.setTooltip("Add Mesh, Light or Camera to the Scene.");
	this.setHelpUrl("https://threejs.org/docs/index.html#api/en/scenes/Scene");
	}
};

Blockly.Blocks['set_scene'] = {
	init: function() {
		this.appendValueInput("VALUE")
				.setCheck(["Colour", "Texture", "Fog", "Boolean", "Material"])
				.appendField("set scene")
				.appendField(new Blockly.FieldDropdown([["background","BACKGROUND"], ["fog","FOG"], ["autoUpdate","UPDATE"], ["overrideMaterial","MATERIAL"]]), "FIELD")
				.appendField("to");
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(0);
	this.setTooltip("Set property of the Scene.");
	this.setHelpUrl("https://threejs.org/docs/index.html#api/en/scenes/Scene");
	}
};

Blockly.Blocks['value_camera'] = {
	init: function() {
		this.appendDummyInput()
				.appendField(new Blockly.FieldDropdown(() => value_option('Camera')), "DROP");
		this.setOutput(true, "Camera");
		this.setColour(200);
	this.setTooltip("Retrieve a Camera.");
	this.setHelpUrl("https://threejs.org/docs/index.html#api/en/cameras/Camera");
	this.setDisabled(valDex['Camera'].size === 0);
	}
};

Blockly.Blocks['create_camera'] = {
	init: function() {
		this.appendDummyInput()
				.appendField("camera")
				.appendField(new Blockly.FieldTextInput("", (s) => null), "NAME")
				.appendField("as")
				.appendField(new Blockly.FieldDropdown([["perspective","PERSPECTIVE"], ["orthographic","ORTHOGRAPHIC"]],
					create_camera_validator), "TYPE");
		this.appendDummyInput("CHANGE")
				.appendField("fov")
				.appendField(new Blockly.FieldNumber(0), "FOV");
		this.appendDummyInput("PARAM")
				.appendField("near")
				.appendField(new Blockly.FieldNumber(0), "NEAR")
				.appendField("far")
				.appendField(new Blockly.FieldNumber(0), "FAR");
		this.setInputsInline(true);
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(200);
	this.setTooltip("Create a new Camera.");
	this.setHelpUrl("https://threejs.org/docs/index.html#api/en/cameras/Camera");
	this.mixin(CAMERA_MIXIN);
	}
};

Blockly.Blocks['set_camera'] = {
	init: function() {
		this.appendValueInput("CAMERA")
				.setCheck("Camera")
				.appendField("set");
		this.appendValueInput("NAME")
				.setCheck("Vector")
				.appendField(new Blockly.FieldDropdown([["position","POSITION"], ["lookAt","LOOKAT"]]), "FIELD")
				.appendField("to");
		this.setInputsInline(true);
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(200);
	this.setTooltip("");
	this.setHelpUrl("Set property of a previously created Camera.");
	}
};

Blockly.Blocks['value_light'] = {
	init: function() {
		this.appendDummyInput()
				.appendField(new Blockly.FieldDropdown(() => value_option('Light')), "DROP");
		this.setOutput(true, "Light");
		this.setColour(300);
	this.setTooltip("Retrieve a Light.");
	this.setHelpUrl("");
	this.setDisabled(valDex['Light'].size === 0);
	}
};

Blockly.Blocks['create_light'] = {
	init: function() {
		this.appendDummyInput()
				.appendField("light")
				.appendField(new Blockly.FieldTextInput("", (s) => null), "NAME")
				.appendField("as")
				.appendField(new Blockly.FieldDropdown([["ambient","AMBIENT"], ["point","POINT"], ["spot","SPOT"], ["directional","DIRECTIONAL"], ["hemisphere","HEMISPHERE"]]), "TYPE");
		this.appendValueInput("COLOUR")
				.setCheck(["String", "Colour"])
				.appendField("with color");
		this.setInputsInline(true);
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(300);
	this.setTooltip("Create a new Light.");
	this.setHelpUrl("");
	}
};

Blockly.Blocks['set_light'] = {
	init: function() {
		this.appendValueInput("LIGHT")
				.setCheck("Light")
				.appendField("set");
		this.appendValueInput("NAME")
				.setCheck(["Colour", "Vector", "String", "Number", "Boolean"])
				.appendField(new Blockly.FieldDropdown([["color","COLOR"], ["intensity","INTENSITY"], ["position","POSITION"], ["distance","DISTANCE"], ["visible","VISIBLE"]]), "FIELD")
				.appendField("to");
		this.setInputsInline(true);
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(300);
	this.setTooltip("Set property of a previously created Light.");
	this.setHelpUrl("");
	}
};

Blockly.Blocks['value_material'] = {
	init: function() {
		this.appendDummyInput()
				.appendField(new Blockly.FieldDropdown(() => value_option('Material')), "DROP");
		this.setOutput(true, "Material");
		this.setColour(250);
	this.setTooltip("Retrieve a Material.");
	this.setHelpUrl("");
	this.setDisabled(valDex['Material'].size === 0);
	}
};

Blockly.Blocks['create_material'] = {
	init: function() {
		this.appendDummyInput()
				.appendField("material")
				.appendField(new Blockly.FieldTextInput("", (s) => null), "NAME")
				.appendField("as")
				.appendField(new Blockly.FieldDropdown([["normal","NORMAL"], ["labert","LAMBERT"], ["phong","PHONG"]]), "TYPE");
		this.appendValueInput("COLOUR")
				.setCheck(["String", "Colour"])
				.appendField("with color");
		this.setInputsInline(true);
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(250);
	this.setTooltip("Create a new Material.");
	this.setHelpUrl("");
	}
};

Blockly.Blocks['set_material'] = {
	init: function() {
		this.appendValueInput("MATERIAL")
				.setCheck("Material")
				.appendField("set");
		this.appendValueInput("NAME")
				.setCheck(["Colour", "Number", "Boolean"])
				.appendField(new Blockly.FieldDropdown([["color","COLOR"], ["opacity","OPACITY"], ["transparent","TRANSPARENT"], ["visible","VISIBLE"]]), "FIELD")
				.appendField("to");
		this.setInputsInline(true);
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(250);
	this.setTooltip("Set property of a previously created Material.");
	this.setHelpUrl("");
	}
};

Blockly.Blocks['value_geometry'] = {
	init: function() {
		this.appendDummyInput()
				.appendField(new Blockly.FieldDropdown(() => value_option('Geometry')), "DROP");
		this.setOutput(true, "Geometry");
		this.setColour(150);
	this.setTooltip("Retrieve a Geometry.");
	this.setHelpUrl("");
	this.setDisabled(valDex['Geometry'].size === 0);
	}
};

Blockly.Blocks['vec2'] = {
	init: function() {
		this.appendDummyInput()
				.appendField("x")
				.appendField(new Blockly.FieldNumber(0), "X")
				.appendField("y")
				.appendField(new Blockly.FieldNumber(0), "Y");
		this.setInputsInline(true);
		this.setOutput(true, "Vec2");
		this.setColour(150);
	this.setTooltip("Return a new Vector of 2 dimensions.");
	this.setHelpUrl("https://threejs.org/docs/index.html#api/en/math/Vector2");
	}
};

Blockly.Blocks['vec3'] = {
	init: function() {
		this.appendDummyInput()
				.appendField("x")
				.appendField(new Blockly.FieldNumber(0), "X")
				.appendField("y")
				.appendField(new Blockly.FieldNumber(0), "Y")
				.appendField("z")
				.appendField(new Blockly.FieldNumber(0), "Z");
		this.setInputsInline(true);
		this.setOutput(true, "Vec3");
		this.setColour(150);
	this.setTooltip("Return a new Vector of 3 dimensions.");
	this.setHelpUrl("https://threejs.org/docs/index.html#api/en/math/Vector3");
	}
};

Blockly.Blocks['vec4'] = {
	init: function() {
		this.appendDummyInput()
				.appendField("x")
				.appendField(new Blockly.FieldNumber(0), "X")
				.appendField("y")
				.appendField(new Blockly.FieldNumber(0), "Y")
				.appendField("z")
				.appendField(new Blockly.FieldNumber(0), "Z")
				.appendField("w")
				.appendField(new Blockly.FieldNumber(0), "W");
		this.setInputsInline(true);
		this.setOutput(true, "Vec4");
		this.setColour(150);
	this.setTooltip("Return a new Vector of 4 dimensions.");
	this.setHelpUrl("https://threejs.org/docs/index.html#api/en/math/Vector4");
	}
};

Blockly.Blocks['create_geometry'] = {
	init: function() {
		this.appendDummyInput()
				.appendField("geometry")
				.appendField(new Blockly.FieldTextInput("", (s) => null), "NAME")
				.appendField("as")
				.appendField(new Blockly.FieldDropdown([["plane","PLANE"], ["box","BOX"], ["sphere","SPHERE"], ["cylinder","CYLINDER"], ["torus","TORUS"]]), "TYPE");
		this.appendDummyInput()
				.appendField("w")
				.appendField(new Blockly.FieldNumber(0), "WIDTH")
				.appendField("h")
				.appendField(new Blockly.FieldNumber(0), "HEIGHT");
		this.setInputsInline(true);
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(150);
	this.setTooltip("Create a new Geometry.");
	this.setHelpUrl("");
	}
};

Blockly.Blocks['set_geometry'] = {
	init: function() {
		this.appendValueInput("GEOMETRY")
				.setCheck("Geometry")
				.appendField("set");
		this.appendValueInput("NAME")
				.setCheck(["Number", "Boolean"])
				.appendField(new Blockly.FieldDropdown([["depth","DEPTH"]]), "FIELD")
				.appendField("to");
		this.setInputsInline(true);
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(150);
	this.setTooltip("Set property of a previously created Geometry.");
	this.setHelpUrl("");
	}
};

Blockly.Blocks['value_mesh'] = {
	init: function() {
		this.appendDummyInput()
				.appendField(new Blockly.FieldDropdown(() => value_option('Mesh')), "DROP");
		this.setOutput(true, "Mesh");
		this.setColour(100);
	this.setTooltip("Retrieve a Mesh.");
	this.setHelpUrl("");
	this.setDisabled(valDex['Mesh'].size === 0);
	}
};

Blockly.Blocks['create_mesh'] = {
	init: function() {
		this.appendDummyInput()
				.appendField("mesh")
				.appendField(new Blockly.FieldTextInput("", (s) => null), "NAME")
				.appendField("as");
		this.appendValueInput("GEOMETRY")
				.setCheck("Geometry")
				.appendField("geometry");
		this.appendValueInput("MATERIAL")
				.setCheck("Material")
				.appendField("material");
		this.setInputsInline(true);
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(100);
	this.setTooltip("Create a new Mesh.");
	this.setHelpUrl("");
	}
};

// /=====================================================================\
//  BLOCKS CODE
// \=====================================================================/
Blockly.JavaScript['dummy'] = function(block) {
	// TODO: Assemble JavaScript into code variable.
	var code =
	// Scene - Context
		"const scene = new THREE.Scene();\n"+
		"const context = webglCanvas.getContext( 'webgl2' );\n"+

		// Camera ~ Can use outside Scope!!!
		"camera = new THREE.PerspectiveCamera( 75, webglCanvas.offsetWidth/webglCanvas.offsetHeight, 0.1, 1000 );\n"+

		// Renderer
		"renderer = new THREE.WebGLRenderer( { canvas: webglCanvas, context: context } );\n"+
		"renderer.setSize( webglCanvas.offsetWidth, webglCanvas.offsetHeight );\n"+

		// Cube = Geometry + Material
		"const geometry = new THREE.BoxGeometry( 1, 1, 1 );\n"+
		"const material = new THREE.MeshBasicMaterial( { color: 0xB30033 } );\n"+
		"const cube = new THREE.Mesh( geometry, material );\n"+
		"scene.add( cube );\n"+

		"camera.position.z = 5;\n"+

		"const animate = function () {\n"+
		" requestAnimationFrame( animate );\n"+

		" cube.rotation.x += 0.01;\n"+
		" cube.rotation.y += 0.01;\n"+

		" renderer.render( scene, camera );\n"+
		"};\n"+
		"animate();\n";

	// TODO: Change ORDER_NONE to the correct strength.
	return code;
};

Blockly.JavaScript['value_element'] = function(block) {
	var dropdown_drop = block.getFieldValue('DROP');
	// TODO: Assemble JavaScript into code variable.
	var code = '...';
	// TODO: Change ORDER_NONE to the correct strength.
	return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['create_element'] = function(block) {
	var text_name = block.getFieldValue('NAME');
	// TODO: Assemble JavaScript into code variable.
	var code = '...;\n';
	return code;
};

Blockly.JavaScript['add_scene'] = function(block) {
	var value_element = Blockly.JavaScript.valueToCode(block, 'ELEMENT', Blockly.JavaScript.ORDER_ATOMIC);
	// TODO: Assemble JavaScript into code variable.
	var code = '...;\n';
	return code;
};

Blockly.JavaScript['set_scene'] = function(block) {
	var dropdown_field = block.getFieldValue('FIELD');
	var value_value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_ATOMIC);
	// TODO: Assemble JavaScript into code variable.
	var code = '...;\n';
	return code;
};

Blockly.JavaScript['value_camera'] = function(block) {
	var dropdown_drop = block.getFieldValue('DROP');
	// TODO: Assemble JavaScript into code variable.
	var code = '...';
	// TODO: Change ORDER_NONE to the correct strength.
	return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['create_camera'] = function(block) {
	var text_name = block.getFieldValue('NAME');
	var dropdown_type = block.getFieldValue('TYPE');
	var number_fov = block.getFieldValue('FOV');
	var number_near = block.getFieldValue('NEAR');
	var number_far = block.getFieldValue('FAR');
	// TODO: Assemble JavaScript into code variable.
	var code = '...;\n';
	return code;
};

Blockly.JavaScript['set_camera'] = function(block) {
	var value_camera = Blockly.JavaScript.valueToCode(block, 'CAMERA', Blockly.JavaScript.ORDER_ATOMIC);
	var dropdown_field = block.getFieldValue('FIELD');
	var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
	// TODO: Assemble JavaScript into code variable.
	var code = '...;\n';
	return code;
};

Blockly.JavaScript['value_light'] = function(block) {
	var dropdown_drop = block.getFieldValue('DROP');
	// TODO: Assemble JavaScript into code variable.
	var code = '...';
	// TODO: Change ORDER_NONE to the correct strength.
	return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['create_light'] = function(block) {
	var text_name = block.getFieldValue('NAME');
	var dropdown_type = block.getFieldValue('TYPE');
	var value_colour = Blockly.JavaScript.valueToCode(block, 'COLOUR', Blockly.JavaScript.ORDER_ATOMIC);
	// TODO: Assemble JavaScript into code variable.
	var code = '...;\n';
	return code;
};

Blockly.JavaScript['set_light'] = function(block) {
	var value_light = Blockly.JavaScript.valueToCode(block, 'LIGHT', Blockly.JavaScript.ORDER_ATOMIC);
	var dropdown_field = block.getFieldValue('FIELD');
	var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
	// TODO: Assemble JavaScript into code variable.
	var code = '...;\n';
	return code;
};

Blockly.JavaScript['value_material'] = function(block) {
	var dropdown_drop = block.getFieldValue('DROP');
	// TODO: Assemble JavaScript into code variable.
	var code = '...';
	// TODO: Change ORDER_NONE to the correct strength.
	return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['create_material'] = function(block) {
	var text_name = block.getFieldValue('NAME');
	var dropdown_type = block.getFieldValue('TYPE');
	var value_colour = Blockly.JavaScript.valueToCode(block, 'COLOUR', Blockly.JavaScript.ORDER_ATOMIC);
	// TODO: Assemble JavaScript into code variable.
	var code = '...;\n';
	return code;
};

Blockly.JavaScript['set_material'] = function(block) {
	var value_material = Blockly.JavaScript.valueToCode(block, 'MATERIAL', Blockly.JavaScript.ORDER_ATOMIC);
	var dropdown_field = block.getFieldValue('FIELD');
	var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
	// TODO: Assemble JavaScript into code variable.
	var code = '...;\n';
	return code;
};

Blockly.JavaScript['value_geometry'] = function(block) {
	var dropdown_drop = block.getFieldValue('DROP');
	// TODO: Assemble JavaScript into code variable.
	var code = '...';
	// TODO: Change ORDER_NONE to the correct strength.
	return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['vec2'] = function(block) {
	var number_x = block.getFieldValue('X');
	var number_y = block.getFieldValue('Y');
	// TODO: Assemble JavaScript into code variable.
	var code = '...';
	// TODO: Change ORDER_NONE to the correct strength.
	return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['vec3'] = function(block) {
	var number_x = block.getFieldValue('X');
	var number_y = block.getFieldValue('Y');
	var number_z = block.getFieldValue('Z');
	// TODO: Assemble JavaScript into code variable.
	var code = '...';
	// TODO: Change ORDER_NONE to the correct strength.
	return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['vec4'] = function(block) {
	var number_x = block.getFieldValue('X');
	var number_y = block.getFieldValue('Y');
	var number_z = block.getFieldValue('Z');
	var number_w = block.getFieldValue('W');
	// TODO: Assemble JavaScript into code variable.
	var code = '...';
	// TODO: Change ORDER_NONE to the correct strength.
	return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['create_geometry'] = function(block) {
	var text_name = block.getFieldValue('NAME');
	var dropdown_type = block.getFieldValue('TYPE');
	var number_width = block.getFieldValue('WIDTH');
	var number_height = block.getFieldValue('HEIGHT');
	// TODO: Assemble JavaScript into code variable.
	var code = '...;\n';
	return code;
};

Blockly.JavaScript['set_geometry'] = function(block) {
	var value_geometry = Blockly.JavaScript.valueToCode(block, 'GEOMETRY', Blockly.JavaScript.ORDER_ATOMIC);
	var dropdown_field = block.getFieldValue('FIELD');
	var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
	// TODO: Assemble JavaScript into code variable.
	var code = '...;\n';
	return code;
};

Blockly.JavaScript['value_mesh'] = function(block) {
	var dropdown_drop = block.getFieldValue('DROP');
	// TODO: Assemble JavaScript into code variable.
	var code = '...';
	// TODO: Change ORDER_NONE to the correct strength.
	return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['create_mesh'] = function(block) {
	var text_name = block.getFieldValue('NAME');
	var value_geometry = Blockly.JavaScript.valueToCode(block, 'GEOMETRY', Blockly.JavaScript.ORDER_ATOMIC);
	var value_material = Blockly.JavaScript.valueToCode(block, 'MATERIAL', Blockly.JavaScript.ORDER_ATOMIC);
	// TODO: Assemble JavaScript into code variable.
	var code = '...;\n';
	return code;
};
