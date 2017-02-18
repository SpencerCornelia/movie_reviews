window.onload = initPage;

function initPage() {
	document.getElementById("username").onblur = checkUsername;
	document.getElementById("register").disabled = true;
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
				document.getElementById("register").disabled = false;
			} else {
				// if there's a problem, we'll tell the user here
				document.getElementById("username").className = "denied";
				document.getElementById("username").focus();
				document.getElementById("username").select();
				document.getElementById("register").disabled = true;
			}
		}
	}
}

function checkPassword() {
	var password1 = document.getElementById("password1");
	var password2 = document.getElementById("password2");
	password1.className = "thinking";

	if ((password1.value == "") || (password1.value != password2.value)) {
		password1.className = "denied";
		return;
	} 

	var request = createRequest();
	if (request == null) {
		//wasn't able to create request
		return;
	} else {
		var password = escape(password1.value);
		var url = "checkPass.php?password" + password;
		request.onreadystatechange = showPasswordStatus;
		request.open("GET", url, true);
		request.send(null);
	}
}

function showPasswordStatus() {
	if (request.readyState == 4) {
		if (request.status == 200) {
			var password1 = document.getElementById("password1");
			if (request.responseText == "okay") {
				password1.className = "approved";
				document.getElementById("register").disabled = false;
			} else {
				password1.className = "denied";
				password1.focus();
				password1.select();
				document.getElementById("register").disabled = true;
			}
		}
	}
}	