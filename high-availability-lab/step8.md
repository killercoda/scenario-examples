Now that you saw that with CL=QUORUM and two nodes down, read/write operations fail, let's see what happens with CL=ONE.

## Read and Write Data 


Set the Consistency Level to ONE and try to read/write data:

`CONSISTENCY ONE`{{execute}} 

`insert into users (user_id, fname, lname) values (12, 'marlo', 'stanfield');`{{execute}}   

`select * from users;`{{execute}} 

This time the read and write are successful. CL=ONE requires that we read/write to just one node. Since one node is up this works. 


