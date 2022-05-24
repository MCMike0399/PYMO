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

create table entregas (
	idEntrega int auto_increment primary key,
	idShipping int, 
    idInsumo int,
    cantidadEntregada int,
    fechaConfirmada date,
    montoRechazado int,
    motivoRechazo varchar(250),
    foreign key(idInsumo) references insumos(idInsumo),
    foreign key(idShipping) references shipping(idShipping)
);
