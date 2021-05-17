module.exports =
    trigger: [
        'resume'
        'resum'
        'resu'
        'res'
    ]
    call: (client, msg, ctx) ->
        if not client.player.isPlaying msg
            return msg.reply client.notPlaying msg
        client.player.resume msg
        msg.reply client.success 'Playback resumed.'
