export default interface IShipping {
    id: number;
    fecha: Date;
    fechaEnvio: Date;
    fechaConfirmada: Date;
    nombre: string;
    descripcion: string;
    cantidadAprobada: number;
    claveH: number;
    idInsumo: number;
}