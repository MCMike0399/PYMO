import { Request, Response } from "express";
import { createPool } from "mysql2";
import IPedidos from "../../Interfaces/IPedidos";
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

async function queryPromiseUpdate(
  sql: string,
  values: any,
  pool: Pool
): Promise<ResultSetHeader> {
  return new Promise((resolve, reject) => {
    pool.query(sql, values, (error, results: ResultSetHeader) => {
      if (error) {
        reject(error);
      }
      return resolve(results);
    });
  });
}

async function createPedido(req: Request, res: Response) {
  const pedido: IPedidos = req.body;
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

  let queryStr = `select cantidad from insumos where idInsumo=${pedido.idInsumo}`;
  const result = await queryPromise(queryStr, connection);
  const cantidadDisponible = result[0].cantidad as number;

  const resta = cantidadDisponible - pedido.cantidadAprobada;

  if (resta > 0) {
    queryStr = `INSERT INTO pedidos (claveH,cantidadPedida,cantidadAprobada,idInsumo,fecha,enviado) values (${pedido.claveH},${pedido.cantidadPedida},${pedido.cantidadAprobada},${pedido.idInsumo},'${pedido.fecha}',0)`;
    console.log(queryStr);
    await queryPromiseInsert(queryStr, connection);

    queryStr = `UPDATE insumos SET cantidad=${resta} WHERE idInsumo=${pedido.idInsumo}`;
    await queryPromise(queryStr, connection);
    res.json({ message: "success" });
  } else {
    res.json({ message: "failed" });
  }
  connection.end();
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

  let queryStr = `select idPedido as 'id', pe.cantidadPedida, pe.cantidadAprobada, pe.fecha, ho.nombre, ho.claveH ,ins.descripcion, ins.idInsumo, pe.enviado 
  from pedidos pe, hospital ho, insumos ins where pe.claveH=ho.claveH and pe.idInsumo=ins.idInsumo;`;
  const results: IPedidos = await queryPromise(queryStr, connection);
  console.log(results);

  connection.end();

  res.json({ results });
}

async function actualizaEstado(req: Request, res: Response) {
  const ids: number[] = req.body;
  console.log(ids);

  const credentials: ConnectionOptions = {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Hawk2021!",
    database: "pymo",
  };

  const connection = createPool(credentials);

  let queryStr = `UPDATE pedidos SET enviado=1 WHERE idPedido=?`;
  await queryPromiseUpdate(queryStr, ids, connection);

  res.json({ message: "success" });
}

export { getPedidos, createPedido, actualizaEstado };
