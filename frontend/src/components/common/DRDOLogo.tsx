import React from 'react';

interface DRDOLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const DRDOLogo: React.FC<DRDOLogoProps> = ({ className = '', size = 'md' }) => {
  const sizeMap = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  const dimensionClass = className.includes('w-') || className.includes('h-') ? className : `${sizeMap[size]} ${className}`;

  return (
    <img
      src="/drdo-logo.svg"
      alt="DRDO Logo - Defence Research & Development Organisation"
      className={`object-contain rounded-full shadow-sm ${dimensionClass}`}
      referrerPolicy="no-referrer"
    />
  );
};
