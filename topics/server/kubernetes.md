Kubernetes was initially developed by Google (named Borg), later a a new implementation from scratch was made opensource for anyone to use.

kubernetes -> k8s -> k(8chars)s

tradtional problem.
when dockers camein, it made portability so easier that it had mass adoption, but the problem arrived that you need to manage all (a lot if any) the containers manually, there's no single service to manage them, thats where kubernetes comes in.


## kubernetes architecture.

![kubernees](kubernetes.png)

1. when you want to spin up let say 2 instance of your own nodejs containers(docker containers),
you tell the kubernetes api to spin up 2 instances.

2. the KAS(kubernetes-api-server) first updates the state information in etcd key-value store and creates two instance of the image you specified (they are not running yet).

3. the scheduler sees that two containers are ready, then it assigns the containers to be run on two worker nodes you have. scheduler manages load balancing and all.

4. scheduler is able to do this by talking to kubelet inside the worker node. each running container is called a pod.

5. when you want to talk to your server, that happens directly with worker node via kube-proxy, which proxies requests to your node containers.

6. when you want to increase the no of instances of it, you just tell it to KAS again.


# 

here the control pane & worker nodes are seperate physical machines (like you own local machine or cloud ones like ec2), you may have as many worker nodes as you want.

### api-server
api server is what as a developer i am connected to.

### control pane
it makes descision on scheduling, detecting and responding to events and all.

### kube-apiserver
it exposes kubernetes api that you can interact with.

### etcd
etcd is highly available key-value store used by k8s to store cluster info.

### kube-scheduler
Control plane component that watches for newly created Pods with no assigned node, and selects a node for them to run on.

### kube-controller-manager 
Logically, each controller is a separate process, but to reduce complexity, they are all compiled into a single binary and run in a single process. controller is the one that constantly checks user requirements like if all the nodejs are running have anyone died are pods healthy.
it's not one process, but a bunch of constantly running processes that have a certain job.
- Node controller: responsible for noticing and responding when a node goes down (then it re-schedules it)
there are other controllers like `deployment controller`
we can define our own controller that does a specific job that we define (when we reach operator pattern).


### kube cloud controller manager
that talks to the cloud the k8s cluster is hosted in and talks to the underlying cloud(like aws, gcp...)

There are many different types of controllers. Some examples of them are:

Node controller: Responsible for noticing and responding when nodes go down.
Job controller: Watches for Job objects that represent one-off tasks, then creates Pods to run those tasks to completion.
EndpointSlice controller: Populates EndpointSlice objects (to provide a link between Services and Pods).
ServiceAccount controller: Create default ServiceAccounts for new namespaces.
The above is not an exhaustive list.

### CRI (container runtime interface)
these are the components you need to run the containers, 
like if you want to run docker container, you need docker engine.


# from 100x Devs

orchestration(orchestra) comes from (a musician who guides other musicians how to perform, what to do)

### nodes
every machine running inside a k8s cluster(one or more nodes) is called a node.

### master node
the node thats responsible for schedule, heal, deploy containers (on worker nodes), listening to dev and doing stuff.
it has
- api-server
- etcd 
- kube-scheduler
- kube-controller-manager

### worker node
it has two jobs.
it runs the containers that master node schedules.
it constantly polls master node to check if there are any jobs for me.
- kubelet (an agent that polls master to run containers)
- kube-proxy  (responsible for making your apps be talked by world)
- container runtime (this is where your docker/cri.o/containerD or other container runs.)


## POD
a pod is smallest and simplest unit in the kubernetes object that you can create or deploy.
a pod runs inside the worked node which can run one or more docker containers and each worker node can run one or more pods.

`why pod when you have containers ?`
the thing is you can group two or more containers to run in a single pod, if you run them indidvidually, they might run in different machines which you might not want.

to create a k8s cluster you can use `kind` or `minicube`

# install kind

1. run `kind create cluster` that creates one cluster with one master node.


2. create yml file with 
```yml
kind: Cluster
apiVersion: kind.x-k8s.io/v1alpha4
nodes:
- role: control-plane
- role: worker
- role: worker
```
**kind let's you create the cluster, kubectl lets you manage them easily.**
then run `kind create cluster --config cluster.yml --name local` that creates 1 master and two worker nodes.

now if you need to connect to it, you need credentials which are stored in `~/.kube/config` which kubectl uses and makes things possible for us easily.

then you can create pod like `kubectl create pod`

use `kubectl get nodes`, `kubectl get pods`

you can create a pod using 
`kubectl run nginx --image=nginx --port=80`

you can get the logs of the pod using

`kubectl logs nginx`

to delete a pod 
`kubectl delete pod nginx`

**there's another way to create pod**
wherein you define a yaml file to have pods, containers all specified in one file.

like

```yml
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

then run `kubectl apply -f manifest.yml`


## jargon

### deployment
A Deployment in Kubernetes is a higher-level abstraction that manages a set of Pods and provides declarative updates to them. It offers features like scaling, rolling updates, and rollback capabilities, making it easier to manage the lifecycle of applications.
 
let say you want to create 4 pods the same time, you'd use deployment cmd.

let say you create 4 pods, normally, manually, whenever one goes down, it doesnt restart (it doesn only at 1 pod level), but in deployment it'll handle everything.

an example deployment yml
```yml
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

the template here specifies the metadata, which is a label `app` that's set to `nginx`. 
and the spec, specification specifies how many containers to run, what's the image, what port it exposes and all

the selector section is used by deployment to see, what are the pods that I have to keep looking after such that if one crashes, create another, which is done by matching labels specified in it.

it 3 replicas(copies) of it. let say then you manually create another pod (with same label), the deployment will delete it cause **it only looks after the deployment config it has**, which is, it needs to run 3 replicas, so I have to delete new one. If you delete one of them, it'll create one.

**the deployment doesn't create pods itself, it create replicaset first and then replicaset creates pods for us**

Deployment => Replicaset => pods.


## Replicaset
its a controller that ensures specified number of pod replicas are running at any given time.

let's create replicaset

```yml
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

then you can create replica set using 
`kubectl apply -f kubectl-rs.yml`

it does the same thing as deployment, then why do we need deployment.


### deployment use
one feature deployment gives you is `rolling updates`.
meaning iff you modify the same deployment file and re-apply it, it first creates a replicaset, ensures it's healthy then it slowly starts moving traffic from first pod to new one and then it slowly deletes the old replicaset. its like `blue-green-deployment`

**deployment gives you rolling updates, but if you only were using replicaset, you'd manually have to migrate from pods a to b**

## exposing app to internet.

you need a service that exposes your pod to internet.

### service in k8s
it defines how can you visit the pod/container running inside it, by defining, what port makes call to which pod which makes call to which container port.

there are more types of services like 
- nodeport
- cluster IP
- loadbalancer

like

```yml
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
      nodePort: 30007  # This port can be any valid port within the NodePort range (30,000 - 30,200)
  type: NodePort
```

now when you apply this, your service will serve the pod in that port, but since everything is running inside docker, you need to map ports off you system to docker workers/master to access it.

this specifies that this service serves the nodes port 30007 and port 80 of the pod running inside it.


kind.yml file
```yml
kind: Cluster
apiVersion: kind.x-k8s.io/v1alpha4
nodes:
- role: control-plane
  extraPortMappings:
  - containerPort: 30007
    hostPort: 30007
- role: worker
  extraPortMappings:
  - containerPort: 30008
    hostPort: 30008
- role: worker
```

this says master's(control-plane) port 30007 is accessible by host(my machine)'s 30007 port. if you want your workers to have the ports opened to host as well then you can specify it in extraPortMappings.

In Kubernetes, a "Service" is an abstraction that defines a logical set of Pods and a policy by which to access them. Kubernetes Services provide a way to expose applications running on a set of Pods as network services. Here are the key points about Services in Kubernetes:
Key concepts
Pod Selector: Services use labels to select the Pods they target. A label selector identifies a set of Pods based on their labels.
Service Types:
ClusterIP: Exposes the Service on an internal IP in the cluster. This is the default ServiceType. The Service is only accessible within the cluster.
NodePort: Exposes the Service on each Node’s IP at a static port (the NodePort). A ClusterIP Service, to which the NodePort Service routes, is automatically created. You can contact the NodePort Service, from outside the cluster, by requesting <NodeIP>:<NodePort>.
LoadBalancer: Exposes the Service externally using a cloud provider’s load balancer. NodePort and ClusterIP Services, to which the external load balancer routes, are automatically created.
Endpoints: These are automatically created and updated by Kubernetes when the Pods selected by a Service's selector change.


### NOTE
for a service to be exposed on internet, 
the ports must be specified in the cluster config before starting so that the cluster know what ports it exposes (only for local k8s but for global ones, servies are enough).

they you create a deployment where you specify the ports each container expose

then you create a service that actually maps the node's port to the container port 

For NodePort service:
targetPort = container port inside pod
port = port inside the Service object (cluster-internal)
nodePort = port on the node that forwards to targetPort

For LoadBalancer service:
NodePort may exist under the hood, but external IP + cloud LB forwards traffic.

For ClusterIP service:
Only accessible inside cluster, no node mapping needed.

a cluster which you create using kind is nothing more than a docker container.

### note
you might have a question.
let say two pods each running nginx exposing port 80 on the same node, when we create a service that maps 30007(node's port) to 80(pod's port), which pod it'll point to ?

the answer is there's a internal load balancer that decides this, if its only 1 pod, it'll send it to it, but if there are more than 1, first it'll match all the pods with that matching label, then forwards to one of them based on the load.


each pod inside the node gets its own ip

when you define a ip inside the deployment, its just for documentation, but actual mapping is done by service only.

if you dont map any ports from nginx containers to host, a host can run as many nginx containers as he want na, but both containers cant listen on same port of the same host.

If you don’t create a Service, the container is only reachable by other pods in the cluster via pod IP.

```yml
spec:
  selector:
    app: nginx
  ports:
    - port: 80        # <--- service port
      targetPort: 80  # <--- pod/container port
      nodePort: 30007
```
Service port is the port other pods in the cluster use to talk to this service.

```
User / External Client
        │
        ▼
NodePort (optional) or LoadBalancer IP
        │  (nodePort maps host port → service port)
        ▼
Service (clusterIP)
  - servicePort = port clients/pods use to reach the service
  - targetPort  = port on pod/container receiving traffic
        │
        ▼
Pod IP + targetPort
        │
        ▼
Container listening on containerPort
```

ex: 

```yml
containers:
- name: nginx
  image: nginx
  ports:
  - containerPort: 80
```

```yml
ports:
  - port: 8080       # service port
    targetPort: 80   # pod/container port
    nodePort: 30007  # optional
type: NodePort
```

```
User → http://<node-ip>:30007 → servicePort 8080 → pod IP:80 → nginx container listens on 80
```

so cluster is just a name for group of one of more machine, nothing sitting infront of node and world

[Internet] 
   |
   v
[node IP + NodePort]  <-- Node is actual machine
   |
   v
[ClusterIP]            <-- internal routing inside cluster
   |
   v
[Pods/Containers]


each container inside the pod, runs like how you'd run a docker container on host network, like they share same ip and no two processes can share port inside the pod/of the pod.

In Kubernetes, a LoadBalancer service type is a way to expose a service to external clients. When you create a Service of type LoadBalancer, Kubernetes will automatically provision an `external`(its not part of k8s cluster its provided by cloud provider.) load balancer from your cloud provider (e.g., AWS, Google Cloud, Azure) to route traffic to your Kubernetes service.


its just acts like an entrance to your cluster nodes, so that ppl from internet dont get to hit your nodes directly rather they hit loadblancer.

`we cant create a loadbalancer locally cause there's no cloud for k8s to talk to and create a loadbalancer`

In clouds (AWS/GCP/Azure), when you do:

kind: Service
spec:
  type: LoadBalancer


Kubernetes asks the cloud provider’s API:
“Hey, give me a public load balancer and connect it to my NodePorts.”
The cloud provider spins up something like AWS ELB / GCP LB.