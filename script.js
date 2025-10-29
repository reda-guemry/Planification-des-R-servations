

let buttonReserve = document.getElementById("buttonReserver") ;
let popup = document.querySelector(".sectionform");

let reservetions = [];

document.addEventListener("click" , function(e){
    if(e.target.tagName === "BUTTON"){
        popup.style.display = "flex";
    } else if(e.target.id === "close__pop"){
        popup.style.display = "none";
    }
    
})

document.querySelector(".form-input").addEventListener("submit" , function(e){
    
    e.preventDefault();
    const regex = /^[A-Za-z\s\u0621-\u064A]+$/;


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
    alert('Réservation ajoutée avec succès !');

})
