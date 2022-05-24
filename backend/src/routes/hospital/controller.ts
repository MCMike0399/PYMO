import { Request, Response } from "express";
import { createPool } from "mysql2";
import IHospital from "../../Interfaces/IHospital";
import { ConnectionOptions } from "mysql2/typings/mysql";
import Pool from "mysql2/typings/mysql/lib/Pool";

async function queryPromise(sql: string, pool: Pool): Promise<any> {
  return new Promise((resolve, reject) => {
    pool.query(sql, (error, results) => {
      if (error) {
        reject(error);
      }
      return resolve(results);
    });
  });
}

async function getHospitales(req: Request, res: Response) {
  const credentials: ConnectionOptions = {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Hawk2021!",
    database: "pymo",
  };

  const connection = createPool(credentials);

  let queryStr = `select ho.claveH as 'id', nombre, region, direccion, noCubrebocas, noMascarillas, noCaretas, sum(noCasos) as 'casosTotales' 
  from hospital ho, casos ca where ho.claveH=ca.claveH group by ho.claveH;`;
  const results: IHospital = await queryPromise(queryStr, connection);
  console.log(results);

  res.json({ results });
}

export { getHospitales };
