window.onload = initPage;

function initPage() {
	document.getElementById("username").onblur = checkUsername;
}

function checkUsername() {
	document.getElementById("username").className = "thinking";

	document.getElementById("status").src = "images/inProcess.png";
	request = createRequest();
	
	if (request == null) { 
		//unable to send request
		alert("unable to send request");
	} else {
		var theName = document.getElementById("username").value;
		var username = escape(theName);
		var url = "checkName.php?username=" + username;
		request.onreadystatechange = showUsernameStatus;

		request.open("GET", url, true);
		request.send(null);	
	}
}

function showUsernameStatus() {
	//update the page to show whether the username is okay
	if (request.readyState == 4) {
		if (request.status == 200) {
			if (request.responseText == "okay") {
				// if it's okay, no error message to show
				document.getElementById("username").className = "approved";
			} else {
				// if there's a problem, we'll tell the user here
				document.getElementById("username").className = "denied";
			}
		}
	}
}