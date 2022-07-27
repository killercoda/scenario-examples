Next we’ll take one node down and check read and write operations with a Consistency Level of Quorum (CL=QUORUM).

## Read and Write Data 


Exit the CQL Shell and take down Node_Y and check the status (it might take some time until the node is actually down): 

`exit`{{execute}}

`docker stop Node_Y`{{execute}}

`docker exec -it Node_Z nodetool status`{{execute}} 

Now, set the Consistency Level to QUORUM and perform a write: 

`docker exec -it Node_Z cqlsh`{{execute}} 

`CONSISTENCY QUORUM`{{execute}} 

`use mykeyspace;`{{execute}}

`insert into users (user_id, fname, lname) values (9, 'avon', 'barksdale');`{{execute}} 

Read the data to see the insert was successful: 

`select * from users;`{{execute}} 

With CL=QUORUM, the read and write were successful. 

