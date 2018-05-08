function startAnswerUpload() {
	alert ("start data upload");
	// get value from index.html
	var user_name = document.getElementById("user_name").value;
	var questionid = document.getElementById("questionid").value;
	var answer = document.querySelector('input[name="answer"]:checked').value;
	alert("user name:"+ user_name + "question number: "+ questionid + "user's answer: "+answer);
	
	var postString = "user_name="+user_name +"&questionid="+questionid+"&answer="+answer;	
	processData(postString);
	checkCorrectAnswer(questionid,answer);

}

var client;

function processData(postString) {
   client = new XMLHttpRequest();
   //Upload to user_answer table
   //change the path from /uploadData to /uploadAnswer
   client.open('POST','http://developer.cege.ucl.ac.uk:30269/uploadAnswer',true);
   client.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
   client.onreadystatechange = dataUploaded;  
   client.send(postString);
}
// create the code to wait for the response from the data server, and process the response once it is received
function dataUploaded() {
  // this function listens out for the server to say that the data is ready - i.e. has state 4
  if (client.readyState == 4) {
    // change the DIV to show the response
    document.getElementById("dataUploadResult").innerHTML = client.responseText;
	if (client.responseText !=='answer row inserted'){alert('row data has mistake')};
    }
	

}

function checkCorrectAnswer(questionid, answer){
	alert(questionid+ ' take user answer:'+answer);
	
function compareUserAnswer(questiondata){
	var questionjson=JSON.parse(questiondata);
	alert(questionjson[0].type);
	
	for(var i = 0; i < questionjson[0].features.length; i++) {
	var feature = questionjson[0].features[i];
	if (questionid==feature["properties"]["id"]){
		alert('loop to'+questionid+feature["properties"]["id"]+'now')
		if (answer==feature["properties"]["correct_answer"]){
		alert('You are correct, the answer is: '+feature["properties"]["correct_answer"])}
		else{alert('Wrong answer! The correct answer is:'+feature["properties"]["correct_answer"])}
	}else{alert('next one!')}
			
	}
}
compareUserAnswer(questiondata);	
}