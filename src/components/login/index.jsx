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
      <main className="my-20 w-full">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Ingrese sus datos
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onKeyDown={handleKeyDown}>
            <div>
              <label
                htmlFor="text"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Usuario
              </label>
              <InputGroup size='md'>
                <Input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Usuario"
                  required
                />
              </InputGroup>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <label
                htmlFor="text"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Contraseña
              </label>
              <InputGroup size='md'>
                <Input
                  pr='4.5rem'
                  type={show ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Contraseña"
                  required
                />
                <InputRightElement width='4.5rem'>
                  <Button h='1.75rem' size='sm' onClick={handleClick}>
                    {show ? 'Esconder' : 'Ver'}
                  </Button>
                </InputRightElement>
              </InputGroup>

              <div>
                {/* <button
                  onClick={() => navigate("/reset")}
                  className="w-full pt-4 text-sm font-semibold"
                >
                  ¿olvidó su contraseña?
                </button> */}
              </div>
            </div>
            <div>
              <button
                type="button"
                onClick={handleLoginClick}
                className="flex w-full justify-center rounded-md bg-[#336699] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#336699]/70"
              >
                Iniciar sesión
              </button>
            </div>
          </form>
        </div>
      </main>
    </LayoutLogin>
  );
}
