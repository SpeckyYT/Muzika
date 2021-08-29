module.exports =
    trigger: [
        'remove'
        'delete'
    ]
    category: 'music'
    usage: '<index>'
    call: (client, msg, ctx) ->
        songIndex = parseInt ctx.arguments[0]
        if not (songIndex > 0) or isNaN songIndex
            return client.error "Input is not a valid number."
        queue = client.getQueue msg.guild.id
        if songIndex >= queue.songs.length
            return client.error "Input is larger than the queue's size"
        song = queue.remove songIndex
        return client.success "#{song.name} got removed!"
