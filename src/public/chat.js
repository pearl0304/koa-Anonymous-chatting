;(()=>{
    const socket = new WebSocket(`ws://${window.location.host}/ws`)
    const formEl = document.getElementById('form')
    const inpuEl = document.getElementById('input')
    const messageEl = document.getElementById('message')


    if(!formEl || !inpuEl || !messageEl) throw new Error ('Init failed')
    
    const messages = []
    
    formEl.addEventListener('submit',e=>{
        e.preventDefault() // Prevent send the form
        socket.send(
            JSON.stringify(
                {
                    nickname : "늠름한 도베르만",
                    message : inpuEl.value
                }
            )
        )
        inpuEl.value=''
    })

    socket.addEventListener('message',(e)=>{
        messages.push(JSON.parse(e.data))

        messageEl.innerHTML=''
       
        messages.forEach(({message,nickname})=>{
            const li = document.createElement('li')
            li.textContent = `${nickname} : ${message}`
            messageEl.appendChild(li)
            window.scrollTo(0, document.body.scrollHeight)
        })
    })

})()