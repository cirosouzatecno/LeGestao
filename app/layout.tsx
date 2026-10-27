import type { Metadata, Viewport } from 'next'
import { ThemeToggle } from '@/components/theme-toggle'
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
    <html lang="pt-BR" data-theme="dark" className="dark">
      <head>
        <link rel="stylesheet" href="/assets/index-18acEcHu.css" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('legestao_theme')||'dark';document.documentElement.setAttribute('data-theme',t);if(t==='dark'){document.documentElement.classList.add('dark')}else{document.documentElement.classList.remove('dark')}}catch(e){document.documentElement.setAttribute('data-theme','dark');document.documentElement.classList.add('dark')}})();`,
          }}
        />
      </head>
      <body>
        <div id="root" suppressHydrationWarning>
          {children}
        </div>
        <div className="theme-toggle-fixed-container">
          <ThemeToggle />
        </div>
        <script type="module" src="/assets/index-CufAODdL.js"></script>
      </body>
    </html>
  )
}


