async function updatePost() {
    console.log('Click worked!!!');
    // const title = document.querySelector('#title').value;
    // const postText = document.querySelector('#postContent').value;

    // const response = await fetch(`/api/create/:id`, {
    //     method: 'PUT',
    //     body: JSON.stringify({
    //         title,
    //         postText,
    //     }),
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    // });

    // if (response.ok) {
    //     document.location.replace('/');
    // } else {
    //     alert('Failed to add post.');
    // }
};

document
    .querySelector('#update')
    .addEventListener('click', updatePost);

console.log(document.querySelector('#update'));