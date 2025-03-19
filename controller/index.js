
const {loeMatkadeAndmed, lisaOsaleja, loeUudisedAndmed, lisaSonum, loeSonumid, lisaMatkData, lisaUudisData} = require("../data")

const naitaMatkad =  async (req, res) => {
    const matkad = await loeMatkadeAndmed()
    //console.log(matkad)
    res.render("pages/index", {matkad: matkad})
}


/* const naitaMatka = (req, res) => {
    const matkad = loeMatkadeAndmed()
    const matkaIndeks = req.params.id
    const matk = matkad[matkaIndeks]
    res.send(`
        <html>
            <body>
                <h1>
                    ${matk.nimetus}
                </h1>
                <div>
                    ${matk.kirjeldus}
                </div>
            </body>
        </html>
        `)
} */

const naitaMatka =  async (req, res) => {
    const matkad =  await loeMatkadeAndmed()
    const matkaIndeks = req.params.id
    const matk = matkad[matkaIndeks]
    res.render("pages/matk", {matk: matk})
}

const naitaKontakt = (req, res) => {
    res.render("pages/kontakt")
}


const registreeriOsaleja = async (req, res) => {
    await lisaOsaleja(req.query.matk, req.query.email)
    res.redirect("/matkad")
}

const naitaUudised = (req, res) => {
    const uudised = loeUudisedAndmed()
    console.log(uudised)
    res.render("pages/uudised", {uudised: uudised})
}

const naitaUudis = (req, res) => {
    const uudised = loeUudisedAndmed()
    const uudisIndeks = req.params.id
    const uudis = uudised[uudisIndeks]
    res.render("pages/uudis", {uudis: uudis})
}

const tootleSonum = (req, res) => {
    console.log(req.body)
    lisaSonum({nimi: req.body.nimi, sonum: req.body.markus})
    console.log(loeSonumid())
    //res.send(
    //    `
    //    <h2>Sõnum on edukalt edastatud! </h2>
    //    `
    //)
    const sonumid = loeSonumid()
    res.render("pages/sonumid", {sonumid: sonumid})
}



async function looMatk(req, res){
    const matk = {
        nimetus: req.body.nimetus,
        pildiUrl: "/assets/Hills.png",
        kirjeldus: req.body.kirjeldus,
        osalejad: []
    }
    await lisaMatkData(matk)
    res.status(201).end()
}

module.exports = {
    naitaMatkad,
    naitaMatka,
    registreeriOsaleja,
    naitaUudised,
    naitaUudis,
    naitaKontakt,
    tootleSonum,
    looMatk
    
}