module.exports =
    trigger: [
        'shuffle'
    ]
    category: 'music'
    call: (client, msg, ctx) ->
        client.getQueue msg.guild.id
        .shuffle()
        client.success 'Successfully shuffled the queue!'
