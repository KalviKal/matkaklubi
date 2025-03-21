async function registreeriMatkale(matkIndeks){
    const email = document.getElementById('osalejaEmail').value
    console.log(email)
    const uuEmail = {"email": email}
    
    const response = await fetch(`/api/matk/${matkIndeks}/osaleja`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(uuEmail)
    })

    if (response.status === 201){
        alert(email + 'registreerusid matkale')
    }
    else {
        alert('registreerumine ebaõnnestus')
        console.log(response)
    }
    


}