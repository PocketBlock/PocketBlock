let events = {};

function makeId(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

function addBlock(functionData = {"templateFunction": "","eventClass":"","functions": [""], "imports": "", "category" : ""}) {

    eventClasses[functionData["eventClass"]] = functionData["imports"];

    if(events[functionData["category"]] == undefined)
        events[functionData["category"]] = [
            {
                "name": functionData["eventClass"],
                "blocks": [
                    functionData["eventClass"]
                ]
            }
        ];
    else
        events[functionData["category"]].push({
            "name": functionData["eventClass"],
            "blocks": [
                functionData["eventClass"]
            ]
        });

    let json = {
        "type": "object",
        "message0": functionData["eventClass"]+" { %1 %2 }",
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

    Blockly.Blocks[functionData["eventClass"]] = {
        init: function () {
            this.jsonInit(json);
            this.setNextStatement(false);
            this.setOutput(false);
            this.setTooltip(function () {
                return ' TODO: This';
            });
        }
    };

    Blockly.PHP[functionData["eventClass"]] = function (block) {
        let args = "";

        for (let childBlock of block["childBlocks_"]) {
            args += Blockly.PHP.blockToCode(childBlock);
        }

        let inputtedCode = "";
        for (const string of args.split("\n")) {
            inputtedCode += "   " + string + "\n";
        }


        return functionData["templateFunction"].replace("%1", inputtedCode);
    }


    for(let variableFunction of functionData["functions"]){

        const code = variableFunction[0];
        const id = variableFunction[1];
        const text = variableFunction[2];

        events[functionData["category"]][events[functionData["category"]].length-1]["blocks"].push(id); // Ik, it's messy.

        const checks = code.split('(')[1].split(')')[0] == "" ? undefined : JSON.parse(code.split('(')[1].split(')')[0]);
        const message0 = code.split('(')[1].split(')')[0] == "" ? text : text+" to %1";
        const args0 = code.split('(')[1].split(')')[0] == "" ? undefined :[{"type": "input_value", "name": "VALUE", "check": checks}];
        Blockly.Blocks[id] = {
            init: function () {
                this.jsonInit({
                    "type": "object",
                    "message0": message0,
                    "args0": args0,
                    "colour": 200,
                    "previousStatement": true,
                    "nextStatement": true,
                    "tooltip": "test"
                });
            }

        };

        Blockly.PHP[id] = function (block) {
            if (block.childBlocks_.length === 0) return '     '+code.split('(')[0]+'();\n';

            return '     '+code.split('(')[0]+'(' + Blockly.PHP.valueToCode(block, 'VALUE', Blockly.PHP.ORDER_NONE) + ');\n';
        }

    }


}

let alreadyExecuted = false;
let toolbox = document.getElementById("toolbox").outerHTML;

document.getElementById("functions").addEventListener("functionChanged", () => {

    if(alreadyExecuted === true)
        return;
    alreadyExecuted = true;

    const allFunctions = JSON.parse(document.getElementById("functions").value);

    for(let functionData of allFunctions){

        addBlock(functionData)

    }


    let eventsXML = "";

    for (const event in events) {

        eventsXML += `<category name="${event}" colour="#6b6b6b">`;

        for(let eventData of events[event]){

            eventsXML += `<category name="${eventData["name"]}" colour="#6b6b6b">`
            eventData["blocks"].map( (blockType) => eventsXML += `<block type="${blockType}"></block>`);
            eventsXML += `</category>`

        }

        eventsXML += "</category>"

    }

    toolbox = toolbox.replace("{events}", eventsXML)
    document.dispatchEvent(new Event("toolboxReady"));

});
