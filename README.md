# What This Does

This creates a mapping of evaluated a/b test treatments. Webpack will look at `import(...)` calls and see if the string is being interoplated. If it is, it will search up to the last static path and create a chunk file for each file in that directory. For example:

```js
import(`./treatments/${testName}/${treatment}.js`)
```

This will keep all the modules within `treatments/` as loose modules, because the client code is going to dynamically import based on runtime information.

We already have an LiX based culture, where all features are LiX, so we should make the expirence not only easy but also performant by default by encouraging a coupling of treatment to file.

# Serving

```
cd dist
```

```
npx http-server
```

or

```
yarn global add http-server
http-server
```
