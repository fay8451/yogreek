import './globals.css';

export const metadata = {
  title: 'YO! GREEK - Greek Yogurt Shop',
  description: 'Premium Greek yogurt products',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}