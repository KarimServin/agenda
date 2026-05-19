import CssImage from "../../assets/CSS-Home.png";
import DSSImage from "../../assets/DSS-Home.png";
import LogoImage from "../../assets/logocol.jpg";
import { version } from "../../utils";

export default function LayoutLogin(props) {
    return (
        <div className="gradient-bg h-screen flex flex-col justify-between font-sans overflow-hidden">
            {/* Version indicator */}
            <span className="absolute top-2 left-4 text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full shadow-sm tracking-wider z-10">
                v{version}
            </span>

            {/* Header section with logos - compacted */}
            <header className="w-full max-w-7xl mx-auto px-6 pt-4 pb-2 z-0">
                <div className="bg-white/85 backdrop-blur-md border border-white/60 shadow-sm rounded-xl py-3 px-6 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="transition-transform duration-300 hover:scale-[1.01]">
                        <img
                            src="https://cpcesfe1.org.ar/wp-content/uploads/2023/03/logo_mails.png"
                            alt="logo-consejo"
                            className="h-10 md:h-12 object-contain w-auto"
                        />
                    </div>
                    <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 border-t md:border-t-0 md:border-l border-slate-200/80 pt-2 md:pt-0 md:pl-6">
                        <img src={DSSImage} alt="logo-DSS" className="h-8 md:h-10 object-contain w-auto transition-all duration-300 hover:opacity-80" />
                        <img src={CssImage} alt="logo-CSS" className="h-8 md:h-10 object-contain w-auto transition-all duration-300 hover:opacity-80" />
                        <img src={LogoImage} alt="logo-COL" className="h-8 md:h-10 object-contain w-auto transition-all duration-300 hover:opacity-80 rounded-md shadow-xs" />
                    </div>
                </div>
            </header>

            {/* Main content container - optimized spacing */}
            <main className="flex-grow flex items-center justify-center px-4 py-2">
                <div className="w-full max-w-md">
                    {props.children}
                </div>
            </main>

            {/* Footer with clean styling - compacted */}
            <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 py-3 mt-auto z-10">
                <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-1">
                    <p className="text-xs font-semibold tracking-wide">
                        Consejo de Ciencias Económicas de Santa Fe — Cámara I
                    </p>
                    <p className="text-[10px] text-slate-500">
                        &copy; {new Date().getFullYear()} Todos los derechos reservados.
                    </p>
                </div>
            </footer>
        </div>
    );
}
