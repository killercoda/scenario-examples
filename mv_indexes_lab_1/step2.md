After setting up the environment and creating the building table, let’s move on to the Materialized View. 

![](https://university.scylladb.com/wp-content/uploads/2021/06/preview-full-blog-materialized-views.jpg)


## Creating the Materialized View

Notice that in this example that the data (city, built) or just (built) could also have served as a key because it uniquely determines a building in this data set. However, Scylla has no way to guarantee that this remains as more data is added. 

For example, one might add another building built-in 1930 to the list (we’ll do this below). The only key which is guaranteed to be unique and remain unique as additional data is added is the original table’s key, name in our case.
The above table allows us to query buildings by name.
What happens if we want to find buildings by the city?

From this “base table,” let’s ask Scylla to automatically maintain a second table, which is a Materialized View for finding buildings by the city. The new table will have the city as the partition key. The city cannot be the entire key for each record (a building) because we can have multiple buildings in the same city. 
Therefore we will have (city, name) as the primary key of the new Materialized View table: the city is the partition key, and the name is a clustering key:

`CREATE MATERIALIZED VIEW building_by_city AS
 SELECT * FROM buildings
 WHERE city IS NOT NULL
 PRIMARY KEY(city, name);`{{execute}} 
 
As a rule in a Materialized View, all the components of the original primary key of the table MUST also appear in the Materialized View’s key. This is why we added the name into the view’s key in this example.

The “WHERE city IS NOT NULL“ filter in the snippet above ensures that if a building includes a null value for the city, it will not be added to the view table because doing so would be illegal (a key component either partition or clustering key cannot be null). Adding this filter is mandatory. 
If you don’t, you will <strong>not</strong> be able to create the Materialized View:

`CREATE MATERIALIZED VIEW building_by_city AS
SELECT * FROM buildings PRIMARY KEY(city, name);`{{execute}} 

As expected, the above command <strong>fails</strong>. 

Moving forward, the new Materialized View looks like this:

`SELECT * FROM building_by_city;`{{execute}} 

This view contains all the columns from the base table because of the “SELECT * ” command we used to define the view.
What if we’re only interested in some of the columns from the original table? We can create a second view with only some of the columns:

`CREATE MATERIALIZED VIEW building_by_city2 AS
 SELECT height_meters FROM buildings
 WHERE city IS NOT NULL 
 PRIMARY KEY(city, name);`{{execute}} 
 
We can also look at the second view, which selected only some of the columns in the original table:

`SELECT * FROM building_by_city2;`{{execute}} 

Unsurprisingly, the new view contains the key columns (city and name), but the only additional column selected is height_meters. The base table’s built column is not copied to the new view because it was not selected.
Although internally each Materialized View is a separate table, a user is not allowed to modify a view directly:

`DELETE FROM building_by_city WHERE city='Taipei';`{{execute}} 

Unsurprisingly the above fails. 