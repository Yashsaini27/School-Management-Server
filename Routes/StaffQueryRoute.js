// In your Express server
import express from "express"
import con from "../utils/db.js";
 const router=express.Router()
// Get student queries
router.get('/student-queries', (req, res) => {
    // Assuming student queries data is stored in a table named student_queries in the database
    con.query('SELECT * FROM queries', (err, results) => {
        if (err) {
            console.error('Error fetching student queries:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.json(results);
    });
});

export {router as stafRouter}