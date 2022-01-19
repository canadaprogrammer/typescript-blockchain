# Learn Typescript with making Blockchain

## Initialize

- `yarn init`

- `yarn global add typescript`

- Create `tsconfig.json`

  - ```json
    {
      "compilerOptions": {
        "module": "commonjs",
        "target": "ES2015",
        "sourceMap": true
      },
      "include": ["index.ts"],
      "exclude": ["node_modules"]
    }
    ```

- Create `index.ts`

  - ```ts
    console.log('hello');
    ```

- Compile `index.ts` by type `tsc` on terminal

  - It creates `index.js` and `index.js.map`

- Add the compile function on `package.json`

  - ```json
    {
      ...,
      "scripts": {
        "start": "node index.js",
        "prestart": "tsc"
      }
    }
    ```
