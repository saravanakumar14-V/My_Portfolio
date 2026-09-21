import { Header } from '@/components/navigation/Header';
import { Dock } from '@/components/navigation/Dock/Dock';
import { Footer } from '@/components/footer/Footer';
import { ExperienceDirector } from '@/components/director';
import { CosmicBackground } from '@/components/background/CosmicBackground/CosmicBackground';
import { NoiseOverlay } from '@/effects/overlays/NoiseOverlay';
import { PageTransition } from '@/components/transitions/PageTransition';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ExperienceDirector />
      <CosmicBackground />
      <NoiseOverlay opacity={0.04} />
      
      <Header />
      
      <main id="main-content">
        <PageTransition>
          {children}
        </PageTransition>
      </main>
      
      <Footer />
      <Dock />
    </>
  );
}
