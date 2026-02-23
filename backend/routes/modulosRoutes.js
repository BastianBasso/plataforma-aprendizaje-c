const express = require('express');
const path = require('path');
const router = express.Router();
const { isAuthenticated } = require('../middlewares/auth');
// Aquí van todas las rutas de los módulos

/*
      ___           ___           ___           ___           ___       ___           ___    
     /  /\         /  /\         /  /\         /  /\         /  /\     /  /\         /  /\    
    /  /::|       /  /::\       /  /::\       /  /:/        /  /:/    /  /::\       /  /::\   
   /  /:|:|      /  /:/\:\     /  /:/\:\     /  /:/        /  /:/    /  /:/\:\     /__/:/\:\  
  /  /:/|:|__   /  /:/  \:\   /  /:/  \:\   /  /:/        /  /:/    /  /:/  \:\   _\_ \:\ \:\ 
 /__/:/_|::::\ /__/:/ \__\:\ /__/:/ \__\:| /__/:/     /\ /__/:/    /__/:/ \__\:\ /__/\ \:\ \:\
 \__\/  /~~/:/ \  \:\ /  /:/ \  \:\ /  /:/ \  \:\    /:/ \  \:\    \  \:\ /  /:/ \  \:\ \:\_\/
       /  /:/   \  \:\  /:/   \  \:\  /:/   \  \:\  /:/   \  \:\    \  \:\  /:/   \  \:\_\:\  
      /  /:/     \  \:\/:/     \  \:\/:/     \  \:\/:/     \  \:\    \  \:\/:/     \  \:\/:/  
     /__/:/       \  \::/       \__\::/       \  \::/       \  \:\    \  \::/       \  \::/   
     \__\/         \__\/            ~~         \__\/         \__\/     \__\/         \__\/    

*/



// Modulo 1

//imagenes modulo 1
router.get('/Modulos/modulo-1-Fundamentos-Introduccion/media/image1.png',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/modulo-1-Fundamentos-Introduccion/media/image1.png"));
});
router.get('/Modulos/modulo-1-Fundamentos-Introduccion/media/image2.png',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/modulo-1-Fundamentos-Introduccion/media/image2.png"));
});
router.get('/Modulos/modulo-1-Fundamentos-Introduccion/media/image3.png',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/modulo-1-Fundamentos-Introduccion/media/image3.png"));
});
// contenido 1
router.get('/Modulos/modulo-1-Fundamentos-Introduccion/100-Introduccion-a-la-programacion-y-Algoritmos.html',isAuthenticated ,(req, res) => {
   // res.sendFile(path.join(__dirname, "../../frontend/react-spa/dist/Modulos/modulo-1-Fundamentos-Introduccion/100-Introduccion-a-la-programacion-y-Algoritmos.html"));
   res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/modulo-1-Fundamentos-Introduccion/100-Introduccion-a-la-programacion-y-Algoritmos.html"));
});


router.get('/Modulos/modulo-1-Fundamentos-Introduccion/101-preguntas-introduccion-.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/modulo-1-Fundamentos-Introduccion/101-preguntas-introduccion-.html"));
    });

router.get('/Modulos/modulo-1-Fundamentos-Introduccion/200-Historia-Proposito-y-aplicaciones-del-lenguaje-C.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/modulo-1-Fundamentos-Introduccion/200-Historia-Proposito-y-aplicaciones-del-lenguaje-C.html"));
});

router.get('/Modulos/modulo-1-Fundamentos-Introduccion/201-preguntas-respuesta.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/modulo-1-Fundamentos-Introduccion/201-preguntas-respuesta.html"));
});

router.get('/Modulos/modulo-1-Fundamentos-Introduccion/300-El-proceso-de-compilacion-y-el-ciclo-de-vida-del-codigo.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/modulo-1-Fundamentos-Introduccion/300-El-proceso-de-compilacion-y-el-ciclo-de-vida-del-codigo.html"));
});


router.get('/Modulos/modulo-1-Fundamentos-Introduccion/301-preguntas--respuestas.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/modulo-1-Fundamentos-Introduccion/301-preguntas--respuestas.html"));
});

router.get('/Modulos/modulo-1-Fundamentos-Introduccion/400---Estructura-basica-de-un-programa-C-la-funcion-main.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/modulo-1-Fundamentos-Introduccion/400---Estructura-basica-de-un-programa-C-la-funcion-main.html"));
});

router.get('/Modulos/modulo-1-Fundamentos-Introduccion/401-preguntas-respuestas.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/modulo-1-Fundamentos-Introduccion/401-preguntas-respuestas.html"));
});

router.get('/Modulos/modulo-1-Fundamentos-Introduccion/500-Pensamiento-Computacional-Descomposicion-y-Abstraccion.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/modulo-1-Fundamentos-Introduccion/500-Pensamiento-Computacional-Descomposicion-y-Abstraccion.html"));
});

router.get('/Modulos/modulo-1-Fundamentos-Introduccion/501-preguntas-respuestas.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/modulo-1-Fundamentos-Introduccion/501-preguntas-respuestas.html"));
});

router.get('/Modulos/modulo-1-Fundamentos-Introduccion/600-Primeros-pasos-y-la-funcion-de-salida-basica.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/modulo-1-Fundamentos-Introduccion/600-Primeros-pasos-y-la-funcion-de-salida-basica.html"));
});

router.get('/Modulos/modulo-1-Fundamentos-Introduccion/601-q-a.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/modulo-1-Fundamentos-Introduccion/601-q-a.html"));
});

router.get('/Modulos/modulo-1-Fundamentos-Introduccion/800-Resumen.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/modulo-1-Fundamentos-Introduccion/800-Resumen.html"));
});



// Modulo 2
router.get('/Modulos/Modulo-2-Tipos-de-Datos-y-Variables/100--1.-El-Concepto-de-Dato-y-la-Gestion-de-Memoria.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/Modulo-2-Tipos-de-Datos-y-Variables/100--1.-El-Concepto-de-Dato-y-la-Gestion-de-Memoria.html"));
});
router.get('/Modulos/Modulo-2-Tipos-de-Datos-y-Variables/101-preg-resp--.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/Modulo-2-Tipos-de-Datos-y-Variables/101-preg-resp--.html"));
});

router.get('/Modulos/Modulo-2-Tipos-de-Datos-y-Variables/200-Clasificacion-de-Tipos-Primitivos-int,-float,-char.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/Modulo-2-Tipos-de-Datos-y-Variables/200-Clasificacion-de-Tipos-Primitivos-int,-float,-char.html"));
});
router.get('/Modulos/Modulo-2-Tipos-de-Datos-y-Variables/201-preguntas-progra.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/Modulo-2-Tipos-de-Datos-y-Variables/201-preguntas-progra.html"));
});
//C:\Users\Namata Nerv Web\Desktop\Proyecto de titulo\Carpeta de trabajo Repositorio\Versión 5.0\proyecto v5.0\Proyecto de info\proyecto\dist\protected_html/Modulos/Modulo-2-Tipos-de-Datos-y-Variables/300-Declaracion,-Inicializacion-y-Uso-de-Variables.html
router.get('/Modulos/Modulo-2-Tipos-de-Datos-y-Variables/300-Declaracion,-Inicializacion-y-Uso-de-Variables.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/Modulo-2-Tipos-de-Datos-y-Variables/300-Declaracion,-Inicializacion-y-Uso-de-Variables.html"));
});
router.get('/Modulos/Modulo-2-Tipos-de-Datos-y-Variables/301-preg-progra.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/Modulo-2-Tipos-de-Datos-y-Variables/301-preg-progra.html"));
});
router.get('/Modulos/Modulo-2-Tipos-de-Datos-y-Variables/400-4.-Variables-y-Constantes-.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/Modulo-2-Tipos-de-Datos-y-Variables/400-4.-Variables-y-Constantes-.html"));
});
router.get('/Modulos/Modulo-2-Tipos-de-Datos-y-Variables/401-preg-resp.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/Modulo-2-Tipos-de-Datos-y-Variables/401-preg-resp.html"));
});
router.get('/Modulos/Modulo-2-Tipos-de-Datos-y-Variables/500-5.-Limites-y-Rangos-de-los-Tipos-de-Datos-Desbordamiento.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/Modulo-2-Tipos-de-Datos-y-Variables/500-5.-Limites-y-Rangos-de-los-Tipos-de-Datos-Desbordamiento.html"));
});
router.get('/Modulos/Modulo-2-Tipos-de-Datos-y-Variables/501-programas.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/Modulo-2-Tipos-de-Datos-y-Variables/501-programas.html"));
});
router.get('/Modulos/Modulo-2-Tipos-de-Datos-y-Variables/600-Declaracion-de-Variables-y-Buenas-Practicas.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/Modulo-2-Tipos-de-Datos-y-Variables/600-Declaracion-de-Variables-y-Buenas-Practicas.html"));
});
router.get('/Modulos/Modulo-2-Tipos-de-Datos-y-Variables/601-progra.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/Modulo-2-Tipos-de-Datos-y-Variables/601-progra.html"));
});
router.get('/Modulos/Modulo-2-Tipos-de-Datos-y-Variables/700-Proyecto.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/Modulo-2-Tipos-de-Datos-y-Variables/700-Proyecto.html"));
});
router.get('/Modulos/Modulo-2-Tipos-de-Datos-y-Variables/800-Resumen.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/Modulo-2-Tipos-de-Datos-y-Variables/800-Resumen.html"));
});


// Modulo 3
router.get('/Modulos/Modulo-3-Operadores-y-ES-de-Datos/100-1--Operadores-Aritmeticos-y-Asignacion.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/Modulo-3-Operadores-y-ES-de-Datos/100-1--Operadores-Aritmeticos-y-Asignacion.html"));
});
router.get('/Modulos/Modulo-3-Operadores-y-ES-de-Datos/101-progra.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/Modulo-3-Operadores-y-ES-de-Datos/101-progra.html"));
});
router.get('/Modulos/Modulo-3-Operadores-y-ES-de-Datos/200-2--Operadores-Relacionales-y-Logicos-bases-para-la-decision.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/Modulo-3-Operadores-y-ES-de-Datos/200-2--Operadores-Relacionales-y-Logicos-bases-para-la-decision.html"));
});
router.get('/Modulos/Modulo-3-Operadores-y-ES-de-Datos/201-preguntas.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/Modulo-3-Operadores-y-ES-de-Datos/201-preguntas.html"));
});
router.get('/Modulos/Modulo-3-Operadores-y-ES-de-Datos/300-3--Prioridad-de-operadores-y-expresiones.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/Modulo-3-Operadores-y-ES-de-Datos/300-3--Prioridad-de-operadores-y-expresiones.html"));
});
router.get('/Modulos/Modulo-3-Operadores-y-ES-de-Datos/301-ejercicios.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/Modulo-3-Operadores-y-ES-de-Datos/301-ejercicios.html"));
});
router.get('/Modulos/Modulo-3-Operadores-y-ES-de-Datos/400-4--Entrada-Estandar-de-Datos-Input-Captura-de-valores.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/Modulo-3-Operadores-y-ES-de-Datos/400-4--Entrada-Estandar-de-Datos-Input-Captura-de-valores.html"));
});
router.get('/Modulos/Modulo-3-Operadores-y-ES-de-Datos/401-preg.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/Modulo-3-Operadores-y-ES-de-Datos/401-preg.html"));
});
router.get('/Modulos/Modulo-3-Operadores-y-ES-de-Datos/500-5--Salida-Estandar-de-Datos-Output-Formateo-de-resultados.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/Modulo-3-Operadores-y-ES-de-Datos/500-5--Salida-Estandar-de-Datos-Output-Formateo-de-resultados.html"));
});
router.get('/Modulos/Modulo-3-Operadores-y-ES-de-Datos/501-preguntas.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/Modulo-3-Operadores-y-ES-de-Datos/501-preguntas.html"));
});
router.get('/Modulos/Modulo-3-Operadores-y-ES-de-Datos/600-6--Implementacion-practica-de-un-ciclo-Input-Procesamiento-Output.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/Modulo-3-Operadores-y-ES-de-Datos/600-6--Implementacion-practica-de-un-ciclo-Input-Procesamiento-Output.html"));
});
router.get('/Modulos/Modulo-3-Operadores-y-ES-de-Datos/601-preguntas.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/Modulo-3-Operadores-y-ES-de-Datos/601-preguntas.html"));
});
router.get('/Modulos/Modulo-3-Operadores-y-ES-de-Datos/700-proyecto.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/Modulo-3-Operadores-y-ES-de-Datos/700-proyecto.html"));
});
router.get('/Modulos/Modulo-3-Operadores-y-ES-de-Datos/800-resumen.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/Modulo-3-Operadores-y-ES-de-Datos/800-resumen.html"));
});


// Modulo 4

//proyecto v5.0\Proyecto de info\proyecto\dist\protected_html\Modulos\Modulo-4-Estructuras-de-Control\101-preguntas.html
//\Modulos\Modulo-4-Estructuras-de-Control\100-1-El-Flujo-de-Ejecucion-Lineal-vs-el-Control-de-Flujo.html
router.get('/Modulos/Modulo-4-Estructuras-de-Control/100-1-El-Flujo-de-Ejecucion-Lineal-vs-el-Control-de-Flujo.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/Modulo-4-Estructuras-de-Control/100-1-El-Flujo-de-Ejecucion-Lineal-vs-el-Control-de-Flujo.html"));
});

router.get('/Modulos/Modulo-4-Estructuras-de-Control/101-preguntas.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/Modulo-4-Estructuras-de-Control/101-preguntas.html"));
});

router.get('/Modulos/Modulo-4-Estructuras-de-Control/200--Estructuras-Condicionales-Simples-y-Dobles-if--else.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/Modulo-4-Estructuras-de-Control/200--Estructuras-Condicionales-Simples-y-Dobles-if--else.html"));
});
router.get('/Modulos/Modulo-4-Estructuras-de-Control/201-progra.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/Modulo-4-Estructuras-de-Control/201-progra.html"));
});

//insercion de 300 , 301
//C:\Users\Namata Nerv Web\Desktop\Proyecto de titulo\Carpeta de trabajo Repositorio\Versión 5.0\proyecto v5.0\Proyecto de info\proyecto\dist\protected_html\Modulos\Modulo-4-Estructuras-de-Control\300-3-Estructuras-Condicionales-Multiples-switch-y-Anidamiento.html
router.get('/Modulos/Modulo-4-Estructuras-de-Control/300-3-Estructuras-Condicionales-Multiples-switch-y-Anidamiento.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/Modulo-4-Estructuras-de-Control/300-3-Estructuras-Condicionales-Multiples-switch-y-Anidamiento.html"));
});
//"/Modulos/Modulo-4-Estructuras-de-Control/300-3-Estructuras-Condicionales-Multiples-switch-y-Anidamiento.html"

router.get('/Modulos/Modulo-4-Estructuras-de-Control/301-progra.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/Modulo-4-Estructuras-de-Control/301-progra.html"));
});



router.get('/Modulos/Modulo-4-Estructuras-de-Control/400-4-Bucles-de-Repeticion-por-Contador-for.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/Modulo-4-Estructuras-de-Control/400-4-Bucles-de-Repeticion-por-Contador-for.html"));
});

router.get('/Modulos/Modulo-4-Estructuras-de-Control/400-4-Bucles-de-Repeticion-por-Contador-for.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/Modulo-4-Estructuras-de-Control/400-4-Bucles-de-Repeticion-por-Contador-for.html"));
});

//401-progra.html
router.get('/Modulos/Modulo-4-Estructuras-de-Control/401-progra.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/Modulo-4-Estructuras-de-Control/401-progra.html"));
});



router.get('/Modulos/Modulo-4-Estructuras-de-Control/500-5-Bucles-de-Repeticion-Condicionales-while-do-while.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/Modulo-4-Estructuras-de-Control/500-5-Bucles-de-Repeticion-Condicionales-while-do-while.html"));
});
//500-5-Bucles-de-Repeticion-Condicionales-while-do-while.html


router.get('/Modulos/Modulo-4-Estructuras-de-Control/501-progra.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/Modulo-4-Estructuras-de-Control/501-progra.html"));
});
router.get('/Modulos/Modulo-4-Estructuras-de-Control/600-6-Control-de-bucles-break-y-continue.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/Modulo-4-Estructuras-de-Control/600-6-Control-de-bucles-break-y-continue.html"));
});


router.get('/Modulos/Modulo-4-Estructuras-de-Control/601-progra.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/Modulo-4-Estructuras-de-Control/601-progra.html"));
});
router.get('/Modulos/Modulo-4-Estructuras-de-Control/700-proyecto-.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/Modulo-4-Estructuras-de-Control/700-proyecto-.html"));
});

router.get('/Modulos/Modulo-4-Estructuras-de-Control/800-Resumen.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/Modulo-4-Estructuras-de-Control/800-Resumen.html"));
});




// Modulo 5
router.get('/Modulos/Modulo-5-Funciones-y-Modularidad/100-1-Concepto-de-Modularidad-y-Reutilizacion-de-Codigo.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/Modulo-5-Funciones-y-Modularidad/100-1-Concepto-de-Modularidad-y-Reutilizacion-de-Codigo.html"));
});

router.get('/Modulos/Modulo-5-Funciones-y-Modularidad/101-preguntas-.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/Modulo-5-Funciones-y-Modularidad/101-preguntas-.html"));
});
router.get('/Modulos/Modulo-5-Funciones-y-Modularidad/200--2-Definicion,-Declaracion-y-Llamada-de-Funciones.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/Modulo-5-Funciones-y-Modularidad/200--2-Definicion,-Declaracion-y-Llamada-de-Funciones.html"));
});
router.get('/Modulos/Modulo-5-Funciones-y-Modularidad/201-progra-.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/Modulo-5-Funciones-y-Modularidad/201-progra-.html"));
});
router.get('/Modulos/Modulo-5-Funciones-y-Modularidad/300--3-Comunicacion-de-Datos-Paso-de-Argumentos-y-Parametros.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/Modulo-5-Funciones-y-Modularidad/300--3-Comunicacion-de-Datos-Paso-de-Argumentos-y-Parametros.html"));
});
router.get('/Modulos/Modulo-5-Funciones-y-Modularidad/301-progra.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/Modulo-5-Funciones-y-Modularidad/301-progra.html"));
});
router.get('/Modulos/Modulo-5-Funciones-y-Modularidad/400-4-Valores-de-Retorno-y-el-Tipo-void.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/Modulo-5-Funciones-y-Modularidad/400-4-Valores-de-Retorno-y-el-Tipo-void.html"));
});
router.get('/Modulos/Modulo-5-Funciones-y-Modularidad/401-progra.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/Modulo-5-Funciones-y-Modularidad/401-progra.html"));
});
router.get('/Modulos/Modulo-5-Funciones-y-Modularidad/500--5-Ambito-Scope-de-las-Variables-Locales-y-Globales.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/Modulo-5-Funciones-y-Modularidad/500--5-Ambito-Scope-de-las-Variables-Locales-y-Globales.html"));
});
router.get('/Modulos/Modulo-5-Funciones-y-Modularidad/501-progra.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/Modulo-5-Funciones-y-Modularidad/501-progra.html"));
});

router.get('/Modulos/Modulo-5-Funciones-y-Modularidad/600-6-Creacion-de-Librerias-Simples-Archivos-h-y-c-Conceptual.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/Modulo-5-Funciones-y-Modularidad/600-6-Creacion-de-Librerias-Simples-Archivos-h-y-c-Conceptual.html"));
});


router.get('/Modulos/Modulo-5-Funciones-y-Modularidad/601-progra.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/Modulo-5-Funciones-y-Modularidad/601-progra.html"));
});
router.get('/Modulos/Modulo-5-Funciones-y-Modularidad/700-proyecto.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/Modulo-5-Funciones-y-Modularidad/700-proyecto.html"));
});
router.get('/Modulos/Modulo-5-Funciones-y-Modularidad/800-resumen.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/Modulo-5-Funciones-y-Modularidad/800-resumen.html"));
});


// Modulo 6
router.get('/Modulos/modulo-6-Arrays-y-Punteros/100-1-concepto-y-declaracion-de-Arrays.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/modulo-6-Arrays-y-Punteros/100-1-concepto-y-declaracion-de-Arrays.html"));
});


router.get('/Modulos/modulo-6-Arrays-y-Punteros/101-progra.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/modulo-6-Arrays-y-Punteros/101-progra.html"));
});
router.get('/Modulos/modulo-6-Arrays-y-Punteros/200-2-Acceso-a-Elementos-Mediante-Indexacion.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/modulo-6-Arrays-y-Punteros/200-2-Acceso-a-Elementos-Mediante-Indexacion.html"));
});
//200-2-Acceso-a-Elementos-Mediante-Indexacion.html

router.get('/Modulos/modulo-6-Arrays-y-Punteros/201-progra.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/modulo-6-Arrays-y-Punteros/201-progra.html"));
});


router.get('/Modulos/modulo-6-Arrays-y-Punteros/300-3-Arrays-Bidimensionales-Matrices-y-su-Utilidad-.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/modulo-6-Arrays-y-Punteros/300-3-Arrays-Bidimensionales-Matrices-y-su-Utilidad-.html"));
});

router.get('/Modulos/modulo-6-Arrays-y-Punteros/301-progra.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/modulo-6-Arrays-y-Punteros/301-progra.html"));
});


router.get('/Modulos/modulo-6-Arrays-y-Punteros/400--4-Concepto-de-Puntero-y-Direccion-de-Memoria-.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/modulo-6-Arrays-y-Punteros/400--4-Concepto-de-Puntero-y-Direccion-de-Memoria-.html"));
});
router.get('/Modulos/modulo-6-Arrays-y-Punteros/401-preguntas.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/modulo-6-Arrays-y-Punteros/401-preguntas.html"));
});
router.get('/Modulos/modulo-6-Arrays-y-Punteros/500-5-Operadores-de-Punteros--y-&.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/modulo-6-Arrays-y-Punteros/500-5-Operadores-de-Punteros--y-&.html"));
});
router.get('/Modulos/modulo-6-Arrays-y-Punteros/501-preg.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/modulo-6-Arrays-y-Punteros/501-preg.html"));
});
router.get('/Modulos/modulo-6-Arrays-y-Punteros/600-6-Relacion-Fundamental-entre-Punteros-y-Arrays.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/modulo-6-Arrays-y-Punteros/600-6-Relacion-Fundamental-entre-Punteros-y-Arrays.html"));
});
router.get('/Modulos/modulo-6-Arrays-y-Punteros/601-pregunras.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/modulo-6-Arrays-y-Punteros/601-pregunras.html"));
});
router.get('/Modulos/modulo-6-Arrays-y-Punteros/700-proyexto.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/modulo-6-Arrays-y-Punteros/700-proyexto.html"));
});
router.get('/Modulos/modulo-6-Arrays-y-Punteros/800-resumen.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/modulo-6-Arrays-y-Punteros/800-resumen.html"));
});



// Modulo 7
router.get('/Modulos/modulo-7-Structs-y-Unions/100-1.-Concepto-de-Tipo-de-Dato-Definido-por-el-Usuario.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/modulo-7-Structs-y-Unions/100-1.-Concepto-de-Tipo-de-Dato-Definido-por-el-Usuario.html"));
});
router.get('/Modulos/modulo-7-Structs-y-Unions/101-preguntas.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/modulo-7-Structs-y-Unions/101-preguntas.html"));
});
router.get('/Modulos/modulo-7-Structs-y-Unions/200-2.-Declaracion-y-Uso-de-Structs-Estructuras.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/modulo-7-Structs-y-Unions/200-2.-Declaracion-y-Uso-de-Structs-Estructuras.html"));
});
router.get('/Modulos/modulo-7-Structs-y-Unions/201-progra.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/modulo-7-Structs-y-Unions/201-progra.html"));
});
router.get('/Modulos/modulo-7-Structs-y-Unions/300-3-Acceso-a-Miembros-de-Structs-Operador-punto--y-flecha--.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/modulo-7-Structs-y-Unions/300-3-Acceso-a-Miembros-de-Structs-Operador-punto--y-flecha--.html"));
});
router.get('/Modulos/modulo-7-Structs-y-Unions/301-progra.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/modulo-7-Structs-y-Unions/301-progra.html"));
});
router.get('/Modulos/modulo-7-Structs-y-Unions/400-4.-Arrays-de-Structs-Colecciones-Complejas.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/modulo-7-Structs-y-Unions/400-4.-Arrays-de-Structs-Colecciones-Complejas.html"));
});
router.get('/Modulos/modulo-7-Structs-y-Unions/401-progra-.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/modulo-7-Structs-y-Unions/401-progra-.html"));
});
router.get('/Modulos/modulo-7-Structs-y-Unions/500-5.-Concepto-y-Uso-de-Unions-para-Optimizacion-de-Memoria.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/modulo-7-Structs-y-Unions/500-5.-Concepto-y-Uso-de-Unions-para-Optimizacion-de-Memoria.html"));
});
router.get('/Modulos/modulo-7-Structs-y-Unions/501-progra-.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/modulo-7-Structs-y-Unions/501-progra-.html"));
});
router.get('/Modulos/modulo-7-Structs-y-Unions/600-6.-Campos-de-Bits-y-Alineacion-de-Datos-Concepto-Avanzado.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/modulo-7-Structs-y-Unions/600-6.-Campos-de-Bits-y-Alineacion-de-Datos-Concepto-Avanzado.html"));
});
router.get('/Modulos/modulo-7-Structs-y-Unions/601-preguntas.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/modulo-7-Structs-y-Unions/601-preguntas.html"));
});
router.get('/Modulos/modulo-7-Structs-y-Unions/700-proyecto.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/modulo-7-Structs-y-Unions/700-proyecto.html"));
});
router.get('/Modulos/modulo-7-Structs-y-Unions/701-respuesta-proyect.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/modulo-7-Structs-y-Unions/701-respuesta-proyect.html"));
});
router.get('/Modulos/modulo-7-Structs-y-Unions/800-resumen.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/modulo-7-Structs-y-Unions/800-resumen.html"));
});



// Modulo 8
router.get('/Modulos/modulo-8-Manipulacion-de-Archivos/100-1.-Concepto-de-Persistencia-de-Datos-y-Streams.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/modulo-8-Manipulacion-de-Archivos/100-1.-Concepto-de-Persistencia-de-Datos-y-Streams.html"));
});
router.get('/Modulos/modulo-8-Manipulacion-de-Archivos/101-preguntas.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/modulo-8-Manipulacion-de-Archivos/101-preguntas.html"));
});
router.get('/Modulos/modulo-8-Manipulacion-de-Archivos/200-2-Apertura-y-Cierre-de-Archivos-Manejo-de-flujo-FILE.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/modulo-8-Manipulacion-de-Archivos/200-2-Apertura-y-Cierre-de-Archivos-Manejo-de-flujo-FILE.html"));
});
router.get('/Modulos/modulo-8-Manipulacion-de-Archivos/201-progra.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/modulo-8-Manipulacion-de-Archivos/201-progra.html"));
});
router.get('/Modulos/modulo-8-Manipulacion-de-Archivos/300--Modos-de-Operacion-r-w--a--Lectura,-Escritura-y-Anexar.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/modulo-8-Manipulacion-de-Archivos/300--Modos-de-Operacion-r-w--a--Lectura,-Escritura-y-Anexar.html"));
});///Modulos/modulo-8-Manipulacion-de-Archivos/300-3-Acceso-a-Miembros-de-Structs-Operador-punto--y-flecha--
router.get('/Modulos/modulo-8-Manipulacion-de-Archivos/301-progra.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/modulo-8-Manipulacion-de-Archivos/301-progra.html"));
});
router.get('/Modulos/modulo-8-Manipulacion-de-Archivos/400-4-Manipulacion-de-Archivos-de-Texto.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/modulo-8-Manipulacion-de-Archivos/400-4-Manipulacion-de-Archivos-de-Texto.html"));
});
router.get('/Modulos/modulo-8-Manipulacion-de-Archivos/401-progra.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/modulo-8-Manipulacion-de-Archivos/401-progra.html"));
});
router.get('/Modulos/modulo-8-Manipulacion-de-Archivos/500-5.-Manipulacion-de-Archivos-Binarios.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/modulo-8-Manipulacion-de-Archivos/500-5.-Manipulacion-de-Archivos-Binarios.html"));
});
router.get('/Modulos/modulo-8-Manipulacion-de-Archivos/501-progra-.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/modulo-8-Manipulacion-de-Archivos/501-progra-.html"));
});
router.get('/Modulos/modulo-8-Manipulacion-de-Archivos/600-6-Deteccion-de-Errores-y-Comprobacion-del-Fin-de-Archivo.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/modulo-8-Manipulacion-de-Archivos/600-6-Deteccion-de-Errores-y-Comprobacion-del-Fin-de-Archivo.html"));
});
router.get('/Modulos/modulo-8-Manipulacion-de-Archivos/601-progra.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/modulo-8-Manipulacion-de-Archivos/601-progra.html"));
});
router.get('/Modulos/modulo-8-Manipulacion-de-Archivos/700-proyecto.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/modulo-8-Manipulacion-de-Archivos/700-proyecto.html"));
});
router.get('/Modulos/modulo-8-Manipulacion-de-Archivos/750-proyecto-resultado.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/modulo-8-Manipulacion-de-Archivos/750-proyecto-resultado.html"));
});
router.get('/Modulos/modulo-8-Manipulacion-de-Archivos/800-Resumen.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/modulo-8-Manipulacion-de-Archivos/800-Resumen.html"));
});


// Modulo 9
router.get('/Modulos/modulo-9-Asignacion-de-Memoria-Dinamica/100-1.-Diferencia-entre-Memoria-Estatica-y-Memoria-Dinamica-Heap.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/modulo-9-Asignacion-de-Memoria-Dinamica/100-1.-Diferencia-entre-Memoria-Estatica-y-Memoria-Dinamica-Heap.html"));
});
router.get('/Modulos/modulo-9-Asignacion-de-Memoria-Dinamica/150-progra.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/modulo-9-Asignacion-de-Memoria-Dinamica/150-progra.html"));
});
router.get('/Modulos/modulo-9-Asignacion-de-Memoria-Dinamica/200-2.-Asignacion-de-Memoria-la-funcion-malloc-.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/modulo-9-Asignacion-de-Memoria-Dinamica/200-2.-Asignacion-de-Memoria-la-funcion-malloc-.html"));
});
router.get('/Modulos/modulo-9-Asignacion-de-Memoria-Dinamica/250-ejercicios.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/modulo-9-Asignacion-de-Memoria-Dinamica/250-ejercicios.html"));
});
router.get('/Modulos/modulo-9-Asignacion-de-Memoria-Dinamica/300-3-Redimension-de-Memoria-la-funcion-realloc.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/modulo-9-Asignacion-de-Memoria-Dinamica/300-3-Redimension-de-Memoria-la-funcion-realloc.html"));
});
router.get('/Modulos/modulo-9-Asignacion-de-Memoria-Dinamica/350-ejercicios.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/modulo-9-Asignacion-de-Memoria-Dinamica/350-ejercicios.html"));
});
router.get('/Modulos/modulo-9-Asignacion-de-Memoria-Dinamica/400-4.-Inicializacion-de-Memoria-la-funcion-calloc.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/modulo-9-Asignacion-de-Memoria-Dinamica/400-4.-Inicializacion-de-Memoria-la-funcion-calloc.html"));
});
router.get('/Modulos/modulo-9-Asignacion-de-Memoria-Dinamica/450-preguntas.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/modulo-9-Asignacion-de-Memoria-Dinamica/450-preguntas.html"));
});
router.get('/Modulos/modulo-9-Asignacion-de-Memoria-Dinamica/500-5.-Liberacion-de-Memoria-la-funcion-free.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/modulo-9-Asignacion-de-Memoria-Dinamica/500-5.-Liberacion-de-Memoria-la-funcion-free.html"));
});
router.get('/Modulos/modulo-9-Asignacion-de-Memoria-Dinamica/550-problemas.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/modulo-9-Asignacion-de-Memoria-Dinamica/550-problemas.html"));
});
router.get('/Modulos/modulo-9-Asignacion-de-Memoria-Dinamica/600-6.-Fugas-de-Memoria-Memory-Leaks-y-Buenas-Practicas.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/modulo-9-Asignacion-de-Memoria-Dinamica/600-6.-Fugas-de-Memoria-Memory-Leaks-y-Buenas-Practicas.html"));
});
router.get('/Modulos/modulo-9-Asignacion-de-Memoria-Dinamica/650-ejercicios.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/modulo-9-Asignacion-de-Memoria-Dinamica/650-ejercicios.html"));
});
router.get('/Modulos/modulo-9-Asignacion-de-Memoria-Dinamica/700-proyecto-.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/modulo-9-Asignacion-de-Memoria-Dinamica/700-proyecto-.html"));
});
router.get('/Modulos/modulo-9-Asignacion-de-Memoria-Dinamica/750-proyecto-respuesta.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/modulo-9-Asignacion-de-Memoria-Dinamica/750-proyecto-respuesta.html"));
});
router.get('/Modulos/modulo-9-Asignacion-de-Memoria-Dinamica/800-resumen.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/modulo-9-Asignacion-de-Memoria-Dinamica/800-resumen.html"));
});

// Modulo 10

router.get('/Modulos/modulo-10-Listas-Enlazadas/100-1.-El-Problema-de-los-Arrays-de-Tamanyo-Fijo-.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/modulo-10-Listas-Enlazadas/100-1.-El-Problema-de-los-Arrays-de-Tamanyo-Fijo-.html"));
});

router.get('/Modulos/modulo-10-Listas-Enlazadas/150.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/modulo-10-Listas-Enlazadas/150.html"));
});
router.get('/Modulos/modulo-10-Listas-Enlazadas/200-2.-Estructura-de-un-Nodo-Dato-y-Puntero-de-Enlace.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/modulo-10-Listas-Enlazadas/200-2.-Estructura-de-un-Nodo-Dato-y-Puntero-de-Enlace.html"));
});
router.get('/Modulos/modulo-10-Listas-Enlazadas/250-ejercicios.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/modulo-10-Listas-Enlazadas/250-ejercicios.html"));
});
router.get('/Modulos/modulo-10-Listas-Enlazadas/300-3.-Creacion-de-Listas-Enlazadas-Simples.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/modulo-10-Listas-Enlazadas/300-3.-Creacion-de-Listas-Enlazadas-Simples.html"));
});
router.get('/Modulos/modulo-10-Listas-Enlazadas/350-progra.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/modulo-10-Listas-Enlazadas/350-progra.html"));
});
router.get('/Modulos/modulo-10-Listas-Enlazadas/400-4.-Operaciones-Fundamentales-Insercion-Inicio,-Fin,-Medio.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/modulo-10-Listas-Enlazadas/400-4.-Operaciones-Fundamentales-Insercion-Inicio,-Fin,-Medio.html"));
});
router.get('/Modulos/modulo-10-Listas-Enlazadas/450-ejercicios.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/modulo-10-Listas-Enlazadas/450-ejercicios.html"));
});

router.get('/Modulos/modulo-10-Listas-Enlazadas/500-5.-Operaciones-Fundamentales-Eliminacion-y-Recorrido.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/modulo-10-Listas-Enlazadas/500-5.-Operaciones-Fundamentales-Eliminacion-y-Recorrido.html"));
});
router.get('/Modulos/modulo-10-Listas-Enlazadas/550-ejercicios.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/modulo-10-Listas-Enlazadas/550-ejercicios.html"));
});
router.get('/Modulos/modulo-10-Listas-Enlazadas/600-6.-Aplicacion-Implementacion-Basica-de-una-Pila-o-Cola.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/modulo-10-Listas-Enlazadas/600-6.-Aplicacion-Implementacion-Basica-de-una-Pila-o-Cola.html"));
});
router.get('/Modulos/modulo-10-Listas-Enlazadas/650-ejercicios.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/modulo-10-Listas-Enlazadas/650-ejercicios.html"));
});
router.get('/Modulos/modulo-10-Listas-Enlazadas/700-proyecto.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/modulo-10-Listas-Enlazadas/700-proyecto.html"));
});
router.get('/Modulos/modulo-10-Listas-Enlazadas/750-proyecto-solucion.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/modulo-10-Listas-Enlazadas/750-proyecto-solucion.html"));
});
router.get('/Modulos/modulo-10-Listas-Enlazadas/800-Resumen.html',isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/protected_html/Modulos/modulo-10-Listas-Enlazadas/800-Resumen.html"));
});


module.exports = router;