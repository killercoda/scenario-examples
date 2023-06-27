
What if we need something tailored closely to our use case? After all, applications may often need to run different types of queries at different ratios, and even then, your data modeling will likely be much more complex than the default cassandra-stress stress generates.

This is when cassandra-stress profiles come into play. These profiles are very handy to test out more realistic schemas and access patterns and can be very easily written, particularly because the syntax follows the good and old YAML.

You may find an example stress profile under https://github.com/fee-mendes/stress-profile/blob/main/profile.yml and - to save your time - we have already placed a copy of it for you!

Let's open a new tab and leave the actual terminal. Don't worry, we are going back there shortly ;-)

Head to `Editor` in the upper left hand corner of your terminal. From there, click on the `+` sign. After that's done, switch to the new Tab opened (likely named `Tab 2`).

From there, let's copy the cassandra-stress profile inside our container:

```cql
docker cp ./profile.yml scylla-labs:/
```{{exec}}

Let's break that down:

- The `cp` command tells docker that we want to copy a file
- The `./profile.yml` argument indicates that a file named '*profile.yml*' located in our **current working directory** is going to be our source file to copy
- The last and final argument `scylla-labs:/` indicates that the file should be copied to the root (/) tree inside our container named `scylla-labs`.

After you are done with copying, get back to your container shell (located in the first tab [`Tab 1`]), and start an ingestion:

```shell
cassandra-stress user profile=file:///profile.yml no-warmup 'ops(insert=1)' n=10K -rate threads=2 -node 172.17.0.2
```{{exec}}

> # Note:
> Ensure that you are running the command within the same folder where you have copied the cassandra-stress profile to. Otherwise, change its location in the command above.

After the initial ingestion completes, we may now run a mixed workload, with inserts, and two different types of read queries, as specified within the stress profile:

```shell
cassandra-stress user profile=file:///profile.yml no-warmup 'ops(insert=10, read-latest=10, scan-partition=1)' n=100000 -rate threads=2 -node 172.17.0.2
```{{exec}}

And that's it!
