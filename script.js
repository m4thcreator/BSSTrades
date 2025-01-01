// Get elements
const selectionMenu = document.getElementById('selection-menu');
const openOfferingMenu = document.getElementById('open-offering-menu');
const openReceivingMenu = document.getElementById('open-receiving-menu');
const offeringField = document.getElementById('offering-field');
const receivingField = document.getElementById('receiving-field');
const beequipModal = document.getElementById('beequip-modal');
const confirmBeequipButton = document.getElementById('confirm-beequip');
// Handles for the saves modal and button
const savesButton = document.getElementById('saves-button');
const savesModal = document.getElementById('saves-modal');
const saveSlotsContainer = document.getElementById('save-slots');
// Number of save slots
const NUM_SAVE_SLOTS = 5;
// Initialize save slots
function initializeSaveSlots() {
    saveSlotsContainer.innerHTML = '';
    for (let i = 0; i < NUM_SAVE_SLOTS; i++) {
        const slot = document.createElement('div');
        slot.classList.add('save-slot');
        slot.dataset.slot = i;

        const slotName = document.createElement('span');
        slotName.textContent = localStorage.getItem(`save-slot-${i}-name`) || `Slot ${i + 1}`;
        slot.appendChild(slotName);

        const saveButton = document.createElement('button');
        saveButton.classList.add('save-button');
        saveButton.textContent = 'Save';
        saveButton.addEventListener('click', () => saveSlot(i));
        slot.appendChild(saveButton);

        const loadButton = document.createElement('button');
        loadButton.classList.add('load-button');
        loadButton.textContent = 'Load';
        loadButton.addEventListener('click', () => loadSlot(i));
        slot.appendChild(loadButton);

        const renameButton = document.createElement('button');
        renameButton.classList.add('rename-button');
        renameButton.textContent = 'Rename';
        renameButton.addEventListener('click', () => renameSlot(i));
        slot.appendChild(renameButton);

        const eraseButton = document.createElement('button');
        eraseButton.classList.add('erase-button');
        eraseButton.textContent = 'Erase';
        eraseButton.addEventListener('click', () => eraseSlot(i));
        slot.appendChild(eraseButton);

        saveSlotsContainer.appendChild(slot);
    }
}

// Open and close saves modal
savesButton.addEventListener('click', () => {
    initializeSaveSlots();
    savesModal.style.display = 'block';
});

function closeSavesModal() {
    savesModal.style.display = 'none';
}

// Save a slot
function saveSlot(slot) {
    if (confirm('Are you sure you want to overwrite this save slot?')) {
        const offeringHTML = document.getElementById('offering-field').innerHTML;
        const receivingHTML = document.getElementById('receiving-field').innerHTML;

        const saveData = {
            offering: offeringHTML,
            receiving: receivingHTML,
            offeringCounts: JSON.stringify(offeringItemCounts),
            receivingCounts: JSON.stringify(receivingItemCounts),
        };

        localStorage.setItem(`save-slot-${slot}`, JSON.stringify(saveData));
        alert('Save successful!');
    }
}

// Load a slot
function loadSlot(slot) {
    if (confirm('Are you sure you want to load this save slot?')) {
        const saveData = JSON.parse(localStorage.getItem(`save-slot-${slot}`));

        if (saveData) {
            document.getElementById('offering-field').innerHTML = saveData.offering;
            document.getElementById('receiving-field').innerHTML = saveData.receiving;

            // Restore item counts
            Object.assign(offeringItemCounts, JSON.parse(saveData.offeringCounts));
            Object.assign(receivingItemCounts, JSON.parse(saveData.receivingCounts));

            reinitializeEventListeners(); // Restore all event listeners
            alert('Load successful!');
        } else {
            alert('No data found in this slot.');
        }
    }
}


// Rename a slot
function renameSlot(slot) {
    const newName = prompt('Enter a new name for this slot:');
    if (newName) {
        localStorage.setItem(`save-slot-${slot}-name`, newName);
        initializeSaveSlots(); // Refresh slots
    }
}

// Erase a slot
function eraseSlot(slot) {
    if (confirm('Are you sure you want to erase this save slot?')) {
        localStorage.removeItem(`save-slot-${slot}`);
        localStorage.removeItem(`save-slot-${slot}-name`);
        initializeSaveSlots(); // Refresh slots
        alert('Save slot erased.');
    }
}

// Restore event listeners after loading
function reinitializeEventListeners() {
    // Reattach click listeners for item-menu functionality
    document.querySelectorAll('.container .item-container img').forEach(img => {
        img.addEventListener('click', (event) => {
            event.stopPropagation();
            showMenu(event, img.closest('.item-container'));
        });
    });

    // Reattach drag-and-drop listeners for all item containers
    document.querySelectorAll('.container .item-container').forEach(container => {
        const itemKey = container.getAttribute('data-key');
        setupDragAndDropListeners(container, itemKey);
    });

    // Reattach listeners for Beequip containers
    document.querySelectorAll('.container .beequip-container').forEach(container => {
        const img = container.querySelector('img');
        if (img) {
            img.addEventListener('click', (event) => {
                event.stopPropagation();
                showMenu(event, container);
            });
        }

        const itemKey = img?.alt || container.getAttribute('data-key'); // Use alt for Beequips
        setupDragAndDropListeners(container, itemKey);
    });
}


// Track the field that should receive items
let currentField = null;
let selectedBeequip = null;


// Updated function to sort items by data-order within a container
function sortItems(container) {
    // Get all .item-container elements and sort them based on the data-order attribute of the contained image
    const items = Array.from(container.querySelectorAll('.item-container'));

    items.sort((a, b) => {
        const orderA = parseInt(a.querySelector('img').getAttribute('data-order'));
        const orderB = parseInt(b.querySelector('img').getAttribute('data-order'));
        return orderA - orderB;
    });

    // Clear the container and re-append sorted items
    items.forEach(item => container.appendChild(item));
}

// Add event listeners for the sort buttons
document.querySelectorAll('.sort-field').forEach(sortButton => {
    sortButton.addEventListener('click', (event) => {
        const parentField = event.target.closest('.trade-field').querySelector('.field');
        sortItems(parentField);
    });
});
// Clear all items from a field
function clearField(field, fieldCounts) {
    // Remove all child nodes from the field
    while (field.firstChild) {
        field.removeChild(field.firstChild);
    }

    // Reset item counts for the field
    for (const key in fieldCounts) {
        delete fieldCounts[key];
    }

    // Save the updated state
}

// Add event listeners for the "Clear All" buttons
document.getElementById('clear-offering').addEventListener('click', () => {
    clearField(offeringField, offeringItemCounts);
});

document.getElementById('clear-receiving').addEventListener('click', () => {
    clearField(receivingField, receivingItemCounts);
});
// Function to open the item menu and position it dynamically
function openMenuForField(button, field) {
    selectionMenu.style.display = 'block';
    selectionMenu.style.top = `${button.getBoundingClientRect().bottom + window.scrollY}px`;
    selectionMenu.style.left = `${button.getBoundingClientRect().left}px`;
    selectionMenu.style.width = `${field.offsetWidth}px`;
    currentField = field;
}

// Open menu for Offering (Regular Items)
openOfferingMenu.addEventListener('click', () => {
    openMenuForField(openOfferingMenu, offeringField);
});

// Open menu for Receiving (Regular Items)
openReceivingMenu.addEventListener('click', () => {
    openMenuForField(openReceivingMenu, receivingField);
});

// Handle item click (both regular items and Beequips)
document.querySelectorAll('.menu-grid img').forEach(item => {
    item.addEventListener('click', () => {
        const buffs = item.getAttribute('data-buffs');
        const debuffs = item.getAttribute('data-debuffs');
        const bonuses = item.getAttribute('data-bonuses');

        if (buffs || debuffs || bonuses) {
            // Open Beequip modal for items with buffs/debuffs/bonuses
            openBeequipModal(item);
        } else {
            // Directly add regular items without opening the modal
            addItemToField(item);
        }
    });
});

// Track item counts separately for each field
const offeringItemCounts = {};
const receivingItemCounts = {};

function addItemToField(item) {
    const itemKey = item.src; // Unique identifier
    const currentCounts = currentField === offeringField ? offeringItemCounts : receivingItemCounts;

    // Check if the item is blacklisted from stacking
    const isBlacklisted = item.getAttribute('data-reward')?.includes('BLACKLIST');

    if (!isBlacklisted && currentCounts[itemKey]) {
        // Stack the item if it's not blacklisted
        currentCounts[itemKey] += 1;
        const existingBadge = currentField.querySelector(`[data-key="${itemKey}"] .quantity-badge`);
        existingBadge.textContent = `x${currentCounts[itemKey]}`;
    } else {
        // Treat the item as a new entry if it's blacklisted or not already in the field
        if (!isBlacklisted) {
            currentCounts[itemKey] = 1; // Initialize count only for stackable items
        }

        // Create container for item with image and badge
        const itemContainer = document.createElement('div');
        itemContainer.classList.add('item-container');
        itemContainer.setAttribute('data-key', itemKey);
        itemContainer.setAttribute('draggable', true); // Make draggable

        const img = item.cloneNode(true);
        img.classList.add('item-image');
        img.setAttribute('data-order', item.getAttribute('data-order'));

        // Add click to show menu
        img.addEventListener('click', (event) => {
            event.stopPropagation();
            showMenu(event, itemContainer);
        });

        const badge = document.createElement('div');
        badge.classList.add('quantity-badge');
        badge.textContent = 'x1';

        // Append the badge only if the item is stackable
        if (!isBlacklisted) {
            itemContainer.appendChild(badge);
        }

        itemContainer.appendChild(img);

        // Using DocumentFragment to batch DOM insertion
        const fragment = document.createDocumentFragment();
        fragment.appendChild(itemContainer);
        currentField.appendChild(fragment); // Append once to minimize reflows

        // Event listeners for drag-and-drop, added once
        setupDragAndDropListeners(itemContainer, itemKey);
    }
}

function setupDragAndDropListeners(itemContainer, itemKey) {
    const parentField = itemContainer.closest('.field'); // Dynamically get the parent field

    itemContainer.addEventListener('dragstart', (event) => {
        event.dataTransfer.setData('text/plain', itemKey);
        itemContainer.classList.add('dragging');
    });

    itemContainer.addEventListener('dragend', () => {
        itemContainer.classList.remove('dragging');
    });

    itemContainer.addEventListener('dragover', (event) => {
        event.preventDefault();
        itemContainer.classList.add('drop-target'); // Add visual indication
    });

    itemContainer.addEventListener('dragleave', () => {
        itemContainer.classList.remove('drop-target'); // Remove indication
    });

    itemContainer.addEventListener('drop', (event) => {
        event.preventDefault();
        const draggedKey = event.dataTransfer.getData('text/plain');
        const draggedItem = parentField.querySelector(`[data-key="${draggedKey}"]`);

        if (draggedItem && draggedItem !== itemContainer) {
            itemContainer.classList.remove('drop-target');
            swapElements(draggedItem, itemContainer); // Use swapElements for swapping
        }
    });
}


// Swap elements within the same parent
function swapElements(el1, el2) {
    const parent = el1.parentNode;
    const nextSibling1 = el1.nextSibling === el2 ? el1 : el1.nextSibling;
    const nextSibling2 = el2.nextSibling === el1 ? el2 : el2.nextSibling;

    // Swap the positions of the two elements
    parent.insertBefore(el2, nextSibling1);
    parent.insertBefore(el1, nextSibling2);
}

// Get elements
const itemMenu = document.getElementById('item-menu');
let activeItemContainer = null;

// Function to get the correct count object for the active item
function getItemCountsForContainer(container) {
    return container.closest('#offering-field') ? offeringItemCounts : receivingItemCounts;
}

// Show pop-up menu on item click
function showMenu(event, itemContainer) {
    activeItemContainer = itemContainer;

    // Get the viewport dimensions
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Get the menu dimensions
    const menuWidth = itemMenu.offsetWidth;
    const menuHeight = itemMenu.offsetHeight;

    // Calculate ideal position based on click location
    let menuTop = event.clientY;
    let menuLeft = event.clientX;

    // Adjust the top position if the menu would go off the bottom of the viewport
    if (menuTop + menuHeight > viewportHeight) {
        menuTop = viewportHeight - menuHeight - 10; // Add some padding
    }

    // Adjust the left position if the menu would go off the right of the viewport
    if (menuLeft + menuWidth > viewportWidth) {
        menuLeft = viewportWidth - menuWidth - 10; // Add some padding
    }

    // Set the position and display the menu
    itemMenu.style.top = `${menuTop}px`;
    itemMenu.style.left = `${menuLeft}px`;
    itemMenu.classList.add('show');
}

// Hide the menu
function hideMenu() {
    itemMenu.classList.remove('show');
}

// Handle single item deletion
document.getElementById('delete-item').addEventListener('click', () => {
    if (activeItemContainer) {
        const itemKey = activeItemContainer.getAttribute('data-key');
        const itemCounts = getItemCountsForContainer(activeItemContainer); // Determine correct counts object

        // Check and reduce count, or remove item if last one in stack
        if (itemCounts[itemKey] > 1) {
            itemCounts[itemKey] -= 1; // Decrement count
            const existingBadge = activeItemContainer.querySelector('.quantity-badge');
            existingBadge.textContent = `x${itemCounts[itemKey]}`; // Update badge text
        } else {
            activeItemContainer.remove(); // Remove the item container
            delete itemCounts[itemKey]; // Remove the item count
        }
        hideMenu(); // Close the menu after deletion
    }
});

// Handle bulk item deletion
document.getElementById('delete-bulk').addEventListener('click', () => {
    if (activeItemContainer) {
        const itemKey = activeItemContainer.getAttribute('data-key');
        const itemCounts = getItemCountsForContainer(activeItemContainer); // Determine correct counts object

        delete itemCounts[itemKey]; // Clear count for the item
        activeItemContainer.remove(); // Remove the container from the field
        hideMenu(); // Close the menu after bulk deletion
    }
});

// Handle item highlight toggle
document.getElementById('highlight-item').addEventListener('click', () => {
    if (activeItemContainer) {
        const img = activeItemContainer.querySelector('img');
        
        // Toggle highlight class with a smooth transition
        img.classList.toggle('highlighted');
        
        if (img.classList.contains('highlighted')) {
            img.style.background = 'linear-gradient(135deg, #532F09, #ffcb00)'; // Apply highlight background
            // Set data-order to 0 and move item to top
            activeItemContainer.setAttribute('data-order', '0');
            activeItemContainer.parentNode.prepend(activeItemContainer); // Move to top
        } else {
            // Reset data-order and background based on mode
            activeItemContainer.setAttribute('data-order', img.getAttribute('data-original-order') || '1');
            img.style.background = ''; // Reset background
        }
    }
});

// Event listener to open menu on item click
document.querySelectorAll('.item-container').forEach(itemContainer => {
    itemContainer.addEventListener('click', (event) => {
        event.stopPropagation();
        showMenu(event, itemContainer);
    });
});

// Hide menu when clicking outside
window.addEventListener('click', hideMenu);

// Track the selected star rating, starting at 0 by default
let selectedStars = 0;

// Generate the interactive star rating in the modal
function generateStars(starCount = 0) {
    const starSection = document.getElementById('stars-rating');
    starSection.innerHTML = ''; // Clear previous stars

    // Create 5 stars, and set the active stars based on the given starCount
    for (let i = 1; i <= 5; i++) {
        const star = document.createElement('span');
        star.textContent = '★';
        star.classList.toggle('filled', i <= starCount); // Fill stars up to the selected count
        star.addEventListener('click', () => setStars(i)); // Set or reset the rating when clicked
        starSection.appendChild(star);
    }
}

// Set the selected star rating, with a toggle feature on the first star
function setStars(starCount) {
    // Toggle the first star between filled and unfilled (0 stars)
    if (starCount === 1 && selectedStars === 1) {
        selectedStars = 0; // Reset to zero if the first star is already filled
    } else {
        selectedStars = starCount; // Set to the selected star count
    }
    generateStars(selectedStars); // Update the stars display
}

// Track the waxes selected for the Beequip being customized in the form
let formSelectedWaxes = [];

// Initialize Wax Slots in the Form Only
function initializeWaxSelection() {
    formSelectedWaxes = []; // Reset selected waxes for the form Beequip
    const waxSlotsContainer = document.getElementById('wax-slots');
    waxSlotsContainer.innerHTML = ''; // Clear any existing slots in the form

    // Create 5 empty slots for waxes in the form container only
    for (let i = 0; i < 5; i++) {
        const slot = document.createElement('img');
        slot.src = 'images/empty_slot.png'; // Empty slot image for form
        slot.alt = '';
        slot.classList.add('wax-slot');
        slot.dataset.slotIndex = i; // Assign slot index to keep track in the form
        waxSlotsContainer.appendChild(slot);
    }

    // Update wax count display in the form to 0
    document.getElementById('wax-count').textContent = formSelectedWaxes.length;
}

// Handle Wax Selection for the Form Only
document.querySelectorAll('.wax-option').forEach(waxOption => {
    waxOption.addEventListener('click', () => {
        if (formSelectedWaxes.length < 5) {
            formSelectedWaxes.push(waxOption.getAttribute('data-wax-type')); // Add wax type to formSelectedWaxes

            // Display the selected wax in the next available form slot
            const waxSlotsContainer = document.getElementById('wax-slots');
            const slotToUpdate = waxSlotsContainer.querySelectorAll('.wax-slot')[formSelectedWaxes.length - 1];
            slotToUpdate.src = waxOption.src;
            slotToUpdate.alt = waxOption.alt;

            // Update the form wax count display
            document.getElementById('wax-count').textContent = formSelectedWaxes.length;
        } else {
            alert("You can only add up to 5 waxes.");
        }
    });
});

// Ensure values are captured and sections are cleared before new item is selected
document.getElementById('close-beequip-modal').addEventListener('click', () => {
    beequipModal.classList.remove('active');
    clearBeequipForm(); // Clear the form upon closing
});

// Open Beequip Modal for editing
function openBeequipModal(item) {
    selectedBeequip = item;
    clearBeequipForm(); // Clear existing inputs to avoid duplicates
    document.getElementById('beequip-name').textContent = item.alt;

    // Populate sections with new data
    populateStatFields('buffs-section', item.getAttribute('data-buffs'), 'Buff');
    populateStatFields('debuffs-section', item.getAttribute('data-debuffs'), 'Debuff');
    populateStatFields('bonuses-section', item.getAttribute('data-bonuses'), 'Bonus');

    // Populate abilities as checkboxes in buffs section
    if (item.getAttribute('data-ability')) {
        populateStatFields('buffs-section', item.getAttribute('data-ability'), 'Ability', true);
    }

    generateStars(selectedStars);
    initializeWaxSelection(); // Reset wax selection for the current Beequip only
    beequipModal.classList.add('active'); // Show the modal
}

// Clear Beequip form fields before a new Beequip is selected
function clearBeequipForm() {
    document.getElementById('buffs-section').innerHTML = '';
    document.getElementById('debuffs-section').innerHTML = '';
    document.getElementById('bonuses-section').innerHTML = '';
    document.getElementById('ability-section').innerHTML = '';
}

function populateStatFields(sectionId, stats, label, isAbility = false) {
    const section = document.getElementById(sectionId);
    if (!stats) return;

    stats.split(', ').forEach(stat => {
        const statWrapper = document.createElement('div');
        statWrapper.classList.add('stat-wrapper'); // Common class for consistent styling

        // Determine class based on the label type
        let labelClass = '';
        if (isAbility) {
            labelClass = 'beequip-buff'; // Abilities use the buff color/style
            statWrapper.innerHTML = `<label class="${labelClass}"><input type="checkbox" data-ability="${stat}"> ${stat}</label>`;
        } else {
            // Apply class based on label type (buff, debuff, bonus)
            if (label === 'Buff') labelClass = 'beequip-buff';
            else if (label === 'Debuff') labelClass = 'beequip-debuff';
            else if (label === 'Bonus') labelClass = 'beequip-bonus';

            // Set up label with input on the left
            statWrapper.innerHTML = `
                <label class="${labelClass}">
                    <input type="number" min="0" placeholder="Enter value" class="stat-input">
                    ${stat}
                </label>`;
        }

        // Append the wrapper to the appropriate section
        section.appendChild(statWrapper);
    });
}



// Confirm Beequip customization and append it to the field
confirmBeequipButton.addEventListener('click', () => {
    // Pass a copy of formSelectedWaxes to avoid future mutations
    appendBeequipToField(selectedBeequip, [...formSelectedWaxes]);

    // Hide the modal after confirmation and reset the form's wax slots
    beequipModal.classList.remove('active');
    formSelectedWaxes = []; // Reset selected waxes for the next Beequip
    initializeWaxSelection(); // Clear wax slots for the next Beequip
    clearBeequipForm(); // Clear the form after adding
});



// Append Beequip to the current field with its own waxes and data
function appendBeequipToField(item, waxes) {
    const container = document.createElement('div');
    container.classList.add('beequip-container');
    container.setAttribute('draggable', true); // Make the container draggable

    const img = document.createElement('img');
    img.src = item.src;
    img.alt = item.alt;
    container.appendChild(img);

    // Display star rating
    if (selectedStars >= 0) {
        const starsDisplay = document.createElement('p');
        starsDisplay.innerHTML = `Potential: ${'★'.repeat(selectedStars)}${'☆'.repeat(5 - selectedStars)}`;
        container.appendChild(starsDisplay);
    }

    // Create a parent container for all stats
    const statsContainer = document.createElement('div');
    statsContainer.classList.add('beequip-stats-container');

    // Collect and display Buffs, Debuffs, Bonuses, and Abilities
    const buffsValues = Array.from(document.querySelectorAll('#buffs-section input[type="number"]'))
        .map((input, index) => input.value ? `<div class="beequip-buff">${input.value}${item.getAttribute('data-buffs').split(', ')[index]}</div>` : null)
        .filter(Boolean);

    const abilities = Array.from(document.querySelectorAll('#buffs-section input[type="checkbox"]'))
        .filter(checkbox => checkbox.checked)
        .map(checkbox => `<div class="beequip-buff">${checkbox.dataset.ability}</div>`);

    if (buffsValues.length > 0 || abilities.length > 0) {
        const buffsDiv = document.createElement('div');
        buffsDiv.classList.add('beequip-buffs');
        buffsDiv.innerHTML = buffsValues.concat(abilities).join('');
        statsContainer.appendChild(buffsDiv);
    }

    const debuffsValues = Array.from(document.querySelectorAll('#debuffs-section input'))
        .map((input, index) => input.value ? `<div class="beequip-debuff">${input.value}${item.getAttribute('data-debuffs').split(', ')[index]}</div>` : null)
        .filter(Boolean);
    if (debuffsValues.length > 0) {
        const debuffsDiv = document.createElement('div');
        debuffsDiv.classList.add('beequip-debuffs');
        debuffsDiv.innerHTML = debuffsValues.join('');
        statsContainer.appendChild(debuffsDiv);
    }

    const bonusesValues = Array.from(document.querySelectorAll('#bonuses-section input'))
        .map((input, index) => input.value ? `<div class="beequip-bonus">${input.value}${item.getAttribute('data-bonuses').split(', ')[index]}</div>` : null)
        .filter(Boolean);
    if (bonusesValues.length > 0) {
        const bonusesDiv = document.createElement('div');
        bonusesDiv.classList.add('beequip-bonuses');
        bonusesDiv.innerHTML = bonusesValues.join('');
        statsContainer.appendChild(bonusesDiv);
    }

    // Append statsContainer to the main container
    container.appendChild(statsContainer);

    // Display Waxes Used, if any
    if (waxes.length > 0) {
        const waxDisplay = document.createElement('p');
        waxDisplay.innerHTML = `Waxes Used: ${waxes.length}/5`;
        container.appendChild(waxDisplay);

        // Display selected wax images horizontally within the Beequip container
        const waxSlotsContainer = document.createElement('div');
        waxSlotsContainer.classList.add('wax-slots'); // Separate class for appended container wax slots

        waxes.forEach(waxType => {
            const waxImg = document.createElement('img');
            waxImg.src = document.querySelector(`img[data-wax-type="${waxType}"]`).src;
            waxImg.alt = waxType;
            waxImg.classList.add('wax-slot');
            waxSlotsContainer.appendChild(waxImg);
        });

        container.appendChild(waxSlotsContainer);
    }

    // Add click to show menu
    img.addEventListener('click', (event) => {
        event.stopPropagation();
        showMenu(event, container);
    });

    // Enable drag and drop for the container
    container.addEventListener('dragstart', (event) => {
        event.dataTransfer.setData('text/plain', item.alt); // Use item.alt as identifier
        container.classList.add('dragging');
    });

    container.addEventListener('dragend', () => {
        container.classList.remove('dragging');
    });

    // Handle dragover and drop events for swapping items
    container.addEventListener('dragover', (event) => {
        event.preventDefault(); // Allow the drop
        container.classList.add('drop-target'); // Highlight the drop target
    });

    container.addEventListener('dragleave', () => {
        container.classList.remove('drop-target'); // Remove highlight
    });

    container.addEventListener('drop', (event) => {
        event.preventDefault();
        const draggedItem = document.querySelector('.dragging');
        
        // Ensure valid drop and swap only if the items are different
        if (draggedItem && draggedItem !== container) {
            container.classList.remove('drop-target');

            // Swap the positions of draggedItem and container
            const draggedNextSibling = draggedItem.nextSibling;
            currentField.insertBefore(draggedItem, container);
            if (draggedNextSibling) {
                currentField.insertBefore(container, draggedNextSibling);
            } else {
                currentField.appendChild(container);
            }
        }
    });

    currentField.appendChild(container); // Add the Beequip to the offering or receiving field
}

document.addEventListener("DOMContentLoaded", function () {
    const searchBar = document.getElementById('search-bar');
    const categoryFilter = document.getElementById('category-filter');
    const attributeFilter = document.getElementById('attribute-filter');
    categoryFilter.value = ""; // Set "All Categories" as the default selection
    attributeFilter.style.display = 'none'; // Initially hide attribute filter

    const categoriesAttributes = {
        "Pollen": ["Red Pollen", "Blue Pollen", "White Pollen", "Bubble Pollen", "Bee Ability Pollen", "Duped Ability Pollen", "Bee Gathering Pollen", "Bomb Pollen", "Blue Bomb Pollen", "Red Bomb Pollen", "Buzz Bomb Pollen", "Common Bee Pollen", "Rare Bee Pollen", "Epic Bee Pollen", "Legendary Bee Pollen", "Mythic Bee Pollen", "Event Bee Pollen", "Gifted Bee Pollen", "Ungifted Bee Pollen", "Mark Ability Pollen", "Scratch Pollen", "Pineapple Patch Pollen", "Rose Field Pollen", "Stump Field Pollen", "Mountain Top Field Pollen", "Cactus Field Pollen", "Coconut Field Pollen", "Mushroom Field Pollen", "Dandelion Field Pollen", "Sunflower Field Pollen", "Blue Flower Field Pollen", "Clover Field Pollen", "Strawberry Field Pollen", "Spider Field Pollen", "Bamboo Field Pollen", "Pine Tree Field Pollen", "Pumpkin Patch Pollen", "Pepper Patch Pollen", "Hub Field Pollen", "Pollen From Tools", "Movement Collection Pollen", "Tornado Pollen", "Flame Pollen", "Honey Per Pollen"],
        "Convert Rate": ["Mutated Bee Convert Rate", "Colorless Bee Convert Rate", "Red Bee Convert Rate", "Blue Bee Convert Rate", "Convert Rate At Hive"],
        "Capacity": ["White Field Capacity", "Red Field Capacity", "Blue Field Capacity", "Pumpkin Patch Capacity"],
        "Attack": ["Bee Attack", "Blue Bee Attack", "Rare Bee Attack", "Epic Bee Attack", "Legendary Bee Attack"],
        "Conversion": ["Instant Bee Gather Conversion", "Instant Red Bee Conversion", "Instant Rare Bee Conversion", "Instant Event Bee Conversion", "Instant Colorless Bee Conversion", "Instant Tool Conversion", "Instant Bomb Conversion", "Instant Gifted Bee Conversion", "Unique Instant Conversion"],
        "Other": ["Honey Per Goo", "Bee Movespeed", "Critical Power", "Super Critical Power", "Honey From Tokens"]
    };

    // Populate the attribute filter based on the selected category
    categoryFilter.addEventListener('change', () => {
        const selectedCategory = categoryFilter.value;
        attributeFilter.innerHTML = '<option value="">Select an Attribute</option>'; // Reset attributes

        if (selectedCategory && categoriesAttributes[selectedCategory]) {
            // Populate attribute filter with relevant attributes
            categoriesAttributes[selectedCategory].forEach(attribute => {
                const option = document.createElement('option');
                option.value = attribute;
                option.textContent = attribute;
                attributeFilter.appendChild(option);
            });
            attributeFilter.style.display = 'block'; // Show attribute filter
        } else {
            attributeFilter.style.display = 'none'; // Hide attribute filter if no category is selected
        }

        filterItems(); // Update the item display based on the category selection
    });

    function filterItems() {
        const searchTerm = searchBar.value.toLowerCase();
        const selectedCategory = categoryFilter.value;
        const selectedAttribute = attributeFilter.value;
    
        document.querySelectorAll('.menu-grid').forEach(menuGrid => {
            let visibleItemsCount = 0;
    
            // Filter each item in the current category grid
            menuGrid.querySelectorAll('.item-container').forEach(container => {
                const item = container.querySelector('img');
                const itemName = item.alt.toLowerCase();
                const itemAttributes = [
                    item.getAttribute('data-stack'),
                    item.getAttribute('data-reward'),
                    item.getAttribute('data-bee'),
                    item.getAttribute('data-field')
                ].filter(attr => attr); // Only keep attributes that are set
    
                // Check if item matches search, category, and specific attribute
                const matchesSearch = itemName.includes(searchTerm);
                const matchesCategory = !selectedCategory || itemAttributes.some(attr => attr.includes(selectedCategory));
                const matchesAttribute = !selectedAttribute || itemAttributes.some(attr => attr.includes(selectedAttribute));
    
                // Show or hide the container based on matching criteria
                const isVisible = matchesSearch && matchesCategory && matchesAttribute;
                container.style.display = isVisible ? 'inline-block' : 'none';
    
                // Track the count of visible items in the category
                if (isVisible) visibleItemsCount++;
            });
    
            // Toggle visibility of the category title based on visible items count
            const categoryTitle = menuGrid.previousElementSibling;
            categoryTitle.style.display = visibleItemsCount > 0 ? 'block' : 'none';
        });
    }
    
    // Event listeners for search bar and attribute filter
    searchBar.addEventListener('input', filterItems);
    categoryFilter.addEventListener('change', filterItems);
    attributeFilter.addEventListener('change', filterItems);
});

// Close the menu when clicking outside
window.addEventListener('click', (event) => {
    if (!event.target.matches('.open-menu') && !event.target.closest('.menu')) {
        selectionMenu.style.display = 'none';
    }
});
 // Show the popup with a fade-in animation
 function showPopup() {
    const popup = document.getElementById('popup');
    popup.style.display = 'flex';
    popup.classList.remove('fade-out');
    popup.classList.add('fade-in');
}

function closePopup() {
    const popup = document.getElementById('popup');
    popup.classList.remove('fade-in');
    popup.classList.add('fade-out');

    // Use an animationend event to hide the element after the fade-out animation completes
    popup.addEventListener('animationend', () => {
        popup.style.display = 'none';
        popup.classList.remove('fade-out'); // Reset class for future use
    }, { once: true }); // Ensures the event only triggers once
}


// Automatically show popup on page load
window.onload = showPopup;

const moonIcon = document.getElementById('moon-icon');
const moonImage = moonIcon.querySelector('img');
const body = document.body;

moonIcon.addEventListener('click', () => {
    body.classList.toggle('dark-mode');

    if (body.classList.contains('dark-mode')) {
        moonImage.src = 'imageslibrary/other/darkmode-iconNEW.png';
        moonIcon.classList.add('glow'); // Add glow effect for dark mode
    } else {
        moonImage.src = 'imageslibrary/other/lightmode-iconNEW.png';
        moonIcon.classList.remove('glow'); // Remove glow in light mode
    }
});

// Create a tooltip element
const tooltip = document.createElement('div');
tooltip.classList.add('tooltip');
document.body.appendChild(tooltip);

// Function to show tooltip under the item menu
function showTooltip(event) {
    const tooltipText = event.target.getAttribute('data-tooltip');
    if (tooltipText) {
        tooltip.textContent = tooltipText;
        tooltip.style.opacity = '1';

        // Get item menu's position and set tooltip below it
        const menuRect = itemMenu.getBoundingClientRect();
        tooltip.style.left = `${menuRect.left}px`;
        tooltip.style.top = `${menuRect.bottom + 10}px`; // Position slightly below the menu
    }
}

// Function to hide tooltip
function hideTooltip() {
    tooltip.style.opacity = '0';
}

// Attach event listeners to buttons with tooltips
document.querySelectorAll('[data-tooltip]').forEach(button => {
    button.addEventListener('mouseenter', showTooltip);
    button.addEventListener('mouseleave', hideTooltip);
});

// Track favorite items globally using their unique `data-order` or `src`
const favoriteItems = new Set();

// Save favorite items to localStorage
function saveFavoritesToLocalStorage() {
    const favoritesArray = Array.from(favoriteItems); // Convert Set to Array
    localStorage.setItem('favoriteItems', JSON.stringify(favoritesArray));
}

// Load favorite items from localStorage
function loadFavoritesFromLocalStorage() {
    const savedFavorites = JSON.parse(localStorage.getItem('favoriteItems')) || [];
    savedFavorites.forEach(itemKey => {
        // Find the corresponding item in the index
        const item = document.querySelector(`[data-order="${itemKey}"]`);
        if (item) {
            // Add the item to favorites grid
            addItemToFavorites(item);
            favoriteItems.add(itemKey); // Restore favoriteItems set
        }
    });

    // Sync star states after loading
    savedFavorites.forEach(syncFavoriteStars);
}
// Function to toggle favorite state and sync stars
function toggleFavorite(item) {
    const itemKey = item.getAttribute('data-order') || item.src;

    if (favoriteItems.has(itemKey)) {
        favoriteItems.delete(itemKey);
        removeItemFromFavorites(itemKey);
    } else {
        favoriteItems.add(itemKey);
        addItemToFavorites(item);
    }

    // Sync and save state
    syncFavoriteStars(itemKey);
    saveFavoritesToLocalStorage();
}

// Add item to favorites directly, wrapped in a container
function addItemToFavorites(item) {
    const favoritesGrid = document.querySelector('.star-grid');
    const itemKey = item.getAttribute('data-order') || item.src;

    if (!favoritesGrid) {
        console.error("Favorites grid not found.");
        return;
    }

    // Prevent adding duplicates
    if (favoritesGrid.querySelector(`[data-order="${itemKey}"]`)) return;

    // Clone the item and add a click event to add it to the field
    const clonedItem = item.cloneNode(true);
    clonedItem.setAttribute('data-order', itemKey); // Ensure the cloned item has a unique identifier
    clonedItem.addEventListener('click', () => addItemToField(clonedItem)); // Make clickable to add to field

    // Wrap cloned item in a container and append to favorites
    const container = document.createElement('div');
    container.classList.add('item-container');
    container.appendChild(clonedItem);
    favoritesGrid.appendChild(container);

    // Add star button to the cloned item within the favorites grid
    addStarButton(clonedItem, true);
}

// Remove item from favorites section
function removeItemFromFavorites(itemKey) {
    const favoritesGrid = document.querySelector('.star-grid');
    if (!favoritesGrid) return;

    const favoriteItemContainer = favoritesGrid.querySelector(`[data-order="${itemKey}"]`)?.closest('.item-container');
    if (favoriteItemContainer) {
        favoriteItemContainer.remove();
    }
}

// Sync favorite star status across index and favorites categories
function syncFavoriteStars(itemKey) {
    const allInstances = document.querySelectorAll(`[data-order="${itemKey}"]`);
    allInstances.forEach(item => {
        const star = item.closest('.item-container')?.querySelector('.favorite-star');
        if (star) {
            // Toggle 'favorited' class to apply correct color from CSS
            if (favoriteItems.has(itemKey)) {
                star.classList.add('favorited');
            } else {
                star.classList.remove('favorited');
            }
        }
    });
}

// Add star button dynamically to non-beequip items
function addStarButton(item) {
    if (item.getAttribute('data-type') === 'beequip') return; // Skip Beequips

    const starButton = document.createElement('div');
    starButton.classList.add('favorite-star'); // Initialize with the default state

    // Toggle favorite on star click
    starButton.addEventListener('click', (event) => {
        event.stopPropagation();
        toggleFavorite(item);
    });

    item.parentNode.appendChild(starButton);
}

// Wrap item with a container if needed, and add a star button
function wrapItemWithContainer(item) {
    if (!item) return null;

    let container = item.closest('.item-container');
    if (!container) {
        container = document.createElement('div');
        container.classList.add('item-container');
        if (item.parentNode) {
            item.parentNode.replaceChild(container, item);
            container.appendChild(item);
        }
    }
    return container;
}

// Initialize star buttons for all items in a specified grid
function initializeStarsForItems(gridSelector) {
    const items = document.querySelectorAll(`${gridSelector} img`);
    items.forEach(item => {
        const container = wrapItemWithContainer(item);
        if (container) addStarButton(item);
    });
}
// Call loadFavoritesFromLocalStorage on page load
document.addEventListener('DOMContentLoaded', () => {
    loadFavoritesFromLocalStorage();
});
// Initialize stars for items in menu and favorites grids
initializeStarsForItems('.menu-grid');
initializeStarsForItems('.star-grid');
