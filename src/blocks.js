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
				.appendField(new Blockly.FieldDropdown([["position","POSITION"], ['lookAt','LOOKAT'], ['translate','TRANSLATE'], ['rotateX','RX'], ['rotateY','RY'], ['rotateZ','RZ'], ['scale','SCALE']]), 'FIELD');
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
	}
};

Blockly.Blocks['b3js_getfrom_camera'] = {
	init: function() {
		this.appendValueInput('INPUT')
				.setCheck('Camera')
				.appendField('get');
		this.appendDummyInput()
				.appendField(new Blockly.FieldDropdown([['position','POSITION'], ['lookAt','LOOKAT'], ['rotation','ROTATION'], ['scale','SCALE']]), 'FIELD');
		this.setOutput(true, 'Vec3');
		this.setColour(200);
	this.setTooltip('Get property of a previously created Camera.');
	this.setHelpUrl('');
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
	this.mixin(BLOCK_MIXIN);
	this.setDisabled(!valDex['camera'].size);
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
	}
};

Blockly.Blocks['b3js_getfrom_light'] = {
	init: function() {
		this.appendValueInput('INPUT')
				.setCheck('Light')
				.appendField('get');
		this.appendDummyInput()
				.appendField(new Blockly.FieldDropdown(() => block_option(['getfrom', 'light'], this.getInputTargetBlock('INPUT')), block_validator), 'FIELD');
		this.setOutput(true, null);
		this.setColour(300);
	this.setTooltip('Get property of a previously created Light.');
	this.setHelpUrl('');
	this.mixin(BLOCK_MIXIN);
	this.mixin(GETFROM_LIGHT_SHAPE);
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
	this.mixin(BLOCK_MIXIN);
	this.setDisabled(!valDex['light'].size);
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
				.appendField(new Blockly.FieldDropdown([['translate','TRANSLATE'], ['rotateX','RX'], ['rotateY','RY'], ['rotateZ','RZ'], ['scale','SCALE']], block_validator), 'FIELD');
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
	}
};

Blockly.Blocks['b3js_getfrom_geometry'] = {
	init: function() {
		this.appendValueInput('INPUT')
				.setCheck('Geometry')
				.appendField('get');
		this.appendDummyInput()
				.appendField(new Blockly.FieldDropdown([['position','POSITION'], ['rotation','ROTATION'], ['scale','SCALE']]), 'FIELD');
		this.setOutput(true, 'Vec3');
		this.setColour(150);
	this.setTooltip('Get property of a previously created Geometry.');
	this.setHelpUrl('');
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
	this.mixin(BLOCK_MIXIN);
	this.setDisabled(!valDex['geometry'].size);
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
				.appendField(new Blockly.FieldDropdown(() => block_option(['set', 'material'], this.getInputTargetBlock('INPUT')), block_validator), 'FIELD');
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
	}
};

Blockly.Blocks['b3js_getfrom_material'] = {
	init: function() {
		this.appendValueInput('INPUT')
				.setCheck('Material')
				.appendField('get');
		this.appendDummyInput()
				.appendField(new Blockly.FieldDropdown(() => block_option(['getfrom', 'material'], this.getInputTargetBlock('INPUT')), block_validator), 'FIELD');
		this.setOutput(true, null);
		this.setColour(250);
	this.setTooltip('Get property of a previously created Material.');
	this.setHelpUrl('');
	this.mixin(BLOCK_MIXIN);
	this.mixin(GETFROM_MATERIAL_SHAPE);
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
	this.mixin(BLOCK_MIXIN);
	this.setDisabled(!valDex['material'].size);
	}
};

Blockly.Blocks['b3js_image_texture'] = {
	init: function() {
		this.appendValueInput('TEXTURE')
				.setCheck('String')
				.appendField('texture');
		this.appendDummyInput()
				.appendField('wrap')
				.appendField(new Blockly.FieldDropdown([['clamp','CLAMP'], ['repeat','REPEAT'], ['mirror','MIRROR']]), 'WRAP');
		this.appendDummyInput()
				.appendField('filter')
				.appendField(new Blockly.FieldDropdown([['linear','LINEAR'], ['nearest','NEAREST']]), 'FILTER');
		this.setInputsInline(true);
		this.setOutput(true, 'Texture');
		this.setColour(250);
	this.setTooltip('Return a new Texture.');
	this.setHelpUrl('');
	}
};

Blockly.Blocks['b3js_linear_fog'] = {
	init: function() {
		this.appendDummyInput()
				.appendField('fog')
				.appendField('color')
				.appendField(new Blockly.FieldColour('#ffffff'), 'COLOUR')
				.appendField('near')
				.appendField(new Blockly.FieldNumber(1), 'NEAR')
				.appendField('far')
				.appendField(new Blockly.FieldNumber(100), 'FAR');
		this.setInputsInline(true);
		this.setOutput(true, 'Fog');
		this.setColour(250);
	this.setTooltip('Return a new Fog element.');
	this.setHelpUrl('');
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

Blockly.Blocks['b3js_create_mesh_from_file'] = {
	init: function() {
		this.appendDummyInput()
				.appendField('mesh')
				.appendField(new Blockly.FieldTextInput('', (s) => null), 'NAME');
		this.appendValueInput('VALUE')
				.setCheck('String')
				.appendField('from file');
		this.setInputsInline(true);
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(100);
	this.setTooltip('Create a new Mesh from a glTF, OBJ or Collada file.');
	this.setHelpUrl('');
	}
};

Blockly.Blocks['b3js_create_mesh_group'] = {
	init: function() {
		this.appendDummyInput()
				.appendField('mesh')
				.appendField(new Blockly.FieldTextInput('', (s) => null), 'NAME');
		this.appendValueInput('VALUE')
				.setCheck('Mesh')
				.appendField('groups');
		this.setInputsInline(true);
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(100);
	this.setTooltip('Create a new Group from Meshes or Groups.');
	this.setHelpUrl('');
	this.mixin(ADD_MIXIN);
	this.setMutator(new Blockly.Mutator(['group_with_element']));
	}
};

Blockly.Blocks['b3js_set_mesh'] = {
	init: function() {
		this.appendValueInput('INPUT')
				.setCheck('Mesh')
				.appendField('set', 'ACTION');
		this.appendDummyInput()
				.appendField(new Blockly.FieldDropdown(() => block_option(['set', 'mesh'], this.getInputTargetBlock('INPUT')), block_validator), 'FIELD');
		this.appendValueInput('VALUE')
				.setCheck('Geometry')
				.appendField('to');
		this.setInputsInline(true);
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(100);
	this.setTooltip('Set property of a previously created Mesh.');
	this.setHelpUrl('');
	this.mixin(BLOCK_MIXIN);
	this.mixin(SET_MESH_SHAPE);
	}
};

Blockly.Blocks['b3js_update_mesh'] = {
	init: function() {
		this.appendValueInput('INPUT')
				.setCheck('Mesh')
				.appendField(new Blockly.FieldDropdown([['translate','TRANSLATE'], ['rotate','ROTATE'], ['scale','SCALE']]), 'FIELD');
		this.appendDummyInput()
				.appendField(new Blockly.FieldDropdown([['x','X'], ['y','Y'], ['z','Z'], ['xyz','XYZ'], ['along','AXIS']], block_validator), 'COMPONENT');
		this.appendValueInput('VALUE')
				.setCheck('Number')
				.appendField('by');
		this.setInputsInline(true);
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(100);
	this.setTooltip('Update property of a previously created Mesh.');
	this.setHelpUrl('');
	this.mixin(BLOCK_MIXIN);
	this.mixin(UPDATE_MESH_SHAPE);
	}
};

Blockly.Blocks['b3js_getfrom_mesh'] = {
	init: function() {
		this.appendValueInput('INPUT')
				.setCheck('Mesh')
				.appendField('get');
		this.appendDummyInput()
				.appendField(new Blockly.FieldDropdown(() => block_option(['getfrom', 'mesh'], this.getInputTargetBlock('INPUT')), block_validator), 'FIELD');
		this.setOutput(true, null);
		this.setColour(100);
	this.setTooltip('Get property of a previously created Mesh.');
	this.setHelpUrl('');
	this.mixin(BLOCK_MIXIN);
	this.mixin(GETFROM_MESH_SHAPE);
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
	this.mixin(BLOCK_MIXIN);
	this.setDisabled(!valDex['mesh'].size);
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
	this.setDisabled(!valDex['camera'].size != workspace.getBlocksByType('b3js_render_loop').length > 0);
	}
};

Blockly.Blocks['b3js_upon_event'] = {
	init: function() {
		this.appendDummyInput()
				.appendField('upon event')
				.appendField(new Blockly.FieldDropdown([['click','CLICK'], ['keyDown','KEYDOWN']], block_validator), 'EVENT');
		this.appendStatementInput('STEPS')
				.setCheck(null)
				.appendField('do');
		this.appendDummyInput('VARIABLE')
				.appendField('on')
				.appendField(new Blockly.FieldVariable('targetMesh'), 'ARGUMENT');
		this.setInputsInline(true);
		this.setColour(50);
	this.setTooltip('Append an Event Listener to the document.');
	this.setHelpUrl('');
	this.mixin(BLOCK_MIXIN);
	this.mixin(UPON_EVENT_SHAPE);
	}
};

Blockly.Blocks['b3js_play_animation'] = {
	init: function() {
		this.appendValueInput('MESH')
				.setCheck('Mesh')
				.appendField('play');
		this.appendValueInput('NUM')
				.setCheck('Number')
				.appendField('animation #');
		this.setInputsInline(true);
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(50);
	this.setTooltip('Play the nth Mesh animation.');
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
	var code = 'const camera_' + text_name + ' = ';
	switch (dropdown_type) {
		case 'PERSPECTIVE':
			code += 'new THREE.PerspectiveCamera('
				+ number_fovscale + ','
				+ webglCanvas.offsetWidth/webglCanvas.offsetHeight + ','
				+ number_near + ',' + number_far + ');\n';
		break;

		case 'ORTHOGRAPHIC':
			code += 'new THREE.OrthographicCamera('
				+ webglCanvas.offsetWidth / -number_fovscale + ','
				+ webglCanvas.offsetWidth / number_fovscale + ','
				+ webglCanvas.offsetHeight / number_fovscale + ','
				+ webglCanvas.offsetHeight / -number_fovscale + ','
				+ number_near + ',' + number_far + ');\n';
			// artificial info
			code += 'camera_' + text_name + '.fovscale = ' + number_fovscale + ';\n';
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
	if (block.getInputTargetBlock('INPUT')) {
		if (block.getInputTargetBlock('VALUE')) {
			switch (dropdown_field) {
				case 'POSITION':
					code += value_input + '.position.copy(' + value_value + ');\n';
				break;

				case 'LOOKAT':
					code += value_input + '.lookAt(' + value_value + ');\n';
				break;

				case 'TRANSLATE':
					var v = block.getInputTargetBlock('VALUE');
					if (v.type === 'b3js_vector_vec3') {
						var value_x = Blockly.JavaScript.valueToCode(v, 'X', Blockly.JavaScript.ORDER_ATOMIC);
						var value_y = Blockly.JavaScript.valueToCode(v, 'Y', Blockly.JavaScript.ORDER_ATOMIC);
						var value_z = Blockly.JavaScript.valueToCode(v, 'Z', Blockly.JavaScript.ORDER_ATOMIC);
						code += value_input + '.translateX(' + value_x + ');\n';
						code += value_input + '.translateY(' + value_y + ');\n';
						code += value_input + '.translateZ(' + value_z + ');\n';
					}
					else {
						code += value_input + '.translateX(' + value_value + '.x);\n';
						code += value_input + '.translateY(' + value_value + '.y);\n';
						code += value_input + '.translateZ(' + value_value + '.z);\n';
					}
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

				case 'SCALE':
					code += value_input + '.scale.copy(' + value_value + ');\n';
				break;
			}
		}
	}
	return code;
};

Blockly.JavaScript['b3js_getfrom_camera'] = function(block) {
	var value_input = Blockly.JavaScript.valueToCode(block, 'INPUT', Blockly.JavaScript.ORDER_ATOMIC);
	var dropdown_field = block.getFieldValue('FIELD');
	// TODO: Assemble JavaScript into code variable.
	var code = '';
	if (block.getInputTargetBlock('INPUT')) {
		switch (dropdown_field) {
			case 'POSITION':
				code += value_input + '.position';
			break;

			case 'LOOKAT':
				code += 'new THREE.Vector3(0,0, -1).applyQuaternion(' + value_input + '.quaternion)';
			break;

			case 'SCALE':
				code += value_input + '.scale';
			break;

			case 'ROTATION':
				code += value_input + '.rotation';
			break;
		}
	}
	// TODO: Change ORDER_NONE to the correct strength.
	return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['b3js_value_camera'] = function(block) {
	var dropdown_field = block.getFieldValue('VAL');
	// TODO: Assemble JavaScript into code variable.
	var code = 'camera_' + block.getField('VAL').getText();
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
					code += value_input + '.target = ' + value_value + ';\n';
				break;

				case 'CASTSHADOW':
					shadow_mapping = (value_value === 'true');
					code += value_input + '.castShadow = ' + value_value + ';\n';

					//Set up shadow properties for the light
					code += value_input + '.shadow.bias = 0.0001;\n';
					code += value_input + '.shadow.mapSize.width = 1024;\n';
					code += value_input + '.shadow.mapSize.height = 1024;\n';
					code += value_input + '.shadow.camera.near = 0.1;\n';
					code += value_input + '.shadow.camera.far = 1000;\n';
				break;

				case 'POSITION':
					code += value_input + '.position.copy(' + value_value + ');\n';
				break;

				case 'VISIBLE':
					code += value_input + '.visible = ' + value_value + ';\n';
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
					code += value_input + '.intensity = ' + Math.max(value_value, 0) + ';\n';
				break;

				case 'DECAY':
					code += value_input + '.decay =' + Math.max(value_value, 1) + ';\n';
				break;

				case 'PENUMBRA':
					code += value_input + '.penumbra = ' + Math.min(Math.max(value_value, 0), 1) + ';\n';
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
						code += value_input + '.angle = ' + value_ + ';\n';
					}
				break;

				case 'DISTANCE':
					code += value_input + '.distance = ' + Math.max(value_value, 0) + ';\n';
				break;
			}
		}
	}
	return code;
};

Blockly.JavaScript['b3js_getfrom_light'] = function(block) {
	var value_input = Blockly.JavaScript.valueToCode(block, 'INPUT', Blockly.JavaScript.ORDER_ATOMIC);
	var dropdown_field = block.getFieldValue('FIELD');
	// TODO: Assemble JavaScript into code variable.
	var code = '';
	if (block.getInputTargetBlock('INPUT')) {
		switch (dropdown_field) {
			case 'COLOR':
				code += value_input + '.color';
			break;

			case 'TARGET':
				code += value_input + '.target';
			break;

			case 'CASTSHADOW':
				code += value_input + '.castShadow';
			break;

			case 'POSITION':
				code += value_input + '.position';
			break;

			case 'VISIBLE':
				code += value_input + '.visible';
			break;

			case 'GROUND':
				code += value_input + '.groundColor';
			break;

			case 'INTENSITY':
				code += value_input + '.intensity';
			break;

			case 'DECAY':
				code += value_input + '.decay';
			break;

			case 'PENUMBRA':
				code += value_input + '.penumbra';
			break;

			case 'ANGLE':
				code += value_input + '.angle';
			break;

			case 'DISTANCE':
				code += value_input + '.distance';
			break;
		}
	}
	// TODO: Change ORDER_NONE to the correct strength.
	return [code, Blockly.JavaScript.ORDER_NONE];
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
	var code = 'const geometry_' + text_name + ' = ';
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
					if (v.type === 'b3js_vector_vec3') {
						var value_x = Blockly.JavaScript.valueToCode(v, 'X', Blockly.JavaScript.ORDER_ATOMIC);
						var value_y = Blockly.JavaScript.valueToCode(v, 'Y', Blockly.JavaScript.ORDER_ATOMIC);
						var value_z = Blockly.JavaScript.valueToCode(v, 'Z', Blockly.JavaScript.ORDER_ATOMIC);
						code += value_input + '.translate(' + value_x + ',' + value_y + ',' + value_z + ');\n';
					}
					else {
						code += value_input + '.translate(' + value_value + '.x,' + value_value + '.y,' + value_value + '.z);\n';
					}
				break;

				case 'SCALE':
					var v = block.getInputTargetBlock('VALUE');
					if (v.type === 'b3js_vector_vec3') {
						var value_x = Blockly.JavaScript.valueToCode(v, 'X', Blockly.JavaScript.ORDER_ATOMIC);
						var value_y = Blockly.JavaScript.valueToCode(v, 'Y', Blockly.JavaScript.ORDER_ATOMIC);
						var value_z = Blockly.JavaScript.valueToCode(v, 'Z', Blockly.JavaScript.ORDER_ATOMIC);
						code += value_input + '.scale(' + value_x + ',' + value_y + ',' + value_z + ');\n';
					}
					else {
						code += value_input + '.scale(' + value_value + '.x,' + value_value + '.y,' + value_value + '.z);\n';
					}
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

Blockly.JavaScript['b3js_getfrom_geometry'] = function(block) {
	var value_input = Blockly.JavaScript.valueToCode(block, 'INPUT', Blockly.JavaScript.ORDER_ATOMIC);
	var dropdown_field = block.getFieldValue('FIELD');
	// TODO: Assemble JavaScript into code variable.
	var code = '';
	if (block.getInputTargetBlock('INPUT')) {
		switch (dropdown_field) {
			case 'POSITION':
				code += value_input + '.position';
			break;

			case 'ROTATION':
				code += value_input + '.rotation';
			break;

			case 'SCALE':
				code += value_input + '.scale';
			break;
		}
	}
	// TODO: Change ORDER_NONE to the correct strength.
	return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['b3js_value_geometry'] = function(block) {
	var dropdown_field = block.getFieldValue('VAL');
	// TODO: Assemble JavaScript into code variable.
	var code = 'geometry_' + block.getField('VAL').getText();
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
	var code = 'const material_' + text_name + ' = ';
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

				case 'MAP':
					code += value_input + '.map = ' + value_value + ';\n';
				break;

				case 'BUMPMAP':
					code += value_input + '.bumpMap = ' + value_value + ';\n';
				break;

				case 'NORMALMAP':
					code += value_input + '.normalMap = ' + value_value + ';\n';
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

Blockly.JavaScript['b3js_getfrom_material'] = function(block) {
	var value_input = Blockly.JavaScript.valueToCode(block, 'INPUT', Blockly.JavaScript.ORDER_ATOMIC);
	var dropdown_field = block.getFieldValue('FIELD');
	// TODO: Assemble JavaScript into code variable.
	var code = '';
	if (block.getInputTargetBlock('INPUT')) {
		switch (dropdown_field) {
			case 'COLOR':
				code += value_input + '.color';
			break;

			case 'OPACITY':
				code += value_input + '.opacity';
			break;

			case 'MAP':
				code += value_input + '.map';
			break;

			case 'BUMPMAP':
				code += value_input + '.bumpMap';
			break;

			case 'NORMALMAP':
				code += value_input + '.normalMap';
			break;

			case 'SHININESS':
				code += value_input + '.shininess';
			break;

			case 'TRANSPARENT':
				code += value_input + '.transparent';
			break;

			case 'VISIBLE':
				code += value_input + '.visible';
			break;

			case 'DEPTHTEST':
				code += value_input + '.depthTest';
			break;

			case 'EMISSIVE':
				code += value_input + '.emissive';
			break;

			case 'WIREFRAME':
				code += value_input + '.wireframe';
			break;

			case 'SPECULAR':
				code += value_input + '.specular';
			break;
		}
	}
	// TODO: Change ORDER_NONE to the correct strength.
	return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['b3js_value_material'] = function(block) {
	var dropdown_field = block.getFieldValue('VAL');
	// TODO: Assemble JavaScript into code variable.
	var code = 'material_' + block.getField('VAL').getText();
	return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['b3js_image_texture'] = function(block) {
	var value_texture = Blockly.JavaScript.valueToCode(block, 'TEXTURE', Blockly.JavaScript.ORDER_ATOMIC);
	var dropdown_wrap = block.getFieldValue('WRAP');
	var dropdown_filter = block.getFieldValue('FILTER');
	// TODO: Assemble JavaScript into code variable.
	var code = '';
	// TODO: Change ORDER_NONE to the correct strength.
	// image, mapping, wrapS, wrapT, magFilter, minFilter);\n';
	code += 'new THREE.Texture(';
	code += 'usr_res[' + value_texture + '], THREE.UVMapping, ';
	switch (dropdown_wrap) {
		case 'CLAMP':
			code += 'THREE.ClampToEdgeWrapping, THREE.ClampToEdgeWrapping, ';
		break;

		case 'REPEAT':
			code += 'THREE.RepeatWrapping, THREE.RepeatWrapping, ';
		break;

		case 'MIRROR':
			code += 'THREE.MirroredRepeatWrapping, THREE.MirroredRepeatWrapping, ';
		break;
	}
	switch (dropdown_filter) {
		case 'LINEAR':
			code += 'THREE.LinearFilter, THREE.LinearFilter)';
		break;

		case 'NEAREST':
			code += 'THREE.NearestFilter, THREE.NearestFilter)';
		break;
	}
	return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['b3js_linear_fog'] = function(block) {
	var colour_colour = block.getFieldValue('COLOUR');
	var number_near = block.getFieldValue('NEAR');
	var number_far = block.getFieldValue('FAR');
	// TODO: Assemble JavaScript into code variable.
	var code = 'new THREE.Fog(' + hex(colour_colour) +', ' + number_near + ', ' + number_far + ')';
	// TODO: Change ORDER_NONE to the correct strength.
	return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['b3js_create_mesh'] = function(block) {
	var text_name = block.getFieldValue('NAME');
	var value_geometry = Blockly.JavaScript.valueToCode(block, 'GEOMETRY', Blockly.JavaScript.ORDER_ATOMIC);
	var value_material = Blockly.JavaScript.valueToCode(block, 'MATERIAL', Blockly.JavaScript.ORDER_ATOMIC);
	// TODO: Assemble JavaScript into code variable.
	var code = '';
	if (value_geometry && value_material)
		code += 'const mesh_' + text_name + ' = new THREE.Mesh(' + value_geometry + ',' + value_material + ');\n';
	else
		code += 'const mesh_' + text_name + ' = new THREE.Mesh();\n';
	return code;
};

Blockly.JavaScript['b3js_create_mesh_from_file'] = function(block) {
	var key = 'mesh_' + block.getFieldValue('NAME');
	var value_value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_ATOMIC);
	// TODO: Assemble JavaScript into code variable.
	var code = '';
	if (value_value.indexOf('.obj') >= 0) {
		if (usr_res[key]) {
			code += 'const ' + key + ' = usr_res["' + key + '"];\n';
		}
	}
	else if (value_value.indexOf('.dae') >= 0 || value_value.indexOf('.gltf') >= 0) {
		if (usr_res[key]) {
			code += 'const ' + key + ' = usr_res["' + key + '"].scene;\n';
			if (usr_res[key].animations.length) {
				usr_res[key].mixer = new THREE.AnimationMixer(usr_res[key].scene);
			}
		}
	}
	return code;
};

Blockly.JavaScript['b3js_create_mesh_group'] = function(block) {
	var text_name = block.getFieldValue('NAME');
	var value_value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_ATOMIC);
	// TODO: Assemble JavaScript into code variable.
	var code = '';
	if (block.getInputTargetBlock('VALUE')) {
		if (value_value.indexOf('mesh_' + text_name) < 0) {
			code += 'const mesh_' + text_name + ' = new THREE.Group();\n';
			code += 'mesh_' + text_name + '.add(' + value_value + ');\n';
		}
	}
	var i = 0;
	while (block.getInputTargetBlock('ADD' + i)) {
		value_value = Blockly.JavaScript.valueToCode(block, 'ADD' + i, Blockly.JavaScript.ORDER_ATOMIC);
		if (value_value.indexOf('mesh_' + text_name) < 0) {
			code += 'mesh_' + text_name + '.add(' + value_value + ');\n';
		}
		i++;
	}
	return code;
};

Blockly.JavaScript['b3js_set_mesh'] = function(block) {
	var value_input = Blockly.JavaScript.valueToCode(block, 'INPUT', Blockly.JavaScript.ORDER_ATOMIC);
	var dropdown_field = block.getFieldValue('FIELD');
	var value_value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_ATOMIC);
	// TODO: Assemble JavaScript into code variable.
	var code = '';
	if (block.getInputTargetBlock('INPUT')) {
		if (block.getInputTargetBlock('VALUE')) {
			switch (dropdown_field) {
				case 'GEOMETRY':
					code += value_input + '.traverse((o3d) => {if (o3d.isMesh) o3d.geometry.copy(' + value_value + ');});\n';
				break;

				case 'MATERIAL':
					code += value_input + '.traverse((o3d) => {if (o3d.isMesh) o3d.material.copy(' + value_value + ');});\n';
				break;

				case 'MESH':
					code += value_input + '.add(' + value_value + ');\n';
				break;

				case 'POSITION':
					code += value_input + '.position.copy(' + value_value + ');\n';
				break;

				case 'LOOKAT':
					code += value_input + '.lookAt(' + value_value + ');\n';
				break;

				case 'CASTSHADOW': {
					const input = block.getInputTargetBlock('INPUT');
					code += value_input + '.traverse((o3d) => {o3d.castShadow = ' + value_value + ';});\n';
				}
				break;

				case 'RECEIVESHADOW': {
					const input = block.getInputTargetBlock('INPUT');
					code += value_input + '.traverse((o3d) => {o3d.receiveShadow = ' + value_value + ';});\n';
				}
				break;
			}
		}
	}
	return code;
};

Blockly.JavaScript['b3js_update_mesh'] = function(block) {
	var dropdown_field = block.getFieldValue('FIELD');
	var value_input = Blockly.JavaScript.valueToCode(block, 'INPUT', Blockly.JavaScript.ORDER_ATOMIC);
	var dropdown_component = block.getFieldValue('COMPONENT');
	var value_value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_ATOMIC);
	// TODO: Assemble JavaScript into code variable.
	var code = '';
	if (block.getInputTargetBlock('INPUT')) {
		if (block.getInputTargetBlock('VALUE')) {
			var v = block.getInputTargetBlock('VALUE');
			var operation = block.getField('FIELD').getText(); // SAFE acting on this
			switch (dropdown_component) {
				case 'X':
				case 'Y':
				case 'Z':
					if (dropdown_field === 'TRANSLATE') {
						code += value_input + '.' + operation + dropdown_component + '(' + value_value + ');\n';
					}
					else if (dropdown_field === 'ROTATE') {
						var value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_NONE);
						if (!isNaN(value)) {
							code += value_input + '.' + operation + dropdown_component + '(' + rad(value) + ');\n';
						}
						else {
							code += value_input + '.' + operation + dropdown_component + '(rad(' + value + '));\n';
						}
					}
					else {
						if (dropdown_component === 'X') {
							code += value_input + '.' + operation + '.copy(' +
								'new THREE.Vector3(' + value_value + ', ' + '1' + ', ' + '1' + '));\n';
						}
						else if (dropdown_component === 'Y') {
							code += value_input + '.' + operation + '.copy(' +
								'new THREE.Vector3(' + '1' + ', ' + value_value + ', ' + '1' + '));\n';
						}
						else {
							code += value_input + '.' + operation + '.copy(' +
								'new THREE.Vector3(' + '1' + ', ' + '1' + ', ' + value_value + '));\n';
						}
					}
				break;

				case 'XYZ':
					var value_x = Blockly.JavaScript.valueToCode(v, 'X', Blockly.JavaScript.ORDER_NONE);
					var value_y = Blockly.JavaScript.valueToCode(v, 'Y', Blockly.JavaScript.ORDER_NONE);
					var value_z = Blockly.JavaScript.valueToCode(v, 'Z', Blockly.JavaScript.ORDER_NONE);
					if (dropdown_field === 'TRANSLATE') {
						if (v.type === 'b3js_vector_vec3') {
							code += value_input + '.' + operation + 'X' + '(' + value_x + ');\n';
							code += value_input + '.' + operation + 'Y' + '(' + value_y + ');\n';
							code += value_input + '.' + operation + 'Z' + '(' + value_z + ');\n';
						}
						else {
							code += value_input + '.' + operation + 'X' + '(' + value_value + '.x);\n';
							code += value_input + '.' + operation + 'Y' + '(' + value_value + '.y);\n';
							code += value_input + '.' + operation + 'Z' + '(' + value_value + '.z);\n';
						}
					}
					else if (dropdown_field === 'ROTATE') {
						if (v.type === 'b3js_vector_vec3') {
							if (!isNaN(value_x)) {
								value_x = rad(value_x);
								code += value_input + '.' + operation + 'X' + '(' + value_x + ');\n';
							}
							else {
								code += value_input + '.' + operation + 'X' + '(rad(' + value_x + '));\n';
							}

							if (!isNaN(value_y)) {
								value_y = rad(value_y);
								code += value_input + '.' + operation + 'Y' + '(' + value_y + ');\n';
							}
							else {
								code += value_input + '.' + operation + 'Y' + '(rad(' + value_y + '));\n';
							}

							if (!isNaN(value_z)) {
								value_z = rad(value_z);
								code += value_input + '.' + operation + 'Z' + '(' + value_z + ');\n';
							}
							else {
								code += value_input + '.' + operation + 'Z' + '(rad(' + value_z + '));\n';
							}
						}
						else {
							code += value_input + '.' + operation + 'X' + '(' + value_value + '.x);\n';
							code += value_input + '.' + operation + 'Y' + '(' + value_value + '.y);\n';
							code += value_input + '.' + operation + 'Z' + '(' + value_value + '.z);\n';
						}
					}
					else {
						code += value_input + '.' + operation + '.copy(' + value_value + ');\n';
					}
				break;

				case 'AXIS':
					if (block.getInputTargetBlock('DIRECTION')) {
						var direction = Blockly.JavaScript.valueToCode(block, 'DIRECTION', Blockly.JavaScript.ORDER_ATOMIC);
						if (dropdown_field === 'TRANSLATE') {
							code += value_input + '.translateOnAxis(' + direction + '.normalize(), ' + value_value + ');\n';
						}
						else if (dropdown_field === 'ROTATE') {
							var value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_NONE);
							if (!isNaN(value)) {
								code += value_input + '.rotateOnAxis(' + direction + '.normalize(), ' + rad(value) + ');\n';
							}
							else {
								code += value_input + '.rotateOnAxis(' + direction + '.normalize(), rad(' + value + '));\n';
							}
						}
						else {
							var value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_NONE);
							code += value_input + '.scale.copy(' + direction + '.multiplyScalar(' + value + '));\n';
						}
					}
				break;
			}
		}
	}
	return code;
};

Blockly.JavaScript['b3js_getfrom_mesh'] = function(block) {
	var value_input = Blockly.JavaScript.valueToCode(block, 'INPUT', Blockly.JavaScript.ORDER_ATOMIC);
	var dropdown_field = block.getFieldValue('FIELD');
	// TODO: Assemble JavaScript into code variable.
	var code = '';
	if (block.getInputTargetBlock('INPUT')) {
		switch (dropdown_field) {
			case 'GEOMETRY':
				code += value_input + '.geometry';
			break;

			case 'MATERIAL':
				code += value_input + '.material';
			break;

			case 'MESH':
				//code += value_input + '.traverse();';
			break;

			case 'POSITION':
				code += value_input + '.position';
			break;

			case 'LOOKAT':
				code += 'new THREE.Vector3(0,0, -1).applyQuaternion(' + value_input + '.quaternion)';
			break;

			case 'CASTSHADOW': {
				code += value_input + '.castShadow';
			}
			break;

			case 'RECEIVESHADOW': {
				code += value_input + '.receiveShadow';
			}
			break;
		}
	}
	// TODO: Change ORDER_NONE to the correct strength.
	return [code, Blockly.JavaScript.ORDER_NONE];
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

			'current_camera = ' + value_camera + ';\n'+

			'renderer = new THREE.WebGLRenderer( { canvas: webglCanvas, context: context } );\n'+
			'renderer.setSize( webglCanvas.offsetWidth, webglCanvas.offsetHeight );\n';

		if (shadow_mapping) {
			code +=
				'renderer.shadowMap.enabled = true;\n'+
				'renderer.shadowMap.type = THREE.PCFSoftShadowMap;\n';
		}

		code +=
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

Blockly.JavaScript['b3js_upon_event'] = function(block) {
	var dropdown_event = block.getFieldValue('EVENT');
	var statements_steps = Blockly.JavaScript.statementToCode(block, 'STEPS');
	var variable_argument = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('ARGUMENT'), Blockly.Variables.NAME_TYPE);

	// TODO: Assemble JavaScript into code variable.
	var code = '';
	if (dropdown_event === 'CLICK') {
		statements_steps.split('\n').forEach((line) => {
			if (line !== '') {
				line = line.replace('targetMesh', 'targetMesh[0].object');
				code += '		' + line + '\n';
			}
		});
		const toDo = Blockly.JavaScript.provideFunction_('uponClick', [
			'function ' + Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_ + '(event) {',
			'	var vector = new THREE.Vector3((event.clientX / webglCanvas.offsetWidth) * 2 - 1,',
			'		-(event.clientY / webglCanvas.offsetHeight) * 2 + 1, 0.5);',
			'	vector = vector.unproject(current_camera);',
			'	var raycaster = new THREE.Raycaster(current_camera.position, vector.sub(current_camera.position).normalize());',
			'	' + variable_argument +' = raycaster.intersectObjects(scene.children, true);',
			'	if (' + variable_argument +'.length > 0) {',
				'' + code + '',
			'	}',
			'}',
			'webglCanvas.onclick = uponClick;']);
	}
	else if (dropdown_event === 'KEYDOWN') {
		statements_steps.split('\n').forEach((line) => {
			if (line !== '') {
				code += '	' + line + '\n';
			}
		});
		const toDo = Blockly.JavaScript.provideFunction_('uponDown', [
			'function ' + Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_ + '(event) {',
			'	' + variable_argument + ' = event.keyCode;',
			'' + code + '',
			'}',
			'window.onkeydown = uponDown;']);
	}
	return '';
};

Blockly.JavaScript['b3js_play_animation'] = function(block) {
	var value_mesh = Blockly.JavaScript.valueToCode(block, 'MESH', Blockly.JavaScript.ORDER_ATOMIC);
	var value_num = Blockly.JavaScript.valueToCode(block, 'NUM', Blockly.JavaScript.ORDER_ATOMIC);
	// TODO: Assemble JavaScript into code variable.
	var code = '';
	if (usr_res[value_mesh] && usr_res[value_mesh].animations) {
		if (usr_res[value_mesh].animations.length > value_num) {
			code +=
			'	usr_res["' + value_mesh + '"].mixer.clipAction(usr_res["' + value_mesh + '"].animations[' + value_num + ']).play();\n'+
			'	usr_res["' + value_mesh + '"].mixer.update(global_clock.getDelta());\n';
		}
	}
	return code;
};
