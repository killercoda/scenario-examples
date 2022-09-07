Alternator is an open-source [project](https://github.com/scylladb/scylla/blob/master/docs/alternator/alternator.md) that gives Scylla compatibility with Amazon DynamoDB.

This lab starts with an introduction to the project. Afterward, you’ll create a one-node Scylla cluster with Alternator enabled, and performing some basic operations on it, using Python. 

![](https://university.scylladb.com/wp-content/uploads/2021/07/800x400-blog-load-balancing-scylla-alternator.png)

The goal of Alternator is to deliver an open-source alternative to DynamoDB, deployable wherever a user would want: on-premises, on other public clouds like Microsoft Azure or Google Cloud Platform, or still on AWS (for users who wish to take advantage of other aspects of Amazon’s market-leading cloud ecosystem, such as the high-density i3en instances). DynamoDB users can keep their same client code unchanged. Alternator is written in C++ and is a part of ScyllaDB. 

You can read more about it in [this](https://www.scylladb.com/2019/09/11/scylla-alternator-the-open-source-dynamodb-compatible-api/) blog post and in the [documentation](https://docs.scylladb.com/using-scylla/alternator/). 

The three main benefits ScyllaDB Alternator provides to DynamoDB users are:

1. Cost: DynamoDB charges for read and write transactions (RCUs and WCUs). A free, open-source solution doesn’t.
2. Performance: ScyllaDB was implemented in modern C++. It supports advanced features that enable it to improve latency and throughput significantly.
3. Openness: ScyllaDB is open-source. It can run on any suitable server cluster regardless of location or deployment method. 

This lab is part of [ScyllaDB University](https://university.scylladb.com). 

