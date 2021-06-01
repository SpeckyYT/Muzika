module.exports =
    trigger: [
        'shuffle'
    ]
    category: 'music'
    call: (client, msg, ctx) ->
        if not client.player.isPlaying msg
            return msg.reply client.notPlaying msg
        client.player.shuffle msg
        msg.reply client.success 'Successfully shuffled the queue!'
