import React, { useState, useEffect, useRef } from 'react';

const Typewriter = ({ text }) => {
  const [displayText, setDisplayText] = useState('');
  const timeoutRef = useRef(null);

  useEffect(() => {
    let index = 0;

    const typeWriter = () => {
      if (index < text.length) {
        setDisplayText((prevText) => prevText + text.charAt(index));
        index++;
        timeoutRef.current = setTimeout(typeWriter, 10); // Adjust the speed by changing the timeout duration
      }
    };

    typeWriter();

    return () => {
      // Cleanup to prevent memory leaks
      clearTimeout(timeoutRef.current);
    };
  }, [text]);

  return <p style={{color:'white',lineHeight:'30px'}}>{displayText}</p>;
};

export default Typewriter;
