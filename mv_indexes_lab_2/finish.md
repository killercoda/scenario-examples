To summarize, Indexing is a useful tool that provides more types of queries on your tables. In principle, columns we wish to be queryable should be declared when the table is created, as part of a table’s primary key. Secondary Indexing is a neat way of making other columns queryable, but it comes with a cost of additional storage space and processing power to maintain the secondary index data coherent with the primary index information. 

If you’d like to further investigate what happens when using the above queries with secondary indexes, try turning [TRACING](https://docs.scylladb.com/using-scylla/tracing/) on and executing the queries again.

Check out other courses on [ScyllaDB University](https://university.scylladb.com/) to improve your skills. 

You can learn more about these topics in ScyllaDB Documentation: [Materialized Views](https://docs.scylladb.com/using-scylla/materialized-views/#), [Local Secondary Indexes](https://docs.scylladb.com/using-scylla/local-secondary-indexes/), and [Global Secondary Indexes](https://docs.scylladb.com/using-scylla/secondary-indexes/). Two additional and useful references are [this](https://www.scylladb.com/2017/11/03/secondary/) blog post and [this](https://www.scylladb.com/2019/07/23/global-or-localsecondary-indexes-in-scylla-the-choice-is-now-yours/) one.




