module.exports =
    trigger: [
        'shuffle'
    ]
    category: 'music'
    call: (client, msg, ctx) ->
        client.player.shuffle msg
        client.success 'Successfully shuffled the queue!'
