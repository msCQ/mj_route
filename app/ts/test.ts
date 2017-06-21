// // let isDone: boolea = false;
//
// let list: Array<number> = [1, 2, 3];
//
// let myTuple: [string, number];
// myTuple = ['121', 22]
// console.log();
//
//
// interface MyConfig {
//     a: string,
//     b?: number[],
//     [propName: string]: any;
// }
//
//
// function getConfig(config: MyConfig): { a: string, c: any } {
//     return {
//         a: config.a,
//         c: 2,
//     }
// }
//
// getConfig({a: 'a', b: [2, 2], c: '121'})
//
//
// class Animal {
//     name: string;
// }
// class Dog extends Animal {
//     breed: string;
// }
// interface NotOkay {
//     [x: string]: Animal;
//     [x: string]: Dog;
// }