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

const inappropriateWords = ["@here", "@everyone", "ohio", "rizz", "toilet", "sigma", "skibidi", "fuck", "bitch", "dick", "bite", "pd", "connard", "merde", "suce", "pute", "putin", "putain", "shit", "cunt", ":3", "mike", "TwT", "UwU", "femboy", "fwend", "fembow", "nigga", "nigger", "kys", "ass", "pussy"]; // Add your blacklist words here

let lastSubmissionTime = 0;
const submissionCooldown = 60000; // 1 minute cooldown

document.getElementById('bugReportForm').addEventListener('submit', function(event) {
    event.preventDefault();
    handleFormSubmission('bug');
});

document.getElementById('suggestionForm').addEventListener('submit', function(event) {
    event.preventDefault();
    handleFormSubmission('suggestion');
});

const bugLogServerSide = 'aHR0cHM6Ly9kaXNjb3JkLmNvbS9hcGkvd2ViaG9va3MvMTI2OTU3NzMwMDU1NTQ2NDcwNS96a2xvR3ZBRFZGNXFzaHdiUkdXVHJfMEpxRXdpVWpsWXpVeGdCM0N5UWlqaV9NTVpfWV95N2UxZHp5aGJveWoxQ0Jqaw==';
const sugLogServerSide = 'aHR0cHM6Ly9kaXNjb3JkLmNvbS9hcGkvd2ViaG9va3MvMTI2OTU3NzIxODQ5Nzk3NDI5Mi9jWldoNWhwbDFpR05tX0pjNUdRRDdhdHZwSDNfcXc4SEZnSTFrSkZwUWpwemJGNUxwOEdNSGF0TF94QUlGN1RaSVktUw==';

function decodeBase64(encoded) {
    return atob(encoded);
}

function handleFormSubmission(formType) {
    const currentTime = Date.now();
    if (currentTime - lastSubmissionTime < submissionCooldown) {
        alert('You are submitting too frequently. Please wait a while before submitting again.');
        return;
    }

    let inputTitle, inputDescription, diagnosisUrl, payload;
    if (formType === 'bug') {
        inputTitle = document.getElementById('bugType').value;
        inputDescription = document.getElementById('bugDescription').value;
        diagnosisUrl = decodeBase64(bugLogServerSide);
        payload = {
            content: `**Bug Type:** ${inputTitle}\n**Bug Description:**\n${inputDescription}`
        };
    } else {
        inputTitle = document.getElementById('suggestionTitle').value;
        inputDescription = document.getElementById('suggestionDescription').value;
        diagnosisUrl = decodeBase64(sugLogServerSide);
        payload = {
            content: `**Suggestion Title:** ${inputTitle}\n**Suggestion Description:**\n${inputDescription}`
        };
    }

    if (containsInappropriateWords(inputTitle) || containsInappropriateWords(inputDescription)) {
        alert('Your submission contains inappropriate words. Please modify and try again.');
        return;
    }

    sendToWebhook(diagnosisUrl, payload);
    lastSubmissionTime = currentTime;
}

function containsInappropriateWords(text) {
    const lowerCaseText = text.toLowerCase();
    return inappropriateWords.some(word => lowerCaseText.includes(word));
}

function sendToWebhook(diagnosisUrl, payload) {
    fetch(diagnosisUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    .then(response => {
        if (response.ok) {
            alert('Feedback submitted successfully!');
            document.querySelectorAll('.feedback-form').forEach(form => form.reset());
        } else {
            alert('Error submitting feedback. Please try again.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error submitting feedback. Please try again.');
    });
}
