'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function DetalhesClient() {
  const { id } = useParams();
  const router = useRouter();
  const [produto, setProduto] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  const apiUrl = typeof window !== 'undefined' 
    ? 'http://localhost:3001'   // Para navegador
    : 'http://backend:3001';    // Para SSR dentro do Docker

  useEffect(() => {
    fetch(`${apiUrl}/produtos/${id}`, {
      credentials: 'include',
      cache: 'no-store',
    })
      .then(res => {
        if (res.status === 401) {
          router.push('/login');
          return null;
        }
        if (!res.ok) throw new Error('Erro ao buscar produto');
        return res.json();
      })
      .then(data => {
        if (data) setProduto(data);
      })
      .catch(() => router.push('/login'))
      .finally(() => setLoading(false));
  }, [id, router, apiUrl]);

  if (loading) return <p>Carregando...</p>;
  if (!produto) return null; // já redirecionou

  return (
    <main className="p-4 max-w-3xl mx-auto">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <img
          src={produto.imagemUrl}
          alt={produto.nome}
          className="w-full md:w-1/2 h-auto rounded-lg shadow"
        />
        <div>
          <h1 className="text-3xl font-bold mb-4">{produto.nome}</h1>
          <p className="text-gray-600">{produto.descricao}</p>
          <p className="text-green-600 text-2xl font-bold mt-4">
            R$ {produto.preco.toFixed(2)}
          </p>
        </div>
      </div>
    </main>
  );
}