import { useSnapshot } from 'valtio';
import state from '../../store';
import React from 'react';

interface CustomButtonProps{
  title: string;
  type?: 'filled'
  customStyles?: string;
  handleClick: ()=>void
}

export function CustomButton({ title, type, customStyles, handleClick }: CustomButtonProps) {
  const snap = useSnapshot(state)
  const generateStyle = type => {
    if (type === 'filled') {
      return {
        backgroundColor: snap.color,
        color: '#ffffff',
      };
    }
  };
  return (
    <button
      className={`px-2 py-1.5 flex-1 rounded-md ${customStyles}`}
      style={generateStyle(type)}
      onClick={handleClick}
    >
      {title}
    </button>
  );
}
