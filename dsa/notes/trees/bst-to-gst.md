Given a binary tree, modify that tree such that, every value of the node is sum of all the other node whose values are greater than current one and itself.



1. bruteforce approach
   1. search entire tree once, get all the values
   2. loop through tree again, modify the node's value such that it sum of all no's greater than its value and itself
   3. TC: O(n^2)
   4. SC: O(n)
2. optimised approach
   1. given its a binary search tree, all the values greater are in right, all the values lesser are in the left side of the tree.
   2. keep track of a sum and loop through tree in right, root, left manner, modifying the root's/current node's value


<details>
<summary>approach</summary>

```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var bstToGst = function(root) {
    let sum = 0;

    function bst(root){
        if(!root) return 0;

        bst(root.right);

        sum += root.val;
        root.val = sum;

        bst(root.left);
    }

    bst(root);

    return root;
};
```
</details>