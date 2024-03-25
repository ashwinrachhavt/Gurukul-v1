'use client';

import { useChat } from 'ai/react';
import axios from 'axios';
import { useUser } from "@clerk/nextjs";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function Chat({ userId }) {
  
  // const fetcher = (messages) => {
  //   return axios.post('/app/api/chat', { messages});
  // };
  
  //const { messages, input, handleInputChange, handleSubmit } = useChat(fetcher);
  
  const { input, handleInputChange, handleSubmit, messages } = useChat({
    api: "/api/chat",
    body: {
      userId,
    },
    initialMessages: [],
  });
 
  return (
    <div className="overflow-x-hidden" style={{
      width: '100%', 
      backgroundColor: '#2D3748', 
      padding: '24px', 
      borderRadius: '8px', 
      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 10%)', 
      marginBottom: '24px'
    }}>
      <div style={{
        overflowY: 'auto', 
        overflowX: 'hidden', 
        maxHeight: '256px',
        marginBottom: '16px',
        whiteSpace: 'pre-wrap', // Allows markdown to control formatting
      }}>
        {messages.map(m => (
          <div 
            key={m.id} 
            style={{
              marginBottom: '8px', 
              padding: '8px', 
              borderRadius: '8px', 
              backgroundColor: m.role === 'user' ? '#2B6CC0' : '#9F7AEA', // AI messages are now purple
              color: 'white',
              overflowWrap: 'break-word',
            }}
          >
            <span style={{ fontWeight: 'bold' }}>{m.role}:</span>
            <ReactMarkdown remarkPlugins={[remarkGfm]} children={m.content} />
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} style={{ marginTop: '16px' }}>
        <input 
          value={input} 
          placeholder="Say something..."
          onChange={handleInputChange}
          style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', color: 'black' }}
        />
        <button 
          type="submit"
          style={{ marginTop: '8px', padding: '8px 16px', borderRadius: '8px', backgroundColor: '#9F7AEA', color: 'white' }}
        >
          Send
        </button>
      </form>
    </div>
  );
}