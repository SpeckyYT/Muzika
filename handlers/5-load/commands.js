const { Collection } = require('discord.js')
const path = require('path');

module.exports = (client) => {
    client.commands = new Collection();
    client.aliases = new Collection();

    client.getCommand = (string) => {
        if(client.aliases.has(string))
            string = client.aliases.get(string);
        if(client.commands.has(string))
            return client.commands.get(string);
        return false
    }

    return client.depsLoader(
        path.join(process.cwd(),'commands'),
        'COMMANDS',
        function({ path, value:pull }){
            const [name,...aliases] = Array.isArray(pull.trigger) ? pull.trigger : [pull.trigger];
            const func = client.getType(pull,'function');
            if(!func) throw new Error('No function found');

            if(!pull.limits || typeof pull.limits != 'object') pull.limits = {}

            function fixLimits(obj){
                for(const [key,value] of Object.entries(obj))
                    if(!(key in pull.limits))
                        pull.limits[key] = value;
            }

            switch((pull.category||'').toLowerCase()){
                case 'owner':
                    fixLimits({
                        owner: true,
                    });
                    break;
                case 'music':
                    fixLimits({
                        guilds: true,
                        vc: true,
                        sameVC: true,
                        isPlaying: true,
                    });
                    break;
            }

            client.commands.set(name.toLowerCase(), pull);
            for(const alias of aliases) client.aliases.set(alias.toLowerCase(),name.toLowerCase());
        }
    )
}
