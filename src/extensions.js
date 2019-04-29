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
		this.setColour(Blockly.Msg['SCENE_HUE']);
		this.appendDummyInput()
				.appendField(Blockly.Msg['B3JS_ELEMENT']);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.setTooltip('');
		this.contextMenu = false;
	}
};

Blockly.Blocks['mesh_with_element'] = {
	init: function() {
		this.setColour(Blockly.Msg['MESH_HUE']);
		this.appendDummyInput()
				.appendField(Blockly.Msg['B3JS_ELEMENT']);
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
								return [[Blockly.Msg['B3JS_COLOR'],'COLOR'], [Blockly.Msg['B3JS_INTENSITY'],'INTENSITY']];
							break;
							case 'POINT':
								return [[Blockly.Msg['B3JS_COLOR'],'COLOR'], [Blockly.Msg['B3JS_INTENSITY'],'INTENSITY'], [Blockly.Msg['B3JS_DISTANCE'],'DISTANCE'], [Blockly.Msg['B3JS_DECAY'],'DECAY'], [Blockly.Msg['B3JS_POSITION'],'POSITION'], [Blockly.Msg['B3JS_VISIBLE'],'VISIBLE'], [Blockly.Msg['B3JS_CASTSHADOW'],'CASTSHADOW']];
							break;
							case 'SPOT':
								return [[Blockly.Msg['B3JS_COLOR'],'COLOR'], [Blockly.Msg['B3JS_INTENSITY'],'INTENSITY'], [Blockly.Msg['B3JS_DISTANCE'],'DISTANCE'], [Blockly.Msg['B3JS_DECAY'],'DECAY'], [Blockly.Msg['B3JS_POSITION'],'POSITION'], [Blockly.Msg['B3JS_TARGET'],'TARGET'], [Blockly.Msg['B3JS_PENUMBRA'],'PENUMBRA'], [Blockly.Msg['B3JS_ANGLE'],'ANGLE'], [Blockly.Msg['B3JS_VISIBLE'],'VISIBLE'], [Blockly.Msg['B3JS_CASTSHADOW'],'CASTSHADOW']];
							break;
							case 'DIRECTIONAL':
								return [[Blockly.Msg['B3JS_COLOR'],'COLOR'], [Blockly.Msg['B3JS_INTENSITY'],'INTENSITY'], [Blockly.Msg['B3JS_DISTANCE'],'DISTANCE'], [Blockly.Msg['B3JS_POSITION'],'POSITION'], [Blockly.Msg['B3JS_TARGET'],'TARGET'], [Blockly.Msg['B3JS_ANGLE'],'ANGLE'], [Blockly.Msg['B3JS_VISIBLE'],'VISIBLE'], [Blockly.Msg['B3JS_CASTSHADOW'],'CASTSHADOW']];
							break;
							case 'HEMISPHERE':
								return [[Blockly.Msg['B3JS_COLOR'],'COLOR'], [Blockly.Msg['B3JS_INTENSITY'],'INTENSITY'], [Blockly.Msg['B3JS_GROUND_COLOR'],'GROUND'], [Blockly.Msg['B3JS_POSITION'],'POSITION']];
							break;
						}
					}
				}
				return [[Blockly.Msg['B3JS_COLOR'],'COLOR'], [Blockly.Msg['B3JS_INTENSITY'],'INTENSITY'], [Blockly.Msg['B3JS_GROUND_COLOR'],'GROUND'], [Blockly.Msg['B3JS_DISTANCE'],'DISTANCE'], [Blockly.Msg['B3JS_DECAY'],'DECAY'], [Blockly.Msg['B3JS_POSITION'],'POSITION'], [Blockly.Msg['B3JS_TARGET'],'TARGET'], [Blockly.Msg['B3JS_PENUMBRA'],'PENUMBRA'], [Blockly.Msg['B3JS_ANGLE'],'ANGLE'], [Blockly.Msg['B3JS_VISIBLE'],'VISIBLE'], [Blockly.Msg['B3JS_CASTSHADOW'],'CASTSHADOW']];
			break;

			case 'geometry':
			break;

			case 'material':
				if (input && input.getField('VAL')) {
					const name = input.getField('VAL').getText();
					if (valDex[type[1]].has(name)) {
						switch (valDex[type[1]].get(name)[1]) {
							case 'BASIC':
								return [[Blockly.Msg['B3JS_COLOR'],'COLOR'], [Blockly.Msg['B3JS_OPACITY'],'OPACITY'], [Blockly.Msg['B3JS_TRANSPARENT'],'TRANSPARENT'], [Blockly.Msg['B3JS_VISIBLE'],'VISIBLE'], [Blockly.Msg['B3JS_MAP'],'MAP'], [Blockly.Msg['B3JS_DEPTHTEST'],'DEPTHTEST'], [Blockly.Msg['B3JS_WIREFRAME'],'WIREFRAME']];
							break;
							case 'DEPTH':
							case 'NORMAL':
								return [[Blockly.Msg['B3JS_OPACITY'],'OPACITY'], [Blockly.Msg['B3JS_TRANSPARENT'],'TRANSPARENT'], [Blockly.Msg['B3JS_VISIBLE'],'VISIBLE'], [Blockly.Msg['B3JS_DEPTHTEST'],'DEPTHTEST'], [Blockly.Msg['B3JS_WIREFRAME'],'WIREFRAME']];
							break;
							case 'LAMBERT':
								return [[Blockly.Msg['B3JS_COLOR'],'COLOR'], [Blockly.Msg['B3JS_OPACITY'],'OPACITY'], [Blockly.Msg['B3JS_TRANSPARENT'],'TRANSPARENT'], [Blockly.Msg['B3JS_VISIBLE'],'VISIBLE'], [Blockly.Msg['B3JS_MAP'],'MAP'], [Blockly.Msg['B3JS_DEPTHTEST'],'DEPTHTEST'], [Blockly.Msg['B3JS_WIREFRAME'],'WIREFRAME'], [Blockly.Msg['B3JS_EMISSIVE'],'EMISSIVE']];
							break;
							case 'PHONG':
								return [[Blockly.Msg['B3JS_COLOR'],'COLOR'], [Blockly.Msg['B3JS_OPACITY'],'OPACITY'], [Blockly.Msg['B3JS_TRANSPARENT'],'TRANSPARENT'], [Blockly.Msg['B3JS_VISIBLE'],'VISIBLE'], [Blockly.Msg['B3JS_MAP'],'MAP'], [Blockly.Msg['B3JS_BUMPMAP'],'BUMPMAP'], [Blockly.Msg['B3JS_NORMALMAP'], 'NORMALMAP'], [Blockly.Msg['B3JS_DEPTHTEST'],'DEPTHTEST'], [Blockly.Msg['B3JS_WIREFRAME'],'WIREFRAME'], [Blockly.Msg['B3JS_EMISSIVE'],'EMISSIVE'], [Blockly.Msg['B3JS_SPECULAR'],'SPECULAR'], [Blockly.Msg['B3JS_SHININESS'],'SHININESS']];
							break;
						}
					}
				}
				return [[Blockly.Msg['B3JS_COLOR'],'COLOR'], [Blockly.Msg['B3JS_OPACITY'],'OPACITY'], [Blockly.Msg['B3JS_TRANSPARENT'],'TRANSPARENT'], [Blockly.Msg['B3JS_VISIBLE'],'VISIBLE'], [Blockly.Msg['B3JS_MAP'],'MAP'], [Blockly.Msg['B3JS_BUMPMAP'],'BUMPMAP'], [Blockly.Msg['B3JS_NORMALMAP'], 'NORMALMAP'], [Blockly.Msg['B3JS_DEPTHTEST'],'DEPTHTEST'], [Blockly.Msg['B3JS_WIREFRAME'],'WIREFRAME'], [Blockly.Msg['B3JS_EMISSIVE'],'EMISSIVE'], [Blockly.Msg['B3JS_SPECULAR'],'SPECULAR'], [Blockly.Msg['B3JS_SHININESS'],'SHININESS']];
			break;

			case 'mesh':
				if (input && input.getField('VAL')) {
					const name = input.getField('VAL').getText();
					if (valDex[type[1]].has(name)) {
						switch (valDex[type[1]].get(name)[1]) {
							case 'MESH':
								return [[Blockly.Msg['B3JS_GEOMETRY'],'GEOMETRY'], [Blockly.Msg['B3JS_MATERIAL'],'MATERIAL'], [Blockly.Msg['B3JS_POSITION'],'POSITION'], [Blockly.Msg['B3JS_LOOKAT'],'LOOKAT'], [Blockly.Msg['B3JS_CASTSHADOW'],'CASTSHADOW'], [Blockly.Msg['B3JS_RECEIVESHADOW'],'RECEIVESHADOW']];
							break;

							case 'GROUP':
								if (type[0] === 'set')
									return [[Blockly.Msg['B3JS_GEOMETRY'],'GEOMETRY'], [Blockly.Msg['B3JS_MATERIAL'],'MATERIAL'], [Blockly.Msg['B3JS_CHILD'],'CHILD'], [Blockly.Msg['B3JS_POSITION'],'POSITION'], [Blockly.Msg['B3JS_LOOKAT'],'LOOKAT'], [Blockly.Msg['B3JS_CASTSHADOW'],'CASTSHADOW'], [Blockly.Msg['B3JS_RECEIVESHADOW'],'RECEIVESHADOW']]
								else
									return [[Blockly.Msg['B3JS_MESH'],'MESH'], [Blockly.Msg['B3JS_CHILD'],'CHILD'], [Blockly.Msg['B3JS_POSITION'],'POSITION'], [Blockly.Msg['B3JS_LOOKAT'],'LOOKAT'], [Blockly.Msg['B3JS_CASTSHADOW'],'CASTSHADOW'],
									[Blockly.Msg['B3JS_RECEIVESHADOW'],'RECEIVESHADOW']];
							break;

							case 'IMPORT':
								if (type[0] === 'set')
									return [[Blockly.Msg['B3JS_POSITION'],'POSITION'], [Blockly.Msg['B3JS_LOOKAT'],'LOOKAT'], [Blockly.Msg['B3JS_CASTSHADOW'],'CASTSHADOW'], [Blockly.Msg['B3JS_RECEIVESHADOW'],'RECEIVESHADOW']];
								else
									return [[Blockly.Msg['B3JS_MESH'],'MESH'], [Blockly.Msg['B3JS_POSITION'],'POSITION'], [Blockly.Msg['B3JS_LOOKAT'],'LOOKAT'], [Blockly.Msg['B3JS_CASTSHADOW'],'CASTSHADOW'],
									[Blockly.Msg['B3JS_RECEIVESHADOW'],'RECEIVESHADOW']];
							break;
						}
					}
				}
				return [[Blockly.Msg['B3JS_GEOMETRY'],'GEOMETRY'], [Blockly.Msg['B3JS_MATERIAL'],'MATERIAL'], [Blockly.Msg['B3JS_MESH'],'MESH'],[Blockly.Msg['B3JS_CHILD'],'CHILD'], [Blockly.Msg['B3JS_POSITION'],'POSITION'], [Blockly.Msg['B3JS_LOOKAT'],'LOOKAT'], [Blockly.Msg['B3JS_CASTSHADOW'],'CASTSHADOW'], [Blockly.Msg['B3JS_RECEIVESHADOW'],'RECEIVESHADOW']]
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
			this.appendDummyInput('END').appendField(Blockly.Msg['B3JS_TO_SCENE']);
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
				if (this.getFieldValue('COMP')) {
					container.setAttribute('field_comp', this.getFieldValue('COMP'));
				}
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
		var compInput = xmlElement.getAttribute('field_comp');
		if (typeof this.updateShape_ === 'function') {
			this.updateShape_(typeInput);
			if (compInput)
				this.updateShape_(compInput);
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
					.appendField(Blockly.Msg['B3JS_FOV'])
					.appendField(new Blockly.FieldNumber(50), 'FOVSCALE')
					.appendField(Blockly.Msg['B3JS_NEAR'])
					.appendField(new Blockly.FieldNumber(0.1), 'NEAR')
					.appendField(Blockly.Msg['B3JS_FAR'])
					.appendField(new Blockly.FieldNumber(1000), 'FAR');
			break;

			case 'ORTHOGRAPHIC':
				this.removeInput('CHANGE');
				this.appendDummyInput('CHANGE')
					.appendField(Blockly.Msg['B3JS_SCALE'])
					.appendField(new Blockly.FieldNumber(16), 'FOVSCALE')
					.appendField(Blockly.Msg['B3JS_NEAR'])
					.appendField(new Blockly.FieldNumber(-200), 'NEAR')
					.appendField(Blockly.Msg['B3JS_FAR'])
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
					.appendField(Blockly.Msg['B3JS_COLOR'])
					.appendField(new Blockly.FieldColour('#ffffff'), 'COLOUR')
					.appendField(Blockly.Msg['B3JS_INTENSITY'])
					.appendField(new Blockly.FieldNumber(1, 0), 'INTENSITY');
			break;

			case 'POINT':
			case 'SPOT':
				this.removeInput('CHANGE');
				this.appendDummyInput('CHANGE')
					.appendField(Blockly.Msg['B3JS_COLOR'])
					.appendField(new Blockly.FieldColour('#ffffff'), 'COLOUR')
					.appendField(Blockly.Msg['B3JS_INTENSITY'])
					.appendField(new Blockly.FieldNumber(1, 0), 'INTENSITY')
					.appendField(Blockly.Msg['B3JS_DISTANCE'])
					.appendField(new Blockly.FieldNumber(0, 0), 'DISTANCE')
					.appendField(Blockly.Msg['B3JS_DECAY'])
					.appendField(new Blockly.FieldNumber(1, 1), 'DECAY');
			break;

			case 'HEMISPHERE':
				this.removeInput('CHANGE');
				this.appendDummyInput('CHANGE')
					.appendField(Blockly.Msg['B3JS_COLOR'])
					.appendField(new Blockly.FieldColour('#ffffff'), 'COLOUR')
					.appendField(Blockly.Msg['B3JS_GROUND_COLOR'])
					.appendField(new Blockly.FieldColour('#ffffff'), 'GROUND')
					.appendField(Blockly.Msg['B3JS_INTENSITY'])
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
					.appendField(Blockly.Msg['B3JS_WIDTH'])
					.appendField(new Blockly.FieldNumber(1, 0), 'WIDTH')
					.appendField(Blockly.Msg['B3JS_HEIGHT'])
					.appendField(new Blockly.FieldNumber(1, 0), 'HEIGHT')
					.appendField(Blockly.Msg['B3JS_DETAIL'])
					.appendField(new Blockly.FieldNumber(1, 1, 10), 'DETAIL');
			break;

			case 'BOX':
				this.removeInput('CHANGE');
				this.appendDummyInput('CHANGE')
					.appendField(Blockly.Msg['B3JS_WIDTH'])
					.appendField(new Blockly.FieldNumber(1, 0), 'WIDTH')
					.appendField(Blockly.Msg['B3JS_HEIGHT'])
					.appendField(new Blockly.FieldNumber(1, 0), 'HEIGHT')
					.appendField(Blockly.Msg['B3JS_DEPTH'])
					.appendField(new Blockly.FieldNumber(1, 0), 'DEPTH')
					.appendField(Blockly.Msg['B3JS_DETAIL'])
					.appendField(new Blockly.FieldNumber(1, 1, 10), 'DETAIL');
			break;

			case 'SPHERE':
				this.removeInput('CHANGE');
				this.appendDummyInput('CHANGE')
					.appendField(Blockly.Msg['B3JS_RADIUS'])
					.appendField(new Blockly.FieldNumber(1, 0), 'RADIUS')
					.appendField(Blockly.Msg['B3JS_DETAIL'])
					.appendField(new Blockly.FieldNumber(10, 3, 32), 'DETAIL');
			break;

			case 'CYLINDER':
				this.removeInput('CHANGE');
				this.appendDummyInput('CHANGE')
					.appendField(Blockly.Msg['B3JS_TOP'])
					.appendField(new Blockly.FieldNumber(1, 0), 'RADIUSTOP')
					.appendField(Blockly.Msg['B3JS_BOTTOM'])
					.appendField(new Blockly.FieldNumber(1, 0), 'RADIUSBOTTOM')
					.appendField(Blockly.Msg['B3JS_HEIGHT'])
					.appendField(new Blockly.FieldNumber(1, 0), 'HEIGHT')
					.appendField(Blockly.Msg['B3JS_DETAIL'])
					.appendField(new Blockly.FieldNumber(10, 3, 64), 'DETAIL');
			break;

			case 'TORUS':
				this.removeInput('CHANGE');
				this.appendDummyInput('CHANGE')
					.appendField(Blockly.Msg['B3JS_RADIUS'])
					.appendField(new Blockly.FieldNumber(1, 0), 'RADIUS')
					.appendField(Blockly.Msg['B3JS_TUBE'])
					.appendField(new Blockly.FieldNumber(1, 0), 'TUBE')
					.appendField(Blockly.Msg['B3JS_DETAIL'])
					.appendField(new Blockly.FieldNumber(10, 3, 30), 'DETAIL')
					.appendField(Blockly.Msg['B3JS_ARC'])
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
					.appendField(Blockly.Msg['B3JS_COLOR'])
					.appendField(new Blockly.FieldColour('#ffffff'), 'COLOUR');
			break;

			case 'DEPTH':
			case 'NORMAL':
				this.removeInput('CHANGE');
				this.appendDummyInput('CHANGE')
					.appendField(Blockly.Msg['B3JS_WIREFRAME'])
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
					.appendField(Blockly.Msg['B3JS_TO']);
			break;

			case 'FOG':
				this.removeInput('VALUE');
				this.appendValueInput('VALUE')
					.setCheck('Fog')
					.appendField(Blockly.Msg['B3JS_TO']);
			break;

			case 'AUPDATE':
				this.removeInput('VALUE');
				this.appendValueInput('VALUE')
					.setCheck('Boolean')
					.appendField(Blockly.Msg['B3JS_TO']);
			break;

			case 'OMATERIAL':
				this.removeInput('VALUE');
				this.appendValueInput('VALUE')
					.setCheck('Material')
					.appendField(Blockly.Msg['B3JS_TO']);
			break;
		}
	}
};

const SET_CAMERA_SHAPE = {
	updateShape_: function(typeInput) {
		switch (typeInput) {
			case 'POSITION':
			case 'LOOKAT':
			case 'TRANSLATION':
			case 'SCALE':
				this.removeInput('VALUE');
				this.appendValueInput('VALUE')
					.setCheck('Vec3')
					.appendField(Blockly.Msg['B3JS_TO']);
			break;

			case 'RX':
			case 'RY':
			case 'RZ':
				this.removeInput('VALUE');
				this.appendValueInput('VALUE')
					.setCheck('Number')
					.appendField(Blockly.Msg['B3JS_TO']);
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
					.appendField(Blockly.Msg['B3JS_TO']);
			break;

			case 'INTENSITY': // [0-]
			case 'DECAY': // [1-]
			case 'DISTANCE': // [0-]
			case 'PENUMBRA': // [0-1]
			case 'ANGLE': // [0-360]
				this.removeInput('VALUE');
				this.appendValueInput('VALUE')
					.setCheck('Number')
					.appendField(Blockly.Msg['B3JS_TO']);
			break;

			case 'POSITION':
				this.removeInput('VALUE');
				this.appendValueInput('VALUE')
					.setCheck('Vec3')
					.appendField(Blockly.Msg['B3JS_TO']);
			break;

			case 'TARGET':
				this.removeInput('VALUE');
				this.appendValueInput('VALUE')
					.setCheck('Mesh')
					.appendField(Blockly.Msg['B3JS_TO']);
			break;

			case 'VISIBLE':
			case 'CASTSHADOW':
				this.removeInput('VALUE');
				this.appendValueInput('VALUE')
					.setCheck('Boolean')
					.appendField(Blockly.Msg['B3JS_TO']);
			break;
		}
	}
};

const SET_GEOMETRY_SHAPE = {
	updateShape_: function(typeInput) {
		switch (typeInput) {
			case 'TRANSLATION':
			case 'SCALE':
				this.removeInput('VALUE');
				this.appendValueInput('VALUE')
					.setCheck('Vec3')
					.appendField(Blockly.Msg['B3JS_TO']);
			break;

			case 'RX':
			case 'RY':
			case 'RZ':
				this.removeInput('VALUE');
				this.appendValueInput('VALUE')
					.setCheck('Number')
					.appendField(Blockly.Msg['B3JS_TO']);
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
					.appendField(Blockly.Msg['B3JS_TO']);
			break;

			case 'MAP':
			case 'BUMPMAP':
			case 'NORMALMAP':
				this.removeInput('VALUE');
				this.appendValueInput('VALUE')
					.setCheck('Texture')
					.appendField(Blockly.Msg['B3JS_TO']);
			break;

			case 'VISIBLE':
			case 'DEPTHTEST':
			case 'WIREFRAME':
			case 'TRANSPARENT':
				this.removeInput('VALUE');
				this.appendValueInput('VALUE')
					.setCheck('Boolean')
					.appendField(Blockly.Msg['B3JS_TO']);
			break;

			case 'OPACITY': // [0,1]
			case 'SHININESS': // [0,100]
				this.removeInput('VALUE');
				this.appendValueInput('VALUE')
					.setCheck('Number')
					.appendField(Blockly.Msg['B3JS_TO']);
			break;
		}
	}
};

const SET_MESH_SHAPE = {
	updateShape_: function(typeInput) {
		this.setFieldValue(Blockly.Msg['B3JS_SET'], 'ACTION');

		if (['POSITION', 'LOOKAT', 'XYZ', 'X', 'Y', 'Z'].indexOf(typeInput) < 0) {
			if (this.getInput('COMPONENT'))
				this.removeInput('COMPONENT');
		}
		switch (typeInput) {
			case 'GEOMETRY':
				this.removeInput('VALUE');
				this.appendValueInput('VALUE')
					.setCheck('Geometry')
					.appendField(Blockly.Msg['B3JS_TO']);
			break;

			case 'MATERIAL':
				this.removeInput('VALUE');
				this.appendValueInput('VALUE')
					.setCheck('Material')
					.appendField(Blockly.Msg['B3JS_TO']);
			break;

			case 'CHILD':
				this.setFieldValue(Blockly.Msg['B3JS_ADD'], 'ACTION');
				this.removeInput('VALUE');
				this.appendValueInput('VALUE')
					.setCheck('Mesh')
					.appendField(' ');
			break;

			case 'POSITION':
			case 'LOOKAT':
				if (!this.getInput('COMPONENT')) {
					this.appendDummyInput('COMPONENT')
						.appendField(new Blockly.FieldDropdown([['. xyz','XYZ'],['. x','X'],['. y','Y'],['. z','Z']],
							block_validator), 'COMP');
					this.removeInput('VALUE');
					this.appendValueInput('VALUE')
						.setCheck('Vec3')
						.appendField(Blockly.Msg['B3JS_TO']);
				}
			break;

			case 'XYZ':
				this.removeInput('VALUE');
				this.appendValueInput('VALUE')
					.setCheck('Vec3')
					.appendField(Blockly.Msg['B3JS_TO']);
			break;

			case 'X':
			case 'Y':
			case 'Z':
				this.removeInput('VALUE');
				this.appendValueInput('VALUE')
					.setCheck('Number')
					.appendField(Blockly.Msg['B3JS_TO']);
			break;

			case 'CASTSHADOW':
			case 'RECEIVESHADOW':
				this.removeInput('VALUE');
				this.appendValueInput('VALUE')
					.setCheck('Boolean')
					.appendField(Blockly.Msg['B3JS_TO']);
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
					.appendField(Blockly.Msg['B3JS_BY']);
			break;

			case 'XYZ':
				this.removeInput('VALUE');
				this.appendValueInput('VALUE')
					.setCheck('Vec3')
					.appendField(Blockly.Msg['B3JS_BY']);
			break;

			case 'AXIS':
				this.removeInput('VALUE');
				this.appendValueInput('VALUE')
					.setCheck('Number')
					.appendField(Blockly.Msg['B3JS_BY']);
				this.appendValueInput('DIRECTION')
					.setCheck('Vec3')
					.appendField(Blockly.Msg['B3JS_ALONG']);
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

		if (['POSITION', 'LOOKAT', 'XYZ', 'X', 'Y', 'Z'].indexOf(typeInput) < 0) {
			if (this.getInput('COMPONENT'))
				this.removeInput('COMPONENT');
		}

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

			case 'CHILD':
				this.setOutput(true, 'Mesh');
				this.appendValueInput('NUM')
					.setCheck('Number')
					.appendField('#');
			break;

			case 'POSITION':
			case 'LOOKAT':
				if (!this.getInput('COMPONENT')) {
					this.appendDummyInput('COMPONENT')
						.appendField(new Blockly.FieldDropdown([['. xyz','XYZ'],['. x','X'],['. y','Y'],['. z','Z']],
							block_validator), 'COMP');
					this.setOutput(true, 'Vec3');
				}
			break;

			case 'XYZ':
				this.setOutput(true, 'Vec3');
			break;

			case 'X':
			case 'Y':
			case 'Z':
				this.setOutput(true, 'Number');
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
					.appendField(Blockly.Msg['B3JS_ON'])
					.appendField(new Blockly.FieldVariable('targetMesh'), 'ARGUMENT');
			break;

			case 'KEYDOWN':
				this.removeInput('VARIABLE');
				this.appendDummyInput('VARIABLE')
					.appendField(Blockly.Msg['B3JS_ON'])
					.appendField(new Blockly.FieldVariable('keyCode'), 'ARGUMENT');
			break;
		}
	}
};
