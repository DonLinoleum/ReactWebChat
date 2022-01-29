import React,{useState,useEffect, useMemo} from 'react'
import {useHttp} from './hooks/useHttp'
import Header from './Header'
import AnswerInput from './ui/AnswerInput'
import Messages from './Messages'
import Contacts from './Contacts'
import {context} from './context/context'
import useSound from 'use-sound'
import sound from './sound/sound.mp3'
import './styles/styles.css'

function App() {
  
  const [audio] = useSound(sound,{volume:0.5})
  const [dataFromServer,setData] = useState([])
  
  const [Id,setId] = useState('0')
  const [Answer,setAnswer] = useState('')
  const request = useHttp()

  const sendAnswer = async ()=>
  {
    const data = await request('http://localhost:8882/api/messages','POST',JSON.stringify({id:Id,answer:Answer}),
    {
      'Content-Type':'application/json'
    })
  
    if (data)
    {
      setAnswer('')
    }
  }

  const clearMessages = async () => {
    await request ('http://localhost:8882/api/clear','DELETE')
  }
  
  useEffect(()=>{
    const getData = async () => 
    {
      const data = await request('http://localhost:8882/api/messages','GET',null)
      setData(data)
    }
    getData() 
  },[request,dataFromServer])


  let lengthMessages = dataFromServer.messagesFromServer ? 
  dataFromServer.messagesFromServer.length : 0
  
  useMemo(()=>{
    console.log(lengthMessages)
    audio()
  },[lengthMessages,audio])
  
  return (
    <context.Provider value={{
      id : Id,
      set_id: setId,
      answer : Answer,
      set_answer : setAnswer,
      clear : clearMessages,
      send : sendAnswer,
    }}>
    
    <div className="App">
      <div className='main'>
        <Header/>
        <div className='middle'>
        <Contacts contacts={dataFromServer.userId}/>
        <Messages messages={dataFromServer.messagesFromServer} Id={Id}/>   
        </div>
        <AnswerInput/>   
      </div> 
    </div>
    </context.Provider>
  );
}

export default App;
