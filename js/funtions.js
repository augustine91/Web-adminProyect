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


