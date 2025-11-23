import { useState } from 'react';

type UseEditVisibilityProps = {
  visibility: {
    public: boolean;
    shared: boolean;
    showCards: boolean;
  };
};

export function useEditVisibility({ visibility }: UseEditVisibilityProps) {
  const [isPublic, setIsPublic] = useState(visibility.public);
  const [isShared, setIsShared] = useState(visibility.shared);
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
