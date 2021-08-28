module.exports =
    trigger: [
        'pause'
    ]
    category: 'music'
    call: (client, msg, ctx) ->
        client.getQueue msg.guild.id
        .setPaused true
        client.success 'Playback paused.'
