import express from "express";
import con from "../utils/db.js";

const router = express.Router();

router.get('/institutions', async (req, res) => {
    try {
        const { type, sortBy, filterBy } = req.query;

        let query = '';
        let table = '';

        switch (type) {
            case 'schools':
                table = 'schools';
                break;
            case 'colleges':
                table = 'colleges';
                break;
            case 'universities':
                table = 'universities';
                break;
            default:
                return res.status(400).json({ error: 'Invalid institution type' });
        }

        query = `SELECT id, name, rating, reviews, awards FROM ${table}`;

        if (filterBy) {
            query += ` WHERE name LIKE '%${filterBy}%'`;
        }

        if (sortBy) {
            query += ` ORDER BY ${sortBy} DESC`;
        } else {
            query += ` ORDER BY rating DESC`;
        }

        query += ' LIMIT 5';

        // Log the final query
        console.log('Executing query:', query);

        con.query(query, (err, results) => {
            if (err) {
                console.error('Error fetching data from MySQL database:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }
            res.json(results);
        });
    } catch (error) {
        console.error('Error handling request:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export { router as institutionRoute };
