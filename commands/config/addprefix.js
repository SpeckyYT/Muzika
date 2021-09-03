const { Util } = require('discord.js');
const sigidb = require('sigidb');
const db = sigidb('guilds.sqlite');

module.exports = {
    trigger: [
        'addprefix',
        'ap',
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
            return client.error('No prefix provided');

        const prefixkey = client.dbKey(msg.guild.id,'prefix');

        let prev = db.get(prefixkey);
        if(typeof prev == 'string') prev = [prev];
        if(!Array.isArray(prev)) prev = [];

        const prefix = ctx.body.toLowerCase();
        const inlinePrefix = `\`${Util.escapeMarkdown(prefix)}\``;

        if(prev.includes(prefix))
            return client.error(`Prefix ${inlinePrefix} already exists.`);

        if(prev.length > 10)
            return client.error(`I guess ${prev.length} prefixes are more than enough.`);

        db.set(prefixkey, [ ...prev, ctx.body.toLowerCase() ]);

        return client.success(`Prefix ${inlinePrefix} got successfully added to this server!`);
    }
}
