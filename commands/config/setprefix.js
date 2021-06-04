const { Util } = require('discord.js');
const sigidb = require('sigidb');
const db = sigidb('guilds.sqlite');

module.exports = {
    trigger: [
        'setprefix',
        'sp',
    ],
    category: 'config',
    limits: {
        dms: false,
    },
    async call(client, msg, ctx){
        if(!ctx.body)
            return msg.reply(client.error('No prefix provided'));

        const prefixkey = client.dbKey(msg.guild.id,'prefix');

        if(ctx.body.toLowerCase() == process.env.CLIENT_PREFIX.toLowerCase()){
            db.delete(prefixkey);
            return msg.reply(client.success(`Prefix got reset to \`${process.env.CLIENT_PREFIX}\` in this server!`));
        }

        db.set(prefixkey, ctx.body);

        return msg.reply(
            client.success(
                `Prefix got successfully changed to \`${Util.escapeInlineCode(ctx.body)}\` in this server!`
            )
        );
    }
}
