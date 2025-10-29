let buttonReserve = document.getElementById("buttonReserver") ;
let popup = document.querySelector(".sectionform");
 


document.addEventListener("click" , function(e){
    if(e.target.tagName === "BUTTON"){
        popup.style.display = "flex";
    } else if(e.target.id === "close__pop"){
        popup.style.display = "none";
    }
    
})

