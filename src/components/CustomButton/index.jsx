/* eslint-disable react/prop-types */

import { useSnapshot } from 'valtio';
import state from '../../store';

export function CustomButton({ title, type, customStyles, handleClick }) {
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
