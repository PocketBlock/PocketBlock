// Logging style is inspired from Pocketmine-MP

const Reset = "\x1b[0m";
const Bright = "\x1b[1m";
const Dim = "\x1b[2m";
const Underscore = "\x1b[4m";
const Blink = "\x1b[5m";
const Reverse = "\x1b[7m";
const Hidden = "\x1b[8m";

const FgBlack = "\x1b[30m";
const FgRed = "\x1b[1;31m";
const FgGreen = "\x1b[32m";
const FgYellow = "\x1b[33m";
const FgBlue = "\x1b[34m";
const FgMagenta = "\x1b[35m";
const FgCyan = "\x1b[1;36m";
const FgWhite = "\x1b[1;37m";

const BgBlack = "\x1b[40m";
const BgRed = "\x1b[41m";
const BgGreen = "\x1b[42m";
const BgYellow = "\x1b[43m";
const BgBlue = "\x1b[44m";
const BgMagenta = "\x1b[45m";
const BgCyan = "\x1b[46m";
const BgWhite = "\x1b[47m";


function logLevelToColor(level = "info"){

    let color = Reset;

    switch (level){

        case "info":
            color = FgWhite;
            break;

        case "error":
            color = FgRed;
            break;

    }

    return color;

}

function getMessage(level = "info", string = "", name){

    const date = new Date();
    const time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}.${date.getMilliseconds()}`;
    return `${FgCyan}[${time}] ${logLevelToColor(level)}[${name}/${level.toUpperCase()}]: `;

}

module.exports = {

    info: function (string = "", name = "PocketBlock App"){
        console.info(getMessage("info", string, name), string, Reset);
    },
    error: function (string = "", name = "PocketBlock App"){
        console.error(getMessage("error", string, name), string, Reset);
    }

}