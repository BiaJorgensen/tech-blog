const post = async (event) => {
  
    event.preventDefault();
    console.log("testing");

   
    const title = $('#post-title').val().trim();
    const content = $('#post-content').val().trim();

    if (title && content) {
        const response = await fetch('/api/post', {
          method: 'POST',
          body: JSON.stringify({ title, content }),
          headers: { 'Content-Type': 'application/json' },
        });
    
        if (response.ok) {
          document.location.replace('/dashboard');
        } else {
          alert(response.statusText);
        }
      }
    };

$('#post-btn').click(post);

console.log($('#post-btn'));