const { 
    loeSonumid, 
    lisaSonum:lisaSonumData, 
    loeMatkadeAndmed, 
    lisaMatkData, 
    loeUudisedAndmed, 
    lisaUudisData, 
    lisaOsaleja,
    eemaldaUudisData,
    eemaldaOsaleja
    } = require('../data')

const tagastaSonumid = (req, res) => {
    const sonumid = loeSonumid()
    res.json(sonumid)
}


const lisaSonum = (req, res) => {
    console.log(req.body)
    lisaSonumData({nimi: req.body.nimi, sonum: req.body.sonum})
    res.status(201).end()
}

 const tagastaMatkad = async (req, res) => {
    const matkad = await loeMatkadeAndmed()
    //console.log(matkad)
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

const lisaUudis = (req, res) => {
    console.log(req.body)
    lisaUudisData({
        pealkiri: req.body.pealkiri, 
        uudisepiltUrl: req.body.uudisepiltUrl, 
        kokkuvote: req.body.kokkuvote
    })
    res.status(201).end()
}

async function lisaOsalejaCtrl(req, res) {
    if (!req.body.email) {
        res.status(403).end({error: "email ei tohi olla tühi!"})
        return
    }
    if (!req.params.id){
        res.status(403).end({error: "matka id'd ei ole antud"})
        return
    }
    try{
        const result = await lisaOsaleja(req.params.id, req.body.email)
        if (result){
            res.status(201).end()
        } else {
            res.status(401).end({error: "osaleja lisamine ebaõnnestus"})
        }
    } catch (error){
        res.status(401).end({error: "osaleja lisamine ebaõnnestus"})
        return
    }
}


async function kustutaOsalejaCtrl(req, res) {
    
    if (!req.params.id){
        res.status(403).end({error: "matka id'd ei ole antud"})
    }
    if (!req.params.osalejaId){
        res.status(403).end({error: "osaleja id'd ei ole antud"})
    }

    const result = await eemaldaOsaleja(req.params.id, req.params.osalejaId)
    if (result){
        res.status(200).end()
    } else {
        res.status(401).end({error: "osaleja lisamine ebaõnnestus"})
    }
}




const eemaldaUudis = (req, res) => {
    if (!req.params.id){
        res.status(403).end({error: "uudise id'd ei leitud"})
    }
    console.log(req.body)
    eemaldaUudisData(req.params.id)
    res.status(200).end()
}



module.exports = {
    tagastaSonumid,
    lisaSonum,
    tagastaMatkad,
    tagastaUudised,
    lisaMatk,
    lisaUudis,
    lisaOsalejaCtrl,
    eemaldaUudis,
    kustutaOsalejaCtrl
}