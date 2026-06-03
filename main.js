const express = require('express');

const app = express();
const PORT = process.env.PORT || 8080;

const urlRoute = require('./src/routes/url.route');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    res.send("Server Is On GET")
});
app.use('/url', urlRoute) // POST /url/create | GET /url/

app.listen(PORT, () => console.log(`server is listen on http://localhost:${PORT}`))
