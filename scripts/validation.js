window.onload = initPage;
var usernameValid = false;
var passwordValid = false;

function initPage() {
	document.getElementById("username").onblur = checkUsername;
	document.getElementById("password2").onblur = checkPassword;
	document.getElementById("register").disabled = true;
	document.getElementById("register").onclick = registerUser;
}

function checkUsername() {
	document.getElementById("username").className = "thinking";

	document.getElementById("status").src = "images/inProcess.png";
	usernameRequest = createRequest();
	
	if (usernameRequest == null) { 
		//unable to send request
		alert("unable to send request");
	} else {
		var theName = document.getElementById("username").value;
		var username = escape(theName);
		var url = "checkName.php?username=" + username;
		request.onreadystatechange = showUsernameStatus;

		usernameRequest.open("GET", url, true);
		usernameRequest.send(null);	
	}
}

function showUsernameStatus() {
	//update the page to show whether the username is okay
	if (usernameRequest.readyState == 4) {
		if (usernameRequest.status == 200) {
			if (usernameRequest.responseText == "okay") {
				// if it's okay, no error message to show
				document.getElementById("username").className = "approved";
				usernameValid = true;
			} else {
				// if there's a problem, we'll tell the user here
				document.getElementById("username").className = "denied";
				document.getElementById("username").focus();
				document.getElementById("username").select();
				usernameValid = false;
			}
			checkFormStatus();
		}
	}
}

function checkPassword() {
	var password1 = document.getElementById("password1");
	var password2 = document.getElementById("password2");
	password1.className = "thinking";

	if ((password1.value == "") || (password1.value != password2.value)) {
		password1.className = "denied";
		passwordValid = false;
		checkFormStatus();
		return;
	} 

	var passwordRequest = createRequest();
	if (passwordRequest == null) {
		//wasn't able to create request
		return;
	} else {
		var password = escape(password1.value);
		var url = "checkPass.php?password" + password;
		passwordRequest.onreadystatechange = showPasswordStatus;
		passwordRequest.open("GET", url, true);
		passwordRequest.send(null);
	}
}

function showPasswordStatus() {
	if (passwordRequest.readyState == 4) {
		if (passwordRequest.status == 200) {
			var password1 = document.getElementById("password1");
			if (passwordRequest.responseText == "okay") {
				password1.className = "approved";
				passwordValid = true;
			} else {
				password1.className = "denied";
				password1.focus();
				password1.select();
				passwordValid = false;
			}
			checkFormStatus();
		}
	}
}	

function checkFormStatus() {
	if (usernameValid && passwordValid) {
		document.findElementById("register").disabled = false;
	} else {
		document.findElementById("register").disabled = true;
	}
}

function registerUser() {
	t = setInterval("scrollImages", 50);
	document.getElementById("register").value == "Processing...";
	registerRequest = createRequest();
	if (registerRequest == null) {
		//unable to create request
	} else {
		var url = "register.php?username=" + 
			escape(document.getElementById("username").value) + "?password=" +
			escape(document.getElementById("password1").value);
		registerRequest.onreadystatechange = registrationProcessed;
		registerRequest.open("GET", url, true);
		registerRequest.send(null);
	}
}

function registrationProcessed() {
	if (registerRequest.readyState == 4) {
		if (registerRequest.status == 200) {
			document.getElementById("wrapper").innerHTML = registerRequest.responseText;
		}
	}
}

function scrollImages() {
	var coverBarDiv = document.getElementById("coverBar");
	var images = coverBarDiv.getElementsByTageName("img");
	for (var i = 0; i < images.length; i++) {
		var left = images[i].style.left.substr(0, images[i].style.left.length - 2);
		if (left <= -86) {
			left = 532;
		}
		images[i].style.left = (left - 1) + "px";
	}
}


