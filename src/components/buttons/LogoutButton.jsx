import { Button, Tooltip, useToast } from '@chakra-ui/react';
import { BsBoxArrowRight } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
    const toast = useToast()
    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("sesion");
        localStorage.removeItem("img");
        localStorage.removeItem("number");
        localStorage.removeItem("type");
        localStorage.removeItem("mp");
        localStorage.removeItem("status");
        toast({
            title: 'Hasta Pronto.',
            description: `Se cerro correctamente la sesión`,
            status: 'success',
            duration: 5000,
            isClosable: true,
        })
        navigate("/");
        onclose();
    };

    return (
        <Tooltip hasArrow placement='bottom' label="Cerrar sesión" borderRadius="xl">
            <button
                type="button"
                onClick={handleLogout}
                className="p-2.5 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200/50 hover:border-red-200 active:scale-95 rounded-xl flex items-center justify-center transition-all duration-200 shadow-sm"
            >
                <BsBoxArrowRight className="w-4 h-4" />
            </button>
        </Tooltip>
    );
};

export default LogoutButton;
