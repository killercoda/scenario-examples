In production, a Scylla cluster should have at least three nodes in a cluster. In this lab, just for the demonstration, you will start by creating a single node cluster with Alternator enabled.


## Create a Scylla Cluster

If you haven’t done so yet, download the example from git:

`git clone https://github.com/scylladb/scylla-code-samples.git`{{execute}}

Go to the directory of the alternator example:

`cd scylla-code-samples/alternator/getting-started`{{execute}}

Start a one-node cluster with Alternator enabled. 

By default, Scylla does not listen to DynamoDB API requests. To enable such requests, set the alternator-port configuration option to the port (8000 in this example), which will listen for DynamoDB API requests.

`docker run  --name some-scylla --hostname some-scylla -p 8000:8000 -d scylladb/scylla:4.4.0 --smp 1 --overprovisioned 1 --alternator-port=8000 --alternator-write-isolation=always`{{execute}}

Wait a few seconds and make sure the cluster is up and running:

`docker exec -it some-scylla nodetool status`{{execute}}

In this example, you will use the Python language to interact with Scylla with the [Boto 3](https://boto3.amazonaws.com/v1/documentation/api/latest/index.html) SDK for Python. It’s also possible to use the CLI or other languages such as Java, C#, Python, Perl, PHP, Ruby, Erlang, Javascript. 

Next, if you don’t already have it set up, install boto3 python library, which also contains drivers for DynamoDB:

`sudo pip install --upgrade boto3`{{execute}}

In the three scripts create.py read.py and write.py change the value for “endpoint_url” to the IP address of the node. Copy the IP address from the output of the previously used "nodetool status" command, then edit the three files and replace the IP address:

`scylla-code-samples/alternator/getting-started/create.py`{{open}}

`scylla-code-samples/alternator/getting-started/read.py`{{open}}

`scylla-code-samples/alternator/getting-started/write.py`{{open}}


