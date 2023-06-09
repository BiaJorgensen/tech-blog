// Fetching api route to add a new comment
const addComment = async (event) => {
  event.preventDefault();
  const post_id = window.location.pathname.split("/").pop();
  const content = $("#newComment").val();

  if (content) {
    const response = await fetch("/api/comment", {
      method: "POST",
      body: JSON.stringify({ content, post_id }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace(`/comment/${post_id}`);
    } else {
      alert("Please add a comment");
    }
  }
};

// Fetching api route to see all comments for a unique post
const seePostComments = async (event) => {
  event.preventDefault();
  const post_id = window.location.pathname.split("/").pop();

  const response = await fetch(`/comment/${post_id}`, {
    method: "GET",
  });

  if (response.ok) {
    document.location.replace(`/comment/${post_id}`);
  } else {
    alert(response.statusText);
  }
};

$("#add-comment-btn").click(addComment);
$("#see-all-comments").click(seePostComments);
