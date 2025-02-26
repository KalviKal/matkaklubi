
const {loeMatkadeAndmed, lisaOsaleja, loeUudisedAndmed} = require("../data")

const naitaMatkad = (req, res) => {
    const matkad = loeMatkadeAndmed()
    console.log(matkad)
    res.render("pages/index", {matkad: matkad})
}


const naitaMatka = (req, res) => {
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
}

const registreeriOsaleja = (req, res) => {
    lisaOsaleja(req.query.matk, req.query.email)
    res.redirect("/matkad")
}

const naitaUudised = (req, res) => {
    const uudised = loeUudisedAndmed()
    console.log(uudised)
    res.render("uudised", {uudised: uudised})
}

module.exports = {
    naitaMatkad,
    naitaMatka,
    registreeriOsaleja,
    naitaUudised
}