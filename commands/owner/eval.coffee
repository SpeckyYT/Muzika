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
    call: (client, msg, ctx) ->
        if not ctx.body
            return msg.reply client.error 'No text to evaluate'

        try
            evaluated = eval ctx.body
            message = await msg.reply inspectM evaluated
        catch err
            return msg.reply client.error inspectM err

        if evaluated instanceof Promise
            message.edit inspectM await evaluated.catch (e) -> "#{e}"
        
        if Array.isArray evaluated
            msg.edit inspectM await Promise.all(evaluated).catch (e) -> "#{e}"
