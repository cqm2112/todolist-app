import { useState } from "react";
import LogoTmk from '../assets/logo-tmk-original.png';
import Swal from "sweetalert2";
import { ApiUrl } from '../../global';
import { useAuth } from "../authContext";

const Login = () => {
    const [userLogin, setUserLogin] = useState('');
    const { setToken } = useAuth();
    const AuthVal = async () => {
        try {
            const response = await fetch(ApiUrl,
                {
                    headers: {
                        'UserKey': userLogin,
                    }
                })

            const data = await response.json();
            if (data.length === 0) {
                Swal.fire("Codigo incorrecto", "No tenemos ningun Registro con este codigo", "error");
                return false
            }
            return true



        } catch (error) {
            console.error('Error fetching data from API:', error);
        }
    };
    const RegisterVal = async (newToken) => {
        try {
            const response = await fetch(ApiUrl,
                {
                    headers: {
                        'UserKey': newToken,
                    }
                })

            const data = await response.json();
            if (data.length === 0) {
                return true
            }
            return false



        } catch (error) {
            Swal.fire("Error inesperado", "intente mas tarde", "error");
        }
    };
    const handleLogin = async () => {
        if (userLogin.trim().length > 0) {
            const UserExits = await AuthVal();
            if (UserExits) {

                setToken(userLogin)
                window.location.reload();
            }
        } else {
            Swal.fire("Campos vacio", "completa el campo codigo para avanzar", "error");
        }
    };

    const handleRegister = () => {
        setUserLogin("");
        Swal.fire({
            title: "Creando codigo de acceso",
            html: "Con Este codigo podras acceder a tus notas desde cualquier parte del mundo. Siempre podras ver tu codigo desde el menu.",
            timer: 5000,
            timerProgressBar: true,
            allowOutsideClick: false,
            didOpen: () => {

                Swal.showLoading();

                LoginCodeGenerator();
            },
            backdrop: `
              rgba(0,0,123,0.4)
            `
        }).then(function () {
            window.location.reload();
        });
    };

    const LoginCodeGenerator = async () => {
        const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#';
        const longitudCodigo = 6;

        let NewUserCode = '';
        for (let i = 0; i < longitudCodigo; i++) {
            const caracterAl = caracteres.charAt(Math.floor(Math.random() * caracteres.length));
            NewUserCode += caracterAl;
        }
        const UserExits = await RegisterVal(NewUserCode);
        if (!UserExits) {

            setToken(NewUserCode)

        } else {
            await LoginCodeGenerator()
        }

    };
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="max-w-md w-full p-4 bg-white rounded-md shadow-md">
                <div className="w-full flex items-center justify-center">

                    <img className="w-36" src={LogoTmk} alt="Logo" />
                </div>
                <form>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
                            Ingresa Tu codigo
                        </label>
                        <input
                            type="text"
                            id="username"
                            value={userLogin}
                            className="w-full p-2 border rounded-md text-black"
                            onChange={(e) => setUserLogin(e.target.value)}
                        />
                    </div>
                    <div className="w-full flex justify-evenly">
                        <button
                            type="button"
                            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                            onClick={handleLogin}
                        >
                            Iniciar Sesión
                        </button>
                        <button
                            type="button"
                            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                            onClick={handleRegister}
                        >
                            Generar codigo
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};


export default Login;