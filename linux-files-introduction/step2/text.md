
Create a new file `/etc/my-second-file` with content `amazing`

<br>

### Solution
We can use the command `echo`:

```plain
echo amazing > /etc/my-second-file
```{{exec}}

And to verify we can run

```plain
cat /etc/my-second-file
```{{exec}}
