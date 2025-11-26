import React, { useState } from 'react';
import { Pencil } from 'lucide-react';

interface EditableProps {
  text: string;
  onSave: (val: string) => void;
  isEditing: boolean;
  type?: 'input' | 'textarea';
  className?: string;
  placeholder?: string;
}

export const Editable: React.FC<EditableProps> = ({ 
  text, 
  onSave, 
  isEditing, 
  type = 'input', 
  className = '',
  placeholder = 'Edit text...'
}) => {
  const [val, setVal] = useState(text);

  if (!isEditing) {
    return <span className={className} dangerouslySetInnerHTML={{ __html: text }} />;
  }

  return (
    <div className="relative group inline-block w-full">
      {type === 'textarea' ? (
        <textarea
          value={val}
          onChange={(e) => {
            setVal(e.target.value);
            onSave(e.target.value);
          }}
          className={`w-full bg-black/20 border border-f-pink/50 rounded p-2 text-f-white outline-none focus:border-f-orange transition-colors ${className}`}
          placeholder={placeholder}
          rows={4}
        />
      ) : (
        <input
          type="text"
          value={val}
          onChange={(e) => {
            setVal(e.target.value);
            onSave(e.target.value);
          }}
          className={`w-full bg-black/20 border border-f-pink/50 rounded px-2 py-1 text-f-white outline-none focus:border-f-orange transition-colors ${className}`}
          placeholder={placeholder}
        />
      )}
      <Pencil size={12} className="absolute -top-2 -right-2 text-f-orange opacity-50" />
    </div>
  );
};