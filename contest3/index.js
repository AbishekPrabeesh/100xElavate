//https://brindle-goal-102.notion.site/MITS_100x-Assignment-on-JS-37a46b36b2e9807bba94ea5bde5b941a

// const fs = require("fs");
// let output = new Array();
// fs.readFile("contest3/users.json", function (err, data) {
//     if (err) {
//         console.log("File not found!");
//     }
//     let userarray = JSON.parse(data);
//     let ans = userarray.map(user => user.email).join("\n")
//     fs.writeFile("email.txt",ans,(err)=> {
//         console.log("written succesfully")
//     })
// })


//-------------------------------------------------------------------------------- 


// const fs = require("fs");
// fs.readFile("contest3/marks.json", function (err, data) {
//     if (err) {
//         console.log("File not found!");
//     }

//     let students = JSON.parse(data)
//     let highMarks = students[0].marks
//     let lowMarks = students[0].marks
//     let total = 0

//     for(let student of students){
//         if(student.marks > highMarks){
//             highMarks = student.marks
//         } else if ( student.marks < lowMarks){
//             lowMarks = student.marks
//         }
//         total += student.marks
//     }

//     let average = total / students.length
//     let result = `
//     Highest : ${highMarks}
//     Lowest : ${lowMarks}
//     Average Marks : ${average}
//     `
//     fs.writeFile("report.txt" , result, (err) => {
//         console.log("written sucessfully");
//     })
// })


//--------------------------------------------------------------------------------


// const fs = require("fs");
// fs.readFile("contest3/events.txt", "utf-8", (err,data) => {
//     if(err){
//         console.log("file not exist");
//         return
//     }

//     let events = data.trim().split("\n")
//     let result = {}
//     for(let event of events){
//         result[event] = (result[event] || 0) + 1
//     }


//     let ans = ""

//     for (let key in result){
//         ans += `${key}: ${result[key]}\n`
//     }

//     fs.writeFile("analytics.txt", ans, (err) => {
//         console.log("Written successfully");
//     })

// })


//--------------------------------------------------------------------------


// const fs = require('fs');
// fs.readFile("contest3/message.txt", "utf-8", (err, data) => {
//     if (err) {
//         console.log("file not present");
//         return;
//     }

//     let upperData = data.trim().toUpperCase();
    
//     fs.writeFile("contest3/uppercase.txt", upperData, (err) => {
//         if (err) {
//             console.log("error writing uppercase file");
//             return;
//         }
//         console.log("written succesfully");

//         fs.readFile("contest3/uppercase.txt", "utf-8", (err, data) => {
//             if (err) {
//                 console.log("error reading uppercase file");
//                 return;
//             }
//             let totalWords = data.trim().split(" ");
//             let ans = `Total words : ${totalWords.length}`;

//             fs.writeFile("contest3/summary.txt", ans, (err) => {
//                 if (err) {
//                     console.log("error writing summary file");
//                     return;
//                 }
//                 console.log("Summary written successfully");
//             });
//         });
//     });
// });


//-------------------------------------------------------------------------


const fs = require('fs');
fs.readFile("contest3/students.json", "utf-8", (err, data) => {
    if (err) {
        console.log("file not present");
        return;
    }
    let students = JSON.parse(data);
    console.log(students)

    fs.readFile("contest3/marks.json", "utf-8", (err, data) => {
        if (err) {
            console.log("file not present");
            return;
        }
        let marks = JSON.parse(data);
        let result =""
        console.log(marks)

        for(let student of students){
            let markdata = marks.find(m => m.id === student.id)
            result += ` ${student.name} - ${markdata.marks}\n`
        }

        fs.writeFile("contest3/reports.txt", result, (err) => {
            if (err) {
                console.log("error while writing report");
                return;
            }
            console.log("report written successfully");
        })
    })
})
