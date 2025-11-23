import { Spinner } from '@/lib/components/ui/spinner';

export default function Loader() {
  return (
    <div className="flex items-center justify-center h-screen">
      <Spinner />
    </div>
  );
}
