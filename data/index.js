// MongoDB
const {MongoClient} = require("mongodb")
const andmebaas = "matka-app-2111"
const salasona = "zmar6.6RGDNgx"
//const mongoUrl = `mongodb+srv://matka-app:${salasona}@cluster0.vpkdv.mongodb.net/${andmebaas}?retryWrites=true&w=majority`
const mongoUrl = `mongodb+srv://matkaapp:${salasona}@cluster0.7caxa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
const client = new MongoClient(mongoUrl);





const matk1 = {
    nimetus: "Sügismatk Kõrvemaal",
    pildiUrl: "/assets/Hills.png",
    kirjeldus: "Lähme ja oleme kolm päeva looduses",
    osalejad: ["mati@matkaja.ee", "kati@matkaja.ee"]
 }
 
 
 const matk2 = {
    nimetus: "Süstamatk Hiiumaal",
    pildiUrl: "/assets/Hiker.png",
    kirjeldus: "Lähme ja oleme kolm päeva vee peal",
    osalejad: ["mati@matkaja.ee", "kati@matkaja.ee", "uudo@ryhkija.ee"]
 }
 
 
 const matkad = [
    matk1,
    matk2,
    {
        nimetus: "Mägimatk Otepääl",
        pildiUrl: "/assets/Hills.png",
        kirjeldus: "Lähme ja oleme kolm päeva mägedes",
        osalejad: ["uudo@ryhkija.ee"]
    }
 ]
 

 function loeMatkadeAndmed(){
    return matkad
 }

 function lisaMatkData({nimetus, pildiUrl, kirjeldus, osalejad}){
   matkad.push({nimetus, pildiUrl, kirjeldus, osalejad})
 }

// MongoDB jaoks
async function lisaMatkData(matk){

   try {
      await client.connect();
      const database = client.db(andmebaas);
      const matkad = database.collection("matkad");
      const result = await matkad.insertOne(matk)
      console.log(`A document was inserted with the _id: ${result.insertedId}`)
    } finally {
      await client.close();
    }
   
}


 function lisaOsaleja(matkaIndeks, osalejaEmail){
    const matk = matkad[matkaIndeks]
    if (!matk) {
        throw Error("Otsitavat matka ei ole!")
    }
    if (!osalejaEmail){
        throw Error("Osaleja E-mail puudub!")
    }

    if (matk.osalejad.findIndex( el => el === osalejaEmail) !== -1) {
        throw Error("Osaleja on juba regisreerunud")
    }

    matk.osalejad.push(osalejaEmail)
 }


 const uudised = [
   {
       pealkiri: "Uus Mägimatk Otepääl",
       uudisepiltUrl: "/assets/hiking1.png",
       kokkuvote: "Lähme ja oleme kolm päeva mägedes"
   },
   {
      pealkiri: "Orienteerumine Pirital",
      uudisepiltUrl: "/assets/hiking2.png",
      kokkuvote: "Lähme ja oleme kolm päeva mägedes"
  },
  {
      pealkiri: "Rännak Paldiskis",
      uudisepiltUrl: "/assets/hiking3.png",
      kokkuvote: "Lähme ja oleme kolm päeva mägedes"
   },
   {
      pealkiri: "Rännak Aegviidus",
      uudisepiltUrl: "/assets/hiking3.png",
      kokkuvote: "Lähme ja oleme kolm päeva mägedes"
   },
   {
      pealkiri: "Matk ümber Nelijärve",
      uudisepiltUrl: "/assets/hiking2.png",
      kokkuvote: "Lähme ja oleme kolm päeva mägedes"
   },
   {
      pealkiri: "Matk Pranglil",
      uudisepiltUrl: "/assets/hiking1.png",
      kokkuvote: "Lähme ja oleme kolm päeva mägedes"
   }
]

function loeUudisedAndmed(){
   return uudised
}


const sonumid = []


function lisaSonum({nimi, sonum}){
   sonumid.push({nimi, sonum})
}

function loeSonumid(){
   return sonumid
}

 module.exports = {
    loeMatkadeAndmed,
    lisaMatkData,
    lisaOsaleja,
    loeUudisedAndmed,
    lisaSonum,
    loeSonumid
 }