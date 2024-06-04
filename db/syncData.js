async function syncData() {
    let storedLogins = localStorage.getItem('logins');

    if (!storedLogins) {
        await fetch('db/logins.json')
            .then(response => response.json())
            .then(data => {
                localStorage.setItem('logins', JSON.stringify(data.logins));
            })
            .catch(error => console.error('Error:', error));
    }
}

syncData();
