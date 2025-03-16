
const adminSisu = document.getElementById('admin-sisu')

let matkad = []


async function loeSonumid() {
    const result = await fetch('/api/sonumid')
    if (!result.ok){
        console.log('Viga andmete lugemisel')
        return;
    }

    const sonumid = await result.json()
    console.log(sonumid)
    
}


async function loeMatkadJaKuvaLeht() {
    const result = await fetch('/api/matkad')
    if (!result.ok){
        console.log('Viga andmete lugemisel')
        return;
    }

    matkad = await result.json()
    //console.log(matkad)
    adminSisu.innerHTML = looLeheHTML(matkad)
    naitaParemPaan(0)
}




loeSonumid()



function looLeheHTML(matkad) {
    const vasakPaan = looVasakPaanHTML(matkad)
    return `
    <div class="row">
        <div class="col-4">
            ${vasakPaan}
        </div>
        <div id="parem-paan-sisu" class="col-8">
            siia tuleb parem paan
        </div>
    </div>
    `
}


function looVasakPaanHTML(matkad){
    const matkaInfo = `
        <div>
            esimene matk
        </div>
        `
    
    let vasakPaan = ''
    let id = 0
    for (matk of matkad) {
        vasakPaan += `
        <div class="vasak-paan-valik" onclick="naitaParemPaan(${id})">
            ${matk.nimetus}
        </div>
        `
        id += 1
    }
    return vasakPaan
}

function naitaParemPaan(matkaId){
    const paremPaan = document.getElementById('parem-paan-sisu')
    const matk = matkad[matkaId]

    let osalejadHTML = ''
    matk.osalejad.forEach(email => {
        osalejadHTML += `
            <li>${email}</li>
        `
    });

    const paremPaanHtml = `
        <h3>${matk.nimetus}</h3>
        <div>${matk.kirjeldus}</div>
        <ol>
            ${osalejadHTML}
        </ol>
    `
    paremPaan.innerHTML = paremPaanHtml
}


loeMatkadJaKuvaLeht()




async function lisaUudis_ei_ole_kasutuses() {
    const uudiselisamine = await fetch('/api/uudised', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            pealkiri: "Test  Uudis",
            uudisepiltUrl: "/assets/hiking3.png",
            kokkuvote: "erejfef"
        })
    }

    )
    const responseData = await uudiselisamine;
    console.log('Success:', responseData);
    
}

// Get the form element
const form = document.getElementById('uudiseForm');

// Create a function to handle form submission
async function lisaUudis(event) {
    //event.preventDefault(); // Prevent the default form submission

    // Create a FormData object from the form
    const formData = new FormData(form);

    // Convert FormData to a plain object
    const formObject = {};
    formData.forEach((value, key) => {
        formObject[key] = value;
    });

    // Convert the plain object to a JSON string
    const formJSON = JSON.stringify(formObject);

    try {
        // Send the POST request
        const response = await fetch('/api/uudised', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: formJSON
        });

        // Handle the response
        if (response.ok) {
            const responseData = await response;
            console.log('Success:', responseData);
        } else {
            console.error('Error:', response.statusText);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Add event listener to the form
form.addEventListener('submit', lisaUudis);