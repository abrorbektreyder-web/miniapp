import { useEffect, useCallback } from 'react';
import { useTelegram } from '@hooks/useTelegram';

interface MainButtonProps {
  text: string;
  onClick: () => void;
  isVisible?: boolean;
  isActive?: boolean;
  color?: string;
  textColor?: string;
  showProgress?: boolean;
  disabled?: boolean;
}

export default function MainButton({
  text,
  onClick,
  isVisible = true,
  isActive = true,
  color,
  textColor,
  showProgress = false,
  disabled = false,
}: MainButtonProps) {
  const { webApp, hapticImpact } = useTelegram();

  const handleClick = useCallback(() => {
    if (disabled) return;
    
    hapticImpact('medium');
    onClick();
  }, [onClick, disabled, hapticImpact]);

  useEffect(() => {
    if (!webApp) return;

    const mainButton = webApp.MainButton;

    // Set text
    mainButton.setText(text);

    // Set colors
    if (color) mainButton.color = color;
    if (textColor) mainButton.textColor = textColor;

    // Set click handler
    mainButton.offClick(handleClick);
    mainButton.onClick(handleClick);

    // Show/hide
    if (isVisible) {
      mainButton.show();
    } else {
      mainButton.hide();
    }

    // Enable/disable
    if (isActive && !disabled) {
      mainButton.enable();
    } else {
      mainButton.disable();
    }

    // Progress
    if (showProgress) {
      mainButton.showProgress(true);
    } else {
      mainButton.hideProgress();
    }

    // Cleanup
    return () => {
      mainButton.offClick(handleClick);
      mainButton.hide();
    };
  }, [webApp, text, isVisible, isActive, color, textColor, showProgress, disabled, handleClick]);

  return null;
}
