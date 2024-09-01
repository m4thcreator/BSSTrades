let currentSection = 'looking-for';
let selectedImage = null;
let attachedImages = {};
let attachedTexts = {};
// Open the modal where items are stocked
function openModal(section) {
    currentSection = section;
    document.getElementById('imageModal').style.display = 'block';
}
// Close the modal
function closeModal() {
    document.getElementById('imageModal').style.display = 'none';
}
// Open the secondary modal when called in the html
function openSecondaryModal(imageSrc, alt) {
    selectedImage = imageSrc;
    selectedAlt = alt; // Ensure selectedAlt is set
    document.getElementById('attachImageModal').style.display = 'block';
    displayAttachedImages();
    displayAttachedTexts();
}
// Close the secondary modal
function closeAttachModal() {
    document.getElementById('attachImageModal').style.display = 'none';
    selectedImage = null;
    selectedAlt = null; // Reset selectedAlt here
}
const subcategoryOptions = {
    "Pollen": ["Red Pollen", "Blue Pollen", "White Pollen", "Bubble Pollen", "Bee Ability Pollen", "Duped Ability Pollen", "Bee Gathering Pollen", "Bomb Pollen", "Blue Bomb Pollen", "Red Bomb Pollen", "Buzz Bomb Pollen", "Common Bee Pollen", "Rare Bee Pollen", "Epic Bee Pollen", "Legendary Bee Pollen", "Mythic Bee Pollen", "Event Bee Pollen", "Gifted Bee Pollen", "Ungifted Bee Pollen", "Mark Ability Pollen", "Scratch Pollen", "Pineapple Patch Pollen", "Rose Field Pollen", "Stump Field Pollen", "Mountain Top Field Pollen", "Cactus Field Pollen", "Coconut Field Pollen", "Mushroom Field Pollen", "Dandelion Field Pollen", "Sunflower Field Pollen", "Blue Flower Field Pollen", "Clover Field Pollen", "Strawberry Field Pollen", "Spider Field Pollen", "Bamboo Field Pollen", "Pine Tree Field Pollen", "Pumpkin Patch Pollen", "Pepper Patch Pollen", "Hub Field Pollen", "Pollen From Tools", "Movement Collection Pollen", "Tornado Pollen", "Flame Pollen", "Honey Per Pollen"],
    "Convert Rate": ["Mutated Bee Convert Rate", "Colorless Bee Convert Rate", "Red Bee Convert Rate", "Blue Bee Convert Rate", "Convert Rate At Hive"],
    "Capacity": ["White Field Capacity", "Red Field Capacity", "Blue Field Capacity", "Pumpkin Patch Capacity"],
    "Attack": ["Bee Attack", "Blue Bee Attack", "Rare Bee Attack", "Epic Bee Attack", "Legendary Bee Attack"],
    "Conversion": ["Instant Bee Gather Conversion", "Instant Red Bee Conversion", "Instant Rare Bee Conversion", "Instant Event Bee Conversion", "Instant Colorless Bee Conversion", "Instant Tool Conversion", "Instant Bomb Conversion", "Instant Gifted Bee Conversion", "Unique Instant Conversion"],
    "Other": ["Honey Per Goo", "Bee Movespeed", "Critical Power", "Super Critical Power", "Honey From Tokens"]
};

function handleCategoryChange() {
    const categorySelect = document.getElementById("categorySelect");
    const subcategorySelect = document.getElementById("subcategorySelect");
    const selectedCategory = categorySelect.value;

    if (selectedCategory) {
        subcategorySelect.style.display = 'inline-block';
        updateSubcategoryOptions(selectedCategory);
    } else {
        subcategorySelect.style.display = 'none';
        subcategorySelect.innerHTML = '<option value="">Select a Subcategory</option>';
    }
    filterImages(); // Ensure images are filtered based on the selected category/subcategory and search input
}

function updateSubcategoryOptions(selectedCategory) {
    const subcategorySelect = document.getElementById("subcategorySelect");
    subcategorySelect.innerHTML = '<option value="">Select a Subcategory</option>';

    if (selectedCategory && subcategoryOptions[selectedCategory]) {
        subcategoryOptions[selectedCategory].forEach(subcat => {
            const option = document.createElement("option");
            option.value = subcat;
            option.textContent = subcat;
            subcategorySelect.appendChild(option);
        });
    }
}

function filterImages() {
    const categorySelect = document.getElementById("categorySelect");
    const subcategorySelect = document.getElementById("subcategorySelect");
    const searchInput = document.querySelector('.search-container input');
    const filter = searchInput.value.toLowerCase();
    const selectedCategory = categorySelect.value.toLowerCase();
    const selectedSubcategory = subcategorySelect.value.toLowerCase();
    const images = document.querySelectorAll('.images img');

    images.forEach((img) => {
        const altText = img.getAttribute('alt').toLowerCase();
        const dataStack = img.getAttribute('data-stack') ? img.getAttribute('data-stack').toLowerCase() : '';

        // Determine if the image should be shown based on filters
        let categoryMatch = true;
        let subcategoryMatch = true;
        let searchMatch = altText.includes(filter);

        if (selectedCategory && selectedCategory !== "other") {
            categoryMatch = dataStack.includes(selectedCategory);
        }

        if (selectedSubcategory) {
            subcategoryMatch = dataStack.includes(selectedSubcategory);
        }

        if (selectedCategory === "other") {
            categoryMatch = true; // Ignore category filter for "Other"
            if (selectedSubcategory) {
                subcategoryMatch = dataStack.includes(selectedSubcategory);
            }
        }

        // Display image if it matches all the criteria
        if (categoryMatch && subcategoryMatch && searchMatch) {
            img.style.display = ''; // Show the image
        } else {
            img.style.display = 'none'; // Hide the image
        }
    });
}

// Add an item that displays text
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
// Auto-save each time an item is added to a section
function autoSave() {
    const toOfferItems = document.getElementById('to-offer-items').innerHTML;
    const lookingForItems = document.getElementById('looking-for-items').innerHTML;
    localStorage.setItem('autoSave-toOffer', toOfferItems);
    localStorage.setItem('autoSave-lookingFor', lookingForItems);
}

// Triggers when an item is selected from the index to add it to the respective section
function selectImage(imageSrc, alt) {
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

        autoSave(); // Auto-save after adding image
    }
// Remove an item that has been added to a section when clicking on it
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



// Select image to attach to the "image-with-attachments"
function selectAttachImage(imageSrc) {
    if (!attachedImages[selectedImage]) {
        attachedImages[selectedImage] = [];
    }

    attachedImages[selectedImage].push(imageSrc);
    displayAttachedImages();
}
// Make a quick preview of all attachments
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
// Ability to remove attachments
function removeAttachedImage(index) {
    attachedImages[selectedImage].splice(index, 1);
    displayAttachedImages();
}
// Ability to add text to images with attachments
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
// Make a quick preview of attached texts
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
// Ability to remove texts from the preview
function removeAttachedText(index) {
    attachedTexts[selectedImage].splice(index, 1);
    displayAttachedTexts();
}
// Get color based on the text type
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

// Finalize the "image-with-attachments" by adding all attachments and attached text from previews to it and adding it in the respective section
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
    mainImg.alt = selectedAlt;
    mainImg.onclick = (e) => {
        e.stopPropagation();
        removeImage(imgWrapper, selectedImage);
        autoSave(); // Auto-save after removing image
    };

    imgWrapper.appendChild(mainImg);

    if (!selectedAlt.includes("Blacklist")) {
        const countSpan = document.createElement('span');
        countSpan.textContent = ' x1';
        imgWrapper.appendChild(countSpan);
    }

    const imageCounts = (attachedImages[selectedImage] || []).reduce((counts, imgSrc) => {
        counts[imgSrc] = (counts[imgSrc] || 0) + 1;
        return counts;
    }, {});

    if (attachedTexts[selectedImage]) {
        attachedTexts[selectedImage].forEach((textObj) => {
            const textDiv = document.createElement('div');
            textDiv.classList.add("abilityText");
            textDiv.style.color = getTextColor(textObj.type);
            textDiv.textContent = textObj.text;
            imgWrapper.appendChild(textDiv);
        });
    }
    for (const [imgSrc, count] of Object.entries(imageCounts)) {
        const attachedImgWrapper = document.createElement('div');
        attachedImgWrapper.style.float = 'left';

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
    container.appendChild(imgWrapper);
    autoSave(); // Trigger autoSave after adding image-with-attachments
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

// clear the entierty of a section when clicked
function clearSection(sectionId) {
    const container = document.getElementById(sectionId);
    container.innerHTML = '';
}
// Copy website link to clipboard when clicked
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
    alert('Link copied to clipboard!')
    // Remove the temporary input element
    document.body.removeChild(tempInput);
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
            <button class="load" onclick="loadSlot(${i})">Load</button>
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
                autoSave(); // Auto-save after removing image
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
        textDiv.onclick = () => {
            container.removeChild(textDiv);
            autoSave(); // Auto-save after removing text
        };

        // Enable swapping for text items
        textDiv.setAttribute('draggable', 'true');
        textDiv.addEventListener('dragstart', () => {
            textDiv.classList.add('dragging');
        });
        textDiv.addEventListener('dragend', () => {
            textDiv.classList.remove('dragging');
        });
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
document.addEventListener('DOMContentLoaded', function () {
    initializeSlotMenu();

    // Load auto-saved items
    const savedToOffer = localStorage.getItem('autoSave-toOffer');
    const savedLookingFor = localStorage.getItem('autoSave-lookingFor');

    if (savedToOffer !== null) {
        document.getElementById('to-offer-items').innerHTML = savedToOffer;
    }
    if (savedLookingFor !== null) {
        document.getElementById('looking-for-items').innerHTML = savedLookingFor;
    }

    // Re-attach click and drag handlers for loaded items
    reattachImageClickHandlers(document.getElementById('to-offer-items'));
    reattachImageClickHandlers(document.getElementById('looking-for-items'));
    reattachTextClickHandlers(document.getElementById('to-offer-items'));
    reattachTextClickHandlers(document.getElementById('looking-for-items'));

    // Set up drag-and-drop functionality for swapping items
    const containers = document.querySelectorAll('.items');
    containers.forEach(container => {
        container.addEventListener('dragover', e => {
            e.preventDefault();
        });

        container.addEventListener('drop', e => {
            e.preventDefault();
            const draggingElement = document.querySelector('.dragging');
            const dropTarget = e.target.closest('.image-item, .image-with-attachments, .trade-text-item');
            const dropContainer = e.target.closest('.items');

            // Ensure the drop is happening within the same section
            if (dropContainer && draggingElement.parentNode === dropContainer) {
                if (dropTarget && dropTarget !== draggingElement) {
                    swapElements(draggingElement, dropTarget);
                } else {
                    dropContainer.appendChild(draggingElement);
                }
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
// Load the patch note popup
document.addEventListener("DOMContentLoaded", function () {
    const popup = document.getElementById("patch-note-popup");
    const closeBtn = document.querySelector(".close");

    // Check if the popup has been dismissed previously
    if (!localStorage.getItem("IspatchNoteDismissed18")) {
        popup.style.display = "flex";
    }

    closeBtn.onclick = function () {
        popup.style.display = "none";
        localStorage.setItem("IspatchNoteDismissed18", "true");
    }
});
