let tasks = [];
import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));  

app.get("/", (req,res)=>{
    res.render("index.ejs", {tasks});
});


app.get("/new", (req, res)=>{
    res.render("new.ejs");
});

app.post("/", (req, res) => {
  const newTask = {
    id: Date.now(),
    subject: req.body.subject,
    deadline: req.body.deadline,
    priority: req.body.priority,
    completed: false
  };

  tasks.push(newTask);

  res.redirect("/");
});

app.post("/delete/:id", (req, res) => {
  const id = Number(req.params.id);

  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id === id) {
      tasks.splice(i, 1);
      break;
    }
  }

  res.redirect("/");
});


app.post("/edit/:id", (req, res) => {
  const id = Number(req.params.id);

  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id === id) {
      tasks[i].subject = req.body.subject;
      tasks[i].deadline = req.body.deadline;
      tasks[i].priority = req.body.priority;
      break;
    }
  }

  res.redirect("/");
});

app.get("/edit/:id", (req, res) => {
  const id = Number(req.params.id);

  let taskToEdit;
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id === id) {
      taskToEdit = tasks[i];
      break;
    }
  }

  if (!taskToEdit) {
    return res.redirect("/");
  }

  res.render("edit", { task: taskToEdit });
});

app.post("/toggle/:id", (req, res) => {
  const id = Number(req.params.id);

  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id === id) {
      tasks[i].completed = !tasks[i].completed;
      break;
    }
  }

  res.redirect("/");
});

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
});