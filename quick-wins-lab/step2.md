After seeing how to run a single Scylla instance in the last step, and running the CQL Shell, in this part, you will see how to run some basic CQL commands. You will work with our newly created Scylla instance to create a table, insert data into it, and read the data.

## Create a Keyspace and Table

You should be in CQL Shell after completing the previous step. Next, Create a keyspace called “mykeyspace”:

`CREATE KEYSPACE mykeyspace WITH REPLICATION = { 'class' : 'SimpleStrategy', 'replication_factor' : 1};`{{execute}}

Keep in mind that SimpleStrategy should not be used in production.

Next, create a table with three columns: user id, first name, and last name, and insert some data:

`use mykeyspace;`{{execute}}

`CREATE TABLE users ( user_id int, fname text, lname text, PRIMARY KEY((user_id)));`{{execute}}

## Read and Write Data

Insert two rows into the newly created table: 

```
insert into users(user_id, fname, lname) values (1, 'rick', 'sanchez');
insert into users(user_id, fname, lname) values (4, 'rust', 'cohle');
```{{execute}}

Now, read the table contents:

`select * from users;`{{execute}}

To summarize, we saw how easy it is to start a Scylla cluster and perform some basic CQL operations. In the next lessons, we will see some more advanced commands.

Read more about the CQL shell [here](https://docs.scylladb.com/getting-started/cqlsh/).


