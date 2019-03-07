// /=====================================================================\
//  BLOCKS
// \=====================================================================/
Blockly.Blocks['b3js_add_scene'] = {
	init: function() {
		this.appendValueInput('ELEMENT')
				.setCheck(['Camera', 'Light', 'Mesh'])
				.appendField('add');
		this.appendDummyInput('END')
				.appendField('to scene');
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(0);
		this.setInputsInline(true);
	this.setTooltip('Add Mesh, Light or Camera to the Scene.');
	this.setHelpUrl('https://threejs.org/docs/index.html#api/en/scenes/Scene');
	this.mixin(ADD_MIXIN);
	this.setMutator(new Blockly.Mutator(['scene_with_element']));
	}
};

Blockly.Blocks['b3js_set_scene'] = {
	init: function() {
		this.appendDummyInput()
				.appendField('set scene')
				.appendField(new Blockly.FieldDropdown([['background','BACKGROUND'], ['fog','FOG'], ['autoUpdate','AUPDATE'], ['overrideMaterial','OMATERIAL']], block_validator), 'FIELD');
		this.appendValueInput('VALUE')
				.setCheck(['Colour', 'String', 'Texture'])
				.appendField('to');
		this.setInputsInline(true);
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(0);
	this.setTooltip('Set property of the Scene.');
	this.setHelpUrl('https://threejs.org/docs/index.html#api/en/scenes/Scene');
	this.mixin(BLOCK_MIXIN);
	this.mixin(SET_SCENE_SHAPE);
	}
};

Blockly.Blocks['b3js_create_camera'] = {
	init: function() {
		this.appendDummyInput()
				.appendField('camera')
				.appendField(new Blockly.FieldTextInput('', (s) => null), 'NAME')
				.appendField('as')
				.appendField(new Blockly.FieldDropdown([['perspective','PERSPECTIVE'], ['orthographic','ORTHOGRAPHIC']],
					block_validator), 'TYPE');
		this.appendDummyInput('CHANGE')
				.appendField('fov')
				.appendField(new Blockly.FieldNumber(50), 'FOVSCALE')
				.appendField('near')
				.appendField(new Blockly.FieldNumber(0.1), 'NEAR')
				.appendField('far')
				.appendField(new Blockly.FieldNumber(1000), 'FAR');
		this.setInputsInline(true);
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(200);
	this.setTooltip('Create a new Camera.');
	this.setHelpUrl('https://threejs.org/docs/index.html#api/en/cameras/Camera');
	this.mixin(BLOCK_MIXIN);
	this.mixin(CREATE_CAMERA_SHAPE);
	}
};

Blockly.Blocks['b3js_set_camera'] = {
	init: function() {
		this.appendValueInput('INPUT')
				.setCheck('Camera')
				.appendField('set');
		this.appendDummyInput()
				.appendField(new Blockly.FieldDropdown([['position','POSITION'], ['lookAt','LOOKAT'], ['translate','TRANSLATE'], ['scale','SCALE'], ['rotateX','RX'], ['rotateY','RY'], ['rotateZ','RZ']], block_validator), 'FIELD');
		this.appendValueInput('VALUE')
				.setCheck('Vec3')
				.appendField('to');
		this.setInputsInline(true);
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(200);
	this.setTooltip('Set property of a previously created Camera.');
	this.setHelpUrl('');
	this.mixin(BLOCK_MIXIN);
	this.mixin(SET_CAMERA_SHAPE);
	this.setDisabled(!valDex['camera'].size);
	}
};

Blockly.Blocks['b3js_value_camera'] = {
	init: function() {
		this.appendDummyInput()
				.appendField(new Blockly.FieldDropdown(() => block_option(['value', 'camera'])), 'VAL');
		this.setOutput(true, 'Camera');
		this.setColour(200);
	this.setTooltip('Retrieve a Camera.');
	this.setHelpUrl('https://threejs.org/docs/index.html#api/en/cameras/Camera');
	this.setDisabled(!valDex['camera'].size);
	this.mixin(BLOCK_MIXIN);
	}
};

Blockly.Blocks['b3js_create_light'] = {
	init: function() {
		this.appendDummyInput()
				.appendField('light')
				.appendField(new Blockly.FieldTextInput('', (s) => null), 'NAME')
				.appendField('as')
				.appendField(new Blockly.FieldDropdown([['ambient','AMBIENT'], ['point','POINT'], ['spot','SPOT'], ['directional','DIRECTIONAL'], ['hemisphere','HEMISPHERE']], block_validator), 'TYPE');
		this.appendDummyInput('CHANGE')
				.appendField('color')
				.appendField(new Blockly.FieldColour('#ffffff'), 'COLOUR')
				.appendField('intensity')
				.appendField(new Blockly.FieldNumber(1, 0), 'INTENSITY');
		this.setInputsInline(true);
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(300);
	this.setTooltip('Create a new Light.');
	this.setHelpUrl('');
	this.mixin(BLOCK_MIXIN);
	this.mixin(CREATE_LIGHT_SHAPE);
	}
};

Blockly.Blocks['b3js_set_light'] = {
	init: function() {
		this.appendValueInput('INPUT')
				.setCheck('Light')
				.appendField('set');
		this.appendDummyInput()
				.appendField(new Blockly.FieldDropdown(() => block_option(['set', 'light'], this.getInputTargetBlock('INPUT')),
					block_validator), 'FIELD');
		this.appendValueInput('VALUE')
				.setCheck(['Colour', 'String'])
				.appendField('to');
		this.setInputsInline(true);
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(300);
	this.setTooltip('Set property of a previously created Light.');
	this.setHelpUrl('');
	this.mixin(BLOCK_MIXIN);
	this.mixin(SET_LIGHT_SHAPE);
	this.setDisabled(!valDex['light'].size);
	}
};

Blockly.Blocks['b3js_value_light'] = {
	init: function() {
		this.appendDummyInput()
				.appendField(new Blockly.FieldDropdown(() => block_option(['value', 'light'])), 'VAL');
		this.setOutput(true, 'Light');
		this.setColour(300);
	this.setTooltip('Retrieve a Light.');
	this.setHelpUrl('');
	this.setDisabled(!valDex['light'].size);
	this.mixin(BLOCK_MIXIN);
	}
};

Blockly.Blocks['b3js_create_geometry'] = {
	init: function() {
		this.appendDummyInput()
				.appendField('geometry')
				.appendField(new Blockly.FieldTextInput('', (s) => null), 'NAME')
				.appendField('as')
				.appendField(new Blockly.FieldDropdown([['plane','PLANE'], ['box','BOX'], ['sphere','SPHERE'], ['cylinder','CYLINDER'], ['torus','TORUS']], block_validator), 'TYPE');
		this.appendDummyInput('CHANGE')
				.appendField('width')
				.appendField(new Blockly.FieldNumber(1, 0), 'WIDTH')
				.appendField('height')
				.appendField(new Blockly.FieldNumber(1, 0), 'HEIGHT')
				.appendField('detail')
				.appendField(new Blockly.FieldNumber(1, 1, 10), 'DETAIL');
		this.setInputsInline(true);
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(150);
	this.setTooltip('Create a new Geometry.');
	this.setHelpUrl('');
	this.mixin(BLOCK_MIXIN);
	this.mixin(CREATE_GEOMETRY_SHAPE);
	}
};

Blockly.Blocks['b3js_set_geometry'] = {
	init: function() {
		this.appendValueInput('INPUT')
				.setCheck('Geometry')
				.appendField('set');
		this.appendDummyInput()
				.appendField(new Blockly.FieldDropdown([['translate','TRANSLATE'], ['scale','SCALE'], ['rotateX','RX'], ['rotateY','RY'], ['rotateZ','RZ']], block_validator), 'FIELD');
		this.appendValueInput('VALUE')
				.setCheck('Vec3')
				.appendField('to');
		this.setInputsInline(true);
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(150);
	this.setTooltip('Set property of a previously created Geometry.');
	this.setHelpUrl('');
	this.mixin(BLOCK_MIXIN);
	this.mixin(SET_GEOMETRY_SHAPE);
	this.setDisabled(!valDex['geometry'].size);
	}
};

Blockly.Blocks['b3js_value_geometry'] = {
	init: function() {
		this.appendDummyInput()
				.appendField(new Blockly.FieldDropdown(() => block_option(['value', 'geometry'])), 'VAL');
		this.setOutput(true, 'Geometry');
		this.setColour(150);
	this.setTooltip('Retrieve a Geometry.');
	this.setHelpUrl('');
	this.setDisabled(!valDex['geometry'].size);
	this.mixin(BLOCK_MIXIN);
	}
};

Blockly.Blocks['b3js_vector_vec2'] = {
	init: function() {
		this.appendValueInput('X')
				.setCheck('Number')
				.appendField('x');
		this.appendValueInput('Y')
				.setCheck('Number')
				.appendField('y');
		this.setInputsInline(true);
		this.setOutput(true, 'Vec2');
		this.setColour(150);
	this.setTooltip('Return a new Vector of 2 dimensions.');
	this.setHelpUrl('https://threejs.org/docs/index.html#api/en/math/Vector2');
	}
};

Blockly.Blocks['b3js_vector_vec3'] = {
	init: function() {
		this.appendValueInput('X')
				.setCheck('Number')
				.appendField('x');
		this.appendValueInput('Y')
				.setCheck('Number')
				.appendField('y');
		this.appendValueInput('Z')
				.setCheck('Number')
				.appendField('z');
		this.setInputsInline(true);
		this.setOutput(true, 'Vec3');
		this.setColour(150);
	this.setTooltip('Return a new Vector of 3 dimensions.');
	this.setHelpUrl('https://threejs.org/docs/index.html#api/en/math/Vector3');
	}
};

Blockly.Blocks['b3js_vector_vec4'] = {
	init: function() {
		this.appendValueInput('X')
				.setCheck('Number')
				.appendField('x');
		this.appendValueInput('Y')
				.setCheck('Number')
				.appendField('y');
		this.appendValueInput('Z')
				.setCheck('Number')
				.appendField('z');
		this.appendValueInput('W')
				.setCheck('Number')
				.appendField('w');
		this.setInputsInline(true);
		this.setOutput(true, 'Vec4');
		this.setColour(150);
	this.setTooltip('Return a new Vector of 4 dimensions.');
	this.setHelpUrl('https://threejs.org/docs/index.html#api/en/math/Vector4');
	}
};

Blockly.Blocks['b3js_create_material'] = {
	init: function() {
		this.appendDummyInput()
				.appendField('material')
				.appendField(new Blockly.FieldTextInput('', (s) => null), 'NAME')
				.appendField('as')
				.appendField(new Blockly.FieldDropdown([['basicMat','BASIC'], ['depthMat','DEPTH'], ['normalMat','NORMAL'], ['lambertMat','LAMBERT'], ['phongMat','PHONG']],
					block_validator), 'TYPE');
		this.appendDummyInput('CHANGE')
				.appendField('color')
				.appendField(new Blockly.FieldColour('#ffffff'), 'COLOUR');
		this.setInputsInline(true);
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(250);
	this.setTooltip('Create a new Material.');
	this.setHelpUrl('');
	this.mixin(BLOCK_MIXIN);
	this.mixin(CREATE_MATERIAL_SHAPE);
	}
};

Blockly.Blocks['b3js_set_material'] = {
	init: function() {
		this.appendValueInput('INPUT')
				.setCheck('Material')
				.appendField('set');
		this.appendDummyInput()
				.appendField(new Blockly.FieldDropdown(() => block_option(['set', 'material'], this.getInputTargetBlock('INPUT')),
					block_validator), 'FIELD');
		this.appendValueInput('VALUE')
				.setCheck(['Colour', 'String'])
				.appendField('to');
		this.setInputsInline(true);
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(250);
	this.setTooltip('Set property of a previously created Material.');
	this.setHelpUrl('');
	this.mixin(BLOCK_MIXIN);
	this.mixin(SET_MATERIAL_SHAPE);
	this.setDisabled(!valDex['material'].size);
	}
};

Blockly.Blocks['b3js_value_material'] = {
	init: function() {
		this.appendDummyInput()
				.appendField(new Blockly.FieldDropdown(() => block_option(['value', 'material'])), 'VAL');
		this.setOutput(true, 'Material');
		this.setColour(250);
	this.setTooltip('Retrieve a Material.');
	this.setHelpUrl('');
	this.setDisabled(!valDex['material'].size);
	this.mixin(BLOCK_MIXIN);
	}
};

Blockly.Blocks['b3js_create_mesh'] = {
	init: function() {
		this.appendDummyInput()
				.appendField('mesh')
				.appendField(new Blockly.FieldTextInput('', (s) => null), 'NAME');
		this.appendValueInput('GEOMETRY')
				.setCheck('Geometry')
				.appendField('geometry');
		this.appendValueInput('MATERIAL')
				.setCheck('Material')
				.appendField('material');
		this.setInputsInline(true);
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(100);
	this.setTooltip('Create a new Mesh.');
	this.setHelpUrl('');
	}
};

Blockly.Blocks['b3js_update_mesh'] = {
	init: function() {
		this.appendValueInput('INPUT')
				.setCheck('Mesh')
				.appendField('mesh');
		this.appendDummyInput()
				.appendField(new Blockly.FieldDropdown([['translate','TRANSLATE'], ['scale','SCALE'], ['rotate','ROTATE']]), 'FIELD');
		this.appendDummyInput()
				.appendField(new Blockly.FieldDropdown([['x','X'], ['y','Y'], ['z','Z'], ['xyz','XYZ'], ['along','AXIS']], block_validator), 'COMPONENT');
		this.appendValueInput('VALUE')
				.setCheck('Number')
				.appendField('by distance');
		this.setInputsInline(true);
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(100);
	this.setTooltip('');
	this.setHelpUrl('');
	this.setDisabled(!valDex['mesh'].size);
	this.mixin(BLOCK_MIXIN);
	this.mixin(UPDATE_MESH_SHAPE);
	}
};

Blockly.Blocks['b3js_value_mesh'] = {
	init: function() {
		this.appendDummyInput()
				.appendField(new Blockly.FieldDropdown(() => block_option(['value', 'mesh'])), 'VAL');
		this.setOutput(true, 'Mesh');
		this.setColour(100);
	this.setTooltip('Retrieve a Mesh.');
	this.setHelpUrl('');
	this.setDisabled(!valDex['mesh'].size);
	this.mixin(BLOCK_MIXIN);
	}
};

Blockly.Blocks['b3js_render_loop'] = {
	init: function() {
		this.appendValueInput('CAMERA')
				.setCheck('Camera')
				.appendField('render with camera');
		this.appendStatementInput('RENDER')
				.setCheck(null);
		this.setInputsInline(true);
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(50);
	this.setTooltip('Render a Scene with a previously created Camera.');
	this.setHelpUrl('');
	}
};

// /=====================================================================\
//  BLOCKS CODE
// \=====================================================================/
Blockly.JavaScript['b3js_add_scene'] = function(block) {
	var value_element = Blockly.JavaScript.valueToCode(block, 'ELEMENT', Blockly.JavaScript.ORDER_ATOMIC);
	// TODO: Assemble JavaScript into code variable.
	var code = '';
	if (block.getInputTargetBlock('ELEMENT')) {
	 code = 'scene.add(' + value_element + ');\n';
	}
	var i = 0;
	while (block.getInputTargetBlock('ADD' + i)) {
		value_element = Blockly.JavaScript.valueToCode(block, 'ADD' + i, Blockly.JavaScript.ORDER_ATOMIC);
		code += 'scene.add(' + value_element + ');\n';
		i++;
	}
	return code;
};

Blockly.JavaScript['b3js_set_scene'] = function(block) {
	var dropdown_field = block.getFieldValue('FIELD');
	var value_value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_ATOMIC);
	// TODO: Assemble JavaScript into code variable.
	var code = '';
	if (block.getInputTargetBlock('VALUE')) {
		var value_type = block.getInputTargetBlock('VALUE').outputConnection.check_[0];
		switch (dropdown_field) {
			case 'BACKGROUND':
				switch (value_type) {
					case 'Colour':
						code += 'scene.background = new THREE.Color(hex(' + value_value + '));\n';
					break;

					case 'String':
						if (/^'#[0-9A-F]{6}'/i.test(value_value))
							code += 'scene.background = new THREE.Color(hex(' + value_value + '));\n';
						else
							code += 'scene.background = new THREE.Color(0x000000);\n';
					break;

					case 'Texture':
						code += 'scene.background = ' + value_value + ';\n';
					break;
				}
			break;

			case 'FOG':
				code += 'scene.fog = ' + value_value + ';\n';
			break;

			case 'AUPDATE':
				code += 'scene.autoUpdate = ' + value_value + ';\n';
			break;

			case 'OMATERIAL':
				code += 'scene.overrideMaterial = ' + value_value + ';\n';
			break;
		}
	}
	return code;
};

Blockly.JavaScript['b3js_create_camera'] = function(block) {
	var text_name = block.getFieldValue('NAME');
	var dropdown_type = block.getFieldValue('TYPE');
	var number_fovscale = block.getFieldValue('FOVSCALE');
	var number_near = block.getFieldValue('NEAR');
	var number_far = block.getFieldValue('FAR');
	// TODO: Assemble JavaScript into code variable.
	var code = 'const cam_' + text_name + ' = ';
	switch (dropdown_type) {
		case 'PERSPECTIVE':
			code += 'new THREE.PerspectiveCamera('
				+ number_fovscale + ','
				+ webglArea.offsetWidth/webglArea.offsetHeight + ','
				+ number_near + ',' + number_far + ');\n';
		break;

		case 'ORTHOGRAPHIC':
			code += 'new THREE.OrthographicCamera('
				+ webglArea.offsetWidth / -number_fovscale + ','
				+ webglArea.offsetWidth / number_fovscale + ','
				+ webglArea.offsetHeight / -number_fovscale + ','
				+ webglArea.offsetHeight / number_fovscale + ','
				+ number_near + ',' + number_far + ');\n';
		break;
	}
	return code;
};

Blockly.JavaScript['b3js_set_camera'] = function(block) {
	var value_input = Blockly.JavaScript.valueToCode(block, 'INPUT', Blockly.JavaScript.ORDER_ATOMIC);
	var dropdown_field = block.getFieldValue('FIELD');
	var value_value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_ATOMIC);
	// TODO: Assemble JavaScript into code variable.
	var code = '';
	if (block.getInputTargetBlock('INPUT') && block.getInputTargetBlock('VALUE')) {
		switch (dropdown_field) {
			case 'POSITION':
				code += value_input + '.position.copy(' + value_value + ');\n';
			break;

			case 'LOOKAT':
				code += value_input + '.lookAt(' + value_value + ');\n';
			break;

			case 'TRANSLATE':
					var v = block.getInputTargetBlock('VALUE');
					var value_x = Blockly.JavaScript.valueToCode(v, 'X', Blockly.JavaScript.ORDER_ATOMIC);
					var value_y = Blockly.JavaScript.valueToCode(v, 'Y', Blockly.JavaScript.ORDER_ATOMIC);
					var value_z = Blockly.JavaScript.valueToCode(v, 'Z', Blockly.JavaScript.ORDER_ATOMIC);
					code += value_input + '.translateX(' + value_x + ');\n';
					code += value_input + '.translateY(' + value_y + ');\n';
					code += value_input + '.translateZ(' + value_z + ');\n';
				break;

				case 'SCALE':
					code += value_input + '.scale.copy(' + value_value + ');\n';
				break;

				case 'RX':
				case 'RY':
				case 'RZ':
					var v = block.getInputTargetBlock('VALUE');
					var value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_NONE);
					var coord = dropdown_field[1];
					if (v.getVars().length) {
						code += value_input + '.rotate' + coord + '(rad(' + value + '));\n';
					}
					else {
						if (!isNaN(value))
							value = rad(value);
						code += value_input + '.rotate' + coord + '(' + value + ');\n';
					}
				break;
		}
	}
	return code;
};

Blockly.JavaScript['b3js_value_camera'] = function(block) {
	var dropdown_field = block.getFieldValue('VAL');
	// TODO: Assemble JavaScript into code variable.
	var code = 'cam_' + block.getField('VAL').getText();
	return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['b3js_create_light'] = function(block) {
	var text_name = block.getFieldValue('NAME');
	var dropdown_type = block.getFieldValue('TYPE');
	var colour_colour = block.getFieldValue('COLOUR');
	var number_intensity = block.getFieldValue('INTENSITY');
	// TODO: Assemble JavaScript into code variable.
	var code = 'const light_' + text_name + ' = ';
	switch (dropdown_type) {
		case 'AMBIENT':
			code += 'new THREE.AmbientLight(' + hex(colour_colour) + ',' + number_intensity + ');\n';
		break;

		case 'POINT':
			var number_distance = block.getFieldValue('DISTANCE');
			var number_decay = block.getFieldValue('DECAY');
			code += 'new THREE.PointLight(' + hex(colour_colour) + ',' +
				number_intensity + ',' + number_distance + ',' + number_decay + ');\n';
		break;

		case 'SPOT':
			var number_distance = block.getFieldValue('DISTANCE');
			var number_decay = block.getFieldValue('DECAY');
			code += 'new THREE.SpotLight(' + hex(colour_colour) + ',' +
				number_intensity + ',' + number_distance + ',' + number_decay + ');\n';
		break;

		case 'DIRECTIONAL':
			code += 'new THREE.DirectionalLight(' + hex(colour_colour) + ',' + number_intensity + ');\n';
		break;

		case 'HEMISPHERE':
		var value_ground = block.getFieldValue('GROUND');
			code += 'new THREE.HemisphereLight(' + hex(colour_colour) +
				',' + hex(value_ground) + ',' + number_intensity + ');\n';
		break;
	}
	return code;
};

Blockly.JavaScript['b3js_set_light'] = function(block) {
	var value_input = Blockly.JavaScript.valueToCode(block, 'INPUT', Blockly.JavaScript.ORDER_ATOMIC);
	var dropdown_field = block.getFieldValue('FIELD');
	var value_value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_ATOMIC);
	// TODO: Assemble JavaScript into code variable.
	var code = '';
	if (block.getInputTargetBlock('INPUT')) {
		if (block.getInputTargetBlock('VALUE')) {
			var value_type = block.getInputTargetBlock('VALUE').outputConnection.check_[0];
			switch (dropdown_field) {
				case 'COLOR':
					if (value_type === 'Colour') {
						code += value_input + '.color.copy(hex(' + value_value + '));\n';
					}
					else {
						if (/^'#[0-9A-F]{6}'/i.test(value_value))
							code += value_input + '.color.copy(hex(' + value_value + '));\n';
						else
							code += value_input + '.color.copy(0x000000);\n';
					}
				break;

				case 'TARGET':
					code += value_input + '.target.copy(' + value_value + ');\n';
				break;

				case 'CASTSHADOW':
					code += value_input + '.castShadow.copy(' + value_value + ');\n';
				break;

				case 'POSITION':
					code += value_input + '.position.copy(' + value_value + ');\n';
				break;

				case 'VISIBLE':
					code += value_input + '.visible.copy(' + value_value + ');\n';
				break;

				case 'GROUND':
					if (value_type === 'Colour') {
						code += value_input + '.groundColor.copy(hex(' + value_value + '));\n';
					}
					else {
						if (/^'#[0-9A-F]{6}'/i.test(value_value))
							code += value_input + '.groundColor.copy(hex(' + value_value + '));\n';
						else
							code += value_input + '.groundColor.copy(0x000000);\n';
					}
				break;

				case 'INTENSITY':
					code += value_input + '.intensity.copy(' + Math.max(value_value, 0) + ');\n';
				break;

				case 'DECAY':
					code += value_input + '.decay =' + Math.max(value_value, 1) + ';\n';
				break;

				case 'EXPONENT':
					code += value_input + '.exponent.copy(' + Math.max(value_value, 0) + ');\n';
				break;

				case 'ANGLE':
					var v = block.getInputTargetBlock('VALUE');
					var value_ = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_NONE);
					if (v.getVars().length) {
						code += value_input + '.rotateX(rad(' + v + '));\n';
					}
					else {
						if (!isNaN(value_))
							value_ = rad(value_);
						code += value_input + '.angle.copy(' + value_ + ');\n';
					}
				break;

				case 'DISTANCE':
					code += value_input + '.distance.copy(' + Math.max(value_value, 0) + ');\n';
				break;
			}
		}
	}
	return code;
};

Blockly.JavaScript['b3js_value_light'] = function(block) {
	var dropdown_field = block.getFieldValue('VAL');
	// TODO: Assemble JavaScript into code variable.
	var code = 'light_' + block.getField('VAL').getText();
	return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['b3js_create_geometry'] = function(block) {
	var text_name = block.getFieldValue('NAME');
	var dropdown_type = block.getFieldValue('TYPE');
	var number_width = block.getFieldValue('WIDTH');
	var number_height = block.getFieldValue('HEIGHT');
	var number_detail = block.getFieldValue('DETAIL');
	// TODO: Assemble JavaScript into code variable.
	var code = 'const geom_' + text_name + ' = ';
	switch (dropdown_type) {
		case 'PLANE':
			code += 'new THREE.PlaneGeometry(' + number_width + ',' + number_height +
				',' + number_detail + ',' + number_detail + ');\n';
		break;

		case 'BOX':
			var number_depth = block.getFieldValue('DEPTH');
			code += 'new THREE.BoxGeometry(' + number_width + ',' + number_height + ',' + number_depth +
				',' + number_detail + ',' + number_detail + ');\n';
		break;

		case 'SPHERE':
			var number_radius = block.getFieldValue('RADIUS');
			code += 'new THREE.SphereGeometry(' + number_radius + ',' + number_detail + ',' + number_detail + ');\n';
		break;

		case 'CYLINDER':
			var number_topR = block.getFieldValue('RADIUSTOP');
			var number_bottomR = block.getFieldValue('RADIUSBOTTOM');
			code += 'new THREE.CylinderGeometry(' + number_topR + ',' + number_bottomR + ',' + number_height +
				',' + number_detail + ',' + number_detail + ');\n';
		break;

		case 'TORUS':
			var number_radius = block.getFieldValue('RADIUS');
			var number_tube = block.getFieldValue('TUBE');
			var number_arc = block.getFieldValue('ARC');
			code += 'new THREE.TorusGeometry(' + number_radius + ',' + number_tube +
				',' + number_detail + ',' + number_detail + ',' + number_arc * Math.PI / 180 + ');\n';
		break;
	}
	return code;
};

Blockly.JavaScript['b3js_set_geometry'] = function(block) {
	var value_input = Blockly.JavaScript.valueToCode(block, 'INPUT', Blockly.JavaScript.ORDER_ATOMIC);
	var dropdown_field = block.getFieldValue('FIELD');
	var value_value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_ATOMIC);
	// TODO: Assemble JavaScript into code variable.
	var code = '';
	if (block.getInputTargetBlock('INPUT')) {
		if (block.getInputTargetBlock('VALUE')) {
			switch (dropdown_field) {
				case 'TRANSLATE':
					var v = block.getInputTargetBlock('VALUE');
					var value_x = Blockly.JavaScript.valueToCode(v, 'X', Blockly.JavaScript.ORDER_ATOMIC);
					var value_y = Blockly.JavaScript.valueToCode(v, 'Y', Blockly.JavaScript.ORDER_ATOMIC);
					var value_z = Blockly.JavaScript.valueToCode(v, 'Z', Blockly.JavaScript.ORDER_ATOMIC);
					code += value_input + '.translate(' + value_x + ',' + value_y + ',' + value_z + ');\n';
				break;

				case 'SCALE':
					var v = block.getInputTargetBlock('VALUE');
					var value_x = Blockly.JavaScript.valueToCode(v, 'X', Blockly.JavaScript.ORDER_ATOMIC);
					var value_y = Blockly.JavaScript.valueToCode(v, 'Y', Blockly.JavaScript.ORDER_ATOMIC);
					var value_z = Blockly.JavaScript.valueToCode(v, 'Z', Blockly.JavaScript.ORDER_ATOMIC);
					code += value_input + '.scale(' + value_x + ',' + value_y + ',' + value_z + ');\n';
				break;

				case 'RX':
				case 'RY':
				case 'RZ':
					var v = block.getInputTargetBlock('VALUE');
					var value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_NONE);
					var coord = dropdown_field[1];
					if (v.getVars().length) {
						code += value_input + '.rotate' + coord + '(rad(' + value + '));\n';
					}
					else {
						if (!isNaN(value))
							value = rad(value);
						code += value_input + '.rotate' + coord + '(' + value + ');\n';
					}
				break;
			}
		}
	}
	return code;
};

Blockly.JavaScript['b3js_value_geometry'] = function(block) {
	var dropdown_field = block.getFieldValue('VAL');
	// TODO: Assemble JavaScript into code variable.
	var code = 'geom_' + block.getField('VAL').getText();
	return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['b3js_vector_vec2'] = function(block) {
	var value_x = Blockly.JavaScript.valueToCode(block, 'X', Blockly.JavaScript.ORDER_ATOMIC);
	var value_y = Blockly.JavaScript.valueToCode(block, 'Y', Blockly.JavaScript.ORDER_ATOMIC);
	// TODO: Assemble JavaScript into code variable.
	var code = 'new THREE.Vector2(' + value_x + ',' + value_y + ')';
	return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['b3js_vector_vec3'] = function(block) {
	var value_x = Blockly.JavaScript.valueToCode(block, 'X', Blockly.JavaScript.ORDER_ATOMIC);
	var value_y = Blockly.JavaScript.valueToCode(block, 'Y', Blockly.JavaScript.ORDER_ATOMIC);
	var value_z = Blockly.JavaScript.valueToCode(block, 'Z', Blockly.JavaScript.ORDER_ATOMIC);
	// TODO: Assemble JavaScript into code variable.
	var code = 'new THREE.Vector3(' + value_x + ',' + value_y + ',' + value_z + ')';
	return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['b3js_vector_vec4'] = function(block) {
	var value_x = Blockly.JavaScript.valueToCode(block, 'X', Blockly.JavaScript.ORDER_ATOMIC);
	var value_y = Blockly.JavaScript.valueToCode(block, 'Y', Blockly.JavaScript.ORDER_ATOMIC);
	var value_z = Blockly.JavaScript.valueToCode(block, 'Z', Blockly.JavaScript.ORDER_ATOMIC);
	var value_w = Blockly.JavaScript.valueToCode(block, 'W', Blockly.JavaScript.ORDER_ATOMIC);
	// TODO: Assemble JavaScript into code variable.
	var code = 'new THREE.Vector4(' + value_x + ',' + value_y + ',' + value_z + ',' + value_w + ')';
	return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['b3js_create_material'] = function(block) {
	var text_name = block.getFieldValue('NAME');
	var dropdown_type = block.getFieldValue('TYPE');
	var colour_colour = block.getFieldValue('COLOUR');
	// TODO: Assemble JavaScript into code variable.
	var code = 'const mat_' + text_name + ' = ';
	switch (dropdown_type) {
		case 'BASIC':
			code += 'new THREE.MeshBasicMaterial({ color: ' + hex(colour_colour) + '});\n';
		break;

		case 'DEPTH':
			var checkbox = block.getFieldValue('WIREFRAME') === 'TRUE' ? true : false;
			code += 'new THREE.MeshDepthMaterial({ wireframe: ' + checkbox + '});\n';
		break;

		case 'NORMAL':
			var checkbox = block.getFieldValue('WIREFRAME') === 'TRUE' ? true : false;
			code += 'new THREE.MeshNormalMaterial({ wireframe: ' + checkbox + '});\n';
		break;

		case 'LAMBERT':
			code += 'new THREE.MeshLambertMaterial({ color: ' + hex(colour_colour) + '});\n';
		break;

		case 'PHONG':
			code += 'new THREE.MeshPhongMaterial({ color: ' + hex(colour_colour) + '});\n';
		break;
	}
	return code;
};

Blockly.JavaScript['b3js_set_material'] = function(block) {
	var value_input = Blockly.JavaScript.valueToCode(block, 'INPUT', Blockly.JavaScript.ORDER_ATOMIC);
	var dropdown_field = block.getFieldValue('FIELD');
	var value_value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_ATOMIC);
	// TODO: Assemble JavaScript into code variable.
	var code = '';
	if (block.getInputTargetBlock('INPUT')) {
		if (block.getInputTargetBlock('VALUE')) {
			var value_type = block.getInputTargetBlock('VALUE').outputConnection.check_[0];
			switch (dropdown_field) {
				case 'COLOR':
					if (value_type === 'Colour') {
						code += value_input + '.color = new THREE.Color(hex(' + value_value + '));\n';
					}
					else {
						if (/^'#[0-9A-F]{6}'/i.test(value_value))
							code += value_input + '.color = new THREE.Color(hex(' + value_value + '));\n';
						else
							code += value_input + '.color = new THREE.Color(0x000000);\n';
					}
				break;

				case 'OPACITY':
					code += value_input + '.opacity = ' + value_value + ';\n';
				break;

				case 'SHININESS':
					code += value_input + '.shininess = ' + value_value + ';\n';
				break;

				case 'TRANSPARENT':
					code += value_input + '.transparent = ' + value_value + ';\n';
				break;

				case 'VISIBLE':
					code += value_input + '.visible = ' + value_value + ';\n';
				break;

				case 'BLENDING':
					code += value_input + '.blending = ' + value_value + ';\n';
				break;

				case 'DEPTHTEST':
					code += value_input + '.depthTest = ' + value_value + ';\n';
				break;

				case 'EMISSIVE':
					if (value_type === 'Colour') {
						code += value_input + '.emissive = new THREE.Color(hex(' + value_value + '));\n';
					}
					else {
						if (/^'#[0-9A-F]{6}'/i.test(value_value))
							code += value_input + '.emissive = new THREE.Color(hex(' + value_value + '));\n';
						else
							code += value_input + '.emissive = new THREE.Color(0x000000);\n';
					}
				break;

				case 'WIREFRAME':
					code += value_input + '.wireframe = ' + value_value + ';\n';
				break;

				case 'SPECULAR':
					if (value_type === 'Colour') {
						code += value_input + '.specular = new THREE.Color(hex(' + value_value + '));\n';
					}
					else {
						if (/^'#[0-9A-F]{6}'/i.test(value_value))
							code += value_input + '.specular = new THREE.Color(hex(' + value_value + '));\n';
						else
							code += value_input + '.specular = new THREE.Color(0x000000);\n';
					}
				break;
			}
		}
	}
	return code;
};

Blockly.JavaScript['b3js_value_material'] = function(block) {
	var dropdown_field = block.getFieldValue('VAL');
	// TODO: Assemble JavaScript into code variable.
	var code = 'mat_' + block.getField('VAL').getText();
	return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['b3js_create_mesh'] = function(block) {
	var text_name = block.getFieldValue('NAME');
	var value_geometry = Blockly.JavaScript.valueToCode(block, 'GEOMETRY', Blockly.JavaScript.ORDER_ATOMIC);
	var value_material = Blockly.JavaScript.valueToCode(block, 'MATERIAL', Blockly.JavaScript.ORDER_ATOMIC);
	// TODO: Assemble JavaScript into code variable.
	var code = 'const mesh_' + text_name + ' = new THREE.Mesh(' + value_geometry + ',' + value_material + ');\n';
	return code;
};

Blockly.JavaScript['b3js_update_mesh'] = function(block) {
	var dropdown_field = block.getFieldValue('FIELD');
	var value_input = Blockly.JavaScript.valueToCode(block, 'INPUT', Blockly.JavaScript.ORDER_ATOMIC);
	var dropdown_direction = block.getFieldValue('DIRECTION');
	var value_value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_ATOMIC);
	// TODO: Assemble JavaScript into code variable.
	var code = '...;\n';
	return code;
};

Blockly.JavaScript['b3js_value_mesh'] = function(block) {
	var dropdown_field = block.getFieldValue('VAL');
	// TODO: Assemble JavaScript into code variable.
	var code = 'mesh_' + block.getField('VAL').getText();
	return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['b3js_render_loop'] = function(block) {
	var value_camera = Blockly.JavaScript.valueToCode(block, 'CAMERA', Blockly.JavaScript.ORDER_ATOMIC);
	var statements_render = Blockly.JavaScript.statementToCode(block, 'RENDER');
	// TODO: Assemble JavaScript into code variable.
	var code = '';
	if (value_camera) {
		code +=
			'const context = webglCanvas.getContext( \'webgl2\' );\n'+

			'current_camera = ' + value_camera + ';\n' +

			'renderer = new THREE.WebGLRenderer( { canvas: webglCanvas, context: context } );\n'+
			'renderer.setSize( webglCanvas.offsetWidth, webglCanvas.offsetHeight );\n'+

			'const animate = function () {\n'+
			'	anim_id = requestAnimationFrame( animate );\n';
		statements_render.split('\n').forEach((line) => {
			if (line !== '') {
				code += '	' + line + '\n';
			}
		});
		code +=
			'	renderer.render( scene, current_camera );\n'+
			'};\n'+
			'animate();\n';
	}
	return code;
};
