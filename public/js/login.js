// Fetching api route to allow user to log in
const login = async (event) => {
  event.preventDefault();
  const username = $("#login-username").val().trim();
  const password = $("#login-password").val().trim();

  if (username && password) {
    const response = await fetch("/api/user/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/");
    } else {
      const errorResponse = await response.json();
      alert(errorResponse.message);
    }
  } else {
    alert("Please enter all required fields.");
  }
};

$(".login-form").submit(login);
