import CssImage from "../../assets/CSS-Home.png";
import DSSImage from "../../assets/DSS-Home.png";
import LogoImage from "../../assets/logocol.jpg";
import { version } from "../../utils";

export default function LayoutLogin(props) {
    return (
        <div className="gradient-bg min-h-screen flex flex-col justify-between font-sans">
            {/* Version indicator */}
            <span className="absolute top-3 left-4 text-xs font-semibold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full shadow-sm tracking-wider">
                v{version}
            </span>

            {/* Header section with logos */}
            <header className="w-full max-w-7xl mx-auto px-6 pt-8 pb-4">
                <div className="bg-white/85 backdrop-blur-md border border-white/60 shadow-md rounded-2xl p-6 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="transition-transform duration-300 hover:scale-[1.02]">
                        <img
                            src="https://cpcesfe1.org.ar/wp-content/uploads/2023/03/logo_mails.png"
                            alt="logo-consejo"
                            className="h-16 md:h-20 object-contain w-auto"
                        />
                    </div>
                    <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8 border-t md:border-t-0 md:border-l border-slate-200/80 pt-4 md:pt-0 md:pl-8">
                        <img src={DSSImage} alt="logo-DSS" className="h-12 md:h-14 object-contain w-auto transition-all duration-300 hover:opacity-80" />
                        <img src={CssImage} alt="logo-CSS" className="h-12 md:h-14 object-contain w-auto transition-all duration-300 hover:opacity-80" />
                        <img src={LogoImage} alt="logo-COL" className="h-12 md:h-14 object-contain w-auto transition-all duration-300 hover:opacity-80 rounded-lg shadow-sm" />
                    </div>
                </div>
            </header>

            {/* Main content container */}
            <main className="flex-grow flex items-center justify-center px-4 py-8">
                <div className="w-full max-w-md">
                    {props.children}
                </div>
            </main>

            {/* Footer with clean styling */}
            <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 py-4 mt-auto">
                <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-2">
                    <p className="text-xs sm:text-sm font-medium tracking-wide">
                        Consejo de Ciencias Económicas de Santa Fe — Cámara I
                    </p>
                    <p className="text-[10px] sm:text-xs text-slate-500">
                        &copy; {new Date().getFullYear()} Todos los derechos reservados.
                    </p>
                </div>
            </footer>
        </div>
    );
}
