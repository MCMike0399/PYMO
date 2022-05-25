export default interface IShipping {
    id: number;
    fechaProgramada: Date;
    fechaEnvio: Date;
    nombre: string;
    descripcion: string;
    cantidadAprobada: number
}