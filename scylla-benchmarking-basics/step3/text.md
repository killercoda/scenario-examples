
**cassandra-stress** is a benchmarking tool that ScyllaDB inherited from the Apache Cassandra project, and extended it (with capabilities such as shard-awareness).

There are 2 primary reasons to use cassandra-stress when working with ScyllaDB:

1. Running simple benchmarks against a ScyllaDB cluster. You have the flexibility to specify several configuration parameters, such as the throughput, number of operations to run, threads to execute, and duration of the test. 
2. You may stress the cluster by using your own defined profiles, which allows you to test whether your data modeling scales, as well as help you to simulate real world situations, such as node failures, as we've seen during the first part of this presentation.

Getting started with cassandra-stress is really simple. Inside our ScyllaDB container, the first thing that we'll generally want to do is to ingest data to the cluster. It is important that we have data beforehand, because, later on, if we want to run read tests, or a mixed read/write workload, the data to read from will already exist in the database.

> # Note:
> In an actual production environment, you always want to run cassandra-stress on dedicated machines rather than from your ScyllaDB nodes. Doing so guarantees that your stressor clients (in this case, cassandra-stress) won't steal valuable compute resources from your database.

First, let's exit our **cqlsh** session if you still have it opened:

```cql
quit;
```{{exec}}

Now, still within your container's shell, here's an example on how to write to a ScyllaDB cluster:

```shell
cassandra-stress write n=10K -rate threads=8 -node 172.17.0.2
```{{exec}}

There's a lot going on here! Let's break down the command syntax to understand what it does:

- The `write` command tells cassandra-stress that it should perform a write operation.
- The `n=10K` is an argument to the previous `write` **parameter**, and specifies that we want to run 10 thousand operations in total.
- The `-rate threads=2` introduces our first cassandra-stress **option**: `-rate`, which allows us to control thread count, rate limiting, among other aspects. We specify that we want cassandra-stress to confine itself to only 2 threads.
- Finally, we specify the `-node` **option**, and tell cassandra-stress to connect to `172.17.0.2` IP address and use it as a contact point.

If you are unsure what's the IP address of your ScyllaDB container, you may either check it out from the **nodetool status** output we've seen earlier, or directly from your host machine, with the following Docker command:

```shell
docker inspect scylla-labs | grep IPAddress
```

> # Tip
> You may run `cassandra-stress help` to learn more about multiple commands and options! <br>
> For each command or option, you may also specify the help argument to receive additional information. For example: `cassandra-stress help write` will show up all information related to the write command.

After we have populated our initial dataset, we may now read through it, simply by switching the `write` command to `read`:

```shell
cassandra-stress read n=10K -rate threads=2 -node 172.17.0.2
```{{exec}}

