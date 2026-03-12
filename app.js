const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send("🚀 DevOps Project 4 Running on Amazon Linux EC2");
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
