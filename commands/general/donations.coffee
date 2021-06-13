database = require 'specky-database'

module.exports =
    trigger: [
        'donations'
        'donators'
        'donator'
        'donate'
    ]
    call: (client, msg, ctx) ->
        donations = (await database 'donations.json')
            .sort (a,b) -> b.donation[0] - a.donation[0]
            .map ({name,donation}) -> "#{name}: #{donation[0].toFixed(2)}#{donation[1] or '€'}"
            .join '\n'
            .code()

        other = """
            [You can donate here!](https://www.paypal.me/speckyy)
        """

        client.embed "#{donations}\n#{other}"
