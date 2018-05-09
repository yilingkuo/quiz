//AJAX

var xhr;//define the global variable to process the AJAX request
function callDivChange(){
	xhr = new XMLHttpRequest();
	//var filename=document.getElementById('filename').value;
	xhr.open('GET','help.html',true);
	xhr.onreadystatechange=processDivChange;
	try{
		xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
	}
	catch(e){
		//this only works in internet explorer
	}
	xhr.send();
}

function processDivChange(){
	if(xhr.readyState<4) //while waiting response from server
	document.getElementById('userguide').innerHTML='Loading...';
	
	else if(xhr.readyState===4){ //4=response from server has been completely loaded.
		if(xhr.status==200) //http status between 200-299 are all successful
			document.getElementById('userguide').innerHTML= xhr.responseText;
	}
}

// for overlay dark background
function on() {
    document.getElementById("overlay").style.display = "block";
}

function off() {
    document.getElementById("overlay").style.display = "none";
}