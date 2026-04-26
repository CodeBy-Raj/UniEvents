import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';

const PrimaryButton = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  className = '',
  textClassName = '',
  ...props
}) => {
  // Define variant styles
  const variantStyles = {
    primary: 'bg-buttonPrimary border-buttonPrimary',
    secondary: 'bg-buttonSecondary border-buttonSecondary',
    outline: 'bg-transparent border-2 border-buttonPrimary',
    danger: 'bg-error border-error',
    success: 'bg-success border-success',
    warning: 'bg-warning border-warning',
  };

  // Define size styles
  const sizeStyles = {
    small: 'px-4 py-2',
    medium: 'px-6 py-3',
    large: 'px-8 py-4',
  };

  // Define text styles for variants
  const textVariantStyles = {
    primary: 'text-textOnAccent',
    secondary: 'text-textOnAccent',
    outline: 'text-buttonPrimary',
    danger: 'text-white',
    success: 'text-white',
    warning: 'text-white',
  };

  // Define text sizes
  const textSizeStyles = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg',
  };

  const baseStyles = `
    rounded-button 
    items-center 
    justify-center 
    border 
    ${sizeStyles[size]}
    ${variantStyles[variant]}
    ${disabled || loading ? 'opacity-50' : 'active:opacity-80'}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  const textStyles = `
    font-bold 
    ${textSizeStyles[size]}
    ${textVariantStyles[variant]}
    ${textClassName}
  `.trim().replace(/\s+/g, ' ');

  return (
    <TouchableOpacity
      className={baseStyles}
      onPress={onPress}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <ActivityIndicator 
          size="small" 
          color={variant === 'outline' ? '#f9eed0' : '#000000'} 
        />
      ) : (
        <Text className={textStyles}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default PrimaryButton;
