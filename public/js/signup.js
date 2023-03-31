// Fetching api route to allow user to signup by creating a new User
const signup = async (event) => {
  event.preventDefault();
  console.log("testing");
  const username = $("#signup-username").val().trim();
  const password = $("#signup-password").val().trim();

  if (username && password) {
    const response = await fetch("/api/user", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      const errorResponse = await response.json();
      alert(errorResponse.message);
    }
  } else {
    alert("Please enter all required fields.");
  }
};

$("#signup-btn").click(signup);
