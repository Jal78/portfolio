//------- CSS -------------
$(document).ready(function(){
$('form').css({
        "width" :"80%",
        "margin": "20px auto",
    });

$('.lien').css({
        "text-align":"center",
    });

$('.question').css({
        "display":"flex",
        "align-items":"center",
        "justify-content":"center",
        "border": "1px solid black",
        "background": "#9eeae0",
        "margin": "20px auto",
    });
 
$('.texte').css({
        "margin":"20px auto",
        "padding":"30px",
        "width":"100%",
        "height":"200px",
        "color": "black",
        
    });

$('img').css({
    "width":"150px",
    "height":"100px",
    "vetical-align":"middle"
});

// --------- effet ----------

// fonction
function dessus(arg1, arg2, arg3) {
    if($(arg1).is(':checked')){
        $(arg2).attr("src","./img/bon.png");
        $(arg3).css("color","green");
        $(arg3).show();
    }else{
        $(arg2).attr("src","./img/mauvais.png")
        $(arg3).css("color","red");
        $(arg3).show();
    }
}

function dehor(arg1,arg2){
    $(arg1).attr("src","./img/question.png");
    $(arg2).hide();
}

$("#reponse1, #reponse2, #reponse3").hide();

$("a").mouseenter(function(){
    // if($('#r1').is(':checked')){
    //     $('#img1').attr("src","./img/bon.png");
    //     $('#reponse1').css("color","green");
    //     $('#reponse1').show();
    // }else{
    //     $('#img1').attr("src","./img/mauvais.png")
    //     $('#reponse1').css("color","red");
    //     $('#reponse1').show();
    // }
    // if($('#r4').is(':checked')){
    //     $('#img2').attr("src","./img/bon.png");
    //     $('#reponse2').css("color","green");
    //     $('#reponse2').show();
    // }else{
    //     $('#img2').attr("src","./img/mauvais.png")
    //     $('#reponse2').css("color","red");
    //     $('#reponse2').show();
    // }
    dessus("#r1", "#img1", "#reponse1")
    dessus("#r4", "#img2", "#reponse2")
    dessus("#r8", "#img3", "#reponse3")
});

$("a").mouseleave(function(){
    dehor("#img1","#reponse1")
    dehor("#img2","#reponse2")
    dehor("#img3","#reponse3")
});


});

