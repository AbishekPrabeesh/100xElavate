const express = require('express');
const cors = require('cors');
const { z } = require('zod');
const app = express();
const port = 3000;

app.use(cors()); 
app.use(express.json());

const todos = [];
let counter = 1;

const todoCreateSchema = z.object({
    task: z.string().max(30)
});
app.get('/todos/:id', (req, res) => {
    let index = (req.params.id)-1
    
    res.json({
        success: true,
        data: todos[index]
    });
    
});
app.get('/todos', (req, res) => {
    res.json({
        success: true,
        data: todos
    });
    
});

app.post("/todos", (req, res) => {
    const result = todoCreateSchema.safeParse(req.body);
    
    if (!result.success) {
        return res.status(400).json({
            success: false,
            data: [],
            message:"invalid inputs"
        });
    }

    const { task } = result.data;
    let pushobj = {
        id: counter++,
        task,
        isComplete: false
    };
    
    todos.push(pushobj);

    res.status(201).json({
        success: true,
        data: pushobj,
        message: "Created successfully"
    });
});

app.put("/todos/:id", (req, res) => {
    const todoId = req.params.id;
    const index = todoId - 1;
    let todo = todos[index];
    todo.isComplete = true;
    res.status(200).json({
        success: true,
        data: todo,
        message: "todo updated"
    })
});

app.delete("/todos/:id", (req, res) => {
    const index = req.params.id-1;
    todos.splice(index,1);
    res.status(200).json({
        data: todos
    })
});

app.listen(port, () => {  
    console.log(`Server is running on port ${port}`);
});