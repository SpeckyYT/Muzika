module.exports = {
    event: [
        'ready',
        '*/15 * * * * *',
    ],
    call(client){
        const { call } = module.exports;

        const currentSongs = [
            ...Array.from(client.player.queues.values())
            .map(q => q?.songs?.[0]?.name)
            .filter(s => s),
        ];

        const statuses = {
            // Playing <text>
            // Playing to game
            // <text>
            PLAYING: [
                'music',
                'songs',
                ...currentSongs,
            ],
            // Listening to <text>
            LISTENING: [
                'your commands',
                'your songs',
                ...currentSongs,
            ],
            // Watching <text>
            WATCHING: [
                'happy people',
            ],
            // Competing in <text>
            COMPETING: [
                'music',
                'sound',
                'quality',
            ],
        }

        const type = Object.keys(statuses)
        .filter(t =>
            t != call.previous &&
            Array.isArray(statuses[t]) &&
            statuses[t].filter(s => s).length
        )
        .pick() || call.previous;

        const status = statuses[type].filter(s => s).pick();

        call.previous = type;

        return client.user.setActivity(
            status,
            {
                type: type,
            }
        )
    }
}
