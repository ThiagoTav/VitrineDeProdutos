import './globals.css';
import { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="flex flex-col min-h-screen">
        <header className="bg-gradient-to-b from-gray-900 to-black text-white shadow-md p-4">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <a href="/" className="text-2xl font-bold text-white hover:text-blue-400 transition">
              Minha Loja
            </a>
            {/* Aqui você pode adicionar mais itens depois, como um carrinho ou login */}
          </div>
        </header>

        {/* Conteúdo principal que cresce conforme necessário */}
        <main className="flex-grow">{children}</main>

        {/* Footer sempre no fim da página */}
        <footer className="bg-gray-800 text-white text-center py-4">
          <p>&copy; {new Date().getFullYear()} Meu E-commerce</p>
        </footer>
      </body>
    </html>
  );
}