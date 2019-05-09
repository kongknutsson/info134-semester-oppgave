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
  this.load = loader(url, this);
  this.skjema = this.load;
  this.onload = null;

  function loader(link, myObject){
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

  this.getNameFrom = function(kommunenummer){
    for (kommune in this.skjema.elementer){
      if (this.skjema.elementer[kommune].kommunenummer == kommunenummer){
        return kommune;
      }
    }
  }

}

function addToTest(){
  addToDetaljer(befolkning, sysselsatte, utdanning)
}
function addToTest_2(){
  addToSammenligningBig(befolkning, sysselsatte, 1)
  addToSammenligningBig(befolkning, sysselsatte, 2)
  addToSammenligningSmall(befolkning, sysselsatte)
}

function addToDetaljer(befolkning, sysselsatte, utdanning){
  var input = document.getElementById("searchbarText").value;
  submitOK = 'true';

  bef_info = befolkning.getInfo(input);
  if (typeof bef_info == "undefined"){
    document.getElementById("tableHide").style.display = "none";
    return;
  }

  document.getElementById("output_kommune").innerHTML = befolkning.getNameFrom(input);
  document.getElementById("output_nummer").innerHTML = input;
  document.getElementById("output_menn").innerHTML = bef_info.Menn[2018];
  document.getElementById("output_kvinner").innerHTML = bef_info.Kvinner[2018];

  //fyller ut data for sysselsatte
  sys_info = sysselsatte.getInfo(input);
  var mennIArbeid = document.getElementById("output_mennIArbeid").innerHTML = sys_info.Menn[2018];
  var kvinnerIArbeid = document.getElementById("output_kvinnerIArbeid").innerHTML = sys_info.Kvinner[2018];
  document.getElementById("output_beggeKjønn").innerHTML = sys_info["Begge kjønn"][2018];

  //fyller ut data om menns utdanning
  utd_info = utdanning.getInfo(input);
  document.getElementById("01M").innerHTML = utd_info["01"].Menn[2017];
  document.getElementById('02aM').innerHTML = utd_info["02a"].Menn[2017];
  document.getElementById("11M").innerHTML = utd_info['11'].Menn[2017];
  document.getElementById("03aM").innerHTML = utd_info["03a"].Menn[2017];
  document.getElementById("04aM").innerHTML = utd_info["04a"].Menn[2017];
  document.getElementById("09aM").innerHTML = utd_info["09a"].Menn[2017];

  //fyller ut data om kvinnes utdanning
  document.getElementById("01K").innerHTML = utd_info["01"].Kvinner[2017];
  document.getElementById("02aK").innerHTML = utd_info["02a"].Kvinner[2017];
  document.getElementById("11K").innerHTML = utd_info["11"].Kvinner[2017];
  document.getElementById("03aK").innerHTML = utd_info["03a"].Kvinner[2017];
  document.getElementById("04aK").innerHTML = utd_info["04a"].Kvinner[2017];
  document.getElementById("09aK").innerHTML = utd_info["09a"].Kvinner[2017];

  document.getElementById("tableHide").style.display = "block";
}
function addToOversikt(skjema){
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

function addToSammenligningBig(befolkning, sysselsatte, identifier){
  var input = document.getElementById("sammenligning_input_" + identifier).value;
  bef_info = befolkning.getInfo(input);
  if (typeof bef_info == "undefined"){
    document.getElementById("table_sammenligning_hide").style.display = "none";
    return;
  }
  //Fyller inn data for kommunen(navn og nr.)
  document.getElementById("output_kommunenavn_" + identifier).innerHTML = befolkning.getNameFrom(input);
  document.getElementById("output_kommunenr_" + identifier).innerHTML = input;

  sys_info = sysselsatte.getInfo(input);
  //Fyller inn data for sysselsatte menn
  for (var year = 2018; year > 2004; year--){
    year = year.toString();
    var current_id = "output_menn_arbeid_" + identifier +  "_" + year;
    document.getElementById(current_id).innerHTML = sys_info.Menn[year];
    // Om tallet er 0, altså ingen data, så skriver den heller n/a istedenfor tallet.
    if (sys_info.Menn[year] == 0) {
      document.getElementById(current_id).innerHTML = "n/a";
    }
  }
  //Fyller inn data for sysselsatte kvinner
  for (var year = 2018; year > 2004; year--){
    year = year.toString();
    var current_id = "output_kvinner_arbeid_" + identifier +  "_" + year;
    document.getElementById(current_id).innerHTML = sys_info.Kvinner[year];
    // Om tallet er 0, altså ingen data, så skriver den heller n/a istedenfor tallet.
    if (sys_info.Kvinner[year] == 0) {
      document.getElementById(current_id).innerHTML = "n/a";
    }
  }

  document.getElementById("table_sammenligning_hide").style.display = "block";
}

function addToSammenligningSmall(befolkning, sysselsatte){
  var input_1 = document.getElementById("sammenligning_input_1").value;
  bef_info = befolkning.getInfo(input_1);
  if (typeof bef_info == "undefined"){
    document.getElementById("table_sammenligning_hide").style.display = "none";
    return;
  }

  var input_2 = document.getElementById("sammenligning_input_2").value;
  bef_info = befolkning.getInfo(input_2);
  if (typeof bef_info == "undefined"){
    document.getElementById("table_sammenligning_hide").style.display = "none";
    return;
  }

  var kommune_1 = document.getElementById("info_kommune_1");
  var kommune_2 = document.getElementById("info_kommune_2");
  kommune_1.innerHTML = befolkning.getNameFrom(input_1) + " " + "Nr." + input_1;
  kommune_2.innerHTML = befolkning.getNameFrom(input_2) + " " + "Nr." + input_2


  sys_info_1 = sysselsatte.getInfo(input_1);
  sys_info_2 = sysselsatte.getInfo(input_2);
  //Oppretter table tagen som skal vises på sammenligning siden, samt oppretter table headings til tabellene
  var data_1 = document.getElementById("small_table_1");
  var data_2 = document.getElementById("small_table_2");
  var table_1 = "<table><thead><tr><th>Menn</th><th>Kvinner</th></tr></thead><tbody>";
  var table_2 = "<table><thead><tr><th>Menn</th><th>Kvinner</th></tr></thead><tbody>";
  //Fyller inn data om kommunen inn i tabellen (Kommune, Kommunenr. og første data siste året ifra sysselsatte(2018) menn og kvinner)
  //table_1 += "<tr><td>" + befolkning.getNameFrom(input_1) + "</td><td>" + input_1 + "</td><td>" + "2018: " + sys_info_1.Menn[2018] + "</td><td>" + "2018: " + sys_info_1.Kvinner[2018] + "</td></tr>";
  //table_2 += "<tr><td>" + befolkning.getNameFrom(input_2) + "</td><td>" + input_2 + "</td><td>" + "2018: " + sys_info_2.Menn[2018] + "</td><td>" + "2018: " + sys_info_2.Kvinner[2018] + "</td></tr>";
  //Fyller inn resten av dataene om sysselsatte i kommunen i den første tabellen som skal brukes til å sammenligne
  for (var year_1 = 2017; year_1 > 2004; year_1--) {
    table_1 += "<tr><td>" + year_1 + ": " + sys_info_1.Menn[year_1] + "</td><td>" + year_1 + ": " + sys_info_1.Kvinner[year_1] + "</td></tr>";
  }
  //Fyller inn resten av dataene om sysselsatte i kommunen i den andre tabellen som skal brukes til å sammenligne
  for (var year_2 = 2017; year_2 > 2004; year_2--) {
    table_2 += "<tr><td>" + year_2 + ": " + sys_info_2.Menn[year_2] + "</td><td>" + year_2 + ": " + sys_info_2.Kvinner[year_2] + "</td></tr>";
  }
  //Avslutter table tagene og henter de ut og skriver de inn i på siden
  table_1 += "</tbody></table>";
  table_2 += "</tbody></table>";
  data_1.innerHTML = table_1;
  data_2.innerHTML = table_2;
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
addToOversikt(befolkning.skjema);
