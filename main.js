const express = require('express');

const app = express();
const PORT = process.env.PORT | 8080;

app.get("/",(req,res)=>{
    res.send("Server Is On GET")
});

app.listen(PORT,()=> console.log(`server is listen on http://localhost:${PORT}`))