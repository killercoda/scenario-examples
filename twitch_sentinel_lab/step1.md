A [Cluster](https://university.scylladb.com/courses/scylla-essentials-overview/lessons/architecture/topic/cluster-node-ring/) is a collection of [Nodes](https://university.scylladb.com/topic/node/) that ScyllaDB uses to store the data. The nodes are logically distributed like a ring. A minimum cluster typically consists of at least three nodes. Data is automatically [replicated](https://university.scylladb.com/topic/data-replication/) across the cluster, depending on the Replication Factor. Learn more about ScyllaDB Architecture in [this lesson](https://university.scylladb.com/courses/scylla-essentials-overview/lessons/architecture/).

## Create a Three-Node Cluster, CQLSH

First, you'll bring up a three-node ScyllaDB cluster using Docker. Start with one node, called Node_X:

`docker run --name Node_X -d scylladb/scylla:4.3.0 --overprovisioned 1 --smp 1`{{execute}}

You can learn more about best practices for running ScyllaDB on Docker [here](https://docs.scylladb.com/operating-scylla/procedures/tips/best_practices_scylla_on_docker/).
 
Create two more nodes, Node_Y and Node_Z, and add them to the cluster of Node_X.

The command “$(docker inspect –format='{{ .NetworkSettings.IPAddress }}’ Node_X)” translates to the IP address of Node-X: 
 
` docker run --name Node_Y -d scylladb/scylla:4.3.0 --overprovisioned 1 --smp 1 --seeds="$(docker inspect --format='{{ .NetworkSettings.IPAddress }}' Node_X)"`{{execute}} 
 
 
`docker run --name Node_Z -d scylladb/scylla:4.3.0 --overprovisioned 1 --smp 1 --seeds="$(docker inspect --format='{{ .NetworkSettings.IPAddress }}' Node_X)"`{{execute}} 

Wait a minute or so and check the node status: 

`docker exec -it Node_X nodetool status`{{execute}}  

You’ll see that eventually, all the nodes have UN for status. U means up, and N means normal. If you get a message "nodetool: Unable to connect to ScyllaDB API server: java.net.ConnectException: Connection refused (Connection refused)", it means you have to wait a bit more for the node to be up and responding. 

You can read more about Nodetool Status [here](https://docs.scylladb.com/operating-scylla/nodetool-commands/status/).

Once the nodes are up, and the cluster is set, we can use the CQL shell to create a table.

Run a CQL shell: 

`docker exec -it Node_X cqlsh`{{execute}} 

And now you're ready to run queries and model keyspaces/tables. 🥳🥳