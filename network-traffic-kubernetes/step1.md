
> Services need to run on all interfaces (like 0.0.0.0) and not just localhost

Run Nginx and expose the Pod:

```plain
kubectl run nginx --image=nginx:alpine
kubectl expose pod nginx --port 80 --name nginx
kubectl wait --for=condition=ready pod nginx
```{{exec}}

Then start kubectl forward:

```plain
kubectl port-forward --address 0.0.0.0 service/nginx 80:80
```{{exec}}

Now access it via

[ACCESS NGINX]({{TRAFFIC_HOST1_80}})

It's also possible to access ports using the top-right navigation in the terminal.
Or we can display the link to that page:

[ACCESS PORTS]({{TRAFFIC_SELECTOR}})
