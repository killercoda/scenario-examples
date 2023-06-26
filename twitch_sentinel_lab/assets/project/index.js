const streamers = require('./streamers.json');
const tmi = require('tmi.js');
const cassandra = require('cassandra-driver');

const client = new tmi.Client({
    channels: ['your-twitch-channel', 'danielhe4rt'],
    //channels: streamers.map((streamer) => streamer.streamer_username),
    joinInterval: 300
});

const cluster = new cassandra.Client({
    contactPoints: ["172.17.0.2", "172.17.0.3", "172.17.0.4"],
    credentials: { username: 'scylla', password: 'secret-password' },
    localDataCenter: 'datacenter1',
    keyspace: 'twitch_sentinel'
})

async function insertOnDatabase(user, message) {
    message = escape(message);
    let query = `INSERT INTO messages (streamer_id, chatter_id, chatter_username, chatter_message, message_sent_at) VALUES (?, ?, ?, ?, ?)`
    await cluster.execute(query, [
        user['room-id'],
        user['user-id'],
        user['display-name'],
        message,
        parseInt(user['tmi-sent-ts'])
    ]);
}


client.connect();

client.on('message', (channel, user, message, self) => {
    console.log(`${channel} -> ${user['display-name']}: ${message}`);
    insertOnDatabase(user, message)
});