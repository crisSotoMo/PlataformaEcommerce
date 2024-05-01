
const registro_producto = async(pcategoria, pnombreProducto, pfoto, pdescripcion)=>{
    await axios({
        method:"post",
        url:"http://localhost:8000/api/producto/registrar",
        responseType:"json",
        data:{
            categoriaProducto: pcategoria,
            nombre: pnombreProducto,
            foto:pfoto,
            descripcion: pdescripcion,
        }
    }).then((res)=>{
        //evaluar si el producto fue registrado
        if(res.data.resultado==false){
            let mensajeError=res.data.error.code
            switch (res.data.error.code) { //res.data.error.code==11000
                case 11000:
                    Swal.fire({
                        title:"No se completo el registro",
                        text:`Ocurrio el siguiente error, codigo:${mensajeError}`,
                        icon:"error"
                    })                  
                    break;  
            }
        }else{
            Swal.fire({
                title:"Completado",
                text:"Registro exitoso",
                icon:"success"
            })
        }
    }).then(()=>{
        setTimeout(()=>{
            window.location.href="agregarProducto.html"
        },2000)
        
    }).catch((err)=>{
        console.log(err)
    })
}
