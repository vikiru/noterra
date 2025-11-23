import { Spinner } from '@/lib/components/ui/spinner';

export default function Loader() {
  return (
    <div className="flex justify-center items-center w-full h-32">
      <Spinner />
    </div>
  );
}
