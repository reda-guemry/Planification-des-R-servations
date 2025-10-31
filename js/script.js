

let buttonReserve = document.getElementById("buttonReserver") ;
let popup = document.querySelector(".sectionform");
let days = document.querySelectorAll(".days.activ");
let jourSelect = document.getElementById("day-resrve");
let inputname = document.getElementById("username") ;
let selectday = document.getElementById("day-resrve");
let selecthourdebut = document.getElementById("heurdebut");
let selecthoursfin  = document.getElementById("heurdefin") ;
let selectrypreserve  = document.getElementById("typereserve") ;
let inputnombreperson = document.getElementById("nombreprsn");
let popformmodifi = document.getElementById("formModdifications");
let inputmodifiuser = document.getElementById("modifi-username");
let modifierselectday = document.getElementById("modifie-day-resrve");
let modifselectheurdebut = document.getElementById("modif-heurdebut");
let modifelectheurfin = document.getElementById("modif-heurdefin");
let modifselecttypereserve = document.getElementById("modif-typereserve");
let modifinputnombreperson = document.getElementById("modif-nombreprsn")
let currentidetid ;
let currentelementedit ;

let reservetions = JSON.parse(localStorage.getItem("data")) || [];

let jenereatId = reservetions.length > 0 ? reservetions[reservetions.length - 1].ID + 1 : 0 ;

reservetions.forEach((resr) => {
    affichreservation(resr);
})

document.addEventListener("click" , function(e){
    if(e.target.id === "buttonReserver"){
        popup.style.display = "flex";
        
    }else if(e.target.id === "close__pop"){
        popup.style.display = "none";
        cleardata();

    }else if(e.target.dataset.day){
        addpardyas(e.target.dataset.day);

    }else if(e.target.classList.contains("detaille__reservation")){
        modifier(e.target.dataset.id , e.target)

    }else if(e.target.id === "clos_modifform"){
       popformmodifi.style.display = "none" 

    }
})

function cleardata(){
    inputname.value = "";
    selectday.value = "";
    selecthourdebut.value = "";
    selecthoursfin.value = "";
    inputnombreperson.value = "";
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
        nombreperson : inputnombreperson.value,
        ID : jenereatId 
    }
    jenereatId++;

    reservetions.push(resreve);
    localStorage.setItem("data" , JSON.stringify(reservetions));
    console.log(JSON.parse(localStorage.getItem("data")));
    
    cleardata();  
    popup.style.display = "none";

    affichreservation(resreve);
})

function validdatamodif(){
    for(let i = 0 ; i < inputmodifiuser.value.length ; i++){
        let char = inputmodifiuser.value[i];
        if(!isNaN(char) && char !== " "){
            alert("Le nom ne doit pas contenir de chiffres !");
            return false;
        }
    }
    
    if(modifelectheurfin.value <= modifselectheurdebut.value){
        alert("L'heure de fin doit être après l'heure de début !");
        return false ;
    }
    for(ele of reservetions) {
        if(ele.jour == modifierselectday.value && currentidetid != ele.ID){ 
            if(modifselectheurdebut.value == ele.dateDebut){
                alert("Cette heure est déjà réservée !");
                return false ;
            }
        }
    }
    
    return true;
}


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
    
    for(ele of reservetions) {
        if(ele.jour == selectday.value)
            if(selecthourdebut.value == ele.dateDebut){
                alert("Cette heure est déjà réservée !");
                return false ;
            }
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

function modifier(element , element2){
    
    reservetions.forEach((elemModi) => {
        if(element == elemModi.ID){
            inputmodifiuser.value = elemModi.nom;
            modifierselectday.value = elemModi.jour;
            modifselectheurdebut.value = elemModi.dateDebut;
            modifelectheurfin.value = elemModi.datefin;
            modifinputnombreperson.value = elemModi.nombreperson ; 
            modifselecttypereserve.value = elemModi.typeReserve;
            formModdifications.style.display = "flex";

            currentidetid = element ;
            currentelementedit = element2 ;

        }
    })
}

popformmodifi.addEventListener("submit" , function(e) {
    e.preventDefault();

    let result = validdatamodif() ; 

    if(!result){
        return ;
    }


    reservetions.forEach((elemModi) => {
        if(elemModi.ID == currentidetid){
            elemModi.nom = inputmodifiuser.value;
            elemModi.jour = modifierselectday.value ;
            elemModi.dateDebut = modifselectheurdebut.value ;
            elemModi.datefin = modifelectheurfin.value ;
            elemModi.nombreperson = modifinputnombreperson.value ;
            elemModi.typeReserve = modifselecttypereserve.value ;
            localStorage.setItem("data" , JSON.stringify(reservetions))    ;
            
            switch (elemModi.typeReserve) {
                case "sur place":
                    currentelementedit.style.background = "gray";
                    break;
                case "VIP":
                    currentelementedit.style.background = "gold";
                    break;
                case "anniversaire":
                    currentelementedit.style.background = "red";
                    break;
            }
            currentelementedit.innerHTML = `
                <span>${elemModi.nom}</span> 
                <span>(${elemModi.typeReserve})</span>
                <span>${elemModi.dateDebut} - ${elemModi.datefin}</span>`;
            

            }
                })
            
    popformmodifi.style.display = "none";
})


document.querySelector(".supprumer").addEventListener("click" , function() {
    
    reservetions = reservetions.filter(elemsupp => elemsupp.ID != currentidetid);
    currentelementedit.remove();
    localStorage.setItem("data" , JSON.stringify(reservetions));
    popformmodifi.style.display = "none";
})




