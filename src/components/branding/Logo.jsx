import React from 'react';
import logoImage from '../../assets/logo-rm-designs.png'; // Asegúrate que el nombre coincida exactamente

export default function Logo({ size = 'default', className = '', animated = false }) {
  const sizeClasses = {
    small: 'h-14',
    default: 'h-20',
    large: 'h-24',
    hero: 'h-28 md:h-36',
    landing: 'h-48 md:h-64 lg:h-72',
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