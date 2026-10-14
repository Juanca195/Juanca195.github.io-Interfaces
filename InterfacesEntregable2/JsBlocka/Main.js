import { Juego } from "./Juego.js";

const bancoJuegos = [
    "../InterfacesEntregable2/assets/fondo1.jpg",
    "../InterfacesEntregable2/assets/fondo2.jpg",
    "../InterfacesEntregable2/assets/fondo6.jpg",
    "../InterfacesEntregable2/assets/fondo7.jpg",
    "../InterfacesEntregable2/assets/fondo8.jpg",
    "../InterfacesEntregable2/assets/fondo9.jpg",
    "../InterfacesEntregable2/assets/fondo10.jpg"
];

// Se podrian agregar mas niveles 
const niveles = [
    {filas: 2, columnas: 2, tiempo : 40},
    {filas: 2, columnas: 3, tiempo : 60},
    {filas: 2, columnas: 4, tiempo : 90},
    {filas: 3, columnas: 3, tiempo : 90}
];
 
const juego = new Juego("myCanvas", bancoJuegos, niveles);
juego.iniciar();

