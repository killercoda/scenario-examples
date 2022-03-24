
> Services need to run on all interfaces (like 0.0.0.0) and not just localhost

Run Nginx on port 80 using Docker:

```
docker run -p 80:80 nginx:alpine
```{{exec}}

Now access Nginx using this link:

[ACCESS NGINX]({{TRAFFIC_HOST1_80}})

It's also possible to access ports using the top-right navigation in the terminal.
Or we can display the link to that page:

[ACCESS PORTS]({{TRAFFIC_SELECTOR}})
