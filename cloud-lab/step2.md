After seeing how to connect to Scylla Cloud and create a Cluster, you’ll use the CQL shell (Cqlsh) with Docker to connect to the cluster.

[CQL](https://university.scylladb.com/courses/data-modeling/lessons/basic-data-modeling-2/topic/cql-cqlsh-and-basic-cql-syntax/) is a query language that is used to interface with Scylla. It allows us to perform basic functions such as insert, update, select, delete, create, and so on.
The CQL Shell is an interactive Command Line Interface to interact with the database. The connection is established to any one of the nodes, which is then designated as the coordinator node for that specific connection. The coordinator node manages the request path and the response back to the client.

Keep in mind that most real-world applications use drivers to interact with the cluster. You can learn more about using Scylla Drivers in [this course](https://university.scylladb.com/courses/using-scylla-drivers/). 

![](https://university.scylladb.com/wp-content/uploads/2021/06/cluster_connect.png)


## Connect to the Cluster

To allow connections from the outside world to your newly create Scylla Cloud cluster, you’ll have to whitelist the public IP address of the Katacoda machine.
To see the IP address type:

`curl http://ipinfo.io`{{execute}}

Now, copy the IP address and in the Scylla Cloud interface, under the General tab, and add that IP to the list of allowed IPs. 

![](https://university.scylladb.com/wp-content/uploads/2021/06/Screenshot-from-2021-06-20-16-16-23.png)

Since the Katacoda platform uses a dynamic list of public servers spread around the globe, the IP address of the machine we're connecting from might change. As a workaround add 0.0.0.0/32 to the Allowed IPs list. This effectively allows connection to the cluster from any machine.

**Note that this is unsafe and that you should never do this is in a production system.** 

Now that the IP address of the Katacoda machine is whitelisted, we can connect to the cluster. Copy the password from the Instructions tab and the IP address of one of the scylla nodes from the General tab. Run the following command with the password and the IP address you copied:


`docker run -it --rm --entrypoint cqlsh scylladb/scylla -u scylla -p *************** 1.1.1.1`{{copy}}

Next, create a Keyspace called mykeyspace (notice that if you changed the AWS Region, you have to change the command accordingly):

`CREATE KEYSPACE mykeyspace WITH replication = {'class': 'NetworkTopologyStrategy', 'AWS_US_EAST_1' : 3} AND durable_writes = true;`{{execute}}

A [Keyspace](https://university.scylladb.com/courses/data-modeling/lessons/basic-data-modeling-2/topic/keyspace/) is a top-level container that stores tables with attributes that define how data is replicated on nodes. It defines a number of options that apply to all the tables it contains, most prominently of which is the replication strategy used by the Keyspace.

Use the newly defined keyspace:

`USE mykeyspace;`{{execute}}

## Read and Write Data

Next, create a Table:

`CREATE TABLE monkeySpecies (
    species text PRIMARY KEY,
    common_name text,
    population varint,
    average_size int
);`{{execute}}

A [Table](https://university.scylladb.com/courses/data-modeling/lessons/basic-data-modeling-2/topic/table-and-basic-concepts/) is how Scylla stores data and can be thought of as a set of rows and columns.

![](https://university.scylladb.com/wp-content/uploads/2019/04/primary_key-2.png#main)

Insert some data into the newly created table:

`INSERT INTO monkeySpecies (species, common_name, population, average_size) VALUES ('Saguinus niger', 'Black tamarin', 10000, 500);`{{execute}}

And read the data you just wrote:

`SELECT * FROM monkeySpecies;`{{execute}}



