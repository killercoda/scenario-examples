Local Secondary Indexes are conceptually similar to global indexes, but there’s one important difference – local indexes guarantee that for each base partition, the corresponding rows in the materialized view will end up on the same node. It’s achieved by using the same partition key in the underlying view as we use in the base table.

Querying involves the same steps, but they will query by the same partition key for both the index query and the base query
Not all queries are eligible for local secondary indexes. In order to be able to benefit from a local index, we must provide a partition key restriction as well. 

As a result, only a single view partition will be queried, and what’s more, the base rows we need to fetch are on the exact same node as the materialized view partition. Hence the name, *local* indexes.
Additionally, it’s perfectly legal to create several indexes on one table. Some of them may be local, some of them global, even if they refer to the same column.

In this step, you'll create a local index and learn how to use it. 

## Local Indexes - on Terminal #3

Switch to terminal #3.

Let’s consider indexing dish_type again, but this time in a local index. Our use case is being able to ask for all dishes of a given type for one specific city. Let’s start by creating a local index. By creating a local index we instruct the database to use the same partition key columns as a base:

`CREATE INDEX ON menus((city),dish_type);`{{execute}}

Now we can see the created local index and the underlying Materialized View:

`DESC SCHEMA;`{{execute}}

And now we can use the query:

`SELECT * FROM menus WHERE city = 'Warsaw' and dish_type = 'Polish soup';`{{execute}}

Another option would have been to use a global index for this, tith the global index, dish_type acting as the partition key of the index table. That would mean that even though our query would have contacted the node responsible for rows in Warsaw, the indexed data could have been found on a node that handles dish_type = ‘Polish soup’ partition key, possibly a different node, creating the possibility of inter-node communication, which adds to query latency.

Using local indexes makes this query very efficient. The indexing table’s partition key is explicitly the same as the base, which ensures that both the extracting keys from the index and fetching the corresponding base rows happens on the same node. That’s much faster than a global query, which may involve fetching rows from other nodes.

![](https://university.scylladb.com/topic/materialized-views-and-secondary-indexes-hands-on-updated/query-workload-diagram-e1563845404582/#main)

(1) The query is translated to an indexing subquery and a base table query (2)&(3). However, both the base table and the underlying materialized view have the same partition keys for corresponding rows. That means that their data resides on the same node; there’s no third replica that stores the indexing information.

Notice that using a token-aware driver would have provided further performance benefits, read more about this here.


