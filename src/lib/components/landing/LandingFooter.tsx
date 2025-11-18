export function LandingFooter() {
  return (
    <footer>
      <div className="border-t border-border py-8">
        <p className="text-center text-sm text-muted-foreground font-body">
          &copy; {new Date().getFullYear()} AI Learning Tool. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
