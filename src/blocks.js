// /=====================================================================\
//  BLOCKS
// \=====================================================================/
Blockly.Blocks['b3js_add_scene'] = {
	init: function() {
		this.appendValueInput('ELEMENT')
				.setCheck(['Camera', 'Light', 'Mesh'])
				.appendField(Blockly.Msg['B3JS_ADD']);
		this.appendDummyInput('END')
				.appendField(Blockly.Msg['B3JS_TO_SCENE']);
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(Blockly.Msg['SCENE_HUE']);
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
				.appendField(Blockly.Msg['B3JS_IN_SCENE'])
				.appendField(Blockly.Msg['B3JS_SET'])
				.appendField(new Blockly.FieldDropdown([[Blockly.Msg['B3JS_BACKGROUND'],'BACKGROUND'], [Blockly.Msg['B3JS_FOG'],'FOG'], [Blockly.Msg['B3JS_AUTOUPDATE'],'AUPDATE'], [Blockly.Msg['B3JS_OVERRIDEMAT'],'OMATERIAL']], block_validator), 'FIELD');
		this.appendValueInput('VALUE')
				.setCheck(['Colour', 'String', 'Texture'])
				.appendField(Blockly.Msg['B3JS_TO']);
		this.setInputsInline(true);
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(Blockly.Msg['SCENE_HUE']);
	this.setTooltip('Set property of the Scene.');
	this.setHelpUrl('https://threejs.org/docs/index.html#api/en/scenes/Scene');
	this.mixin(BLOCK_MIXIN);
	this.mixin(SET_SCENE_SHAPE);
	}
};

Blockly.Blocks['b3js_create_camera'] = {
	init: function() {
		this.appendDummyInput()
				.appendField(Blockly.Msg['B3JS_CAMERA_CREATE'])
				.appendField(new Blockly.FieldTextInput('', (s) => null), 'NAME')
				.appendField(Blockly.Msg['B3JS_AS'])
				.appendField(new Blockly.FieldDropdown([[Blockly.Msg['B3JS_PERSPECTIVE'],'PERSPECTIVE'], [Blockly.Msg['B3JS_ORTHOGRAPHIC'],'ORTHOGRAPHIC']],
					block_validator), 'TYPE')
				.appendField(Blockly.Msg['B3JS_WITH']);
		this.appendDummyInput('CHANGE')
				.appendField(Blockly.Msg['B3JS_FOV'])
				.appendField(new Blockly.FieldNumber(50), 'FOVSCALE')
				.appendField(Blockly.Msg['B3JS_NEAR'])
				.appendField(new Blockly.FieldNumber(0.1), 'NEAR')
				.appendField(Blockly.Msg['B3JS_FAR'])
				.appendField(new Blockly.FieldNumber(1000), 'FAR');
		this.setInputsInline(true);
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(Blockly.Msg['CAMERA_HUE']);
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
				.appendField(Blockly.Msg['B3JS_IN_CAMERA']);
		this.appendDummyInput()
				.appendField(Blockly.Msg['B3JS_SET'])
				.appendField(new Blockly.FieldDropdown([[Blockly.Msg['B3JS_POSITION'],'POSITION'], [Blockly.Msg['B3JS_LOOKAT'],'LOOKAT'], [Blockly.Msg['B3JS_TRANSLATION'],'TRANSLATION'], [Blockly.Msg['B3JS_ROTATIONX'],'RX'], [Blockly.Msg['B3JS_ROTATIONY'],'RY'], [Blockly.Msg['B3JS_ROTATIONZ'],'RZ'], [Blockly.Msg['B3JS_SCALE'],'SCALE']]),
					'FIELD');
		this.appendValueInput('VALUE')
				.setCheck('Vec3')
				.appendField(Blockly.Msg['B3JS_TO']);
		this.setInputsInline(true);
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(Blockly.Msg['CAMERA_HUE']);
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
				.appendField(Blockly.Msg['B3JS_FROM_CAMERA']);
		this.appendDummyInput()
				.appendField(Blockly.Msg['B3JS_GET'])
				.appendField(new Blockly.FieldDropdown([[Blockly.Msg['B3JS_POSITION'],'POSITION'], [Blockly.Msg['B3JS_LOOKAT'],'LOOKAT'], ['rotation','ROTATION'], [Blockly.Msg['B3JS_SCALE'],'SCALE']]), 'FIELD');
		this.setOutput(true, 'Vec3');
		this.setInputsInline(true);
		this.setColour(Blockly.Msg['CAMERA_HUE']);
	this.setTooltip('Get property of a previously created Camera.');
	this.setHelpUrl('');
	}
};

Blockly.Blocks['b3js_value_camera'] = {
	init: function() {
		this.appendDummyInput()
				.appendField(new Blockly.FieldDropdown(() => block_option(['value', 'camera'])), 'VAL');
		this.setOutput(true, 'Camera');
		this.setColour(Blockly.Msg['CAMERA_HUE']);
	this.setTooltip('Retrieve a Camera.');
	this.setHelpUrl('https://threejs.org/docs/index.html#api/en/cameras/Camera');
	this.mixin(BLOCK_MIXIN);
	this.setDisabled(!valDex['camera'].size);
	}
};

Blockly.Blocks['b3js_create_light'] = {
	init: function() {
		this.appendDummyInput()
				.appendField(Blockly.Msg['B3JS_LIGHT_CREATE'])
				.appendField(new Blockly.FieldTextInput('', (s) => null), 'NAME')
				.appendField(Blockly.Msg['B3JS_AS'])
				.appendField(new Blockly.FieldDropdown([[Blockly.Msg['B3JS_AMBIENT'],'AMBIENT'], [Blockly.Msg['B3JS_POINT'],'POINT'], [Blockly.Msg['B3JS_SPOT'],'SPOT'], [Blockly.Msg['B3JS_DIRECTIONAL'],'DIRECTIONAL'], [Blockly.Msg['B3JS_HEMISPHERE'],'HEMISPHERE']], block_validator), 'TYPE')
				.appendField(Blockly.Msg['B3JS_WITH']);
		this.appendDummyInput('CHANGE')
				.appendField(Blockly.Msg['B3JS_COLOR'])
				.appendField(new Blockly.FieldColour('#ffffff'), 'COLOUR')
				.appendField(Blockly.Msg['B3JS_INTENSITY'])
				.appendField(new Blockly.FieldNumber(1, 0), 'INTENSITY');
		this.setInputsInline(true);
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(Blockly.Msg['LIGHT_HUE']);
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
				.appendField(Blockly.Msg['B3JS_IN_LIGHT']);
		this.appendDummyInput()
				.appendField(Blockly.Msg['B3JS_SET'])
				.appendField(new Blockly.FieldDropdown(() => block_option(['set', 'light'], this.getInputTargetBlock('INPUT')),
					block_validator), 'FIELD');
		this.appendValueInput('VALUE')
				.setCheck(['Colour', 'String'])
				.appendField(Blockly.Msg['B3JS_TO']);
		this.setInputsInline(true);
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(Blockly.Msg['LIGHT_HUE']);
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
				.appendField(Blockly.Msg['B3JS_FROM_LIGHT']);
		this.appendDummyInput()
				.appendField(Blockly.Msg['B3JS_GET'])
				.appendField(new Blockly.FieldDropdown(() => block_option(['getfrom', 'light'], this.getInputTargetBlock('INPUT')), block_validator), 'FIELD');
		this.setOutput(true, null);
		this.setInputsInline(true);
		this.setColour(Blockly.Msg['LIGHT_HUE']);
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
		this.setColour(Blockly.Msg['LIGHT_HUE']);
	this.setTooltip('Retrieve a Light.');
	this.setHelpUrl('');
	this.mixin(BLOCK_MIXIN);
	this.setDisabled(!valDex['light'].size);
	}
};

Blockly.Blocks['b3js_create_geometry'] = {
	init: function() {
		this.appendDummyInput()
				.appendField(Blockly.Msg['B3JS_GEOMETRY_CREATE'])
				.appendField(new Blockly.FieldTextInput('', (s) => null), 'NAME')
				.appendField(Blockly.Msg['B3JS_AS'])
				.appendField(new Blockly.FieldDropdown([[Blockly.Msg['B3JS_PLANE'],'PLANE'], [Blockly.Msg['B3JS_BOX'],'BOX'], [Blockly.Msg['B3JS_SPHERE'],'SPHERE'], [Blockly.Msg['B3JS_CYLINDER'],'CYLINDER'], [Blockly.Msg['B3JS_TORUS'],'TORUS']], block_validator), 'TYPE')
				.appendField(Blockly.Msg['B3JS_WITH']);
		this.appendDummyInput('CHANGE')
				.appendField(Blockly.Msg['B3JS_WIDTH'])
				.appendField(new Blockly.FieldNumber(1, 0), 'WIDTH')
				.appendField(Blockly.Msg['B3JS_HEIGHT'])
				.appendField(new Blockly.FieldNumber(1, 0), 'HEIGHT')
				.appendField(Blockly.Msg['B3JS_DETAIL'])
				.appendField(new Blockly.FieldNumber(1, 1, 10), 'DETAIL');
		this.setInputsInline(true);
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(Blockly.Msg['GEOMETRY_HUE']);
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
				.appendField(Blockly.Msg['B3JS_IN_GEOMETRY']);
		this.appendDummyInput()
				.appendField(Blockly.Msg['B3JS_SET'])
				.appendField(new Blockly.FieldDropdown([[Blockly.Msg['B3JS_TRANSLATION'],'TRANSLATION'], [Blockly.Msg['B3JS_ROTATIONX'],'RX'], [Blockly.Msg['B3JS_ROTATIONY'],'RY'], [Blockly.Msg['B3JS_ROTATIONZ'],'RZ'], [Blockly.Msg['B3JS_SCALE'],'SCALE']], block_validator), 'FIELD');
		this.appendValueInput('VALUE')
				.setCheck('Vec3')
				.appendField(Blockly.Msg['B3JS_TO']);
		this.setInputsInline(true);
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(Blockly.Msg['GEOMETRY_HUE']);
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
				.appendField(Blockly.Msg['B3JS_FROM_GEOMETRY']);
		this.appendDummyInput()
				.appendField(Blockly.Msg['B3JS_GET'])
				.appendField(new Blockly.FieldDropdown([[Blockly.Msg['B3JS_POSITION'],'POSITION'], [Blockly.Msg['B3JS_ROTATION'],'ROTATION'], [Blockly.Msg['B3JS_SCALE'],'SCALE']]), 'FIELD');
		this.setOutput(true, 'Vec3');
		this.setInputsInline(true);
		this.setColour(Blockly.Msg['GEOMETRY_HUE']);
	this.setTooltip('Get property of a previously created Geometry.');
	this.setHelpUrl('');
	}
};

Blockly.Blocks['b3js_value_geometry'] = {
	init: function() {
		this.appendDummyInput()
				.appendField(new Blockly.FieldDropdown(() => block_option(['value', 'geometry'])), 'VAL');
		this.setOutput(true, 'Geometry');
		this.setColour(Blockly.Msg['GEOMETRY_HUE']);
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
				.appendField(Blockly.Msg['B3JS_X']);
		this.appendValueInput('Y')
				.setCheck('Number')
				.appendField(Blockly.Msg['B3JS_Y']);
		this.setInputsInline(true);
		this.setOutput(true, 'Vec2');
		this.setColour(Blockly.Msg['GEOMETRY_HUE']);
	this.setTooltip('Return a new Vector of 2 dimensions.');
	this.setHelpUrl('https://threejs.org/docs/index.html#api/en/math/Vector2');
	}
};

Blockly.Blocks['b3js_vector_vec3'] = {
	init: function() {
		this.appendValueInput('X')
				.setCheck('Number')
				.appendField(Blockly.Msg['B3JS_X']);
		this.appendValueInput('Y')
				.setCheck('Number')
				.appendField(Blockly.Msg['B3JS_Y']);
		this.appendValueInput('Z')
				.setCheck('Number')
				.appendField(Blockly.Msg['B3JS_Z']);
		this.setInputsInline(true);
		this.setOutput(true, 'Vec3');
		this.setColour(Blockly.Msg['GEOMETRY_HUE']);
	this.setTooltip('Return a new Vector of 3 dimensions.');
	this.setHelpUrl('https://threejs.org/docs/index.html#api/en/math/Vector3');
	}
};

Blockly.Blocks['b3js_vector_vec4'] = {
	init: function() {
		this.appendValueInput('X')
				.setCheck('Number')
				.appendField(Blockly.Msg['B3JS_X']);
		this.appendValueInput('Y')
				.setCheck('Number')
				.appendField(Blockly.Msg['B3JS_Y']);
		this.appendValueInput('Z')
				.setCheck('Number')
				.appendField(Blockly.Msg['B3JS_Z']);
		this.appendValueInput('W')
				.setCheck('Number')
				.appendField(Blockly.Msg['B3JS_W']);
		this.setInputsInline(true);
		this.setOutput(true, 'Vec4');
		this.setColour(Blockly.Msg['GEOMETRY_HUE']);
	this.setTooltip('Return a new Vector of 4 dimensions.');
	this.setHelpUrl('https://threejs.org/docs/index.html#api/en/math/Vector4');
	}
};

Blockly.Blocks['b3js_create_material'] = {
	init: function() {
		this.appendDummyInput()
				.appendField(Blockly.Msg['B3JS_MATERIAL_CREATE'])
				.appendField(new Blockly.FieldTextInput('', (s) => null), 'NAME')
				.appendField(Blockly.Msg['B3JS_AS'])
				.appendField(new Blockly.FieldDropdown([[Blockly.Msg['B3JS_BASICMATERIAL'],'BASIC'], [Blockly.Msg['B3JS_DEPTHMATERIAL'],'DEPTH'], [Blockly.Msg['B3JS_NORMALMATERIAL'],'NORMAL'], [Blockly.Msg['B3JS_LAMBERTMATERIAL'],'LAMBERT'], [Blockly.Msg['B3JS_PHONGMATERIAL'],'PHONG']],
					block_validator), 'TYPE')
				.appendField(Blockly.Msg['B3JS_WITH']);
		this.appendDummyInput('CHANGE')
				.appendField(Blockly.Msg['B3JS_COLOR'])
				.appendField(new Blockly.FieldColour('#ffffff'), 'COLOUR');
		this.setInputsInline(true);
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(Blockly.Msg['MATERIAL_HUE']);
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
				.appendField(Blockly.Msg['B3JS_IN_MATERIAL']);
		this.appendDummyInput()
				.appendField(Blockly.Msg['B3JS_SET'])
				.appendField(new Blockly.FieldDropdown(() => block_option(['set', 'material'], this.getInputTargetBlock('INPUT')), block_validator), 'FIELD');
		this.appendValueInput('VALUE')
				.setCheck(['Colour', 'String'])
				.appendField(Blockly.Msg['B3JS_TO']);
		this.setInputsInline(true);
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(Blockly.Msg['MATERIAL_HUE']);
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
				.appendField(Blockly.Msg['B3JS_FROM_MATERIAL']);
		this.appendDummyInput()
				.appendField(Blockly.Msg['B3JS_GET'])
				.appendField(new Blockly.FieldDropdown(() => block_option(['getfrom', 'material'], this.getInputTargetBlock('INPUT')), block_validator), 'FIELD');
		this.setOutput(true, null);
		this.setInputsInline(true);
		this.setColour(Blockly.Msg['MATERIAL_HUE']);
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
		this.setColour(Blockly.Msg['MATERIAL_HUE']);
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
				.appendField(Blockly.Msg['B3JS_TEXTURE']);
		this.appendDummyInput()
				.appendField(Blockly.Msg['B3JS_WITH'])
				.appendField(Blockly.Msg['B3JS_WRAP'])
				.appendField(new Blockly.FieldDropdown([[Blockly.Msg['B3JS_CLAMP'],'CLAMP'], [Blockly.Msg['B3JS_REPEAT'],'REPEAT'], [Blockly.Msg['B3JS_MIRROR'],'MIRROR']]), 'WRAP');
		this.appendDummyInput()
				.appendField(Blockly.Msg['B3JS_FILTER'])
				.appendField(new Blockly.FieldDropdown([[Blockly.Msg['B3JS_LINEAR'],'LINEAR'], [Blockly.Msg['B3JS_NEAREST'],'NEAREST']]), 'FILTER');
		this.setInputsInline(true);
		this.setOutput(true, 'Texture');
		this.setColour(Blockly.Msg['MATERIAL_HUE']);
	this.setTooltip('Return a new Texture.');
	this.setHelpUrl('');
	}
};

Blockly.Blocks['b3js_linear_fog'] = {
	init: function() {
		this.appendDummyInput()
				.appendField(Blockly.Msg['B3JS_FOG'])
				.appendField(Blockly.Msg['B3JS_WITH'])
				.appendField(Blockly.Msg['B3JS_COLOR'])
				.appendField(new Blockly.FieldColour('#ffffff'), 'COLOUR')
				.appendField(Blockly.Msg['B3JS_NEAR'])
				.appendField(new Blockly.FieldNumber(1), 'NEAR')
				.appendField(Blockly.Msg['B3JS_FAR'])
				.appendField(new Blockly.FieldNumber(100), 'FAR');
		this.setInputsInline(true);
		this.setOutput(true, 'Fog');
		this.setColour(Blockly.Msg['MATERIAL_HUE']);
	this.setTooltip('Return a new Fog element.');
	this.setHelpUrl('');
	}
};

Blockly.Blocks['b3js_create_mesh'] = {
	init: function() {
		this.appendDummyInput()
				.appendField(Blockly.Msg['B3JS_MESH_CREATE'])
				.appendField(new Blockly.FieldTextInput('', (s) => null), 'NAME')
				.appendField(Blockly.Msg['B3JS_WITH']);
		this.appendValueInput('GEOMETRY')
				.setCheck('Geometry')
				.appendField(Blockly.Msg['B3JS_GEOMETRY']);
		this.appendValueInput('MATERIAL')
				.setCheck('Material')
				.appendField(Blockly.Msg['B3JS_MATERIAL']);
		this.setInputsInline(true);
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(Blockly.Msg['MESH_HUE']);
	this.setTooltip('Create a new Mesh.');
	this.setHelpUrl('');
	}
};

Blockly.Blocks['b3js_create_mesh_from_file'] = {
	init: function() {
		this.appendDummyInput()
				.appendField(Blockly.Msg['B3JS_MESH_CREATE'])
				.appendField(new Blockly.FieldTextInput('', (s) => null), 'NAME');
		this.appendValueInput('VALUE')
				.setCheck('String')
				.appendField(Blockly.Msg['B3JS_FROM_FILE']);
		this.setInputsInline(true);
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(Blockly.Msg['MESH_HUE']);
	this.setTooltip('Create a new Mesh from a glTF, OBJ or Collada file.');
	this.setHelpUrl('');
	}
};

Blockly.Blocks['b3js_create_mesh_group'] = {
	init: function() {
		this.appendDummyInput()
				.appendField(Blockly.Msg['B3JS_MESH_CREATE'])
				.appendField(new Blockly.FieldTextInput('', (s) => null), 'NAME');
		this.appendValueInput('VALUE')
				.setCheck('Mesh')
				.appendField(Blockly.Msg['B3JS_GROUPS']);
		this.setInputsInline(true);
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(Blockly.Msg['MESH_HUE']);
	this.setTooltip('Create a new Group from Meshes or Groups.');
	this.setHelpUrl('');
	this.mixin(ADD_MIXIN);
	this.setMutator(new Blockly.Mutator(['mesh_with_element']));
	}
};

Blockly.Blocks['b3js_set_mesh'] = {
	init: function() {
		this.appendValueInput('INPUT')
				.setCheck('Mesh')
				.appendField(Blockly.Msg['B3JS_IN_MESH']);
		this.appendDummyInput()
				.appendField(Blockly.Msg['B3JS_SET'], 'ACTION')
				.appendField(new Blockly.FieldDropdown(() => block_option(['set', 'mesh'], this.getInputTargetBlock('INPUT')), block_validator), 'FIELD');
		this.appendValueInput('VALUE')
				.setCheck('Geometry')
				.appendField(Blockly.Msg['B3JS_TO']);
		this.setInputsInline(true);
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(Blockly.Msg['MESH_HUE']);
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
				.appendField(new Blockly.FieldDropdown([[Blockly.Msg['B3JS_TRANSLATE'],'TRANSLATE'], [Blockly.Msg['B3JS_ROTATE'],'ROTATE'], [Blockly.Msg['B3JS_SCALE'],'SCALE']]), 'FIELD');
		this.appendDummyInput()
				.appendField(new Blockly.FieldDropdown([[Blockly.Msg['B3JS_X'],'X'], [Blockly.Msg['B3JS_Y'],'Y'], [Blockly.Msg['B3JS_Z'],'Z'], [Blockly.Msg['B3JS_XYZ'],'XYZ'], [Blockly.Msg['B3JS_ALONG'],'AXIS']], block_validator), 'COMPONENT');
		this.appendValueInput('VALUE')
				.setCheck('Number')
				.appendField(Blockly.Msg['B3JS_BY']);
		this.setInputsInline(true);
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(Blockly.Msg['MESH_HUE']);
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
				.appendField(Blockly.Msg['B3JS_FROM_MESH']);
		this.appendDummyInput()
				.appendField(Blockly.Msg['B3JS_GET'])
				.appendField(new Blockly.FieldDropdown(() => block_option(['getfrom', 'mesh'], this.getInputTargetBlock('INPUT')), block_validator), 'FIELD');
		this.setOutput(true, null);
		this.setInputsInline(true);
		this.setColour(Blockly.Msg['MESH_HUE']);
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
		this.setColour(Blockly.Msg['MESH_HUE']);
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
				.appendField(Blockly.Msg['B3JS_RENDER']);
		this.appendStatementInput('RENDER')
				.setCheck(null);
		this.setInputsInline(true);
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(Blockly.Msg['ANIMATION_HUE']);
	this.setTooltip('Render a Scene with a previously created Camera.');
	this.setHelpUrl('');
	this.setDisabled(!valDex['camera'].size != workspace.getBlocksByType('b3js_render_loop').length > 0);
	}
};

Blockly.Blocks['b3js_upon_event'] = {
	init: function() {
		this.appendDummyInput()
				.appendField(Blockly.Msg['B3JS_UPON'])
				.appendField(new Blockly.FieldDropdown([['click','CLICK'], ['keyDown','KEYDOWN']], block_validator), 'EVENT');
		this.appendStatementInput('STEPS')
				.setCheck(null)
				.appendField(Blockly.Msg['B3JS_DO']);
		this.appendDummyInput('VARIABLE')
				.appendField(Blockly.Msg['B3JS_ON'])
				.appendField(new Blockly.FieldVariable('targetMesh'), 'ARGUMENT');
		this.setInputsInline(true);
		this.setColour(Blockly.Msg['ANIMATION_HUE']);
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
				.appendField(Blockly.Msg['B3JS_IN_MESH']);
		this.appendValueInput('NUM')
				.setCheck('Number')
				.appendField(Blockly.Msg['B3JS_PLAY_ANIM']);
		this.setInputsInline(true);
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(Blockly.Msg['ANIMATION_HUE']);
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

				case 'TRANSLATION':
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
				case 'TRANSLATION':
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
	code += 'new THREE.TextureLoader().setPath("./resources/").load(' + value_texture + ', ';
	code += '(texture) => {\n';
	switch (dropdown_wrap) {
		case 'CLAMP':
			code += '	texture.wrapS = THREE.ClampToEdgeWrapping;\n';
			code += '	texture.wrapT = THREE.ClampToEdgeWrapping;\n';
		break;

		case 'REPEAT':
			code += '	texture.wrapS = THREE.RepeatWrapping;\n';
			code += '	texture.wrapT = THREE.RepeatWrapping;\n';
		break;

		case 'MIRROR':
			code += '	texture.wrapS = THREE.MirroredRepeatWrapping;\n';
			code += '	texture.wrapT = THREE.MirroredRepeatWrapping;\n';
		break;
	}
	switch (dropdown_filter) {
		case 'LINEAR':
			code += '	texture.magFilter = THREE.LinearFilter;\n';
			code += '	texture.minFilter = THREE.LinearFilter;\n';
		break;

		case 'NEAREST':
			code += '	texture.magFilter = THREE.NearestFilter;\n';
			code += '	texture.minFilter = THREE.NearestFilter;\n';
		break;
	}
	code += '})'
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
	/*else
		code += 'const mesh_' + text_name + ' = new THREE.Mesh();\n';*/
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
	else if (value_value.indexOf('.dae') >= 0 || value_value.indexOf('.gltf') >= 0 || value_value.indexOf('.glb') >= 0) {
		if (usr_res[key]) {
			code += 'const ' + key + ' = usr_res["' + key + '"].scene;\n';
			if (usr_res[key].animations.length) {
				usr_res[key].mixer = new THREE.AnimationMixer(usr_res[key].scene);
			}
		}
	}
	code += key + '.name = "' + key + '";\n';
	return code;
};

Blockly.JavaScript['b3js_create_mesh_group'] = function(block) {
	var text_name = block.getFieldValue('NAME');
	var value_value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_ATOMIC);
	var key = 'mesh_' + text_name;
	// Cloning gallery
	const toDo = Blockly.JavaScript.provideFunction_('cloneChild', [
		'function ' + Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_ + '(group, child, n) {',
		'	if (n === null)',
		'		n = group.children.length;',
		'	if (child.type === "Scene") {',
		'		if (!usr_res[group.name]) usr_res[group.name] = {};',
		'		usr_res[group.name]["animations"+n] = usr_res[child.name].animations;',
		'		usr_res[group.name]["scene"+n] = THREE.SkeletonUtils.clone(child);',
		'		if (usr_res[child.name].animations.length) {',
		'			usr_res[group.name]["mixer"+n] = new THREE.AnimationMixer(usr_res[group.name]["scene"+n]);',
		'		}',
		'		group.add(usr_res[group.name]["scene"+n]);',
		'		group.children[n].name = group.name + ":" + n;',
		'	}',
		'	else if (child.type === "Mesh") {',
		'		group.add(child.clone());',
		'	}',
		'	else if (child.type === "Group") {',
		'		var invalid = false;',
		'		child.traverse((e) => {if (e.type === "SkinnedMesh") invalid = true;});',
		'		if (!invalid) group.add(child.clone());',
		'	}',
		'}']);

	// TODO: Assemble JavaScript into code variable.
	var code = 'const ' + key + ' = new THREE.Group();\n';
	code += key + '.name = "' + key + '";\n';
	if (block.getInputTargetBlock('VALUE')) {
		var i = 0, n = 0;
		code += 'cloneChild(' + key + ', ' + value_value + ', ' + n + ');\n';
		while (block.getInputTargetBlock('ADD' + i)) {
			value_value = Blockly.JavaScript.valueToCode(block, 'ADD' + i, Blockly.JavaScript.ORDER_ATOMIC);
			n = i + 1;
			code += 'cloneChild(' + key + ', ' + value_value + ', ' + n + ');\n';
			i++;
		}
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

				case 'CHILD':
					if (value_input !== value_value) {
						code += 'cloneChild(' + value_input + ', ' + value_value + ', ' + null + ');\n';
					}
				break;

				case 'POSITION':
					switch (block.getFieldValue('COMP')) {
						case 'XYZ':
							code += value_input + '.position.copy(' + value_value + ');\n';
						break;

						case 'X':
							code += value_input + '.position.x = ' + value_value + ';\n';
						break;

						case 'Y':
							code += value_input + '.position.y = ' + value_value + ';\n';
						break;

						case 'Z':
							code += value_input + '.position.z = ' + value_value + ';\n';
						break;
					}
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
			switch (dropdown_component) {
				case 'X':
				case 'Y':
				case 'Z':
					if (dropdown_field === 'TRANSLATE') {
						code += value_input + '.' + dropdown_field.toLowerCase() + dropdown_component + '(' + value_value + ');\n';
					}
					else if (dropdown_field === 'ROTATE') {
						var value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_NONE);
						if (!isNaN(value)) {
							code += value_input + '.' + dropdown_field.toLowerCase() + dropdown_component + '(' + rad(value) + ');\n';
						}
						else {
							code += value_input + '.' + dropdown_field.toLowerCase() + dropdown_component + '(rad(' + value + '));\n';
						}
					}
					else {
						if (dropdown_component === 'X') {
							code += value_input + '.' + dropdown_field.toLowerCase() + '.copy(' +
								'new THREE.Vector3(' + value_value + ', ' + '1' + ', ' + '1' + '));\n';
						}
						else if (dropdown_component === 'Y') {
							code += value_input + '.' + dropdown_field.toLowerCase() + '.copy(' +
								'new THREE.Vector3(' + '1' + ', ' + value_value + ', ' + '1' + '));\n';
						}
						else {
							code += value_input + '.' + dropdown_field.toLowerCase() + '.copy(' +
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
							code += value_input + '.' + dropdown_field.toLowerCase() + 'X' + '(' + value_x + ');\n';
							code += value_input + '.' + dropdown_field.toLowerCase() + 'Y' + '(' + value_y + ');\n';
							code += value_input + '.' + dropdown_field.toLowerCase() + 'Z' + '(' + value_z + ');\n';
						}
						else {
							code += value_input + '.' + dropdown_field.toLowerCase() + 'X' + '(' + value_value + '.x);\n';
							code += value_input + '.' + dropdown_field.toLowerCase() + 'Y' + '(' + value_value + '.y);\n';
							code += value_input + '.' + dropdown_field.toLowerCase() + 'Z' + '(' + value_value + '.z);\n';
						}
					}
					else if (dropdown_field === 'ROTATE') {
						if (v.type === 'b3js_vector_vec3') {
							if (!isNaN(value_x)) {
								value_x = rad(value_x);
								code += value_input + '.' + dropdown_field.toLowerCase() + 'X' + '(' + value_x + ');\n';
							}
							else {
								code += value_input + '.' + dropdown_field.toLowerCase() + 'X' + '(rad(' + value_x + '));\n';
							}

							if (!isNaN(value_y)) {
								value_y = rad(value_y);
								code += value_input + '.' + dropdown_field.toLowerCase() + 'Y' + '(' + value_y + ');\n';
							}
							else {
								code += value_input + '.' + dropdown_field.toLowerCase() + 'Y' + '(rad(' + value_y + '));\n';
							}

							if (!isNaN(value_z)) {
								value_z = rad(value_z);
								code += value_input + '.' + dropdown_field.toLowerCase() + 'Z' + '(' + value_z + ');\n';
							}
							else {
								code += value_input + '.' + dropdown_field.toLowerCase() + 'Z' + '(rad(' + value_z + '));\n';
							}
						}
						else {
							code += value_input + '.' + dropdown_field.toLowerCase() + 'X' + '(' + value_value + '.x);\n';
							code += value_input + '.' + dropdown_field.toLowerCase() + 'Y' + '(' + value_value + '.y);\n';
							code += value_input + '.' + dropdown_field.toLowerCase() + 'Z' + '(' + value_value + '.z);\n';
						}
					}
					else {
						code += value_input + '.' + dropdown_field.toLowerCase() + '.copy(' + value_value + ');\n';
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
				const toDo = Blockly.JavaScript.provideFunction_('findMesh', [
					'function ' + Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_ + '(o3d, index) {',
					'	var ithMesh = undefined;',
					'	var count = 0;',
					'	o3d.traverse((child) => {',
					'		if (child.isMesh) {',
					'			if(count === index) {',
					'				ithMesh = child;',
					'			}',
					'			count++;',
					'		}',
					'	});',
					'	return ithMesh;',
					'}']);

				var value_num = Blockly.JavaScript.valueToCode(block, 'NUM', Blockly.JavaScript.ORDER_ATOMIC);
				if (value_num) {
					code += 'findMesh(' + value_input + ', ' + value_num + ', "Mesh")';
				}
			break;

			case 'CHILD':
				var value_num = Blockly.JavaScript.valueToCode(block, 'NUM', Blockly.JavaScript.ORDER_ATOMIC);
				if (value_num) {
					code += value_input + '.children[' + value_num + ']';
				}
			break;

			case 'POSITION':
				switch (block.getFieldValue('COMP')) {
					case 'XYZ':
						code += value_input + '.position';
					break;

					case 'X':
						code += value_input + '.position.x';
					break;

					case 'Y':
						code += value_input + '.position.y';
					break;

					case 'Z':
						code += value_input + '.position.z';
					break;
				}
			break;

			case 'LOOKAT':
				switch (block.getFieldValue('COMP')) {
					case 'XYZ':
						code += 'new THREE.Vector3(0,0, -1).applyQuaternion(' + value_input + '.quaternion)';
					break;

					case 'X':
						code += 'new THREE.Vector3(0,0, -1).applyQuaternion(' + value_input + '.quaternion).x';
					break;

					case 'Y':
						code += 'new THREE.Vector3(0,0, -1).applyQuaternion(' + value_input + '.quaternion).y';
					break;

					case 'Z':
						code += 'new THREE.Vector3(0,0, -1).applyQuaternion(' + value_input + '.quaternion).z';
					break;
				}
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
			'	anim_id = requestAnimationFrame( animate );\n'+
			'	delta = global_clock.getDelta();\n';

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
	var variable_argument = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('ARGUMENT'),
		Blockly.Variables.NAME_TYPE);

	// TODO: Assemble JavaScript into code variable.
	if (dropdown_event === 'CLICK') {
		const toDo = Blockly.JavaScript.provideFunction_('uponClick', [
			'function ' + Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_ + '(event) {',
			'	var vector = new THREE.Vector3((event.clientX / webglCanvas.offsetWidth) * 2 - 1,',
			'		-(event.clientY / webglCanvas.offsetHeight) * 2 + 1, 0.5);',
			'	vector = vector.unproject(current_camera);',
			'	var raycaster = new THREE.Raycaster(current_camera.position, vector.sub(current_camera.position).normalize());',
			'	' + variable_argument +' = raycaster.intersectObjects(scene.children, true);',
			'	if (' + variable_argument +'.length > 0) {',
			'		' + variable_argument + ' = ' + variable_argument + '[0].object;',
			'		if (' + variable_argument + '.type === "SkinnedMesh")',
			'		'	+	variable_argument + ' = ' + variable_argument + '.parent;',
			'		'	+	statements_steps,
			'	}',
			'}',
			'webglCanvas.onclick = uponClick;']);
	}
	else if (dropdown_event === 'KEYDOWN') {
		const toDo = Blockly.JavaScript.provideFunction_('uponDown', [
			'function ' + Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_ + '(event) {',
			'	'	+	variable_argument + ' = event.keyCode;',
			'	'	+	statements_steps,
			'}',
			'window.onkeydown = uponDown;']);
	}
	return '';
};

Blockly.JavaScript['b3js_play_animation'] = function(block) {
	var value_mesh = Blockly.JavaScript.valueToCode(block, 'MESH', Blockly.JavaScript.ORDER_ATOMIC);
	var value_num = Blockly.JavaScript.valueToCode(block, 'NUM', Blockly.JavaScript.ORDER_ATOMIC);
	// TODO: Assemble JavaScript into code variable.

	const toDo = Blockly.JavaScript.provideFunction_('animateChild', [
		'function ' + Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_ + '(mesh, num) {',
		'	if (!mesh) return;',
		'	var id = mesh.name.split(":");',
		'	if (usr_res[id[0]]) {',
		'		if (id.length > 1 && usr_res[id[0]]["mixer"+id[1]]) {',
		'			usr_res[id[0]]["mixer"+id[1]].clipAction(usr_res[id[0]]["animations"+id[1]][num]).play();',
		'			usr_res[id[0]]["mixer"+id[1]].update(delta);',
		'		}',
		'		else if (usr_res[id[0]].mixer){',
		'			usr_res[id[0]].mixer.clipAction(usr_res[id[0]].animations[num]).play();',
		'			usr_res[id[0]].mixer.update(delta);',
		'		}',
		'	}',
		'}']);

	var code = 'animateChild(' + value_mesh + ', ' + value_num +');\n';
	return code;
};
