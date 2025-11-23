import { useState } from 'react';

type UseEditVisibilityProps = {
  visibility: {
    isPublic: boolean;
    isShared: boolean;
    showCards: boolean;
  };
};

export function useEditVisibility({ visibility }: UseEditVisibilityProps) {
  const [isPublic, setIsPublic] = useState(visibility.isPublic);
  const [isShared, setIsShared] = useState(visibility.isShared);
  const [showCards, setShowCards] = useState(visibility.showCards);

  return {
    isPublic,
    setIsPublic,
    isShared,
    setIsShared,
    showCards,
    setShowCards,
  };
}
