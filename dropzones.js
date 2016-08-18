$(function(){
    $.contextMenu({
        selector: '#menuopen', 
        callback: function(key, options) {
            if (key=="crear") {
                openPersona();
            }
            else if(key=="crearp")
            {
                openProyecto();
                
            }
        },
        items: {
            "crear": {name: "Crear Proyecto", icon: "edit"},
            "crearp": {name: "Crear Persona", icon: "edit"},
        }
    });
    
    $('.context-menu-one').on('click', function(e){

        console.log('clicked', this);
    })
});
    

$(document).ready(function(){
    $("#hide").click(function(){
        $("#waitarea").hide();
    });
    $("#show").click(function(){
        $("#waitarea").show();
    });
});