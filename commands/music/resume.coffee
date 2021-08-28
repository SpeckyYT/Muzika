module.exports =
    trigger: [
        'resume'
        'resum'
        'resu'
        'res'
    ]
    category: 'music'
    call: (client, msg, ctx) ->
        client.getQueue msg.guild.id
        .setPaused false
        client.success 'Playback resumed.'
