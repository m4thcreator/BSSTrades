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

function selectImage(imageSrc) {
    if (currentSection === 'category5') {
        openSecondaryModal(imageSrc);
    } else {
        const container = document.getElementById(`${currentSection}-items`);
        const img = document.createElement('img');
        img.src = imageSrc;
        img.alt = 'Selected Image';
        img.onclick = () => removeImage(img, imageSrc);
        container.appendChild(img);
    }
}

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
        if (altText.includes(filter)) {
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
