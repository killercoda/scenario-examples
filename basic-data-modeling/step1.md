Similar to what we saw in the previous labs, we'll start by creating a single node ScyllaDB cluster, a keyspace, and a table. Then, we'll execute some queries and see what effect our primary key selection has. As a reminder, the Primary Key is defined within a table. It is one or more columns used to identify a row. All tables must include a definition for a Primary Key.



## Create a ScyllaDB Cluster and Simple Primary Key

To recap the [lesson](https://university.scylladb.com/courses/data-modeling/lessons/basic-data-modeling-2/), a cluster is a collection of nodes that ScyllaDB uses to store the data. The nodes are logically distributed like a ring. A minimum production cluster typically consists of at least three nodes. Data is automatically replicated across the cluster, depending on the Replication Factor. This cluster is often referred to as a ring architecture, based on a hash ring — the way the cluster knows how to distribute data across the different nodes.
For this demo, a one-node cluster is sufficient. 
Start a single node cluster and call it ScyllaU:

`docker run --name scyllaU -d scylladb/scylla:4.3.0 --overprovisioned 1 --smp 1`{{execute}}

` docker run --name scyllaY -d scylladb/scylla:4.3.0 --overprovisioned 1 --smp 1 --seeds="$(docker inspect --format='{{ .NetworkSettings.IPAddress }}' scyllaU)"`{{execute}} 
 
`docker run --name scyllaZ -d scylladb/scylla:4.3.0 --overprovisioned 1 --smp 1 --seeds="$(docker inspect --format='{{ .NetworkSettings.IPAddress }}' scyllaU)"`{{execute}} 


As we previously saw, some files will be downloaded in this step. After the download, wait for a minute or two and verify that the cluster is up and running with the Nodetool Status command:

`docker exec -it scyllaU nodetool status`{{execute}}

The node scyllaU has a UN status. “U” means up, and N means normal. Read more about Nodetool Status [here](https://docs.scylladb.com/operating-scylla/nodetool-commands/status/). If you run the command and the node is not up and running yet, wait a few more seconds and rerun it.

Next, use the CQL Shell to connect to the cluster you just created:'

`docker exec -it scyllaU cqlsh`{{execute}}

Notice that if you run cqlsh before the cluster is ready, you'll get a connection error. In that case, wait for a few more seconds until the cluster is up and try again.

If you missed the previous labs, you can learn more about getting started with ScyllaDB in the [documentation](https://docs.scylladb.com/getting-started/). 


A Keyspace is a top-level container that stores tables with attributes that define how data is replicated on nodes. It defines several options that apply to all the tables it contains, the most important of which is the replication strategy used by the Keyspace. A keyspace is comparable to the concept of a Database Schema in the relational world.  Since the keyspace defines the replication factor of all underlying tables, if we have tables that require different replication factors, we would store them in different keyspaces.
Create a keyspace and call it key_example:

`CREATE KEYSPACE key_example WITH REPLICATION = { 'class' : 'NetworkTopologyStrategy', 'replication_factor' : 3};`{{execute}}

`use key_example;`{{execute}}

A Table is how ScyllaDB stores data and can be thought of as a set of rows and columns.
Next, create a simple table with the  pet_chip_id column as the primary key:

`CREATE TABLE heartrate_v1 (
   pet_chip_id uuid,
   time timestamp,
   heart_rate int,
   PRIMARY KEY (pet_chip_id)
);`{{execute}}

A Partition is a collection of sorted rows identified by a unique primary key. Primary keys are covered in depth later on in this session. Each partition is stored on a node and replicated across nodes.

A Row in ScyllaDB is a unit that stores data. Each row has a primary key that uniquely identifies it in a Table. Each row stores data as pairs of column names and values. In case a Clustering Key is defined, the rows in the partition will be sorted accordingly. More on that later on. 

Insert a row into the table:

`INSERT INTO heartrate_v1(pet_chip_id, time, heart_rate) VALUES (123e4567-e89b-12d3-a456-426655440b23, '2019-03-04 07:01:00', 100);`{{execute}}

And read the data:

`SELECT * from heartrate_v1 WHERE pet_chip_id = 123e4567-e89b-12d3-a456-426655440b23;`{{execute}}

What if we want to add another heart_rate value for the same pet?

`INSERT INTO heartrate_v1(pet_chip_id, time, heart_rate) VALUES (123e4567-e89b-12d3-a456-426655440b23, '2019-03-04 07:01:00', 110);`{{execute}}

And now, read the data:

`SELECT * from heartrate_v1 WHERE pet_chip_id = 123e4567-e89b-12d3-a456-426655440b23;`{{execute}}

The last write was actually an update! It overwrote the first value. In the way that this table is defined, each pet can only have one heart rate recorded. When we write the next value for the same pet_chip_id, it will actually overwrite the first value. 
All inserts in ScyllaDB (and Cassandra) are really upserts (insert/update). There can be only one set of values for each unique primary key. If we insert again with the same primary key, the values will be updated. 
Next, we will see how we can overcome this problem. 

