let sitename = document.getElementById("title") ; 

let counturl = document.getElementById("counturl") ; 
let countforms = document.getElementById("countforms") ; 
let countpic = document.getElementById("countpic") ; 
let countpar = document.getElementById("countpar") ; 


let test1= document.getElementById("test1") ; 
let test2= document.getElementById("test2") ; 
let test3= document.getElementById("test3") ; 
let test4= document.getElementById("test4") ; 
let test5= document.getElementById("test5") ; 
let test6= document.getElementById("test6") ; 



chrome.runtime.onMessage.addListener((request , sender , sendresponse) => {
	if (request.url !== undefined) {
sitename.innerHTML = request.url;
let url ="https://"+request.url;
		fetch (url ,{
			method: "GET",
			mode: "cors"
		})
		.then(response => {
			if (response.ok) {
				testheaders(response.headers,"x-xss-protection",test1)
				testheaders(response.headers,"Referrer-Policy",test2)
				testheaders(response.headers,"X-Content-Type-Options",test3)
				testheaders(response.headers,"X-Frame-Options",test4)
				testheaders(response.headers,"Strict-Transport-Security",test5)
				testheaders(response.headers,"Content-Security-Policy",test6)
			}
			throw new Error("Response not ok");
		})
		.catch(error => {
			console.log(error);
		})


	}


request.counturl !== undefined?counturl.innerHTML = request.counturl.length:"";
request.countforms !==  undefined?countforms.innerHTML = request.countforms.length:"";
request.countpic !== undefined?countpic.innerHTML = request.countpic.length:"";
request.countpar !== undefined?countpar.innerHTML = request.countpar.length:"";


request.discurl !== undefined?result(request.discurl):"";
request.discforms !== undefined?result(request.discforms):"";
request.discpic !== undefined?result(request.discpic):"";
request.discpar !== undefined?result(request.discpar):"";

});

window.onload = (async () => {   mainfun(countfun)  ;   }) 

	
function result(shows){

	var x = document.getElementById('x');
	       x.parentElement.removeChild(x);
	       x = document.createElement('ol');
	       x.id = 'x';
		let uniq = [...new Set(shows)];
		for (let i = 0; i < uniq.length; i++) {
			
		var li = document.createElement("li");
		 li.style.fontSize = "15px";
		 li.style.backgroundColor = "rgb(215 210 210)";
	    let items = uniq[i]
		li.textContent = items ;
		 x.appendChild(li);
		 
           
		}
		document.getElementById('content').appendChild(x);

}

	function testheaders(data,headers,element){
		if (data.has(headers)) {
			element.style.color = "green";
			element.style.fontSize = "15px";
			element.innerHTML = headers + " => ok";
		   }else{ 
			element.style.color = "red";
			element.style.fontSize = "15px";
			element.innerHTML = headers + " => not ok "; }
	}


	// chrome.browserAction.setBadgeText({"text": '22'});
	// chrome.browserAction.setBadgeBackgroundColor({ color: [255, 0, 0, 255]});


function countfun() {

	let discurl = [];
	for (let i = 0; i < document.links.length; i++) {
		if (!document.links[i].href.includes("?")) {
			discurl.push(document.links[i].href);
		}
		
	}

	let counturl = [...new Set(discurl)];

	


	let discforms= [];
	for (let i = 0; i < document.forms.length; i++) {
		discforms.push(document.forms[i].outerHTML);
	}
	let countforms = [...new Set(discforms)];




	let discpic= [];
	for (let i = 0; i < document.images.length; i++) {
		discpic.push(document.images[i].src);
	}
	let countpic = [...new Set(discpic)];




	let discpar =[];
	for (let i = 0; i < document.links.length; i++) {
		
		if (document.links[i].href.includes("?")) {
		 discpar.push(document.links[i].href);
		}
	}
	let countpar = [...new Set(discpar)];

	



	let url = document.location.host;
	chrome.runtime.sendMessage({countpar});
	chrome.runtime.sendMessage({countpic});
	chrome.runtime.sendMessage({counturl});
	chrome.runtime.sendMessage({url});
	chrome.runtime.sendMessage({countforms});
	
}
function mainfun(funn) {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		var tab = tabs[0];
		
		chrome.scripting.executeScript({
		  target : {tabId : tab.id},
		  func : funn,
		});
	});
}

document.getElementById("buttonurl").onclick = (async () => {   mainfun(disc1)  ;   }) ;
function disc1() {

    let discurl = [];
	for (let i = 0; i < document.links.length; i++) {
		if (!document.links[i].href.includes("?")) {
			discurl.push(document.links[i].href);
		}
		
	}

	chrome.runtime.sendMessage({discurl});
	
}

document.getElementById("buttonforms").onclick = (async () => {   mainfun(disc2)  ;   }) ;
function disc2() {
	let discforms= [];
	for (let i = 0; i < document.forms.length; i++) {
		discforms.push(document.forms[i].outerHTML);
	}
	chrome.runtime.sendMessage({discforms});
}

document.getElementById("buttonpic").onclick = (async () => {   mainfun(disc3)  ;   }) ;
function disc3() {
	let discpic= [];
	for (let i = 0; i < document.images.length; i++) {
		discpic.push(document.images[i].src);
	}
	chrome.runtime.sendMessage({discpic});
}

document.getElementById("buttonpar").onclick = (async () => {   mainfun(disc4)  ;   }) ;
function disc4() {
	let discpar =[];
	for (let i = 0; i < document.links.length; i++) {
		
		if (document.links[i].href.includes("?")) {
	
		 discpar.push(document.links[i].href);
		}
	}
	
	chrome.runtime.sendMessage({discpar});
}

