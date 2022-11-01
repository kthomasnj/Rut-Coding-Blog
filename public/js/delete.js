async function deletePost() {
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
    .querySelector('#delete')
    .addEventListener('click', deletePost);