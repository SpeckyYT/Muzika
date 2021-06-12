module.exports = {
    trigger: [
        'play',
        'p',
    ],
    category: 'music',
    usage: '<song name/link>',
    limits: {
        isPlaying: null,
    },
    async call(client, msg, ctx){
        if(!ctx.body) return msg.reply('You have to include a song to play.');
        const search = {
            search: ctx.body,
            requestedBy: msg.author.tag,
        }
        const song = await (
            client.player.isPlaying(msg) ?
                client.player.addToQueue(msg, search) :
                client.player.play(msg, search)
        );
        return msg.reply(
            client.embed()
            .setTitle(song.name)
            .setDescription(`Author: ${song.author}\nDuration: ${song.duration}\nRequested by: ${song.requestedBy}`)
            .setURL(song.url)
            .setImage(song.thumbnail)
        )
    }
}
