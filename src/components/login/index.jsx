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
      <div className="glass-card w-full rounded-3xl p-8 sm:p-10 transition-all duration-500 hover:shadow-2xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-800">
            Iniciar Sesión
          </h2>
          <p className="mt-2.5 text-sm text-slate-500 font-medium">
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
              <InputRightElement width="4.5rem" h="full" className="flex items-center justify-center">
                <Button
                  h="2rem"
                  size="sm"
                  onClick={handleClick}
                  variant="ghost"
                  colorScheme="blue"
                  className="rounded-lg text-xs font-semibold hover:bg-slate-100"
                >
                  {show ? "Ocultar" : "Mostrar"}
                </Button>
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
