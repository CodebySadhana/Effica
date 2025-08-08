import React, { useState } from 'react';
import CharacterSelector from './CharacterSelector';
import PomodoroTimer from './PomodoroTimer';

const characters = [
  { id: 'helloKitty', name: 'Hello Kitty', imgSrc: 'https://i.postimg.cc/tRtnxcmb/hello-kitty-png.png', color: '#FACED1' },
  { id: 'kuromi', name: 'Kuromi', imgSrc: 'https://i.postimg.cc/wxV3vm7T/kuromi-png.png', color: '#EDCEFA' },
  { id: 'myMelody', name: 'My Melody', imgSrc: 'https://i.postimg.cc/g26YvXkh/my-Melody-png.png', color: '#FACEDB' },
  { id: 'cinnamoroll', name: 'Cinnamoroll', imgSrc: 'https://i.postimg.cc/8P4vqYh4/cinnamoroll-png.png', color: '#CEE5FA' },
  { id: 'pompompurin', name: 'Pompompurin', imgSrc: 'https://i.postimg.cc/R0BzKgYr/pompompurin-png.png', color: '#F8F1B2' },
  { id: 'keroppi', name: 'Keroppi', imgSrc: 'https://i.postimg.cc/GmN4Rn9F/keroppi-png.png', color: '#D2FACE' },
  { id: 'chococat', name: 'Chococat', imgSrc: 'https://i.postimg.cc/qqXKBbWk/chococat-png.png', color: '#E8CAB9' },
];

const characterThemes = {
  helloKitty: '#FACED1',
  kuromi: '#EDCEFA',
  myMelody: '#FACEDB',
  cinnamoroll: '#CEE5FA',
  pompompurin: '#F8F1B2',
  keroppi: '#D2FACE',
  chococat: '#E8CAB9',
};

function App() {
  const [selectedCharacterId, setSelectedCharacter] = useState('helloKitty');

  // Find the selected character object for props
  const currentCharacter = characters.find(c => c.id === selectedCharacterId);

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: characterThemes[selectedCharacterId],
      transition: 'background-color 0.5s ease',
      padding: '20px'
    }}>
      <h1 style={{ textAlign: 'center', fontFamily: 'Lora, The Seasons' }}>
        EFFICA - Your Pomodoro Sanrio 
      </h1>
      
      <CharacterSelector
        selectedCharacterId={selectedCharacterId}
        onSelect={setSelectedCharacter}
      />

      <PomodoroTimer
        themeColor={characterThemes[selectedCharacterId]}
        character={currentCharacter}
      />
    </div>
  );
}

export default App;


