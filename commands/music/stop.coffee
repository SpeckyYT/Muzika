module.exports =
    trigger: [
        'stop'
        'disconnect'
        'dc'
    ]
    category: 'music'
    limits:
        isPlaying: null
    call: (client, msg, ctx) ->
        client.getQueue msg.guild.id
        .stop()
        client.player.deleteQueue msg.guild.id
        client.success 'Stopped playing.'
