module.exports =
    trigger: [
        'donations'
        'donators'
        'donator'
        'donate'
    ]
    call: (client, msg, ctx) ->
        other = """
            [You can donate here!](https://www.paypal.me/speckyy)
        """

        client.embed "#{other}"
