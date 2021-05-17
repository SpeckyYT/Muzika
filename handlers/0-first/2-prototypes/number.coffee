module.exports = (client) ->
    Number::clamp = (min,max) ->
        Math.min(Math.max(@, min), max)
