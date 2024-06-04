// script.js

document.addEventListener('DOMContentLoaded', () => {
    const calendar = document.getElementById('calendar-dates');
    const monthYear = document.getElementById('month-year');
    const prevMonthButton = document.getElementById('prev-month');
    const nextMonthButton = document.getElementById('next-month');
    const eventModal = document.getElementById('event-modal');
    const closeModalButton = document.querySelector('.close-button');
    const eventForm = document.getElementById('event-form');
    const eventTitleInput = document.getElementById('event-title');
    const eventDateInput = document.getElementById('event-date');
    const deleteEventButton = document.getElementById('delete-event');
    const addEventButton = document.getElementById('add-event-button');
    const eventsListContainer = document.getElementById('event-list');
    const eventsList = document.getElementById('events');

    let currentDate = new Date();
    let events = JSON.parse(localStorage.getItem('events')) || {};
    let selectedDate = null;


    function renderCalendar() {
        const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
        const lastDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
        const today = new Date();
        const todayDateStr = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    
        calendar.innerHTML = '';
        monthYear.textContent = `${currentDate.toLocaleString('default', { month: 'long' }).charAt(0).toUpperCase() + currentDate.toLocaleString('default', { month: 'long' }).slice(1)} ${currentDate.getFullYear()}`;
    
        for (let i = 0; i < firstDay; i++) {
            calendar.innerHTML += `<div class="date empty"></div>`;
        }
    
        for (let date = 1; date <= lastDate; date++) {
            const fullDate = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${date}`;
            const hasEvent = events[fullDate] && events[fullDate].length > 0;
            const classNames = hasEvent ? 'event' : '';
            calendar.innerHTML += `<div class="date ${classNames} ${fullDate === todayDateStr ? 'today' : ''}" data-date="${fullDate}">${date}</div>`;
        }
    
        document.querySelectorAll('.date:not(.empty)').forEach(dateElement => {
            dateElement.addEventListener('click', handleDateClick);
        });

        
    
        renderEventList(selectedDate);
    }

    document.getElementById('hide-list-button').addEventListener('click', hideEventList);

    function hideEventList() {
        eventsListContainer.style.display = 'none';
    }
    
    

    function renderEventList(date) {
        eventsList.innerHTML = '';
        const eventItems = events[date] || [];
        const formattedDate = new Date(date).toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' });
    
        const eventHeader = document.createElement('h3');
        eventHeader.textContent = `Eventos para ${formattedDate}`;
        eventsList.appendChild(eventHeader);
    
        eventItems.forEach((eventTitle, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span class="event-title">${eventTitle}</span>
                <div class="event-actions">
                    <button class="edit-event" data-index="${index}" style="color: blue;">✎</button>
                    <button class="delete-event" data-index="${index}" style="color: red;">🗑️</button>
                </div>
            `;
            eventsList.appendChild(li);
        });
    
        document.querySelectorAll('.edit-event').forEach(button => {
            button.addEventListener('click', editEvent);
        });
    
        document.querySelectorAll('.delete-event').forEach(button => {
            button.addEventListener('click', deleteEvent);
        });

        document.getElementById('today-button').addEventListener('click', goToToday);

        function goToToday() {
            currentDate = new Date(); // Define a data atual como a data atual
            selectedDate = null; // Limpa a data selecionada
            renderCalendar(); // Renderiza o calendário com a data atual
        }
    }
    

    function openEventModal(event, index) {
        const date = selectedDate;
        eventDateInput.value = date;
        eventTitleInput.value = index !== undefined ? events[date][index] : '';
        eventModal.style.display = 'block';
        document.getElementById('modal-title').textContent = index !== undefined ? 'Editar Evento' : 'Adicionar Evento';
        deleteEventButton.style.display = index !== undefined ? 'inline' : 'none';
    }

    function closeModal() {
        eventModal.style.display = 'none';
    }

    function saveEvent(event) {
        event.preventDefault();
        const date = eventDateInput.value;
        const title = eventTitleInput.value.trim();
        
        if (!events[date]) {
            events[date] = [];
        }
        
        if (eventTitleInput.dataset.index !== '') {
            const index = eventTitleInput.dataset.index;
            events[date][index] = title;
        } else {
            events[date].push(title);
        }

        localStorage.setItem('events', JSON.stringify(events));
        renderCalendar();
        closeModal();
    }

    function handleDateClick(event) {
        const date = event.target.dataset.date;
    
        if (selectedDate === date) {
            selectedDate = null;
            eventsListContainer.style.display = 'none';
        } else {
            selectedDate = date;
            renderEventList(date);
            eventsListContainer.style.display = 'block';
        }
    
        document.querySelectorAll('.date').forEach(el => el.classList.remove('selected')); // Remove a classe 'selected' de todos os dias
        if (selectedDate) {
            event.target.classList.add('selected'); // Adiciona a classe 'selected' apenas ao dia selecionado
        }
    }    

    function editEvent(event) {
        const date = selectedDate;
        const index = event.target.dataset.index;
        const eventTitle = events[date][index]; // Obtém o título do evento existente
    
        eventTitleInput.value = eventTitle; // Preenche o formulário com o título do evento existente
        eventTitleInput.dataset.index = index;
        openEventModal();
    }   

    function deleteEvent(event) {
        const date = selectedDate;
        const index = event.target.dataset.index;
        events[date].splice(index, 1);

        if (events[date].length === 0) {
            delete events[date];
        }

        localStorage.setItem('events', JSON.stringify(events));
        renderCalendar();
        closeModal();
    }

    function handleAddEventButtonClick() {
        eventTitleInput.dataset.index = '';
        openEventModal();
    }

    prevMonthButton.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });

    nextMonthButton.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });

    closeModalButton.addEventListener('click', closeModal);
    eventForm.addEventListener('submit', saveEvent);
    addEventButton.addEventListener('click', handleAddEventButtonClick);
    addEventButton.style.backgroundColor = '#014357';

    renderCalendar();
});
