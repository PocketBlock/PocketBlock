const fs = require('fs');
const zipdir = require('zip-dir');
const PHAR = require('phar');
const { ipcRenderer } = require('electron');
const path = require("path");

function phpToBlocklyFunctions(){

    let rawcode = fs.readFileSync(path.join(__dirname, "../template/functions/functions.php"));
    const code = rawcode.toString().match(/#==Start([\S\s]*?)#==End/g);
    let PMMPFunctions = [];

    for (let rawFunction of code) {
        rawFunction = rawFunction.replace("#==Start\n","").replace("#==End","");
        let imports = rawFunction.match(/# @imports = .*/g)[0].replace("# @imports = ", "").trim();
        let eventClass = imports.split("\\")[imports.split("\\").length-1];
        let functions = [];
        for (let functionData of rawFunction.match(/# @function = .*/g)) {
            functions.push( [
                functionData.replace("# @function = ","").split("|")[0],
                functionData.replace("# @function = ","").split("|")[1].trim(),
                functionData.replace("# @function = ","").split("|")[2].trim()
            ] );
        }
        let templateFunction = rawFunction.match(/public function ([\S\s]*)}/g)[0];
        let functionName = rawFunction.match(/public function .*\(/g)[0].replace("public function","").replace("(","").trim();
        let category = rawFunction.match(/@category = .*/g)[0].replace("@category = ", "").trim();
        PMMPFunctions.push(
            {
                "functionName": functionName,
                "eventClass": eventClass,
                "templateFunction": templateFunction,
                "functions": functions,
                "imports": imports,
                "category": category
            }
        )
    }

    document.getElementById("functions").value = JSON.stringify(PMMPFunctions);
    document.getElementById("functions").dispatchEvent(new Event("functionChanged"));

}

window.addEventListener('DOMContentLoaded', () => {

    document.getElementById("downloadCode").addEventListener('mousedown', async () => {

        if(document.getElementById("output").value === undefined || document.getElementById("output").value.trim() === "")
            return alert("Invalid Generated code.");

        // TODO: Implement PHP Validator

        fs.writeFileSync(__dirname+"/../template/plugin/src/Main.php",document.getElementById("output").value)

        await zipdir(__dirname+"/../template/plugin/", {}, function (err, buffer) {

            if(err)
                alert(err);

            PHAR.ZipConverter.toPhar(buffer)
                .then((phar) => {
                    ipcRenderer.invoke("showSaveFileDialog", phar.savePharData());
                })

        });

    })

    document.getElementById("pluginName").addEventListener('change', () => {
        const pluginNameValue = document.getElementById("pluginName").value;
        const pluginName = pluginNameValue ? pluginNameValue : "Plugin";
        ipcRenderer.invoke("pluginNameChanged", pluginName);
    });


    phpToBlocklyFunctions();

})
