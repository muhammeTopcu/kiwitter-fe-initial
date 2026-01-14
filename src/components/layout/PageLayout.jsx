export default function PageLayout({ children }) {
  return (
    <div className="pt-6 pb-12 px-4">
      <main className="max-w-xl mx-auto">{children}</main>
    </div>
  );
}
