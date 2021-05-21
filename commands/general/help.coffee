module.exports =
    trigger: [
        'help'
        'commands'
        'info'
    ]
    call: (client, msg, ctx) ->
        if ctx.arguments.length
            command = client.getCommand ctx.arguments[0]
            msg.reply singleCommand command, client.embed()
        else
            cmds = client.commands.map (cmd) -> cmd.trigger[0]
            msg.reply client.embed().setDescription cmds.join ', '

singleCommand = (cmd, embed) ->
    [ name, ...aliases ] = cmd.trigger
    embed.setDescription """
        Name: `#{name}`
        Aliases: `#{aliases.join(', ') || 'None...'}`
    """
