module.exports =
    trigger: [
        'skip'
        's'
    ]
    category: 'music'
    call: (client, msg, ctx) ->
        song = await client.getQueue msg.guild.id
        .skip()
        client.success "#{song.name} got skipped!"
