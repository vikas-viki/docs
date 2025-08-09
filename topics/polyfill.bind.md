# creating our own bind method


let say you want to create your own myBind funciton, that should be accesible by every function to just like "apply"/"bind" we can do like this,
```js
function printCity(nation) {
    console.log(this.city, this.state, nation);
}

Function.prototype.myBind = function(...args){
    const func = this;

    const obj = args[0];
    const params = args.slice(1);
    return (...args2) =>{
        func.apply(obj, [...params, ...args2]);
    }
}

const user={
    city: "Bangalore",
    state: "Karnataka"
};

let printMyCity = printCity.myBind(user);

printMyCity("India");
```