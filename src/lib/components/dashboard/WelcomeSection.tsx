type WelcomeSectionProps = {
  firstName: string;
};

export default function WelcomeSection({ firstName }: WelcomeSectionProps) {
  return (
    <div className="space-y-2">
      <h1 className="text-3xl font-bold tracking-tight font-heading">
        Welcome back, {firstName || 'User'}
      </h1>
      <p className="text-muted-foreground font-body">
        Here's what's happening with your studies today.
      </p>
    </div>
  );
}
