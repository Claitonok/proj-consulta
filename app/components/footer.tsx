
export default function Footer() {
  return (
    <footer className="w-full bg-gray-800 text-white p-4 text-center">
      <p>© Finder. All rights reserved {new Date().getFullYear()}</p>
    </footer>
  );
}