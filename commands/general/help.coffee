module.exports =
    trigger: [
        'help'
        'commands'
        'info'
    ]
    call: (client, msg, ctx) ->
        if ctx.arguments.length
            command = client.getCommand ctx.arguments[0]
            msg.reply singleCommand client, command, client.embed()
        else
            msg.reply fullHelpPage client, client.commands, client.embed()

block = (c) -> "`#{c}`"

singleCommand = (client, cmd, embed) ->
    [ name, ...aliases ] = cmd.trigger
    embed.setTitle "Command: `#{name}`"
    embed.addFields
            name: 'Aliases'
            value: "#{aliases.map(block).join(' ') || 'None...'}"
            inline: yes
        ,
            name: 'Category'
            value: "`#{cmd.category || 'Other'}`"
            inline: yes
    embed

fullHelpPage = (client, cmds, embed) ->
    embed
