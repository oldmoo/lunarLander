var y = 10; // altura inicial y0=10%, debe leerse al iniciar si queremos que tenga alturas diferentes dependiendo del dispositivo
var v = 0;
var g = 1.622;
var a = g;
var dt = 0.016683;
var timer=null;
var timerFuel=null;
var fuel=100;
var alturaMax = 70;

//al cargar por completo la página...
window.onload = function(){
	//definición de eventos
	//mostrar menú móvil
    	document.getElementById("showm").onclick = function () {
		document.getElementsByClassName("c")[0].style.display = "block";
		stop();
	}
	//ocultar menú móvil
	document.getElementById("hidem").onclick = function () {
		document.getElementsByClassName("c")[0].style.display = "none";
		start();
	}
	//encender/apagar el motor al hacer click en la pantalla
	document.onclick = function () {
 	  if (a==g){
  		motorOn();
 	  } else {
  		motorOff();
 	  }
	}
	//encender/apagar al apretar/soltar una tecla
	document.onkeydown = motorOn;
	document.onkeyup = motorOff;
	document.onmousedown = motorOn;
	document.onmouseup = motorOff;

	
	//Empezar a mover nave
	start();
}

//Definición de funciones
function start(){
	timer=setInterval(function(){ moverNave(); }, dt*1000);
}

function stop(){
	clearInterval(timer);
}

function moverNave(){
	v +=a*dt;
	document.getElementById("velocidad").innerHTML=v;
	y +=v*dt;
	document.getElementById("altura").innerHTML=y;
	
	//mover hasta que top sea un 70% de la pantalla
	if (y<=alturaMax){ 
		document.getElementById("nave").style.top = y+"%"; 
	
	} else { 
			if(fuel<0 || v>=5 || y<=0 ){
		 
		document.getElementById("naveimg").src = "img/explo.gif";
		//alert("Has perdido, has aterrizado a mas de 5 m/s");
	}else{
		
		alert("Has aterrizado a "+v.toFixed(2)+ " m/s");
		
	}
		stop();
	}
}


function motorOn(){
	a=-g;
	if (timerFuel==null)
	timerFuel=setInterval(function(){ actualizarAltura(); }, 10);	
}
function motorOff(){
	a=g;
	clearInterval(timerFuel);
	timerFuel=null;
}
function actualizarAltura(){
	//Aquí hay que cambiar el valor del marcador de Fuel...
	fuel-=0.1;
	document.getElementById("fuel").innerHTML=fuel;	
}