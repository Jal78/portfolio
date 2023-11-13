
/* ----------------------- indice -------------------------- */
indice.addEventListener("click" ,function(){
    let indice = document.querySelector(".indice");
    let paragraphe = document.querySelector(".para");

        paragraphe.classList.toggle("cacher");
        paragraphe.textContent = "Un petit indice le chiffre à deviner est egal ou  superieure à 1 et inferieure ou egal à 100";
    });

/* ------------------------ Jeux --------------------------- */





let devine = Math.floor(Math.random() * 100) + 1;
let essaie = 0;
let reponse = document.getElementById("reponse");
let saisie = document.getElementById("champs")
let valider = document.getElementById("submit");

    
        valider.addEventListener("click", function click(event){
            event.preventDefault(); 

            let input = parseInt(saisie.value)
            let button = document.getElementById("reset");

        if(input === devine){

            reponse.textContent = "Bien jouez c'etait bien " + input;
            saisie.setAttribute("disabled","");
            
            button.classList.remove("cacher");
            button.addEventListener("click",function rejouer(event){
                event.preventDefault();

                button.classList.add("cacher");
                saisie.value ="";
                essaie = 0;
                saisie.removeAttribute("disabled","");
    
                devine = Math.floor(Math.random() * 100) + 1;

                reponse.textContent = "";

            });

            

        }else if( essaie < 6 ){
            essaie++;
            if (input < devine){
                reponse.textContent = "Mauvaise reponse "+ input + " est plus petit";

            }else if(input>devine) {
                reponse.textContent = "Mauvaise reponse "+ input + " est plus grand";
            }
                    
        }else{
            reponse.textContent = "Nombre d'essais épuisé, le chiffre etait " + devine + " ressayer"

            saisie.setAttribute("disabled","");
            
            button.classList.remove("cacher");
            button.addEventListener("click",function rejouer(event){
                event.preventDefault();

                button.classList.add("cacher");
                saisie.value ="";
                essaie = 0;
                saisie.removeAttribute("disabled","");
                

                devine = Math.floor(Math.random() * 100) + 1;

                reponse.textContent = "";
            });

            

        }
                  
        });
