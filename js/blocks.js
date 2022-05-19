// onEnable

const onEnableJson = {
    "type": "object",
    "message0": "onEnable { %1 %2 }",
    "args0": [
        {
            "type": "input_dummy"
        }, {
            "type": "input_statement",
            "name": "MEMBERS"
        },
    ],
    "colour": 230
};

Blockly.Blocks["onEnable"] = {
    init: function () {
        this.jsonInit(onEnableJson);
        this.setNextStatement(false);
        this.setOutput(false);
        this.setTooltip(function () {
            return 'This function gets called when the plugin is enabled.';
        });
    }
};

/**
 *
 * @param {Blockly.BlockSvg} block
 * @returns {string}
 */
Blockly.PHP["onEnable"] = function (block) {
    let args = "";
    for (let childBlock of block["childBlocks_"]) {
        args += Blockly.PHP.blockToCode(childBlock);
    }
    let code = "public function onEnable(): void{\n\n";
    for (const string of args.split("\n")) {
        code += "   " + string + "\n";
    }
    code += "}\n";
    return code;
}


// Logger
const registerListenersJson = {
    "message0": "Register Listeners",
    colour: "#3ce2a8",
    previousStatement: true,
    nextStatement: true
}


Blockly.Blocks["registerListeners"] = {
    init: function () {
        this.jsonInit(registerListenersJson);
        this.setTooltip(function () {
            return 'Register listeners to use events';
        });
    }
};

/**
 *
 * @param {Blockly.BlockSvg} block
 * @returns {string}
 */
Blockly.PHP["registerListeners"] = function (block) {
    return `$this->getServer()->getPluginManager()->registerEvents($this, $this);\n`;
}




const onDisableJson = {
    "type": "object",
    "message0": "onDisable { %1 %2 }",
    "args0": [
        {
            "type": "input_dummy"
        }, {
            "type": "input_statement",
            "name": "MEMBERS"
        },
    ],
    "colour": 230
};

Blockly.Blocks["onDisable"] = {
    init: function () {
        this.jsonInit(onDisableJson);
        this.setNextStatement(false);
        this.setOutput(false);
        this.setTooltip(function () {
            return 'This function gets called when the plugin is disabled.';
        });
    }
};

/**
 *
 * @param {Blockly.BlockSvg} block
 * @returns {string}
 */
Blockly.PHP["onDisable"] = function (block) {
    let args = "";

    for (let childBlock of block["childBlocks_"]) {
        args += Blockly.PHP.blockToCode(childBlock);
    }

    let code = "public function onDisable(): void{\n\n";
    for (const string of args.split("\n")) {
        code += "   " + string + "\n";
    }

    code += "}\n";
    return code;
}

// Logger
const loggerJson = {
    "message0": "log %1 as %2",
    "args0": [
        {
            "type": "field_input",
            "name": "message",
            "text": "Change me!",
            "spellcheck": true
        },
        {
            "type": "field_dropdown",
            "name": "type",
            "options": [
                ["info", "info"],
                ["error", "error"],
                ["emergency", "emergency"],
                ["debug", "debug"],
                ["critical", "critical"]
            ]
        }
    ],
    colour: "#000080",
    previousStatement: true,
    nextStatement: true
}


Blockly.Blocks["logger"] = {
    init: function () {
        this.jsonInit(loggerJson);
        this.setTooltip(function () {
            return 'Log a text';
        });
    }
};

/**
 *
 * @param {Blockly.BlockSvg} block
 * @returns {string}
 */
Blockly.PHP["logger"] = function (block) {
    return `$this->getLogger()->${block.getFieldValue("type" || "info")}("${block.getFieldValue("message").replace(/"/g, '\\"')}");\n`;
}

Blockly.PHP["quote_"] = function (a){
    a = a.replace(/\\/g, "\\\\").replace(/\n/g, "\\\n").replace(/"/g, '\\"');
    return "\"" + a + "\""
};