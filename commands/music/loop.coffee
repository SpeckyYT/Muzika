module.exports =
    trigger: [
        'loop'
    ]
    category: 'music'
    usage: '<queue/song/off>'
    call: (client, msg, ctx) ->
        queue = client.getQueue msg.guild.id
        stateChange = switch ctx.body.toLowerCase()
            when 'queue', 'songs', 'all', '2' then 2
            when 'song', 'yes', 'true', 'on', '1' then 1
            when 'no', 'false', 'off', '0' then 0
            else
                if queue.repeatMode isnt 0 then 0 else 1
        queue.setRepeatMode stateChange
        client.success "Loop got set to `#{getString stateChange}`"

getString = (number) ->
    switch number
        when 2 then 'queue'
        when 1 then 'song'
        when 0 then 'off'
