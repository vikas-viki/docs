# call, apply, bind

# call
let name1 ={
    firstName: "Vikas",
    lastName:"K",
    printName: function(){
        console.log(this.firstName, this.lastName);
    }
}

let name2 = {
    firstName: "Sachin",
    lastName: "Thendulkar"
}

to print name of `name2` like name1 function,
we can borrow the function of name1, by using call,

like, 
name.printName.call(name2);


or we can write like

let printName = function(hometown) {
    console.log(this.firstName, this.lastName, hometown);
}

and then 

printName.call(name2, "India"); // this does the same thing, now, `this`, refers to the arg passed in the .call
first argument in obj (for `this` to refer to and res are the args passed to funcitons)

# apply

the only difference b/w call and apply is the way we pass args

printName.apply(name2, ["India"]); we use array

# bind

it follows same syntax of call, but it returns the copy of the function with that object, parameters bound to it.

like,
let printName2 = printName.bind(name2, "India");