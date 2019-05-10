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
  }
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
        return this.skjema.elementer[kommune]
      }
    }
  }
  // Returnerer navnet til et kommunenummer.
  this.getNameFrom = function(kommunenummer){
    for (kommune in this.skjema.elementer){
      if (this.skjema.elementer[kommune].kommunenummer == kommunenummer){
        return kommune;
      }
    }
  }
}

function loadInfoToDetaljer(befolkning, sysselsatte, utdanning){
  var input = document.getElementById("searchbarText").value;
  bef_info = befolkning.getInfo(input);
  sys_info = sysselsatte.getInfo(input);
  utd_info = utdanning.getInfo(input);
  // Om det allerede var informasjon i tabellen blir det clearet ut.
  clearTable("detaljer_hoved");
  clearTable("detaljer_menn");
  clearTable("detaljer_kvinner");
  // Sjekker at inputen man har mottatt ikke er undefined
  if (typeof bef_info == "undefined"){
    document.getElementById("tableHide").style.display = "none";
    return;
  }
  // Fyller inn data i detaljer table. Her legges all "hoved" infoen om kommunen
  addRowTo("detaljer_hoved", "Kommunenavn", befolkning.getNameFrom(input));
  addRowTo("detaljer_hoved", "Kommune nummer", input);
  addRowTo("detaljer_hoved", "Antall menn", bef_info.Menn[2018]);
  addRowTo("detaljer_hoved", "Antall kvinner", bef_info.Kvinner[2018]);
  addRowTo("detaljer_hoved", "Menn i arbeid %", sys_info.Menn[2018]);
  addRowTo("detaljer_hoved", "Kvinner i arbeid %", sys_info.Kvinner[2018]);
  addRowTo("detaljer_hoved", "Begge kjønn i arbeid %", sys_info["Begge kjønn"][2018]);
  // fyller ut data om menns utdanning
  addRowTo("detaljer_menn", "Grunnskolenivå", utd_info["01"].Menn[2017]);
  addRowTo("detaljer_menn", "VGS", utd_info["02a"].Menn[2017]);
  addRowTo("detaljer_menn", "Fagskolenivå", utd_info['11'].Menn[2017]);
  addRowTo("detaljer_menn", "Universitet/høyskolenivå kort", utd_info["03a"].Menn[2017]);
  addRowTo("detaljer_menn", "Universitet/høyskolenivå lang", utd_info["04a"].Menn[2017]);
  addRowTo("detaljer_menn", "Uoppgitt/ingen utdanning", utd_info["09a"].Menn[2017]);
  // fyller ut data om kvinnes utdanning
  addRowTo("detaljer_kvinner", "Grunnskolenivå", utd_info["01"].Kvinner[2017]);
  addRowTo("detaljer_kvinner", "VGS", utd_info["02a"].Kvinner[2017]);
  addRowTo("detaljer_kvinner", "Fagskolenivå", utd_info['11'].Kvinner[2017]);
  addRowTo("detaljer_kvinner", "Universitet/høyskolenivå kort", utd_info["03a"].Kvinner[2017]);
  addRowTo("detaljer_kvinner", "Universitet/høyskolenivå lang", utd_info["04a"].Kvinner[2017]);
  addRowTo("detaljer_kvinner", "Uoppgitt/ingen utdanning", utd_info["09a"].Kvinner[2017]);
  // Til slutt viser vi frem tabellen
  document.getElementById("tableHide").style.display = "block";
}

function loadInfoToOversikt(skjema){
  for (var key of Object.keys(skjema.elementer)) {
    var row = document.getElementById("oversikt_table").insertRow(1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    cell1.classList.add("info");
    cell2.classList.add("info");
    cell3.classList.add("info");
    cell1.innerHTML = key;
    cell2.innerHTML = skjema.elementer[key].kommunenummer;
    var menn = skjema.elementer[key].Menn[2018];
    var kvinner = skjema.elementer[key].Kvinner[2018];
    cell3.innerHTML = parseInt(menn) + parseInt(kvinner);
  }
}

function loadInfoToSammenligning(befolkning, sysselsatte, identifier){
  var input = document.getElementById("sammenligning_input_" + identifier).value;
  var current_table = "sammenligning_table_" + identifier;
  var bef_info = befolkning.getInfo(input);
  var sys_info = sysselsatte.getInfo(input);
  clearTable(current_table);
  if (typeof bef_info == "undefined"){
    document.getElementById("table_sammenligning_hide").style.display = "none";
    return;
  }

  //Fyller inn data for sysselsatte menn og kvinner i loops
  addRowTo(current_table, "Kommune", befolkning.getNameFrom(input));
  addRowTo(current_table, "Kommunenummer", input);
  addRowTo(current_table, "Menn i arbeid", "");
  for (var year = 2018; year > 2004; year--){
    addRowTo(current_table, year, sys_info.Menn[year])
  }
  addRowTo(current_table, "Kvinner i arbeid", "");
  for (var year = 2018; year > 2004; year--){
    addRowTo(current_table, year, sys_info.Kvinner[year]);
  }

  // Opretter og legger inn data i et table hvis man er på en liten skjerm eller mobil.
  var data = document.getElementById("small_table_" + identifier);
  var table = befolkning.getNameFrom(input) + " " + input +  "<table><thead><tr><th>Menn</th><th>Kvinner</th></tr></thead><tbody>";
  for (var year = 2018; year > 2004; year--){
    table += "<tr><td>" + year + ":<br>" + sys_info.Menn[year] + "</td><td>" + year + ":<br>" + sys_info.Kvinner[year] + "</td></tr>";
  }
  table += "</tbody></table>";
  data.innerHTML = table;
  // Setter til slutt at alt denne funksjoner har gjort skal være synlig.
  document.getElementById("table_sammenligning_hide").style.display = "block";
}

// Legger til en ny rad i et table. Description er en string som breskriver dataen.
function addRowTo(tableID, description, data){
  var new_row = document.getElementById(tableID).insertRow(-1);
  cell1 = new_row.insertCell(0);
  cell2 = new_row.insertCell(1);
  cell1.classList.add("info");
  cell2.classList.add("output");
  cell1.innerHTML = description;
  cell2.innerHTML = data;
}
// Fjerner alt innholdet i et table.
function clearTable(table){
  document.getElementById(table).innerHTML = "";
}
// Brukes av knapper i HTML dokumentet til å laste inn info.
function addToDetaljer(){
  loadInfoToDetaljer(befolkning, sysselsatte, utdanning)
}
// Brukes av knapper i HTML dokumentet til å laste inn info.
function addToSammenligning(){
  // Parameter nr 3 sier ifra om inputen er fra input1 eller input2.
  loadInfoToSammenligning(befolkning, sysselsatte, 1);
  loadInfoToSammenligning(befolkning, sysselsatte, 2);
  highlightBestData();
}

function highlightBestData(){
  var table_left = document.getElementById("sammenligning_table_1");
  var table_right = document.getElementById("sammenligning_table_2");
  for (var i = 3, row; row = table_left.rows[i]; i++) {
    year_left = parseInt(row.cells[0].innerHTML);
    data_left = parseInt(row.cells[1].innerHTML);

    if (!isNaN(year_left) && !isNaN(data_left)){
      data_right = parseInt(table_right.rows[i].cells[1].innerHTML)
      if (data_right > data_left){
        table_right.rows[i].cells[1].classList.add("winner");
        row.cells[1].classList.add("loser");
      } else {
        table_right.rows[i].cells[1].classList.add("loser");
        row.cells[1].classList.add("winner");
      }
    }
  }
}


var befolkning_url = "http://wildboy.uib.no/~tpe056/folk/104857.json";
var sysselsatte_url = "http://wildboy.uib.no/~tpe056/folk/100145.json";
var utdanning_url =  "http://wildboy.uib.no/~tpe056/folk/85432.json";

var befolkning = new my_constructor(befolkning_url);
var sysselsatte = new my_constructor(sysselsatte_url);
var utdanning = new my_constructor(utdanning_url);

befolkning.load;
sysselsatte.load;
utdanning.load;

loadInfoToOversikt(befolkning.skjema);
