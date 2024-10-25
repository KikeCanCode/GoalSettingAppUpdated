import mysql from "mysql2";

// Create a connection pool
const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "Codingbootcamp2024!",
    database: "goals_setting",
    port: "5432"
}).promise();

// User Signup
export async function addUser(username, password) {
    const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
    await pool.query(query, [username, password]);
}

// Fetch all goals
export async function getAllGoals() {
    const [rows] = await pool.query('SELECT * FROM goals');
    return rows;
}

// Add a new goal
export async function addGoal(title, description, start_date, end_date) {
    const query = 'INSERT INTO goals (title, description, start_date, end_date, progress) VALUES (?, ?, ?, ?, 0)';
    await pool.query(query, [title, description, start_date, end_date]);
}

// Fetch goal by ID
export async function getGoalById(id) {
    const [rows] = await pool.query('SELECT * FROM goals WHERE id = ?', [id]);
    return rows.length > 0 ? rows[0] : null;
}

// Edit a goal
export async function editGoal(id, title, description, start_date, end_date) {
    const query = 'UPDATE goals SET title = ?, description = ?, start_date = ?, end_date = ? WHERE id = ?';
    await pool.query(query, [title, description, start_date, end_date, id]);
}

// Delete a goal
export async function deleteGoal(id) {
    const query = 'DELETE FROM goals WHERE id = ?';
    await pool.query(query, [id]);
}

// Update goal progress
export async function updateProgress(id, progress) {
    const query = 'UPDATE goals SET progress = ? WHERE id = ?';
    await pool.query(query, [progress, id]);
}
