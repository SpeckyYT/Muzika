module.exports =
    trigger: [
        'resume'
        'resum'
        'resu'
        'res'
    ]
    category: 'music'
    call: (client, msg, ctx) ->
        client.player.resume msg
        client.success 'Playback resumed.'
