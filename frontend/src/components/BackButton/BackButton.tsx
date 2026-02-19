import { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTelegram } from '../../hooks/useTelegram';

interface BackButtonProps {
  onClick?: () => void;
  defaultNavigate?: boolean;
}

export default function BackButton({ onClick, defaultNavigate = true }: BackButtonProps) {
  const { webApp, hapticImpact } = useTelegram();
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    hapticImpact('light');
    
    if (onClick) {
      onClick();
    } else if (defaultNavigate) {
      navigate(-1);
    }
  }, [onClick, defaultNavigate, navigate, hapticImpact]);

  useEffect(() => {
    if (!webApp) return;

    const backButton = webApp.BackButton;

    backButton.offClick(handleClick);
    backButton.onClick(handleClick);
    backButton.show();

    return () => {
      backButton.offClick(handleClick);
      backButton.hide();
    };
  }, [webApp, handleClick]);

  return null;
}
