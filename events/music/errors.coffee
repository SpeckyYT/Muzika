module.exports =
    event: 'error'
    emitter: 'player'
    call: (client, error, msg) ->
        msg.reply
            embeds: [
                client.error switch error
                    when "SearchIsNull"
                        "No song with that query was found."
                    when "InvalidPlaylist"
                        "No Playlist was found with that link."
                    when "InvalidSpotify"
                        "Spotify Song was found with that link."
                    when "QueueIsNull"
                        "There is no music playing right now."
                    when "VoiceChannelTypeInvalid"
                        "You need to be in a Voice Channel to play music."
                    when "LiveUnsupported"
                        "Livestreams aren't supported."
                    when "VideoUnavailable"
                        "Something went wrong while playing the current song, skipping..."
                    when "NotANumber"
                        "The provided argument was Not A Number."
                    when "MessageTypeInvalid"
                        "The Message object was not provided."
                    else
                        "Unknown Error Ocurred: #{error}"
            ]
            failIfNotExists: no
