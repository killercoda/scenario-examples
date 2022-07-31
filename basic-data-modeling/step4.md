After seeing how to use multiple column partition and clustering keys, let's see what happens if we want to use different sorting orders. 

## Clustering Key Sorting Order

By default, sorting is based on the natural order of the clustering columns. If, as we previously saw, the clustering key is the "time" column, the rows would be sorted by ascending order. 
What if our query is to find the heart rate by pet_chip_id and time, but that we want to look at the ten most recent records?
In that case, we can reverse the order:

`CREATE TABLE heartrate_v5 (
   pet_chip_id uuid,
   time timestamp,
   heart_rate int,
   PRIMARY KEY (pet_chip_id, time)
   )WITH CLUSTERING ORDER BY (time DESC);`{{execute}}

Now the rows for the same partition key would be ordered in descending order. Insert some data:

`INSERT INTO heartrate_v5(pet_chip_id, time, heart_rate) VALUES (123e4567-e89b-12d3-a456-426655440b23, '2012-03-04 07:01:10', 90); 
INSERT INTO heartrate_v5(pet_chip_id, time, heart_rate) VALUES (123e4567-e89b-12d3-a456-426655440b23, '2019-03-04 07:01:15', 93); 
INSERT INTO heartrate_v5(pet_chip_id, time, heart_rate) VALUES (123e4567-e89b-12d3-a456-426655440b23, '2011-03-04 07:01:10', 92); 
INSERT INTO heartrate_v5(pet_chip_id, time, heart_rate) VALUES (123e4567-e89b-12d3-a456-426655440b23, '2019-03-04 07:01:20', 91); 
INSERT INTO heartrate_v5(pet_chip_id, time, heart_rate) VALUES (123e4567-e89b-12d3-a456-426655440b23, '2020-03-04 09:01:10', 100); 
INSERT INTO heartrate_v5(pet_chip_id, time, heart_rate) VALUES (123e4567-e89b-12d3-a456-426655440b23, '2019-03-04 07:11:17', 80);`{{execute}}

And we can efficiently read the latest three rows for that pet_chip_id:

`SELECT * from heartrate_v5 WHERE pet_chip_id = 123e4567-e89b-12d3-a456-426655440b23 LIMIT 3;`{{execute}}

If the order was ascending (as it is by default) instead of descending, we'd have to do a full scan to get to the last three rows. 


  
