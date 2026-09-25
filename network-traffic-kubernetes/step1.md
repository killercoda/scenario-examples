
> Services need to run on all interfaces (like 0.0.0.0) and not just localhost.
<br>
> Services need to be accessible via HTTP and **not** HTTPS.

Run Nginx and expose via NodePort `30080`:

```plain
kubectl run nginx --image=nginx:alpine
cat <<EOF | kubectl apply -f -
apiVersion: v1
kind: Service
metadata:
  name: nginx
spec:
  type: NodePort
  selector:
    run: nginx
  ports:
    - port: 80
      targetPort: 80
      nodePort: 30080
EOF
kubectl wait --for=condition=ready pod nginx
```{{exec}}

Now access it via

[ACCESS NGINX]({{TRAFFIC_HOST1_30080}})

> Anyone with access to the URL has root access to the environment, more on [security](https://killercoda.com/security).

It's also possible to access ports using the top-right navigation in the terminal.
Or we can display the link to that page:

[ACCESS PORTS]({{TRAFFIC_SELECTOR}})

It's also possible to generate access URLs in bash (foreground or background scripts) like this:

```
sed 's/PORT/30080/g' /etc/killercoda/host
```{{exec}}
