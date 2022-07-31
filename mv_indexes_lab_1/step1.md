
In this step, you'll set up the environment by creating a three-node Scylla cluster. You’ll then connect to the cluster with the CQL Shell, create a keyspace, a table, insert some data into the newly created table, and read the data. 
These topics are explained in more detail in [this course](https://university.scylladb.com/courses/scylla-essentials-overview/) on Scylla University.

## Setting Up the Environment

Start by creating a three-node Scylla cluster using Docker. Create one node, called Node_X:

`docker run --name Node_X -d scylladb/scylla:4.3.0 --overprovisioned 1 --smp 1`{{execute}}

You can learn more about best practices for running Scylla on Docker [here](https://docs.scylladb.com/operating-scylla/procedures/tips/best_practices_scylla_on_docker/).
 
Create two more nodes, Node_Y and Node_Z, and add them to the cluster of Node_X.

The command “$(docker inspect –format='{{ .NetworkSettings.IPAddress }}’ Node_X)” translates to the IP address of Node-X: 
 
`docker run --name Node_Y -d scylladb/scylla:4.3.0 --overprovisioned 1 --smp 1 --seeds="$(docker inspect --format='{{ .NetworkSettings.IPAddress }}' Node_X)"`{{execute}} 
 
 
`docker run --name Node_Z -d scylladb/scylla:4.3.0 --overprovisioned 1 --smp 1 --seeds="$(docker inspect --format='{{ .NetworkSettings.IPAddress }}' Node_X)"`{{execute}} 

Wait a minute or so and check the node status:

`docker exec -it Node_X nodetool status`{{execute}}

You’ll see that eventually, all the nodes have UN for status. U means up, and N means normal. If you get a message "nodetool: Unable to connect to Scylla API server: java.net.ConnectException: Connection refused (Connection refused)", it means you have to wait a bit more for the node to be up and responding. 

Once the nodes are up, and the cluster is set, we can use the CQL shell to create a table.

Run a CQL shell: 

`docker exec -it Node_X cqlsh`{{execute}} 

Next, create a keyspace called architecture, with a Replication Factor of three: 

`CREATE KEYSPACE architecture WITH REPLICATION = { 'class' : 'NetworkTopologyStrategy', 'replication_factor' : 3};`{{execute}}

Let’s look at a table of buildings: the key is the building’s unique name, and additional columns are each building’s city, the year it was built, and height in meters:

`use architecture;`{{execute}} 

`CREATE TABLE buildings (
    name text,
    city text,
    built_year smallint,
    height_meters smallint,
    PRIMARY KEY (name)
);`{{execute}} 

Now let’s insert some data:


```
INSERT INTO buildings (name, city, built_year, height_meters)
      VALUES ('Burj Khalifa', 'Dubai', 2010, 828);
INSERT INTO buildings (name, city, built_year, height_meters)
      VALUES ('Shanghai World Financial Center', 'Shanghai', 2008, 487);
INSERT INTO buildings (name, city, built_year, height_meters)
      VALUES ('Taipei 101', 'Taipei', 2004, 449);
INSERT INTO buildings (name, city, built_year, height_meters)
      VALUES ('Sears Tower', 'Chicago', 1974, 442);
INSERT INTO buildings (name, city, built_year, height_meters)
      VALUES ('World Trade Center', 'New York City', 1972, 417);
INSERT INTO buildings (name, city, built_year, height_meters)
      VALUES ('Empire State Building', 'New York City', 1931, 381);
INSERT INTO buildings (name, city, built_year, height_meters)
      VALUES ('Chrysler Building', 'New York City', 1930, 283);
```{{execute}} 

The table now looks like this:

`SELECT * FROM buildings;`{{execute}}

	




