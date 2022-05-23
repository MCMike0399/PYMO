export default interface IFormulario {
  hospital: string;
  region: string;
  direccion: string;
  cubrebocas: number;
  caretas: number;
  mascarillas: number;
  primerDate: Date | null;
  primerMes: number;
  segundoDate: Date | null;
  segundoMes: number;
  tercerDate: Date | null;
  tercerMes: number;
}
