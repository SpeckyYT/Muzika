prettyMS = require 'pretty-ms'

module.exports =
    trigger: [
        'seek'
    ]
    category: 'music'
    call: (client, msg, ctx) ->
        if not client.player.isPlaying msg
            return msg.reply client.notPlaying msg
        input = parseInt ctx.body
        return msg.reply client.error 'Input is not a number.' if input < 0 or isNaN input
        time = input * 1000;
        await client.player.seek msg, time
        msg.reply client.success "Successfully seeked to #{prettyMS time}."
