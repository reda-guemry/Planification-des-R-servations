

let buttonReserve = document.getElementById("buttonReserver") ;
let popup = document.querySelector(".sectionform");
let days = document.querySelectorAll(".days.activ");
let jourSelect = document.getElementById("day-resrve");

let reservetions = [];

document.addEventListener("click" , function(e){
    if(e.target.tagName === "BUTTON"){
        popup.style.display = "flex";
    } else if(e.target.id === "close__pop"){
        popup.style.display = "none";
        affichreservations();
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


    const resreve = {
        nom : document.getElementById("username").value,
        jour : document.getElementById("day-resrve").value,
        dateDebut : document.getElementById("heurdebut").value,
        datefin : document.getElementById("heurdefin").value,
        typeReserve : document.getElementById("typereserve").value
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
    affichreservations();
    alert('Réservation ajoutée avec succès !');

    
    console.log(reservetions);
})


function affichreservations()


