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
document.addEventListener('DOMContentLoaded', function() {
    const profilePics = document.querySelectorAll('.profile-pic');
    const tooltip = document.getElementById('tooltip');

    profilePics.forEach(pic => {
        pic.addEventListener('mouseenter', function(event) {
            const name = this.parentElement.getAttribute('data-name');
            tooltip.innerText = name;
            tooltip.style.opacity = 1;
        });

        pic.addEventListener('mousemove', function(event) {
            tooltip.style.top = `${event.pageY + 10}px`;
            tooltip.style.left = `${event.pageX + 10}px`;
        });

        pic.addEventListener('mouseleave', function() {
            tooltip.style.opacity = 0;
        });
    });
});
