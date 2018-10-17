var inputFile = document.getElementById("inputFile");
var pageBtn = document.getElementById("pageBtn");
var container = document.getElementById("info");

// Detect when button is pressed
pageBtn.addEventListener("click", function() {
	// Clear container when button is pressed
	while(container.hasChildNodes()) {
		container.removeChild(container.lastChild);
	}

	// Check whether given inputFile
	if(inputFile.value.length < 1){
		alert("Please enter a JSON page.");
	}
	else
	{
		loadPage();
	}
});

function loadPage() {
	var ourRequest = new XMLHttpRequest();
	ourRequest.open('GET', inputFile.value);
	ourRequest.onload = function() {
		if(ourRequest.status >= 200 && ourRequest.status <400) {
			var ourData = JSON.parse(ourRequest.responseText);
			createSearchTable(ourData);
		}
		else {
			alert("Error occurred loading information.");
		}
	};
	ourRequest.send();
}

function createSearchTable(data) {
	var table = '';
	console.log(Object.keys(data[0]).length);
	for(var key in data[0]){
		table += `<input type="checkbox" id="${key}" checked> ${key}<br>`;
		console.log(key);
	}
	table += `<p></p><input type="text" id="inputFile"> <button id="pageBtn">Search</button>`;
	container.insertAdjacentHTML('beforeend', `<form><p></p><h3>Show in search:</h3>${table}</form>`);
}