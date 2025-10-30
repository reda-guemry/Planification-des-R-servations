

let buttonReserve = document.getElementById("buttonReserver") ;
let popup = document.querySelector(".sectionform");
let days = document.querySelectorAll(".days.activ");
let jourSelect = document.getElementById("day-resrve");
let jenereatId = 0 ;
let inputname = document.getElementById("username") ;
let selectday = document.getElementById("day-resrve");
let selecthourdebut = document.getElementById("heurdebut");
let selecthoursfin  = document.getElementById("heurdefin") ;
let selectrypreserve  = document.getElementById("typereserve") ;
let popformmodifi = document.getElementById("formModdifications");
let inputmodifiuser = document.getElementById("modifi-username")
let modifierselectdzy = document.getElementById("modifie-day-resrve")
let

let reservetions = [];

document.addEventListener("click" , function(e){
    if(e.target.tagName === "BUTTON"){
        popup.style.display = "flex";
    }else if(e.target.id === "close__pop"){
        popup.style.display = "none";
        cleardata();
    }else if(e.target.dataset.day){
        addpardyas(e.target.dataset.day);
    }else if(e.target.classList.contains("detaille__reservation")){
        console.log(e.target.dataset.id);
        
        modifier(e.target.dataset.id)
    }
})

function cleardata(){
        inputname.value = "";
    selectday.value = "";
    selecthourdebut.value = "";
    selecthoursfin.value = "";
    selectrypreserve.value = "";
}

function addpardyas(data){
    jourSelect.value = data ;
    popup.style.display = "flex" ;
}

document.querySelector(".form-input").addEventListener("submit" , function(e){
    
    e.preventDefault();

    let result = validdata();
    
    if(!result){
        return;
    }

    

    const resreve = {
        nom : inputname.value,
        jour : selectday.value,
        dateDebut : selecthourdebut.value,
        datefin : selecthoursfin.value,
        typeReserve : selectrypreserve.value,
        ID : jenereatId 
    }
    jenereatId++;

    reservetions.push(resreve);    
    cleardata();  
    popup.style.display = "none";

    affichreservation(resreve);
})

function validdata(){
    for(let i = 0 ; i < inputname.value.length ; i++){
        let char = inputname.value[i];
        if(!isNaN(char) && char !== " "){
            alert("Le nom ne doit pas contenir de chiffres !");
            return false;
        }
    }
    
    if(selecthoursfin.value <= selecthourdebut.value){
        alert("L'heure de fin doit être après l'heure de début !");
        return false ;
    }
    return true;
}

function affichreservation(element) {
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

            newreserve.dataset.id = element.ID ;
            newreserve.innerHTML = `<span>${element.nom}</span> 
                <span>(${element.typeReserve})</span>
                <span>${element.dateDebut} - ${element.datefin}</span>`;

            res.appendChild(newreserve);
        }
    });
}

function modifier(element){
    reservetions.forEach((elemModi) => {
        if(element == elemModi.ID){

            inputname.value = elemModi.nom;
            selectday.value = elemModi.jour;
            selecthourdebut.value = elemModi.dateDebut;
            selecthoursfin.value = elemModi.datefin;
            selectrypreserve.value = elemModi.typeReserve;
            formModdifications.style.display = "flex";
            
        }
    })
}


