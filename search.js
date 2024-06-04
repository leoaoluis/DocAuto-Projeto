function performSearch() {
    const searchType = document.getElementById('type').value;
    const searchQuery = document.getElementById('search-term').value.toLowerCase();

    // Simulação de busca de dados
    const allResults = [
        { type: 'car', name: 'CARTHINGS A478 - Air Filter', price: '5,30 $', inStock: true, image: 'assets/filters.png', link: 'checkout.html', compatible: { brand: 'Audi', model: 'A4' } },
        { type: 'car', name: 'MAHLE ORIGINAL LX 1566 - Air filter', price: '13,96 $', inStock: true, image: 'assets/filters2.png' },
        { type: 'car', name: 'LOGAUTO BNS87 - Tyre', price: '80,00 $', inStock: true, image: 'assets/tyres.png' },
        { type: 'motorcycle', name: 'MBIKE ORIGINAL SUPER 8462 - Suspension', price: '54,87 $', inStock: true, image: 'assets/suspensao1.png' },
        { type: 'motorcycle', name: 'THATBIKE AXLS - Suspension', price: '34,51 $', inStock: false, image: 'assets/suspensao2.png' },
        // Adicione mais itens conforme necessário
    ];

    const userVehicles = JSON.parse(localStorage.getItem('garage')) || [];

    // Filtrar resultados com base na pesquisa
    const filteredResults = allResults.filter(item => item.type === searchType && item.name.toLowerCase().includes(searchQuery));

    // Exibir resultados
    const vehicleResultsContainer = document.getElementById('vehicle-results');
    const moreResultsContainer = document.getElementById('more-results');
    vehicleResultsContainer.innerHTML = '';
    moreResultsContainer.innerHTML = '';

    filteredResults.forEach(result => {
        const resultItem = document.createElement('div');
        resultItem.className = 'result-item';

        // Verificar compatibilidade
        let compatibilityText = '';
        if (result.compatible) {
            userVehicles.forEach(vehicle => {
                if (vehicle.brand.toLowerCase() === result.compatible.brand.toLowerCase() &&
                    vehicle.model.toLowerCase() === result.compatible.model.toLowerCase()) {
                    compatibilityText = '<p class="compatible">Compatível com o seu carro</p>';
                }
            });
        }

        resultItem.innerHTML = `
            <img src="${result.image}" alt="${result.name}">
            <h4>${result.name}</h4>
            <p>${result.price}</p>
            <p>${result.inStock ? 'In stock' : 'Out of stock'}</p>
            ${compatibilityText}
            <a href="${result.link || '#'}" class="add-to-cart">ADD TO CART</a>
        `;

        vehicleResultsContainer.appendChild(resultItem);
    });
}

document.querySelector('.search-button').addEventListener('click', performSearch);
