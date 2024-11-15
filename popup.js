browser.runtime.sendMessage({ action: "getState" }, (response) => { //initialise
	let isEnabled = response.enabled;
	const toggleButton = document.getElementById("toggleButton");

	updateUI();
	
	toggleButton.addEventListener('click', () => {
		browser.runtime.sendMessage({ action: "toggleB"}, (response) => {
			setState(response.enabled)
			updateUI();
		})
	});

	function updateUI() {
		if (isEnabled) {
			toggleButton.classList.add("enabled");
			toggleButton.textContent = "On";
			return true;
		}
		toggleButton.classList.remove("enabled");
		toggleButton.textContent = "Off";	
	}

	function setState(newState) {
		isEnabled = newState;
		console.log("UI state changed")
	}
});

