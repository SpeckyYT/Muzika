module.exports =
    trigger: [
        'loop'
    ]
    category: 'music'
    call: (client, msg, ctx) ->
        stateChange = switch ctx.arguments[0].toLowerCase()
            when 'yes', 'true', 'on' then true
            when 'no', 'false', 'off' then false
            else not (client.player.getQueue msg).repeatMode
        client.player.setRepeatMode msg, stateChange
        msg.reply client.success "Loop got set to `#{stateChange}`"