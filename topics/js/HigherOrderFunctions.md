### Higherorder functions

A function which takes another functions as argument or returns another function as a value is called a higher order function.


below is a valid higher order function.
```js
async function handleAxiosErrors<T extends (...args: any[]) => Promise<any>>(
    func: T, 
    errorMessage: string, 
    successMessage: string,
    ...args: Parameters<T>
): Promise<ReturnType<T> | void> {
    try {
        const response = await func(...args);  
        toast.success(successMessage);
        return response;
    } catch (e) {
        if (isAxiosError(e)) {
            toast.error(e.response?.data?.message ?? errorMessage);
        } else {
            toast.error(errorMessage);
        }
    }
}

```

**`Polyfill for map`**

```js
Array.prototype.newFilter = function (callback, thisArg) {
    const result = [];
    for (let i = 0; i < this.length; i++) {
        if (i in this) { // handle sparse arrays [2, ,3] with empty values
            if (callback.call(thisArg, this[i], i, this)) {
                result.push(this[i]);
            }
        }
    }
    return result;
};
```