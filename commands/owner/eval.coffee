{ inspect } = require 'util'

inspectM = (obj,d) ->
    inspect obj,
        showHidden: false
        depth: d || 2
        maxArrayLength: 50
    .slice 0, 1900
    .code 'js'

module.exports =
    trigger: [
        'eval'
        'evaluate'
    ]
    category: 'owner'
    usage: '<code>'
    call: (client, msg, ctx) ->
        if not ctx.body
            return client.error 'No text to evaluate'

        try
            evaluated = eval ctx.body
            message = await msg.reply inspectM evaluated
        catch err
            return client.error inspectM err

        if evaluated instanceof Promise
            message.edit inspectM await evaluated.catch (e) -> "#{e}"

        if Array.isArray evaluated
            message.edit inspectM await Promise.all(evaluated).catch (e) -> "#{e}"
