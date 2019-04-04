// /=====================================================================\
//  MUTATORS
// \=====================================================================/
Blockly.Blocks['all_container'] = {
	init: function() {
		this.appendStatementInput('STACK');
		this.setTooltip('');
		this.contextMenu = false;
	}
};

Blockly.Blocks['scene_with_element'] = {
	init: function() {
		this.setColour(0);
		this.appendDummyInput()
				.appendField('element');
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.setTooltip('');
		this.contextMenu = false;
	}
};

Blockly.Blocks['group_with_element'] = {
	init: function() {
		this.setColour(100);
		this.appendDummyInput()
				.appendField('element');
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.setTooltip('');
		this.contextMenu = false;
	}
};

// /=====================================================================\
//	OPTION MODIFIER
// \=====================================================================/
const block_option = function(type, input) {
	if (type[0] === 'value') {
		if (valDex[type[1]].size > 0) {
			return Array.from(valDex[type[1]]).map((e) => [e[0], e[1][0]]);
		}
		else {
			return [['','']];
		}
	}
	else if (type[0] === 'set' || type[0] === 'getfrom') {
		switch (type[1]) {
			case 'light':
				if (input && input.getField('VAL')) {
					const name = input.getField('VAL').getText();
					if (valDex[type[1]].has(name)) {
						switch (valDex[type[1]].get(name)[1]) {
							case 'AMBIENT':
								return [['color','COLOR'], ['intensity','INTENSITY']];
							break;
							case 'POINT':
								return [['color','COLOR'], ['intensity','INTENSITY'], ['distance','DISTANCE'], ['decay','DECAY'], ['position','POSITION'], ['visible','VISIBLE'], ['castShadow','CASTSHADOW']];
							break;
							case 'SPOT':
								return [['color','COLOR'], ['intensity','INTENSITY'], ['distance','DISTANCE'], ['decay','DECAY'], ['position','POSITION'], ['target','TARGET'], ['penumbra','PENUMBRA'], ['angle','ANGLE'], ['visible','VISIBLE'], ['castShadow','CASTSHADOW']];
							break;
							case 'DIRECTIONAL':
								return [['color','COLOR'], ['intensity','INTENSITY'], ['distance','DISTANCE'], ['position','POSITION'], ['target','TARGET'], ['angle','ANGLE'], ['visible','VISIBLE'], ['castShadow','CASTSHADOW']];
							break;
							case 'HEMISPHERE':
								return [['color','COLOR'], ['intensity','INTENSITY'], ['groundColor','GROUND'], ['position','POSITION']];
							break;
						}
					}
				}
				return [['color','COLOR'], ['intensity','INTENSITY'], ['groundColor','GROUND'], ['distance','DISTANCE'], ['decay','DECAY'], ['position','POSITION'], ['target','TARGET'], ['penumbra','PENUMBRA'], ['angle','ANGLE'], ['visible','VISIBLE'], ['castShadow','CASTSHADOW']];
			break;

			case 'geometry':
			break;

			case 'material':
				if (input && input.getField('VAL')) {
					const name = input.getField('VAL').getText();
					if (valDex[type[1]].has(name)) {
						switch (valDex[type[1]].get(name)[1]) {
							case 'BASIC':
								return [['color','COLOR'], ['opacity','OPACITY'], ['transparent','TRANSPARENT'], ['visible','VISIBLE'], ['map','MAP'], ['depthTest','DEPTHTEST'], ['wireframe','WIREFRAME']];
							break;
							case 'DEPTH':
							case 'NORMAL':
								return [['opacity','OPACITY'], ['transparent','TRANSPARENT'], ['visible','VISIBLE'], ['depthTest','DEPTHTEST'], ['wireframe','WIREFRAME']];
							break;
							case 'LAMBERT':
								return [['color','COLOR'], ['opacity','OPACITY'], ['transparent','TRANSPARENT'], ['visible','VISIBLE'], ['map','MAP'], ['depthTest','DEPTHTEST'], ['wireframe','WIREFRAME'], ['emissive','EMISSIVE']];
							break;
							case 'PHONG':
								return [['color','COLOR'], ['opacity','OPACITY'], ['transparent','TRANSPARENT'], ['visible','VISIBLE'], ['map','MAP'], ['bumpMap','BUMPMAP'], ['normalMap', 'NORMALMAP'], ['depthTest','DEPTHTEST'], ['wireframe','WIREFRAME'], ['emissive','EMISSIVE'], ['specular','SPECULAR'], ['shininess','SHININESS']];
							break;
						}
					}
				}
				return [['color','COLOR'], ['opacity','OPACITY'], ['transparent','TRANSPARENT'], ['visible','VISIBLE'], ['map','MAP'], ['bumpMap','BUMPMAP'], ['normalMap', 'NORMALMAP'], ['depthTest','DEPTHTEST'], ['wireframe','WIREFRAME'], ['emissive','EMISSIVE'], ['specular','SPECULAR'], ['shininess','SHININESS']];
			break;

			case 'mesh':
				if (input && input.getField('VAL')) {
					const name = input.getField('VAL').getText();
					if (valDex[type[1]].has(name)) {
						switch (valDex[type[1]].get(name)[1]) {
							case 'MESH':
								return [['geometry','GEOMETRY'], ['material','MATERIAL'], ['position','POSITION'], ['lookAt','LOOKAT'], ['castShadow','CASTSHADOW'], ['receiveShadow','RECEIVESHADOW']];
							break;

							case 'GROUP':
								if (type[0] === 'set')
									return [['geometry','GEOMETRY'], ['material','MATERIAL'], ['mesh','MESH'], ['position','POSITION'], ['lookAt','LOOKAT'], ['castShadow','CASTSHADOW'], ['receiveShadow','RECEIVESHADOW']]
								else
									return [['mesh','MESH'], ['position','POSITION'], ['lookAt','LOOKAT'], ['castShadow','CASTSHADOW'],
									['receiveShadow','RECEIVESHADOW']];
							break;

							case 'IMPORT':
								return [['position','POSITION'], ['lookAt','LOOKAT'], ['castShadow','CASTSHADOW'], ['receiveShadow','RECEIVESHADOW']];
							break;
						}
					}
				}
				return [['geometry','GEOMETRY'], ['material','MATERIAL'], ['mesh','MESH'], ['position','POSITION'], ['lookAt','LOOKAT'], ['castShadow','CASTSHADOW'], ['receiveShadow','RECEIVESHADOW']]
			break;
		}
	}
};

// /=====================================================================\
//	OPTION VALIDATOR
// \=====================================================================/
const block_validator = function(option) {
	const source = this.sourceBlock_;
	if (source.type.indexOf('b3js_create') >= 0) {
		const type = source.type.split('_')[2];
		const name = source.getFieldValue('NAME');
		if (valDex[type].has(name)) {
			valDex[type].get(name)[1] = option;
		}
	}
	if (typeof source.updateShape_ === 'function') {
		source.updateShape_(option);
	}
};

// /=====================================================================\
//	MIXINS
// \=====================================================================/
const ADD_MIXIN = {
	mutationToDom: function() {
		var container = document.createElement('mutation');
		container.setAttribute('elements', this.elementCount_);
		return container;
	},

	domToMutation: function(xmlElement) {
		this.elementCount_ = parseInt(xmlElement.getAttribute('elements'), 10);
		this.updateShape_();
	},

	decompose: function(workspace) {
		var containerBlock = workspace.newBlock('all_container');
		containerBlock.setColour(this.getColour());
		containerBlock.initSvg();
		var connection = containerBlock.getInput('STACK').connection;
		var gen = this.type.split('_')[2] + '_with_element';
		for (var i = 0; i < this.elementCount_; i++) {
			var elementBlock = workspace.newBlock(gen);
			elementBlock.initSvg();
			connection.connect(elementBlock.previousConnection);
			connection = elementBlock.nextConnection;
		}
		return containerBlock;
	},

	compose: function(containerBlock) {
		var elementBlock = containerBlock.getInputTargetBlock('STACK');
		// Count number of inputs.
		var connections = [];
		while (elementBlock) {
			elementBlock.setColour(this.getColour());
			connections.push(elementBlock.valueConnection_);
			elementBlock = elementBlock.nextConnection &&
					elementBlock.nextConnection.targetBlock();
		}
		// Disconnect any children that don't belong.
		for (var i = 0; i < this.elementCount_; i++) {
			var connection = this.getInput('ADD' + i).connection.targetConnection;
			if (connection && connections.indexOf(connection) == -1) {
				connection.disconnect();
			}
		}
		this.elementCount_ = connections.length;
		this.updateShape_();
		// Reconnect any child blocks.
		for (var i = 0; i < this.elementCount_; i++) {
			Blockly.Mutator.reconnect(connections[i], this, 'ADD' + i);
		}
	},

	saveConnections: function(containerBlock) {
		var elementBlock = containerBlock.getInputTargetBlock('STACK');
		var i = 0;
		while (elementBlock) {
			var input = this.getInput('ADD' + i);
			elementBlock.valueConnection_ = input && input.connection.targetConnection;
			i++;
			elementBlock = elementBlock.nextConnection && elementBlock.nextConnection.targetBlock();
		}
	},

	updateShape_: function() {
		// Add new inputs.
		for (var i = 0; i < this.elementCount_; i++) {
			if (!this.getInput('ADD' + i)) {
				switch (this.type) {
					case 'b3js_add_scene':
						this.appendValueInput('ADD' + i).setCheck(['Camera', 'Light', 'Mesh']);
					break

					case 'b3js_create_mesh_group':
						this.appendValueInput('ADD' + i).setCheck('Mesh');
					break
				}
			}
		}
		// Remove deleted inputs.
		while (this.getInput('ADD' + i)) {
			this.removeInput('ADD' + i);
			i++;
		}
		if (this.type === 'b3js_add_scene') {
			this.removeInput('END');
			this.appendDummyInput('END').appendField('to scene');
		}
	}
};

const BLOCK_MIXIN = {
	mutationToDom: function() {
		var container = document.createElement('mutation');
		const type = this.type.split('_');
		switch (type[0] + '_' + type[1]) {
			case 'b3js_create':
				container.setAttribute('field_value', this.getFieldValue('TYPE'));
			break;
			case 'b3js_value':
				// update if empty
				if (this.getFieldValue('VAL') === '')
					this.setFieldValue(this.getField('VAL').getOptions()[0][1], 'VAL');
				container.setAttribute('field_value', this.getFieldValue('VAL'));
			break;
			case 'b3js_set':
			case 'b3js_getfrom':
				container.setAttribute('field_value', this.getFieldValue('FIELD'));
			break;
			case 'b3js_update':
				container.setAttribute('field_value', this.getFieldValue('COMPONENT'));
			break;
			case 'b3js_upon':
				container.setAttribute('field_value', this.getFieldValue('EVENT'));
			break;
		}
		return container;
	},

	domToMutation: function(xmlElement) {
		var typeInput = xmlElement.getAttribute('field_value');
		if (typeof this.updateShape_ === 'function') {
			this.updateShape_(typeInput);
		}
	}
};

// /=====================================================================\
//	CREATE_SHAPE
// \=====================================================================/
const CREATE_CAMERA_SHAPE = {
	updateShape_: function(typeInput) {
		switch (typeInput) {
			case 'PERSPECTIVE':
				this.removeInput('CHANGE');
				this.appendDummyInput('CHANGE')
					.appendField('fov')
					.appendField(new Blockly.FieldNumber(50), 'FOVSCALE')
					.appendField('near')
					.appendField(new Blockly.FieldNumber(0.1), 'NEAR')
					.appendField('far')
					.appendField(new Blockly.FieldNumber(1000), 'FAR');
			break;

			case 'ORTHOGRAPHIC':
				this.removeInput('CHANGE');
				this.appendDummyInput('CHANGE')
					.appendField('scale')
					.appendField(new Blockly.FieldNumber(16), 'FOVSCALE')
					.appendField('near')
					.appendField(new Blockly.FieldNumber(-200), 'NEAR')
					.appendField('far')
					.appendField(new Blockly.FieldNumber(500), 'FAR');
			break;
		}
	}
};

const CREATE_LIGHT_SHAPE = {
	updateShape_: function(typeInput) {
		switch (typeInput) {
			case 'AMBIENT':
			case 'DIRECTIONAL':
				this.removeInput('CHANGE');
				this.appendDummyInput('CHANGE')
					.appendField('color')
					.appendField(new Blockly.FieldColour('#ffffff'), 'COLOUR')
					.appendField('intensity')
					.appendField(new Blockly.FieldNumber(1, 0), 'INTENSITY');
			break;

			case 'POINT':
			case 'SPOT':
				this.removeInput('CHANGE');
				this.appendDummyInput('CHANGE')
					.appendField('color')
					.appendField(new Blockly.FieldColour('#ffffff'), 'COLOUR')
					.appendField('intensity')
					.appendField(new Blockly.FieldNumber(1, 0), 'INTENSITY')
					.appendField('distance')
					.appendField(new Blockly.FieldNumber(0, 0), 'DISTANCE')
					.appendField('decay')
					.appendField(new Blockly.FieldNumber(1, 1), 'DECAY');
			break;

			case 'HEMISPHERE':
				this.removeInput('CHANGE');
				this.appendDummyInput('CHANGE')
					.appendField('color')
					.appendField(new Blockly.FieldColour('#ffffff'), 'COLOUR')
					.appendField('ground')
					.appendField(new Blockly.FieldColour('#ffffff'), 'GROUND')
					.appendField('intensity')
					.appendField(new Blockly.FieldNumber(1, 0), 'INTENSITY');
			break;
		}
	}
};

const CREATE_GEOMETRY_SHAPE = {
	updateShape_: function(typeInput) {
		switch (typeInput) {
			case 'PLANE':
				this.removeInput('CHANGE');
				this.appendDummyInput('CHANGE')
					.appendField('width')
					.appendField(new Blockly.FieldNumber(1, 0), 'WIDTH')
					.appendField('height')
					.appendField(new Blockly.FieldNumber(1, 0), 'HEIGHT')
					.appendField('detail')
					.appendField(new Blockly.FieldNumber(1, 1, 10), 'DETAIL');
			break;

			case 'BOX':
				this.removeInput('CHANGE');
				this.appendDummyInput('CHANGE')
					.appendField('width')
					.appendField(new Blockly.FieldNumber(1, 0), 'WIDTH')
					.appendField('height')
					.appendField(new Blockly.FieldNumber(1, 0), 'HEIGHT')
					.appendField('depth')
					.appendField(new Blockly.FieldNumber(1, 0), 'DEPTH')
					.appendField('detail')
					.appendField(new Blockly.FieldNumber(1, 1, 10), 'DETAIL');
			break;

			case 'SPHERE':
				this.removeInput('CHANGE');
				this.appendDummyInput('CHANGE')
					.appendField('radius')
					.appendField(new Blockly.FieldNumber(1, 0), 'RADIUS')
					.appendField('detail')
					.appendField(new Blockly.FieldNumber(10, 3, 32), 'DETAIL');
			break;

			case 'CYLINDER':
				this.removeInput('CHANGE');
				this.appendDummyInput('CHANGE')
					.appendField('top')
					.appendField(new Blockly.FieldNumber(1, 0), 'RADIUSTOP')
					.appendField('bottom')
					.appendField(new Blockly.FieldNumber(1, 0), 'RADIUSBOTTOM')
					.appendField('height')
					.appendField(new Blockly.FieldNumber(1, 0), 'HEIGHT')
					.appendField('detail')
					.appendField(new Blockly.FieldNumber(10, 3, 64), 'DETAIL');
			break;

			case 'TORUS':
				this.removeInput('CHANGE');
				this.appendDummyInput('CHANGE')
					.appendField('radius')
					.appendField(new Blockly.FieldNumber(1, 0), 'RADIUS')
					.appendField('tube')
					.appendField(new Blockly.FieldNumber(1, 0), 'TUBE')
					.appendField('detail')
					.appendField(new Blockly.FieldNumber(10, 3, 30), 'DETAIL')
					.appendField('arc')
					.appendField(new Blockly.FieldAngle(0), 'ARC');
			break;
		}
	}
};

const CREATE_MATERIAL_SHAPE = {
	updateShape_: function(typeInput) {
		switch (typeInput) {
			case 'BASIC':
			case 'LAMBERT':
			case 'PHONG':
				this.removeInput('CHANGE');
				this.appendDummyInput('CHANGE')
					.appendField('color')
					.appendField(new Blockly.FieldColour('#ffffff'), 'COLOUR');
			break;

			case 'DEPTH':
			case 'NORMAL':
				this.removeInput('CHANGE');
				this.appendDummyInput('CHANGE')
					.appendField('wireframe')
					.appendField(new Blockly.FieldCheckbox('FALSE'), 'WIREFRAME');
			break;
		}
	}
};

// /=====================================================================\
//	SET_SHAPE
// \=====================================================================/
const SET_SCENE_SHAPE = {
	updateShape_: function(typeInput) {
		switch (typeInput) {
			case 'BACKGROUND':
				this.removeInput('VALUE');
				this.appendValueInput('VALUE')
					.setCheck(['Colour', 'String', 'Texture'])
					.appendField('to');
			break;

			case 'FOG':
				this.removeInput('VALUE');
				this.appendValueInput('VALUE')
					.setCheck('Fog')
					.appendField('to');
			break;

			case 'AUPDATE':
				this.removeInput('VALUE');
				this.appendValueInput('VALUE')
					.setCheck('Boolean')
					.appendField('to');
			break;

			case 'OMATERIAL':
				this.removeInput('VALUE');
				this.appendValueInput('VALUE')
					.setCheck('Material')
					.appendField('to');
			break;
		}
	}
};

const SET_CAMERA_SHAPE = {
	updateShape_: function(typeInput) {
		switch (typeInput) {
			case 'POSITION':
			case 'LOOKAT':
			case 'TRANSLATE':
			case 'SCALE':
				this.removeInput('VALUE');
				this.appendValueInput('VALUE')
					.setCheck('Vec3')
					.appendField('to');
			break;

			case 'RX':
			case 'RY':
			case 'RZ':
				this.removeInput('VALUE');
				this.appendValueInput('VALUE')
					.setCheck('Number')
					.appendField('to');
			break;
		}
	}
};

const SET_LIGHT_SHAPE = {
	updateShape_: function(typeInput) {
		switch (typeInput) {
			case 'COLOR':
			case 'GROUND':
				this.removeInput('VALUE');
				this.appendValueInput('VALUE')
					.setCheck(['Colour', 'String'])
					.appendField('to');
			break;

			case 'INTENSITY': // [0-]
			case 'DECAY': // [1-]
			case 'DISTANCE': // [0-]
			case 'PENUMBRA': // [0-1]
			case 'ANGLE': // [0-360]
				this.removeInput('VALUE');
				this.appendValueInput('VALUE')
					.setCheck('Number')
					.appendField('to');
			break;

			case 'POSITION':
				this.removeInput('VALUE');
				this.appendValueInput('VALUE')
					.setCheck('Vec3')
					.appendField('to');
			break;

			case 'TARGET':
				this.removeInput('VALUE');
				this.appendValueInput('VALUE')
					.setCheck('Mesh')
					.appendField('to');
			break;

			case 'VISIBLE':
			case 'CASTSHADOW':
				this.removeInput('VALUE');
				this.appendValueInput('VALUE')
					.setCheck('Boolean')
					.appendField('to');
			break;
		}
	}
};

const SET_GEOMETRY_SHAPE = {
	updateShape_: function(typeInput) {
		switch (typeInput) {
			case 'TRANSLATE':
			case 'SCALE':
				this.removeInput('VALUE');
				this.appendValueInput('VALUE')
					.setCheck('Vec3')
					.appendField('to');
			break;

			case 'RX':
			case 'RY':
			case 'RZ':
				this.removeInput('VALUE');
				this.appendValueInput('VALUE')
					.setCheck('Number')
					.appendField('to');
			break;
		}
	}
};

const SET_MATERIAL_SHAPE = {
	updateShape_: function(typeInput) {
		switch (typeInput) {
			case 'COLOR':
			case 'EMISSIVE':
			case 'SPECULAR':
				this.removeInput('VALUE');
				this.appendValueInput('VALUE')
					.setCheck(['Colour', 'String'])
					.appendField('to');
			break;

			case 'MAP':
			case 'BUMPMAP':
			case 'NORMALMAP':
				this.removeInput('VALUE');
				this.appendValueInput('VALUE')
					.setCheck('Texture')
					.appendField('to');
			break;

			case 'VISIBLE':
			case 'DEPTHTEST':
			case 'WIREFRAME':
			case 'TRANSPARENT':
				this.removeInput('VALUE');
				this.appendValueInput('VALUE')
					.setCheck('Boolean')
					.appendField('to');
			break;

			case 'OPACITY': // [0,1]
			case 'SHININESS': // [0,100]
				this.removeInput('VALUE');
				this.appendValueInput('VALUE')
					.setCheck('Number')
					.appendField('to');
			break;
		}
	}
};

const SET_MESH_SHAPE = {
	updateShape_: function(typeInput) {
		this.setFieldValue('set', 'ACTION');
		switch (typeInput) {
			case 'GEOMETRY':
				this.removeInput('VALUE');
				this.appendValueInput('VALUE')
					.setCheck('Geometry')
					.appendField('to');
			break;

			case 'MATERIAL':
				this.removeInput('VALUE');
				this.appendValueInput('VALUE')
					.setCheck('Material')
					.appendField('to');
			break;

			case 'MESH':
				this.setFieldValue('add to', 'ACTION');
				this.removeInput('VALUE');
				this.appendValueInput('VALUE')
					.setCheck('Mesh')
					.appendField(' ');
			break;

			case 'POSITION':
			case 'LOOKAT':
				this.removeInput('VALUE');
				this.appendValueInput('VALUE')
					.setCheck('Vec3')
					.appendField('to');
			break;

			case 'CASTSHADOW':
			case 'RECEIVESHADOW':
				this.removeInput('VALUE');
				this.appendValueInput('VALUE')
					.setCheck('Boolean')
					.appendField('to');
			break;
		}
	}
};

// /=====================================================================\
//	UPDATE_SHAPE
// \=====================================================================/
const UPDATE_MESH_SHAPE = {
	updateShape_: function(typeInput) {
		if (this.getInput('DIRECTION'))
			this.removeInput('DIRECTION');
		switch (typeInput) {
			case 'X':
			case 'Y':
			case 'Z':
				this.removeInput('VALUE');
				this.appendValueInput('VALUE')
					.setCheck('Number')
					.appendField('by');
			break;

			case 'XYZ':
				this.removeInput('VALUE');
				this.appendValueInput('VALUE')
					.setCheck('Vec3')
					.appendField('by');
			break;

			case 'AXIS':
				this.removeInput('VALUE');
				this.appendValueInput('VALUE')
					.setCheck('Number')
					.appendField('by');
				this.appendValueInput('DIRECTION')
					.setCheck('Vec3')
					.appendField('axis');
				this.moveInputBefore('DIRECTION', 'VALUE');
			break;
		}
	}
};

// /=====================================================================\
//	GETFROM_SHAPE
// \=====================================================================/
const GETFROM_LIGHT_SHAPE = {
	updateShape_: function(typeInput) {
		switch (typeInput) {
			case 'COLOR':
			case 'GROUND':
				this.setOutput(true, ['Colour', 'String']);
			break;

			case 'INTENSITY': // [0-]
			case 'DECAY': // [1-]
			case 'DISTANCE': // [0-]
			case 'PENUMBRA': // [0-1]
			case 'ANGLE': // [0-360]
				this.setOutput(true, 'Number');
			break;

			case 'POSITION':
				this.setOutput(true, 'Vec3');
			break;

			case 'TARGET':
				this.setOutput(true, 'Mesh');
			break;

			case 'VISIBLE':
			case 'CASTSHADOW':
				this.setOutput(true, 'Boolean');
			break;
		}
	}
};

const GETFROM_MATERIAL_SHAPE = {
	updateShape_: function(typeInput) {
		switch (typeInput) {
			case 'COLOR':
			case 'EMISSIVE':
			case 'SPECULAR':
				this.setOutput(true, ['Colour', 'String']);
			break;

			case 'MAP':
			case 'BUMPMAP':
			case 'NORMALMAP':
				this.setOutput(true, 'Texture');
			break;

			case 'VISIBLE':
			case 'DEPTHTEST':
			case 'WIREFRAME':
			case 'TRANSPARENT':
				this.setOutput(true, 'Boolean');
			break;

			case 'OPACITY': // [0,1]
			case 'SHININESS': // [0,100]
				this.setOutput(true, 'Number');
			break;
		}
	}
};

const GETFROM_MESH_SHAPE = {
	updateShape_: function(typeInput) {
		if (this.getInput('NUM'))
			this.removeInput('NUM');
		switch (typeInput) {
			case 'GEOMETRY':
				this.setOutput(true, 'Geometry');
			break;

			case 'MATERIAL':
				this.setOutput(true, 'Material');
			break;

			case 'MESH':
				this.setOutput(true, 'Mesh');
				this.appendValueInput('NUM')
					.setCheck('Number')
					.appendField('#');
			break;

			case 'POSITION':
			case 'LOOKAT':
				this.setOutput(true, 'Vec3');
			break;

			case 'CASTSHADOW':
			case 'RECEIVESHADOW':
				this.setOutput(true, 'Boolean');
			break;
		}
	}
};

// /=====================================================================\
//	UPON_SHAPE
// \=====================================================================/
const UPON_EVENT_SHAPE = {
	updateShape_: function(typeInput) {
		switch (typeInput) {
			case 'CLICK':
				this.removeInput('VARIABLE');
				this.appendDummyInput('VARIABLE')
					.appendField('on')
					.appendField(new Blockly.FieldVariable('targetMesh'), 'ARGUMENT');
			break;

			case 'KEYDOWN':
				this.removeInput('VARIABLE');
				this.appendDummyInput('VARIABLE')
					.appendField('on')
					.appendField(new Blockly.FieldVariable('keyCode'), 'ARGUMENT');
			break;
		}
	}
};
