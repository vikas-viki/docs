# Prototypal inheritance

Everything inside javascript is Object.

__proto__ is an Object prototype, which is the object it inherits the properties and methods from.

it comes from the fact that, 
if you create an array, and call __proto__, it has Array.prototype methods and properties.
if you create a function, and call __proto__, it has Function.prototype methods and properties.
if you create an object, and call __proto__, it has Object.prototype methods and properties.

Everything in javascript is an object, comes from the fact that, everything inherits from the Object.prototype methods and properties.

meaning if you call,
Array.prototype.__proto__, its same as Object.prototype, same goes for Function, Promise, String, Number and all.

This is called `prototypal inheritance`.

### Instead of every object carrying its own toString(), a global toStirng() is attached to Object.prototype, so that everyone can access it.

Key points:

All objects except Object.create(null) have a prototype.
The prototype itself can have its own prototype, creating an inheritance chain.
Eventually, the chain ends at null (no prototype).


## `The prototype chain is the linked list of objects that JavaScript uses to look up properties and methods.`

How it works: 

You access a property: obj.someProp

JS first checks obj itself.

If not found, it checks obj.__proto__ (its prototype).

If still not found, it checks that object’s prototype.

This continues until it reaches null (end of chain).

## you can add your own methods to Object.prototype


1.
    Object.prototype.sayHello = function() {
        console.log("hello");
    }

    now everyone can access `sayHello()`

2.
    You can also change the prototype inheritance itself

    // you cant change the prototypes of primitive ones
    let str = "hello";
    str.__proto__ = { shout: () => console.log("HI!") };
    str.shout(); // ❌ undefined, because it doesn't keep the change

    // but you can change the prototypes of non primitive ones
    let obj = { name: "Vikas" };
    Object.setPrototypeOf(obj, { greet: () => console.log("Hello!") });
    obj.greet(); // ✅ 

3. the same way, if you want anytihng to inherit anything else, you can just this. But this wont work for primitives (Number, String, BigInt, Booleanm, Symbol, undefined and null)
   1. In JavaScript, the primitive types are the ones that are not objects and are immutable (their value can’t be changed in place).
   2. the changes to prototype will be global to the current session/lifetime of a nodejs/browser process.