require('colors').enable();
const path = require('path');
const { Client } = require('discord.js');

const client = new Client({
    intents: [
        'GUILDS',
        'GUILD_MESSAGES',
        'GUILD_VOICE_STATES',
    ],
});

const loader = require(path.join(process.cwd(),'util','loader'));
client.loader = loader;
const handlers = loader(path.join(process.cwd(),'handlers'));

const maxLength = handlers.reduce((p,c) => c.length > p ? c.length : p, 0);
const signLength = 15;

for(const handler of handlers){
    try{
        require(handler)(client);
        console.log(`${'HANDLER LOADED'.padEnd(signLength).green}${handler.padStart(maxLength).cyan}`);
    }catch(err){
        console.error(`${'HANDLER ERROR'.padEnd(signLength).red}${handler.padStart(maxLength).cyan}`);
        console.error(err)
    }
}
