// /=====================================================================\
//  MUTATORS
// \=====================================================================/
Blockly.Blocks['scene_with_container'] = {
	init: function() {
		this.setColour(0);
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

// /=====================================================================\
//	UTILITIES
// \=====================================================================/
const value_option = function(type) {
	if (valDex[type].size > 0) {
		return Array.from(valDex[type]).map((e) => [e[0], e[1][0]]);
	}
	else {
		return [['','']];
	}
};

const set_option = function(input, type) {
	switch (type) {
		case 'light':
			if (input) {
				const name = input.getField('VAL').getText();
				if (valDex[type].has(name)) {
					switch (valDex[type].get(name)[1]) {
						case 'AMBIENT':
							return [['color','COLOR'], ['intensity','INTENSITY']];
						break;
						case 'POINT':
							return [['color','COLOR'], ['intensity','INTENSITY'], ['decay','DECAY'], ['position','POSITION'], ['distance','DISTANCE'], ['visible','VISIBLE']];
						break;
						case 'SPOT':
							return [['color','COLOR'], ['intensity','INTENSITY'], ['decay','DECAY'], ['exponent','EXPONENT'], ['position','POSITION'], ['target','TARGET'], ['angle','ANGLE'], ['castShadow','CASTSHADOW'], ['distance','DISTANCE'], ['visible','VISIBLE']];
						break;
						case 'DIRECTIONAL':
							return [['color','COLOR'], ['intensity','INTENSITY'], ['exponent','EXPONENT'], ['position','POSITION'], ['target','TARGET'], ['angle','ANGLE'], ['castShadow','CASTSHADOW'], ['distance','DISTANCE'], ['visible','VISIBLE']];
						break;
						case 'HEMISPHERE':
							return [['color','COLOR'], ['intensity','INTENSITY'], ['groundColor','GROUND']];
						break;
					}
				}
			}
			return [['color','COLOR'], ['intensity','INTENSITY']];
		break;

		case 'geometry':
			if (input) {
				const name = input.getField('VAL').getText();
				if (valDex[type].has(name)) {
					switch (valDex[type].get(name)[1]) {
						case 'PLANE':
							return [['width','WIDTH'], ['height','HEIGHT'], ['widthSeg','WSEG'], ['heightSeg','HSEG']];
						break;
						case 'BOX':
							return [['width','WIDTH'], ['height','HEIGHT'], ['depth', 'DEPTH'], ['widthSeg','WSEG'], ['heightSeg','HSEG'], ['depthSeg','DSEG']];
						break;
						case 'SPHERE':
							return [['radius','RADIUS'], ['widthSeg','WSEG'], ['heightSeg','HSEG']];
						break;
						case 'CYLINDER':
							return [['topRadius','RADIUSTOP'], ['bottomRadius','RADIUSBOTTOM'], ['height','HEIGHT'], ['radiusSeg','RSEG'], ['heightSeg','HSEG'], ['open', 'OPEN']];
						break;
						case 'TORUS':
							return [['radius','RADIUS'], ['tube','TUBE'], ['tubeSeg','TSEG'], ['arc','ARC']];
						break;
					}
				}
			}
			return [['width','WIDTH'], ['height','HEIGHT']];
		break;

		case 'material':
			if (input) {
				const name = input.getField('VAL').getText();
				if (valDex[type].has(name)) {
					switch (valDex[type].get(name)[1]) {
						case 'BASIC':
						case 'DEPTH':
						case 'NORMAL':
							return [['color','COLOR'], ['opacity','OPACITY'], ['transparent','TRANSPARENT'], ['visible','VISIBLE'], ['blending','BLENDING'], ['depthTest','DEPTHTEST'], ['wireframe','WIREFRAME']];
						break;
						case 'LAMBERT':
							return [['color','COLOR'], ['opacity','OPACITY'], ['transparent','TRANSPARENT'], ['visible','VISIBLE'], ['blending','BLENDING'], ['depthTest','DEPTHTEST'], ['emissive','EMISSIVE']];
						break;
						case 'PHONG':
							return [['color','COLOR'], ['opacity','OPACITY'], ['transparent','TRANSPARENT'], ['visible','VISIBLE'], ['blending','BLENDING'], ['depthTest','DEPTHTEST'], ['emissive','EMISSIVE'], ['specular','SPECULAR'], ['shininess','SHININESS']];
						break;
					}
				}
			}
			return [['color','COLOR'], ['opacity','OPACITY'], ['transparent','TRANSPARENT'], ['visible','VISIBLE'], ['blending','BLENDING'], ['depthTest','DEPTHTEST']];
		break;

		case 'mesh':
		break;
	}
};

const create_validator = function(option) {
	const source = this.sourceBlock_;
	const type = source.type.split('_')[2];
	const name = source.getFieldValue('NAME');
	if (valDex[type].has(name)) {
		valDex[type].get(name)[1] = option;
	}
	if (typeof source.updateShape_ === 'function') {
		source.updateShape_(option);
	}
};

const set_validator = function(option) {
	if (typeof this.sourceBlock_.updateShape_ === 'function') {
		this.sourceBlock_.updateShape_(option);
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
		var containerBlock = workspace.newBlock('scene_with_container');
		containerBlock.initSvg();
		var connection = containerBlock.getInput('STACK').connection;
		for (var i = 0; i < this.elementCount_; i++) {
			var elementBlock = workspace.newBlock('scene_with_element');
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
				this.appendValueInput('ADD' + i).setCheck(['Camera', 'Light', 'Mesh']);
			}
		}
		// Remove deleted inputs.
		while (this.getInput('ADD' + i)) {
			this.removeInput('ADD' + i);
			i++;
		}
		this.removeInput('END');
		this.appendDummyInput('END').appendField('to scene');
	}
};

const CREATE_MIXIN = {
	mutationToDom: function() {
		var container = document.createElement('mutation');
		container.setAttribute('field_value', this.getFieldValue('TYPE'));
		return container;
	},

	domToMutation: function(xmlElement) {
		var typeInput = xmlElement.getAttribute('field_value');
		this.updateShape_(typeInput);
	}
};

const VALUE_MIXIN = {
	mutationToDom: function() {
		var container = document.createElement('mutation');
		// update if empty
		if (this.getFieldValue('VAL') === '')
			this.setFieldValue(this.getField('VAL').getOptions()[0][1], 'VAL');
		container.setAttribute('field_value', this.getFieldValue('VAL'));
		return container;
	},

	domToMutation: function(xmlElement) {
		var typeInput = xmlElement.getAttribute('field_value');
	}
}

const SET_MIXIN = {
	mutationToDom: function() {
		var container = document.createElement('mutation');
		container.setAttribute('field_value', this.getFieldValue('FIELD'));
		return container;
	},

	domToMutation: function(xmlElement) {
		var typeInput = xmlElement.getAttribute('field_value');
		this.updateShape_(typeInput);
	}
};

// /=====================================================================\
//	SHAPE
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
					.appendField(new Blockly.FieldNumber(1, 0, 1), 'INTENSITY');
			break;

			case 'POINT':
			case 'SPOT':
				this.removeInput('CHANGE');
				this.appendDummyInput('CHANGE')
					.appendField('color')
					.appendField(new Blockly.FieldColour('#ffffff'), 'COLOUR')
					.appendField('intensity')
					.appendField(new Blockly.FieldNumber(1, 0, 1), 'INTENSITY')
					.appendField('distance')
					.appendField(new Blockly.FieldNumber(0, 0), 'DISTANCE')
					.appendField('decay')
					.appendField(new Blockly.FieldNumber(1, 1), 'DECAY');
			break;

			case 'HEMISPHERE':
				this.removeInput('CHANGE');
				this.appendDummyInput('CHANGE')
					.appendField('sky')
					.appendField(new Blockly.FieldColour('#ffffff'), 'COLOUR')
					.appendField('ground')
					.appendField(new Blockly.FieldColour('#ffffff'), 'GROUND')
					.appendField('intensity')
					.appendField(new Blockly.FieldNumber(1, 0, 1), 'INTENSITY');
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
					.appendField(new Blockly.FieldNumber(50, 0), 'RADIUS')
					.appendField('detail')
					.appendField(new Blockly.FieldNumber(10, 3, 32), 'DETAIL');
			break;

			case 'CYLINDER':
				this.removeInput('CHANGE');
				this.appendDummyInput('CHANGE')
					.appendField('top')
					.appendField(new Blockly.FieldNumber(20, 0), 'RADIUSTOP')
					.appendField('bottom')
					.appendField(new Blockly.FieldNumber(20, 0), 'RADIUSBOTTOM')
					.appendField('height')
					.appendField(new Blockly.FieldNumber(100, 0), 'HEIGHT')
					.appendField('detail')
					.appendField(new Blockly.FieldNumber(10, 3, 64), 'DETAIL');
			break;

			case 'TORUS':
				this.removeInput('CHANGE');
				this.appendDummyInput('CHANGE')
					.appendField('radius')
					.appendField(new Blockly.FieldNumber(100, 0), 'RADIUS')
					.appendField('tube')
					.appendField(new Blockly.FieldNumber(40, 0), 'TUBE')
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
					.setCheck(['Fog'])
					.appendField('to');
			break;

			case 'AUPDATE':
				this.removeInput('VALUE');
				this.appendValueInput('VALUE')
					.setCheck(['Boolean'])
					.appendField('to');
			break;

			case 'OMATERIAL':
				this.removeInput('VALUE');
				this.appendValueInput('VALUE')
					.setCheck(['Material'])
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
					.setCheck(['Colour', 'String', 'Texture'])
					.appendField('to');
			break;

			case 'INTENSITY': // [0,1]
			case 'DECAY': // [1-]
			case 'DISTANCE': // [0-]
			case 'EXPONENT': // [0-]
			case 'ANGLE': // [0-360]
				this.removeInput('VALUE');
				this.appendValueInput('VALUE')
					.setCheck(['Number'])
					.appendField('to');
			break;

			case 'POSITION':
				this.removeInput('VALUE');
				this.appendValueInput('VALUE')
					.setCheck(['Vec3'])
					.appendField('to');
			break;

			case 'TARGET':
				this.removeInput('VALUE');
				this.appendValueInput('VALUE')
					.setCheck(['Mesh'])
					.appendField('to');
			break;

			case 'VISIBLE':
			case 'CASTSHADOW':
				this.removeInput('VALUE');
				this.appendValueInput('VALUE')
					.setCheck(['Boolean'])
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

			case 'VISIBLE':
			case 'DEPTHTEST':
			case 'WIREFRAME':
			case 'TRANSPARENT':
				this.removeInput('VALUE');
				this.appendValueInput('VALUE')
					.setCheck(['Boolean'])
					.appendField('to');
			break;

			case 'OPACITY': // [0,1]
			case 'SHININESS': // [0,100]
				this.removeInput('VALUE');
				this.appendValueInput('VALUE')
					.setCheck(['Number'])
					.appendField('to');
			break;
		}
	}
};
