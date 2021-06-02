const { MessageEmbed } = require('discord.js');
const { parse } = require('discord-command-parser');

module.exports = {
    event: 'message',
    call(client, msg){
        if(msg.author.bot) return;

        const prefixes = [
            process.env.CLIENT_PREFIX,
            `${client.user}`,
        ]

        const cmd = parse(
            msg,
            prefixes,
            {
                allowBots: false,
                allowSpaceBeforeCommand: true,
                ignorePrefixCase: true,
            }
        )
        if(!cmd.success) return;

        const command = client.getCommand(cmd.command.toLowerCase());
        if(!command) return; // TODO 'bro wtf, dat command no exist'

        try{
            const func = client.getType(command,'function');
            if(func) func(client, msg, cmd);
        }catch(err){
            console.log(err);
            return msg.reply(
                new MessageEmbed()
                .setTitle('Error!')
                .setDescription(`${err}`.split('\n')[0])
                .setColor(process.env.ERROR_COLOR)
            )
        }
    }
}
