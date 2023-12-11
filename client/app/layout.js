import './globals.css'
import { Inter } from 'next/font/google'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Manolla',
  description: 'Created by Manolla',
  
}

export default function RootLayout({ children }) {
  return (
    
    <html lang="en">
    
      <body className={inter.className} style={{color: "black", background:"white"}}>
      {children}
      <Footer/>
      </body>
    </html>
  )
}
