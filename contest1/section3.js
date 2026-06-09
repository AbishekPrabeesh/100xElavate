//q1

// const fs = require("fs");
// fs.readFile("contest1/users.json", function (err, data) {

//     if (err) {
//         console.log("Error :" + err);
//     } else {
//         let us = JSON.parse(data);
//         for (let i in us) {
//             console.log(us[i].email);
//         }
//     }
// })


const fs = require("fs");
let output = new Array();
let sum = 0;
fs.readFile("contest1/marks.json", function (err, data) {

    if (err) {
        console.log(err);
    } else {
        let m = JSON.parse(data);
        for (let i in m) {
            output[i] = m[i].marks;
            sum += m[i].marks
        }
    }

    output.sort(function (a, b) { return b - a });
    console.log("Highest: " + output[0])
    console.log("Lowest: " + output[2])
    console.log("Average: " + sum / 3)
})
