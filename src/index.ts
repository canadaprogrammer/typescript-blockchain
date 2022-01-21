class Human {
  public name: string;
  public age: number;
  public gender: string;
  constructor(name: string, age: number, gender: string) {
    this.name = name;
    this.age = age;
    this.gender = gender;
  }
}

const jin = new Human('Jin', 20, 'Male');

const sayHi = ({ name, age, gender }: Human): string => {
  return `Hello ${name}, you are ${age}, ${gender}.`;
};

console.log(sayHi(jin));

export {};