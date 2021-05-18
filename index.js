require('colors').enable();

const path = require('path');
const { Client } = require('discord.js');
const filehound = require('filehound');

const client = new Client({
    intents: [
        'GUILDS',
        'GUILD_MESSAGES',
        'GUILD_VOICE_STATES',
    ],
});

function loader(path, async){
    const handler = filehound.create()
    .path(path)
    .ext([...Object.keys(require.extensions), '.coffee']);

    if(async){
        return new Promise((res,rej) => handler.find((err, files) => err ? rej(err) : res(files)));
    }else{
        return handler.findSync();
    }
}

client.loader = loader;
const handlers = loader(path.join(process.cwd(),'handlers'));

const maxLength = handlers.reduce((p,c) => Math.max(c.length, p), 0);
const signLength = 15;

(async function(){
    for(const handler of handlers){
        try{
            await require(handler)(client);
            console.log(`${'HANDLER LOADED'.padEnd(signLength).green}${handler.padStart(maxLength).cyan}`);
        }catch(err){
            console.error(`${'HANDLER ERROR'.padEnd(signLength).red}${handler.padStart(maxLength).cyan}`);
            console.error(err);
        }
    }
})();
