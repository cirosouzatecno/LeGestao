import type { Metadata, Viewport } from 'next'
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
  colorScheme: 'light dark',
  themeColor: '#203d2b',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="stylesheet" href="/assets/index-18acEcHu.css" />
      </head>
      <body>
        <div id="root" suppressHydrationWarning>
          {children}
        </div>
        <script type="module" src="/assets/index-CufAODdL.js"></script>
      </body>
    </html>
  )
}

