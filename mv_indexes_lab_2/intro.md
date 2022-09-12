In ScyllaDB, unlike Apache Cassandra, both Global and Local Secondary Indexes are implemented using Materialized Views under the hood.

![](https://university.scylladb.com/wp-content/uploads/2020/12/800x300-materialized-secondary-filter-13.png)

Global Secondary Indexes (also called “Secondary Indexes”) are another mechanism in ScyllaDB which allows efficient searches on non-partition keys by creating an index. Rather than creating an index on the entire partition key, this index is created on specific columns. Each Secondary Index indexes one specific column. In cases where you are using a composite (compound) partition key, a secondary index can index the column. Secondary indexes are transparent to the application. Queries have access to all the columns in the table, and indexes can be added or removed on the fly without changing the application.

Updates therefore can be more efficient with Secondary Indexes than with Materialized Views because only changes to the primary key and indexed column cause an update in the Secondary Index view.

What’s more, the size of an index is proportional to the size of the indexed data. As data in ScyllaDB is distributed across multiple nodes, it’s impractical to store the whole index on a single node, as it limits the size of the index to the capacity of a single node, not the capacity of the entire cluster.

Hence the name Global Secondary Indexes. With global indexing, a Materialized View is created for each index. This Materialized View has the indexed column as a partition key, and it also stores the base table primary key. This means that it’s possible to query by the indexed column. Under the hood, ScyllaDB will query the MV, get the base table primary key, and then fetch the requested column.

Global Secondary indexes provide a further advantage: it’s possible to use the indexed column’s value to find the corresponding index table row in the cluster, so reads are scalable. Note, however, that with this approach, writes are slower than with local indexing (described below) because of the overhead required to keep the indexed view up to date.

Local Secondary Indexes are an enhancement to Global Secondary Indexes, which allow ScyllaDB to optimize workloads where the partition key of the base table and the index are the same key.
Like their global counterparts, ScyllaDB’s local indexes are based on Materialized Views. The subtle difference lies in the primary key; local indexes share the base partition key, ensuring that their data will be colocated with base rows.
When using a Token Aware Driver, the same node is likely the coordinator, and the query does not require any inter-node communication.

ScyllaDB’s superior performance often makes it acceptable for the user to use advanced but slower features like Materialized Views. This helps to improve the application’s data consistency and speed up its development.

This lab is part of [ScyllaDB University](https://university.scylladb.com/). You can learn more about MV in this [lesson](https://university.scylladb.com/courses/data-modeling/lessons/materialized-views-secondary-indexes-and-filtering/).







