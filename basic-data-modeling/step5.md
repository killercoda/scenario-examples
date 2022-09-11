Now that you understand how the partition key and clustering key work, let's dive deeper and see why it matters and what's the importance of selecting an adequate primary key. 

## Importance of Key Selection
Let's create a new table heartrate_v6:

`CREATE TABLE heartrate_v6 (
   pet_chip_id uuid,
   time timestamp,
   heart_rate int,
   PRIMARY KEY (pet_chip_id)
);`{{execute}}

Insert some data:

`INSERT INTO heartrate_v6(pet_chip_id, time, heart_rate) VALUES (268e074a-a801-476c-8db5-276eb2283b03, '2011-02-03 04:05:00', 81);
INSERT INTO heartrate_v6(pet_chip_id, time, heart_rate) VALUES (fead97e9-4d77-40c9-ba15-c45478542e20, '2011-02-03 04:05:05', 80);
INSERT INTO heartrate_v6(pet_chip_id, time, heart_rate) VALUES (47045afb-fd11-44c6-9d0f-82428434e887, '2011-02-03 04:05:10', 83);`{{execute}}

As we only defined the pet_chip_id as the Primary Key (which in this case is also the Partition Key), this is how the data would be stored in ScyllaDB:

![](https://university.scylladb.com/topic/table-and-basic-concepts/primary_key-2/#main)

Let’s see what happens when we query with and without the partition key in terms of performance:


`SELECT * FROM heartrate_v6 WHERE time='2011-02-03 04:05:10';`{{execute}}

We get an error message.

Since no partition key is specified, this query would perform a full cluster scan. This is slow and inefficient.

If we use any SELECT query without including the partition key, we’re going to be doing a full cluster scan. This is blocked by default. [Allow Filtering](https://docs.scylladb.com/getting-started/dml/#allowing-filtering) bypasses ScyllaDB restrictions on inefficient scans, which can potentially create a significant load on the system. It’s easy to see why this is very inefficient and slow. Think of a production cluster with many nodes and with billions of rows.

To solve this, we can either define the table to include the time field as the clustering key, as we saw in a previous step. Another solution would be to include the partition key in the query:

`SELECT * FROM heartrate_v6 WHERE pet_chip_id = 268e074a-a801-476c-8db5-276eb2283b03;`{{execute}}

This query runs fast and returns the answer almost immediately, as we specified the partition key. ScyllaDB knows exactly which node contains the data by hashing the ID (which is the partition key). This is quick and efficient.

If we wanted to query for the pet’s heart rate by pet_chip_id and time? We could then define the table as follows:

`CREATE TABLE heartrate_v7 (
   pet_chip_id uuid,
   time timestamp,
   heart_rate int,
   PRIMARY KEY (pet_chip_id, time)
);`{{execute}}

In this case, the partition key is the pet_chip_id, and the clustering key is the time. Each pet_chip_id (the partition key) would be a partition, that is, existing on a single node. Within that partition, the data would be stored according to the clustering key, which is “time.”

And add some data:

`INSERT INTO heartrate_v7(pet_chip_id, time, heart_rate) VALUES (268e074a-a801-476c-8db5-276eb2283b03, '2011-02-03 04:05:00', 81);
INSERT INTO heartrate_v7(pet_chip_id, time, heart_rate) VALUES (fead97e9-4d77-40c9-ba15-c45478542e20, '2011-02-03 04:05:05', 80);
INSERT INTO heartrate_v7(pet_chip_id, time, heart_rate) VALUES (fead97e9-4d77-40c9-ba15-c45478542e20, '2011-02-03 04:05:10', 89);
INSERT INTO heartrate_v7(pet_chip_id, time, heart_rate) VALUES (fead97e9-4d77-40c9-ba15-c45478542e20, '2011-12-17 09:21:00', 84);
INSERT INTO heartrate_v7(pet_chip_id, time, heart_rate) VALUES (47045afb-fd11-44c6-9d0f-82428434e887, '2011-02-03 04:05:00', 83);`{{execute}}

Since a Partition Key and a Clustering Key are defined, each partition would possibly have more than one row. A row would be defined by the Partition Key and the Clustering Key. A single partition may have many rows, which would be sorted according to the Clustering Key:

![](https://university.scylladb.com/topic/importance-of-clustering-key/unnamed/#main)

Now it would be very efficient to query what was the heart rate of a specific pet at a given time (or time interval):

`SELECT * from heartrate_v7 WHERE pet_chip_id = fead97e9-4d77-40c9-ba15-c45478542e20 AND time >='2010-03-04 07:01:00' AND time <='2012-03-04 07:02:00';`{{execute}}

So what happens here:

The partition key (pet_chip_id) tells us precisely in which node our data is stored. So we’d know where in the cluster we can find our data. Now, In that partition, since the data is ordered according to the time, we could very quickly scan to the given time interval (the clustering key) and return the records.

When choosing a partition key, we want to aim for:

* High Cardinality, meaning that the range of values are mostly unique 
* Even Distribution of the data

And we'd like to avoid:

* Low Cardinality
* Hot Partition, a situation where some nodes are accessed very often while others are idle
* Large Partition, where some partitions are very large while others are small

Examples of suitable partition keys:

* User Name
* User ID
* User ID + Time
* Sensor ID 
* Sensor ID + Time
* Customer


And ones that are likely to be inadequate: 

* State
* Age
* Favorite NBA Team
* Team Angel or Team Spike

