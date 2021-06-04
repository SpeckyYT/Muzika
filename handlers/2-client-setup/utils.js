const sigidb = require('sigidb');
const guildsdb = sigidb('guilds.sqlite');

module.exports = (client) => {
    client.getPrefixes = (msg) => {
        const prefixes = [];

        if(!msg || typeof msg != 'object') return prefixes;

        const gPrefixKey = client.dbKey(msg.guild.id,'prefix');

        if(msg.guild){
            const prefix = guildsdb.get(gPrefixKey);
            if(prefix) prefixes.push(prefix);
        }

        return prefixes;
    }

    client.dbKey = (...properties) => `${properties.join('.')}`;
}
