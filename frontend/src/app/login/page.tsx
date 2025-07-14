'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const router = useRouter();
  
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  const apiUrl = typeof window !== 'undefined' 
    ? 'http://localhost:3001'
    : 'http://backend:3001';

  const res = await fetch(`${apiUrl}/login`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ usuario, senha }),
  });

    if (res.ok) {
      router.push('/');
    } else {
      const { erro: msg } = await res.json();
      setErro(msg || 'Erro no login');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-800 to-indigo-900 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white bg-opacity-90 backdrop-blur-md p-8 rounded-lg shadow-lg max-w-md w-full"
      >
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Entrar na Minha Loja
        </h1>

        {erro && (
          <p className="text-red-600 bg-red-100 p-2 rounded mb-4 text-center">
            {erro}
          </p>
        )}

        <label className="block mb-2 text-gray-700 font-medium">
          Usuário
          <input
            type="text"
            value={usuario}
            onChange={e => setUsuario(e.target.value)}
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Digite seu usuário"
          />
        </label>

        <label className="block mb-4 text-gray-700 font-medium">
          Senha
          <input
            type="password"
            value={senha}
            onChange={e => setSenha(e.target.value)}
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Digite sua senha"
          />
        </label>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}