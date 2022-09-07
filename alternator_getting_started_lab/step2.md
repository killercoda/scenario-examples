After seeing how to run a single ScyllaDB instance in the last step, in this part, you will see how to run some basic queries using Python. 

## Create a Table and Run Queries

Next, using Alternator, you'll use the create.py script to create a table in our newly created cluster.

Take a look at the create.py file. 

Authorization is not in the scope of this lesson, so you’ll use ‘None’ and revisit this in a future lesson. 

Define a table called ‘mutant_data’ with the required properties such as the primary key “last_name” which is of a String data type. You can read about Boto 3 data types [here](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/customizations/dynamodb.html#valid-dynamodb-types). 

The DynamoDB data model is similar to ScyllaDB’s. Both databases have a partition key (also called “hash key” in DynamoDB) and an optional clustering key (called “sort key” or “range key” in DynamoDB), and the same notions of rows (which DynamoDB calls “items”) inside partitions. There are some differences in the data model. One of them is that in DynamoDB, columns (called “attributes”), other than the hash key and sort key, can be of any type and can be different in each row. That means they don’t have to be defined in advance. You can learn more about data modeling in Alternator in more advanced lessons. 

In this simple example, you'll use a one-node ScyllaDB cluster. In a production environment, it’s recommended to run a cluster of at least three nodes. 

Also, in this example, you’ll send the queries directly to the single node. In a production environment, you should use a mechanism to distribute different DynamoDB requests to different ScyllaDB nodes, to balance the load. More about that in future lessons. 

Run the script: 

`python3 create.py`{{execute}}

Each Alternator table is stored in its own keyspace, which ScyllaDB automatically creates. Table xyz will be in keyspace alternator_xyz. This keyspace is initialized when the first Alternator table is created (with a CreateTable request). The replication factor (RF) for this keyspace and all Alternator tables is chosen at that point, depending on the size of the cluster: RF=3 is used on clusters with three or more live nodes. RF=1 would is used if our cluster is smaller, as is in our case. Using a ScyllaDB cluster of fewer than three nodes is not recommended for production. 

Next, you will write and read some data from the newly created table. 

Take a look at the write.py file. 

In this script, the batch_write_item operation is used to write data to the table “mutant_data.” This allows for writing multiple items in one operation. Here you write two items using a PutRequest, which is a request to perform the PutItem operation on an item. 

Notice that unlike ScyllaDB (and Cassandra, for that matter) in DynamoDB, Writes do not have a configurable consistency level. They use CL=QUORUM. 

Execute the script to write the two items to the table:

`python3 write.py`{{execute}}

Next, you’ll read the data that was just written, again using a batch operation, batch_get_item. 

Take a look at the read.py file. 

The response is a dictionary with the result, the two entries previously written. 

Execute the read to see the results:

`python3 read.py`{{execute}}

DynamoDB supports two consistency levels for reads, “eventual consistency” and “strong consistency.” You can learn more about ScyllaDB consistency levels here and here. Under the hood, ScyllaDB implements Strongly-consistent reads with LOCAL_QUORUM, while eventually-consistent reads are performed with LOCAL_ONE.
