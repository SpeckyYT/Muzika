const { Util: { escapeInlineCode } } = require('discord.js');

module.exports = {
    trigger: [
        'prefix',
        'prefixes',
    ],
    category: 'config',
    async call(client, msg, ctx){
        const customPrefixes = client.getPrefixes(msg);
        const bot = customPrefixes.length ? 'no' : `yes (\`${process.env.CLIENT_PREFIX}\`)`;
        const plural = customPrefixes.length == 1 ? '' : 'es';
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
                name: `Custom prefix${plural}`,
                value: `[${count}] ${customs}`,
                inline: true,
            }
        )
    }
}
