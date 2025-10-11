# Kubernetes Notes

Kubernetes was initially developed by Google (named **Borg**). Later, a new implementation was created from scratch and made open-source for anyone to use.

* **kubernetes → k8s → k(8chars)s**

---

## Motivation

Traditional problem:

When Docker came in, it made portability much easier and gained mass adoption. However, managing containers manually became a problem. There was no single service to manage them. **Kubernetes solves this problem.**

---

## Kubernetes Architecture

![kubernetes](kubernetes.png)

### Overview of Pod Creation Flow

1. To spin up 2 instances of your Node.js containers (Docker containers), you tell the **Kubernetes API Server (KAS)**.
2. KAS updates the state information in **etcd** (key-value store) and creates two instances of the image (not running yet).
3. **Scheduler** sees the two containers and assigns them to run on worker nodes. It handles load balancing.
4. Scheduler communicates with **kubelet** inside the worker nodes. Each running container is called a **Pod**.
5. Accessing the server happens via **kube-proxy**, which proxies requests to node containers.
6. To scale up instances, you communicate with KAS again.

> Control plane & worker nodes can be separate physical machines (local or cloud, e.g., EC2). You can have as many worker nodes as you want.

---

## Components

### Control Plane

* **API Server**: Interface for developers to interact with the cluster.
* **Scheduler**: Assigns Pods to nodes, manages load balancing.
* **Controller Manager**: Checks cluster state and ensures Pods match desired state. Includes:

  * **Node Controller**: Detects node failures and reschedules Pods.
  * **Deployment Controller**, **Job Controller**, **Custom Controllers** (Operator pattern).
* **Cloud Controller Manager**: Integrates with cloud provider (AWS, GCP, etc.).
* **etcd**: Highly available key-value store for cluster information.

### Worker Node

* **kubelet**: Polls master node and runs assigned Pods.
* **kube-proxy**: Routes traffic to containers.
* **Container Runtime (Docker, containerd, CRI-O, etc.)**: Runs containers.

### CRI (Container Runtime Interface)

Required components to run containers (Docker engine, containerd, etc.).

---

## Nodes

* **Node**: Any machine running inside a cluster.
* **Master Node**: Handles scheduling, healing, deployment.

  * Components: api-server, etcd, kube-scheduler, kube-controller-manager
* **Worker Node**: Runs containers scheduled by master.
  Components: kubelet, kube-proxy, container runtime.

---

## Pods

* Smallest deployable unit in Kubernetes.
* Runs on worker nodes and can contain one or more containers.
* Allows grouping containers for co-location on the same node.
* Each Pod has its own IP; two Pods on the same node can expose the same port.

> Tools for local clusters: `kind`, `minikube`

---

## Installing Kind

```bash
kind create cluster
```

### Cluster YAML Example

```yaml
kind: Cluster
apiVersion: kind.x-k8s.io/v1alpha4
nodes:
- role: control-plane
- role: worker
- role: worker
```

```bash
kind create cluster --config cluster.yml --name local
```

* Credentials stored in `~/.kube/config` (used by kubectl).

### Pod Commands

```bash
kubectl create pod nginx
kubectl get nodes
kubectl get pods
kubectl logs nginx
kubectl delete pod nginx
```

#### YAML Pod Example

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx
spec:
  containers:
  - name: nginx
    image: nginx
    ports:
    - containerPort: 80
```

```bash
kubectl apply -f manifest.yml
```

---

## Deployment

* Higher-level abstraction managing a set of Pods.
* Features: Scaling, rolling updates, rollbacks.
* Deployment creates **ReplicaSet**, which manages Pods.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:latest
        ports:
        - containerPort: 80
```

---

## ReplicaSet

* Ensures a specified number of Pod replicas are running.

```yaml
apiVersion: apps/v1
kind: ReplicaSet
metadata:
  name: nginx-replicaset
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:latest
        ports:
        - containerPort: 80
```

---

## Services

* Defines how Pods are exposed to network.
* Types:

  * **ClusterIP**: Internal cluster-only access
  * **NodePort**: Exposes Service on each Node’s IP at static port
  * **LoadBalancer**: Uses cloud LB to expose Service externally

### NodePort Example

```yaml
apiVersion: v1
kind: Service
metadata:
  name: nginx-service
spec:
  selector:
    app: nginx
  ports:
    - protocol: TCP
      port: 80
      targetPort: 80
      nodePort: 30007
  type: NodePort
```

* Maps host port → container port
* Service load-balances requests across matching Pods
* ClusterIP provides internal routing
* NodePort exposes nodes to external traffic
* LoadBalancer provisions cloud-managed LB (AWS ELB, GCP LB, etc.)

---

## Request Flow Example

```
User → LoadBalancer → Node → kube-proxy → Service → Pod → Container
```

1. Client sends request to LoadBalancer
2. LoadBalancer forwards to Node
3. kube-proxy maps NodePort → Service ClusterIP
4. Service forwards to a Pod
5. Pod delivers to container
6. Response follows reverse path

---

## Kubernetes Concepts Summary

### Pod

* Smallest unit; group of containers sharing same network & storage.
* Each Pod has a unique IP.

### Deployment

* Manages lifecycle of Pods
* Supports scaling, rolling updates, rollback
* Deployment → ReplicaSet → Pods

### Service

* Abstracts networking to Pods
* Maps servicePort → targetPort → NodePort (optional)

### YAML Notes

* `apiVersion`: Specifies parser version for kubectl
* Multiple services with same name overwrite old ones

### Loadbalancers
* a loadbalancer lets you route the requests of user to the pods maintaining the consistent ips.
* like, a nodeport service's actual node's ip might change but not loadbalancer's

### Cluster IP service
* look after use of clusterip service is ingress file.


### Name spaces
namespaces allow you to seperate clusters.

let's say you are in a big company that has over 1000s of nodes in 1 cluster and you are part of one specific app that has only 3 nodes running, now for you to be able to find your 3 ones in them, the easiest and production meant way is to create seperate name space for your nodes such that you can get details by using your namespace.

so namespace in general allow you to do "seperation of concerns"

In Kubernetes, a namespace is a way to divide cluster resources between multiple users/teams. Namespaces are intended for use in environments with many users spread across multiple teams, or projects, or environments like development, staging, and production.

**Creating namespace**
```bash
kubectl create namespace backend-team
```

specifying it in manifest json
```yml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
  namespace: backend-team
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:latest
        ports:
        - containerPort: 80
```
```bash
kubectl apply -f deployment-ns.yml # to create deployment in that namespace.
kubectl get pods -n backend-team # to get deployments of that namespace.
```

**setting context**
now you'll have to specify name space each time, to set a default context, you can do 
```bash
kubectl config set-context --current --namespace=backend-team
# to change to default
kubectl config set-context --current --namespace=default
```


### Config maps
config maps are just manifest files that store details on key values pairs, that are as important as secrets to run your application, but need not be that secret, like your `cache-size`, this need not be a secret variable, but it's needed for you to run the app.

`one more benifit is that, you can use these file to pass env variable/config variables while creating deployments, no need to manually pass the vaiables every time.`

You create this same as deployments, but of type `ConfigMap`, unlike `LoadBalancer`, `ClusterIP`, `NodeService` and more, which you can store in volumes.