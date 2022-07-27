Now that the cluster is ready and the three nodes are up, you'll create a keyspace with the Replication Factor (RF) set to 3, a table, write some data to the table, and then read it. 


## Read and Write Data 

Create a keyspace called “mykeyspace”, with a Replication Factor of three: 

`CREATE KEYSPACE mykeyspace WITH REPLICATION = { 'class' : 'NetworkTopologyStrategy', 'replication_factor' : 3};`{{execute}}

Next, create a table with three columns: user id, first name, and last name, and insert some data: 

`use mykeyspace;`{{execute}} 

`CREATE TABLE users ( user_id int, fname text, lname text, PRIMARY KEY((user_id)));`{{execute}} 

Insert into the newly created table two rows: 

```
insert into users(user_id, fname, lname) values (1, 'rick', 'sanchez'); 
insert into users(user_id, fname, lname) values (4, 'rust', 'cohle');
```{{execute}} 

Read the table contents:

`select * from users;`{{execute}}

You just saw how to create a three-node cluster with RF=3, how to open a CQL Shell, create a table, insert data into it, and read the data. 

Unless otherwise defined, the Consistency Level for cqlsh defaults to ONE. So, in our case all the nodes are up and CL=ONE, therefore the operations succeed.
 
Next, you will see what happens when nodes are down and how the Consistency Level impacts the read/write operations.
