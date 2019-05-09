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

function addToTest_2(){
  addToSammenligning_1(befolkning, sysselsatte)
  addToSammenligning_2(befolkning, sysselsatte)
}

function addToSammenligning_1(befolkning, sysselsatte){
  var input_1 = document.getElementById("sammenligning_input_1").value;
  submitOK = "true";


  bef_info = befolkning.getInfo(input_1);
  if (typeof bef_info == "undefined"){
    document.getElementById("table_sammenligning_hide").style.display = "none";
    return;
  }

  document.getElementById("output_kommunenavn_1").innerHTML = befolkning.getNameFrom(input_1);
  document.getElementById("output_kommunenr_1").innerHTML = input_1;

  sys_info = sysselsatte.getInfo(input_1);
  var menn_Arbeid = document.getElementById("output_menn_arbeid_1_2018").innerHTML = "2018: " + sys_info.Menn[2018];
  var menn_Arbeid = document.getElementById("output_menn_arbeid_1_2017").innerHTML = "2017: " + sys_info.Menn[2017];
  var menn_Arbeid = document.getElementById("output_menn_arbeid_1_2016").innerHTML = "2016: " + sys_info.Menn[2016];
  var menn_Arbeid = document.getElementById("output_menn_arbeid_1_2015").innerHTML = "2015: " + sys_info.Menn[2015];
  var menn_Arbeid = document.getElementById("output_menn_arbeid_1_2014").innerHTML = "2014: " + sys_info.Menn[2014];
  var menn_Arbeid = document.getElementById("output_menn_arbeid_1_2013").innerHTML = "2013: " + sys_info.Menn[2013];
  var menn_Arbeid = document.getElementById("output_menn_arbeid_1_2012").innerHTML = "2012: " + sys_info.Menn[2012];
  var menn_Arbeid = document.getElementById("output_menn_arbeid_1_2011").innerHTML = "2011: " + sys_info.Menn[2011];
  var menn_Arbeid = document.getElementById("output_menn_arbeid_1_2010").innerHTML = "2010: " + sys_info.Menn[2010];
  var menn_Arbeid = document.getElementById("output_menn_arbeid_1_2009").innerHTML = "2009: " + sys_info.Menn[2009];
  var menn_Arbeid = document.getElementById("output_menn_arbeid_1_2008").innerHTML = "2008: " + sys_info.Menn[2008];
  var menn_Arbeid = document.getElementById("output_menn_arbeid_1_2007").innerHTML = "2007: " + sys_info.Menn[2007];
  var menn_Arbeid = document.getElementById("output_menn_arbeid_1_2006").innerHTML = "2006: " + sys_info.Menn[2006];
  var menn_Arbeid = document.getElementById("output_menn_arbeid_1_2005").innerHTML = "2005: " + sys_info.Menn[2005];
  var kvinner_Arbeid = document.getElementById("output_kvinner_arbeid_1_2018").innerHTML = "2018: " + sys_info.Kvinner[2018];
  var kvinner_Arbeid = document.getElementById("output_kvinner_arbeid_1_2017").innerHTML = "2017: " + sys_info.Kvinner[2017];
  var kvinner_Arbeid = document.getElementById("output_kvinner_arbeid_1_2016").innerHTML = "2016: " + sys_info.Kvinner[2016];
  var kvinner_Arbeid = document.getElementById("output_kvinner_arbeid_1_2015").innerHTML = "2015: " + sys_info.Kvinner[2015];
  var kvinner_Arbeid = document.getElementById("output_kvinner_arbeid_1_2014").innerHTML = "2014: " + sys_info.Kvinner[2014];
  var kvinner_Arbeid = document.getElementById("output_kvinner_arbeid_1_2013").innerHTML = "2013: " + sys_info.Kvinner[2013];
  var kvinner_Arbeid = document.getElementById("output_kvinner_arbeid_1_2012").innerHTML = "2012: " + sys_info.Kvinner[2012];
  var kvinner_Arbeid = document.getElementById("output_kvinner_arbeid_1_2011").innerHTML = "2011: " + sys_info.Kvinner[2011];
  var kvinner_Arbeid = document.getElementById("output_kvinner_arbeid_1_2010").innerHTML = "2010: " + sys_info.Kvinner[2010];
  var kvinner_Arbeid = document.getElementById("output_kvinner_arbeid_1_2009").innerHTML = "2009: " + sys_info.Kvinner[2009];
  var kvinner_Arbeid = document.getElementById("output_kvinner_arbeid_1_2008").innerHTML = "2008: " + sys_info.Kvinner[2008];
  var kvinner_Arbeid = document.getElementById("output_kvinner_arbeid_1_2007").innerHTML = "2007: " + sys_info.Kvinner[2007];
  var kvinner_Arbeid = document.getElementById("output_kvinner_arbeid_1_2006").innerHTML = "2006: " + sys_info.Kvinner[2006];
  var kvinner_Arbeid = document.getElementById("output_kvinner_arbeid_1_2005").innerHTML = "2005: " + sys_info.Kvinner[2005];



  document.getElementById("table_sammenligning_hide").style.display = "block";
}

function addToSammenligning_2(befolkning, sysselsatte){
  var input_2 = document.getElementById("sammenligning_input_2").value;
  submitOK = "true";


  bef_info = befolkning.getInfo(input_2);
  if (typeof bef_info == "undefined"){
    document.getElementById("table_sammenligning_hide").style.display = "none";
    return;
  }

  document.getElementById("output_kommunenavn_2").innerHTML = befolkning.getNameFrom(input_2);
  document.getElementById("output_kommunenr_2").innerHTML = input_2;

  sys_info = sysselsatte.getInfo(input_2);
  var menn_Arbeid = document.getElementById("output_menn_arbeid_2_2018").innerHTML = "2018: " + sys_info.Menn[2018];
  var menn_Arbeid = document.getElementById("output_menn_arbeid_2_2017").innerHTML = "2017: " + sys_info.Menn[2017];
  var menn_Arbeid = document.getElementById("output_menn_arbeid_2_2016").innerHTML = "2016: " + sys_info.Menn[2016];
  var menn_Arbeid = document.getElementById("output_menn_arbeid_2_2015").innerHTML = "2015: " + sys_info.Menn[2015];
  var menn_Arbeid = document.getElementById("output_menn_arbeid_2_2014").innerHTML = "2014: " + sys_info.Menn[2014];
  var menn_Arbeid = document.getElementById("output_menn_arbeid_2_2013").innerHTML = "2013: " + sys_info.Menn[2013];
  var menn_Arbeid = document.getElementById("output_menn_arbeid_2_2012").innerHTML = "2012: " + sys_info.Menn[2012];
  var menn_Arbeid = document.getElementById("output_menn_arbeid_2_2011").innerHTML = "2011: " + sys_info.Menn[2011];
  var menn_Arbeid = document.getElementById("output_menn_arbeid_2_2010").innerHTML = "2010: " + sys_info.Menn[2010];
  var menn_Arbeid = document.getElementById("output_menn_arbeid_2_2009").innerHTML = "2009: " + sys_info.Menn[2009];
  var menn_Arbeid = document.getElementById("output_menn_arbeid_2_2008").innerHTML = "2008: " + sys_info.Menn[2008];
  var menn_Arbeid = document.getElementById("output_menn_arbeid_2_2007").innerHTML = "2007: " + sys_info.Menn[2007];
  var menn_Arbeid = document.getElementById("output_menn_arbeid_2_2006").innerHTML = "2006: " + sys_info.Menn[2006];
  var menn_Arbeid = document.getElementById("output_menn_arbeid_2_2005").innerHTML = "2005: " + sys_info.Menn[2005];
  var kvinner_Arbeid = document.getElementById("output_kvinner_arbeid_2_2018").innerHTML = "2018: " + sys_info.Kvinner[2018];
  var kvinner_Arbeid = document.getElementById("output_kvinner_arbeid_2_2017").innerHTML = "2017: " + sys_info.Kvinner[2017];
  var kvinner_Arbeid = document.getElementById("output_kvinner_arbeid_2_2016").innerHTML = "2016: " + sys_info.Kvinner[2016];
  var kvinner_Arbeid = document.getElementById("output_kvinner_arbeid_2_2015").innerHTML = "2015: " + sys_info.Kvinner[2015];
  var kvinner_Arbeid = document.getElementById("output_kvinner_arbeid_2_2014").innerHTML = "2014: " + sys_info.Kvinner[2014];
  var kvinner_Arbeid = document.getElementById("output_kvinner_arbeid_2_2013").innerHTML = "2013: " + sys_info.Kvinner[2013];
  var kvinner_Arbeid = document.getElementById("output_kvinner_arbeid_2_2012").innerHTML = "2012: " + sys_info.Kvinner[2012];
  var kvinner_Arbeid = document.getElementById("output_kvinner_arbeid_2_2011").innerHTML = "2011: " + sys_info.Kvinner[2011];
  var kvinner_Arbeid = document.getElementById("output_kvinner_arbeid_2_2010").innerHTML = "2010: " + sys_info.Kvinner[2010];
  var kvinner_Arbeid = document.getElementById("output_kvinner_arbeid_2_2009").innerHTML = "2009: " + sys_info.Kvinner[2009];
  var kvinner_Arbeid = document.getElementById("output_kvinner_arbeid_2_2008").innerHTML = "2008: " + sys_info.Kvinner[2008];
  var kvinner_Arbeid = document.getElementById("output_kvinner_arbeid_2_2007").innerHTML = "2007: " + sys_info.Kvinner[2007];
  var kvinner_Arbeid = document.getElementById("output_kvinner_arbeid_2_2006").innerHTML = "2006: " + sys_info.Kvinner[2006];
  var kvinner_Arbeid = document.getElementById("output_kvinner_arbeid_2_2005").innerHTML = "2005: " + sys_info.Kvinner[2005];

  document.getElementById("table_sammenligning_hide").style.display = "block";
}
