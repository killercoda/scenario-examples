
> Services need to run on all interfaces (like 0.0.0.0) and not just localhost.
<br>
> Services need to be accessible via HTTP and **not** HTTPS.

Headlamp listens on plain HTTP on port `4466`, so it works without changes.

Install Headlamp:

```plain
kubectl apply -f /root/headlamp.yaml
kubectl -n kube-system rollout status deployment/headlamp --timeout=180s
```{{exec}}

The YAML is the [official manifest](https://github.com/kubernetes-sigs/headlamp/blob/main/kubernetes-headlamp.yaml) with the image pinned to a version, the tracing settings removed and the Service exposed as NodePort `30080`:

```yaml{7,11}
kind: Service
apiVersion: v1
metadata:
  name: headlamp
  namespace: kube-system
spec:
  type: NodePort
  ports:
    - port: 80
      targetPort: 4466
      nodePort: 30080
  selector:
    k8s-app: headlamp
```

> You can only see resources in Headlamp depending on the token permissions: [more](https://headlamp.dev/docs/latest/installation/#create-a-service-account-token)

Create a ServiceAccount and use the token:

```plain
kubectl -n kube-system create sa headlamp-admin
kubectl create clusterrolebinding headlamp-admin --clusterrole cluster-admin --serviceaccount kube-system:headlamp-admin
kubectl -n kube-system create token headlamp-admin
```{{exec}}

Now use the printed token in the terminal to log into:

[ACCESS HEADLAMP]({{TRAFFIC_HOST1_30080}}) or [ACCESS PORTS]({{TRAFFIC_SELECTOR}})

> Anyone with access to the URL has root access to the environment, more on [security](https://killercoda.com/security).

Without NodePort, port-forwarding works as well, then Headlamp is reachable on port `4466`:

```plain
kubectl -n kube-system port-forward service/headlamp 4466:80 --address 0.0.0.0
```
