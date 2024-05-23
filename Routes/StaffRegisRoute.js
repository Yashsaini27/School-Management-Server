import express from "express";
import con from "../utils/db.js";

const router =express.Router()


// Register a new student

router.post('/register1', (req, res) => {
    const { email, password,confirmpassword, contact_number } = req.body;
    con.query(
        'INSERT INTO staffregis (email, password, confirmpassword, contact_number) VALUES (?, ?, ?, ?)',
        [email, password,confirmpassword, contact_number],
        (err, results) => {
            if (err) {
                console.error('Error registering staff:', err);
                res.status(500).json({ error: 'Internal server error' });
                return;
            }
            res.status(201).json({ success: true, studentId: results.insertId });
        }
    );
});

// Student login
router.post('/login1', (req, res) => {
    const { email, password } = req.body;
    con.query(
        'SELECT * FROM staffregis WHERE email = ? AND password = ?',
        [email, password],
        (err, results) => {
            if (err) {
                console.error('Error logging in student:', err);
                res.status(500).json({ error: 'Internal server error' });
                return;
            }
            if (results.length === 0) {
                res.status(401).json({ error: 'Invalid email or password' });
                return;
            }
            res.status(200).json(results[0]);
        }
    );
});

export {router as staffRouter}