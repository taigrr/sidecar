var paused = false
function sendTabs(){
	if (paused){
		return
	}
	chrome.tabs.query({}, function(tabs) {
		var allTabs={"tabs":tabs};
		fetch("http://localhost:15150/post-tabs", {method: "POST", 
			headers: {'Content-Type': 'application/json'}, 
			body: JSON.stringify(allTabs)})
			.then(function(response){
				return response.json();
			}).then( res => {
				if (res.close){
					chrome.tabs.remove(res.close)
				}
			})
			.catch(err => {console.log(err)})
			.finally(() => {console.log(JSON.stringify(allTabs))})
	});
}
chrome.action.onClicked.addListener((tab) => {
	paused = !paused
	var fname = ""
	if (!paused){
		fname = "static/icon-32.png"
		sendTabs()
	} else {
		fname = "static/icon-paused-32.png"
	}
	chrome.action.setIcon({ path: fname });
});

chrome.tabs.onCreated.addListener((tab) => {
	sendTabs()
});
