import Link from 'next/link';
import { Produto } from '../types/produto';
import styles from '../styles/ProdutoCard.module.css';

interface Props {
  produto: Produto;
}

export default function ProdutoCard({ produto }: Props) {
  return (
    <div className={styles.card}>
      <img src={produto.imagemUrl} alt={produto.nome} />
      <h2>{produto.nome}</h2>
      <p>R$ {produto.preco.toFixed(2)}</p>
      <Link href={`/produto/${produto.id}`}>Ver Detalhes</Link>
    </div>
  );
}