import GetPoke from "@/components/GetPoke";
import '../app/globals.css';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between gap-4 p-10 bg-gray-400">
      <h1 className="text-4xl text-black underline">
        <a href="/">Pokedex</a>
        </h1>
      <GetPoke />
    </main>
  );
}