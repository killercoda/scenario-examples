In production, a ScyllaDB cluster should have at least three nodes in a cluster. In this lab, just for the demonstration you will start by creating a single node cluster.


## Create a ScyllaDB Cluster

Start a single instance and call it ScyllaU:

`docker run --name scyllaU -d scylladb/scylla:4.3.0 --overprovisioned 1 --smp 1`{{execute}}

Notice that when running ScyllaDB on Docker and in scenarios in which static partitioning is not desired - like mostly-idle cluster without hard latency requirements, the --overprovisioned command-line option is recommended. This enables certain optimizations for ScyllaDB to run efficiently in an overprovisioned environment.

The --smp command line option restricts ScyllaDB to COUNT number of CPUs.

Some files will be downloaded in this step. After the download wait for a few seconds, and verify that the cluster is up and running with the Nodetool Status command:

`docker exec -it scyllaU nodetool status`{{execute}}

The node scyllaU has a UN status. “U” means up, and N means normal. Read more about Nodetool Status [here](https://docs.scylladb.com/operating-scylla/nodetool-commands/status/). If you run the command and the node is not up and running yet wait a few more seconds and run it again.

Finally, we use the CQL Shell to interact with ScyllaDB:

`docker exec -it scyllaU cqlsh`{{execute}}

Notice that if you run cqlsh before the cluster is ready you'll get a connection error. In that case wait for a few more seconds until the cluster is up and try again.

The CQL Shell allows us to run Cassandra Query Language commands on ScyllaDB, as we will see in the next part.

You can read more about getting started with ScyllaDB in the [documentation](https://docs.scylladb.com/getting-started/). 
