import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkLoginService, loginRequest } from "../../service/sesion";
import LayoutLogin from "../layout/login";
import { Button, Input, InputGroup, InputRightElement, useToast } from "@chakra-ui/react";

export default function Login() {
  const navigate = useNavigate();
  const toast = useToast()
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)

  const handleLoginClick = async () => {
    try {
      const res = await loginRequest(username || "", password || "");
      if (res.Errorid === "0") {
        localStorage.setItem("user", res.Usuario || "");
        localStorage.setItem("sesion", res.Sesion || "");
        localStorage.setItem("type", res.Tipo || "");
        localStorage.setItem("number", res.Numero || "");
        localStorage.setItem("img", res.Foto || "");
        localStorage.setItem("status", res.Estado || "");
        toast({
          title: "Inicio de sesión correcto",
          description: `Bienvenid@ ${res.Usuario}`,
          status: "success",
          isClosable: true,
        });
        navigate("/agenda-comunicacion");
      } else {
        toast({
          title: "Error al iniciar sesión",
          description: `Error: ${res.Errornombre}`,
          status: "error",
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleLoginClick();
    }
  };

  const fetchData = async () => {
    try {
      const res = await checkLoginService();
      if (res.Errorid === "0") {
        toast({
          title: "Ya inicio sesión anteriormente",
          description: `Bienvenid@ ${localStorage.getItem("user")}`,
          status: "success",
          isClosable: true,
        });
        navigate("/agenda-comunicacion");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <LayoutLogin>
      <div className="glass-card w-full rounded-3xl p-6 sm:p-8 transition-all duration-500 hover:shadow-2xl">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-800">
            Iniciar Sesión
          </h2>
          <p className="mt-1.5 text-xs text-slate-500 font-medium">
            Agenda de Comunicación Institucional
          </p>
        </div>

        <form className="space-y-6" onKeyDown={handleKeyDown}>
          <div>
            <label
              htmlFor="username"
              className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2"
            >
              Usuario
            </label>
            <InputGroup size="lg">
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Ingrese su usuario"
                className="premium-input bg-white/70 border-slate-200 hover:border-slate-300 focus:border-[#336699] rounded-xl text-slate-800 placeholder-slate-400"
                required
                focusBorderColor="#336699"
              />
            </InputGroup>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2"
            >
              Contraseña
            </label>
            <InputGroup size="lg">
              <Input
                id="password"
                pr="4.5rem"
                type={show ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingrese su contraseña"
                className="premium-input bg-white/70 border-slate-200 hover:border-slate-300 focus:border-[#336699] rounded-xl text-slate-800 placeholder-slate-400"
                required
                focusBorderColor="#336699"
              />
              <InputRightElement width="3.5rem" h="full" className="flex items-center justify-center">
                <button
                  type="button"
                  onClick={handleClick}
                  className="p-2 rounded-xl text-slate-400 hover:text-[#336699] hover:bg-slate-100/80 active:scale-95 transition-all duration-200"
                  aria-label={show ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {show ? (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )}
                </button>
              </InputRightElement>
            </InputGroup>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={handleLoginClick}
              className="premium-btn w-full bg-[#336699] hover:bg-[#2c5885] active:bg-[#254b70] text-white py-3.5 px-4 rounded-xl text-sm font-bold tracking-wide shadow-lg shadow-blue-900/10 flex items-center justify-center gap-2"
            >
              <span>Ingresar al Sistema</span>
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </LayoutLogin>
  );
}
