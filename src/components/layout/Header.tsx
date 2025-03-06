// components/layout/Header.tsx
import Link from 'next/link';

export function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto py-4 px-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Lead Manager
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link 
                href="/" 
                className="text-sm font-medium hover:text-blue-600 transition-colors"
              >
                Dashboard
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}