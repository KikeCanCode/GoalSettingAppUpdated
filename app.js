import express from "express";
import bodyParser from "body-parser";
import ejs from "ejs";
import { addGoal, getAllGoals, getGoalById, editGoal, deleteGoal, updateProgress, addUser } from "./database.js";

const app = express();
const port = 3000;

// Set EJS as the view engine
app.set("view engine", "ejs");

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Homepage Route
app.get("/", (req, res) => {
    res.render("signup"); // This will load the sign-up page as your homepage
});

// Signup Route
app.post("/signup", async (req, res) => {
    const { username, password } = req.body;
    await addUser(username, password);
    res.redirect("/goals");
});

// Route to display all goals
app.get("/goals", async (req, res) => {
    const goals = await getAllGoals();
    res.render("index", { goals });

});
// Profile route
app.get('/profile', (req, res) => {
    res.render('profile'); // Render the profile.ejs file
});

// Route to display add goal form
app.get("/add", (req, res) => {
    res.render("add");
});

app.post("/add", async (req, res) => {
    const { title, description, start_date, end_date } = req.body;
    await addGoal(title, description, start_date, end_date);
    res.redirect("/goals");
});

// Route to edit goal
app.get("/edit/:id", async (req, res) => {
    const goalId = req.params.id;
    const goal = await getGoalById(goalId);
    res.render("edit", { goal });
});

app.post("/edit/:id", async (req, res) => {
    const goalId = req.params.id;
    const { title, description, start_date, end_date } = req.body;
    await editGoal(goalId, title, description, start_date, end_date);
    res.redirect("/goals");
});

// Route to delete a goal
app.get("/delete/:id", async (req, res) => {
    const goalId = req.params.id;
    await deleteGoal(goalId);
    res.redirect("/goals");
});

// Route to update goal progress
app.post("/progress/:id", async (req, res) => {
    const goalId = req.params.id;
    const { progress } = req.body;
    await updateProgress(goalId, progress);
    res.redirect("/goals");
});
app.post('/signout', (req, res) => {
    // Handle sign out logic here
    // For example, destroy the session or clear user authentication data

    // Redirect to the homepage or a specific page after signing out
    res.redirect('/');
});
// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});