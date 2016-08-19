
var persons = [];
function setValue() {
 	var data= document.getElementById("persons").children;
    localStorage.setItem("memory", data);
    for (var i = data.length - 1; i >= 0; i--) {
	       persons.push = var persona = {"personas":[
           {"Name":data.children[0].innerHTML, "height":, "width":""}]}
}


function getValue() {
    var data = localStorage.getItem("memory");
    if(data!=null)
    {
    	document.getElementById("megawork").innerHTML=data;
    }
    
}

