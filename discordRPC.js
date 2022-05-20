const RPC = require("discord-rpc")
const logger = require("./logger.js");

module.exports = class discordRPC {

    constructor(ipcMain, clientId) {

        this.ipcMain = ipcMain;
        this.client = new RPC.Client({ transport: 'ipc' });

        this.client.on('ready', async () => {
            logger.info('RPC started for '+this.client.user.username, "DiscordRPC");

            this.client.setActivity(
                {
                    details: "Working on a plugin",
                    state: "        ",

                    largeImageKey: "enlarged-image",
                    buttons :
                        [
                            {
                                label : "Download PocketBlock", url: "https://github.com/PocketBlock/PocketBlock"
                            }
                        ]
                }
            ).catch(error => logger.error(error.message, "DiscordRPC"));

        });

        this.client.login({clientId})
            .then(() => logger.info("Connected to discord client.", "DiscordRPC"))
            .catch(error => logger.error(error.message, "DiscordRPC"));


        this.ipcMain.handle("pluginNameChanged", async (event, arg) => {

            if(this.client.user == null) return;
            await this.client.setActivity({
                details: `Working on ${arg}`,
                state: "        ",

                largeImageKey: "enlarged-image",
                buttons: [
                    {
                        label: "Download PocketBlock", url: "https://github.com/PocketBlock/PocketBlock"
                    }
                ]
            });

        });

    }

}