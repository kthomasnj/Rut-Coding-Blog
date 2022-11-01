async function updatePost() {
    const title = document.querySelector('#title').value;
    const postText = document.querySelector('#postContent').value;
    const postId = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
    const author = document.querySelector('#currentUser').value;

    console.log(author);

    const response = await fetch('/api/update/'+ postId, {
        method: 'PUT',
        body: JSON.stringify({
            title,
            postText,
            author: author,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (response.ok) {
        document.location.replace('/');
    } else {
        alert('Failed to add post.');
    }
};

document
    .querySelector('#update')
    .addEventListener('click', updatePost);