export interface Produto {
  _id: string; // novo campo vindo do MongoDB
  nome: string;
  descricao: string;
  preco: number;
  imagemUrl: string;
}
