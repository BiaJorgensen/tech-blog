const signup = async (event) => {
    event.preventDefault();
    
    const email = $('#signup-email').val().trim();
    const username = $('#login-username').val().trim();
    const password = $('#login-password').val().trim();

    if (email && username && password) {
        const response = await fetch('/api/users', {
          method: 'POST',
          body: JSON.stringify({ email, username, password }),
          headers: { 'Content-Type': 'application/json' },
        });
    
        if (response.ok) {
          document.location.replace('/');
        } else {
          alert(response.statusText);
        }
      }
    };

$('.signup-form').submit(signup);