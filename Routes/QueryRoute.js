import express from 'express';
import con from '../utils/db.js';

const router=express.Router()


router.get('/students', (req, res) => {
    con.query('SELECT * FROM students', (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

// Get student by ID
router.get('/students/:id', (req, res) => {
    const { id } = req.params;
    con.query('SELECT * FROM students WHERE id = ?', [id], (err, results) => {
        if (err) throw err;
        res.send(results[0]);
    });
});

// Create a new student
router.post('/students', (req, res) => {
    const { name, email, course } = req.body;
    con.query('INSERT INTO students (name, email, course) VALUES (?, ?, ?)', [name, email, course], (err, results) => {
        if (err) throw err;
        res.send({ id: results.insertId });
    });
});

// // Create a new review
// router.post('/reviews', (req, res) => {
//     const { student_id, review } = req.body;
//     con.query('INSERT INTO reviews (student_id, review) VALUES (?, ?)', [student_id, review], (err, results) => {
//         if (err) throw err;
//         res.send({ id: results.insertId });
//     });
// });

// // Create a new query
// router.post('/queries', (req, res) => {
//     const { student_id, query } = req.body;
//     con.query('INSERT INTO queries (student_id, query) VALUES (?, ?)', [student_id, query], (err, results) => {
//         if (err) throw err;
//         res.send({ id: results.insertId });
//     });
// });

// In index.js or your Express server file

// Get all reviews
router.get('/reviews', (req, res) => {
    // Assuming reviews are stored in a reviews table in the database
    con.query('SELECT * FROM reviews', (err, results) => {
        if (err) {
            console.error('Error fetching reviews:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.json(results);
    });
});

// Create a query
router.post('/student-query', (req, res) => {
    const { name, email, message ,date} = req.body;
    if (!name || !email || !message || !date) {
        res.status(400).json({ error: 'Please provide name, email, and message' });
        return;
    }
    // Assuming queries are stored in a queries table in the database
    con.query(
        'INSERT INTO queries (name, email, message,date) VALUES (?, ?, ?, ?)',
        [name, email, message,date],
        (err, results) => {
            if (err) {
                console.error('Error submitting query:', err);
                res.status(500).json({ error: 'Internal server error' });
                return;
            }
            res.json({ success: true, queryId: results.insertId });
        }
    );
});


export {router as QueryRouter}
