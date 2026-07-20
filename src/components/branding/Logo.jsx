import React from 'react';
import logoImage from '../../assets/logo-rm-designs.png'; // Asegúrate que el nombre coincida exactamente

export default function Logo({ size = 'default', className = '', animated = false }) {
  const sizeClasses = {
    small: 'h-24',
    default: 'h-36',
    large: 'h-44',
    hero: 'h-32 md:h-40',
    landing: 'h-80 md:h-[420px] lg:h-[500px]',
  };

  return (
    <div className={`flex items-center ${className}`}>
      <img 
        src={logoImage} 
        alt="RM Designs by Renata Real" 
        className={`${sizeClasses[size] || sizeClasses.default} w-auto object-contain transition-all duration-300 ${animated ? 'hover:scale-105' : ''}`}
        style={{
          filter: 'drop-shadow(0 0 15px rgba(229, 201, 141, 0.4))'
        }}
      />
    </div>
  );
}