A [Cluster](https://university.scylladb.com/courses/scylla-essentials-overview/lessons/architecture/topic/cluster-node-ring/) is a collection of [Nodes](https://university.scylladb.com/topic/node/) that Scylla uses to store the data. The nodes are logically distributed like a ring. A minimum cluster typically consists of at least three nodes. Data is automatically [replicated](https://university.scylladb.com/topic/data-replication/) across the cluster, depending on the Replication Factor. Learn more about Scylla Architecture in [this lesson](https://university.scylladb.com/courses/scylla-essentials-overview/lessons/architecture/).


## Create a Scylla Cluster

[Sign in](https://cloud.scylladb.com/user/signin) to Scylla Cloud if you already have a user. Otherwise, [create](https://cloud.scylladb.com/user/signup) one. 

Once you’re in, click on Add New Cluster. 

![](https://university.scylladb.com/wp-content/uploads/2021/06/add_cluster.png)

Leave the default options as they are. Enter “test-cluster” for the cluster name and click Launch Cluster. This will start a three-node cluster that you will use for this lab. 
Notice that if you’re a new user, you can use the free trial. 

Wait until the cluster is ready. 

Next, you’ll connect to it. Click on Connect.

It’s also possible to use your AWS account with Scylla Cloud using the Scylla Cloud Bring Your Own Account (BYOA) feature, learn more about it [here](https://docs.scylladb.com/scylla-cloud/cloud-setup/scylla-cloud-byoa/). 

