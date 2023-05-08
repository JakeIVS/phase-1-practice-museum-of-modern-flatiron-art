// console.log('Write your code here');
function initialize() {
    fetch ('http://localhost:3000/current-exhibits')
    .then(r=>r.json())
    .then(info=>info.forEach((exhibit)=>{
        let titleField = document.querySelector('#exhibit-title');
        titleField.textContent = `${exhibit.title} by ${exhibit.artist_name}`;
        let descriptionField = document.querySelector('#exhibit-description');
        descriptionField.textContent = exhibit.description;
        let commentField = document.querySelector('#comments-section');
        exhibit.comments.forEach((comment)=>{
            let p = document.createElement('p')
            p.textContent = comment;
            commentField.appendChild(p);
        })
        let commentBox = document.querySelector('#comment-form');
        commentBox.addEventListener('submit', (e)=>{
            e.preventDefault();
            let p = document.createElement('p');
            p.textContent = commentBox.querySelector('[name="comment-input"]').value
            debugger
            commentField.appendChild(p);
            commentBox.reset();
        })
        let imageField = document.querySelector('#exhibit-image');
        imageField.src = exhibit.image;
    })
)}
initialize()