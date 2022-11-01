async function newComment() {
    const newComment= document.querySelector('#newComment').value;

    const response = await fetch(`/api/comments`, {
        method: 'POST',
        body: JSON.stringify({
            newComment,
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
    .addEventListener('click', newComment);