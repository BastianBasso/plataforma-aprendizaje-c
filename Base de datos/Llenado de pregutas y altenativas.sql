--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5
-- Dumped by pg_dump version 17.5

-- Started on 2026-03-03 20:42:32

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 4852 (class 0 OID 57748)
-- Dependencies: 224
-- Data for Name: leccion; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (1100, 1, 'Introduccion a la programacion y Algoritmos', 'Contenido', 100, 'Teoria');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (1101, 1, 'Preguntas introduccion', 'Evaluación', 101, 'Quiz');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (1200, 1, 'Historia Proposito y aplicaciones del lenguaje C', 'Contenido', 200, 'Teoria');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (1201, 1, 'Preguntas respuesta', 'Evaluación', 201, 'Quiz');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (1300, 1, 'El proceso de compilacion y el ciclo de vida', 'Contenido', 300, 'Teoria');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (1301, 1, 'Preguntas respuestas', 'Evaluación', 301, 'Quiz');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (1400, 1, 'Estructura basica de un programa C', 'Contenido', 400, 'Teoria');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (1401, 1, 'Preguntas respuestas', 'Evaluación', 401, 'Quiz');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (1500, 1, 'Pensamiento Computacional', 'Contenido', 500, 'Teoria');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (1501, 1, 'Preguntas respuestas', 'Evaluación', 501, 'Quiz');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (1600, 1, 'Primeros pasos y la funcion de salida basica', 'Contenido', 600, 'Teoria');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (1601, 1, 'Q A', 'Evaluación', 601, 'Quiz');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (1800, 1, 'Resumen', 'Contenido', 800, 'Teoria');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (2100, 2, 'El Concepto de Dato y la Gestion de Memoria', 'Contenido', 100, 'Teoria');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (2101, 2, 'Preg resp', 'Evaluación', 101, 'Quiz');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (2200, 2, 'Clasificacion de Tipos Primitivos', 'Contenido', 200, 'Teoria');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (2201, 2, 'Preguntas progra', 'Evaluación', 201, 'Quiz');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (2300, 2, 'Declaración, Inicialización y Uso', 'Contenido', 300, 'Teoria');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (2301, 2, 'Preg progra', 'Evaluación', 301, 'Quiz');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (2400, 2, 'Variables y Constantes', 'Contenido', 400, 'Teoria');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (2401, 2, 'Preg resp', 'Evaluación', 401, 'Quiz');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (2500, 2, 'Límites y Rangos', 'Contenido', 500, 'Teoria');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (2501, 2, 'Programas', 'Evaluación', 501, 'Quiz');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (2600, 2, 'Declaración y Buenas Prácticas', 'Contenido', 600, 'Teoria');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (2601, 2, 'Progra', 'Evaluación', 601, 'Quiz');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (2700, 2, 'Proyecto', 'Evaluación', 700, 'Quiz');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (2800, 2, 'Resumen', 'Contenido', 800, 'Teoria');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (3100, 3, 'Operadores Aritmeticos y Asignacion', 'Contenido', 100, 'Teoria');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (3101, 3, 'Progra', 'Evaluación', 101, 'Quiz');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (3200, 3, 'Operadores Relacionales y Logicos', 'Contenido', 200, 'Teoria');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (3201, 3, 'Preguntas', 'Evaluación', 201, 'Quiz');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (3300, 3, 'Prioridad de operadores', 'Contenido', 300, 'Teoria');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (3301, 3, 'Ejercicios', 'Evaluación', 301, 'Quiz');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (3400, 3, 'Entrada Estandar de Datos', 'Contenido', 400, 'Teoria');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (3401, 3, 'Preg', 'Evaluación', 401, 'Quiz');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (3500, 3, 'Salida Estandar de Datos', 'Contenido', 500, 'Teoria');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (3501, 3, 'Preguntas', 'Evaluación', 501, 'Quiz');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (3600, 3, 'Implementacion practica de un ciclo IPO', 'Contenido', 600, 'Teoria');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (3601, 3, 'Preguntas', 'Evaluación', 601, 'Quiz');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (3700, 3, 'Proyecto', 'Evaluación', 700, 'Quiz');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (3800, 3, 'Resumen', 'Contenido', 800, 'Teoria');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (4100, 4, 'El Flujo de Ejecución Lineal', 'Contenido', 100, 'Teoria');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (4101, 4, 'Preguntas', 'Evaluación', 101, 'Quiz');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (4200, 4, 'Estructuras Condicionales Simples', 'Contenido', 200, 'Teoria');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (4201, 4, 'Progra', 'Evaluación', 201, 'Quiz');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (4400, 4, 'Bucles de Repetición por Contador', 'Contenido', 400, 'Teoria');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (4500, 4, 'Bucles de Repetición Condicionales', 'Contenido', 500, 'Teoria');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (4501, 4, 'Progra', 'Evaluación', 501, 'Quiz');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (4600, 4, 'Control de bucles', 'Contenido', 600, 'Teoria');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (4601, 4, 'Progra', 'Evaluación', 601, 'Quiz');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (4700, 4, 'Proyecto', 'Evaluación', 700, 'Quiz');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (4800, 4, 'Resumen', 'Contenido', 800, 'Teoria');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (5100, 5, 'Concepto de Modularidad', 'Contenido', 100, 'Teoria');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (5101, 5, 'Preguntas', 'Evaluación', 101, 'Quiz');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (5200, 5, 'Definición Declaración y Llamada', 'Contenido', 200, 'Teoria');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (5201, 5, 'Progra', 'Evaluación', 201, 'Quiz');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (5300, 5, 'Comunicación de Datos', 'Contenido', 300, 'Teoria');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (5301, 5, 'Progra', 'Evaluación', 301, 'Quiz');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (5400, 5, 'Valores de Retorno', 'Contenido', 400, 'Teoria');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (5401, 5, 'Progra', 'Evaluación', 401, 'Quiz');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (5500, 5, 'Ámbito de las Variables', 'Contenido', 500, 'Teoria');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (5501, 5, 'Progra', 'Evaluación', 501, 'Quiz');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (5600, 5, 'Creación de Librerías Simples', 'Contenido', 600, 'Teoria');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (5601, 5, 'Progra', 'Evaluación', 601, 'Quiz');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (5700, 5, 'Proyecto', 'Evaluación', 700, 'Quiz');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (5800, 5, 'Resumen', 'Contenido', 800, 'Teoria');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (6100, 6, 'Concepto y declaracion de Arrays', 'Contenido', 100, 'Teoria');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (6101, 6, 'Progra', 'Evaluación', 101, 'Quiz');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (6200, 6, 'Acceso a Elementos Mediante Indexación', 'Contenido', 200, 'Teoria');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (6201, 6, 'Progra', 'Evaluación', 201, 'Quiz');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (6300, 6, 'Arrays Bidimensionales', 'Contenido', 300, 'Teoria');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (6301, 6, 'Progra', 'Evaluación', 301, 'Quiz');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (6400, 6, 'Concepto de Puntero', 'Contenido', 400, 'Teoria');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (6401, 6, 'Preguntas', 'Evaluación', 401, 'Quiz');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (6500, 6, 'Operadores de Punteros', 'Contenido', 500, 'Teoria');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (6501, 6, 'Preg', 'Evaluación', 501, 'Quiz');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (6600, 6, 'Relación entre Punteros y Arrays', 'Contenido', 600, 'Teoria');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (6601, 6, 'Preguntas', 'Evaluación', 601, 'Quiz');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (6700, 6, 'Proyecto', 'Evaluación', 700, 'Quiz');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (6800, 6, 'Resumen', 'Contenido', 800, 'Teoria');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (7100, 7, 'Concepto de Tipo de Dato', 'Contenido', 100, 'Teoria');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (7101, 7, 'Preguntas', 'Evaluación', 101, 'Quiz');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (7200, 7, 'Declaración y Uso de Structs', 'Contenido', 200, 'Teoria');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (7201, 7, 'Progra', 'Evaluación', 201, 'Quiz');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (7300, 7, 'Acceso a Miembros de Structs', 'Contenido', 300, 'Teoria');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (7301, 7, 'Progra', 'Evaluación', 301, 'Quiz');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (7400, 7, 'Arrays de Structs', 'Contenido', 400, 'Teoria');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (7401, 7, 'Progra', 'Evaluación', 401, 'Quiz');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (7500, 7, 'Concepto y Uso de Unions', 'Contenido', 500, 'Teoria');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (7501, 7, 'Progra', 'Evaluación', 501, 'Quiz');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (7600, 7, 'Campos de Bits y Alineación', 'Contenido', 600, 'Teoria');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (7601, 7, 'Preguntas', 'Evaluación', 601, 'Quiz');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (7700, 7, 'Proyecto', 'Evaluación', 700, 'Quiz');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (7701, 7, 'Respuesta proyect', 'Evaluación', 701, 'Teoria');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (7800, 7, 'Resumen', 'Contenido', 800, 'Teoria');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (8100, 8, 'Persistencia de Datos y Streams', 'Contenido', 100, 'Teoria');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (8101, 8, 'Preguntas', 'Evaluación', 101, 'Quiz');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (8200, 8, 'Apertura y Cierre de Archivos', 'Contenido', 200, 'Teoria');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (8201, 8, 'Progra', 'Evaluación', 201, 'Quiz');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (8300, 8, 'Modos de Operación Lectura', 'Contenido', 300, 'Teoria');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (8301, 8, 'Progra', 'Evaluación', 301, 'Quiz');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (8400, 8, 'Manipulación de Archivos de Texto', 'Contenido', 400, 'Teoria');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (8401, 8, 'Progra', 'Evaluación', 401, 'Quiz');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (8500, 8, 'Manipulación de Archivos Binarios', 'Contenido', 500, 'Teoria');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (8501, 8, 'Progra', 'Evaluación', 501, 'Quiz');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (8600, 8, 'Detección de Errores', 'Contenido', 600, 'Teoria');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (8601, 8, 'Progra', 'Evaluación', 601, 'Quiz');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (8700, 8, 'Proyecto', 'Evaluación', 700, 'Quiz');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (8750, 8, 'Proyecto resultado', 'Contenido', 750, 'Teoria');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (8800, 8, 'Resumen', 'Contenido', 800, 'Teoria');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (9100, 9, 'Diferencia entre Memoria Estática y Dinámica', 'Contenido', 100, 'Teoria');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (9150, 9, 'Progra', 'Evaluación', 150, 'Quiz');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (9200, 9, 'Asignación de Memoria la función malloc', 'Contenido', 200, 'Teoria');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (9250, 9, 'Ejercicios', 'Evaluación', 250, 'Quiz');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (9300, 9, 'Redimensión de Memoria', 'Contenido', 300, 'Teoria');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (9350, 9, 'Ejercicios', 'Evaluación', 350, 'Quiz');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (9400, 9, 'Inicialización de Memoria', 'Contenido', 400, 'Teoria');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (9450, 9, 'Preguntas', 'Evaluación', 450, 'Quiz');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (9500, 9, 'Liberación de Memoria la función free', 'Contenido', 500, 'Teoria');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (9550, 9, 'Problemas', 'Evaluación', 550, 'Quiz');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (9600, 9, 'Fugas de Memoria', 'Contenido', 600, 'Teoria');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (9650, 9, 'Ejercicios', 'Evaluación', 650, 'Quiz');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (9700, 9, 'Proyecto', 'Evaluación', 700, 'Quiz');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (9750, 9, 'Proyecto respuesta', 'Contenido', 750, 'Teoria');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (9800, 9, 'Resumen', 'Contenido', 800, 'Teoria');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (10100, 10, 'El Problema de los Arrays', 'Contenido', 100, 'Teoria');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (10150, 10, 'Progra', 'Evaluación', 150, 'Quiz');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (10200, 10, 'Estructura de un Nodo', 'Contenido', 200, 'Teoria');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (10250, 10, 'Ejercicios', 'Evaluación', 250, 'Quiz');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (10300, 10, 'Creación de Listas Enlazadas Simples', 'Contenido', 300, 'Teoria');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (10350, 10, 'Progra', 'Evaluación', 350, 'Quiz');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (10400, 10, 'Operaciones Fundamentales Inserción', 'Contenido', 400, 'Teoria');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (10450, 10, 'Ejercicios', 'Evaluación', 450, 'Quiz');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (10500, 10, 'Operaciones Fundamentales Eliminación', 'Contenido', 500, 'Teoria');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (10550, 10, 'Ejercicios', 'Evaluación', 550, 'Quiz');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (10600, 10, 'Aplicación Implementación de una Pila', 'Contenido', 600, 'Teoria');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (10650, 10, 'Ejercicios', 'Evaluación', 650, 'Quiz');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (10700, 10, 'Proyecto', 'Evaluación', 700, 'Quiz');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (10750, 10, 'Proyecto solucion', 'Contenido', 750, 'Teoria');
INSERT INTO public.leccion (id, modulo_id, titulo, contenido, orden, tipo_contenido) VALUES (10800, 10, 'Resumen', 'Contenido', 800, 'Teoria');


--
-- TOC entry 4854 (class 0 OID 65975)
-- Dependencies: 235
-- Data for Name: pregunta; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.pregunta (id, leccion_id, texto_pregunta, respuesta_correcta, puntuacion, tipo_conocimiento) VALUES (110101, 1101, '¿Cuál es la definición más precisa de Programación?', 'Instrucciones para resolver un problema', 10, 'Conceptos');
INSERT INTO public.pregunta (id, leccion_id, texto_pregunta, respuesta_correcta, puntuacion, tipo_conocimiento) VALUES (110102, 1101, '¿Cuál es el orden correcto de las tres partes del ciclo de procesamiento de información (Modelo IPO)?', 'Entrada -> Proceso -> Salida', 10, 'Lógica');
INSERT INTO public.pregunta (id, leccion_id, texto_pregunta, respuesta_correcta, puntuacion, tipo_conocimiento) VALUES (110103, 1101, '¿Qué característica de un algoritmo se incumple si el proceso se repite sin llegar a un resultado final?', 'Finito (Limitado)', 10, 'Teoría');
INSERT INTO public.pregunta (id, leccion_id, texto_pregunta, respuesta_correcta, puntuacion, tipo_conocimiento) VALUES (110104, 1101, '¿Cuál de las siguientes analogías describe mejor el concepto de Algoritmo en programación?', 'Una receta de cocina', 10, 'Analogías');
INSERT INTO public.pregunta (id, leccion_id, texto_pregunta, respuesta_correcta, puntuacion, tipo_conocimiento) VALUES (110105, 1101, '¿En qué fase de la resolución de problemas se utiliza el Pseudocódigo o los Diagramas de Flujo?', 'Diseño del Algoritmo', 10, 'Metodología');
INSERT INTO public.pregunta (id, leccion_id, texto_pregunta, respuesta_correcta, puntuacion, tipo_conocimiento) VALUES (110106, 1101, '¿Cuál es el objetivo principal de la fase de Prueba y Depuración (Debugging)?', 'Corregir errores (bugs)', 10, 'Pruebas');
INSERT INTO public.pregunta (id, leccion_id, texto_pregunta, respuesta_correcta, puntuacion, tipo_conocimiento) VALUES (110107, 1101, '¿Cuál es la herramienta de representación de algoritmos que utiliza símbolos estandarizados (óvalos, rombos)?', 'Diagrama de Flujo', 10, 'Herramientas');
INSERT INTO public.pregunta (id, leccion_id, texto_pregunta, respuesta_correcta, puntuacion, tipo_conocimiento) VALUES (110108, 1101, 'En el contexto de los conceptos fundamentales, ¿qué representan las Variables?', 'Espacios de memoria para datos', 10, 'Conceptos');
INSERT INTO public.pregunta (id, leccion_id, texto_pregunta, respuesta_correcta, puntuacion, tipo_conocimiento) VALUES (110109, 1101, 'La cualidad "Definido" de un algoritmo implica que:', 'Mismo input produce mismo output', 10, 'Teoría');
INSERT INTO public.pregunta (id, leccion_id, texto_pregunta, respuesta_correcta, puntuacion, tipo_conocimiento) VALUES (110110, 1101, 'Las Estructuras de Control (Condicionales e Iterativas) son fundamentales porque:', 'Permiten tomar decisiones y repetir', 10, 'Lógica');
INSERT INTO public.pregunta (id, leccion_id, texto_pregunta, respuesta_correcta, puntuacion, tipo_conocimiento) VALUES (120101, 1201, '¿Quién es reconocido como el creador principal del Lenguaje C en los Laboratorios Bell a principios de la década de 1970?', 'Dennis Ritchie', 10, 'Historia');
INSERT INTO public.pregunta (id, leccion_id, texto_pregunta, respuesta_correcta, puntuacion, tipo_conocimiento) VALUES (120102, 1201, '¿Cuál fue el propósito fundamental e inmediato que llevó al desarrollo inicial del Lenguaje C?', 'Reescribir el núcleo (kernel) del sistema operativo UNIX.', 10, 'Propósito');
INSERT INTO public.pregunta (id, leccion_id, texto_pregunta, respuesta_correcta, puntuacion, tipo_conocimiento) VALUES (120103, 1201, '¿Cómo se clasifica el Lenguaje C en términos de su nivel, dado que combina control de hardware con estructuras legibles?', 'Lenguaje de nivel medio.', 10, 'Nivel');
INSERT INTO public.pregunta (id, leccion_id, texto_pregunta, respuesta_correcta, puntuacion, tipo_conocimiento) VALUES (120104, 1201, '¿Cuál fue la limitación principal del Lenguaje Ensamblador que C superó para reescribir UNIX y ganar popularidad?', 'Su falta de portabilidad entre diferentes arquitecturas de hardware.', 10, 'Portabilidad');
INSERT INTO public.pregunta (id, leccion_id, texto_pregunta, respuesta_correcta, puntuacion, tipo_conocimiento) VALUES (120105, 1201, '¿Qué característica clave que no poseía el Lenguaje B añadió Dennis Ritchie a C?', 'La manipulación eficiente de tipos de datos.', 10, 'Evolución');
INSERT INTO public.pregunta (id, leccion_id, texto_pregunta, respuesta_correcta, puntuacion, tipo_conocimiento) VALUES (120106, 1201, '¿Cuál es el propósito principal de la estandarización de C, como la realizada por ANSI C (C89/C90)?', 'Garantizar que el código C funcione de manera consistente en diferentes máquinas y compiladores.', 10, 'Estandarización');
INSERT INTO public.pregunta (id, leccion_id, texto_pregunta, respuesta_correcta, puntuacion, tipo_conocimiento) VALUES (120107, 1201, 'El alto rendimiento y la eficiencia de recursos de C se deben principalmente a:', 'Su cercanía al hardware y el control manual sobre la memoria.', 10, 'Rendimiento');
INSERT INTO public.pregunta (id, leccion_id, texto_pregunta, respuesta_correcta, puntuacion, tipo_conocimiento) VALUES (120108, 1201, 'En el área de Videojuegos de alto rendimiento, el conocimiento de C es fundamental porque los motores gráficos y de física (que usan C++) heredan de C:', 'La eficiencia y el control de bajo nivel sobre la memoria.', 10, 'Aplicaciones');
INSERT INTO public.pregunta (id, leccion_id, texto_pregunta, respuesta_correcta, puntuacion, tipo_conocimiento) VALUES (120109, 1201, 'Además de los Sistemas Operativos, C es el lenguaje predilecto para los Sistemas Embebidos y firmware (IoT) debido a:', 'Su capacidad para manipular directamente el hardware y su eficiencia en el uso de recursos limitados.', 10, 'Embebidos');
INSERT INTO public.pregunta (id, leccion_id, texto_pregunta, respuesta_correcta, puntuacion, tipo_conocimiento) VALUES (120110, 1201, '¿Cuál de las siguientes infraestructuras de software se construyó inicialmente en C para garantizar su velocidad y eficiencia?', 'Los intérpretes principales de lenguajes como Python y PHP.', 10, 'Infraestructura');
INSERT INTO public.pregunta (id, leccion_id, texto_pregunta, respuesta_correcta, puntuacion, tipo_conocimiento) VALUES (130101, 1301, '¿Cuál es la principal ventaja de un lenguaje compilado (como C) frente a un lenguaje interpretado (como Python)?', 'La velocidad de ejecución es superior, ya que la traducción a código máquina se realiza una sola vez antes de la ejecución.', 10, 'Compilación');
INSERT INTO public.pregunta (id, leccion_id, texto_pregunta, respuesta_correcta, puntuacion, tipo_conocimiento) VALUES (130102, 1301, '¿Cuál es el propósito del Preprocesador en la Fase I de la compilación de C?', 'Manejar directivas como #include y #define, copiando y pegando contenido o realizando sustituciones de texto.', 10, 'Preprocesador');
INSERT INTO public.pregunta (id, leccion_id, texto_pregunta, respuesta_correcta, puntuacion, tipo_conocimiento) VALUES (130103, 1301, '¿Qué herramienta o programa es el responsable de traducir el Código Ensamblador (.s) en Código Objeto binario (.o)?', 'El Ensamblador', 10, 'Herramientas');
INSERT INTO public.pregunta (id, leccion_id, texto_pregunta, respuesta_correcta, puntuacion, tipo_conocimiento) VALUES (130104, 1301, '¿Qué ocurre en la Fase II: Compilación que lleva a que el compilador detenga el proceso y muestre un "Error de Compilación"?', 'El código incumple las reglas sintácticas de C (ej. falta un punto y coma ;).', 10, 'Errores');
INSERT INTO public.pregunta (id, leccion_id, texto_pregunta, respuesta_correcta, puntuacion, tipo_conocimiento) VALUES (130105, 1301, 'Si un programador olvida la directiva #include <stdio.h> y usa la función printf(), ¿en qué fase del ciclo de compilación es más probable que ocurra un error?', 'Enlazado (Linking) (Fase IV)', 10, 'Enlazado');
INSERT INTO public.pregunta (id, leccion_id, texto_pregunta, respuesta_correcta, puntuacion, tipo_conocimiento) VALUES (130106, 1301, '¿Qué es un IDE (Entorno de Desarrollo Integrado) en el contexto de C?', 'Un software que agrupa el editor de código, el compilador, el enlazador y el depurador en una sola interfaz.', 10, 'Herramientas');
INSERT INTO public.pregunta (id, leccion_id, texto_pregunta, respuesta_correcta, puntuacion, tipo_conocimiento) VALUES (130107, 1301, '¿Cuál es el resultado directo de la Fase IV: Enlazado (Linking)?', 'El Programa Ejecutable (Ej. .exe o binario final).', 10, 'Enlazado');
INSERT INTO public.pregunta (id, leccion_id, texto_pregunta, respuesta_correcta, puntuacion, tipo_conocimiento) VALUES (130108, 1301, '¿Qué representa el archivo con extensión .s en el ciclo de compilación de C?', 'El código Ensamblador, resultado de la traducción del Compilador.', 10, 'Artefactos');
INSERT INTO public.pregunta (id, leccion_id, texto_pregunta, respuesta_correcta, puntuacion, tipo_conocimiento) VALUES (130109, 1301, 'Un Error de Ejecución (Runtime Error) se diferencia de un Error de Compilación en que:', 'El programa genera el archivo ejecutable, pero falla o produce resultados incorrectos mientras está siendo usado por el usuario.', 10, 'Errores');
INSERT INTO public.pregunta (id, leccion_id, texto_pregunta, respuesta_correcta, puntuacion, tipo_conocimiento) VALUES (130110, 1301, 'La herramienta Enlazador (Linker) tiene como función esencial:', 'Combinar el código objeto de nuestro programa con las funciones binarias de las librerías externas (como las de stdio.h).', 10, 'Enlazado');
INSERT INTO public.pregunta (id, leccion_id, texto_pregunta, respuesta_correcta, puntuacion, tipo_conocimiento) VALUES (140101, 1401, '¿Cuál es la extensión de archivo estándar utilizada para los archivos de código fuente escritos en Lenguaje C?', '.c', 10, 'Archivos');
INSERT INTO public.pregunta (id, leccion_id, texto_pregunta, respuesta_correcta, puntuacion, tipo_conocimiento) VALUES (140102, 1401, 'La directiva del preprocesador #include <stdio.h> es necesaria principalmente porque proporciona funciones para:', 'La interacción básica de Entrada y Salida (como printf() y scanf()).', 10, 'stdio');
INSERT INTO public.pregunta (id, leccion_id, texto_pregunta, respuesta_correcta, puntuacion, tipo_conocimiento) VALUES (140103, 1401, '¿Cuál es el rol de la función main() dentro de un programa C?', 'Es el punto de entrada y salida obligatorio, donde el sistema operativo comienza la ejecución.', 10, 'main');
INSERT INTO public.pregunta (id, leccion_id, texto_pregunta, respuesta_correcta, puntuacion, tipo_conocimiento) VALUES (140104, 1401, 'En la declaración de la función principal, int main(void), ¿qué representa el prefijo int?', 'El tipo de dato (entero) que se devuelve al sistema operativo como código de estado.', 10, 'main');
INSERT INTO public.pregunta (id, leccion_id, texto_pregunta, respuesta_correcta, puntuacion, tipo_conocimiento) VALUES (140105, 1401, '¿Qué par de símbolos se utiliza para definir el Bloque de Código o el cuerpo de la función main()?', '{} (Llaves)', 10, 'Sintaxis');
INSERT INTO public.pregunta (id, leccion_id, texto_pregunta, respuesta_correcta, puntuacion, tipo_conocimiento) VALUES (140106, 1401, '¿Qué símbolo debe usarse obligatoriamente para terminar una sentencia (una instrucción completa) dentro de un bloque de código C?', 'Punto y coma ;', 10, 'Sintaxis');
INSERT INTO public.pregunta (id, leccion_id, texto_pregunta, respuesta_correcta, puntuacion, tipo_conocimiento) VALUES (140107, 1401, '¿Cuál es el significado convencional de la sentencia return 0; al final de la función main()?', 'El programa ha finalizado su ejecución de manera exitosa.', 10, 'return');
INSERT INTO public.pregunta (id, leccion_id, texto_pregunta, respuesta_correcta, puntuacion, tipo_conocimiento) VALUES (140108, 1401, 'Si un programa C finaliza retornando un valor distinto de cero (ej. return 1;), ¿qué convención se utiliza para comunicar este estado al sistema operativo?', 'Que ocurrió un fallo o un error durante su ejecución.', 10, 'return');
INSERT INTO public.pregunta (id, leccion_id, texto_pregunta, respuesta_correcta, puntuacion, tipo_conocimiento) VALUES (140109, 1401, '¿Cuál es la principal característica de los comentarios (// o /* ... */) respecto al proceso de compilación?', 'Son ignorados y eliminados completamente por el Preprocesador, sin afectar el ejecutable.', 10, 'Comentarios');
INSERT INTO public.pregunta (id, leccion_id, texto_pregunta, respuesta_correcta, puntuacion, tipo_conocimiento) VALUES (140110, 1401, 'Si un proyecto de C es grande y complejo, ¿por qué es recomendable organizarlo en múltiples archivos fuente (.c) en lugar de uno solo?', 'Para mejorar la modularidad, facilitar el mantenimiento y la colaboración en equipo.', 10, 'Modularidad');
INSERT INTO public.pregunta (id, leccion_id, texto_pregunta, respuesta_correcta, puntuacion, tipo_conocimiento) VALUES (150101, 1501, '¿Qué es el Pensamiento Computacional (PC) en esencia?', 'Un proceso mental para formular problemas y soluciones que pueden ser ejecutadas por una computadora.', 10, 'Pensamiento Computacional');
INSERT INTO public.pregunta (id, leccion_id, texto_pregunta, respuesta_correcta, puntuacion, tipo_conocimiento) VALUES (150102, 1501, '¿Cuál de las siguientes define mejor la técnica de Descomposición?', 'Dividir un problema complejo en subproblemas más pequeños, manejables e independientes.', 10, 'Descomposición');
INSERT INTO public.pregunta (id, leccion_id, texto_pregunta, respuesta_correcta, puntuacion, tipo_conocimiento) VALUES (150103, 1501, 'En el ejemplo del cálculo de la nómina, si el cálculo de impuestos es incorrecto, la Descomposición permite al programador:', 'Revisar y corregir únicamente el módulo o función CalcularImpuestos().', 10, 'Descomposición');
INSERT INTO public.pregunta (id, leccion_id, texto_pregunta, respuesta_correcta, puntuacion, tipo_conocimiento) VALUES (150104, 1501, '¿Cuál es el principal beneficio de la Descomposición en el desarrollo de software?', 'Mejora la modularidad, facilita la depuración (debugging) y permite la colaboración.', 10, 'Descomposición');
INSERT INTO public.pregunta (id, leccion_id, texto_pregunta, respuesta_correcta, puntuacion, tipo_conocimiento) VALUES (150105, 1501, '¿Cuál es el propósito fundamental de la Abstracción?', 'Enfocarse en los detalles esenciales y ocultar la complejidad interna irrelevante.', 10, 'Abstracción');
INSERT INTO public.pregunta (id, leccion_id, texto_pregunta, respuesta_correcta, puntuacion, tipo_conocimiento) VALUES (150106, 1501, 'Usar el pedal del acelerador en un automóvil sin entender la inyección de combustible es una analogía directa de:', 'Abstracción.', 10, 'Abstracción');
INSERT INTO public.pregunta (id, leccion_id, texto_pregunta, respuesta_correcta, puntuacion, tipo_conocimiento) VALUES (150107, 1501, 'En el Lenguaje C, ¿cuál es la principal herramienta utilizada para materializar el principio de Abstracción?', 'Las Funciones (que actúan como "cajas negras").', 10, 'Abstracción');
INSERT INTO public.pregunta (id, leccion_id, texto_pregunta, respuesta_correcta, puntuacion, tipo_conocimiento) VALUES (150108, 1501, 'En el siguiente código, ¿qué representa el cuerpo de la función calcularAreaCirculo() para el programa main()?\n\nC\nfloat calcularAreaCirculo(float radio) {\n  // ... Código de la fórmula ...\n  return area;\n}', 'La complejidad interna que está siendo abstraída.', 10, 'Abstracción');
INSERT INTO public.pregunta (id, leccion_id, texto_pregunta, respuesta_correcta, puntuacion, tipo_conocimiento) VALUES (150109, 1501, 'Al usar la función printf() de la librería stdio.h, ¿qué tipo de abstracción estamos utilizando?', 'Una abstracción de librería que oculta el complejo código de bajo nivel para interactuar con el hardware (monitor).', 10, 'Librerías');
INSERT INTO public.pregunta (id, leccion_id, texto_pregunta, respuesta_correcta, puntuacion, tipo_conocimiento) VALUES (150110, 1501, 'Si el resultado de la Descomposición es crear una tarea específica, ¿qué hace la Abstracción con esa tarea?', 'La encapsula, proporcionando una interfaz sencilla para su uso.', 10, 'Encapsulación');
INSERT INTO public.pregunta (id, leccion_id, texto_pregunta, respuesta_correcta, puntuacion, tipo_conocimiento) VALUES (160101, 1601, '¿Qué extensión debe tener un archivo de código fuente de C antes de ser compilado?', '.c', 10, 'Archivos');
INSERT INTO public.pregunta (id, leccion_id, texto_pregunta, respuesta_correcta, puntuacion, tipo_conocimiento) VALUES (160102, 1601, '¿Qué comando se utiliza típicamente en la terminal para compilar el archivo programa.c y crear un ejecutable llamado app?', 'gcc programa.c -o app', 10, 'Compilación');
INSERT INTO public.pregunta (id, leccion_id, texto_pregunta, respuesta_correcta, puntuacion, tipo_conocimiento) VALUES (160103, 1601, '¿Qué biblioteca estándar es obligatorio incluir para poder utilizar la función printf()?', '<stdio.h>', 10, 'Bibliotecas');
INSERT INTO public.pregunta (id, leccion_id, texto_pregunta, respuesta_correcta, puntuacion, tipo_conocimiento) VALUES (160104, 1601, '¿Cuál es el propósito de la secuencia de escape \n dentro de una cadena de control de printf()?', 'Insertar un salto de línea.', 10, 'Printf');
INSERT INTO public.pregunta (id, leccion_id, texto_pregunta, respuesta_correcta, puntuacion, tipo_conocimiento) VALUES (160105, 1601, 'Si olvidas el punto y coma (;) después de una llamada a printf(), ¿qué tipo de error ocurrirá?', 'Error de Compilación (Sintaxis).', 10, 'Errores');
INSERT INTO public.pregunta (id, leccion_id, texto_pregunta, respuesta_correcta, puntuacion, tipo_conocimiento) VALUES (210101, 2101, '¿Cuál es la unidad fundamental de información en un sistema digital que solo puede tener el valor de 0 o 1?', 'El Bit.', 10, 'Bits y Bytes');
INSERT INTO public.pregunta (id, leccion_id, texto_pregunta, respuesta_correcta, puntuacion, tipo_conocimiento) VALUES (210102, 2101, '¿Cuántos bits componen un Byte, la unidad más pequeña de memoria que puede ser direccional en la RAM?', '8 bits.', 10, 'Bits y Bytes');
INSERT INTO public.pregunta (id, leccion_id, texto_pregunta, respuesta_correcta, puntuacion, tipo_conocimiento) VALUES (210103, 2101, '¿Cuál de los siguientes tipos de datos representa la verdad o falsedad y se utiliza para tomar decisiones en el código (conocido como Booleano)?', 'Lógicos.', 10, 'Tipos de Datos');
INSERT INTO public.pregunta (id, leccion_id, texto_pregunta, respuesta_correcta, puntuacion, tipo_conocimiento) VALUES (210104, 2101, '¿Qué nombre recibe la memoria volátil donde un programa C guarda y recupera activamente todos sus datos durante la ejecución?', 'Memoria RAM.', 10, 'RAM');
INSERT INTO public.pregunta (id, leccion_id, texto_pregunta, respuesta_correcta, puntuacion, tipo_conocimiento) VALUES (210105, 2101, 'En la analogía de la RAM como un gran armario, ¿qué representa cada uno de los "cajones" individuales con su propia dirección?', 'Un Byte.', 10, 'RAM');
INSERT INTO public.pregunta (id, leccion_id, texto_pregunta, respuesta_correcta, puntuacion, tipo_conocimiento) VALUES (210106, 2101, 'Cuando declaras una variable de un tipo específico (ej. int), ¿qué le indica ese tipo de dato al compilador?', 'Cuántos bytes contiguos debe reservar en la memoria para el dato.', 10, 'Tipos de Datos');
INSERT INTO public.pregunta (id, leccion_id, texto_pregunta, respuesta_correcta, puntuacion, tipo_conocimiento) VALUES (210107, 2101, '¿Qué se asigna a una variable en C para que el programador pueda acceder a su valor sin tener que recordar su ubicación numérica?', 'Una etiqueta simple (el nombre de la variable).', 10, 'Variables');
INSERT INTO public.pregunta (id, leccion_id, texto_pregunta, respuesta_correcta, puntuacion, tipo_conocimiento) VALUES (210108, 2101, 'Si un entero (int) ocupa 4 bytes de espacio en la memoria RAM, ¿cuántos bits está reservando la computadora para ese dato?', '32 bits (4 * 8).', 10, 'Bits y Bytes');
INSERT INTO public.pregunta (id, leccion_id, texto_pregunta, respuesta_correcta, puntuacion, tipo_conocimiento) VALUES (210109, 2101, '¿Qué concepto representa la ubicación física y única del primer byte de un dato en la RAM, siendo un número largo (generalmente hexadecimal)?', 'La Dirección de Memoria.', 10, 'Direcciones');
INSERT INTO public.pregunta (id, leccion_id, texto_pregunta, respuesta_correcta, puntuacion, tipo_conocimiento) VALUES (210110, 2101, 'Al declarar una variable, el compilador debe reservar bytes que son contiguos. ¿Qué significa esto?', 'Que los bytes están ubicados uno al lado del otro en el espacio de la memoria.', 10, 'Memoria');


--
-- TOC entry 4856 (class 0 OID 66046)
-- Dependencies: 240
-- Data for Name: alternativa; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1101011, 110101, 'El arte de crear diseños gráficos para páginas web.', false, 1, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1101012, 110101, 'La manipulación de hardware sin necesidad de software.', false, 2, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1101013, 110101, 'El proceso de dar instrucciones precisas y lógicas a una computadora para resolver un problema.', true, 3, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1101014, 110101, 'La ciencia que estudia la composición de los circuitos electrónicos de la CPU.', false, 4, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1101021, 110102, 'Proceso → Salida → Entrada', false, 1, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1101022, 110102, 'Entrada → Salida → Proceso', false, 2, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1101023, 110102, 'Entrada → Proceso → Salida', true, 3, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1101024, 110102, 'Salida → Entrada → Proceso', false, 4, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1101031, 110103, 'Preciso (Inequívoco)', false, 1, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1101032, 110103, 'Definido (Consistente)', false, 2, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1101033, 110103, 'Ordenado', false, 3, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1101034, 110103, 'Finito (Limitado)', true, 4, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1101041, 110104, 'Una caja etiquetada para guardar datos.', false, 1, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1101042, 110104, 'El manual de instrucciones o la receta para una tarta.', true, 2, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1101043, 110104, 'Un circuito integrado de la memoria RAM.', false, 3, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1101044, 110104, 'El punto y coma (;) al final de una línea de código.', false, 4, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1101051, 110105, 'Codificación', false, 1, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1101052, 110105, 'Análisis del Problema', false, 2, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1101053, 110105, 'Prueba y Depuración (Debugging)', false, 3, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1101054, 110105, 'Diseño del Algoritmo', true, 4, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1101061, 110106, 'Redactar la documentación del programa.', false, 1, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1101062, 110106, 'Traducir el Pseudocódigo a Lenguaje C.', false, 2, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1101063, 110106, 'Localizar, analizar y corregir los errores o fallos (bugs).', true, 3, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1101064, 110106, 'Definir los requisitos y las salidas esperadas del programa.', false, 4, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1101071, 110107, 'Pseudocódigo', false, 1, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1101072, 110107, 'Lenguaje C', false, 2, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1101073, 110107, 'Diagrama de Flujo (Flowchart)', true, 3, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1101074, 110107, 'Sentencia', false, 4, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1101081, 110108, 'La capacidad del programa para tomar decisiones.', false, 1, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1101082, 110108, 'La unidad de trabajo más pequeña que da una orden completa.', false, 2, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1101083, 110108, 'Espacios de memoria reservados para almacenar y manipular datos.', true, 3, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1101084, 110108, 'La sintaxis utilizada para finalizar una instrucción.', false, 4, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1101091, 110109, 'Siempre debe terminar en un número limitado de pasos.', false, 1, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1101092, 110109, 'Si se ejecuta múltiples veces con los mismos datos de entrada, debe producir el mismo resultado.', true, 2, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1101093, 110109, 'Debe ser fácil de leer para un humano.', false, 3, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1101094, 110109, 'Sus instrucciones deben estar en un lenguaje de programación de bajo nivel.', false, 4, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1101101, 110110, 'Reservan memoria para los datos del programa.', false, 1, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1101102, 110110, 'Permiten que la computadora solo opere en código binario.', false, 2, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1101103, 110110, 'Dotan al programa de inteligencia para tomar decisiones y repetir acciones.', true, 3, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1101104, 110110, 'Finalizan todas las sentencias con un punto y coma.', false, 4, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1201011, 120101, 'Ken Thompson', false, 1, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1201012, 120101, 'Bjarne Stroustrup', false, 2, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1201013, 120101, 'Dennis Ritchie', true, 3, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1201014, 120101, 'Linus Torvalds', false, 4, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1201021, 120102, 'Crear un lenguaje de programación orientado a objetos.', false, 1, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1201022, 120102, 'Desarrollar el firmware para microcontroladores y dispositivos IoT.', false, 2, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1201023, 120102, 'Reescribir el núcleo (kernel) del sistema operativo UNIX.', true, 3, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1201024, 120102, 'Simplificar la programación de interfaces de usuario gráficas (GUI).', false, 4, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1201031, 120103, 'Lenguaje de muy bajo nivel (Ensamblador).', false, 1, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1201032, 120103, 'Lenguaje de nivel medio.', true, 2, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1201033, 120103, 'Lenguaje de nivel máquina (Binario).', false, 3, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1201034, 120103, 'Lenguaje de muy alto nivel (Python o Java).', false, 4, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1201041, 120104, 'Era demasiado rápido para ser controlado.', false, 1, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1201042, 120104, 'No podía manipular la memoria RAM directamente.', false, 2, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1201043, 120104, 'Su falta de portabilidad entre diferentes arquitecturas de hardware.', true, 3, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1201044, 120104, 'Su dificultad para trabajar con el sistema de archivos.', false, 4, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1201051, 120105, 'Estructuras de control avanzadas.', false, 1, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1201052, 120105, 'Programación paralela.', false, 2, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1201053, 120105, 'La manipulación eficiente de tipos de datos.', true, 3, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1201054, 120105, 'Soporte para interfaces de usuario gráficas (GUI).', false, 4, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1201061, 120106, 'Añadir la programación orientada a objetos (POO) al lenguaje.', false, 1, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1201062, 120106, 'Garantizar que el código C funcione de manera consistente en diferentes máquinas y compiladores.', true, 2, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1201063, 120106, 'Limitar el uso de C solo a los sistemas operativos.', false, 3, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1201064, 120106, 'Mejorar la velocidad de ejecución de los programas C en un 50%.', false, 4, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1201071, 120107, 'Su uso de una máquina virtual (VM) para la ejecución de código.', false, 1, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1201072, 120107, 'Su cercanía al hardware y el control manual sobre la memoria.', true, 2, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1201073, 120107, 'Ser un lenguaje de programación completamente interpretado.', false, 3, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1201074, 120107, 'Su dependencia total de un framework externo de optimización.', false, 4, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1201081, 120108, 'La programación orientada a objetos.', false, 1, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1201082, 120108, 'La eficiencia y el control de bajo nivel sobre la memoria.', true, 2, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1201083, 120108, 'La facilidad de codificación de la interfaz gráfica.', false, 3, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1201084, 120108, 'La gestión automática de memoria (recolección de basura).', false, 4, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1201091, 120109, 'Su sintaxis es la más moderna disponible.', false, 1, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1201092, 120109, 'Su capacidad para manipular directamente el hardware y su eficiencia en el uso de recursos limitados.', true, 2, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1201093, 120109, 'Su dependencia de un garbage collector para limpiar la memoria automáticamente.', false, 3, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1201094, 120109, 'Es el único lenguaje que puede compilarse para estos sistemas.', false, 4, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1201101, 120110, 'Las interfaces gráficas de Microsoft Office.', false, 1, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1201102, 120110, 'La lógica de negocio de las aplicaciones móviles de Android.', false, 2, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1201103, 120110, 'Los intérpretes principales de lenguajes como Python y PHP.', true, 3, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1201104, 120110, 'El software de diseño web basado en plantillas.', false, 4, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1301011, 130101, 'El código fuente es más fácil de leer.', false, 1, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1301012, 130101, 'El programa puede ejecutarse en cualquier hardware sin modificaciones.', false, 2, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1301013, 130101, 'La velocidad de ejecución es superior, ya que la traducción a código máquina se realiza una sola vez antes de la ejecución.', true, 3, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1301014, 130101, 'Permite la gestión automática de memoria, evitando errores.', false, 4, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1301021, 130102, 'Traducir el código a Ensamblador y optimizarlo.', false, 1, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1301022, 130102, 'Manejar directivas como #include y #define, copiando y pegando contenido o realizando sustituciones de texto.', true, 2, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1301023, 130102, 'Combinar el código objeto de múltiples archivos y librerías.', false, 3, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1301024, 130102, 'Verificar la sintaxis y la semántica del código.', false, 4, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1301031, 130103, 'El Compilador', false, 1, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1301032, 130103, 'El Enlazador (Linker)', false, 2, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1301033, 130103, 'El Preprocesador', false, 3, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1301034, 130103, 'El Ensamblador', true, 4, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1301041, 130104, 'El programa intenta dividir por cero.', false, 1, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1301042, 130104, 'Se olvida añadir el código de la función printf() de la librería estándar.', false, 2, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1301043, 130104, 'El código incumple las reglas sintácticas de C (ej. falta un punto y coma ;).', true, 3, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1301044, 130104, 'Se realiza una operación lógica que produce un resultado incorrecto.', false, 4, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1301051, 130105, 'Preprocesamiento (Fase I)', false, 1, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1301052, 130105, 'Compilación (Fase II)', false, 2, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1301053, 130105, 'Enlazado (Linking) (Fase IV)', true, 3, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1301054, 130105, 'Ejecución (Runtime)', false, 4, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1301061, 130106, 'Un software que solo se usa para escribir el código fuente (.c).', false, 1, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1301062, 130106, 'Un software que agrupa el editor de código, el compilador, el enlazador y el depurador en una sola interfaz.', true, 2, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1301063, 130106, 'Un programa que traduce el código línea por línea durante la ejecución.', false, 3, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1301064, 130106, 'La extensión de archivo final del programa ejecutable.', false, 4, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1301071, 130107, 'El archivo Ensamblador (.s).', false, 1, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1301072, 130107, 'El archivo Preprocesado (.i).', false, 2, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1301073, 130107, 'El Código Objeto (.o).', false, 3, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1301074, 130107, 'El Programa Ejecutable (Ej. .exe o binario final).', true, 4, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1301081, 130108, 'El código fuente original listo para ser ejecutado.', false, 1, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1301082, 130108, 'El código Ensamblador, resultado de la traducción del Compilador.', true, 2, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1301083, 130108, 'El código objeto binario listo para el enlazado.', false, 3, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1301084, 130108, 'El archivo de librerías externas que se deben incluir.', false, 4, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1301091, 130109, 'Es más fácil de detectar, ya que el compilador lo señala inmediatamente.', false, 1, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1301092, 130109, 'Ocurre siempre por un fallo de sintaxis.', false, 2, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1301093, 130109, 'El programa genera el archivo ejecutable, pero falla o produce resultados incorrectos mientras está siendo usado por el usuario.', true, 3, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1301094, 130109, 'Se corrige añadiendo la directiva #define al inicio del código.', false, 4, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1301101, 130110, 'Realizar la sustitución de macros definidas con #define.', false, 1, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1301102, 130110, 'Verificar la optimización del código Ensamblador.', false, 2, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1301103, 130110, 'Combinar el código objeto de nuestro programa con las funciones binarias de las librerías externas (como las de stdio.h).', true, 3, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1301104, 130110, 'Convertir las instrucciones del Ensamblador a código binario.', false, 4, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1401011, 140101, '.cpp', false, 1, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1401012, 140101, '.exe', false, 2, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1401013, 140101, '.h', false, 3, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1401014, 140101, '.c', true, 4, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1401021, 140102, 'Realizar operaciones matemáticas avanzadas.', false, 1, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1401022, 140102, 'Gestionar la memoria RAM del sistema.', false, 2, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1401023, 140102, 'La interacción básica de Entrada y Salida (como printf() y scanf()).', true, 3, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1401024, 140102, 'Definir estructuras de datos complejas.', false, 4, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1401031, 140103, 'Es una función opcional que solo se usa para depuración.', false, 1, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1401032, 140103, 'Es el punto de entrada y salida obligatorio, donde el sistema operativo comienza la ejecución.', true, 2, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1401033, 140103, 'Es la función responsable de gestionar la memoria dinámica.', false, 3, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1401034, 140103, 'Se encarga de incluir todas las librerías necesarias.', false, 4, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1401041, 140104, 'Indica que la función solo puede recibir argumentos enteros.', false, 1, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1401042, 140104, 'Es la abreviatura de "inicio".', false, 2, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1401043, 140104, 'El tipo de dato (entero) que se devuelve al sistema operativo como código de estado.', true, 3, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1401044, 140104, 'El número máximo de sentencias que puede contener la función.', false, 4, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1401051, 140105, '() (Paréntesis)', false, 1, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1401052, 140105, '[] (Corchetes)', false, 2, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1401053, 140105, '<> (Símbolos de menor y mayor)', false, 3, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1401054, 140105, '{} (Llaves)', true, 4, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1401061, 140106, 'Dos puntos :', false, 1, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1401062, 140106, 'Coma ,', false, 2, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1401063, 140106, 'Barra /', false, 3, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1401064, 140106, 'Punto y coma ;', true, 4, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1401071, 140107, 'El programa se detiene debido a un error de Enlazado.', false, 1, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1401072, 140107, 'El programa ha finalizado su ejecución de manera exitosa.', true, 2, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1401073, 140107, 'El programa debe reiniciarse inmediatamente.', false, 3, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1401074, 140107, 'La función main() devuelve una dirección de memoria.', false, 4, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1401081, 140108, 'Que el programa fue más rápido de lo esperado.', false, 1, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1401082, 140108, 'Que ocurrió un fallo o un error durante su ejecución.', true, 2, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1401083, 140108, 'Que el código fuente necesita más comentarios.', false, 3, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1401084, 140108, 'Que el código no pudo ser compilado.', false, 4, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1401091, 140109, 'Se convierten en código máquina para optimizar el rendimiento.', false, 1, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1401092, 140109, 'El Compilador los utiliza para verificar errores de Enlazado.', false, 2, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1401093, 140109, 'Son ignorados y eliminados completamente por el Preprocesador, sin afectar el ejecutable.', true, 3, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1401094, 140109, 'Deben ir siempre al principio del archivo fuente.', false, 4, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1401101, 140110, 'El compilador solo puede procesar archivos pequeños.', false, 1, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1401102, 140110, 'Para mejorar la modularidad, facilitar el mantenimiento y la colaboración en equipo.', true, 2, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1401103, 140110, 'Es una obligación del estándar ANSI C.', false, 3, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1401104, 140110, 'El proceso de Preprocesamiento solo funciona con un archivo a la vez.', false, 4, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1501011, 150101, 'La habilidad de escribir código en Lenguaje C.', false, 1, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1501012, 150101, 'Un proceso mental para formular problemas y soluciones que pueden ser ejecutadas por una computadora.', true, 2, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1501013, 150101, 'El conocimiento de todos los lenguajes de programación.', false, 3, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1501014, 150101, 'El uso de la inteligencia artificial para resolver problemas.', false, 4, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1501021, 150102, 'Ocultar los detalles de implementación al usuario.', false, 1, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1501022, 150102, 'Encontrar patrones y similitudes en los datos.', false, 2, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1501023, 150102, 'Dividir un problema complejo en subproblemas más pequeños, manejables e independientes.', true, 3, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1501024, 150102, 'Crear un conjunto de instrucciones paso a paso (algoritmo).', false, 4, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1501031, 150103, 'Reescribir todo el programa desde cero.', false, 1, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1501032, 150103, 'Revisar y corregir únicamente el módulo o función CalcularImpuestos().', true, 2, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1501033, 150103, 'Ignorar el error, ya que es un Error de Ejecución.', false, 3, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1501034, 150103, 'Usar un lenguaje interpretado en lugar de C.', false, 4, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1501041, 150104, 'Reduce el tiempo de compilación.', false, 1, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1501042, 150104, 'Mejora la modularidad, facilita la depuración (debugging) y permite la colaboración.', true, 2, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1501043, 150104, 'Simplifica la sintaxis de las sentencias.', false, 3, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1501044, 150104, 'Garantiza que el programa solo use la librería stdio.h.', false, 4, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1501051, 150105, 'Acelerar la velocidad de ejecución del código.', false, 1, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1501052, 150105, 'Enfocarse en los detalles esenciales y ocultar la complejidad interna irrelevante.', true, 2, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1501053, 150105, 'Traducir el código fuente a código ensamblador.', false, 3, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1501054, 150105, 'Verificar la sintaxis y la semántica de las funciones.', false, 4, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1501061, 150106, 'Descomposición.', false, 1, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1501062, 150106, 'Modularidad.', false, 2, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1501063, 150106, 'Algoritmos.', false, 3, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1501064, 150106, 'Abstracción.', true, 4, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1501071, 150107, 'El uso de la directiva #define.', false, 1, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1501072, 150107, 'El punto y coma (;) al final de una sentencia.', false, 2, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1501073, 150107, 'Las Funciones (que actúan como "cajas negras").', true, 3, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1501074, 150107, 'El tipo de retorno int en la función main().', false, 4, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1501081, 150108, 'La interfaz de la librería stdio.h.', false, 1, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1501082, 150108, 'Un error de compilación.', false, 2, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1501083, 150108, 'La complejidad interna que está siendo abstraída.', true, 3, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1501084, 150108, 'La definición del tipo de retorno.', false, 4, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1501091, 150109, 'Una abstracción de hardware que no requiere compilación.', false, 1, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1501092, 150109, 'Una abstracción que oculta la Descomposición.', false, 2, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1501093, 150109, 'Una abstracción de librería que oculta el complejo código de bajo nivel para interactuar con el hardware (monitor).', true, 3, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1501094, 150109, 'Una abstracción de bucles y condicionales.', false, 4, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1501101, 150110, 'La elimina.', false, 1, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1501102, 150110, 'La divide aún más.', false, 2, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1501103, 150110, 'La encapsula, proporcionando una interfaz sencilla para su uso.', true, 3, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1501104, 150110, 'La convierte inmediatamente en código binario.', false, 4, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1601011, 160101, '.exe', false, 1, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1601012, 160101, '.c', true, 2, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1601013, 160101, '.h', false, 3, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1601014, 160101, '.bin', false, 4, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1601021, 160102, 'compile programa.c to app', false, 1, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1601022, 160102, 'gcc programa.c -o app', true, 2, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1601023, 160102, 'run programa.c', false, 3, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1601024, 160102, 'main programa.c', false, 4, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1601031, 160103, '<stdlib.h>', false, 1, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1601032, 160103, '<math.h>', false, 2, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1601033, 160103, '<stdio.h>', true, 3, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1601034, 160103, '<string.h>', false, 4, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1601041, 160104, 'Imprimir una tabulación.', false, 1, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1601042, 160104, 'Insertar un salto de línea.', true, 2, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1601043, 160104, 'Imprimir el carácter de barra invertida.', false, 3, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1601044, 160104, 'Marcar el final de la cadena de control.', false, 4, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1601051, 160105, 'Error de Ejecución (Runtime Error).', false, 1, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1601052, 160105, 'Error de Compilación (Sintaxis).', true, 2, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1601053, 160105, 'Error de Enlazado.', false, 3, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (1601054, 160105, 'El programa ignorará la línea.', false, 4, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (2101011, 210101, 'El Byte.', false, 1, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (2101012, 210101, 'El Bit.', true, 2, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (2101013, 210101, 'La Dirección de Memoria.', false, 3, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (2101014, 210101, 'La Variable.', false, 4, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (2101021, 210102, '1 bit.', false, 1, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (2101022, 210102, '4 bits.', false, 2, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (2101023, 210102, '8 bits.', true, 3, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (2101024, 210102, '16 bits.', false, 4, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (2101031, 210103, 'Numéricos.', false, 1, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (2101032, 210103, 'Lógicos.', true, 2, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (2101033, 210103, 'Textuales.', false, 3, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (2101034, 210103, 'Alfanuméricos.', false, 4, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (2101041, 210104, 'Memoria ROM.', false, 1, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (2101042, 210104, 'Disco Duro (HDD/SSD).', false, 2, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (2101043, 210104, 'Memoria Caché.', false, 3, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (2101044, 210104, 'Memoria RAM.', true, 4, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (2101051, 210105, 'Un Bit.', false, 1, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (2101052, 210105, 'Un Byte.', true, 2, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (2101053, 210105, 'El Tipo de Dato.', false, 3, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (2101054, 210105, 'El Valor de la Variable.', false, 4, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (2101061, 210106, 'El nombre que debe tener la variable.', false, 1, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (2101062, 210106, 'La función que debe realizar la variable.', false, 2, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (2101063, 210106, 'Cuántos bytes contiguos debe reservar en la memoria para el dato.', true, 3, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (2101064, 210106, 'Si el programa debe ejecutarse al inicio o al final.', false, 4, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (2101071, 210107, 'Un puntero.', false, 1, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (2101072, 210107, 'La dirección de memoria.', false, 2, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (2101073, 210107, 'Una etiqueta simple (el nombre de la variable).', true, 3, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (2101074, 210107, 'Un valor binario.', false, 4, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (2101081, 210108, '4 bits.', false, 1, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (2101082, 210108, '8 bits.', false, 2, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (2101083, 210108, '16 bits.', false, 3, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (2101084, 210108, '32 bits (4 * 8).', true, 4, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (2101091, 210109, 'El Valor (Value).', false, 1, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (2101092, 210109, 'El Byte.', false, 2, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (2101093, 210109, 'La Dirección de Memoria.', true, 3, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (2101094, 210109, 'El Nombre de la Variable.', false, 4, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (2101101, 210110, 'Que los bytes deben ser leídos de forma aleatoria.', false, 1, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (2101102, 210110, 'Que los bytes se encuentran dispersos por toda la RAM.', false, 2, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (2101103, 210110, 'Que los bytes están ubicados uno al lado del otro en el espacio de la memoria.', true, 3, 1);
INSERT INTO public.alternativa (id, pregunta_id, texto_alternativa, es_correcta, orden, categoria_id) VALUES (2101104, 210110, 'Que el valor de la variable nunca puede cambiar.', false, 4, 1);


--
-- TOC entry 4862 (class 0 OID 0)
-- Dependencies: 239
-- Name: alternativa_quiz_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.alternativa_quiz_id_seq', 1, false);


--
-- TOC entry 4863 (class 0 OID 0)
-- Dependencies: 223
-- Name: leccion_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.leccion_id_seq', 1, false);


--
-- TOC entry 4864 (class 0 OID 0)
-- Dependencies: 234
-- Name: pregunta_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.pregunta_id_seq', 1, false);


-- Completed on 2026-03-03 20:42:32

--
-- PostgreSQL database dump complete
--

