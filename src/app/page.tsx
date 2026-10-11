import AgustinNavbar from "@/components/ui/AgustinNavbar";
import AgustinHero from "@/components/ui/AgustinHero";
import AgustinServices from "@/components/ui/AgustinServices";
import AgustinWork from "@/components/ui/AgustinWork";
import AgustinAbout from "@/components/ui/AgustinAbout";
import AgustinContact from "@/components/ui/AgustinContact";
import AgustinFooter from "@/components/ui/AgustinFooter";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-black text-white flex flex-col selection:bg-white/20">
      {/* Agustin Burgos Style Navigation */}
      <AgustinNavbar />

      {/* Main Content Stream */}
      <main className="flex-1 w-full">
        {/* Editorial Big Typography Hero with 3D Spatial Canvas */}
        <AgustinHero />

        {/* Services & Core Capabilities ("where expertise meets innovation") */}
        <AgustinServices />

        {/* Selected Work & Production Case Studies */}
        <AgustinWork />

        {/* About, Career Timeline & Endorsements */}
        <AgustinAbout />

        {/* Minimalist Editorial Contact Form ("let's talk") */}
        <AgustinContact />
      </main>

      {/* Clean Minimalist Footer */}
      <AgustinFooter />
    </div>
  );
}
