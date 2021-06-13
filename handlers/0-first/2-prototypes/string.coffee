module.exports = (client) ->
    String::code = (code) ->
        script = if typeof code == 'string' then code else ''
        code = String(this).replace(/```/g, '`\u200b``') || '\u200b'
        return "```#{script}\n#{code}\n```"

    String::capitalize = () ->
        return "" if not @.length
        [ first, ...rest ] = @
        "#{first.toUpperCase()}#{rest.join ''}"

    String::isOwner = () ->
        process.env.OWNERS.includes String @
