## CJS

- all js files are treated cjs by default if not package specification/file extension/mjs syntax is detected.
- cjs files are marked with .cjs/.js files
- cjs files cant have await at top level
- cjs files can have folders as modules(no index file specification is needed)
- cjs files use require and module.exports
- a .js file can be treated as cjs if `--input-type=commonjs` is specified while running. 

# MJS

- mjs files are marked with .mjs/.js
- mjs files can have await at top level
- mjs files need exact paths (cause they dont take folders as modules)
- mjs use import and export statements
- a .js file can be treated as mjs if `--input-type=module` is specified while running.