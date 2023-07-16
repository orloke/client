import React from 'react';

interface AIPickerProps {
  prompt: string;
  setPrompt: React.Dispatch<React.SetStateAction<string>>;
  generatingImg: boolean;
  handleSubmit: (type: string) => Promise<void>
}

export function AIPicker({
  generatingImg,
  handleSubmit,
  prompt,
  setPrompt,
}: AIPickerProps) {
  return <div className="">AIPicker</div>;
}
