function openPage(pageName, elmnt, color) {
  // Hide all elements with class="tabcontent" by default */
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  // Remove the background color of all tablinks/buttons
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].style.backgroundColor = "";
  }
  // Show the specific tab content
  document.getElementById(pageName).style.display = "block";
  // Add the specific color to the button used to open the tab content
  elmnt.style.backgroundColor = color;
}
// Get the element with id="defaultOpen" and click on it

// parsing OBS, må endre på variabelnavn!
window.onload = function() {
    document.getElementById("Save").onclick = function gud2() {
        var Url = "http://wildboy.uib.no/~tpe056/folk/104857.json";
        var xhr = new XMLHttpRequest();
        var kommunenr = (document.forms["myForm"]["id"].value);
        xhr.open('GET', Url, true);
        xhr.send();
        xhr.onreadystatechange = processRequest;

        function processRequest(e) {
            if (this.readyState === 4 && this.status === 200) {
                var response1 = JSON.parse(xhr.responseText);
                var data = Object.entries(response1.elementer);
                var i = 0;
                for (var i; i < data.length; i++) {
                    if (parseInt(data[i][1].kommunenummer) == kommunenr) {
                        mennData = data[i][1].Menn
                        kvinneData = data[i][1].Kvinner
                        console.log("success");
                        document.getElementById("KommuneNavn").innerHTML = data[i][0];
                        document.getElementById("KommuneNummer").innerHTML = kommunenr;
                        document.getElementById("menn").innerHTML = mennData["2018"];
                        document.getElementById("kvinner").innerHTML = kvinneData["2018"];
                        break;
                    }
                }
            }
        }

        var url1 = "http://wildboy.uib.no/~tpe056/folk/100145.json";
        var xhr1 = new XMLHttpRequest();
        console.log(kommunenr);
        xhr1.open('GET', url1, true);
        xhr1.send();
        xhr1.onreadystatechange = processRequest1;

        function processRequest1(e) {
            if (this.readyState === 4 && this.status === 200) {
                var response2 = JSON.parse(xhr1.responseText);
                var data1 = Object.entries(response2.elementer);
                var i = 0;
                for (var i; i < data1.length; i++) {
                    if (parseInt(data1[i][1].kommunenummer) == kommunenr) {
                        console.log("success1");
                        alleData1 = data1[i][1];
                        mennData1 = alleData1.Menn;
                        kvinneData1 = alleData1.Kvinner;
                        beggeKjønn1 = alleData1['Begge kjønn'];
                        document.getElementById("menniarbeid1").innerHTML = mennData1["2018"];
                        document.getElementById("kvinneriarbeid1").innerHTML = kvinneData1["2018"];
                        document.getElementById("beggekjønniarbeid1").innerHTML = beggeKjønn1["2018"];
                    }
                }
            }
        }

        var url2 = "http://wildboy.uib.no/~tpe056/folk/85432.json";
        var xhr2 = new XMLHttpRequest();
        console.log(kommunenr);
        xhr2.open('GET', url2, true);
        xhr2.send();
        xhr2.onreadystatechange = processRequest2;

        function processRequest2(e) {
            if (this.readyState === 4 && this.status === 200) {
                var response3 = JSON.parse(xhr2.responseText);
                var data2 = Object.entries(response3.elementer);
                var i = 0;
                for (var i; i < data2.length; i++) {
                    if (parseInt(data2[i][1].kommunenummer) == kommunenr) {
                        console.log("success2");
                        console.log(data2[i][1]["01"].Menn);
                        document.getElementById("M01").innerHTML = data2[i][1]["01"].Menn["2017"];
                        document.getElementById("M02a").innerHTML = data2[i][1]["02a"].Menn["2017"];
                        document.getElementById("M11").innerHTML = data2[i][1]["11"].Menn["2017"];
                        document.getElementById("M03a").innerHTML = data2[i][1]["03a"].Menn["2017"];
                        document.getElementById("M04a").innerHTML = data2[i][1]["03a"].Menn["2017"];
                        document.getElementById("M09a").innerHTML = data2[i][1]["09a"].Menn["2017"];

                        document.getElementById("K01").innerHTML = data2[i][1]["01"].Kvinner["2017"];
                        document.getElementById("K02a").innerHTML = data2[i][1]["02a"].Kvinner["2017"];
                        document.getElementById("K11").innerHTML = data2[i][1]["11"].Kvinner["2017"];
                        document.getElementById("K03a").innerHTML = data2[i][1]["03a"].Kvinner["2017"];
                        document.getElementById("K04a").innerHTML = data2[i][1]["04a"].Kvinner["2017"];
                        document.getElementById("K09a").innerHTML = data2[i][1]["09a"].Kvinner["2017"];

                    }
                }
            }

        }
    };

    document.getElementById("Save3").onclick = function gud() {
        var Url3 = "http://wildboy.uib.no/~tpe056/folk/104857.json";
        var xhr3 = new XMLHttpRequest();
        var kommunenr3 = (document.forms["myForm3"]["id3"].value);
        xhr3.open('GET', Url3, true);
        xhr3.send();
        xhr3.onreadystatechange = processRequest3;

        function processRequest3(e3) {
            if (this.readyState === 4 && this.status === 200) {
                var response4 = JSON.parse(xhr3.responseText);
                var data3 = Object.entries(response4.elementer);
                var i3 = 0;
                console.log(data3);
                console.log(kommunenr3);
                console.log(data3[i3][1].Menn);
                for (var i3; i3 < data3.length; i3++) {
                    if (parseInt(data3[i3][1].kommunenummer) == kommunenr3) {
                        mennData3 = data3[i3][1].Menn
                        kvinneData3 = data3[i3][1].Kvinner
                        console.log("success");
                        document.getElementById("KommuneNavn3").innerHTML = data3[i3][0];
                        document.getElementById("KommuneNummer3").innerHTML = kommunenr3;
                        document.getElementById("menn3").innerHTML = mennData3["2018"];
                        document.getElementById("kvinner3").innerHTML = kvinneData3["2018"];
                        break;
                    }
                }
            }
        }
    };
};