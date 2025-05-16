const button=document.querySelector('.menu-button');
const iconUp=document.querySelector('.menu-icon-up');
const iconDown=document.querySelector('.menu-icon-down');
const iconMiddle=document.querySelector('.menu-icon-middle');
const menu=document.querySelector('.navigation');
const hide=document.querySelector('.main');

button.addEventListener('click',()=>{
    iconUp.classList.toggle('menu-icon-up-action');
    iconDown.classList.toggle('menu-icon-down-action');
    iconMiddle.classList.toggle('menu-icon-middle-action');
    menu.classList.toggle('navigation-action');
    hide.classList.toggle('main-remove');
});

import products from './products.js';

products()
  .then(data => data.data)
  .then(allProducts => {
    const resultsContainer = document.getElementById('results');
    const input = document.querySelector('.search');
    const searchButton = document.querySelector('.searchButton');

    // Function to display product cards
    function displayNames(list) {
      resultsContainer.innerHTML = ''; // Clear previous results

      list.forEach(product => {
        const card = document.createElement('div');
        card.className = 'item-card';

        const productImage = product.image || 'path_to_default_image.jpg'; // Fallback if image is missing

        card.innerHTML = `
          <img src="${productImage}" alt="${product.name}" />
          <div class="info">
            <div class="title">${product.name}</div>
            <div class="price">${product.price}$</div>
            <a href="${product.link}" target="_blank">View Product</a>
          </div>
        `;

        resultsContainer.appendChild(card);
      });
    }

    displayNames(allProducts);

   // Filter function (live search)
function toFilter(value) {
  const searchValue = value.trim().toLowerCase();
  if (!searchValue) return allProducts;

  const inputWords = searchValue.split(/\s+/);

  return allProducts.filter(product => {
    const words = product.name.trim().toLowerCase().split(/\s+/); // Split name into words

    // Find the starting index where the product words begin to match
    let target = -1;
    for (let i = 0; i < words.length; i++) {
      if (words[i].startsWith(inputWords[0])) {
        target = i;
        break; // Optional: break early on first match
      }
    }

    // If no starting point was found, skip this product
    if (target === -1 || target + inputWords.length > words.length) return false;

    // Now check all input words match in sequence
    for (let j = 0; j < inputWords.length; j++) {
      if (!words[j + target].startsWith(inputWords[j])) {
        return false; // Early exit on mismatch
      }
    }

    return true; // All input words matched in order
  });
}

    // Search function (returns only the first match)
    function toSearch(value) {
      const filteredNames = toFilter(value);
      return filteredNames.length > 0 ? [filteredNames[0]] : [];
    }

    // Listen for typing
    input.addEventListener('input', () => {
      displayNames(toFilter(input.value));
      window.scrollTo(0, 0);
    });

    // Listen for Enter and Space keys
    input.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        displayNames(toSearch(input.value));
        window.scrollTo(0, 0);
      }
      if (event.key === ' ') {
        // Just filter again on space
        displayNames(toFilter(input.value));
        window.scrollTo(0, 0);
      }
    });

    // Search button click
    searchButton.addEventListener('click', () => {
      displayNames(toSearch(input.value));
      window.scrollTo(0, 0);
    });
  });
