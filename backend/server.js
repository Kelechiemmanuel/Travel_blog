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


const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    
})