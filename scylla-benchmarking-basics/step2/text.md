
Let's start with some terminology recap before we deep dive into some **CQL** syntax!

- **Cluster**: Remember that a cluster is a collection of one or more ScyllaDB nodes, which essentially work together in a distributed fashion to process your workloads. For example, the container we've just spun up was a single node cluster. For production workloads, we recommend that your topology is composed of at least 3 nodes for high availability.
- **Keyspace**: Within a Cluster, we create **keyspaces**. Keyspaces are a top-level container which aggregates tables. Within a keyspace, you can define to which regions and how many replicas – or copies of your data – exist. For example, you can have a keyspace which replicates data from your table to nodes physically located within the US and Canada, and another keyspace which replicates your data only to nodes placed within the Europe Union, for compliance purposes.
- **Tables**: Inside a keyspace, you create **tables**. Which are essentially the actual data structure that is going to be holding your data, and where you will be doing your data modeling.
- **Partition key**: When you create a table, you need to define what is going to be its **Partition Key**. A partition key is the column that you chose during your initial data modeling that will tell your ScyllaDB cluster how it should **shard** your data across the cluster. It is extremely important to choose a partition that has enough high cardinality and which allows your cluster to scale without introducing any bottlenecks or imbalances.

Let's see how these concepts work in practice. We have already spun up our single-node cluster. The next step is for us to create a Keyspace and other elements.

From within the **cqlsh** session we've left off, let's create a keyspace named **scylla_labs**:

```cql
CREATE KEYSPACE scylla_labs WITH replication = {'class': 'NetworkTopologyStrategy', 'datacenter1': 1};
```{{exec}}

Let's break down the **CREATE KEYSPACE** statement to understand what it is doing:

- **WITH replication = {'class': 'NetworkTopologyStrategy'** – Here we specify our replication strategy. ScyllaDB supports multiple different types of replication, and we highly recommend you to stick with the NetworkTopologyStrategy for your production workloads.
- **'datacenter1': 1** – We then specify that we want our data to be replicated to a **single node within the datacenter1**. By default, ScyllaDB uses `datacenter1` when you do not make use of a Cloud snitch and do not explicitly give your node a data center name. The datacenter name is within the `nodetool status` output we have previously seen. Finally, we tell the database that it should only replicate data once to this datacenter, specifically because we are running a single-node cluster. 

> ## Note
> In a real production environment, you would normally want your data to be replicated to at least 3 nodes. Keep that in mind, as an incorrect replication factor can introduce data loss and single point of failures in your deployment!

After the keyspace creation, we may now create a table inside that keyspace:

```cql
CREATE TABLE scylla_labs.my_table (id int, time timestamp, data blob, PRIMARY KEY(id, time));
```{{exec}}

Let's break it down to understand what this statement does under the hood:

- The `scylla_labs.my_table` parameter takes the format of `<keyspace_name>`.`<table_name>`, which can be very useful to distinguish between one keyspace from another. Here, we are creating table **my_table** inside the keyspace **scylla_labs**. You may also work inside a keyspace exclusively, provided you use the command `USE <keyspace_name>;` before-hand. 
- We specify our table columns after, within the "`id int, time timestamp, data blob`" statement. Here, we have defined 3 fields: **id**, **time** and **data**. Each one with its own data type.
- Out of the column names we specified earlier, we need to choose one to be our **partition key**. That is, which column (or columns) will ScyllaDB use in order to shard our data automatically among the cluster. We have chosen the `id` column to be our partition key. But what about the `time` column? The time column is our **clustering key**. In particular, if you are familiar with DynamoDB, for example, think of the partition key as your hash key and your clustering key as the sorting key as in Dynamo.

Finally, let's insert some data!

```cql
INSERT INTO scylla_labs.my_table (id, time, data) VALUES (0, 1000, 0x);
```{{exec}}

And - of course - let's read it back:

```cql
SELECT * FROM scylla_labs.my_table ;
```{{exec}}

And these are pretty much the basics!
