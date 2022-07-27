In the previous step you used, CL=ALL, and one node was down. Since RF=3, three nodes had to be up for the read/write to succeed.

What happens if another node is down? and we use a Consistency Level of Quorum?

## Read and Write Data 


Take down Node_Z and check the status:

`exit`{{execute}}

`docker stop Node_Z`{{execute}} 

`docker exec -it Node_X nodetool status`{{execute}} 

Now, set the Consistency Level to QUORUM and perform a read and a write: 

`docker exec -it Node_X cqlsh`{{execute}} 

`CONSISTENCY QUORUM`{{execute}} 

`use mykeyspace;`{{execute}} 

`insert into users (user_id, fname, lname) values (11, 'morty', 'smith');`{{execute}} 

`select * from users;`{{execute}} 

With CL=QUORUM, the read and write fail. Since RF=3, QUORUM means at least two nodes need to be up, in our case just one is. 

