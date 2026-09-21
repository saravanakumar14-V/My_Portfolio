import type { Metadata, Viewport } from 'next';
import { siteConfig } from '@/config/site';
import { SmoothScrollProvider } from '@/providers/SmoothScrollProvider';
import { MotionProvider } from '@/providers/MotionProvider';
import { CursorProvider } from '@/providers/CursorProvider';
import { PerformanceProvider } from '@/providers/PerformanceProvider';
import { Preloader } from '@/components/preloader';
import './globals.css';

// ── Viewport ─────────────────────────────────────────────────
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: dark)',  color: '#02040A' },
    { media: '(prefers-color-scheme: light)', color: '#F6F9FC' },
  ],
};

// ── Root Metadata ─────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  authors: [{ name: siteConfig.author.name, url: siteConfig.url }],
  creator: siteConfig.author.name,
  publisher: siteConfig.author.name,
  keywords: [
    'Software Engineer',
    'AI Engineer',
    'Machine Learning',
    'Full Stack Developer',
    'Next.js',
    'React',
    'TypeScript',
    'Portfolio',
    siteConfig.author.name,
  ],
  openGraph: {
    type: 'website',
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — Portfolio`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: siteConfig.twitterHandle,
    site: siteConfig.twitterHandle,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/icons/favicon.ico', sizes: 'any' },
      { url: '/icons/icon.svg', type: 'image/svg+xml' },
    ],
    apple: [{ url: '/icons/apple-touch-icon.png', sizes: '180x180' }],
  },
  manifest: '/manifest.json',
};

// ── Root Layout ───────────────────────────────────────────────
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('portfolio-theme');
                  var theme = saved || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
                  document.documentElement.setAttribute('data-theme', theme);
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body>
        <PerformanceProvider>
          <MotionProvider>
            <SmoothScrollProvider>
              <CursorProvider>
                <Preloader />
                {/* Skip to main content — accessibility */}
                <a href="#main-content" className="skip-to-content">
                  Skip to main content
                </a>

                {/* Main content */}
                <div id="main-content">
                  {children}
                </div>
              </CursorProvider>
            </SmoothScrollProvider>
          </MotionProvider>
        </PerformanceProvider>
      </body>
    </html>
  );
}
