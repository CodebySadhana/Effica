import React from 'react';

const characters = [
  { id: 'helloKitty', name: 'Hello Kitty', imgSrc: 'https://i.postimg.cc/tRtnxcmb/hello-kitty-png.png', color: '#FACED1' },
  { id: 'kuromi', name: 'Kuromi', imgSrc: 'https://i.postimg.cc/wxV3vm7T/kuromi-png.png', color: '#EDCEFA' },
  { id: 'myMelody', name: 'My Melody', imgSrc: 'https://i.postimg.cc/g26YvXkh/my-Melody-png.png', color: '#FACEDB' },
  { id: 'cinnamoroll', name: 'Cinnamoroll', imgSrc: 'https://i.postimg.cc/8P4vqYh4/cinnamoroll-png.png', color: '#CEE5FA' },
  { id: 'pompompurin', name: 'Pompompurin', imgSrc: 'https://i.postimg.cc/R0BzKgYr/pompompurin-png.png', color: '#F8F1B2' },
  { id: 'keroppi', name: 'Keroppi', imgSrc: 'https://i.postimg.cc/GmN4Rn9F/keroppi-png.png', color: '#D2FACE' },
  { id: 'chococat', name: 'Chococat', imgSrc: 'https://i.postimg.cc/qqXKBbWk/chococat-png.png', color: '#E8CAB9' },
];

const CharacterSelector = ({ selectedCharacterId, onSelect }) => {
  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: '15px',
      padding: '20px',
    }}>
      {characters.map((char) => {
        const isSelected = char.id === selectedCharacterId;
        return (
          <div
            key={char.id}
            onClick={() => onSelect(char.id)}
            style={{
              cursor: 'pointer',
              width: '90px',
              height: '110px',
              borderRadius: '15px',
              backgroundColor: isSelected ? char.color : '#f0f0f0',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: isSelected ? `0 0 15px ${char.color}` : 'none',
              transition: 'background-color 0.3s, box-shadow 0.3s',
              userSelect: 'none',
            }}
            title={char.name}
          >
            <img
              src={char.imgSrc}
              alt={char.name}
              style={{
                width: '70px',
                height: '70px',
                borderRadius: '12px',
                objectFit: 'cover',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}
            />
            <span style={{
              fontSize: '14px',
              marginTop: '8px',
              color: isSelected ? '#333' : '#666',
              fontWeight: isSelected ? '600' : '400'
            }}>
              {char.name}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default CharacterSelector;
