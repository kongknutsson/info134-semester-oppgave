function openNav(){
  document.getElementById("sidenav").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
}
function closeNav(){
  document.getElementById("sidenav").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
}

/* openIntroduksjon*/  document.getElementById("Introduksjon").style.display = "block";
/*openOversikt*/  document.getElementById("Oversikt").style.display = "block";
/*openDetalj*/  document.getElementById("Detaljer").style.display = "block";
/*openSammenligning*/ document.getElementById("Sammenligning").style.display = "block";
/* closeIntroduksjon*/ document.getElementById("Introduksjon").style.display = "none";
/*closeOversikt*/ document.getElementById("Oversikt").style.display = "none";
/* closeDetaljer*/ document.getElementById("Detaljer").style.display = "none";
/*closeSammenligning*/ document.getElementById("Sammenligning").style.display = "none";

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
