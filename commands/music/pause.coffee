module.exports =
    trigger: [
        'pause'
    ]
    category: 'music'
    call: (client, msg, ctx) ->
        client.player.pause msg
        client.success 'Playback paused.'
