import React, { useState } from 'react';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';

const Chatbot = ({
  apiKey,
  systemPrompt = "Be polite and make sure you service the user well, keep sentences short and to the point.",
  containerStyle = {},
  inputStyle = {},
  sendStyle = {},
  messageBoxStyle = {},
  userStyle = {},
  botStyle = {},
}) => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');

  const API_KEY = apiKey; // Replace with your Google API Key
  const MODEL_NAME = 'gemini-pro';
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });
  const generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 2048,
  };

  const safetySettings = [
    { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
  ];


  const chat = model.startChat({
    generationConfig,
    safetySettings,
    history: [
      { role: 'user', parts: [`This is how you should answer me: ${systemPrompt}`] },
      { role: 'model', parts: ["All the Above Conditions are accepted. I will try to serve you."] },
    ],
  });

  const getResponse = async (userQuestion) => {
    const result = await chat.sendMessage(userQuestion);
    const response = result.response;
    return response.text();
  };

  const handleUserInput = async () => {
    if (userInput.trim() === '') return;

    const userMessage = { role: 'user', parts: [{ text: userInput }] };
    const newMessages = [...messages, userMessage];
    const botResponse = await getResponse(userInput);
    const botMessage = { role: 'bot', parts: [{ text: botResponse }] };
    newMessages.push(botMessage);

    setMessages(newMessages);
    setUserInput('');
  };

  return (
    <div className="chatbot-container" style={containerStyle}>
      <div className="chatbot-messages" style={messageBoxStyle}>
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.role === 'user' ? 'user' : 'bot'}`}
            style={message.role === 'user' ? userStyle : botStyle}
          >
            {message.parts.map((part, partIndex) => (
              <span key={partIndex}>{part.text}</span>
            ))}
          </div>
        ))}
      </div>
      <div className="chatbot-input">
        <input
          type="text"
          placeholder="Ask me something..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          style={inputStyle}
        />
        <button onClick={handleUserInput} style={sendStyle}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
