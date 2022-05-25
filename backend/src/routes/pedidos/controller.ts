import { Request, Response } from "express";
import { createPool } from "mysql2";
import IPedidos from "../../Interfaces/IPedidos";
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

async function getPedidos(req: Request, res: Response) {
  const credentials: ConnectionOptions = {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Hawk2021!",
    database: "pymo",
  };

  const connection = createPool(credentials);

  let queryStr = `select idPedido as 'id', pe.cantidadPedida, pe.cantidadAprobada, pe.fecha, ho.nombre, ins.descripcion 
  from pedidos pe, hospital ho, insumos ins where pe.claveH=ho.claveH and pe.idInsumo=ins.idInsumo;`;
  const results: IPedidos = await queryPromise(queryStr, connection);
  console.log(results);

  res.json({ results });
}

export { getPedidos };
