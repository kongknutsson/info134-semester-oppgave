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


oversikt_table = document.getElementById("oversikt_table");
oversikt_navn = document.getElementById("oversikt_navn");
oversikt_nummer = document.getElementById("oversikt_nummer");
oversikt_befolkning = document.getElementById("oversikt_befolkning");
function addToOversikt(skjema){
  for (var key of Object.keys(skjema.elementer)) {
    var row = oversikt_table.insertRow(1);
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


var befolkning_url = "http://wildboy.uib.no/~tpe056/folk/104857.json";
var sysselsatte_url = "http://wildboy.uib.no/~tpe056/folk/100145.json";
var utdanning_url =  "http://wildboy.uib.no/~tpe056/folk/85432.json";

var befolkning = new my_constructor(befolkning_url);
var sysselsatte = new my_constructor(sysselsatte_url);
var utdanning = new my_constructor(utdanning_url);

befolkning.load;
sysselsatte.load;
utdanning.load;

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

//onload funker ikke
my_constructor.prototype.onload = function(){
}

addToOversikt(befolkning.skjema);

function addToTest(){
  addToDetaljer(befolkning, sysselsatte, utdanning)
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

function addToSammenligning(befolkning, sysselsatte, input_1, input_2){
  for(var i = 0; i < befolkning.getIDs().length; i++){
    console.log("ok")
    if(input_1 in befolkning.getIDs){
      bef_info = befolkning.getInfo(input_1);
      document.getElementById().innerHTML = befolkning.getNameFrom(input_1);
      document.getElementById().innerHTML = input_1;
      sys_info = sysselsatte.getInfo(input_1);
      document.getElementById().innerHTML = sysselsatte;
    }
    if (input_2 in befolkning.getIDs){
      bef_info = befolkning.getInfo(input_2);
      document.getElementById().innerHTML = befolkning.getNameFrom(input_2);
      document.getElementById().innerHTML = input_2;
      sys_info = sysselsatte.getInfo(input_1);
      document.getElementById().innerHTML = sysselsatte
    }
  }
}

function sammenligningSearcher(){
  //Declare variables
  var input_1, input_2, filter_1, filter_2, table_1, table_2, tr, td, i, txtValue;
  input_1 = document.getElementById("sammenligning_input_1");
  input_2 = document.getElementById("sammenligning_input_2")
  filter_1 = input_1.value.toUpperCase();
  filter_2 = input_2.value.toUpperCase();
  table_1 = document.getElementById("sammenligning_table_1_big", "sammenligning_table_1_small")
  table_2 = document.getElementById("sammenligning_table_2_big", "sammenligning_table_2_small")
  tr = table.getElementsByTagName("tr")

  // Loop through all table rows, and hide those who don't match the search query
  for(i = 0; i < tr.length; i++){
    td = tr[i].getElementsByTagName("td")[1];
    if(td){
      txtValue = td.textContent || td.innerText;
      if(txtValue.toUpperCase().indexOf(filter_1 || filter_2) > -1){
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}
