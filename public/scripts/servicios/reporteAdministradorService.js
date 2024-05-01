// Importa los modelos de Usuario, Venta, Comercio y Producto desde sus respectivos archivos en la carpeta de modelos.
const Usuario = require("../models/usuario");
const Venta = require("../models/venta");
const Comercio = require("../models/comercio");
const Producto = require("../models/producto");

// Define una nueva clase llamada ReporteAdministradorService.
class ReporteAdministradorService {
    // Define un método asincrónico llamado obtenerComerciosActivos.
    async obtenerComerciosActivos() {
        // Retorna la cantidad de documentos en la colección Comercio donde el campo 'activo' es verdadero.
        return await Comercio.countDocuments({ activo: true });
    }

    // Define un método asincrónico llamado obtenerVentas que toma tres parámetros: fechaInicio, fechaFin y groupBy.
    async obtenerVentas(fechaInicio, fechaFin, groupBy) {
        // Define una variable 'match' que es un objeto. Si fechaInicio y fechaFin existen, 'match' será un objeto con una propiedad 'fecha' que es otro objeto con las propiedades '$gte' y '$lte' establecidas a fechaInicio y fechaFin, respectivamente. Si fechaInicio o fechaFin no existen, 'match' será un objeto vacío.
        const match = fechaInicio && fechaFin ? { fecha: { $gte: fechaInicio, $lte: fechaFin } } : {};
        // Define una variable 'ventas' que es el resultado de la operación de agregación en la colección Venta. La operación de agregación tiene dos etapas: $match y $group.
        const ventas = await Venta.aggregate([
            // La etapa $match filtra los documentos en la colección Venta basándose en el objeto 'match'.
            { $match: match },
            // La etapa $group agrupa los documentos por el campo especificado en 'groupBy' y suma el campo 'cantidad' para cada grupo.
            { $group: { _id: groupBy, total: { $sum: "$cantidad" } } }
        ]);

        // Retorna el resultado de la operación de agregación.
        return ventas;
    }

    // Define un método llamado obtenerVentasTotales que toma dos parámetros: fechaInicio y fechaFin.
    obtenerVentasTotales(fechaInicio, fechaFin) {
        // Llama al método obtenerVentas con fechaInicio, fechaFin y null como argumentos y retorna el resultado.
        return this.obtenerVentas(fechaInicio, fechaFin, null);
    }

    // Define un método llamado obtenerVentasPorComercio que toma dos parámetros: fechaInicio y fechaFin.
    obtenerVentasPorComercio(fechaInicio, fechaFin) {
        // Llama al método obtenerVentas con fechaInicio, fechaFin y "$comercio" como argumentos y retorna el resultado.
        return this.obtenerVentas(fechaInicio, fechaFin, "$comercio");
    }

    // Define un método llamado obtenerVentasPorProducto.
    obtenerVentasPorProducto() {
        // Llama al método obtenerVentas con null, null y "$producto" como argumentos y retorna el resultado.
        return this.obtenerVentas(null, null, "$producto");
    }
}

// Exporta una nueva instancia de la clase ReporteAdministradorService.
module.exports = new ReporteAdministradorService();