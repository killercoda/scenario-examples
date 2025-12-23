
> Services need to run on all interfaces (like 0.0.0.0) and not just localhost.
<br>
> Services need to be accessible via HTTP and **not** HTTPS.

Without NodePort we can also use port-forwarding:

```plain
kubectl run httpd --image=httpd:alpine
kubectl expose pod httpd --port 80 --name httpd
kubectl wait --for=condition=ready pod httpd
```{{exec}}

Then start kubectl forward:

```plain
kubectl port-forward --address 0.0.0.0 service/httpd 80:80
```{{exec}}

Now access it via

[ACCESS APACHE]({{TRAFFIC_HOST1_80}})

It's also possible to access ports using the top-right navigation in the terminal.
Or we can display the link to that page:

[ACCESS PORTS]({{TRAFFIC_SELECTOR}})

It's also possible to generate access URLs in bash (foreground or background scripts) like this:

```
sed 's/PORT/80/g' /etc/killercoda/host
```{{exec}}
