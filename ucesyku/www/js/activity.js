// load the map
var mymap = L.map('mapid').setView([51.505, -0.09], 13);

// load the tiles
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {maxZoom: 18,
attribution: 'Map data &copy; <ahref="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>,' +
'Imagery © <a href="http://mapbox.com">Mapbox</a>',
id: 'mapbox.streets'
}).addTo(mymap);

var marker;
var circle;
// Found location and add marker with accuracy of position
function onLocationFound(){	
mymap.locate({enableHighAccuracy:true, setView: true,maxZoom: 20, watch: true}) /* This will return map so you can do chaining */
        .on('locationfound', function(e){
			var lat = (e.latitude);
			var lng = (e.longitude);
			var newLatLng = new L.LatLng(lat, lng);
			// the radius is set to 100 for searching points within 100 meters
			if (typeof(marker)==='undefined'){
				marker= new L.marker([e.latitude, e.longitude]);
				marker.addTo(mymap).bindPopup('Your are here :)');
				circle = L.circle([e.latitude, e.longitude], 100, {
                weight: 1,
                color: 'blue',
                fillColor: '#cacaca',
                fillOpacity: 0.2
            }).addTo(mymap);
			}
			else{
				marker.setLatLng(newLatLng);
				circle.setLatLng(newLatLng);
			}
			//var marker = L.marker([e.latitude, e.longitude]).addTo(mymap);
            //marker = L.marker([e.latitude, e.longitude]).update(marker).bindPopup('Your are here :)');
            //var circle = L.circle([e.latitude, e.longitude], e.accuracy/2, {
            //    weight: 1,
            //    color: 'blue',
            //    fillColor: '#cacaca',
            //    fillOpacity: 0.2
            //}).addTo(mymap);
			//marker.setLatLng(newLatLng); 
			//circle.setLatLng(newLatLng)
			mymap.fitBounds(circle);
})};



function loadQuestionData(){
alert('load the question here');
getQuestion();
}

//the first variables will hold the XMLHttpRequest() - this must be done outside the function so it will be global
//the second variable hold the layer itself
var client;
var questionlayer;
// questiondata will be used to compare correct answer in uplaodAnswer.js
var questiondata;
var testMarkerOrange=L.AwesomeMarkers.icon({
markerColor:'orange'
});

//create code to get the Earthquakes data using an XMLHttpRequest()
function getQuestion(){
	client=new XMLHttpRequest();
	client.open('GET',"http://developer.cege.ucl.ac.uk:30269/getPOI");
	client.onreadystatechange=questionResponds;client.send();
//note don't use questionResponds() with( brackets as that doesn't work
}
//create the code to wait for response from the data server, and process the response once it is received
function questionResponds(){
if(client.readyState==4){
	questiondata=client.responseText;
	loadQuestionlayer(questiondata);
	}
}


//convert the received data (text) to JSON format and add it to the map
function loadQuestionlayer(questiondata){
//convert text to JSON
var questionjson=JSON.parse(questiondata);
//add the JSONlayer on to the map
questionlayer=L.geoJson(questionjson,
{
//use point to layer to create the points
pointToLayer: function(feature, latlng){
	//look at GeoJSON file's properties
	//also include a popup that shows coords of the questions
	
	//questionid is visually hidden from the html
	//questionid is for comparing the correct answer while saving data to user_answer table
	//set variable to create popup content
	//startAnswerUpload not only upload data but also comparing user_answer with question<correct_answer>

	var popup=L.popup().setContent(
	'<input type="hidden" id= questionid value="'+feature.properties.id+'"></input>'+
	'<p>Question' +feature.properties.id+'</p>'+
	'<b>What movie was once filmed at <br />'+
	'<u>'+feature.properties.location_name+'</u>? </b><br />'+
	'<input type="radio" name="answer" id = check1 value="'+feature.properties.option1+'" checked="yes" />'+
	'<label for="check1">'+feature.properties.option1+'<br />'+
	'<input type="radio" name="answer" id = check2 value="'+feature.properties.option2+'" />'+
	'<label for="check2">'+feature.properties.option2+'<br />'+
	'<input type="radio" name="answer" id = check3 value="'+feature.properties.option3+'" />'+
	'<label for="check3">'+feature.properties.option3+'<br />'+
	'<input type="radio" name="answer" id = check4 value="'+feature.properties.option4+'" />'+
	'<label for="check4">'+feature.properties.option4+'<br />'+
	'<button onclick="startAnswerUpload()">Submit your answer</button>'
	);
	
	return L.marker(latlng,{icon:testMarkerOrange}).bindPopup(popup);;
	},
}).addTo(mymap);
mymap.fitBounds(questionlayer.getBounds());
}

//Remove data
function removeQuestionData(){
alert('questions will be removed');
mymap.removeLayer(questionlayer);
}
