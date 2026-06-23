const users = []
const courses = [
    {
        id: 1,
        title: "100x Web Dev",
        description: "Learn full stack development",
        price: 50,
        imageLink: "https://example.com/image.png",
        published: true
    }
];

let db = {
    users: users,
    courses: courses
};


module.exports = db;