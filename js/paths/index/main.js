
let eventClasses = {};

document.addEventListener("toolboxReady", () => {

    const workspace = Blockly.inject('blocklyDiv',
        {
            toolbox: toolbox,
            theme: Blockly.Theme.defineTheme('dark', {
                'base': Blockly.Themes.Classic,
                'componentStyles': {
                    'workspaceBackgroundColour': '#1e1e1e',
                    'toolboxBackgroundColour': 'blackBackground',
                    'toolboxForegroundColour': '#fff',
                    'flyoutBackgroundColour': '#252526',
                    'flyoutForegroundColour': '#ccc',
                    'flyoutOpacity': 1,
                    'scrollbarColour': '#797979',
                    'insertionMarkerColour': '#fff',
                    'insertionMarkerOpacity': 0.3,
                    'scrollbarOpacity': 0.4,
                    'cursorColour': '#d0d0d0',
                    'blackBackground': '#333',
                },
            }),
            zoom:
                {
                    controls: true,
                    wheel: true,
                    startScale: 1.0,
                    maxScale: 3,
                    minScale: 0.3,
                    scaleSpeed: 1.2,
                    pinch: true
                },
            renderer: "renderer"
        }
    );

    function workspaceUpdate(event) {

        const unformattedCode = Blockly.PHP.workspaceToCode(workspace);

        let imports = "";
        for (const topBlockElement of workspace.topBlocks_) {
            if(eventClasses[topBlockElement.type] === undefined) continue;
            if(imports.includes(eventClasses[topBlockElement.type])) continue;
            imports += "use "+eventClasses[topBlockElement.type]+";\n";
        }

        let implementListener = "";
        if(imports !== "") {
            imports = "use pocketmine\\event\\Listener;\n"+imports;
            implementListener = "implements Listener";
        }

        let code = `< ?php\n\n`.replace(" ", "");
        code += "namespace PocketBlock\\Plugin;\n\nuse pocketmine\\plugin\\PluginBase;\n"+imports+"\n\nclass Main extends PluginBase "+implementListener+" {\n\n";
        code += "	" + unformattedCode.replaceAll("\n", "\n	");
        code += "\n}";
        document.getElementById('output').value = code;

    }

    workspace.addChangeListener(workspaceUpdate);
    document.getElementById("plugin.yml").value = `# TODO: Implement this`
// `name: PocketBlock
// version: 1.0.0
// main: PocketBlock\\Plugin\\Main
// api: 4.0.0
// src-namespace-prefix: PocketBlock\\Plugin`;
})


function openTab(tab, nav){

    switch (tab) {

        case "code":
            document.getElementById("output").style.display = "inherit";
            document.getElementById("plugin.yml").style.display = "none";
            document.getElementById("codebtn").classList.add("active");
            document.getElementById("plgnbtn").classList.remove("active");
            break;

        case "plugin.yml":
            document.getElementById("output").style.display = "none";
            document.getElementById("plugin.yml").style.display = "inherit";
            document.getElementById("codebtn").classList.remove("active");
            document.getElementById("plgnbtn").classList.add("active");
            break;

    }

}