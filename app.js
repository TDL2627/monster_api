const express = require('express');
const pool = require('./db')
const app = express();



app.get('/monsters',(request, response, next)=>{
    pool.query('SELECT * FROM monsters ORDER BY id ASC', (err, res)=>{
        if(err) next(err);

        response.json(res.rows);
        });
});


app.get('/monsters/:id',(request, response, next)=>{
const{ id}=request.params;
pool.query('SELECT * FROM monsters WHERE id = $1', [id], (err, res) =>{
if(err) return next(err);
response.json(res.rows);
});
});


app.use((err, req, res, next)=>{
res.json(err);
});

module.exports = app;
