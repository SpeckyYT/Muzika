module.exports =
    trigger: [
        'stop'
    ]
    category: 'music'
    call: (client, msg, ctx) ->
        client.getQueue msg.guild.id
        .stop()
        client.success 'Stopped playing.'
