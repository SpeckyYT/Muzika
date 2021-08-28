module.exports = {
    trigger: [
        'playlist',
        'pl',
    ],
    category: 'music',
    usage: '<playlist link>',
    limits: {
        isPlaying: null,
    },
    async call(client, msg, ctx){
        if(!ctx.body) return client.error('You have to include a playlist that you want to queue.');

        const queue = client.getQueue(msg.guild.id);
        const playlist = await queue.playlist(msg, {
            search: ctx.body,
            requestedBy: msg.author.tag,
            maxSongs: 250,
        });

        const song = playlist.songs[0];

        return song ?
            client.embed()
            .setTitle(song.name)
            .setDescription(`Author: ${song.author}\nDuration: ${song.duration}\nRequested by: ${song.requestedBy}`)
            .addField('Added PlayList',`Songs: ${playlist.videos.length}`)
            .setURL(playlist.url) :
            client.embed()
            .setTitle('Added PlayList!')
            .setDescription(`Songs: ${playlist.videos.length}`)
            .setURL(playlist.url)
    }
}
