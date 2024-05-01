async function loginService(evento) {
    debugger;
    evento.preventDefault();
    const identificacion = document.getElementById('usuario').value;
    const contrasena = document.getElementById('contrasena').value;

    if (!identificacion || !contrasena) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Por favor ingresa tu identificación y contraseña',
        });
        return;
    }
    try {
        const solicitud = await fetch("http://localhost:3000/api/auth/ingresar", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ identificacion, contrasena }),
        });
        const fetchResponse = await solicitud.json();
        sessionStorage.setItem('_id', fetchResponse._id);
        if (solicitud.ok) {
            if (!fetchResponse.hasOwnProperty('rol')) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Usuario o contraseña incorrectos',
                });
                return;
            }
            if (!fetchResponse.hasOwnProperty('_id')) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Usuario o contraseña incorrectos',
                });
                return;
            }

            sessionStorage.setItem('rol', fetchResponse.rol);

            switch (fetchResponse.rol) {
                case 'administrador':
                    window.location.href = 'paginaInicioAdministrador.html';
                    break;
                case 'comprador':
                    window.location.href = 'paginaInicioComprador.html';
                    break;
                case 'vendedor':
                    window.location.href = 'paginaInicioVendedor.html';
                    break;
                default:
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Usuario o contraseña incorrectos',
                    });
                    window.location.href = 'iniciarSesion.html';
            }
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Usuario o contraseña incorrectos',
            });
            window.location.href = 'iniciarSesion.html';
        }
    } catch (error) {
        console.error('Error:', error);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Error al iniciar sesión',
        });
    }
}

//No me entra al debugger debido a que no se ha llamado a la función, la debo llamar en el HTML,
//en el evento del botón de iniciar sesión de la siguiente manera:
//<button onclick="loginService(event)">Iniciar sesión</button>