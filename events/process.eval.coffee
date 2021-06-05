{ inspect } = require 'util'

module.exports =
    event: 'data'
    emitter: 'stdin'
    call: (client, data) ->
        text = "#{data}".trim()
        return if not text
        console.log try
                inspect eval text
            catch err
                err
