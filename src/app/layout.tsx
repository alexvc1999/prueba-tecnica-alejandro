import { LanguageProvider } from "@/context/LanguageContext";
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
export const metadata = {
  title: 'Admin CMS | Product Manager',
};