module.exports =
    trigger: [
        'volume'
        'vol'
    ]
    category: 'music'
    usage: '<percentage>'
    call: (client, msg, ctx) ->
        queue = client.getQueue msg.guild.id
        volume = parseInt ctx.body
        if isNaN volume
            return client.embed "Current volume is #{queue.volume}%"
        newVolume = volume.clamp 10, 250
        queue.setVolume newVolume
        client.success "Volume got set to #{newVolume}%"
