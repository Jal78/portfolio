// ('#add').click(function(){
//     let toDo = $("input").attr();
//     console.log(toDo);
// });
$(document).ready(function() {
    $("#add").click(function add(){
        var toDo = $("input").val();
        if(toDo !== ""){
        $("ol").append("<li>" + toDo + "</li>");
        $("input").val("");
        }else{

        }
    });

    $("#reset").click(function reset(){
        $('li').remove();

    });

    // $("li").click(function(){
    //     alert("eee");
    //     console.log(this);
    //     //$("li").hide();
    // });

    $("ol").on("click","li",function(){
        $(this).remove();
        // rappel : this correspond a l'element sur lequel on se trouve. ici il s'agit d'un li
    });
})
