;(()=>{
    const socket = new WebSocket(`ws://${window.location.host}/ws`)
    const formEl = document.getElementById('form')
    const inpuEl = document.getElementById('input')
    

    formEl.addEventListener("submit",(e)=>{
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

})()