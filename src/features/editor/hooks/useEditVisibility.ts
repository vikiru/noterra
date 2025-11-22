import { useState } from 'react';

type UseEditVisibilityProps = {
  initialPublic: boolean;
  initialShared: boolean;
  initialShowCards: boolean;
};

export function useEditVisibility({
  initialPublic,
  initialShared,
  initialShowCards,
}: UseEditVisibilityProps) {
  const [isPublic, setIsPublic] = useState(initialPublic);
  const [isShared, setIsShared] = useState(initialShared);
  const [showCards, setShowCards] = useState(initialShowCards);
  const [visibilityOpen, setVisibilityOpen] = useState(false);

  return {
    isPublic,
    setIsPublic,
    isShared,
    setIsShared,
    showCards,
    setShowCards,
    visibilityOpen,
    setVisibilityOpen,
  };
}
