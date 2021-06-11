module.exports =
    trigger: [
        'stop'
    ]
    category: 'music'
    call: (client, msg, ctx) ->
        client.player.stop msg
        msg.reply client.success 'Stopped playing.'
