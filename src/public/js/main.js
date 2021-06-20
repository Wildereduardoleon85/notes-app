(Array.from(document.getElementsByClassName('button-alert'))).forEach( item => {
    item.addEventListener('click', (e)=>{
        (e.target.parentElement.parentElement).style.display = 'none'
    })
})

