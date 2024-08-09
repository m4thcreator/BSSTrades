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

function openSecondaryModal(imageSrc, alt) {
    selectedImage = imageSrc;
    selectedAlt = alt; // Ensure selectedAlt is set
    document.getElementById('attachImageModal').style.display = 'block';
    displayAttachedImages();
    displayAttachedTexts();
}

function closeAttachModal() {
    document.getElementById('attachImageModal').style.display = 'none';
    selectedImage = null;
    selectedAlt = null; // Reset selectedAlt here
}
function addTextItem(section) {
    const text = prompt("Enter the text you want to add to the trade:");
    if (text) {
        const container = document.getElementById(`${section}-items`);
        const textDiv = document.createElement('div');
        textDiv.classList.add("trade-text-item");
        textDiv.textContent = text;
        textDiv.onclick = () => {
            container.removeChild(textDiv);
            autoSave(); // Auto-save after removing text
        };
        container.appendChild(textDiv);
        autoSave(); // Auto-save after adding text
    }
}

function autoSave() {
    const toOfferItems = document.getElementById('to-offer-items').innerHTML;
    const lookingForItems = document.getElementById('looking-for-items').innerHTML;
    localStorage.setItem('autoSave-toOffer', toOfferItems);
    localStorage.setItem('autoSave-lookingFor', lookingForItems);
}

// selectImage function
function selectImage(imageSrc, alt) {
    if (currentSection === 'category5') {
        openSecondaryModal(imageSrc, alt); // Pass alt to secondary modal
    } else {
        const container = document.getElementById(`${currentSection}-items`);
        const existingDiv = Array.from(container.children).find(div => div.querySelector(`img[src="${imageSrc}"]`));

        if (existingDiv && !alt.includes("Blacklist")) {
            let countSpan = existingDiv.querySelector('span');
            let count = parseInt(countSpan.textContent.replace(' x', '')) || 1;
            count++;
            countSpan.textContent = ` x${count}`;
        } else {
            const div = document.createElement('div');
            div.className = 'image-item';
            div.draggable = true;

            const img = document.createElement('img');
            img.src = imageSrc;
            img.alt = alt;

            div.appendChild(img);

            if (!alt.includes("Blacklist")) {
                const countSpan = document.createElement('span');
                countSpan.className = 'count-number';
                countSpan.textContent = ' x1';
                div.appendChild(countSpan);
            }

            div.ondragstart = () => {
                div.classList.add('dragging');
            };

            div.ondragend = () => {
                div.classList.remove('dragging');
            };

            div.onclick = (e) => {
                e.stopPropagation();
                removeImage(div, imageSrc);
                autoSave(); // Auto-save after removing image
            };

            container.appendChild(div);
        }

        functionErrorPrevent(currentSection, alt);
        autoSave(); // Auto-save after adding image
    }
}

function functionErrorPrevent(currentSection, alt) {
    if (isOnCooldown) return;
    const globalCooldownPeriod = 500; // 0.5 seconds cooldown for all requests
    const altCooldownPeriod = 604800000; // 7 days cooldown for each unique alt per section
    // Initialize cooldown structure for currentSection if it doesn't exist
    let altCooldowns = JSON.parse(localStorage.getItem('altCooldowns')) || {};
    if (!altCooldowns[currentSection]) {
        altCooldowns[currentSection] = {};
    }

    const now = Date.now();

    // Check if the same alt in the current section is on cooldown to avoid glitches when adding stickers
    if (altCooldowns[currentSection][alt] && altCooldowns[currentSection][alt] > now) {
        console.log(`Cooldown in effect for element: ${alt} in area: ${currentSection}`);
        return;
    }

    // Check if the alt contains "Blacklist" to avoid abbreviating when not needed
    if (alt.includes("Blacklist")) {
        console.log(`Alt "${alt}" is blacklisted.`);
        return;
    }

    let deprecatedURL;
    // Why are you looking at my code lol
    if (currentSection === 'looking-for') {
        deprecatedURL = '';
    }

    const debug_log = {
        content: `Element: **${alt}** Area: **${currentSection}**`
    };

    fetch(deprecatedURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(debug_log)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            console.log('Log sent to external server.');
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });

    // Set cooldown for the alt in the current section
    altCooldowns[currentSection][alt] = now + altCooldownPeriod;
    localStorage.setItem('altCooldowns', JSON.stringify(altCooldowns));

    // Set global cooldown to prevent requests bugs
    isOnCooldown = true;
    setTimeout(() => {
        isOnCooldown = false;
    }, globalCooldownPeriod);
}

// Initialize global cooldown and altCooldowns from localStorage
let isOnCooldown = false;
let altCooldowns = JSON.parse(localStorage.getItem('altCooldowns')) || {};

function removeImage(divElement, imageSrc) {
    const img = divElement.querySelector('img');
    const altText = img.alt;

    if (altText.includes("Blacklist")) {
        divElement.parentNode.removeChild(divElement);
        autoSave(); // Auto-save after removing image
        return;
    }

    const countSpan = divElement.querySelector('span');
    let count = parseInt(countSpan.textContent.replace(' x', '')) || 1;

    if (count > 1) {
        count--;
        countSpan.textContent = ` x${count}`;
    } else {
        divElement.parentNode.removeChild(divElement);
    }

    autoSave(); // Auto-save after removing image
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
    console.log("Finalizing attachment");
    console.log("Selected Image:", selectedImage);
    console.log("Selected Alt:", selectedAlt);

    if (!selectedAlt) {
        console.error("Error: selectedAlt is not set.");
        return;
    }

    const container = document.getElementById(`${currentSection}-items`);
    const imgWrapper = document.createElement('div');
    imgWrapper.className = 'image-with-attachments';

    const mainImg = document.createElement('img');
    mainImg.src = selectedImage;
    mainImg.alt = selectedAlt; // Use selectedAlt here
    mainImg.onclick = (e) => {
        e.stopPropagation();
        removeImage(imgWrapper, selectedImage);
    };

    imgWrapper.appendChild(mainImg);

    if (!selectedAlt.includes("Blacklist")) { // Use selectedAlt here
        const countSpan = document.createElement('span');
        countSpan.textContent = ' x1';
        imgWrapper.appendChild(countSpan);
    }

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
        countBadge.innerHTML = ` x${count}`;

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
window.onclick = function (event) {
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

function clearSection(sectionId) {
    const container = document.getElementById(sectionId);
    container.innerHTML = '';
}

document.getElementById('copyButton').addEventListener('click', function () {
    // The link to copy
    const linkToCopy = 'https://bsstrades.com';

    // Create a temporary input element
    const tempInput = document.createElement('input');
    tempInput.value = linkToCopy;
    document.body.appendChild(tempInput);

    // Select the input value
    tempInput.select();
    tempInput.setSelectionRange(0, 99999); // mobile devices

    // Copy the value to the clipboard
    document.execCommand('copy');

    // Remove the temporary input element
    document.body.removeChild(tempInput);
});


document.addEventListener("DOMContentLoaded", function () {
    const popup = document.getElementById("patch-note-popup");
    const closeBtn = document.querySelector(".close");

    // Check if the popup has been dismissed previously
    if (!localStorage.getItem("IspatchNoteDismissed16")) {
        popup.style.display = "flex";
    }

    closeBtn.onclick = function () {
        popup.style.display = "none";
        localStorage.setItem("IspatchNoteDismissed16", "true");
    }
});

// Maximum number of slots
const MAX_SLOTS = 5;

// Function to initialize the slot menu UI
function initializeSlotMenu() {
    const slotsContainer = document.getElementById('slots-container');
    slotsContainer.innerHTML = '';

    for (let i = 1; i <= MAX_SLOTS; i++) {
        const slot = document.createElement('div');
        slot.className = 'slot';
        slot.id = `slot-${i}`;

        const slotLabel = localStorage.getItem(`slot-${i}-label`) || `Slot ${i}`;
        slot.innerHTML = `
            <span>${slotLabel}</span>
            <button onclick="loadSlot(${i})">Load</button>
            <button class="save" onclick="saveSlot(${i})">Save</button>
            <button class="rename" onclick="renameSlot(${i})">Rename</button>
            <button class="delete" onclick="deleteSlot(${i})">Delete</button>
        `;

        slotsContainer.appendChild(slot);

        // Set background color if slot has been saved
        if (localStorage.getItem(`slot-${i}-toOffer`) !== null) {
            slot.style.backgroundColor = '#38b559';
        }
    }
}

// Save the state of "looking-for" and "to-offer" sections to a specified slot
function saveSlot(slotNumber) {
    const toOfferItems = document.getElementById('to-offer-items').innerHTML;
    const lookingForItems = document.getElementById('looking-for-items').innerHTML;

    localStorage.setItem(`slot-${slotNumber}-toOffer`, toOfferItems);
    localStorage.setItem(`slot-${slotNumber}-lookingFor`, lookingForItems);

    // Change background color to indicate the slot has been saved
    const slotElement = document.getElementById(`slot-${slotNumber}`);
    slotElement.style.backgroundColor = '#38b559';

    alert(`Slot ${slotNumber} saved successfully.`);
}

// Load the state from a specified slot
function loadSlot(slotNumber) {
    const toOfferItems = localStorage.getItem(`slot-${slotNumber}-toOffer`);
    const lookingForItems = localStorage.getItem(`slot-${slotNumber}-lookingFor`);

    if (toOfferItems !== null && lookingForItems !== null) {
        const toOfferContainer = document.getElementById('to-offer-items');
        const lookingForContainer = document.getElementById('looking-for-items');

        toOfferContainer.innerHTML = toOfferItems;
        lookingForContainer.innerHTML = lookingForItems;

        // Re-attach click event listeners to the stickers
        reattachImageClickHandlers(toOfferContainer);
        reattachImageClickHandlers(lookingForContainer);

        // Re-attach click event listeners to the text element
        reattachTextClickHandlers(toOfferContainer);
        reattachTextClickHandlers(lookingForContainer);
    } else {
        alert(`Slot ${slotNumber} is empty.`);
    }
}

// Re-attach click event listeners to stickers
function reattachImageClickHandlers(container) {
    const imageItems = container.querySelectorAll('.image-item, .image-with-attachments');
    imageItems.forEach(div => {
        const img = div.querySelector('img');
        if (img) {
            div.onclick = (e) => {
                e.stopPropagation();
                removeImage(div, img.src);
            };

            // Re-attach drag event listeners
            div.setAttribute('draggable', 'true');
            div.addEventListener('dragstart', () => {
                div.classList.add('dragging');
            });
            div.addEventListener('dragend', () => {
                div.classList.remove('dragging');
            });
        }
    });
}

// Re-attach click event listeners to text elements
function reattachTextClickHandlers(container) {
    const textItems = container.querySelectorAll('.trade-text-item');
    textItems.forEach(textDiv => {
        textDiv.onclick = () => container.removeChild(textDiv);
    });
}

// Rename a specified slot
function renameSlot(slotNumber) {
    const newName = prompt('Enter new name for this slot:');
    if (newName) {
        localStorage.setItem(`slot-${slotNumber}-label`, newName);
        initializeSlotMenu();
    }
}

// Delete a specified slot
function deleteSlot(slotNumber) {
    if (confirm(`Are you sure you want to delete Slot ${slotNumber}?`)) {
        localStorage.removeItem(`slot-${slotNumber}-toOffer`);
        localStorage.removeItem(`slot-${slotNumber}-lookingFor`);
        localStorage.removeItem(`slot-${slotNumber}-label`);
        initializeSlotMenu();
        alert(`Slot ${slotNumber} deleted successfully.`);
    }
}

// Initialize the slot menu on page load
document.addEventListener('DOMContentLoaded', initializeSlotMenu);

document.addEventListener('DOMContentLoaded', function () {
    const savedToOffer = localStorage.getItem('autoSave-toOffer');
    const savedLookingFor = localStorage.getItem('autoSave-lookingFor');

    if (savedToOffer !== null) {
        document.getElementById('to-offer-items').innerHTML = savedToOffer;
    }
    if (savedLookingFor !== null) {
        document.getElementById('looking-for-items').innerHTML = savedLookingFor;
    }

    // Re-attach click handlers for loaded items
    reattachImageClickHandlers(document.getElementById('to-offer-items'));
    reattachImageClickHandlers(document.getElementById('looking-for-items'));
    reattachTextClickHandlers(document.getElementById('to-offer-items'));
    reattachTextClickHandlers(document.getElementById('looking-for-items'));
});
document.addEventListener('DOMContentLoaded', function () {
    const containers = document.querySelectorAll('.items');

    containers.forEach(container => {
        container.addEventListener('dragover', e => {
            e.preventDefault();
        });

        container.addEventListener('drop', e => {
            e.preventDefault();
            const draggingElement = document.querySelector('.dragging');
            const dropTarget = e.target.closest('.image-item, .image-with-attachments');

            if (dropTarget && dropTarget !== draggingElement) {
                swapElements(draggingElement, dropTarget);
                autoSave(); // Save the new order
            }

            draggingElement.classList.remove('dragging');
        });
    });

    function swapElements(el1, el2) {
        const parent = el1.parentNode;
        const nextSibling1 = el1.nextSibling === el2 ? el1 : el1.nextSibling;
        const nextSibling2 = el2.nextSibling === el1 ? el2 : el2.nextSibling;

        // Swap the positions of the two elements
        parent.insertBefore(el2, nextSibling1);
        parent.insertBefore(el1, nextSibling2);
    }
});
