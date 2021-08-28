module.exports =
    trigger: [
        'loop'
    ]
    category: 'music'
    usage: '<yes/no>'
    call: (client, msg, ctx) ->
        queue = client.getQueue msg.guild.id
        stateChange = switch ctx.arguments[0].toLowerCase()
            when 'yes', 'true', 'on', '1' then 1
            when 'no', 'false', 'off', '0' then 0
            else
                if queue.repeatMode is 0 then 1 else 0
        queue.setRepeatMode stateChange
        client.success "Loop got set to `#{stateChange}`"
