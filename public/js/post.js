// Fetching api route to create a new Post
const post = async (event) => {
  event.preventDefault();
  const title = $("#post-title").val().trim();
  const content = $("#post-content").val().trim();

  if (title && content) {
    const response = await fetch("/api/post", {
      method: "POST",
      body: JSON.stringify({ title, content }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert(response.statusText);
    }
  }
};

// Fetching api route to update an existing post
const updatePost = async (event) => {
  event.preventDefault();
  const id = window.location.pathname.split("/").pop();
  const title = $("#update-post-title").val().trim();
  const content = $("#update-post-content").val().trim();

  if (title || content) {
    const response = await fetch(`/api/post/${id}`, {
      method: "PUT",
      body: JSON.stringify({ title, content }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert(response.statusText);
    }
  }
};

// Fetching api route to delete an existing post
const deletePost = async (event) => {
  event.preventDefault();
  const id = window.location.pathname.split("/").pop();
  const response = await fetch(`/api/post/${id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert(response.statusText);
  }
};

$("#post-btn").click(post);
$("#update-post-btn").click(updatePost);
$("#delete-post-btn").click(deletePost);
