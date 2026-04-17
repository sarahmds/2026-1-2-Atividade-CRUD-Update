"use client";

import React, { useEffect, useState } from "react"; 
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function EditarProduto() {
  const params = useParams();
  const id = params?.id; // Captura o ID com segurança
  const router = useRouter();
  
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTitle(data.title || "");
        setPrice(data.price?.toString() || "");
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erro ao carregar:", err);
        setLoading(false);
      });
  }, [id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`https://dummyjson.com/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title,
          price: parseFloat(price),
        }),
      });

      const data = await response.json();
      console.log("Resposta da API:", data);
      
      alert("Produto atualizado com sucesso!");
      router.push("/produtos");
      router.refresh(); 
    } catch (error) {
      console.error("Erro ao atualizar:", error);
    }
  };

  if (loading) return <p className="p-10 text-center text-zinc-500">Carregando dados do produto...</p>;

  return (
    <div className="container mx-auto py-10 flex flex-col items-center">
      <Card className="w-full max-w-md border-zinc-200 dark:border-zinc-800 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-center">Editar Produto #{id}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUpdate} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Nome do Produto</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex: iPhone 15 Pro"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Preço ($)</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0.00"
                required
              />
            </div>
            <div className="flex gap-3 pt-2">
              <Button type="submit" className="flex-1">
                Salvar Alterações
              </Button>
              <Button variant="outline" asChild className="flex-1">
                <Link href="/produtos">Cancelar</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}