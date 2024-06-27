function toggleAnswer(id) {
    var answer = document.getElementById('answer' + id);
    if (answer.style.display === "block") {
        answer.style.display = "none";
    } else {
        answer.style.display = "block";
    }
}
function toggleNav() {
    var sidebar = document.getElementById("mySidebar");
    var main = document.getElementById("main");
    var toggleButton = document.querySelector(".togglebtn");

    if (sidebar.style.width === "80px") {
        sidebar.style.width = "0";
        main.style.marginLeft = "0";
        toggleButton.innerHTML = "☰ Open";
    } else {
        sidebar.style.width = "80px";
        main.style.marginLeft = "80px";
        toggleButton.innerHTML = "✖ Close";
    }
}