export default interface IHospital {
    id: number;
    nombre: string;
    region: string;
    direccion: string;
    noCubrebocas: number;
    noMascarillas: number;
    noCaretas: number;
    casosTotales?: number;
}