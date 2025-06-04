import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Features } from "@/components/features";
import { Documentation } from "@/components/documentation";
import { Examples } from "@/components/examples";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      {/* #features */}
      {/* href="#features" */}
      <Features />
      <Documentation />
      {/* #examples */}
      <Examples />
      <Footer />
    </div>
  );
}
