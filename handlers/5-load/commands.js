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

    const commands = client.loader(path.join(process.cwd(),'commands'));

    client.depsLoader(commands, 'COMMANDS', ({ path, value:pull }) => {
        const [name,...aliases] = Array.isArray(pull.trigger) ? pull.trigger : [pull.trigger];
        const func = client.getType(pull,'function');
        if(!func) throw new Error('No function found');
        client.commands.set(name, pull);
        for(const alias of aliases) client.aliases.set(alias,name);
    })
}
