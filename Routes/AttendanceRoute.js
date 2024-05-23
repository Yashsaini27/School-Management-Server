import express from "express";
import con from "../utils/db.js";

const router = express.Router();




// Create
router.post('/attendance', (req, res) => {
    const { name, class: studentClass, attendance_status, date } = req.body;
    con.query(
        'INSERT INTO attendance (name, class, attendance_status, date) VALUES (?, ?, ?, ?)',
        [name, studentClass, attendance_status, date],
        (err, results) => {
            if (err) throw err;
            res.send({ id: results.insertId });
        }
    );
});

// Read
router.get('/attendance', (req, res) => {
    con.query('SELECT * FROM attendance', (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

// Update
router.put('/attendance/:id', (req, res) => {
    const { name, class: studentClass, attendance_status, date } = req.body;
    const { id } = req.params;
    con.query(
        'UPDATE attendance SET name = ?, class = ?, attendance_status = ?, date = ? WHERE id = ?',
        [name, studentClass, attendance_status, date, id],
        (err, results) => {
            if (err) throw err;
            res.send(results);
        }
    );
});

// Delete
router.delete('/attendance/:id', (req, res) => {
    const { id } = req.params;
    con.query('DELETE FROM attendance WHERE id = ?', [id], (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

export {router as attendanceRouter}

