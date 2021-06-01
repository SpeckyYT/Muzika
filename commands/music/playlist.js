module.exports = {
    trigger: [
        'playlist',
        'pl',
    ],
    category: 'music',
    async call(client, msg, ctx){
        if(!ctx.body) return client.cmdError('You have to include a playlist that you want to queue.');

        const playlist = await client.player.playlist(msg, {
            search: ctx.body,
            requestedBy: msg.author.tag,
            maxSongs: 250,
        });

        const song = playlist.videos[0];

        return msg.reply(
            song ?
                client.embed()
                .setTitle(song.name)
                .setDescription(`Author: ${song.author}\nDuration: ${song.duration}\nRequested by: ${song.requestedBy}`)
                .addField('Added PlayList',`Songs: ${playlist.videos.length}`)
                .setURL(playlist.url)
                :
                client.embed()
                .setTitle('Added PlayList!')
                .setDescription(`Songs: ${playlist.videos.length}`)
                .setURL(playlist.url)
        )
    }
}
