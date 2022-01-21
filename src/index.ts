interface Human {
  name: string,
  age: number,
  gender: string
}

const person = {
  name: "Jin",
  age: 20,
  gender: "Male"
}

// const sayHi = (person: Human): string => {
//   return (`Hello ${person.name}, you are ${person.age}, ${person.gender}.`);
// }

const sayHi = ({name, age, gender}: Human): string => {
  return (`Hello ${name}, you are ${age}, ${gender}.`);
}

console.log(sayHi(person));

export {}; 