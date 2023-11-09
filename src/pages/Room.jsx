import React, {useState, useEffect} from 'react'
import { COLLECTION_ID_MESSAGES, DATABASE_ID, databases } from '../appwriteConfig'
import {ID, Query} from 'appwrite';
import {Trash2} from 'react-feather';

export default function Room() {
    
    const [messages, setMessages] = useState([])
    const [messageBody, setMessageBody] = useState('');
    
    
    useEffect(()=>{
        getMessages()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();

        let payload = {
            body:messageBody
        }
        let response = await databases.createDocument(
            DATABASE_ID,
            COLLECTION_ID_MESSAGES,
            ID.unique(),
            payload,
        )
        setMessages(prevState => [response, ...messages])
        setMessageBody('');
        console.log("Created!", response);
    }

    const getMessages = async () => {
        const response  = await databases.listDocuments(
            DATABASE_ID, 
            COLLECTION_ID_MESSAGES,
            [
                Query.orderDesc('$createdAt'),
                Query.limit(5)
            ] 
        );
        console.log(`RESPONSE:`, response);
        setMessages(response.documents);
    }

    // delete message function
    const deleteMessage = async (message_id) => {
        databases.deleteDocument(DATABASE_ID, COLLECTION_ID_MESSAGES, message_id);
        setMessages(prevState => messages.filter(message => message.$id !== message_id))
    }
  return (

    //  FRONT-END INTERFACE 

    <main className='container'>
        <h1 className='header--link'>Hello World.... This is a Test Page</h1>    
        <div className="room--container">
        <form onSubmit={handleSubmit} id='message--form' >
            <div>
                <textarea 
                required 
                maxLength={"1000"} 
                placeholder='Say something...' 
                onChange={(e)=> {setMessageBody(e.target.value)}}
                value={messageBody}
                >
                </textarea>
            </div>

            <div className='send-btn--wrapper'>
                <input className='btn btn--secondary' type="submit" value="Send" id="" />
            </div>
        </form>
      <div>
        {messages.map(message => (
            <div key={message.$id} className='message--wrapper'>
                <div className='message--header'>
                    <small className='message-timestamp'>{new Date(message.$createdAt).toLocaleString()}</small>
                    <Trash2
                    className='delete--btn' 
                    onClick={() => {deleteMessage(message.$id)}}
                    />
                    {/* <button onClick={() => {deleteMessage(message.$id)}}>X</button> */}
                </div>

                <div className='message--body'>
                    <span>{message.body}</span>
                </div>
            </div>
        ))}
      </div>
      </div>
    </main>
  )
}
