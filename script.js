

let buttonReserve = document.getElementById("buttonReserver") ;
let popup = document.querySelector(".sectionform");
let days = document.querySelectorAll(".days.activ");
let jourSelect = document.getElementById("day-resrve");

let reservetions = [];

document.addEventListener("click" , function(e){
    if(e.target.tagName === "BUTTON"){
        popup.style.display = "flex";
        affichreservations();
    } else if(e.target.id === "close__pop"){
        popup.style.display = "none";
    }

})

days.forEach((daysdivs , indix) => {
    daysdivs.addEventListener("click" , function() {
        popup.style.display = "flex" ;
        if( indix < jourSelect.options.length) {
            jourSelect.value = jourSelect.options[indix + 1].value ;
        }
    })
})

document.querySelector(".form-input").addEventListener("submit" , function(e){
    
    e.preventDefault();

    let inputname = document.getElementById("username") ;
    let selectday = document.getElementById("day-resrve");
    let selecthoursebut = document.getElementById("heurdebut");
    let selecthoursfin  = document.getElementById("heurdefin") ;
    let selectrypreserve  = document.getElementById("typereserve") ;


    const resreve = {
        nom : inputname.value,
        jour : selectday.value,
        dateDebut : selecthoursebut.value,
        datefin : selecthoursfin.value,
        typeReserve : selectrypreserve.value
    }

    for(let i = 0 ; i < resreve.nom.length ; i++){
        let char = resreve.nom[i];

        if(!isNaN(char) && char !== " "){
            alert("Le nom ne doit pas contenir de chiffres !");
            return false ;
        }
    }
    
    if(resreve.datefin <= resreve.dateDebut){
        alert("L'heure de fin doit être après l'heure de début !");
        return false ;
    }
     if(!resreve.datefin ||!resreve.jour ||!resreve.dateDebut ||!resreve.typeReserve ) {
        alert("Veuillez remplir tous les champs obligatoires !");
        return false ;
     }
    
    reservetions.push(resreve);
    popup.style.display = "none";
    alert('Réservation ajoutée avec succès !');
    
    inputname.value = "";
    selectday.value = "";
    selecthoursebut.value = "";
    selecthoursfin.value = "";
    selectrypreserve.value = "";

    affichreservationUnique(resreve);
    console.log(reservetions);
})


function affichreservationUnique(element) {
    days.forEach((res) => {
        if (res.dataset.day === element.jour) {
            
            const newreserve = document.createElement("div");
            newreserve.classList.add("detaille__reservation");

            switch (element.typeReserve) {
                case "sur place":
                    newreserve.style.background = "gray";
                    break;
                case "VIP":
                    newreserve.style.background = "gold";
                    break;
                case "anniversaire":
                    newreserve.style.background = "red";
                    break;
            }

            newreserve.innerHTML = `<span>${element.nom}</span> 
                <span>(${element.typeReserve})</span>
                <span>${element.dateDebut} - ${element.datefin}</span>`;

            res.appendChild(newreserve);
            
        }
    });
}



