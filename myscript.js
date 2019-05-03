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
  // Henter inn JSON filen.
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "http://wildboy.uib.no/~tpe056/folk/104857.json");
  xhr.onreadystatechange = function(){
    // Sjekker at filen er ferdig lastet inn.
    if (xhr.readyState === 4 && xhr.status === 200){
      console.log("Type", xhr.getResponseHeader("Content-Type"));
      // Gjør om JSON filen til en string
      befolkning = JSON.stringify(xhr.responseText);
      // Parser stringen om til et JS objekt, som man da kan hente data fra.
      befolkning = JSON.parse(xhr.responseText);
      // Så bruker vi en annen funksjon for å legge dataen til i nettsiden
      addToOversikt(befolkning)
    }
  }
  xhr.send();
}


// Henter ut de relevante IDene vi trenger.
oversikt_table = document.getElementById("oversikt_table");
oversikt_navn = document.getElementById("oversikt_navn");
oversikt_nummer = document.getElementById("oversikt_nummer");
oversikt_befolkning = document.getElementById("oversikt_befolkning");
function addToOversikt(befolkning){
  // bruker nøkkelverdiene til å hente ut objektene.
  for (var key of Object.keys(befolkning.elementer)) {
    // Lager nye rader og rekker til infoen
    var row = oversikt_table.insertRow(1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    cell1.classList.add("info");
    cell2.classList.add("info");
    cell3.classList.add("info");
    // legger inn infoen i rekkene. key er nøkkelverdi, altså kommunenavn
    cell1.innerHTML = key;
    cell2.innerHTML = befolkning.elementer[key].kommunenummer;
    // Bruker det senester året, altså 2018.
    var menn = befolkning.elementer[key].Menn[2018];
    var kvinner = befolkning.elementer[key].Kvinner[2018];
    cell3.innerHTML = parseInt(menn) + parseInt(kvinner);
  }
}











//
// function addToOversikt(befolkning){
//   teller = 0;
//   for (const key of Object.keys(befolkning.elementer)) {
//     console.log(key, befolkning.elementer[key]);
//     console.log(befolkning.elementer[key].kommunenummer
//     teller+=1;
//     if (teller === 10){
//       return
//     }
//   }
//
//   for (kommune in befolkning.elementer){
//
//     var row = oversikt_table.insertRow(1);
//     var cell1 = row.insertCell(0);
//     var cell2 = row.insertCell(1);
//     var cell3 = row.insertCell(2);
//
//     cell1.innerHTML = kommune;
//     cell2.innerHTML = kommune.kommunenummer;
//     cell3.innerHTML = kommune.menn;
//   }
// }



