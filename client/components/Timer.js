import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';

export default function Timer({deadline, style}) {
  const [timeDiff, setTimeDiff] = useState(deadline-new Date(Date.now()));
  const [time, setTime] = useState('');

  useEffect(()=>{
    let timer = setTimeout(()=>setTime(updateTime(timeDiff)), 1000);

    return ()=>{
      clearTimeout(timer);
    }
  },[timeDiff]);

  function updateTime (diff) {
    setTimeDiff(timeDiff-1000);
    if (diff > 0) {
      const days=Math.floor(diff / (1000 * 60 * 60 * 24));
      if (days>0) {
        if (days===1) {
          return `${days} day`;
        }
        return `${days} days`;
      }
      const hours=Math.floor((diff / (1000 * 60 * 60)) % 24);
      if (hours>0) {
        if (hours===1) {
          return `${hours} hour`;
        }
        return `${hours} hours`;
      }
      const minutes=Math.floor((diff / 1000 / 60) % 60);
      if (minutes>0) {
        if (minutes===1) {
          return `${minutes} minute`;
        }
        return `${minutes} minutes`;
      }
      const seconds=Math.floor((diff / 1000) % 60);
      if (seconds>0) {
        if (seconds===1) {
          return `${seconds} second`;
        }
        return `${seconds} seconds`;
      }
    } else {
      return 'finished';
    }
  }
  return (
    <Text style={style}>
      {time}
    </Text>
  );
}