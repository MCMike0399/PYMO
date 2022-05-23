import { Request, Response } from "express";
import { createPool } from "mysql2";
// import readJSON from "../../readJSON";
import IFormulario from "../../Interfaces/IFormulario";
import { ConnectionOptions, ResultSetHeader } from "mysql2/typings/mysql";
import Pool from "mysql2/typings/mysql/lib/Pool";

async function queryPromise(sql: string, pool: Pool): Promise<ResultSetHeader> {
  return new Promise((resolve, reject) => {
    pool.query(sql, (error, results: ResultSetHeader) => {
      if (error) {
        reject(error);
      }
      return resolve(results);
    });
  });
}

async function createSolicitud(req: Request, res: Response) {
  const solicitud: IFormulario = req.body;

  const credentials: ConnectionOptions = {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Hawk2021!",
    database: "pymo",
  };

  const connection = createPool(credentials);

  let queryStr = `INSERT INTO hospital(nombre,region,direccion,noCubrebocas,noMascarillas,noCaretas) VALUES ('${solicitud.hospital}','${solicitud.region}','${solicitud.direccion}',${solicitud.cubrebocas},${solicitud.mascarillas},${solicitud.caretas})`;
  const claveH = (await queryPromise(queryStr, connection)).insertId;

  const rawPrimerDate = new Date(solicitud.primerDate as Date);
  const newPrimerDate = rawPrimerDate.toISOString().split("T")[0];
  const rawSegundoDate = new Date(solicitud.segundoDate as Date);
  const newSegundoDate = rawSegundoDate.toISOString().split("T")[0];
  const rawTercerDate = new Date(solicitud.tercerDate as Date);
  const newTercerDate = rawTercerDate.toISOString().split("T")[0];

  queryStr = `INSERT INTO casos(claveH, periodoMes, noCasos) values(${claveH},'${newPrimerDate}', ${solicitud.primerMes})`;
  await queryPromise(queryStr, connection);
  queryStr = `INSERT INTO casos(claveH, periodoMes, noCasos) values(${claveH},'${newSegundoDate}', ${solicitud.segundoMes})`;
  await queryPromise(queryStr, connection);
  queryStr = `INSERT INTO casos(claveH, periodoMes, noCasos) values(${claveH},'${newTercerDate}', ${solicitud.tercerMes})`;
  await queryPromise(queryStr, connection);

  connection.end();

  res.json({ respuesta: "success" });
}

export { createSolicitud };
