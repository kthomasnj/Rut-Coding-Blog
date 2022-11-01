async function newPost() {
    const title = document.querySelector('#title').value;
    const postText = document.querySelector('#postContent').value;
    const author = document.querySelector('#currentUser').textContent;

    console.log(author);

    const response = await fetch(`/api/create`, {
        method: 'POST',
        body: JSON.stringify({
            title,
            postText,
            author: document.querySelector('#currentUser').textContent,
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
}

document
    .querySelector('#submit')
    .addEventListener('click', newPost);