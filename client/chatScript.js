let input = document.getElementById('input')
let button = document.getElementById('button')
let closeButton = document.getElementById('close')
let openChat = document.getElementById('chatClosed')

let overflowContainer = document.getElementsByClassName('overflowContainer')[0]
let main = document.getElementsByClassName('mainChat')[0]
let messages = document.getElementsByClassName('messagesDiv')[0]


const IP = 'ws://172.16.45.83:8881' 
let web = false
let sound = new Audio()
sound.src = 'message.mp3'

const createMessageElements = () => 
{
        let wrapperDiv = document.createElement('div')
        let messageDiv = document.createElement('div')
        let time = document.createElement('p')
        let elements = [wrapperDiv,messageDiv,time]

        return elements
}

const sendMessage = (event)=>
{
    
    let message = input.value
    web.send(JSON.stringify({message:message}))
    if (input.value !== "")
    {
        let wrapperDiv = createMessageElements()[0]
        let messageDiv = createMessageElements()[1]
        let time = createMessageElements()[2]

        wrapperDiv.setAttribute('class','wrapperDiv')
        messageDiv.setAttribute('class','message')
        time.setAttribute('class','time')

        messageDiv.innerText = message
        timeFormat = new Date().toString().split(" ")[4]
        time.innerText = timeFormat.substring(0,5)

        wrapperDiv.style.opacity = '0'
        wrapperDiv.appendChild(time)
        wrapperDiv.appendChild(messageDiv)
        messages.appendChild(wrapperDiv)
        input.value = ""
        sound.play()
        
        setTimeout(()=>{
            wrapperDiv.style.opacity = '1'
        },100)
       
    }
}

button.addEventListener('click',sendMessage)
document.addEventListener('keypress',(e)=>
{
    if (e.key === 'Enter' && input.value!=='')
    {
        sendMessage(e)
    } 
})

closeButton.addEventListener('click',(e)=>{
    main.style.maxHeight = '0px'
  
    setTimeout(()=>{
        main.style.display = 'none';
        openChat.style.display = 'flex';
    },800)
})
     
openChat.addEventListener('click',(e)=>{
    main.style.display = 'flex';
    openChat.style.display = 'none';
    if (!web)
    {
        web = new WebSocket(IP)
        web.onmessage = e =>
            {
                let wrapperDiv = createMessageElements()[0]
                let messageDiv = createMessageElements()[1]
                let time = createMessageElements()[2]

                wrapperDiv.setAttribute('class','wrapperDivServer')
                messageDiv.setAttribute('class','messageServer')
                time.setAttribute('class','timeServer')

                timeFormat = new Date().toString().split(" ")[4]
                time.innerText = timeFormat.substring(0,5)

                messageDiv.innerText = e.data

                wrapperDiv.style.opacity = '0'
                wrapperDiv.appendChild(time)
                wrapperDiv.appendChild(messageDiv)
                messages.appendChild(wrapperDiv)
                sound.play()

                setTimeout(()=>{
                 wrapperDiv.style.opacity = '1'
                    },100)
            }
            web.onclose = e=>
            {
                window.location.reload()
            }
    }
    
    setTimeout(()=>{
        main.style.maxHeight = '800px'
    },2)
})
        

        