$(document).ready(function (){

        $('img').animate({opacity: 0.5}, 2000);
        $('.corp').animate({top:'250px'}, 3000);
        $('.h1').animate({top:'110px'}, 5000);


    let pc = Math.floor(Math.random() *100)+1;
    console.log(pc);
    let compt = 0;
    let devine;
    
    
    $('.valider').click(function(){
        
        compt++;
        console.log(compt);
        devine = Number($('#devine').val());
        
        if(compt < 7){

            if(devine === pc){
                
                $('.action label').text("Tu es tres bon bravo tu as trouver le nombre exacte");
                $(".btn").click(function (){
                $(".valider").addClass("hideBlock");
                $(".reset").removeClass("hideBlock");  
            });
                

            }

            else if(devine < pc){
                
                $('.action label').text("Le nombre à trouver est plus grand");

            }else {
                
                $('.action label').text("Le nombre à trouver est plus petit");

            }

        }else if(compt === 6){

            if( devine === pc){

                $('.action label').text("Tu es tres bon bravo tu as trouver le nombre exacte")};
                $(".btn").click(function (){
                $(".valider").addClass("hideBlock");
                $(".reset").removeClass("hideBlock");  
            });

        }else{
            $('.action label').html(" Dommage tu as perdu, recommence depuis le debut en appuyant sur le bouton reset");
            $(".btn").click(function (){
                $(".valider").addClass("hideBlock");
                $(".reset").removeClass("hideBlock");
                
            }); 
            //location.reload(true); // reactualise la page   
        };

        // $('label').text("Met un autre chiffre en dessous");
        // j'ai pas reussi en ajoutant un paragraphe avec .after

    });

    $(".reset").click(function(){
        $('.action label').text("Met un autre chiffre en dessous");
        pc = Math.floor(Math.random() *100)+1;
        console.log(pc);
        compt = 0;
        $(".btn").click(function (){

            $(".valider").removeClass("hideBlock");
            
            $("#devine").val("");
            
            $(".reset").addClass("hideBlock");
            
        });
    });        
    
});