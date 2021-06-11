module.exports =
    trigger: [
        'pause'
    ]
    category: 'music'
    call: (client, msg, ctx) ->
        client.player.pause msg
        msg.reply client.success 'Playback paused.'
