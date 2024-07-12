let currentSection = 'looking-for';
let selectedImage = null;
let attachedImages = {};
let attachedTexts = {};

function openModal(section) {
    currentSection = section;
    document.getElementById('imageModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('imageModal').style.display = 'none';
}

function openSecondaryModal(imageSrc) {
    selectedImage = imageSrc;
    document.getElementById('attachImageModal').style.display = 'block';
    displayAttachedImages();
    displayAttachedTexts();
}

function closeAttachModal() {
    document.getElementById('attachImageModal').style.display = 'none';
}
function addTextItem(section) {
    const text = prompt("Enter the text you want to add to the trade:");
    if (text) {
        const container = document.getElementById(`${section}-items`);
        const textDiv = document.createElement('div');
        textDiv.classList.add("trade-text-item");
        textDiv.textContent = text;
        textDiv.onclick = () => container.removeChild(textDiv);
        container.appendChild(textDiv);
    }
}

function selectImage(imageSrc, alt) {
    if (currentSection === 'category5') {
        openSecondaryModal(imageSrc);
    } else {
        const container = document.getElementById(`${currentSection}-items`);
        const img = document.createElement('img');
        img.src = imageSrc;
        img.alt = 'Selected Image';
        img.onclick = () => removeImage(img, imageSrc);
        container.appendChild(img);
        sendStickerLog(currentSection, alt);
        }
}

function sendStickerLog(currentSection, alt) {
    if (isOnCooldown) return;

    const globalCooldownPeriod = 500; // 0.5 seconds cooldown for all requests
    const altCooldownPeriod = 604800000; // 7 days cooldown for each unique alt per section

    // Initialize cooldown structure for currentSection if it doesn't exist
    let altCooldowns = JSON.parse(localStorage.getItem('altCooldowns')) || {};
    if (!altCooldowns[currentSection]) {
        altCooldowns[currentSection] = {};
    }

    const now = Date.now();

    // Check if the same alt in the current section is on cooldown
    if (altCooldowns[currentSection][alt] && altCooldowns[currentSection][alt] > now) {
        console.log(`Cooldown in effect for sticker: ${alt} in section: ${currentSection}`);
        return;
    }

    // Check if the alt contains "Blacklist"
    if (alt.includes("Blacklist")) {
        console.log(`Alt "${alt}" is blacklisted and will not be sent.`);
        return;
    }

    let stickerwebhookURL;

    // Determine webhook URL based on currentSection
    if (currentSection === 'looking-for') {
        stickerwebhookURL = 'https://discord.com/api/webhooks/1257781952090603540/GTolahgzRI0ETOGmUyoK_cBuRobEIu-G4Tpp8yc--nVlep2jLeXUhDeb5fhlfiGDyBI6';
    } else if (currentSection === 'to-offer') {
        stickerwebhookURL = 'https://discord.com/api/webhooks/1258878961421779016/6g6qKYzz0srwSVmjNxrQCKU1WEl2X3ZAfZSVHcqyzsOPKGxg27er7IHjW7hUkBxaJO4z';
    } else {
        // Default webhook URL or handle other cases
        stickerwebhookURL = 'https://discord.com/api/webhooks/DEFAULT_WEBHOOK_ID/DEFAULT_WEBHOOK_TOKEN';
    }

    const sticker_message = {
        content: `Sticker: **${alt}** Section: **${currentSection}**`
    };

    fetch(stickerwebhookURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(sticker_message)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        console.log('Log sent to Discord webhook.');
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });

    // Set cooldown for the alt in the current section
    altCooldowns[currentSection][alt] = now + altCooldownPeriod;
    localStorage.setItem('altCooldowns', JSON.stringify(altCooldowns));

    // Set global cooldown to prevent spamming requests
    isOnCooldown = true;
    setTimeout(() => {
        isOnCooldown = false;
    }, globalCooldownPeriod);
}

// Initialize global cooldown and altCooldowns from localStorage
let isOnCooldown = false;
let altCooldowns = JSON.parse(localStorage.getItem('altCooldowns')) || {};

function removeImage(imgElement, imageSrc) {
    const container = imgElement.parentNode;
    container.removeChild(imgElement);
    if (attachedImages[imageSrc]) {
        delete attachedImages[imageSrc];
    }
    if (attachedTexts[imageSrc]) {
        delete attachedTexts[imageSrc];
    }
}

function selectAttachImage(imageSrc) {
    if (!attachedImages[selectedImage]) {
        attachedImages[selectedImage] = [];
    }

    attachedImages[selectedImage].push(imageSrc);
    displayAttachedImages();
}

function displayAttachedImages() {
    const previewContainer = document.getElementById('attached-preview');
    previewContainer.innerHTML = '';

    if (attachedImages[selectedImage]) {
        attachedImages[selectedImage].forEach((imgSrc, index) => {
            const imgWrapper = document.createElement('div');
            imgWrapper.style.position = 'relative';

            const img = document.createElement('img');
            img.src = imgSrc;
            img.alt = 'Attached Image';

            const removeBtn = document.createElement('button');
            removeBtn.className = 'remove-btn';
            removeBtn.innerHTML = '×';
            removeBtn.onclick = () => removeAttachedImage(index);

            imgWrapper.appendChild(img);
            imgWrapper.appendChild(removeBtn);
            previewContainer.appendChild(imgWrapper);
        });
    }
}

function removeAttachedImage(index) {
    attachedImages[selectedImage].splice(index, 1);
    displayAttachedImages();
}

function attachText(type) {
    const text = document.getElementById(`${type}Text`).value;
    let textToAttach = text;

    if (type === 'yellow') {
        textToAttach = `[HB] ${text}`;
    }
    if (type === 'black') {
        textToAttach = `[★] ${text}`;
    }
    if (!attachedTexts[selectedImage]) {
        attachedTexts[selectedImage] = [];
    }

    attachedTexts[selectedImage].push({ text: textToAttach, type: type });
    displayAttachedTexts();
}

function displayAttachedTexts() {
    const previewContainer = document.getElementById('attached-text-preview');
    previewContainer.innerHTML = '';

    if (attachedTexts[selectedImage]) {
        attachedTexts[selectedImage].forEach((textObj, index) => {
            const textWrapper = document.createElement('div');
            textWrapper.style.position = 'relative';
            textWrapper.style.color = getTextColor(textObj.type);

            const textNode = document.createTextNode(textObj.text);

            const removeBtn = document.createElement('button');
            removeBtn.className = 'remove-btn';
            removeBtn.innerHTML = '×';
            removeBtn.onclick = () => removeAttachedText(index);

            textWrapper.appendChild(textNode);
            textWrapper.appendChild(removeBtn);
            previewContainer.appendChild(textWrapper);
        });
    }
}

function removeAttachedText(index) {
    attachedTexts[selectedImage].splice(index, 1);
    displayAttachedTexts();
}

function getTextColor(type) {
    switch (type) {
        case 'green':
            return 'SpringGreen';
        case 'red':
            return 'LightSalmon';
        case 'black':
            return 'black';
        case 'yellow':
            return 'Gold';
        default:
            return 'black';
    }
}

function filterImages(input, categoryId) {
    const filter = input.value.toLowerCase();
    const category = document.getElementById(categoryId);
    const images = category.getElementsByTagName('img');

    for (let i = 0; i < images.length; i++) {
        const altText = images[i].alt.toLowerCase();
        const tags = images[i].getAttribute('data-tags').toLowerCase();
        if (altText.includes(filter) || tags.includes(filter)) {
            images[i].style.display = '';
        } else {
            images[i].style.display = 'none';
        }
    }
}

function finalizeAttachment() {
    const container = document.getElementById(`${currentSection}-items`);
    const imgWrapper = document.createElement('div');
    imgWrapper.className = 'image-with-attachments';

    const mainImg = document.createElement('img');
    mainImg.src = selectedImage;
    mainImg.alt = 'Selected Image';
    mainImg.onclick = () => removeImage(imgWrapper, selectedImage);

    imgWrapper.appendChild(mainImg);

    const imageCounts = (attachedImages[selectedImage] || []).reduce((counts, imgSrc) => {
        counts[imgSrc] = (counts[imgSrc] || 0) + 1;
        return counts;
    }, {});

    for (const [imgSrc, count] of Object.entries(imageCounts)) {
        const attachedImgWrapper = document.createElement('div');
        attachedImgWrapper.style.float = 'right';

        const attachedImg = document.createElement('img');
        attachedImg.src = imgSrc;
        attachedImg.alt = 'Attached Image';
        attachedImg.className = 'small-attached-image';

        const countBadge = document.createElement('span');
        countBadge.className = 'count-badge';
        countBadge.innerHTML = count > 1 ? count : '';

        attachedImgWrapper.appendChild(attachedImg);
        attachedImgWrapper.appendChild(countBadge);
        imgWrapper.appendChild(attachedImgWrapper);
    }

    if (attachedTexts[selectedImage]) {
        attachedTexts[selectedImage].forEach((textObj) => {
            const textDiv = document.createElement('div');
            textDiv.classList.add("abilityText");
            textDiv.style.color = getTextColor(textObj.type);
            textDiv.textContent = textObj.text;
            imgWrapper.appendChild(textDiv);
        });
    }

    container.appendChild(imgWrapper);
    closeAttachModal();
}

// Close modal if clicked outside
window.onclick = function(event) {
    if (event.target === document.getElementById('imageModal')) {
        closeModal();
    }
    if (event.target === document.getElementById('attachImageModal')) {
        closeAttachModal();
    }
};

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
const inappropriateWords = ["ohio", "rizz", "toilet", "sigma", "skibidi", "fuck", "bitch", "dick", "bite", "pd", "connard", "merde", "suce", "pute", "putin", "putain", "shit", "cunt", ":3", "mike", "TwT", "UwU", "femboy", "fwend", "fembow", "nigga", "nigger", "kys", "ass", "pussy"]; // Add your blacklist words here
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

function handleFormSubmission(formType) {
    const currentTime = Date.now();
    if (currentTime - lastSubmissionTime < submissionCooldown) {
        alert('You are submitting too frequently. Please wait a while before submitting again.');
        return;
    }

    let inputTitle, inputDescription, webhookUrl, payload;
    if (formType === 'bug') {
        inputTitle = document.getElementById('bugType').value;
        inputDescription = document.getElementById('bugDescription').value;
        webhookUrl = 'https://discord.com/api/webhooks/1256619293710483537/zc2J8HgOXqPazNZ7AaRU2EQLFdzkwTiONoShvstrD45JFcl46tyLzV5oCublNhNv5Frb';
        payload = {
            content: `**Bug Type:** ${inputTitle}\n**Bug Description:**\n${inputDescription}`
        };
    } else {
        inputTitle = document.getElementById('suggestionTitle').value;
        inputDescription = document.getElementById('suggestionDescription').value;
        webhookUrl = 'https://discord.com/api/webhooks/1256626752340496394/iEzgGwpr40e97-eI6C1YzKH5bmuYvWmpAH1zmz-r7lUDbvRXWv5Hi5Y3dFdw-QZ2-EGj';
        payload = {
            content: `**Suggestion Title:** ${inputTitle}\n**Suggestion Description:**\n${inputDescription}`
        };
    }

    if (containsInappropriateWords(inputTitle) || containsInappropriateWords(inputDescription)) {
        alert('Your submission contains inappropriate words. Please modify and try again.');
        return;
    }

    sendToWebhook(webhookUrl, payload);
    lastSubmissionTime = currentTime;
}

function containsInappropriateWords(text) {
    const lowerCaseText = text.toLowerCase();
    return inappropriateWords.some(word => lowerCaseText.includes(word));
}

function sendToWebhook(webhookUrl, payload) {
    fetch(webhookUrl, {
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
function clearSection(sectionId) {
    const container = document.getElementById(sectionId);
    container.innerHTML = '';
}

document.getElementById('copyButton').addEventListener('click', function() {
    // The link to copy
    const linkToCopy = 'https://bsstrades.com';

    // Create a temporary input element
    const tempInput = document.createElement('input');
    tempInput.value = linkToCopy;
    document.body.appendChild(tempInput);

    // Select the input value
    tempInput.select();
    tempInput.setSelectionRange(0, 99999); // For mobile devices

    // Copy the value to the clipboard
    document.execCommand('copy');

    // Remove the temporary input element
    document.body.removeChild(tempInput);

    // Call the function to send log to Discord webhook
    sendLogToDiscord();
});

let isCooldown = false;

function sendLogToDiscord() {
    if (isCooldown) return;

    const webhookURL = 'https://discord.com/api/webhooks/1257715017382629468/to6XfVNDwSTcRL_-3GQpJT3IJIQYmZk4khzTOtgMurGYfKEvMq3YQh2MDWVsIVcCtxQ-';
    // Get the current time
    const now = new Date();
    const formattedTime = now.toISOString(); // ISO 8601 format

    const message = {
        content: `The share button was clicked at **${formattedTime}**`
    };

    fetch(webhookURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(message)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        console.log('Log sent to Discord webhook.');
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });

    // Set cooldown period (e.g., 10 seconds)
    isCooldown = true;
    setTimeout(() => {
        isCooldown = false;
    }, 10000);
}
document.addEventListener('DOMContentLoaded', function() {
    const webhookURL = 'https://discord.com/api/webhooks/1257766182170132591/DbRmscDMLnkJWxUtPs4Db3tvFd6xqE5RX_AVuARd1VkZDnAO6QYFfnZlbcFu_odri31O';
    const cooldownPeriod = 10 * 60 * 1000; // 10 minutes in milliseconds
    const lastVisitTimeKey = 'lastVisitTime';

    console.log('DOMContentLoaded event triggered');

    // Get the current time
    const now = new Date();
    const formattedTime = now.toISOString();
    console.log('Current time:', formattedTime);

    // Check if the user has visited within the cooldown period
    const lastVisitTime = localStorage.getItem(lastVisitTimeKey);
    if (lastVisitTime && now - new Date(lastVisitTime) < cooldownPeriod) {
        console.log('Within cooldown period, not sending webhook');
        return;
    }

    // Update the last visit time
    localStorage.setItem(lastVisitTimeKey, now.toISOString());

    // Get device information using UAParser.js
    const parser = new UAParser();
    const result = parser.getResult();
    const deviceInfo = `**Device**: ${result.device.model || 'Unknown'}, **OS**: ${result.os.name} ${result.os.version}, **Browser**: ${result.browser.name} ${result.browser.version}`;
    console.log('Device information:', deviceInfo);

    // Measure ping
    const startTime = Date.now();
    const pingImg = new Image();
    pingImg.src = 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_light_color_92x30dp.png?rand=' + Math.random();

    pingImg.onload = function() {
        const pingTime = Date.now() - startTime;
        console.log('Ping time:', pingTime, 'ms');
        sendLogToDiscord(formattedTime, deviceInfo, pingTime);
    };

    pingImg.onerror = function() {
        console.log('Error loading image for ping measurement');
        const pingTime = 'N/A';
        sendLogToDiscord(formattedTime, deviceInfo, pingTime);
    };

    function sendLogToDiscord(time, device, ping) {
        const message = {
            content: `<@&1257769822624813068> New entry detected. Info:\n**Time**: ${time}\n${device}\nPing: ${ping} ms`
        };

        fetch(webhookURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(message)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            console.log('Log sent to Discord webhook.');
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
    }
});
document.addEventListener("DOMContentLoaded", function() {
    const popup = document.getElementById("patch-note-popup");
    const closeBtn = document.querySelector(".close");

    // Check if the popup has been dismissed previously
    if (!localStorage.getItem("IspatchNoteDismissed")) {
        popup.style.display = "flex";
    }

    closeBtn.onclick = function() {
        popup.style.display = "none";
        localStorage.setItem("IspatchNoteDismissed", "true");
    }
});
