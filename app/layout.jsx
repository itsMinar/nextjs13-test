import '../styles/globals.css';
import Header from './Header';

export default function RootLayout({ children }) {
    return (
        <html>
            <head>
                <title>Minar Web App</title>
            </head>
            <body>
                <Header />
                {children}
            </body>
        </html>
    );
}
