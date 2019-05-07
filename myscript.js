function openNav(){
  if (window.matchMedia("(max-width: 960px)").matches) {
    document.getElementById('sidenav').style.width = "180px";
  } else {
  document.getElementById("sidenav").style.width = "250px";
  }
}
function closeNav(){
  document.getElementById("sidenav").style.width = "0";
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

function my_constructor(url){
  this.load = loader(url);
  this.skjema = this.load;
  this.onload = null;

  function loader(link){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", link, false);
    xhr.send();
    if (xhr.readyState === 4 && xhr.status === 200){
      var skjema = JSON.parse(xhr.responseText);
      return skjema;
    }
  }
  this.getNames = function(){
    tmp = [];
    for (kommune in this.skjema.elementer){
      tmp.push(kommune);
    }
    return tmp;
  };
  this.getIDs = function(){
    tmp = [];
    for (kommune in this.skjema.elementer){
      tmp.push(this.skjema.elementer[kommune].kommunenummer)
    }
    return tmp;
  }
  this.getInfo = function (kommunenummer){
    for (kommune in this.skjema.elementer){
      if (this.skjema.elementer[kommune].kommunenummer == kommunenummer){
        return this.skjema.elementer[kommune];
      }
    }
  }

}

oversikt_table = document.getElementById("oversikt_table");
oversikt_navn = document.getElementById("oversikt_navn");
oversikt_nummer = document.getElementById("oversikt_nummer");
oversikt_befolkning = document.getElementById("oversikt_befolkning");
function addToOversikt(befolkning ){
  // bruker nøkkelverdiene til å hente ut objektene.
  for (var key of Object.keys(befolkning.elementer)) {
    var row = oversikt_table.insertRow(1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    cell1.classList.add("info");
    cell2.classList.add("info");
    cell3.classList.add("info");
    // legger inn infoen i rekkene. key er nøkkelverdi, altså kommunenavn.
    cell1.innerHTML = key;
    cell2.innerHTML = befolkning.elementer[key].kommunenummer;
    // Bruker det seneste året, altså 2018.
    var menn = befolkning.elementer[key].Menn[2018];
    var kvinner = befolkning.elementer[key].Kvinner[2018];
    cell3.innerHTML = parseInt(menn) + parseInt(kvinner);
  }
}
function detaljerSearcher() {
  // Declare variables
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("detaljer_input");
  filter = input.value.toUpperCase();
  table = document.getElementById("detaljer_table");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

function test(url){
  var test_objekt = new my_constructor(url);
  test_objekt.load;
}

var befolkning_url = "http://wildboy.uib.no/~tpe056/folk/104857.json";
var sysselsatte_url = "http://wildboy.uib.no/~tpe056/folk/100145.json";
var utdanning_url =  "http://wildboy.uib.no/~tpe056/folk/85432.json";

console.log(" -- -- BEFOLKNING:");
test(befolkning_url);
console.log(" -- -- SYSSELSATTE:");
test(sysselsatte_url);
console.log(" -- -- UTDANNING:");
test(utdanning_url);

