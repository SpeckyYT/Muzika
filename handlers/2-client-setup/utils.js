const sigidb = require('sigidb');
const guildsdb = sigidb('guilds.sqlite');

module.exports = (client) => {
    client.getPrefixes = (msg) => {
        const prefixes = [];

        if(!msg || typeof msg != 'object') return prefixes;

        if(msg.guild){
            const gPrefixKey = client.dbKey(msg.guild.id,'prefix');
            const prefix = guildsdb.get(gPrefixKey);
            if(prefix){
                if(Array.isArray(prefix)) prefixes.push(...prefix);
                if(typeof prefix == 'string') prefixes.push(prefix);
            }
        }

        const clientPrefixIndex = prefixes.indexOf(process.env.CLIENT_PREFIX);
        if(clientPrefixIndex >= 0)
            prefixes.unshift(...prefixes.splice(clientPrefixIndex,1))

        prefixes.push(...prefixes.splice(0,Infinity).unique());

        return prefixes;
    }

    client.dbKey = (...properties) => `${properties.join('.')}`;
}
