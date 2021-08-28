{ Permissions } = require 'discord.js'

module.exports =
    trigger: [
        'invite'
        'links'
        'link'
    ]
    call: (client, msg, ctx) ->
        client.embed()
        .addFields
                name: "#{client.user.username} Support Server"
                value: clickHere "https://discord.gg/4EecFku"
                inline: yes
            ,
                name: "#{client.user.username} Invite"
                value: clickHere "#{
                    client.generateInvite
                        permissions: Permissions.ALL
                        scopes: ['bot']
                }"
                inline: yes
            ,
                name: "Support #{client.user.username}'s Developers"
                value: clickHere "https://www.paypal.me/speckyy"

clickHere = (txt) -> "[Click here!](#{txt})"
