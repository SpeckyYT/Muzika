queueLength = 10

module.exports =
    trigger: [
        'queue'
        'que'
        'qu'
        'q'
    ]
    category: 'music'
    call: (client, msg, ctx) ->
        queue = client.getQueue msg.guild.id

        [current, ...next] = queue.songs

        # Now Playing
        string1 = "Now Playing: #{current.author} - #{current.name}".code 'css'

        if next.length
            queueSize = queueLength - 1

            # Queue
            string2 = next.slice(0, queueSize).map((song,i) -> "##{i+1} | #{song.author} - #{song.name}").join('\n').code 'md'
            # Longer than queue
            string3 = next.length > queueSize && "and other #{next.length-queueSize} songs...".code()

        client.embed()
        .setTitle "Queue"
        .setDescription [string1,string2,string3].filter((s) -> s).join '\n'
