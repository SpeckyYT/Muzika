categoryEmojis =
    config: '⚙️'
    music: '🎵'
    other: '♻️'
    owner: '👮'

module.exports =
    trigger: [
        'help'
        'commands'
        'info'
    ]
    call: (client, msg, ctx) ->
        prefix = [
            ...client.getPrefixes msg
            process.env.CLIENT_PREFIX
        ][0]
        otherPrefixes = client.getPrefixes(msg).filter (p) -> p != prefix
        embed = client.embed()
        if ctx.arguments.length
            command = client.getCommand ctx.arguments[0].toLowerCase()
            msg.reply(
                if command
                    [ name, ...aliases ] = command.trigger
                    embed.setTitle "Command: `#{name}`"
                    embed.addFields [
                            name: 'Usage'
                            value: "`#{prefix}#{name}#{if command.usage then " #{command.usage}" else ''}`"
                            inline: yes
                        ,
                            if aliases.length > 0
                                name: 'Aliases'
                                value: "#{aliases.map(block).join(' ')}"
                                inline: yes
                        ,

                            name: 'Category'
                            value: "`#{command.category || 'Other'}`"
                            inline: yes
                    ].filter (n) -> n
                    embed
                else
                    embed.setTitle "Command not found!"
                    embed.setColor process.env.ERROR_COLOR
                    embed
            )
        else
            help = module.exports.trigger[0]

            categories = {}

            client.commands.forEach (cmd) ->
                category = (cmd.category or 'other').toLowerCase()
                if categories[category]
                    categories[category].push cmd
                else
                    categories[category] = [cmd]

            categories = Object.entries categories
            .sort (a,b) ->
                a[0].localeCompare b[0]

            for [category, cmds] in categories
                switch category
                    when 'owner'
                        if !msg.author.id.isOwner()
                            continue

                emoji = if categoryEmojis[category] then "#{categoryEmojis[category]} " else ''
                embed.addFields
                    name: "#{emoji}#{category.capitalize()} [#{cmds.length}]"
                    value: "#{cmds.map((cmd) -> block cmd.trigger[0]).join ' '}"

            embed.setDescription """
                Prefix: `#{prefix}`
                Discover a command: `#{prefix} #{help} <command>`
                #{
                    [
                        if otherPrefixes.length
                            "Other prefix(es): #{otherPrefixes.map((p) -> block p).join ' '}"
                    ]
                    .filter (n) -> n
                    .join '\n'
                }
            """.trim()
            msg.reply embed

block = (c,b) ->
    if typeof b isnt 'string' then b = ''
    "#{b or '`'}#{c}#{b or '`'}"
