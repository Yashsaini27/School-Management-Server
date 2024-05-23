import express from "express";
import con from "../utils/db.js";

const router=express.Router()

// router.get('/institutions', (req, res) => {
//     const { type } = req.query;
//     let query = 'SELECT * FROM institutions';
//     if (type) {
//         query += ` WHERE type = '${type}'`;
//     }
//     query += ' ORDER BY rating DESC, reviews DESC LIMIT 5';
//     con.query(query, (err, results) => {
//         if (err) throw err;
//         res.send(results);
//     });
// });

// Create an enquiry
router.post('/enquiries', (req, res) => {
    const { name, email, message,date } = req.body;
    con.query(
        'INSERT INTO enquiries (name, email, message,date) VALUES (?, ?, ?, ?)',
        [name, email, message,date],
        (err, results) => {
            if (err) throw err;
            res.send({ id: results.insertId });
        }
    );
});

export {router as parentRouter}