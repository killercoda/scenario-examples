Materialized Views (MV) are a global index. When a new MV is declared, a new table is created and distributed to the different nodes using the standard table distribution mechanisms. It’s scalable, just like normal tables. It is populated by a query running against the base table. It’s not possible to directly update a MV; it’s updated when the base table is updated.

![](https://university.scylladb.com/wp-content/uploads/2020/12/800x300-materialized-secondary-filter-12.png)

Each Materialized View is a set of rows that correspond to rows present in the underlying, or base, table specified in the materialized view’s SELECT statement.
Reads from a Materialized View are just as fast as regular reads from a table and just as scalable. But as expected, updates to a table with Materialized Views are slower than regular updates since these updates need to update both the original table and the Materialized View and ensure the consistency of both updates. However, doing those in the application without server help would have been even slower.

Some common use cases for MV are Indexing with denormalization, different sort orders, and filtering (pre-computed queries). This session also goes over examples, the CQL syntax to use, and limitations.

In this lab, you’ll create a base table and different Materialized Views for that base table. You’ll execute updates to the base table and see what happens to the view. Additionally, you’ll learn how to query the MV.
Start by creating a Docker container with Scylla.

This lab is part of [Scylla University](https://university.scylladb.com/). You can learn more about MV in this [lesson](https://university.scylladb.com/courses/data-modeling/lessons/materialized-views-secondary-indexes-and-filtering/).







