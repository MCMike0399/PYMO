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

async function getEntregas(req: Request, res: Response) {
  const credentials: ConnectionOptions = {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Hawk2021!",
    database: "pymo",
  };

  const connection = createPool(credentials);

  let queryStr = `select idEntrega as 'id', cantidadEntregada, fechaConfirmada, ho.nombre, ins.descripcion
  from entregas en, shipping sh, insumos ins, hospital ho 
  where en.idShipping=sh.idShipping and en.idInsumo=ins.idInsumo and en.claveH=ho.claveH;`;
  const results: IPedidos = await queryPromise(queryStr, connection);
  console.log(results);

  connection.end();

  res.json({ results });
}

async function updateEntrega(req: Request, res: Response) {
  const result = req.body;
  console.log(result);

  const credentials: ConnectionOptions = {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Hawk2021!",
    database: "pymo",
  };

  const connection = createPool(credentials);

  const queryStr = `UPDATE entregas SET cantidadEntregada=${result.cantidadEntregada}, fechaConfirmada='${result.fechaConfirmada}', montoRechazado=${result.montoRechazado}, motivoRechazo='${result.motivoRechazo}' where idShipping=${result.idShipping} and idEntrega=${result.idEntrega}`
  console.log(queryStr);

  await queryPromise(queryStr,connection);

  connection.end();

  res.json({ message: "success" });
}

export { getEntregas, updateEntrega };
