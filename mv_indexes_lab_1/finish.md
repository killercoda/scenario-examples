Congratulations! You have completed the first Materialized Views and Indexes Lab. 

To summarize, a MV is a view of a “base table”. Under the hood, it’s created as a separate table that can not be modified directly. In a Materialized View, all the components of the original primary key of the table MUST also appear in the MV’s key.

It’s possible to create a view with only some of the columns from the base table as well as use different sorting orders.

Check out other courses on [ScyllaDB University](https://university.scylladb.com/) to improve your skills. 

Another helpful resource is the ScyllaDB Documentation [section](https://docs.scylladb.com/using-scylla/materialized-views/#) on MV.
