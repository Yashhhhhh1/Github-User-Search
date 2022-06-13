const userInput = document.getElementById("search-input");
const submitBtn = document.getElementById("submit-btn");
const avatarImg = document.getElementById("avatar-img");

function getData() {
	$("#loading-text").css("display", "block");
	$("#user-card").css("display", "none");

	$.get(`https://api.github.com/users/${userInput.value.trim()}`)
		.then(res => {
			$("#user-card").css("display", "block")
			avatarImg.src = res.avatar_url;
			$("#name").text(res.name);
			$("#repos").text(res.public_repos);
			$("#followers").text(res.followers);
			$("#following").text(res.following);
			$("#profile-link").html(`<a href=${res.html_url} target="_blank" id="profile-link">${res.html_url}</a>`)
			$("#loading-text").css("display", "none");
		})
		.catch(err => {
			alert(`No user found.`)
			$("#loading-text").css("display", "none");
		})
}

submitBtn.addEventListener("click", () => {
	if (userInput.value.trim()) {
		getData();
	} else {
		alert("Please enter username.")
	}
	userInput.value = "";
	
})

userInput.addEventListener("keydown", (e) => {
	if (e.code == "Enter") {
		if (userInput.value.trim()) {
			getData();
		} else {
			alert("Please enter username.")
		}
		userInput.value = "";
	}
})