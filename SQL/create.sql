use pymo;
create table hospital (
	claveH int auto_increment primary key, 
    nombre varchar(100),
    region varchar(100),
    direccion varchar(250),
    noCubrebocas int,
    noMascarillas int,
    noCaretas int
);

create table insumos (
	idInsumo int auto_increment primary key,
    sku varchar(100),
    descripcion varchar(250),
    unidad varchar(50),
    cantidad int
);

select idInsumo as 'id', sku, descripcion, unidad, cantidad from insumos;

create table casos (
	idCaso int auto_increment primary key,
    claveH int,
    periodoMes date, -- Mes y año	
    noCasos int,
    foreign key(claveH) references hospital(claveH)
);

create table pedidos (
	idPedido int auto_increment primary key,
    claveH int,
    cantidadPedida int,
    cantidadAprobada int,
    idInsumo int,
    fecha date,
    foreign key(claveH) references hospital(claveH),
    foreign key(idInsumo) references insumos(idInsumo)
);
select idPedido as 'id', pe.cantidadPedida, pe.cantidadAprobada, pe.fecha, ho.nombre, ins.descripcion 
from pedidos pe, hospital ho, insumos ins where pe.claveH=ho.claveH and pe.idInsumo=ins.idInsumo;
create table shipping (
	idShipping int auto_increment primary key,
    claveH int,
    fechaProgramada date,
    idInsumo int,
    idPedido int,
    fechaEnvio date,
    foreign key(claveH) references hospital(claveH),
    foreign key(idInsumo) references insumos(idInsumo),
    foreign key(idPedido) references pedidos(idPedido)
);
select idShipping as 'id',sh.fechaProgramada, sh.fechaEnvio, ho.nombre, ins.descripcion, pe.cantidadAprobada 
from hospital ho, insumos ins, pedidos pe, shipping sh where sh.claveH=ho.claveH and sh.idInsumo=ins.idInsumo and sh.idPedido=pe.idPedido; 
create table entregas (
	idEntrega int auto_increment primary key,
	idShipping int, 
    idInsumo int,
    claveH int,
    cantidadEntregada int,
    fechaConfirmada date,
    montoRechazado int,
    motivoRechazo varchar(250),
    foreign key(idInsumo) references insumos(idInsumo),
    foreign key(idShipping) references shipping(idShipping),
    foreign key(claveH) references hospital(claveH)
);

select idEntrega as 'id', cantidadEntregada, fechaConfirmada, ho.nombre, ins.descripcion
from entregas en, shipping sh, insumos ins, hospital ho 
where en.idShipping=sh.idShipping and en.idInsumo=ins.idInsumo and en.claveH=ho.claveH;
