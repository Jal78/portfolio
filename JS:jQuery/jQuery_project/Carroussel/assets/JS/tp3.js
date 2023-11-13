$(document).ready(function(){

    
    let number = 1;

    function maBoucle(){
        
        setTimeout(function(){
            if(number == 1){
                $("#slide1").show().fadeIn(1000);
                $("#slide2").hide();
                $("#slide3").hide();

                $("#slide1").addClass("active");
                $("#slide2, #slide3").removeClass("active");
                number++;

            }else if(number == 2){
                $("#slide1").hide();
                $("#slide2").show().fadeIn(1000);
                $("#slide3").hide();

                $("#slide2").addClass("active");
                $("#slide1, #slide3").removeClass("active");
                number++;

            }else if(number == 3){
                $("#slide1").hide();
                $("#slide2").hide();
                $("#slide3").show().fadeIn(1000);

                $("#slide3").addClass("active");
                $("#slide1, #slide2").removeClass("active");
                number++;
            }else{
                number = 1;
            }
           
            
            //alert('Bonjour !'); // affichera "Bonjour !" toutes les secondes
            maBoucle(); // relance la fonction
        }, 1000); 

        }
        maBoucle(); // on oublie pas de lancer la fonction une première fois


    
    let numero = 2;
    const duree = 1000;
    const nombreSlides = 3;
    

    $('#flecheD').click(function(){
        $('#slide' + numero).fadeOut(duree);
        numero += 1;
        if(numero>nombreSlides){
            numero = 1;
            
        }
        $("#slide" + numero).fadeIn(duree);

    })

    $('#flecheG').click(function(){
        
        $('#slide' + numero).fadeOut(duree);
        numero -= 1;
        if(numero<1){
            numero = nombreSlides;
            
        }
        $("#slide" + numero).fadeIn(duree);
    })

    
});

