![bmtv](bmtv.png)

1. do a post order traversal, keeping track of level, when there's a new higher level, change your maxValue.

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
 * @return {number}
 */
var findBottomLeftValue = function(root) {
    let maxLevel = -1;
    let maxEle = 0;

    function postOrder(root, level){
        if(!root) return;

        postOrder(root.left, level+1);
        postOrder(root.right, level + 1);
        if(level > maxLevel){
            maxEle = root.val;
            maxLevel = level;
        }
    }

    postOrder(root, 0);
    return maxEle;
};
```
</details>