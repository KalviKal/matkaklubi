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
 
 
 let matkad = null
 

 async function loeMatkadeAndmed(){
   if (matkad !== null) {
      return matkad
   }
   try {
      await client.connect();
      const database = client.db(andmebaas);
      const matkadCollection = database.collection("matkad");
      matkad = await matkadCollection.find({}).toArray()
      //console.log(matkad)
      return matkad
    } catch(error) {
      console.log(error.message)
      return []
    } finally {
      await client.close();
    }
 }

 function lisaMatkData({nimetus, pildiUrl, kirjeldus, osalejad}){
   matkad.push({nimetus, pildiUrl, kirjeldus, osalejad})
 }

// MongoDB jaoks
async function lisaMatkData(matk){
   matkad.push(matk)
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

async function _muudaMatkaOsalejaid(matk) {
   try {
      await client.connect();
      const database = client.db(andmebaas);
      const matkad = database.collection("matkad");
      const result = await matkad.updateOne(
         {_id: matk._id},
         {
            $set: {osalejad: matk.osalejad}
         }
      )
      return true
    } finally {
      await client.close();
    }
   
 }

 async function lisaOsaleja(matkaIndeks, osalejaEmail){
      await loeMatkadeAndmed()
    const matk = matkad[matkaIndeks]
    if (!matk) {
        throw Error("Otsitavat matka ei ole!")
    }
    if (!osalejaEmail){
        throw Error("Osaleja E-mail puudub!")
    }

    if (matk.osalejad.findIndex( el => el === osalejaEmail) !== -1) {
        throw Error("Osaleja on juba registreerunud")
    }

    matk.osalejad.push(osalejaEmail)
    _muudaMatkaOsalejaid(matk)


 }


 

 async function eemaldaOsaleja(matkaId, osalejaId) {
   if (typeof matkad[matkaId] === 'undefined'){
      throw Error("Otsitavat matka ei ole")
   }
   
   const matk = matkad[matkaId]
   let osalejad = matk.osalejad

   delete osalejad[osalejaId]
   // filtereerisime empty elemendi
   osalejad = osalejad.filter(el => el)

   matk.osalejad = osalejad
   await _muudaMatkaOsalejaid(matk)
   return true
    
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

function lisaUudisData({pealkiri, uudisepiltUrl, kokkuvote }){
   uudised.push({pealkiri, uudisepiltUrl, kokkuvote})
}


function eemaldaUudisData(uudiseIndeks){
   const uudised = loeUudisedAndmed()
   const uudis = uudised[uudiseIndeks]
   if (!uudis) {
      throw Error("Otsitavat matka ei ole!")
   }
   console.log(uudised.length)
   uudised.splice(uudiseIndeks, 1)
   console.log(uudised.length)

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
    loeSonumid,
    lisaUudisData,
    eemaldaUudisData,
    eemaldaOsaleja
    
 }