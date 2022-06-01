import { Request, Response } from "express";
import { createPool } from "mysql2";
import IShipping from "../../Interfaces/IShipping";
import IEntregas from "../../Interfaces/IEntregas";
import { ConnectionOptions, ResultSetHeader } from "mysql2/typings/mysql";
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

async function queryPromiseInsert(
  sql: string,
  pool: Pool
): Promise<ResultSetHeader> {
  return new Promise((resolve, reject) => {
    pool.query(sql, (error, results: ResultSetHeader) => {
      if (error) {
        reject(error);
      }
      return resolve(results);
    });
  });
}

async function createShipping(req: Request, res: Response) {
  const result: any[] = req.body;
  console.log(result);

  const credentials: ConnectionOptions = {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Hawk2021!",
    database: "pymo",
  };

  const connection = createPool(credentials);

  result.forEach(async (value) => {
    const rawPrimerDate = new Date(value.fecha as Date);
    const newPrimerDate = rawPrimerDate.toISOString().split("T")[0];

    let queryStr = `INSERT INTO shipping(claveH,fechaProgramada,idInsumo,idPedido,fechaEnvio,fechaConfirmada)
    VALUES (${value.claveH},'${newPrimerDate}',${value.idInsumo},${value.id},'0000-00-00','0000-00-00')`;

    const id = (await queryPromise(queryStr, connection)).insertId;

    queryStr = `INSERT INTO entregas(idShipping,idInsumo,claveH,cantidadEntregada,fechaConfirmada,montoRechazado,motivoRechazo) VALUES (${id},${value.idInsumo},${value.claveH},0,'0000-00-00',0,'-')`;

    await queryPromiseInsert(queryStr,connection);
  });

  //connection.end();

  res.json({ message: "success" });
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

  let queryStr = `select sh.idShipping as 'id',sh.fechaProgramada, sh.fechaEnvio, en.fechaConfirmada ,ho.nombre, ins.descripcion, pe.cantidadAprobada, en.cantidadEntregada, en.montoRechazado, en.motivoRechazo 
  from hospital ho, insumos ins, pedidos pe, shipping sh, entregas en 
  where sh.claveH=ho.claveH and sh.idInsumo=ins.idInsumo and sh.idPedido=pe.idPedido and sh.idShipping=en.idShipping;`;
  const results = await queryPromise(queryStr, connection);
  console.log(results);

  connection.end();

  res.json({ results });
}

async function updateFechaEnvio(req: Request, res: Response) {
  const result = req.body;

  const rawPrimerDate = new Date(result.envioDate as Date);
  const newPrimerDate = rawPrimerDate.toISOString().split("T")[0];

  const credentials: ConnectionOptions = {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Hawk2021!",
    database: "pymo",
  };
  const connection = createPool(credentials);
  let queryStr = `UPDATE shipping SET fechaEnvio='${newPrimerDate}' WHERE idShipping=${result.idShipping}`;
  await queryPromiseInsert(queryStr, connection);

  connection.end();

  res.json({ message: "success" });
}

export { getShipping, createShipping, updateFechaEnvio };
