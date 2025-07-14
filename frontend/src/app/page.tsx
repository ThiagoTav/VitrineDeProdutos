import { Produto } from '../types/produto';
import Link from 'next/link';
import HeadMeta from '../components/HeadMeta';
  
  export const revalidate = 60;
  
  export default async function Home() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/produtos`);
    const produtos: Produto[] = await res.json();
  
    return (
      <>
        <HeadMeta title="Vitrine de Produtos" description="Lista de produtos mockados" />
        <main className="p-4 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {produtos.map((produto) => (
              <Link
                key={produto._id}
                href={`/produto/${produto._id}`}
                className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition bg-white"
              >
                <img
                  src={produto.imagemUrl}
                  alt={produto.nome}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold">{produto.nome}</h2>
                  <p className="text-gray-500 text-sm">{produto.descricao}</p>
                  <p className="text-green-600 font-bold mt-2">R$ {produto.preco.toFixed(2)}</p>
                </div>
              </Link>
            ))}
          </div>
        </main>
      </>
    );
  }