// app/layout.tsx
import React, { ReactNode } from 'react';

type Props = { children: ReactNode };

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
