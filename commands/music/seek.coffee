prettyMS = require 'pretty-ms'

module.exports =
    trigger: [
        'seek'
    ]
    category: 'music'
    usage: '<seconds>'
    call: (client, msg, ctx) ->
        queue = client.getQueue msg.guild.id
        input = parseInt ctx.body
        return client.error 'Input is not a number.' if input < 0 or isNaN input
        time = input * 1000
        await queue.seek time
        client.success "Successfully seeked to #{prettyMS time}."
