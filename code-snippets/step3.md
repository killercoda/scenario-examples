
### Highlight important lines

```yaml{2,5,6}
apiVersion: v1
kind: Pod
metadata:
  name: nginx
spec:
  containers:
  - name: nginx
    image: nginx
```


```json{6-9}
{
    "apiVersion": "v1",
    "kind": "Pod",
    "metadata": {
        "generateName": "weave-net-",
        "labels": {
            "name": "weave-net",
            "pod-template-generation": "1"
        },
        "name": "weave-net-tntwq",
        "namespace": "kube-system",
    }
}
```
