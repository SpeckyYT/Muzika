const { Util: { escapeInlineCode } } = require('discord.js');
const pluralize = require('pluralize');

module.exports = {
    trigger: [
        'prefix',
        'prefixes',
    ],
    category: 'config',
    async call(client, msg, ctx){
        const customPrefixes = client.getPrefixes(msg);
        const bot = customPrefixes.length ? 'No' : `Yes (\`${process.env.CLIENT_PREFIX}\`)`;
        const count = customPrefixes.length;
        const customs = customPrefixes.length ?
            customPrefixes.map(p => `\`${escapeInlineCode(p)}\``).join(' ') :
            'None...';

        return client.embed()
        .setTitle('Prefixes')
        .addFields(
            {
                name: 'Bot prefix available',
                value: `${bot}`,
                inline: true,
            },
            {
                name: `Custom ${pluralize('prefix',count)}`,
                value: `[${count}] ${customs}`,
                inline: true,
            }
        )
    }
}
