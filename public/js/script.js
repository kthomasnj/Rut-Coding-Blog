const newTitle = document.querySelector('#title').value;
const newContent = document.querySelector('#postContent').value;

async function newPost(event) {
    // event.preventDefault();
    console.log('newPost function ran.');
    console.log('event: ', event);

    console.log(`newTitle: `, document.getElementById('title').value);
    console.log(`postContent: `, document.querySelector('#postContent'.value));

    const response = await fetch(`/api/create`, {
        method: 'POST',
        body: JSON.stringify({
            newTitle,
            newContent,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert('Failed to add post.');
    }
}

document
    .querySelector('#submit')
    .addEventListener('submit', newPost());