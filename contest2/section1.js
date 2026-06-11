// //q1-------------------------------------------------------------------------

// const students = [
//     { name: "Aman", marks: 78 },
//     { name: "Riya", marks: 91 },
//     { name: "Kabir", marks: 65 }
// ];
// let newarray = students.map((student) => {
//     let grade;
//     if (student.marks >= 90) {
//         grade = 'A'
//     }
//     else if (student.marks >= 70) {
//         grade = 'B'
//     }
//     else {
//         grade = 'C'
//     }

//     return {
//         name: student.name.toUpperCase(),
//         grade: grade
//     }
// })
// console.log(newarray)

// //q2---------------------------------------------------------------------------

// const products = [
//     { name: "Laptop", price: 80000 },
//     { name: "Mouse", price: 500 },
//     { name: "Monitor", price: 15000 },
//     { name: "Keyboard", price: 1200 }
// ];

// console.log(products.filter(x => x.price > 5000))

// //q3------------------------------------------------------------------------------

// const users = [
//     { id: 1, email: "a@test.com" },
//     { id: 2, email: "b@test.com" },
//     { id: 3, email: "a@test.com" },
//     { id: 4, email: "c@test.com" }
// ];
// const counter = {}
// //for() .map() forEach()
// users.forEach((user) => {
//     if (counter[user.email]) {
//         counter[user.email]++
//     } else {
//         counter[user.email] = 1
//     }
// })

// console.log(users.filter(x => counter[x.email] > 1))

// //q4------------------------------------------------------------------------------

// const students = [
//     { name: "A", branch: "CSE" },
//     { name: "B", branch: "ECE" },
//     { name: "C", branch: "CSE" },
//     { name: "D", branch: "ME" }
// ];
// let result = {}
// students.forEach((student) => {
//     if (!result[student.branch]) {
//         result[student.branch] = []
//     }
//     result[student.branch].push(student.name)
// })
// console.log(result)

// // q5---------------------------------------------------------------------------------

// const users = [
//     {
//         name: "Aman",
//         orders: ["Laptop", "Mouse"]
//     },
//     {
//         name: "Riya",
//         orders: ["Keyboard"]
//     }
// ];
// console.log(users.flatMap(user => user.orders))

// q6-------------------------------------------------------------------------------------

// const orders = [
//     "Laptop",
//     "Mouse",
//     "Laptop",
//     "Keyboard",
//     "Laptop",
//     "Mouse"
// ];


// const counter = {}
// orders.forEach((order) => {
//     if (counter[order]) {
//         counter[order]++
//     } else {
//         counter[order] = 1
//     }
// })

// let maxproduct = ""
// let maxapp = 0

// for (let product in counter) {
//     if (counter[product] > maxapp) {
//         maxapp = counter[product]
//         maxproduct = product
//     }
// }

// console.log({
//     product: maxproduct,
//     count: maxapp
// })