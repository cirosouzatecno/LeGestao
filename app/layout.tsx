import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import { FirebaseProvider } from '@/components/firebase-provider'
import './globals.css'

export const metadata: Metadata = {
  title: 'LeGestão | Le Jardin & VJ Eventos',
  description: 'Gestão integrada de eventos, estoque e equipe — Le Jardin e VJ Eventos',
  openGraph: {
    title: 'LeGestão | Le Jardin & VJ Eventos',
    description: 'Gestão integrada de eventos, estoque e equipe — Le Jardin e VJ Eventos',
    type: 'website',
  },
  icons: {
    icon: [
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
    ],
    apple: '/apple-icon.png',
  },
  manifest: '/manifest.webmanifest',
}

export const viewport: Viewport = {
  colorScheme: 'dark light',
  themeColor: '#080b09',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="pt-BR"
      data-theme="dark"
      className="dark"
      suppressHydrationWarning
    >
      <head>
        <Script
          id="theme-initializer"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('legestao_theme')||'dark';document.documentElement.setAttribute('data-theme',t);if(t==='dark'){document.documentElement.classList.add('dark')}else{document.documentElement.classList.remove('dark')}}catch(e){document.documentElement.setAttribute('data-theme','dark');document.documentElement.classList.add('dark')}})();`,
          }}
        />
      </head>
      <body>
        <FirebaseProvider>
          <div id="root" suppressHydrationWarning>
            {children}
          </div>
        </FirebaseProvider>
      </body>
    </html>
  )
}

