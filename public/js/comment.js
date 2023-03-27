const addComment = async (event) => {
    event.preventDefault();
    const post_id = window.location.pathname.split('/').pop();
    const content = $('#newComment').val();
   

    if (content) {
    const response = await fetch('/api/comment', {
    method: 'POST',
    body: JSON.stringify({ content, post_id}),
    headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
        document.location.replace(`/comment/${post_id}`);
    }
    else {
        alert("Please add a comment")
    }
    
    }
};

$('#add-comment-btn').click(addComment);