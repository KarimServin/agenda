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
        <Tooltip hasArrow placement='bottom' label="Cerrar sesión">
            <Button colorScheme='red' onClick={handleLogout}><BsBoxArrowRight /></Button>
        </Tooltip>
    );
};

export default LogoutButton;
