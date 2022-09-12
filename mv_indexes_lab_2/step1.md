
In this step, you'll set up the environment by creating a one-node ScyllaDB cluster. You’ll then connect to the cluster with the CQL Shell, create a keyspace, a table, insert some data into the newly created table, and read the data. Next you'll consider what can be done if you want to query the table by a field that isn't part of the primary key. 

![](https://university.scylladb.com/800x400-blog-allow-filtering/)

## Setup and Creating the Base Table - on Terminal #1

Start by creating a Docker container with ScyllaDB. This tutorial was created with version 4.3:

`docker run --name scylla-si -d scylladb/scylla:4.3.0 --overprovisioned 1 --smp 1`{{execute}}

Wait a minute or so and check the node status:

`docker exec -it scylla-si nodetool status`{{execute}}

You’ll see that eventually, all the nodes have UN for status. U means up, and N means normal. If you get a message "nodetool: Unable to connect to ScyllaDB API server: java.net.ConnectException: Connection refused (Connection refused)", it means you have to wait a bit more for the node to be up and responding. 

Open 3 terminals (#1 for the base table, #2 for global index, #3 for local index

Switch to terminal #1, run the CQL Shell, and create a Keyspace:

`docker exec -ti scylla-si /bin/bash`{{execute}}

`cqlsh`{{execute}}

`CREATE KEYSPACE restaurant_chain WITH REPLICATION = { 'class' : 'SimpleStrategy', 'replication_factor' : 1 };`{{execute}}

Keep in mind that SimpleStrategy should not be used in production. Learn more about this in the Replication Factor [lesson](https://university.scylladb.com/courses/scylla-essentials-overview/lessons/architecture/topic/replication-strategy/).

Next, create a Table and insert some data:

`USE restaurant_chain;`{{execute}}

`CREATE TABLE restaurant_chain.menus (
city text,
name text,
dish_type text,
price float,
PRIMARY KEY (city, name));`{{execute}}

```
INSERT INTO menus (city, name, price, dish_type) VALUES ('Reykjavik', 'hakarl', 16, 'cold Icelandic starter');
INSERT INTO menus (city, name, price, dish_type) VALUES ('Reykjavik', 'svid', 21, 'hot Icelandic main dish');
INSERT INTO menus (city, name, price, dish_type) VALUES ('Warsaw', 'sour rye soup', 7, 'Polish soup');
INSERT INTO menus (city, name, price, dish_type) VALUES ('Warsaw', 'sorrel soup', 5, 'Polish soup');
INSERT INTO menus (city, name, price, dish_type) VALUES ('Cracow', 'beef tripe soup', 6, 'Polish soup');
INSERT INTO menus (city, name, price, dish_type) VALUES ('Warsaw', 'pork jelly', 8, 'cold Polish starter');
INSERT INTO menus (city, name, price, dish_type) VALUES ('Ho Chi Minh', 'bun mam', 8, 'Vietnamese soup');
INSERT INTO menus (city, name, price, dish_type) VALUES ('Da Lat', 'banh mi', 5, 'Vietnamese breakfast');
INSERT INTO menus (city, name, price, dish_type) VALUES ('Ho Chi Minh', 'goi cuon', 6, 'Vietnamese hot starter');
```{{execute}}

Now let’s run some queries:

`SELECT * from restaurant_chain.menus;`{{execute}}

But wait! This is a full table scan. This could have been a problem if we didn’t have very little data. We should always restrict our queries using partition keys.

`SELECT * FROM menus where city = 'Warsaw';`{{execute}}

If we had a lot of data this would perform very well.

But what if we wanted to query by other fields? Let’s try.

`SELECT * from menus where dish_type = 'Polish soup';`{{execute}}

Oops!

How about other fields?

`SELECT * from menus where city = 'Warsaw' and dish_type = 'Polish soup';`{{execute}}

We get the same error.

If we add “ALLOW FILTERING” to the above queries they would work. But just like our first query, because we are querying regular columns it would be a full table scan – VERY INEFFICIENT!
Indexes to the rescue!

Let’s take a look at our current schema.

`DESC KEYSPACE restaurant_chain;`{{execute}}








