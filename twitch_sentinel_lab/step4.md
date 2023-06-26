Now it's time to you do you own implementation.


## Challenge

Implement a new table that will count each message sent in a streamer chat. Below you will find the CQL statement to create a table and a snippet on how to implement it by yourself.

```sql
CREATE TABLE streamers_chat_messages_count (
    streamer_id text,
    messages_count counter,
    PRIMARY KEY(streamer_id)
);
```

```js
const queries = [
    {
        query: 'INSERT INTO messages (streamer_id) values (?)',
        params: ['1235333']
    },
    {
        query: 'UPDATE streamers_chat_messages_count set messages_count = messages_count + 1 WHERE streamer_id = ?',
        params: ['1235333']
    }
];

client.batch(queries, { prepare: true})
  .then(() => console.log('Data updated on cluster'));
```

* Execute the CQL into the CQLSH terminal and guarantee that the new table has been created;
* Do the implementations inside the `insertOnDatabase` method.

After finish it, you're ready to scale up the application and bring new bots into Twitch Streaming environment together with ScyllaDB! 🤖