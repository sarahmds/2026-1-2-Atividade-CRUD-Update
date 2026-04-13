import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-zinc-950">
      <main className="flex flex-col items-center gap-8 p-16 bg-white dark:bg-zinc-900 shadow-xl rounded-2xl border border-zinc-200 dark:border-zinc-800">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={120}
          height={30}
          priority
        />
        
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Controle de Produtos
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400">
            Atividade CRUD - Gerenciamento de estoque via DummyJSON
          </p>
        </div>

        <div className="flex gap-4">
          {/* Botão do shadcn/ui configurado como link para /produtos */}
          <Button asChild size="lg" className="rounded-full px-8">
            <Link href="/produtos">
              Acessar Produtos
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
}