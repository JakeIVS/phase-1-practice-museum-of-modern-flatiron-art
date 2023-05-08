// console.log('Write your code here');
function initialize() {
    fetch ('http://localhost:3000/current-exhibits')
    .then(r=>r.json())
    .then(info=>info.forEach((exhibit)=>{
        let titleField = document.querySelector('#exhibit-title');
        titleField.textContent = `${exhibit.title} by ${exhibit.artist_name}`;
        let ticketsBought = document.querySelector('#tickets-bought');
        ticketsBought.innerHTML = `${exhibit.tickets_bought} Tickets Bought`;
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
            newComment = commentBox.querySelector('[name="comment-input"]').value
            p.textContent = newComment;
            commentField.appendChild(p);
            newCommentsArray = [...exhibit.comments, newComment];
            debugger
            fetch (`http://localhost:3000/current-exhibits/${exhibit.id}`,{
                method: 'PATCH',
                headers:{
                    'content-type': 'application/json',
                },
                body: JSON.stringify({comments: newCommentsArray})
            })
            commentBox.reset();
        })
        let imageField = document.querySelector('#exhibit-image');
        imageField.src = exhibit.image;
        let ticketButton = document.querySelector('#buy-tickets-button')
        ticketButton.addEventListener('click',(event)=>{
            event.preventDefault();
            let newTicketCount = parseInt(exhibit.tickets_bought) + 1;
            debugger
            ticketsBought.textContent=`${newTicketCount} Tickets Bought`
            fetch(`http://localhost:3000/current-exhibits/${exhibit.id}`,{
                method: 'PATCH',
                headers:{
                    'content-type': 'application/json',
                    "Accept": 'application/json',
                },
                body: JSON.stringify({'tickets_bought': newTicketCount})
            })
        })
    })
)}
initialize()