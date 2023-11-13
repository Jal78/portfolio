

// Constructeur pour gérer l'affichage d'un message contextuel pour la saisie du pseudo
function messageConseil(inputId,aide,message){
   let inputElt = document.getElementById(inputId);
   let aideElt = document.getElementById(aide);
   let messageElt = message;
   

    // Fonction pour afficher le message contextuel lorsqu'on entre le focus sur l'élément
        inputElt.addEventListener("focus", function(){
            aideElt.textContent = messageElt;
        });

    // Fonction pour supprimer le message contextuel lorsque l'élément perd le focus
        inputElt.addEventListener("blur", function (e) {
            aideElt.textContent = "";
        });
};



messageConseil("nom", "aideN", "Veuillez entrez votre Nom"); 
messageConseil("prenom", "aideP", "Veuillez entrez votre Prenom");
messageConseil("email", "aideE", "Veuillez entrez votre E-mail");
messageConseil("tel", "aideT", "Veuillez entrez votre Prenom");
messageConseil("mdp", "aideMdp", "Veuillez entrez votre mot de passe");
messageConseil("Cmdp", "aideCmdp", "Veuillez confirmez votre mot de passe");
messageConseil("age", "aideA", "Veuillez entrez votre age");

/*-----------------------info difficulter mdp----------------------- */

    let mdpElt = document.getElementById("mdp");
    let cmdpElt = document.getElementById("Cmdp");

    mdpElt.addEventListener("input", function(e){
        
        let input = e.target.value;
        let paraG = document.getElementById("mdpPara")
        if(input.length >= 10){
            paraG.textContent = "Longueur suffisante"
            paraG.style.color = "green";

        }else if(input.length <= 6){
            paraG.textContent = "Longueur insuffisante";
            paraG.style.color = "red";

        }else{
            paraG.textContent = "longueur juste";
            paraG.style.color = "orange";
        }

        
    
    cmdpElt.addEventListener("input", function(e){
        let CparaG = document.getElementById("cmdpPara")
        
        if(cmdpElt.value === mdpElt.value ){
            CparaG.textContent = "Mot de passe identique"
            CparaG.style.color = "green";

        }else{
            CparaG.textContent = "Mot de passe different";
            CparaG.style.color = "red";

        }

        

    });


    });

/*-----------------------info nombre de caractere prenom et nom----------------------- */

function verificationName(valeur, para){
    let saisie = document.getElementById(valeur);
    let paragraphe = document.getElementById(para);
    

    saisie.addEventListener("input",function(e){
        let input = e.target.value;
        if((input.length)< 2){
            paragraphe.textContent = "Veuillez entrez un " + valeur + " valide";
            paragraphe.style.color ="red";
        }else if((input.length)>=3){
            paragraphe.textContent = "";
        }
    });
    

}

verificationName("nom","paragraphe_1");
verificationName("prenom","paragraphe_2");

/* ------------------------------------age valide------------------------------------- */

function verificationAge(valeur, para){
    let saisie = document.getElementById(valeur);
    let paragraphe = document.getElementById(para);
    

    saisie.addEventListener("input",function(e){
        let input = e.target.value;
        if(input >= 5  && input <= 140 ){
            paragraphe.textContent = "";
        }else{
            paragraphe.textContent = valeur  + " non valide";
            paragraphe.style.color = 'red';
        }
    });
    

}

verificationAge("age","ageInfo");

/* -------------------------mobile obliger saisie chffre--------------------------- */

/* input type tel suffit avec un pattern = "[0-9]{2}-[0-9]{2}-[0-9]{2}-[0-9]{2}-[0-9]{2}"
                                            2 chiffre entre 0 et 9  pui un tiret '-' achaque fois jusqu'a 10 diffre

*/


