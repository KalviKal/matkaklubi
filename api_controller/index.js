const { loeSonumid, lisaSonum:lisaSonumData, loeMatkadeAndmed, lisaMatkData, loeUudisedAndmed} = require('../data')

const tagastaSonumid = (req, res) => {
    const sonumid = loeSonumid()
    res.json(sonumid)
}


const lisaSonum = (req, res) => {
    console.log(req.body)
    lisaSonumData({nimi: req.body.nimi, sonum: req.body.sonum})
    res.status(201).end()
}

const tagastaMatkad = (req, res) => {
    const matkad = loeMatkadeAndmed()
    res.json(matkad)
}

const lisaMatk = (req, res) => {
    console.log(req.body)
    lisaMatkData({
        nimetus: req.body.nimetus, 
        pildiUrl: req.body.pildiUrl, 
        kirjeldus: req.body.kirjeldus,
        osalejad: req.body.osalejad
    })
    res.status(201).end()
}



const tagastaUudised = (req, res) => {
    const uudised = loeUudisedAndmed()
    res.json(uudised)
}


module.exports = {
    tagastaSonumid,
    lisaSonum,
    tagastaMatkad,
    tagastaUudised,
    lisaMatk
}