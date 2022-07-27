In the previous step we saw that with CL=QUORUM, and one node down, the read and write were successful. What will happen with CL=ALL? 

## Read and Write Data 


Set the Consistency Level to ALL and try to read and write data:

`CONSISTENCY ALL`{{execute}} 

`insert into users (user_id, fname, lname) values (10, 'vm', 'varga');`{{execute}}  

`select * from users;`{{execute}} 

Both read and write fail. CL=ALL requires that we read/write to three nodes (based on RF=3), but only two nodes are up.

