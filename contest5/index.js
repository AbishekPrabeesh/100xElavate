const express = require('express');
const app = express();
const {z} = require ('zod');
app.use(express.json());
cntr=0;
const db = {
  users: [],
  movies: [
    {
      id:1,
      title:"Inception",
      genre:"Sci-Fi",
      duration:148,
      shows: [
        {
          showId:101,
          time:"10:00 AM",
          pricePerSeat:200,
          availableSeats:50
        },
        {
          showId:102,
          time:"2:00 PM",
          pricePerSeat:250,
          availableSeats:50
        },
        {
          showId:103,
          time:"6:00 PM",
          pricePerSeat:300,
          availableSeats:50
        }
      ]
    },
    {
      id:2,
      title:"The Dark Knight",
      genre:"Action",
      duration:152,
      shows: [
        {
          showId:201,
          time:"11:00 AM",
          pricePerSeat:200,
          availableSeats:50
        },
        {
          showId:202,
          time:"3:00 PM",
          pricePerSeat:250,
          availableSeats:50
        },
        {
          showId:203,
          time:"7:00 PM",
          pricePerSeat:300,
          availableSeats:50
        }
      ]
    },
    {
      id:3,
      title:"Interstellar",
      genre:"Sci-Fi",
      duration:169,
      shows: [
        {
          showId:301,
          time:"12:00 PM",
          pricePerSeat:250,
          availableSeats:50
        },
        {
          showId:302,
          time:"5:00 PM",
          pricePerSeat:300,
          availableSeats:50
        }
      ]
    }
  ]
}

const schema = z.object({
    username: z.string(),
    password: z.string(),
    email: z.string().email("invalid email address")
});

app.post("/signup", function(req, res) {
    const result = schema.safeParse(req.body);

    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;

    if (db.users.find(u => u.username === username)) {
        return res.status(400).json({ 
            error: "Username already taken" 
        });
    }

    db.users.push({
        id: ++cntr,
        username, 
        password,
        email
    });
    
    return res.status(201).json({
        success: true,
        message: "User created successfully",
        userId: cntr
    });

});

app.post("/signin", function(req, res) {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;

    const user = db.users.find(u => u.username === username && u.password === password);
    if (!user) {
        return res.status(401).json({
            message: "Invalid credentials"
        });
    }
    const token = Math.random().toString();
    user.token = token;

    res.status(200).json({
        success:true,
        message:"Signin successful",
        token: token

    });

    console.log(db.users);
});

app.get("/movies", function(req, res) {
    return res.status(200).json({
        movies: db.movies
    });
});
app.get("/movies/:movieId", function(req, res) {
    const movie = db.movies.find(m => m.id === parseInt(req.params.movieId));
    if (!movie) {
        return res.status(404).json({
            message: "Movie not found"
        });
    }

    return res.status(200).json({
        movie: movie
    });
});

app.get("/bookings/:userId", function(req, res){
    const movieId = req.body.movieId;
    const userId = req.body.userId;
    const seats = req.body.seats;
})

const port = 3000;
app.listen(port, function() {
    console.log(`Server is running on port ${port}`);
});