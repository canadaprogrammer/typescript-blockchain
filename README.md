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

## Typescript Fundamental

### First steps

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

### Type

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

### Interface for Object Type

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

### Class

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

## Blockchain

- `yarn add crypto-js`

### Create Blockchain and The Validation

- On `index.ts`

  - ```ts
    import * as CryptoJS from 'crypto-js';

    class Block {
      public index: number;
      public hash: string;
      public previousHash: string;
      public data: string;
      public timestamp: number;

      // static method can be used without creating the class
      static calculateBlockHash = (
        index: number,
        previousHash: string,
        timestamp: number,
        data: string
      ): string =>
        CryptoJS.SHA256(index + previousHash + timestamp + data).toString();

      static validateStructure = (aBlock: Block): boolean =>
        typeof aBlock.index === 'number' &&
        typeof aBlock.hash === 'string' &&
        typeof aBlock.previousHash === 'string' &&
        typeof aBlock.timestamp === 'number' &&
        typeof aBlock.data === 'string';

      constructor(
        index: number,
        hash: string,
        previousHash: string,
        data: string,
        timestamp: number
      ) {
        this.index = index;
        this.hash = hash;
        this.previousHash = previousHash;
        this.data = data;
        this.timestamp = timestamp;
      }
    }

    Block.calculateBlockHash;

    const genesisBlock: Block = new Block(
      0,
      '2020202020202',
      '',
      'Hello',
      123456
    );

    let blockchain: Block[] = [genesisBlock];

    const getBlockchain = (): Block[] => blockchain;

    const getLatestBlock = (): Block => blockchain[blockchain.length - 1];

    const getNewTimeStamp = (): number => Math.round(new Date().getTime());

    const createNewBlock = (data: string): Block => {
      const previousBlock: Block = getLatestBlock();
      const newIndex: number = previousBlock.index + 1;
      const newTimestamp: number = getNewTimeStamp();
      const newHash: string = Block.calculateBlockHash(
        newIndex,
        previousBlock.hash,
        newTimestamp,
        data
      );

      const newBlock: Block = new Block(
        newIndex,
        newHash,
        previousBlock.hash,
        data,
        newTimestamp
      );

      addBlock(newBlock);

      return newBlock;
    };

    const getHashForBlock = (aBlock: Block): string =>
      Block.calculateBlockHash(
        aBlock.index,
        aBlock.previousHash,
        aBlock.timestamp,
        aBlock.data
      );

    const isBlockValid = (
      candidateBlock: Block,
      previousBlock: Block
    ): boolean => {
      if (!Block.validateStructure(candidateBlock)) {
        return false;
      } else if (previousBlock.index + 1 !== candidateBlock.index) {
        return false;
      } else if (previousBlock.hash !== candidateBlock.previousHash) {
        return false;
      } else if (getHashForBlock(candidateBlock) !== candidateBlock.hash) {
        return false;
      } else {
        return true;
      }
    };

    const addBlock = (candidateBlock: Block): void => {
      if (isBlockValid(candidateBlock, getLatestBlock())) {
        blockchain.push(candidateBlock);
      }
    };

    createNewBlock('secondary block');
    createNewBlock('third block');
    createNewBlock('fourth block');

    console.log(blockchain);

    export {};
    ```
