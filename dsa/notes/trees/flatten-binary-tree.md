Given a binary tree, modify it in a way that it beccomes linkedlist of preorder form

1. approach
   1. go to the right most end of the list(post-order but right->left->root), 
   2. if there's a left sibling, take that as the parent if exists, remove the left link.
   3. TC: O(n)
   4. SC: O(1)

<details>
    <summary>approach</summary>

```js
var flatten = function(root) {
    let prev = null;

    function preorder(root){
        if(!root) return;

        preorder(root.right);
        preorder(root.left);

        root.right = prev;
        root.left = null;
        prev = root;
    }

    preorder(root);
};
```
</details>