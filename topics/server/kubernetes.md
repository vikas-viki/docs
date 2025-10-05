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