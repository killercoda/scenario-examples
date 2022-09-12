
Global Secondary indexes (also called “Secondary indexes”) are a mechanism in ScyllaDB which allows efficient searches on non-partition keys by creating an index. 

They are indexes created on columns other than the entire partition key, where each secondary index indexes one specific column. A secondary index can index a column used in the partition key in the case of a composite partition key.  With global indexing, a materialized view is created for each index. This Materialized View has the indexed column as a partition key and primary key (partition key and clustering keys) of the indexed row as clustering keys.

In this step you'll see how it works. 

## Global Indexes

The data model in ScyllaDB partitions data between cluster nodes using a partition key, which is defined in the database schema. This is an efficient way to look up rows because you can find the node hosting the row by hashing the partition key.

However, this also means that finding a row using a non-partition key requires a full table scan which is inefficient.

Next, create a global index on column Dish_type, which we want to query by:

`CREATE INDEX ON menus(dish_type);`{{execute}}

And we can see the created global index and the underlying Materialized View:

`DESC SCHEMA;`{{execute}}

And now we can query based on the newly created index:

`SELECT * FROM menus WHERE dish_type = 'Polish soup';`{{execute}}

With the index created, we can execute the query without further issues and receive all entries that describe a Polish soup, from all cities.

![](https://university.scylladb.com/topic/materialized-views-and-secondary-indexes-hands-on-updated/global-sec-index-example/#main)

This is what happens when the query is executed:

* The user provides query details to the coordinator node (1)
* An indexing subquery (2) is used to fetch all matching base keys from the materialized view.
* The coordinator uses the resulting base key set to request appropriate rows from the base table (3).

The index is global; underneath it stores base primary keys in a table, where the indexed column acts as a partition key. The key allows the index to scale properly. To avoid pitfalls, schema designers must remember that the same best practices for primary keys apply to secondary indexes columns, for example: avoid creating an index on a low cardinality column. Also, note that indexed data will be stored on a node that serves the partition key token of an indexed table. That node may not necessarily be the same node that stores base table data.


