import React from 'react';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
  text?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'medium', 
  color = '#6366f1',
  text = 'Chargement...' 
}) => {
  const sizeMap = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  };

  const spinnerSize = sizeMap[size];

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="relative">
        <div className={`${spinnerSize} border-4 border-gray-200 rounded-full`}></div>
        <div 
          className={`${spinnerSize} border-4 border-t-transparent rounded-full absolute top-0 left-0 animate-spin`}
          style={{ borderTopColor: color, borderRightColor: color, borderLeftColor: 'transparent', borderBottomColor: 'transparent' }}
        ></div>
      </div>
      {text && <p className="mt-2 text-sm text-gray-600">{text}</p>}
    </div>
  );
};

export default LoadingSpinner; 