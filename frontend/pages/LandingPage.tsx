import { FAQ } from "@/components/FAQ";
import Features from "@/components/Features";
import { Hero } from "@/components/Hero";
import { Stats } from "@/components/Stats";

export const LandingPage = ()=>{
    return(
        <div className="min-h-screen">
      <Hero />
      <Features />
      <Stats />
      <FAQ />
    </div>
        
    );
}