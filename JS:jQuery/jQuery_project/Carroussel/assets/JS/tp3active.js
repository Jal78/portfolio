$(document).ready(function(){
    //$("ul li:nth-child(1)").addClass("one");
    // $("ul li:nth-child(2)").addClass("two");
    // $("ul li:nth-child(3)").addClass("three");

    let slide = 1;
    slide++;
    //let temps = 1000;
    //let position = 3;

    function maBoucle(){
        setTimeout(function(){
            if(slide === 1){
                $("#one").show();
                $("#two").hide();
                $("#three").hide();

                $("#one").addClass("active");
                $("#two, #three").removeClass("active");

                slide++;
            }else if(slide === 2){
                $("#one").hide();
                $("#two").show();
                $("#three").hide();

                $("#two").addClass("active");
                $("#one, #three").removeClass("active");

                slide++;
            }else if(slide === 3){
                $("#one").hide();
                $("#two").hide();
                $("#three").show();

                $("#three").addClass("active");
                $("#two, #one").removeClass("active");

                slide++;
            } else{
                slide = 1
            }
        // $(".flecheD").click(function(){
        //     if((slide  <=3 ) && (slide > 0)){
        //         slide = slide + 1;
        //     }
        // });


        maBoucle(); // relance la fonction
        }, 2500);
     }
    maBoucle(); // on oublie pas de lancer la fonction une première fois

     
    let imgActive;
    $(".flecheD").click(function(){
        imgActive = $(".active").attr("id");
        if ( imgActive == "one") {
            $("#one").hide();
            $("#two").show();
            $("#three").hide();

            $("#two").addClass("active");
            $("#one, #three").removeClass("active");
        }
        if ( imgActive == "two") {
            $("#one").hide();
            $("#two").hide();
            $("#three").show();

            $("#three").addClass("active");
            $("#two, #one").removeClass("active");
        }
        if ( imgActive == "three") {
            $("#one").show();
            $("#two").hide();
            $("#three").hide();

            $("#one").addClass("active");
            $("#two, #three").removeClass("active");

        }
    });

    
     


});

