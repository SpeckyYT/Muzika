module.exports =
    trigger: [
        'volume'
        'vol'
    ]
    category: 'music'
    call: (client, msg, ctx) =>
        if not client.player.isPlaying msg
            return msg.reply client.notPlaying msg
        volume = parseInt ctx.body
        if isNaN volume
            return msg.reply client.embed().setDescription "Current volume is #{client.player.getVolume msg}%"
        newVolume = volume.clamp 10, 250
        client.player.setVolume msg, newVolume
        msg.reply client.success "Volume got set to #{newVolume}%"
