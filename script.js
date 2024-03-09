document.addEventListener("DOMContentLoaded", function() {
    const popup = document.querySelector('.popup-overlay');
    const closePopupBtn = document.getElementById('closePopup');

    popup.style.display = 'flex';

    closePopupBtn.addEventListener('click', function() {
        popup.style.opacity = 0;
        setTimeout(() => {
            popup.style.display = 'none';
            popup.style.opacity = 1;
        }, 500); 
    });
});

function searchItems(categoryId) {
    var input = document.getElementById('searchBar_' + categoryId);
    var filter = input.value.toUpperCase();

    var container = document.getElementById(categoryId);

    var imgs = container.querySelectorAll('img');

    imgs.forEach(function(img) {
        var alt = img.alt.toUpperCase();
        
        var itemValue = img.nextElementSibling;

        if (alt.indexOf(filter) > -1) {
            img.style.display = 'inline-flex';
            if (img.style.display !== 'none') {
                itemValue.style.display = 'inline-flex';
            }
        } else {
            img.style.display = 'none'; 
            itemValue.style.display = 'none';
        }
    });
}
function addItem(receiver) {
    selectedReceiver = receiver;
    const addSigns = document.querySelectorAll('.add-sign');
    addSigns.forEach(sign => {
        sign.classList.remove('selected');
    });
    if (event.target.classList.contains('add-sign')) {
        event.target.classList.add('selected');
    }
}

function clearAllSections() {
    const sections = document.querySelectorAll('.you-receive, .i-receive');
    sections.forEach(section => {
        const imagesAndText = section.querySelectorAll('img, .total-value, .added-item-text');
        imagesAndText.forEach(element => {
            element.remove();
        });
    });
    if (!document.querySelector('.toggle-button').classList.contains('active')) {
        calculateTotalValue(); 
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const items = document.querySelectorAll('.items img');
    items.forEach(item => {
        item.addEventListener('click', function () {
            if (selectedReceiver) {
                const categoryTitle = item.closest('.category').querySelector('h2').textContent;
                if (selectedReceiver === 'you-receive' || selectedReceiver === 'i-receive') {
                    if (categoryTitle.trim() === 'Beequips') {
                        const firstItemName = prompt('Add an ability/potential for this item (leave blank if no ability):');
                        if (firstItemName !== null) {
                            let itemText = firstItemName.trim();
                            let confirmAddMore = true;
                            while (confirmAddMore) {
                                const additionalText = prompt('Would you like to enter more infos about the beequip:');
                                if (additionalText !== null) {
                                    itemText += '\n' + additionalText.trim();
                                    confirmAddMore = confirm('Anything left?');
                                } else {
                                    confirmAddMore = false;
                                }
                            }
                            const text = document.createElement('span');
                            text.textContent = itemText;
                            text.classList.add('added-item-text');
                            const selectedSection = document.getElementById(selectedReceiver);
                            const clone = selectedSection.appendChild(item.cloneNode(true));
                            selectedSection.appendChild(text);
                            calculateTotalValue();
                        }
                    } else {
                        const clone = item.cloneNode(true);
                        document.getElementById(selectedReceiver).appendChild(clone);
                        calculateTotalValue();
                    }
                } else {
                    const clone = item.cloneNode(true);
                    document.getElementById(selectedReceiver).appendChild(clone);
                    calculateTotalValue();
                }
            }
        });
    });

    const addSigns = document.querySelectorAll('.add-sign');
    addSigns.forEach(sign => {
        sign.addEventListener('click', function () {
            addItem(this.parentElement.id);
        });
    });

    document.body.addEventListener('click', function (event) {
        const isAddSign = event.target.classList.contains('add-sign');
        const isItem = event.target.classList.contains('items') || event.target.closest('.items');
        if (!isAddSign && !isItem) {
            selectedReceiver = null;
            const addSigns = document.querySelectorAll('.add-sign');
            addSigns.forEach(sign => {
                sign.classList.remove('selected');
            });
        }
    });

    const searchBars = document.querySelectorAll('input[type="text"]');
    searchBars.forEach(searchBar => {
        searchBar.addEventListener('click', function() {
            const toggleButton = document.querySelector('.toggle-button');
            if (toggleButton && toggleButton.classList.contains('active')) {
                toggleItemValues();
            }
        });
    });

    function numberWithCommas(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    function calculateTotalValue() {
        const sections = document.querySelectorAll('.you-receive, .i-receive');
        sections.forEach(section => {
            const images = section.querySelectorAll('img');
            let totalNumbers = 0;
            
            images.forEach(image => {
                const value = image.dataset.value;
                const number = parseInt(value);
                if (!isNaN(number)) { 
                    totalNumbers += number; 
                }
            });
            
            const existingTotalText = section.querySelector('.total-value');
            if (existingTotalText) {
                existingTotalText.remove();
            }
            const totalText = document.createElement('div');
            totalText.textContent = `Total Value: ${formatNumberWithCommas(totalNumbers)}`;
            totalText.classList.add('total-value');
            section.appendChild(totalText);
        });
    }
    
    function formatNumberWithCommas(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const clearButton = document.querySelector('.clear-button');
    clearButton.addEventListener('click', clearAllSections);
});

function toggleItemValues() {
    const itemValues = document.querySelectorAll('.item-value');
    itemValues.forEach(function(itemValue) {
        itemValue.classList.toggle('hidden');
    });
}
