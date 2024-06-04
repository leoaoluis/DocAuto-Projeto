document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const type = urlParams.get('type');
    const searchTerm = urlParams.get('term');

    const vehicleResultsContainer = document.getElementById('vehicle-results');
    const moreResultsContainer = document.getElementById('more-results');

    if (!type || !searchTerm) {
        vehicleResultsContainer.innerHTML = '<p>No search term or type provided.</p>';
        moreResultsContainer.innerHTML = '<p>No search term or type provided.</p>';
        return;
    }

    const searchResults = {
        car: {
            'air filter': [
                { name: 'CARTHINGS A478 - Air Filter', price: '5,30 $', inStock: true, image: 'assets/filters.png', link: 'checkout.html' },
                { name: 'MAHLE ORIGINAL LX 1566 - Air filter', price: '13,96 $', inStock: true, image: 'assets/filter2.png', link: '#' },
                
            ],
            // Add more parts as needed
            'tyres' : [
                { name: 'LOGAUTO BNS87 - Tyre', price: '80, 00 $', inStock: true, image: 'assets/tyres.png' },
            ]
        },
        motorcycle: {
            'suspension': [
            { name: 'MBIKE ORIGINAL SUPER 8462 - Suspension', price: '54,87 $', inStock: true, image: 'assets/suspensao1.png' },
            { name: 'THATBIKE AXLS - Suspension', price: '34,51 $', inStock: false, image: 'assets/suspensao2.png' },
            ],
        },
        truck: {
            // Add truck parts as needed
        }
    };

    const filteredResults = searchResults[type][searchTerm.toLowerCase()];

    if (filteredResults && filteredResults.length > 0) {
        filteredResults.forEach(part => {
            const partElement = document.createElement('div');
            partElement.className = 'result-item';
            partElement.innerHTML = `
                <img src="${part.image}" alt="${part.name}">
                <h4>${part.name}</h4>
                <p>${part.price}</p>
                <p>${part.inStock ? 'In stock' : 'Out of stock'}</p>
                <div class="add-to-cart"><a href="${part.link}">ADD TO CART</a></div>
            `;
            if (part.link === 'checkout.html') {
                vehicleResultsContainer.appendChild(partElement);
            } else {
                moreResultsContainer.appendChild(partElement);
            }
        });
    } else {
        vehicleResultsContainer.innerHTML = '<p>No results found.</p>';
        moreResultsContainer.innerHTML = '<p>No results found.</p>';
    }
});

function performSearch() {
    const type = document.getElementById('type').value;
    const searchTerm = document.getElementById('search-term').value;
    window.location.href = `results.html?type=${type}&term=${searchTerm}`;
}
