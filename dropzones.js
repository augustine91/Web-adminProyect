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
if (document.addEventListener) {
        document.addEventListener('contextmenu', function(e) {
            alert("You've tried to open context menu"); //here you draw your own menu
            e.preventDefault();
        }, false);
    } else {
        document.attachEvent('oncontextmenu', function() {
            alert("You've tried to open context menu");
            window.event.returnValue = false;
        });
    }


window.oncontextmenu = function ()
{
    showCustomMenu();
    return false;     // cancel default menu
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", JSON.stringify([ev.target.id,
        (ev.offsetX || ev.clientX - $(ev.target).offset().left),(ev.offsetY || ev.clientY - $(ev.target).offset().top)]));
}
function droppersone(ev) {
    ev.preventDefault();
    var data = JSON.parse(ev.dataTransfer.getData("text"));
    var domelement=document.getElementById(data[0]);
    
    if(domelement.className=="personer" )
    {
        ev.target.appendChild(domelement);
    }

    
}

function drop(ev) {
    ev.preventDefault();
    var data = JSON.parse(ev.dataTransfer.getData("text"));
    var domelement=document.getElementById(data[0]);
    if(domelement.className=="proyecct" && ev.target.className=="proyects")
    {
        domelement.style.position="absolute";
        ev.target.appendChild(domelement);
        var izquierda=ev.clientX - data[1];
        var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        var average=w*0.15;
        if(izquierda<=average){
            domelement.style.left = average +'px';
        }
        else{
             if(izquierda>=w-domelement.offsetWidth-5){
                domelement.style.left = w-domelement.offsetWidth-5 +'px';
            }
            else{
                    domelement.style.left = izquierda + 'px';
            }
        }
        

        var arriba=ev.clientY - data[2];
        var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

        if(arriba<=55){
            domelement.style.top = 55 +'px';
        }
        else{
             if(arriba>=h-domelement.offsetHeight-5){
                domelement.style.top = h-domelement.offsetHeight-5 +'px';
            }
            else{
                    domelement.style.top = arriba + 'px';
            }
        }   
    }
    if(domelement.className=="personer" && ev.target.className=="shower")
    {
        ev.target.appendChild(domelement);
    }

    setValue();
}

$( function() {
    var dialog, dialogp,dialoge, dialogpe,
 
      // From http://www.whatwg.org/specs/web-apps/current-work/multipage/states-of-the-type-attribute.html#e-mail-state-%28type=email%29
      emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
      name = $( "#name" ),
      email = $( "#email" ),
      password = $( "#password" ),
      allFields = $( [] ).add( name ).add( email ).add( password ),
      tips = $( ".validateTips" );
 
    function updateTips( t ) {
      tips
        .text( t )
        .addClass( "ui-state-highlight" );
      setTimeout(function() {
        tips.removeClass( "ui-state-highlight", 1500 );
      }, 500 );
    }
 
    function checkLength( o, n, min, max ) {
      if ( o.val().length > max || o.val().length < min ) {
        o.addClass( "ui-state-error" );
        updateTips( "Length of " + n + " must be between " +
          min + " and " + max + "." );
        return false;
      } else {
        return true;
      }
    }

    function setValue() {
    var data= document.getElementById("megawork").innerHTML;
    localStorage.setItem("memory", data);
}


function getValue() {
    var data = localStorage.getItem("memory");
    if(data!=null)
    {
        document.getElementById("megawork").innerHTML=data;
    }
    
}