function openNav(){
  document.getElementById("sidenav").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
}
function closeNav(){
  document.getElementById("sidenav").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
}

function oversikt(){
  document.getElementById("Introduksjon").style.display = "none";
  document.getElementById("Detaljer").style.display = "none";
  document.getElementById("Sammenligning").style.display = "none";
  document.getElementById("Oversikt").style.display = "block";
}

function introduksjon(){
  document.getElementById("Oversikt").style.display = "none";
  document.getElementById("Detaljer").style.display = "none";
  document.getElementById("Sammenligning").style.display = "none";
  document.getElementById("Introduksjon").style.display = "block";
}

function detaljer(){
   document.getElementById("Introduksjon").style.display = "none";
   document.getElementById("Oversikt").style.display = "none";
   document.getElementById("Sammenligning").style.display = "none";
   document.getElementById("Detaljer").style.display = "block";
}

function sammenligning(){
  document.getElementById("Introduksjon").style.display = "none";
  document.getElementById("Oversikt").style.display = "none";
  document.getElementById("Detaljer").style.display = "none";
  document.getElementById("Sammenligning").style.display = "block";
}

window.onload = function openBefolkning(){
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "http://wildboy.uib.no/~tpe056/folk/104857.json");
  xhr.onreadystatechange = function(){
    if (xhr.readyState === 4 && xhr.status === 200){
      console.log("Type", xhr.getResponseHeader("Content-Type"));
      console.log("Text", xhr.responseText);
    }
  };
  xhr.send();
}

var data = {contains: kommunenummer};
var payload = JSON.stringify(data);

xhr.open("POST", "http://wildboy.uib.no/~tpe056/folk/104857.json");
xhr.onreadystatechange = function(){
  if (xhr.readyState === 4 && xhr.status === 200){
    console.log("Type", xhr.getResponseHeader("Content-Type"));
    console.log("Text", xhr.responseText);
  }
};

xhr.setRequestHeader("Content-Type", "application/json");

xhr.send(payload);
