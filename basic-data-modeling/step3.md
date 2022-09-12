Now that you know how to create a table with a partition key and a clustering key, let's dive into more complex examples and what it means to have multiple columns in our Primary Key. 

## Multiple-column Primary Keys


Both the Partition Key and the Clustering Key can include more than one column, so we can define the following table 

`CREATE TABLE heartrate_v3 (
   pet_chip_id uuid,
   time timestamp,
   heart_rate int,
   pet_name text,
   PRIMARY KEY ((pet_chip_id, time), pet_name)
);`{{execute}}

And insert some data:

`INSERT INTO heartrate_v3(pet_chip_id, time, heart_rate, pet_name) VALUES (123e4567-e89b-12d3-a456-426655440b23, '2019-03-04 07:01:10', 90, 'Duke');`{{execute}}

In this case, the partition key includes two columns: pet_chip_id and time, and the clustering key is pet_name. Keep in mind that every query must include all columns defined in the partition key. So, if we try this query:

`SELECT * from heartrate_v3 WHERE pet_chip_id = 123e4567-e89b-12d3-a456-426655440b23;`{{execute}}

It fails. 
Let’s try again with the entire partition key: 

`SELECT * from heartrate_v3 WHERE pet_chip_id = 123e4567-e89b-12d3-a456-426655440b23 AND time ='2019-03-04 07:01:10' AND pet_name = 'Duke';`{{execute}}

This time it succeeds. 
Similarly, if we want each partition to be based on the pet_chip_id but to be able to query according to pet_name and heart_rate:

`CREATE TABLE heartrate_v4 (
   pet_chip_id uuid,
   time timestamp,
   heart_rate int,
   pet_name text,
   PRIMARY KEY (pet_chip_id, pet_name, heart_rate)
);`{{execute}}

And insert some data:

`INSERT INTO heartrate_v4(pet_chip_id, time, heart_rate, pet_name) VALUES (123e4567-e89b-12d3-a456-426655440b23, '2019-03-04 07:01:10', 90, 'Duke');`{{execute}}

We can now query according to the clustering key columns: pet_name and heart_rate:

`SELECT * from heartrate_v4 WHERE pet_chip_id = 123e4567-e89b-12d3-a456-426655440b23 AND pet_name = 'Duke' AND heart_rate = 90;`{{execute}}


We insert some data and query according to the partition key and clustering key, in the correct order, so it works. 

* If there is more than one column in the Clustering Key (pet_name and heart_rate in the example above), the order of these columns defines the clustering order. For a given partition, all the rows are physically ordered inside ScyllaDB by the clustering order. This order determines what select query you can efficiently run on this partition.
* In this example, the ordering is first by pet_name and then by heart_rate.
* In addition to the Partition Key columns, a query may include the Clustering Key. If it does include the Clustering Key columns, they must be used in the same order as they were defined.


