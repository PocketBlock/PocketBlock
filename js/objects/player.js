// Player Get Data
Blockly.Blocks["playerGet"] = {
    init: function () {
        this.jsonInit(
            {
                "message0": "from player, get %1",
                "args0": [
                    {
                        "type": "field_dropdown",
                        "name": "type",
                        "options": [
                            ["Absorption", "getAbsorption"],
                            ["Air Supply Ticks", "getAirSupplyTicks"],
                            ["Fire Ticks", "getFireTicks"],
                            ["Allow Flight", "getAllowFlight"],
                            ["Armor Points", "getArmorPoints"],
                            ["Display Name", "getDisplayName"],
                            ["Name", "getName"],
                            ["Name Tag", "getNameTag"],
                            ["Health", "getHealth"],
                            ["XUID", "getXuid"]
                        ]
                    }
                ],
                colour: "#000080",
                output: true
            }
        );
        this.setTooltip(function () {
            return 'Get the value of a data key.';
        });
    }
};

/**
 * @param {Blockly.BlockSvg} block
 * @returns {(string|number|*)[]}
 */
Blockly.PHP["playerGet"] = function (block) {
    return [`$player->${block.getFieldValue("type")}()`, Blockly.PHP.ORDER_ASSIGNMENT];
}

// ===================================================================
// Player Is Data

Blockly.Blocks["playerIs"] = {
    init: function () {
        this.jsonInit(
            {
                "message0": "is player %1",
                "args0": [
                    {
                        "type": "field_dropdown",
                        "name": "type",
                        "options": [
                            ["Adventure", "isAdventure"],
                            ["Alive", "isAlive"],
                            ["Authenticated", "isAuthenticated"],
                            ["Breathing", "isBreathing"],
                            ["Creative", "isCreative"],
                            ["Fire Proof", "isFireProof"],
                            ["FlaggedForDespawn", "isFlaggedForDespawn"],
                            ["Flying", "isFlying"],
                            ["Gliding", "isGliding"],
                            ["Immobile", "isImmobile"],
                            ["Inside a solid", "isInsideOfSolid"],
                            ["Invisible", "isInvisible"],
                            ["NameTag always visible", "isNameTagAlwaysVisible"],
                            ["NameTag visible", "isNameTagVisible"],
                            ["On Fire", "isOnFire"],
                            ["On Ground", "isOnGround"],
                            ["Online", "isOnline"],
                            ["Silent", "isSilent"],
                            ["Sleeping", "isSleeping"],
                            ["Sneaking", "isSneaking"],
                            ["Spectator", "isSpectator"],
                            ["Sprinting", "isSprinting"],
                            ["Survival", "isSurvival"],
                            ["Swimming", "isSwimming"],
                            ["Using Item", "isUsingItem"],
                        ]
                    }
                ],
                colour: "#000080",
                output: "Boolean"
            }
        );
        this.setTooltip(function () {
            return 'Returns a bool(true/false) for the key.';
        });
    }
};

/**
 *
 * @param {Blockly.BlockSvg} block
 * @returns {(string|number|*)[]}
 */
Blockly.PHP["playerIs"] = function (block) {
    return [`$player->${block.getFieldValue("type")}()`, Blockly.PHP.ORDER_ASSIGNMENT];
}
// ===================================================================================
// Player Do

Blockly.Blocks["playerDo"] = {
    init: function () {
        this.jsonInit(
            {
                "message0": "for player, do %1",
                "args0": [
                    {
                        "type": "field_dropdown",
                        "name": "type",
                        "options": [
                            ["Heal", "heal"],
                            ["Jump", "jump"],
                            ["Kill", "kill"],
                            ["release Item Held", "releaseHeldItem"]
                        ]
                    }
                ],
                colour: "#000080",
                previousStatement: true,
                nextStatement: true
            }
        );
        this.setTooltip(function () {
            return 'Do something to the player';
        });
    }
};

/**
 *
 * @param {Blockly.BlockSvg} block
 * @returns {(string|number|*)[]}
 */
Blockly.PHP["playerDo"] = function (block) {
    return [`$player->${block.getFieldValue("type")}()`, Blockly.PHP.ORDER_ASSIGNMENT];
}
// ===================================================================================
// Player Toggle

Blockly.Blocks["playerToggle"] = {
    init: function () {
        this.jsonInit(
            {
                "message0": "for player, toggle %1 as %2",
                "args0": [
                    {
                        "type": "field_dropdown",
                        "name": "type",
                        "options": [
                            ["Flight", "toggleFlight"],
                            ["Glide", "toggleGlide"],
                            ["Sneak", "toggleSneak"],
                            ["Sprint", "toggleSprint"],
                            ["Swim", "toggleSwim"]
                        ]
                    },
                    {
                        "type": "field_dropdown",
                        "name": "boolList",
                        "options": [
                            ["true", "true"],
                            ["false", "false"]
                        ]
                    }
                ],
                colour: "#000080",
                previousStatement: true,
                nextStatement: true
            }
        );
        this.setTooltip(function () {
            return 'Toggle a variable';
        });
    }
};

/**
 *
 * @param {Blockly.BlockSvg} block
 * @returns {(string|number|*)[]}
 */
Blockly.PHP["playerToggle"] = function (block) {
    return [`$player->${block.getFieldValue("type")}(${block.getFieldValue("boolList")})`, Blockly.PHP.ORDER_ASSIGNMENT];
}

// Player do text
// =================================
// Player Do

Blockly.Blocks["playerDoText"] = {
    init: function () {
        this.jsonInit(
            {
                "message0": "do %1 with argument %2",
                "args0": [
                    {
                        "type": "field_dropdown",
                        "name": "type",
                        "options": [
                            ["Chat", "chat"],
                            ["Kick", "kick"],
                            ["send ActionBar Message", "sendActionBarMessage"],
                            ["send Popup", "sendPopup"],
                            ["send SubTitle", " sendSubTitle"],
                            ["set DisplayName", "set DisplayName"],
                            ["set NameTag", "setNameTag"]
                        ]
                    },
                    {
                        "type": "input_value",
                        "name": "VALUE",
                        "check": ["field_variable", "String"]
                    }
                ],
                colour: "#000080",
                previousStatement: true,
                nextStatement: true,
            }
        );
        this.setTooltip(function () {
            return 'Do something';
        });
    }
};

/**
 *
 * @param {Blockly.BlockSvg} block
 * @returns {(string|number|*)[]}
 */
Blockly.PHP["playerDoText"] = function (block) {
    if (block.childBlocks_.length === 0) return `     $player->${block.getFieldValue("type")}("")`;

    return '     $player->'+block.getFieldValue("type")+'(' + Blockly.PHP.valueToCode(block, 'VALUE', Blockly.PHP.ORDER_NONE) + ')';
}
// =======================================
// Player Transfer Server

Blockly.Blocks["playerTransfer"] = {
    init: function () {
        this.jsonInit(
            {
                "message0": "transfer player to ip %1, port %2, and message as %3",
                "args0": [
                    {
                        "type": "field_input",
                        "name": "ip",
                        "text": "192.168.1.1",
                        "spellcheck": true
                    },
                    {
                        "type": "field_number",
                        "name": "port",
                        "value": 19132,
                        "min": 1025,
                        "max": 65535,
                        "precision": 1
                    },
                    {
                        "type": "field_input",
                        "name": "message",
                        "text": "Transferring server",
                        "spellcheck": true
                    }
                ],
                colour: "#000080",
                previousStatement: true,
                nextStatement: true
            }
        );
        this.setTooltip(function () {
            return 'Transfer the player to another server';
        });
    }
};

/**
 *
 * @param {Blockly.BlockSvg} block
 * @returns {(string|number|*)[]}
 */
Blockly.PHP["playerTransfer"] = function (block) {
    return `     $player->transfer("${block.getFieldValue("ip")}", ${block.getFieldValue("port")}, "${block.getFieldValue("message")}")`;
}
// ==============================