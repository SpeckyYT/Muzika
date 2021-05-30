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
    embed.addFields [
            name: 'Usage'
            value: "`#{process.env.CLIENT_PREFIX}#{name}#{if cmd.usage then " #{cmd.usage}" else ''}`"
            inline: yes
        ,
            if aliases.length > 0
                name: 'Aliases'
                value: "#{aliases.map(block).join(' ')}"
                inline: yes
        ,

            name: 'Category'
            value: "`#{cmd.category || 'Other'}`"
            inline: yes
    ].filter (n) -> n
    embed

fullHelpPage = (client, cmds, embed) ->
    embed
