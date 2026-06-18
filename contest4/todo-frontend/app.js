// A helper function to create HTML elements for a Todo
function renderTodo(id, taskText, isComplete) {
    const divEl = document.createElement("div");
    divEl.setAttribute("id", id);
    
    // If it's already complete, add a class line-through effect and hide complete button
    const textStyle = isComplete ? 'text-decoration: line-through; color: gray;' : '';
    const completeBtnDisplay = isComplete ? 'display: none;' : '';

    divEl.innerHTML = `
        <div id="text-${id}" style="${textStyle}">${taskText}</div> 
        <div style="display: flex; gap: 5px;">
            <button id="btn-complete-${id}" onclick='markComplete(${id})' style="background-color: #3498db; ${completeBtnDisplay}">Complete</button>
            <button onclick='deletetodo(${id})'>Delete</button>
        </div>
    `;
    const parentEl = document.querySelector("body");
    parentEl.appendChild(divEl);
}

// 1. Fetch existing todos when the page loads
async function fetchTodos() {
    const response = await fetch("http://localhost:3000/todos");
    const result = await response.json();
    
    if (result.success) {
        result.data.forEach(todo => {
            renderTodo(todo.id, todo.task, todo.isComplete);
        });
    }
}
window.onload = fetchTodos;

// 2. Add a new todo by sending a POST request
async function addtodo() {
    const inputEl = document.querySelector("input").value;

    if (!inputEl.trim()) return; // Prevent adding empty tasks

    const response = await fetch("http://localhost:3000/todos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json" // tells the backend we are sending JSON
        },
        body: JSON.stringify({ task: inputEl })
    });

    const result = await response.json();

    if (result.success) {
        // Only update the DOM if the server successfully saved it
        renderTodo(result.data.id, result.data.task, false);
        document.querySelector("input").value = ""; // clear the input box
    } else {
        alert("Failed to add todo: " + result.message);
    }
}

// 3. Mark as complete using PUT
async function markComplete(id) {
    const response = await fetch(`http://localhost:3000/todos/${id}`, {
        method: "PUT"
    });

    if (response.ok) {
        // Visually update the UI 
        const textElement = document.getElementById(`text-${id}`);
        const completeBtn = document.getElementById(`btn-complete-${id}`);
        
        if (textElement) {
            textElement.style.textDecoration = 'line-through';
            textElement.style.color = 'gray';
        }
        if (completeBtn) {
            completeBtn.style.display = 'none'; // Hide the complete button
        }
    }
}

// 4. Delete a todo by sending a DELETE request
async function deletetodo(id) {
    const response = await fetch(`http://localhost:3000/todos/${id}`, {
        method: "DELETE"
    });
    
    if (response.ok) {
        // Only remove it from the page if the server successfully deleted it
        const element = document.getElementById(id);
        if (element) {
            element.parentNode.removeChild(element);
        }
    }
}