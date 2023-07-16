import React from 'react';
import { CustomButton } from '../CustomButton';

interface AIPickerProps {
  prompt: string;
  setPrompt: React.Dispatch<React.SetStateAction<string>>;
  generatingImg: boolean;
  handleSubmit: (type: string) => Promise<void>;
}

export function AIPicker({
  generatingImg,
  handleSubmit,
  prompt,
  setPrompt,
}: AIPickerProps) {
  return (
    <div className="aipicker-container resize-none">
      <textarea
        className="aipicker-textarea"
        value={prompt}
        onChange={e => setPrompt(e.target.value)}
        rows={5}
        placeholder="Ask AI"
      />
      <div className="flex flex-wrap gap-3">
        {generatingImg ? (
          <CustomButton
            type="outline"
            title="Asking AI..."
            customStyles="text-xs"
            handleClick={() => {}}
          />
        ) : (
          <>
            <CustomButton
              type="outline"
              title="AI Logo"
              customStyles="text-xs"
              handleClick={()=>handleSubmit('logo')}
            />
            <CustomButton
              type="filled"
              title="AI Full"
              customStyles="text-xs"
              handleClick={()=>handleSubmit('full')}
            />
          </>
        )}
      </div>
    </div>
  );
}
