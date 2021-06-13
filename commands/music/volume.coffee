module.exports =
    trigger: [
        'volume'
        'vol'
    ]
    category: 'music'
    usage: '<percentage>'
    call: (client, msg, ctx) ->
        volume = parseInt ctx.body
        if isNaN volume
            return client.embed "Current volume is #{client.player.getVolume msg}%"
        newVolume = volume.clamp 10, 250
        client.player.setVolume msg, newVolume
        client.success "Volume got set to #{newVolume}%"
