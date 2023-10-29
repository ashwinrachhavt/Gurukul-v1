'use client';

import { useChat } from 'ai/react';
import axios from 'axios';

export default function Chat() {

  const fetcher = (messages) => {
    return axios.post('/app/api/chat', { messages });
  };

  const { messages, input, handleInputChange, handleSubmit } = useChat(fetcher);

  return (
    <div style={{ width: '100%', backgroundColor: '#2D3748', padding: '24px', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 10%)', marginBottom: '24px' }}>
      <div style={{ overflowY: 'auto', overflowX: 'hidden', height: '256px', marginBottom: '16px' }}>
        {messages.map(m => (
          <div 
            key={m.id} 
            style={{
                marginBottom: '8px', 
                padding: '8px', 
                borderRadius: '8px', 
                backgroundColor: m.role === 'user' ? '#2B6CB0' : '#48BB78',
                // Add these properties to wrap the text
                whiteSpace: 'pre-wrap', 
                overflowWrap: 'break-word',
                wordBreak: 'break-word'
            }}
          >
            <span style={{ fontWeight: 'bold', color: 'white' }}>{m.role}:</span> 
            <span style={{ color: 'white' }}>{m.content}</span>
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
