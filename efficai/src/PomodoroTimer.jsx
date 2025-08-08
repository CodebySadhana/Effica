import React, { useState, useEffect, useRef } from 'react';

const PomodoroTimer = ({ themeColor, character }) => {
  // Customizable durations (minutes)
  const [workMinutes, setWorkMinutes] = useState(25);
  const [shortBreakMinutes, setShortBreakMinutes] = useState(5);
  const [longBreakMinutes, setLongBreakMinutes] = useState(15);

  // Timer state (seconds)
  const [secondsLeft, setSecondsLeft] = useState(workMinutes * 60);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState('work'); // work, shortBreak, longBreak

  const timer = useRef(null);
  const audio = useRef(null);

  // Load sound once on mount
  useEffect(() => {
    audio.current = new Audio('princess.mp3'); // your custom sound
  }, []);

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Total seconds for current mode
  const totalSeconds = () => {
    if (mode === 'work') return workMinutes * 60;
    if (mode === 'shortBreak') return shortBreakMinutes * 60;
    if (mode === 'longBreak') return longBreakMinutes * 60;
    return 0;
  };

  // Update secondsLeft when mode or durations change
  useEffect(() => {
    setSecondsLeft(totalSeconds());
  }, [mode, workMinutes, shortBreakMinutes, longBreakMinutes]);

  // Timer countdown effect
  useEffect(() => {
    if (isActive && secondsLeft > 0) {
      timer.current = setTimeout(() => {
        setSecondsLeft(secondsLeft - 1);
      }, 1000);
    } else if (secondsLeft === 0 && isActive) {
      setIsActive(false);
      if (audio.current) audio.current.play();
      alert(`Time's up for ${
        mode === 'work' ? 'Work' :
        mode === 'shortBreak' ? 'Short Break' : 'Long Break'
      }!`);
    }
    return () => clearTimeout(timer.current);
  }, [isActive, secondsLeft, mode]);

  // Calculate progress percent for progress bar
  const progressPercent = ((totalSeconds() - secondsLeft) / totalSeconds()) * 100;

  // Handlers
  const startTimer = () => { if (!isActive) setIsActive(true); };
  const pauseTimer = () => { if (isActive) setIsActive(false); };
  const resetTimer = () => {
    setIsActive(false);
    setSecondsLeft(totalSeconds());
  };
  const switchMode = (newMode) => {
    setMode(newMode);
    setIsActive(false);
  };

  // Input handlers for durations
  const handleWorkChange = (e) => {
    const val = Number(e.target.value);
    if (val > 0) setWorkMinutes(val);
  };
  const handleShortBreakChange = (e) => {
    const val = Number(e.target.value);
    if (val > 0) setShortBreakMinutes(val);
  };
  const handleLongBreakChange = (e) => {
    const val = Number(e.target.value);
    if (val > 0) setLongBreakMinutes(val);
  };

  // Helper for button background (active/inactive)
  const buttonBgColor = (active) => (active ? themeColor : `${themeColor}80`); // 50% opacity when inactive

  return (
    <div style={{
      textAlign: 'center',
      fontFamily: 'Arial, sans-serif',
      maxWidth: 380,
      margin: '40px auto',
      padding: '20px',
      borderRadius: 15,
      backgroundColor: '#f9fafb',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{ marginBottom: '1rem' }}>Pomodoro Timer</h2>

      {/* Timer Buddy Character Display */}
      {character && (
        <div style={{ marginBottom: 20 }}>
          <img 
            src={character.imgSrc}
            alt={character.name}
            style={{
              width: 100,
              height: 100,
              borderRadius: 20,
              objectFit: 'contain',
              boxShadow: `0 4px 12px ${themeColor}`,
              marginBottom: 8,
            }}
          />
          <div style={{ fontWeight: '600', fontSize: '1.1rem' }}>{character.name}</div>
          <div style={{ fontStyle: 'italic', color: '#555', fontSize: '0.9rem' }}>
            Your Timer Buddy
          </div>
        </div>
      )}

      {/* Duration inputs */}
      <div style={{ marginBottom: 20 }}>
        <label style={{ marginRight: 15 }}>
          Work (min):{' '}
          <input
            type="number"
            min="1"
            value={workMinutes}
            onChange={handleWorkChange}
            disabled={isActive}
            style={{ width: 60, textAlign: 'center', padding: 5, borderRadius: 5, border: '1px solid #ccc' }}
          />
        </label>
        <label style={{ marginRight: 15 }}>
          Short Break (min):{' '}
          <input
            type="number"
            min="1"
            value={shortBreakMinutes}
            onChange={handleShortBreakChange}
            disabled={isActive}
            style={{ width: 60, textAlign: 'center', padding: 5, borderRadius: 5, border: '1px solid #ccc' }}
          />
        </label>
        <label>
          Long Break (min):{' '}
          <input
            type="number"
            min="1"
            value={longBreakMinutes}
            onChange={handleLongBreakChange}
            disabled={isActive}
            style={{ width: 60, textAlign: 'center', padding: 5, borderRadius: 5, border: '1px solid #ccc' }}
          />
        </label>
      </div>

      {/* Enhanced Mode buttons */}
      <div style={{ marginBottom: 15, display: 'flex', justifyContent: 'center', gap: 12 }}>
        {['work', 'shortBreak', 'longBreak'].map((m) => {
          const modeName = m === 'work' ? 'Work' : m === 'shortBreak' ? 'Short Break' : 'Long Break';
          const isActive = mode === m;

          return (
            <button
              key={m}
              onClick={() => switchMode(m)}
              disabled={isActive}
              style={{
                padding: '12px 24px',
                borderRadius: 12,
                border: 'none',
                backgroundColor: isActive ? themeColor : `${themeColor}80`, // Active vs Inactive color
                color: '#fff',
                cursor: isActive ? 'default' : 'pointer',
                fontWeight: '700',
                fontSize: '1rem',
                boxShadow: isActive ? `0 4px 12px ${themeColor}` : 'none',
                transition: 'all 0.25s ease-in-out',
                transform: isActive ? 'scale(1.05)' : 'scale(1)',
                userSelect: 'none',
              }}
              onMouseEnter={(e) => {
                if (!isActive) e.currentTarget.style.boxShadow = `0 2px 8px ${themeColor}AA`;
                if (!isActive) e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                if (!isActive) e.currentTarget.style.boxShadow = 'none';
                if (!isActive) e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              {modeName}
            </button>
          );
        })}
      </div>

      {/* Timer display */}
      <div style={{
        fontSize: '64px',
        fontWeight: 'bold',
        marginBottom: 20,
        letterSpacing: '2px',
        fontFamily: "'Courier New', Courier, monospace"
      }}>
        {formatTime(secondsLeft)}
      </div>

      {/* Progress bar */}
      <div style={{
        height: '20px',
        width: '100%',
        backgroundColor: '#e5e7eb',
        borderRadius: '10px',
        overflow: 'hidden',
        marginBottom: 25,
        boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)'
      }}>
        <div style={{
          height: '100%',
          width: `${progressPercent}%`,
          backgroundColor: themeColor,
          transition: 'width 1s linear'
        }} />
      </div>

      {/* Control buttons */}
      <div>
        {!isActive ? (
          <button
            onClick={startTimer}
            style={{
              margin: '0 10px',
              padding: '10px 20px',
              borderRadius: 8,
              border: 'none',
              backgroundColor: themeColor,
              color: 'white',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'background-color 0.3s'
            }}
          >
            Start
          </button>
        ) : (
          <button
            onClick={pauseTimer}
            style={{
              margin: '0 10px',
              padding: '10px 20px',
              borderRadius: 8,
              border: 'none',
              backgroundColor: themeColor,
              color: 'white',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'background-color 0.3s'
            }}
          >
            Pause
          </button>
        )}
        <button
          onClick={resetTimer}
          style={{
            margin: '0 10px',
            padding: '10px 20px',
            borderRadius: 8,
            border: 'none',
            backgroundColor: '#6b7280', // neutral gray for reset
            color: 'white',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'background-color 0.3s'
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default PomodoroTimer;
