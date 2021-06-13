module.exports =
    trigger: [
        'stop'
    ]
    category: 'music'
    call: (client, msg, ctx) ->
        client.player.stop msg
        client.success 'Stopped playing.'
