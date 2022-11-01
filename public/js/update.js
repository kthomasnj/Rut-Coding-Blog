async function updatePost() {
    const title = document.querySelector('#title').value;
    const postText = document.querySelector('#postContent').value;
    const postId = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);

    const response = await fetch('/api/update/'+ postId, {
        method: 'PUT',
        body: JSON.stringify({
            title,
            postText,
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

async function deletePost() {
    console.log('Delete click worked!!');
    const postId = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);

    const response = await fetch('/api/delete/'+ postId, {
        method: 'DELETE',
        body: JSON.stringify({}),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (response.ok) {
        document.location.replace('/');
    } else {
        alert('Failed to delete post.');
    }
};


document
    .querySelector('#update')
    .addEventListener('click', updatePost);

    document
    .querySelector('#delete')
    .addEventListener('click', deletePost);