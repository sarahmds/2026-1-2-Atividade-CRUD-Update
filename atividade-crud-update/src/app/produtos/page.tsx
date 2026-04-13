import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  stock: number;
}

interface DummyResponse {
  products: Product[];
}

export default async function ProdutosPage() {
  const response = await fetch("https://dummyjson.com/products?limit=10");
  const data: DummyResponse = await response.json();
  const products = data.products;

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Produtos</h1>
          <p className="text-muted-foreground">Gerencie o estoque da sua loja.</p>
        </div>
        <Button asChild variant="outline">
          <Link href="/">Voltar para Início</Link>
        </Button>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableCaption>Lista de produtos obtida via DummyJSON API.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead className="text-right">Preço</TableHead>
              <TableHead className="text-center">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">#{product.id}</TableCell>
                <TableCell>{product.title}</TableCell>
                <TableCell className="capitalize">{product.category}</TableCell>
                <TableCell className="text-right">${product.price.toFixed(2)}</TableCell>
                <TableCell className="text-center">
                <Button variant="ghost" size="sm" asChild>
                <Link href={`/produtos/${product.id}`}>
                    Editar
                </Link>
                </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}