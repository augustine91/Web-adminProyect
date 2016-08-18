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
( function() {
    var dialog, dialogp,dialoge, dialogpe,
 
      // From http://www.whatwg.org/specs/web-apps/current-work/multipage/states-of-the-type-attribute.html#e-mail-state-%28type=email%29
      emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
      name = $( "#name" ),
      allFields = $( [] ).add( name ),
 
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
 
    function checkRegexp( o, regexp, n ) {
      if ( !( regexp.test( o.val() ) ) ) {
        o.addClass( "ui-state-error" );
        updateTips( n );
        return false;
      } else {
        return true;
      }
    }
    dialog = $( "#dialog-proyecto" ).dialog({
      autoOpen: false,
      height: 100,
      width: 320,
      modal: true,
 
    });
    dialogp = $( "#dialog-persona" ).dialog({
      autoOpen: false,
      height: 100,
      width: 320,
      modal: true,
 
    });

   dialoge = $( "#dialog-proyectoe" ).dialog({
      autoOpen: false,
      height: 100,
      width: 320,
      modal: true,
 
    });
    dialogpe = $( "#dialog-personae" ).dialog({
      autoOpen: false,
      height: 100,
      width: 320,
      modal: true,
 
    });

  $( "body" ).on( "click", ".btn-edits", function() {
      dialogpe.dialog( "close" );
      dialoge.dialog( "open" );
      var dataDisplay="";
      var domelement=document.getElementsByClassName($(this).attr('id'));
    for (var i = 0; i < domelement.length; i++) {
        if (domelement[i].tagName=="STRONG") {
            dataDisplay=domelement[i].innerHTML;
        }
    }
      var helperEdit = document.getElementById("btn-proyectoe" );
      helperEdit.setAttribute("helper", $(this).attr('id'));
      var helperBorrar = document.getElementById("btn-proyectob" );
      helperBorrar.setAttribute("helper", $(this).attr('id'));
      $( "#dialog-proyectoe" ).find('#text-proyecte').val(dataDisplay );

    });
$( "body" ).on( "click", ".btn-editsp", function() {
      dialoge.dialog( "close" );
      dialogpe.dialog( "open" );
      var dataDisplay="";
      var domelement=document.getElementsByClassName($(this).attr('id'));
    for (var i = 0; i < domelement.length; i++) {
        if (domelement[i].tagName=="I") {
            dataDisplay=domelement[i].innerHTML;
        }
    }
      var helperEdit = document.getElementById("btn-personae" );
      helperEdit.setAttribute("helper", $(this).attr('id'));
      var helperBorrar = document.getElementById("btn-personab" );
      helperBorrar.setAttribute("helper", $(this).attr('id'));
      $( "#dialog-personae" ).find('#text-personee').val(dataDisplay );

    });

    $( "#create-proyecto" ).button().on( "click", function() {
      dialogp.dialog( "close" );
      dialog.dialog( "open" );
      
    });
    $( "#create-persona" ).button().on( "click", function() {
      dialog.dialog( "close" );
      dialogp.dialog( "open" );
      
    });
  } );
  var consec=0;
  var consecp=0;
  function crearProyecto() {
    var dialog = $( "#dialog-proyecto" );
    dialog.dialog( "close" );
    var proyect = document.createElement("div");  
    proyect.setAttribute("class", "proyecct");
    proyect.setAttribute("id", "pr"+consec);
    
    proyect.setAttribute("draggable", "true");
    proyect.setAttribute("ondragstart", "drag(event)");
    proyect.innerHTML=
          '<span class="title-p" ><h3><strong class="bpr'+consec+'">'+$( "#text-proyect" ).val()+'</strong></h3>'+
          '<button class="btn-edits" id="bpr'+consec+'" ></button></span>'+
          '<div class="shower" ondrop="drop(event)" ondragover="allowDrop(event)">'+  
          '</div>';

    consec++;
            
         

      $( ".proyects" ).append(proyect) ;
      $( "#text-proyect" ).val('');     
      setValue();                         
};

function openProyecto(){
  var dialog = $( "#dialog-proyecto" );
  var dialogp = $( "#dialog-persona" );
  dialog.dialog( "close" );
      dialogp.dialog( "open" );
}
function openPersona(){
  var dialog =  $( "#dialog-persona" );
  var dialogp =$( "#dialog-proyecto" );
  dialog.dialog( "close" );
      dialogp.dialog( "open" );
}

  function crearPersona() {
    var dialogp = $( "#dialog-persona" );
    dialogp.dialog( "close" );
    var proyect = document.createElement("span");  
    proyect.setAttribute("class", "personer");
    proyect.setAttribute("id", "p"+consecp);
   
    proyect.setAttribute("draggable", "true");
    proyect.setAttribute("ondragstart", "drag(event)");
    proyect.innerHTML='<i class="bp'+consecp+'">'+$( "#text-persone" ).val()+'</i><button class="btn-editsp" id="bp'+consecp+'" ></button>';
     consecp++;
      $( ".persons" ).append(proyect) ; 
      $( "#text-persone" ).val('');  
      setValue();                          
};



function editarProyecto(ev) {
  var dialog = $( "#dialog-proyectoe" );
    dialog.dialog( "close" );

    var textid=ev.attributes["helper"].nodeValue;
    var domelement=document.getElementsByClassName(textid);
    for (var i = 0; i < domelement.length; i++) {
        if (domelement[i].tagName=="STRONG") {
            domelement[i].innerHTML=""+$( "#text-proyecte" ).val();
        }
    }
    $( "#text-proyect" ).val('');  
    setValue();
}

function editarPersona(ev) {
  var dialogp = $( "#dialog-personae" );
    dialogp.dialog( "close" );
    var textid=ev.attributes["helper"].nodeValue;
    var domelement=document.getElementsByClassName(textid);
    for (var i = 0; i < domelement.length; i++) {
        if (domelement[i].tagName=="I") {
            domelement[i].innerHTML=""+$( "#text-personee" ).val();
        }
    }
    $( "#text-persone" ).val('');
    setValue(); 
}

function borrarProyecto(ev) {
  var dialog = $( "#dialog-proyectoe" );
    dialog.dialog( "close" );
    
    var textid=ev.attributes["helper"].nodeValue;
    textid=textid.replace('b','');
    var domelement=document.getElementById(textid).children;
    for (var i = domelement.length - 1; i >= 0; i--) {
     if(domelement[i].className=="shower")
     {
        var stackPersone=domelement[i].children;
        for (var j = stackPersone.length - 1; j >= 0; j--) {
          document.getElementById("waitarea").appendChild(stackPersone[j]);
        }
     }
    }
    $( "#"+textid ).remove();
    $( "#text-proyect" ).val('');  
    setValue();
}

function borrarPersona(ev) {
  var dialogp = $( "#dialog-personae" );
    dialogp.dialog( "close" );
    var textid=ev.attributes["helper"].nodeValue;
    textid=textid.replace('b','');
    $( "#"+textid ).remove();
    $( "#text-persone" ).val(''); 
    setValue();
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