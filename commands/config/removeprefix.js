const { Util } = require('discord.js');
const sigidb = require('sigidb');
const db = sigidb('guilds.sqlite');

module.exports = {
    trigger: [
        'removeprefix',
        'rp',
    ],
    category: 'config',
    usage: '<prefix>',
    limits: {
        guilds: true,
        userPerms: [
            'MANAGE_GUILD',
        ],
    },
    async call(client, msg, ctx){
        if(!ctx.body)
            return msg.reply(client.error('No prefix provided'));

        const prefixkey = client.dbKey(msg.guild.id,'prefix');

        let prev = db.get(prefixkey);
        if(typeof prev == 'string') prev = [prev];
        if(!Array.isArray(prev)) prev = [];

        if(!prev.includes(ctx.body.toLowerCase()))
            return msg.reply(
                client.error(`Prefix ${ctx.body} doesn't exist.`)
            );

        db.set(prefixkey, prev.filter(p => p.toLowerCase() != ctx.body.toLowerCase()));

        return msg.reply(
            client.success(
                `Prefix \`${Util.escapeInlineCode(ctx.body)}\` got successfully removed from this server!`
            )
        );
    }
}
