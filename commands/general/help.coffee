module.exports =
    trigger: [
        'help'
        'commands'
        'info'
    ]
    call: (client, msg, ctx) ->
        if ctx.arguments.length
            command = client.getCommand ctx.arguments[0].toLowerCase()
            msg.reply(
                if command
                    singleCommand client, command, client.embed()
                else
                    unexistingCommand client, client.embed()
            )
        else
            msg.reply fullHelpPage client, client.commands, client.embed()

block = (c) -> "`#{c}`"

unexistingCommand = (client, embed) ->
    embed.setTitle "Command not found!"
    embed.setColor process.env.ERROR_COLOR
    embed

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

fullHelpPage = (client, commands, embed) ->
    prefix = process.env.CLIENT_PREFIX
    help = module.exports.trigger[0]

    categories = {}

    commands.forEach (cmd) ->
        category = cmd.category or 'other'
        if categories[category]
            categories[category].push cmd
        else
            categories[category] = [cmd]

    for [category, cmds] in Object.entries categories
        embed.addFields
            name: "#{category.capitalize()} [#{cmds.length}]"
            value: "#{cmds.map((cmd) -> block cmd.trigger[0]).join ' '}"

    embed.setDescription """
        Prefix: `#{prefix}`
        Discover command: `#{prefix}#{help} <command>`
    """
    embed
