'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

type DeleteAction = (
  id: string,
) => Promise<{ success: boolean; error?: string }>;

type UseDeleteProps = {
  deleteAction: DeleteAction;
  onSuccess?: () => void;
  successMessage: string;
  errorMessage?: string;
};

export function useDelete({
  deleteAction,
  onSuccess,
  successMessage,
  errorMessage = 'Unexpected error occurred while deleting.',
}: UseDeleteProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async (id: string) => {
    try {
      setLoading(true);
      const result = await deleteAction(id);

      if (!result.success) {
        toast.error(result.error);
        setLoading(false);
        return;
      }

      toast.success(successMessage);
      setLoading(false);

      if (onSuccess) {
        onSuccess();
      }

      router.refresh();
    } catch (error) {
      console.error('Error deleting:', error);
      toast.error(errorMessage);
      setLoading(false);
    }
  };

  return {
    handleDelete,
    loading,
  };
}
