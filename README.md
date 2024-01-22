# Unstyled Gemini Chatbot

A simple and unstyled React chatbot component using Google Generative AI.

## Installation

```bash
npm install @sujalchoudhari/unstyled-gemini-chatbot
```

## Usage

```jsx
import React from 'react';
import Chatbot from '@sujalchoudhari/unstyled-gemini-chatbot';

const App = () => {
  return (
    <div>
      <h1>Your React App</h1>
      <Chatbot apiKey={'YOUR_KEY_GOES_HERE'} />
    </div>
  );
};

export default App;
```

## Configuration

The chatbot component allows you to customize its appearance using various styles. Here are the available style props:

- `containerStyle`: Styles for the main chatbot container.
- `inputStyle`: Styles for the user input text field.
- `sendStyle`: Styles for the send button.
- `messageBoxStyle`: Styles for the message box containing chat messages.
- `userStyle`: Styles for user messages.
- `botStyle`: Styles for bot messages.

```jsx
<Chatbot
  apiKey={'YOUR_KEY_GOES_HERE'}
  containerStyle={{ /* Your styles here */ }}
  inputStyle={{ /* Your styles here */ }}
  sendStyle={{ /* Your styles here */ }}
  messageBoxStyle={{ /* Your styles here */ }}
  userStyle={{ /* Your styles here */ }}
  botStyle={{ /* Your styles here */ }}
/>
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
