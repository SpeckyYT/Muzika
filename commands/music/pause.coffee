module.exports =
    trigger: [
        'pause'
    ]
    call: (client, msg, ctx) ->
        if not client.player.isPlaying msg
            return msg.reply client.notPlaying msg
        client.player.pause msg
        msg.reply client.success 'Playback paused.'
