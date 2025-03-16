const express = require('express')

const path = require("path")

const {naitaMatkad, naitaMatka, registreeriOsaleja, naitaUudised, naitaUudis, naitaKontakt, tootleSonum, looMatk, tootleUudis } =require("./controller");
const { tagastaSonumid, lisaSonum, tagastaMatkad, tagastaUudised, lisaMatk, lisaUudis } = require('./api_controller');


const app = express();
app.use(express.static("public"))
const PORT = process.env.PORT || 3030
// For API endpoint to understand json input
app.use(express.json())

app.use(express.urlencoded())

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");


app.get("/test",(req, res) => {
    res.send(`
        <h1>test test</h1>
        `)
})


app.get('/', naitaMatkad)
app.get('/matk/:id', naitaMatka)
app.get('/registreeru', registreeriOsaleja)
app.get('/uudised', naitaUudised)
app.get('/uudis/:id', naitaUudis)
app.get('/kontakt', naitaKontakt)

app.post('/kontakt', tootleSonum)

// API endpointid
app.get('/api/sonumid', tagastaSonumid)
app.post('/api/sonumid', lisaSonum)
app.get('/api/matkad', tagastaMatkad)
app.post('/api/matkad', lisaMatk)
app.get('/api/uudised', tagastaUudised)
app.post('/api/uudised', lisaUudis)


app.post('/api/matk', looMatk)


// Admin
app.get('/admin', (req, res) => {res.render('pages/admin')})

app.post('/admin', tootleUudis)

app.listen(PORT, () => console.log('Matkaklubi töötab pordil: ' + PORT))