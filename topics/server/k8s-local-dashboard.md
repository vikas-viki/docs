# Kubernetes Dashboard Setup on Kind Cluster

This guide shows how to deploy and access the **Kubernetes Dashboard** for viewing nodes, pods, and containers in a graphical UI.

---

## 1. Deploy the Dashboard

Run the following command to deploy the official Kubernetes Dashboard:

```bash
kubectl apply -f https://raw.githubusercontent.com/kubernetes/dashboard/v2.7.0/aio/deploy/recommended.yaml
```

This will create the `kubernetes-dashboard` namespace and deploy all required pods and services.

---

## 2. Create an Admin User

Create a file named `dashboard-adminuser.yaml` with the following content:

```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: admin-user
  namespace: kubernetes-dashboard
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: admin-user-binding
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: cluster-admin
subjects:
- kind: ServiceAccount
  name: admin-user
  namespace: kubernetes-dashboard
```

Apply it:

```bash
kubectl apply -f dashboard-adminuser.yaml
```

---

## 3. Get the Login Token

Generate a token for logging in:

```bash
kubectl -n kubernetes-dashboard create token admin-user
```

Copy the token output — you will use it to log in.

---

## 4. Start the Kubernetes Proxy

Run the proxy to access the Dashboard from your local machine:

```bash
kubectl proxy
```

---

## 5. Access the Dashboard

Open your browser and go to:

```
http://localhost:8001/api/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:/proxy/
```

Select **Token** as the login method and paste the token from Step 3.

---

## 6. What You Can Do in the Dashboard

* View **Nodes** and see which pods are running on each node.
* View **Workloads** to inspect deployments, pods, and containers.
* Check **Logs**, **Events**, and **Resource Usage** (CPU/Memory).
* Navigate via a **boxy/structured UI**, not raw JSON.

---

> Optional: You can also expose the Dashboard via a NodePort service for direct access without using `kubectl proxy`.
