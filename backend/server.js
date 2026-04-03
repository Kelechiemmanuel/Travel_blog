const express = require('express');
const cors = require ('cors');
const { Pool } = require('pg');
require('dotenv').config();
const app = express();
app.use(cors());
app.use(express.json());


const pool = new Pool({
connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false, 
    }
})

app.get('/', async  (req, res) => {
    const client = await pool.connect();
    try {
        const result = await client.query("SELECT * FROM posts");
        res.json(result.rows);
    } catch (error) {
        console.log(error);
    } finally{
        client.release();
    }
})

app.post('/', async (req, res) => {
    const {title, description} = req.body;
    try {
        const result = await pool.query("INSERT INTO posts (title, description) VALUEs ($1, $2) RETURNING *", [title, description]);
        res.json(result.rows[0])
    } catch (error) {
        console.log(error);
        
    }

})


const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    
})