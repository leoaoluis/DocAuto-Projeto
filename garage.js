
function closeEditPopup() {
    document.getElementById('edit-vehicle-popup').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
    const addVehicleButton = document.getElementById('add-vehicle-button');
    const garageTable = document.getElementById('garage-table');
    const garageMessage = document.getElementById('garage-message');
    const vehiclePopup = document.getElementById('vehicle-popup');
    const closePopup = document.querySelector('.popup .close');
    const vehicleForm = document.getElementById('vehicleForm');
    const garageTableBody = garageTable.querySelector('tbody');

    const VIN_LENGTH = 17;

    const plateInput = document.getElementById('plate');

    // Adiciona um ouvinte de evento 'input' para converter automaticamente o texto em maiúsculas
    plateInput.addEventListener('input', () => {
        plateInput.value = plateInput.value.toUpperCase();
    });

    function generateRandomVIN() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let vin = '';
        for (let i = 0; i < VIN_LENGTH; i++) {
            vin += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return vin;
    }

    function checkPlateExistence(plate, currentIndex) {
        const vehicles = JSON.parse(localStorage.getItem('garage')) || [];
        for (let index = 0; index < vehicles.length; index++) {
            if (index != currentIndex && vehicles[index].plate.toLowerCase() === plate.toLowerCase()) {
                return true;
            }
        }
        return false;
    }

    function loadGarage() {
        const vehicles = JSON.parse(localStorage.getItem('garage')) || [];
        if (vehicles.length > 0) {
            garageMessage.style.display = 'none';
            garageTable.style.display = 'table';
            garageTableBody.innerHTML = '';
            vehicles.forEach((vehicle, index) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${vehicle.plate}</td>
                    <td>${vehicle.brand}</td>
                    <td>${vehicle.model}</td>
                    <td>${vehicle.year}</td>
                    <td>${vehicle.vin}</td>
                    <td>
                        <button class="edit-button" onclick="editVehicle(${index})">Edit</button>
                        <button class="delete-button" onclick="deleteVehicle(${index})">Delete</button>
                    </td>
                `;
                garageTableBody.appendChild(row);
            });
        } else {
            garageMessage.style.display = 'block';
            garageTable.style.display = 'none';
        }
    }

    function saveGarage(vehicles) {
        localStorage.setItem('garage', JSON.stringify(vehicles));
        loadGarage();
    }

    addVehicleButton.addEventListener('click', () => {
        vehiclePopup.style.display = 'flex';
    });

    closePopup.addEventListener('click', () => {
        vehiclePopup.style.display = 'none';
    });

    function openEditPopup(index) {
        const vehicles = JSON.parse(localStorage.getItem('garage')) || [];
        const vehicle = vehicles[index];
    
        document.getElementById('edit-index').value = index;
        document.getElementById('edit-plate').value = vehicle.plate.toUpperCase();
        document.getElementById('edit-brand').value = vehicle.brand;
        document.getElementById('edit-model').value = vehicle.model;
        document.getElementById('edit-year').value = vehicle.year;
        document.getElementById('edit-vin').value = vehicle.vin;
    
        // Adiciona um ouvinte de evento 'input' para atualizar o VIN quando a matrícula é alterada
        const plateInput = document.getElementById('edit-plate');
        plateInput.addEventListener('input', () => {
            const newVIN = generateRandomVIN();
            document.getElementById('edit-vin').value = newVIN;
            // Verifica se a nova matrícula já existe
            if (checkPlateExistence(plateInput.value, index)) {
                plateInput.setCustomValidity('A matrícula já existe. Por favor, insira uma matrícula diferente.');
            } else {
                plateInput.setCustomValidity('');
            }
        });
    
        document.getElementById('edit-vehicle-popup').style.display = 'flex';
    }

    document.getElementById('editVehicleForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const index = document.getElementById('edit-index').value;
        const plate = document.getElementById('edit-plate').value.toUpperCase();
        const brand = document.getElementById('edit-brand').value;
        const model = document.getElementById('edit-model').value;
        const year = document.getElementById('edit-year').value;
        const vin = document.getElementById('edit-vin').value;
    
        // Verifica se a nova matrícula já existe
        if (checkPlateExistence(plateInput.value, index)) {
            plateInput.setCustomValidity('A matrícula já existe. Por favor, insira uma matrícula diferente.');
        } else {
            plateInput.setCustomValidity('');
        }
    
        const vehicles = JSON.parse(localStorage.getItem('garage')) || [];
        const vehicle = vehicles[index];
        vehicle.plate = plate;
        vehicle.brand = brand;
        vehicle.model = model;
        vehicle.year = year;
        vehicle.vin = vin;
    
        vehicles[index] = vehicle;
        localStorage.setItem('garage', JSON.stringify(vehicles));
    
        loadGarage();
        closeEditPopup();
    });    

    vehicleForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const plate = vehicleForm.plate.value.toUpperCase();
        const brand = vehicleForm.brand.value;
        const model = vehicleForm.model.value;
        const year = vehicleForm.year.value;
        const vin = generateRandomVIN();

        if (checkPlateExistence(plate)) {
            plateInput.setCustomValidity('A matrícula já existe. Por favor, insira uma matrícula diferente.');
            return; // Aborta a submissão do formulário
        }

        const newVehicle = { plate, brand, model, year, vin };

        const vehicles = JSON.parse(localStorage.getItem('garage')) || [];
        vehicles.push(newVehicle);
        saveGarage(vehicles);

        vehicleForm.reset();
        vehiclePopup.style.display = 'none';
    });

    // Adiciona evento de alteração ao campo de matrícula para gerar um novo VIN
    vehicleForm.plate.addEventListener('change', () => {
        const vinField = vehicleForm.vin;
        vinField.value = generateRandomVIN();
    });

    window.editVehicle = function(index) {
        openEditPopup(index);
    };

    window.deleteVehicle = function(index) {
        const vehicles = JSON.parse(localStorage.getItem('garage')) || [];
        vehicles.splice(index, 1);
        saveGarage(vehicles);
    };

    loadGarage();
});

document.addEventListener('DOMContentLoaded', function() {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));

    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }
});

    addVehicleButton.addEventListener('click', () => {
    if (!sessionStorage.getItem('currentUser')) {
        window.location.href = 'login.html';
        return;
    }
    vehiclePopup.style.display = 'block';
    modalOverlay.style.display = 'block';
});
