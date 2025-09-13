Given a binary tree and two nodes, return the nearest root node that has both p and q as its children.

Note:
p != q ever,
p can be the parent of itself.

1.  Approach
    1.  given a biary tree, find left subtree and right subtree, if at any point we get any node which is equal to p or q, return the root. let say q is in bottom, but we're returning then and there, cause, even if its at bottom, we have to return the ancestor, so there's no need to check below that.
    2.  TC: O(n)
    3.  SC: O(1)


<details>
<summary>Approach</summary>

```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function(root, p, q) {
    if(root == null) return null;

    if(root == p || root == q){
        return root;
    }

    let left = lowestCommonAncestor(root.left, p, q);
    let right = lowestCommonAncestor(root.right, p, q);

    if(left && right) {
        return root;
    }else if(left){
        return left;
    }else {
        return right;
    }
};
```
</details>