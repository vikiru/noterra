import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils/cn';

type VisibilityCardProps = {
  isPublic: boolean;
  isShared: boolean;
  showFlashcards: boolean;
  onPublicChange: (val: boolean) => void;
  onSharedChange: (val: boolean) => void;
  onShowFlashcardsChange: (val: boolean) => void;
};

// TODO: Reduce the prop drilling
export function VisibilityCard({
  isPublic,
  isShared,
  showFlashcards,
  onPublicChange,
  onSharedChange,
  onShowFlashcardsChange,
}: VisibilityCardProps) {
  const getPublicDescription = () => {
    if (isPublic) {
      return `Anyone can view your note${showFlashcards ? ' and flashcards' : ''}`;
    }
    return 'Only you can view your note and flashcards';
  };

  const getSharedDescription = () => {
    if (isShared) {
      return `Specific people can view your note${showFlashcards ? ' and flashcards' : ''}`;
    }
    return 'Allow specific people to view via link';
  };

  return (
    <Card className="shadow-sm border-neutral-200 dark:border-neutral-800 bg-transparent">
      <CardContent className="grid gap-4 pt-4">
        <div className="flex items-center justify-between space-x-2">
          <div className="flex flex-col gap-1">
            <Label
              className="text-sm font-medium text-neutral-700 dark:text-neutral-300"
              htmlFor="public-mode"
            >
              Public Access
            </Label>
            <span className="text-[0.8rem] text-neutral-500 dark:text-neutral-400">
              {getPublicDescription()}
            </span>
          </div>
          <Switch
            checked={isPublic}
            id="public-mode"
            onCheckedChange={onPublicChange}
          />
        </div>

        <Separator className="bg-neutral-100 dark:bg-neutral-800" />

        <div
          className={cn(
            'flex items-center justify-between space-x-2 transition-opacity duration-200',
            isPublic && 'opacity-50 pointer-events-none',
          )}
        >
          <div className="flex flex-col gap-1">
            <Label
              className="text-sm font-medium text-neutral-700 dark:text-neutral-300"
              htmlFor="share-mode"
            >
              Enable Sharing
            </Label>
            <span className="text-[0.8rem] text-neutral-500 dark:text-neutral-400">
              {getSharedDescription()}
            </span>
          </div>
          <Switch
            checked={isShared}
            disabled={isPublic}
            id="share-mode"
            onCheckedChange={onSharedChange}
          />
        </div>

        {(isPublic || isShared) && (
          <>
            <Separator className="bg-neutral-100 dark:bg-neutral-800" />
            <div className="flex items-center justify-between space-x-2">
              <div className="flex flex-col gap-1">
                <Label
                  className="text-sm font-medium text-neutral-700 dark:text-neutral-300"
                  htmlFor="flashcard-mode"
                >
                  Show Flashcards
                </Label>
                <span className="text-[0.8rem] text-neutral-500 dark:text-neutral-400">
                  Include flashcards when viewing
                </span>
              </div>
              <Switch
                checked={showFlashcards}
                id="flashcard-mode"
                onCheckedChange={onShowFlashcardsChange}
              />
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
