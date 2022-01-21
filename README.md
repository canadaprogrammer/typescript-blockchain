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

- `yarn add tsc-watch --dev`

- Create `/dist`, `/src`

- Move `index.ts` to `/src/`

- On `package.json`

  - ```json
    {
      ...,
      "scripts": {
        "start": "tsc-watch --onSuccess \" node dist/index.js\" "
      }
    }
    ```

- On `tsconfig.json`

  - ```json
    {
      "compilerOptions": {
        ...,
        "outDir": "dist"        // Compiled ones will be inside dist.,
        "rootDir": "src"        // All typescript will be inside src.
      },
      // "include": ["src/**/*"], // All typescript will be inside src.
      ...
    }
    ```

- Add `dist` on `.gitignore`

## First steps

- ```ts
  const name = 'Jin',
    age = 20,
    gender = 'male';

  // const sayHi = (name, age, gender) => {
  //   console.log(`Hello ${name}, you are ${age} and ${gender}.`);
  // }

  // sayHi(name, age); // Error: An argument for 'gender' was not provided.

  // add `?` to the optional argument
  const sayHi = (name, age, gender?) => {
    console.log(`Hello ${name}, you are ${age} and ${gender}.`);
  };

  sayHi(name, age); // Hello Jin, you are 20 and undefined.

  // Error: can not redeclare block-scoped variable 'name'. It's solved put `export {};`. It means this is a module.
  export {};
  ```

## Type

- Parameter Type

  - ```ts
    const sayHi = (name: string, age: number, gender: string) => {
      console.log(`Hello ${name}, you are ${age} and ${gender}.`);
    };

    // sayHi('jin', '20', 'male'); // Error: Argument of type 'string' is not assignable to parameter of type 'number'.

    sayHi('jin', 20, 'male');

    export {};
    ```

- Return Type

  - ```ts
    // Error: Type 'string' is not assignable to type 'void'
    // const sayHi = (name: string, age: number, gender: string): void => {
    //   return `Hello ${name}, you are ${age} and ${gender}.`;
    // };

    const sayHi = (name: string, age: number, gender: string): string => {
      return `Hello ${name}, you are ${age} and ${gender}.`;
    };

    sayHi('jin', 20, 'male');

    export {};
    ```

## Interface for Object Type

- ```ts
  interface Human {
    name: string;
    age: number;
    gender: string;
  }

  const person = {
    name: 'Jin',
    age: 20,
    gender: 'Male',
  };

  // const sayHi = (person: Human): string => {
  //   return (`Hello ${person.name}, you are ${person.age}, ${person.gender}.`);
  // }

  const sayHi = ({ name, age, gender }: Human): string => {
    return `Hello ${name}, you are ${age}, ${gender}.`;
  };

  console.log(sayHi(person));

  export {};
  ```

## Class

- ```ts
  class Human {
    public name: string;
    //private age: number;
    public age: number;
    public gender: string;
    constructor(name: string, age: number, gender: string) {
      this.name = name;
      this.age = age;
      this.gender = gender;
    }
  }

  const jin = new Human('Jin', 20, 'Male');

  // Error: Property 'age' is private and only accessible within class 'human'.
  const sayHi = ({ name, age, gender }: Human): string => {
    return `Hello ${name}, you are ${age}, ${gender}.`;
  };

  console.log(sayHi(jin));

  export {};
  ```
