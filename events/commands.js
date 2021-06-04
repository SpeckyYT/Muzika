const { MessageEmbed } = require('discord.js');
const { parse } = require('discord-command-parser');

module.exports = {
    event: 'message',
    call(client, msg){
        if(msg.author.bot) return;

        const defaultPrefixes = [
            `<@${client.user.id}>`,
            `<@!${client.user.id}>`,
        ]

        const prefixes = [
            ...defaultPrefixes,
            ...client.getPrefixes(msg),
        ]

        if(prefixes.length <= defaultPrefixes.length) prefixes.push(process.env.CLIENT_PREFIX);

        const ctx = parse(
            msg,
            prefixes,
            {
                allowBots: false,
                allowSpaceBeforeCommand: true,
                ignorePrefixCase: true,
            }
        )
        if(!ctx.success) return;

        const command = client.getCommand(ctx.command.toLowerCase());
        if(!isObject(command)) return; // TODO 'bro wtf, dat command no exist'

        function limits(command){
            if(isObject(command.limits)){
                for(const [key, value] of Object.entries(command.limits)){
                    switch(key){
                        case 'guilds':
                            if(!value && msg.guild)
                                return "This command can't be run in guilds.";
                            continue;
                        case 'dms':
                            if(!value && msg.channel.type == 'dm')
                                return "This command can't be run in DMs.";
                            continue;
                        case 'owner':
                            if(value && !process.env.OWNERS.includes(msg.author.id))
                                return "This command is only available for bot owners.";
                            continue;
                    }
                }
            }
        }

        const limit = limits(command);
        if(limit) return msg.reply(client.error(limit));

        promisify(
            client.getType(command,'function'),
            client, msg, ctx,
        )
        .then(res => {
            if(res instanceof MessageEmbed) return msg.reply(res);
            if(typeof res == 'string') return msg.reply(res);
        })
        .catch(err => {
            return msg.reply(
                new MessageEmbed()
                .setTitle('Error!')
                .setDescription(`${err}`.split('\n')[0])
                .setColor(process.env.ERROR_COLOR)
            )
        })
    }
}

const promisify = (f,...params) =>
    new Promise(async (res,rej) => {
        if(typeof f != 'function') res();
        try{
            res(await f(...params));
        }catch(err){
            rej(err);
        }
    })

const isObject = (obj) => typeof obj == 'object' && obj;
