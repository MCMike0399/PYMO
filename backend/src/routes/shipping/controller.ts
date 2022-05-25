import { Request, Response } from "express";
import { createPool } from "mysql2";
import IShipping from "../../Interfaces/IShipping";
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

async function getShipping(req: Request, res: Response) {
  const credentials: ConnectionOptions = {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Hawk2021!",
    database: "pymo",
  };

  const connection = createPool(credentials);

  let queryStr = `select idShipping as 'id',sh.fechaProgramada, sh.fechaEnvio, ho.nombre, ins.descripcion, pe.cantidadAprobada 
  from hospital ho, insumos ins, pedidos pe, shipping sh where sh.claveH=ho.claveH and sh.idInsumo=ins.idInsumo and sh.idPedido=pe.idPedido;`;
  const results: IShipping = await queryPromise(queryStr, connection);
  console.log(results);

  connection.end();

  res.json({ results });
}

export { getShipping };
