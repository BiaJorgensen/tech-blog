const login = async (event) => {
    event.preventDefault();

    const username = $('#login-username').val().trim();
    const password = $('#login-password').val().trim();

    if (username && password) {
    const response = await fetch('/api/user/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
    headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
        document.location.replace('/');
    }
    else {
        alert(response.statusText)
    }
    
    }
};

$('.login-form').submit(login);