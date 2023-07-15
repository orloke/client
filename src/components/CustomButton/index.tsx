import { useSnapshot } from 'valtio';
import state from '../../store';
import React from 'react';
import { getContrastingColor } from 'react-color/lib/helpers/color';

interface CustomButtonProps{
  title: string;
  type?: 'filled' | 'outline';
  customStyles?: string;
  handleClick: ()=>void
}

export function CustomButton({ title, type, customStyles, handleClick }: CustomButtonProps) {
  const snap = useSnapshot(state)
  const generateStyle = type => {
    if (type === 'filled') {
      return {
        backgroundColor: snap.color,
        color: getContrastingColor(snap.color),
      };
    } else if (type === 'outline') {
      return {
        borderWidth: '1px',
        borderColor: snap.color,
        color: snap.color
      }
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
