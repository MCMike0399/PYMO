import { Request, Response } from "express";
import { createPool } from "mysql2";
import IPedidos from "../../Interfaces/IPedidos";
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

async function queryPromiseInsert(sql: string, pool: Pool): Promise<ResultSetHeader> {
  return new Promise((resolve, reject) => {
    pool.query(sql, (error, results: ResultSetHeader) => {
      if (error) {
        reject(error);
      }
      return resolve(results);
    });
  });
}

async function createPedido(req: Request, res: Response) {
  const pedido:IPedidos = req.body;
  // pedido.cantidadAprobada = pedido.cantidadAprobada as number;
  console.log(pedido);
  const credentials: ConnectionOptions = {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Hawk2021!",
    database: "pymo",
  };

  const connection = createPool(credentials);
  const queryStr = `INSERT INTO pedidos (claveH,cantidadPedida,cantidadAprobada,idInsumo,fecha) values (${pedido.claveH},${pedido.cantidadPedida},${pedido.cantidadAprobada},${pedido.idInsumo},'${pedido.fecha}')`;
  console.log(queryStr);

  await queryPromiseInsert(queryStr,connection);
  connection.end();

  res.json({message: "sucess"});
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

  let queryStr = `select idPedido as 'id', pe.cantidadPedida, pe.cantidadAprobada, pe.fecha, ho.nombre, ho.claveH ,ins.descripcion, ins.idInsumo 
  from pedidos pe, hospital ho, insumos ins where pe.claveH=ho.claveH and pe.idInsumo=ins.idInsumo;`;
  const results: IPedidos = await queryPromise(queryStr, connection);
  console.log(results);

  connection.end();

  res.json({ results });
}

export { getPedidos, createPedido  };
