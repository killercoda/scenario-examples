What happens if we set the Consistency Level to ALL (CL=ALL)?

## Read and Write Data 


Set the Consistency Level to ALL and perform a write:

`CONSISTENCY ALL`{{execute}} 

`insert into users (user_id, fname, lname) values (8, 'lorne', 'malvo');`{{execute}} 

`select * from users;`{{execute}}

The operations were successful again. CL=ALL means that we have to read/write to the number of nodes according to the Replication Factor, 3 in our case. Since all nodes are up, this works. 

