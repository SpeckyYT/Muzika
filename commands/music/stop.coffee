module.exports =
    trigger: [
        'stop'
    ]
    call: (client, msg, ctx) ->
        if not client.player.isPlaying msg
            return msg.reply client.notPlaying msg
        client.player.stop msg
        msg.reply client.success 'Stopped playing.'
