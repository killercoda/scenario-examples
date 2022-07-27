After you saw how to create a three node cluster, open a CQL Shell to a node in the cluster, creat a table with RF=3, write and read data, you will now see what happens when we try to read and write data to our table, with varying Consistency Levels and when some of the nodes are down.

## Read and Write Data 

Set the Consistency Level to QUORUM and perform a write:

`CONSISTENCY QUORUM`{{execute}} 

`insert into users (user_id, fname, lname) values (7, 'eric', 'cartman');`{{execute}}  

Read the data to see the insert was successful:

`select * from users;`{{execute}} 

Note that regardless of the Consistency Level, a write is always sent to all replicas, as set by the Replication Factor. Consistency Level controls when a client acknowledges an operation, not how many replicas are updated.

The read and write operations were successful. What do you think would happen if we did the same thing with Consistency Level ALL? 

