// /=====================================================================\
//  MUTATORS
// \=====================================================================/
Blockly.Blocks['dummy_with_container'] = {
	init: function() {
		this.setColour(50);
		this.appendStatementInput("STACK");
		this.setTooltip("");
		this.contextMenu = false;
	}
};

Blockly.Blocks['dummy_with_item'] = {
	init: function() {
		this.setColour(50);
		this.appendDummyInput()
				.appendField("item");
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.setTooltip("");
		this.contextMenu = false;
	}
};

// /=====================================================================\
//	EXTENSIONS
// \=====================================================================/
const value_option = function (type) {
	if (valDex[type].size > 0) {
		console.log(Array.from(valDex[type]));
		return Array.from(valDex[type]);
	}
	else {
		return [["","0"]];
	}
};

const value_element_option = function () {
	if (valDex['Element'].size > 0) {
		return Array.from(valDex['Element']);
	}
	else {
		return [["","0"]];
	}
};

const create_camera_validator = function (option) {
	var typeInput = (option == 'PERSPECTIVE');
	this.sourceBlock_.updateShape_(typeInput);
};

// /=====================================================================\
//	MIXINS
// \=====================================================================/
const DUMMY_MIXIN = {
	mutationToDom: function () {
		const container = document.createElement("mutation");
		container.setAttribute("items", this.itemCount_);
		return container;
	},

	domToMutation: function (xmlElement) {
		this.itemCount_ = parseInt(xmlElement.getAttribute("items"), 10);
		this.updateShape_();
	},

	decompose: function (workspace) {
		const containerBlock = workspace.newBlock('dummy_with_container');
		containerBlock.initSvg();
		var connection = containerBlock.getInput("STACK").connection;
		for (let i = 0, n = this.itemCount_; i < n; i++) {
			const itemBlock = workspace.newBlock('dummy_with_item');
			itemBlock.initSvg();
			connection.connect(itemBlock.previousConnection);
			connection = itemBlock.nextConnection;
		}
		return containerBlock;
	},

	compose: function (containerBlock) {
		var itemBlock = containerBlock.getInputTargetBlock("STACK");
		// Count number of inputs.
		const connections = [];
		while (itemBlock) {
			connections.push(itemBlock.valueConnection_);
			itemBlock = itemBlock.nextConnection &&
					itemBlock.nextConnection.targetBlock();
		}
		// Disconnect any children that don't belong.
		for (let i = 0, n = this.itemCount_; i < n; i++) {
			const connection = this.getInput("ADD" + i).connection.targetConnection;
			if (connection && connections.indexOf(connection) == -1) {
				connection.disconnect();
			}
		}
		this.itemCount_ = connections.length;
		this.updateShape_();
		// Reconnect any child blocks.
		for (let i = 0, n = this.itemCount_; i < n; i++) {
			Blockly.Mutator.reconnect(connections[i], this, "ADD" + i);
		}
	},

	updateShape_: function () {
		if (this.itemCount_ && this.getInput("EMPTY")) {
			this.removeInput("EMPTY");
		}
		// Add new inputs.
		let i = 0;
		for (let n = this.itemCount_; i < n; i++) {
			if (!this.getInput("ADD" + i)) {
				var input = this.appendValueInput("ADD" + i).setCheck("Number");
				if (i == 0) {
					input.appendField("with items");
				}
			}
		}
		// Remove deleted inputs.
		while (this.getInput("ADD" + i)) {
			this.removeInput("ADD" + i);
			i++;
		}
	}
};

const CAMERA_MIXIN = {
	mutationToDom: function() {
		var container = document.createElement('mutation');
		var typeInput = (this.getFieldValue('TYPE') === 'PERSPECTIVE');
		container.setAttribute('type_input', typeInput);
		return container;
	},

	domToMutation: function(xmlElement) {
		var typeInput = (xmlElement.getAttribute('type_input') === 'true');
		this.updateShape_(typeInput);
	},

	updateShape_: function(typeInput) {
		if (typeInput) {
			this.removeInput("CHANGE");
			this.appendDummyInput("CHANGE")
				.appendField("fov")
				.appendField(new Blockly.FieldNumber(0), "FOV");
		}
		else {
			this.removeInput("CHANGE");
			this.appendDummyInput("CHANGE")
				.appendField("scale")
				.appendField(new Blockly.FieldNumber(0), "SCALE");
		}
		this.moveInputBefore("CHANGE", "PARAM");
	}
};
