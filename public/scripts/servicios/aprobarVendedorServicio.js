async function obtenerVendedoresInactivos() {
    try {
        const response = await axios.get('http://localhost:3000/api/vendedor/usuarios_inactivos');
        const vendedores = response.data.vendedores;
        const tabla = document.querySelector('table tbody');
        console.log(vendedores);
        vendedores.forEach(vendedor => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
            <td>${vendedor.identificacion}</td>
            <td>${vendedor.nombre} ${vendedor.apellido}</td>
            <td>${vendedor.nombreDelComercio}</td>
            <td>${vendedor.correo}</td>
            <td>
                <a href="#">Ver Documentos</a>
            </td>
            <td>
                <button class="approve-btn" id="aprobarRegistro">Aprobar</button>
                <button class="decline-btn" id="rechazaRegistro">Rechazar</button>
            </td>
            `;
            tabla.appendChild(tr);
        });
    } catch (error) {
        console.error(error);
    }
}

document.addEventListener('DOMContentLoaded', obtenerVendedoresInactivos);

//No me lo elimina de ninguna panera debido a que no se esta pasando la cedula del vendedor a eliminar, se debe de pasar como parametro a la funcion eliminarVendedor() para que se pueda eliminar correctamente.
//El codigo correcto es:
async function eliminarVendedor(identificacion) {
    try {
        const response = await axios.delete(`http://localhost:3000/api/vendedor/eliminar_vendedor/${identificacion}`);
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
}

//Y en el evento click se debe de pasar la cedula del vendedor a eliminar:
document.addEventListener('click', (e) => {
    if (e.target.id === 'eliminarVendedor') {
        const identificacion = e.target.parentElement.parentElement.firstElementChild.textContent;
        eliminarVendedor(identificacion);
        e.target.parentElement.parentElement.remove();
    }
});

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('decline-btn')) {
        const identificacion = e.target.parentElement.parentElement.firstElementChild.textContent;
        eliminarVendedor(identificacion);
        e.target.parentElement.parentElement.remove();
    }
});







