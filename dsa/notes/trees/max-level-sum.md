given a binary tree, return the level(index+1) whose sum is highest among all other levels sum.


Input: root = [1,7,0,7,-8,null,null]
Output: 2
Explanation: 
Level 1 sum = 1.
Level 2 sum = 7 + 0 = 7.
Level 3 sum = 7 + -8 = -1.
So we return the level with the maximum sum which is level 2.

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
var maxLevelSum = function(root) {
    let ans = [];

    function preorder(root, level){
        if(!root) return;

        if(!ans[level]){
            ans[level] = root.val;
        }else{
            ans[level] += root.val;
        }

        preorder(root.left, level+1);
        preorder(root.right, level+1);
    }

    preorder(root, 0);
    return ans.indexOf(Math.max(...ans)) + 1;
};
```
</details>