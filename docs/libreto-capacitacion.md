# Libreto de capacitación — Sistema de Inventario para PyMEs

> **Material de apoyo:** video tutorial (16 min) + demostración en vivo + práctica guiada.
> **Documento complementario:** `docs/manual-usuario.md`.
> **Dirigido a:** administradores y encargados de inventario de pequeñas y medianas empresas.
> **Duración de la sesión:** 45 minutos.

---

## 1. Ficha de la capacitación

| Dato | Descripción |
| --- | --- |
| **Nombre de la sesión** | Capacitación en el uso del Sistema de Inventario para PyMEs |
| **Público objetivo** | Administradores de inventario, dueños de pequeña empresa y encargados de bodega. Son las personas que llevan el control de qué se compra, qué se vende y cuántas unidades hay. |
| **Modalidad** | Presencial o virtual, con proyector y acceso a la aplicación. Cada asistente debe tener su propia cuenta o trabajar en pareja. |
| **Duración** | 45 minutos = 2 de apertura + 18 de proyección (16 de video + 2 de pausas del instructor) + 10 de demostración en vivo + 12 de práctica guiada + 3 de evaluación y cierre |
| **Recursos** | Video tutorial proyectado, sistema en línea, manual de usuario impreso o digital, guía de práctica impresa, hoja de evaluación |
| **Acceso al sistema** | `{{URL_APLICACION}}` — *sustituir por la dirección real antes de la sesión* |
| **Material del asistente** | Manual de usuario y guía de práctica (impresos o enlace) |

### 1.1 Perfil del asistente

- Responsable de registrar compras y ventas y de llevar el conteo de mercancía.
- Usa computador para tareas de oficina; no necesariamente tiene formación en sistemas.
- Conoce los conceptos de su negocio (producto, proveedor, cliente, precio de compra y precio de venta).
- **No se le pide ningún conocimiento técnico:** no debe saber de bases de datos, de programación ni de redes.

### 1.2 Pre-requisitos que debe cumplir antes de la sesión

- Tener a la mano: **NIT de la empresa**, correo electrónico que usará como usuario, y sus nombres y número de identificación.
- Conocer el **precio de costo y el precio de venta** de al menos un producto real, porque lo practicingrá en el ejercicio 2.
- Un computador o celular con navegador actualizado (Chrome, Edge o Firefox).

### 1.3 Objetivos de aprendizaje

Al finalizar la sesión, el asistente será capaz de:

1. **Crear la cuenta de su empresa** e ingresar al sistema con su correo y contraseña.
2. **Navegar** por los módulos del sistema usando la barra lateral.
3. **Administrar el catálogo**: crear y modificar categorías, productos, proveedores y clientes.
4. **Registrar compras y ventas** y comprender cómo afectan al inventario.
5. **Verificar y corregir** el stock de un producto después de una operación.
6. **Actualizar sus datos personales, su contraseña y los datos de su empresa.**

### 1.4 Datos de ejemplo de toda la sesión

Estos datos son ficticios y se usan **en el video, en la demostración en vivo y en los ejercicios**, de modo que el asistente solo debe copiarlos.

**Empresa del usuario de la capacitación**

| Dato | Valor |
| --- | --- |
| Nombre del usuario | Carolina Ramírez |
| Apellido | Ramírez Soto |
| Identificación | 1.098.765.432 |
| Correo electrónico | carolina@elprogreso.com |
| Contraseña | Demo2026 |
| Razón Social | Distribuidora El Progreso S.A.S. |
| NIT | 900.123.456-7 |
| Correo corporativo | admin@elprogreso.com |
| Teléfono | 604 123 4567 |

**Datos del catálogo**

| Dato | Valor |
| --- | --- |
| Categoría 1 | Bebidas |
| Categoría 2 | Aseo del hogar |
| Proveedor | Distribuidora Andina S.A.S. (contacto: Andrés Mejía, andres@andina.com, 601 745 2200) |
| Cliente | Comercio Don Pepe S.A.S. (identificación 900.456.789-1, contacto@donpepe.com, 300 555 4433) |

**Producto de la demostración y del video**

| Campo | Valor |
| --- | --- |
| Nombre | Gaseosa 1.5 L |
| Categoría | Bebidas |
| Proveedor | Distribuidora Andina S.A.S. |
| Referencia interna | BEB-001 |
| Descripción | Botella PET de 1.5 litros |
| Stock inicial | 0 |
| Precio de costo | 8.000 |
| Precio de venta | 12.500 |

> **Cifras de la demostración (deben cuadrar en pantalla).**
> Compra de 50 unidades → 50 × 8.000 = **$400.000** → el stock pasa de 0 a **50**.
> Venta de 12 unidades → 12 × 12.500 = **$150.000** → el stock pasa de 50 a **38**.

**Producto de los ejercicios** (se usa uno distinto al de la demostración para que todos trabajen sobre datos propios y en paralelo)

| Campo | Valor |
| --- | --- |
| Nombre | Jabón en polvo 1 kg |
| Categoría | Aseo del hogar |
| Referencia interna | AEO-001 |
| Stock inicial | 0 |
| Precio de costo | 6.000 |
| Precio de venta | 9.500 |

> **Cifras de los ejercicios.**
> Compra de 40 unidades → 40 × 6.000 = **$240.000** → el stock pasa de 0 a **40**.
> Venta de 15 unidades → 15 × 9.500 = **$142.500** → el stock pasa de 40 a **25**.

---

## 2. Cronograma de la sesión (45 minutos)

| Minuto | Bloque | Qué ocurre |
| --- | --- | --- |
| 00–02 | **Apertura y objetivos** | Bienvenida, contexto, objetivos de aprendizaje, reglas de la práctica. |
| 02–20 | **Proyección del video tutorial** | 16 min de reproducción + 2 pausas del instructor (después de la escena 3 y de la escena 7). |
| 20–30 | **Demostración en vivo** | El instructor hace, en tiempo real, el flujo completo: producto → compra → venta → verificación → reversión. |
| 30–42 | **Práctica guiada** | Ejercicio 1: estructura del catálogo. Ejercicio 2: compra y venta con verificación del stock. |
| 42–45 | **Evaluación, preguntas y cierre** | Preguntas de verificación, dudas, encuesta y indicando dónde pedir soporte. |

### 2.1 Bloque 0 — Apertura y objetivos (00:00 – 02:00)

| Elemento | Contenido |
| --- | --- |
| **Proyecta** | Portada del video tutorial. |
| **Dice el instructor** | «Bienvenidos. En los próximos 45 minutos vamos a aprender a manejar el sistema de inventario de la empresa. La idea es que al terminar pueda crear su cuenta, tener su catálogo de productos organized y, sobre todo, registrar compras y ventas viendo cómo se actualiza el inventario solo. Empezamos viendo un video de 16 minutos; después voy a hacer yo la demostración y finalmente ustedes practican.» |
| **Enumera en pantalla** | Los 6 objetivos de aprendizaje de la sección 1.3. |
| **Reglas de la práctica** | «Trabajan en pareja, cada quien con su propia cuenta, o por turnos si solo hay un computador. Si algo no les funciona, me avisan de una; no dejen para el final.» |
| **Material por repartir** | Guía de práctica impresa y manual de usuario. |

### 2.2 Bloque 1 — Proyección del video tutorial (02:00 – 20:00)

**Procedimiento del instructor:** reproduzca el video de corrido. Pause en los dos puntos indicados, haga la intervención y reanude. No narre por encima del video salvo en esas pausas.

| Punto de control | Momento | Intervención del instructor (máx. 60 s) |
| --- | --- | --- |
| **Pausa 1** — al terminar la escena 3 (*Ingreso y recorrido de la interfaz*) | 06:15 | «Hasta aquí la parte más importante de todas: fíjense en esta barra de la izquierda. Son cinco módulos de trabajo y tres de su cuenta. Todo el sistema se maneja desde aquí.» |
| **Pausa 2** — al terminar la escena 7 (*Transacciones*) | 17:00 | «Esto que acaba de pasar es el corazón del sistema. No existe un botón de "descontar del inventario": el inventario se ajusta solo con la compra y la venta. Si el número no cuadra, el problema está en la operación, no en el producto.» |

> ⚠ **Aviso — al terminar la escena 1.** Al entrar, la pantalla puede verse vacía a la derecha. Diga: *«Si la primera vez que entran les aparece la pantalla en blanco a la derecha, no es un error. El sistema abre con la barra de módulos y toca elegir en qué sección se va a trabajar.»*

### 2.3 Bloque 2 — Demostración en vivo (20:00 – 30:00)

| Tiempo | Acción en pantalla | Qué dice el instructor |
| --- | --- | --- |
| 20:00–20:45 | Inicia sesión con `carolina@elprogreso.com` / `Demo2026`. | «Voy a hacer lo mismo que ustedes van a hacer en el ejercicio, pero miren bien el orden, porque el orden importa.» |
| 20:45–22:30 | Módulo **Productos** → **Añadir producto** → diligencia *Gaseosa 1.5 L*, categoría *Bebidas*, proveedor *Distribuidora Andina*, referencia *BEB-001*, stock 0, costo 8.000, venta 12.500, estado Activo → **Crear Producto**. | «Noten que el stock lo dejamos en cero. No es un error: lo voy a sumar con la compra que hago enseguida. Así queda claro de dónde viene cada unidad.» |
| 22:30–24:30 | **Nueva transacción** → TIPO **Entrada** → PROVEEDOR *Distribuidora Andina* → **+ Agregar** → *Gaseosa 1.5 L*, cantidad 50 → **Crear**. | «Esta es una compra. El precio que le pone el sistema es el de costo, el 8.000. Y miren lo que pasó con el inventario: estaba en cero y quedó en 50. El total también se calculó solo.» |
| 24:30–26:30 | **Nueva transacción** → TIPO **Salida** → CLIENTE *Comercio Don Pepe* → **+ Agregar** → *Gaseosa 1.5 L*, cantidad 12 → **Crear**. | «Esta es una venta. Ahora el precio que se usa es el de venta, 12.500. El stock bajó de 50 a 38. Yo no escribí ningún precio: los precios salen del producto.» |
| 26:30–27:30 | Va a **Productos** y muestra la fila del producto: stock **38**. Luego a **Transacciones** y muestra las dos filas con sus totales ($400.000 y $150.000). | «Comprueben las dos cosas: el stock del producto y el historial de transacciones. Ese historial es el respaldo de qué entró y qué salió.» |
| 27:30–29:15 | En **Transacciones**, elimina la **venta** (canasto). Regresa a **Productos** y muestra el stock en **50**. Luego vuelve a crear la venta de 12 unidades y comprueba que el stock vuelva a **38**. | «Voy a borrar la venta que acabo de hacer, solo para que vean qué hace el sistema. El stock volvió a 50: la mercancía regresó a la bodega. Y esto es la misma para cualquier caso. Una operación mal registrada se corrige así: se borra y se vuelve a registrar. No se edita.» |
| 29:15–30:00 | Deja el sistema en la pantalla de **Transacciones**. | «Con esto vimos el flujo completo. Ahora les toca a ustedes.» |

> ⚠ **Avisos del instructor durante la demostración.**
> - **Al eliminar no hay confirmación.** El registro desaparece de inmediato. Diga en voz alta: *«Miren que no me pidió confirmación, borró directo. Antes de tocar el canasto, uno se cerciora de que está en la fila correcta.»*
> - **Categoría obligatoria.** Al crear un producto, la categoría no puede quedar vacía aunque la pantalla no lo exija. Avise al principio del ejercicio 1.
> - **Si un formulario no guarda y no muestra nada**, el asistente debe revisar que todos los campos obligatorios estén completos, en especial la categoría del producto y al menos una fila de producto en las transacciones.

### 2.4 Bloque 3 — Práctica guiada (30:00 – 42:00)

Los dos ejercicios están en la sección 5 de este libreto. Entregue la guía impresa, lance el ejercicio 1 y vaya pasando por los puestos. Después de los 6 minutos del ejercicio 1, avance al 2. **No dé la solución antes de que terminen el tiempo; con el ejercicio 2, ayúdelos solo si llevan más de 2 minutos bloqueados.**

| Tiempo | Bloque | Objetivo del ejercicio |
| --- | --- | --- |
| 30:00–36:00 | **Ejercicio 1** | Dejar lista la estructura: 2 categorías, 1 proveedor, 1 cliente. |
| 36:00–42:00 | **Ejercicio 2** | Crear el producto y registrar la compra y la venta; comprobar que el stock quede en 25. |

### 2.5 Bloque 4 — Evaluación, preguntas y cierre (42:00 – 45:00)

| Tiempo | Acción |
| --- | --- |
| 42:00–43:30 | Aplique la **evaluación de la sección 6** (6 preguntas de selección múltiple y 5 abiertas). Las preguntas 1, 2 y 3 se responden a mano alzada. |
| 43:30–44:15 | **Preguntas y dudas.** Atienda en este orden: lo que más se repita en la práctica, luego lo demás. |
| 44:15–45:00 | **Cierre.** Entregue la encuesta de satisfacción (sección 6.4) y recuerde dónde está el material de apoyo. |

Texto de cierre sugerido:

> «Ya terminamos. Recuerden las tres reglas que resumen todo lo que vimos: primero se crea la categoría antes del producto; segundo, las compras y las ventas son las únicas que mueven el inventario; y tercero, el precio sale del producto, nunca se escribe a mano en la transacción. El manual de usuario y esta guía quedan con ustedes para consultar cuando toque. Gracias por su atención.»

---

## 3. Guion del video tutorial

**Duración total: 16 minutos.** La columna **Locución** es el texto exacto que debe narrarse: es la voz en off completa del video, lista para grabar.

**Reglas de grabación:** pantalla grabada a 1920 × 1080, cursor visible, ritmo pausado, sin música de fondo durante las explicaciones. Los datos que aparecen son los de la sección 1.4.

### 3.1 Guion por escenas

| Código | Tiempo | Acción en pantalla | Locución (voz en off) |
| --- | --- | --- | --- |
| **1** | 0:00–1:15 | Página de bienvenida del sistema. | «Bienvenidos al Sistema de Inventario para Pymes. En este video de dieciséis minutos vas a aprender a manejar el sistema completo: desde la creación de tu cuenta hasta el registro de tus compras y tus ventas. No necesitas conocimientos de computers: solo sigue las pantallas que vas a ver. Al final vas a poder crear tu catálogo de productos, registrar la mercancía que entra y la que sale, y ver cómo el inventario se actualiza solo. Vamos a empezar.» |
| **2** | 1:15–3:00 | Formulario **Registra un nuevo usuario**, recorriendo campo por campo. Se diligencian los datos de ejemplo. | «Lo primero es crear tu cuenta. Haz clic en Crear Cuenta y llega a este formulario. Arriba están tus datos personales: nombre, apellido, correo electrónico, contraseña e identificación. Abajo están los datos de tu empresa: razón social, NIT, correo corporativo y teléfono. Todos los campos son obligatorios. Un detalle importante: el NIT identifica a la empresa y no se puede repetir ni cambiarse después. Cuando termines, presiona REGISTRAR. Al terminar el sistema te lleva al inicio de sesión: ahí entras con el correo y la contraseña que acabas de crear.» |
| **3** | 3:00–4:15 | Ingreso con los datos de ejemplo. Luego se señala la barra lateral y una tabla de productos. | «Ya adentro, mira la barra de la izquierda. Son cinco módulos de trabajo: categorías, productos, transacciones, clientes y proveedores. Abajo están los tuyos: el rayo es para los datos de tu empresa, la persona es tu perfil, y la flecha de salida cierra la sesión. Para saber qué módulo es cada ícono, solo pasa el cursor por encima y aparece su nombre. A la derecha tienes la información del módulo que elegiste. Ojo: si la primera vez que entras la pantalla se ve vacía, es normal. Toca elegir un módulo en la barra lateral.» |
| **4** | 4:15–5:45 | Módulo **Categorías** → **Añadir categoría** → se crea *Bebidas* y *Aseo del hogar*. Se muestra la tabla con las dos. | «Empecemos por las categorías, que son las más sencillas. Una categoría es el grupo donde vas a meter tus productos: bebidas, aseo del hogar, abarrotes, lo que necesites. Pulsa Añadir categoría, escribe el nombre y, si quieres, una descripción, y presiona Crear categoría. Aquí ya tenemos dos. No se pueden crear dos categorías con el mismo nombre dentro de la misma empresa. Y algo que se va a necesitar más adelante: una categoría que ya tiene productos no se puede eliminar.» |
| **5** | 5:45–8:15 | Módulo **Productos** → **Añadir producto** → se diligencia *Gaseosa 1.5 L* completo → **Crear Producto** → tabla con el producto. Se señala el stock y el precio. | «Ahora el módulo de productos, que es el centro del sistema. Cada producto necesita un código propio, llamado referencia interna, y ese código no se puede repetir. Nombre, categoría, proveedor, descripción, el stock, y los dos precios. Mira bien estos dos campos: el precio de costo es lo que le pagas al proveedor, y el precio de venta es lo que le cobras a tus clientes. El sistema no es adivino, así que los dos deben estar siempre correctos acá. El stock lo dejamos en cero porque más adelante lo vamos a sumar con una compra. Cuando guardes, tu producto aparece en la tabla. Y fíjate en el stock: cuando baja de diez unidades se pone en rojo, para que notes de una vez qué se está acabando.» |
| **6** | 8:15–9:45 | Módulos **Proveedores** y **Clientes**, creando los dos registros de ejemplo. | «Faltan los dos catálogos de contactos. En Proveedores registras a quienes te venden. Pulsa Añadir proveedor y escribe el nombre; el correo, el teléfono y la dirección son opcionales, así que solo el nombre es obligatorio. En Clientes registras a quienes te compran. Ahí sí son obligatorios la identificación, el nombre, el correo, el teléfono y la dirección. La identificación es única por empresa, entonces no puedes registrar dos clientes con la misma.» |
| **7** | 9:45–14:00 | Módulo **Transacciones** → **Nueva transacción**: primero la ENTRADA, luego la SALIDA. Se muestra el resultado en la tabla de productos y en la de transacciones. | «Aquí es donde se mueve el inventario. Hay dos tipos de operación. La Entrada es una compra: la mercancía entra a la bodega y el stock sube. La Salida es una venta: la mercancía sale y el stock baja. Vamos con una compra. En Tipo eliges Entrada, en Proveedor escoges a quién le compraste, y en Productos agregas las líneas con el producto y la cantidad. Presionas Crear y listo. Mira el resultado: el stock del producto pasó de cero a cincuenta, y el total se calculó solo con el precio de costo, el ocho mil. Ahora la venta. En Tipo eliges Salida, en Cliente escoges a quién le vendiste, agregas las líneas y creas. El stock bajó de cincuenta a treinta y ocho, y aquí el total se calculó con el precio de venta, el doce mil quinientos. Nunca escribes los precios a mano: el sistema los toma del producto. Tienes un detalle más: si intentas vender más unidades de las que hay, el sistema te avisa que no hay existencias suficientes y no guarda nada. Por último, si borras una operación mal registrada, el sistema revierte el efecto: los productos de una venta vuelven a la bodega. Pero la operación no se edita: se borra y se vuelve a registrar.» |
| **8** | 14:00–15:15 | Módulo **Perfil** (datos y cambio de contraseña) y módulo **Configuración** (datos de la empresa). | «Faltan dos pantallas de tu cuenta. En el ícono de la persona ves tu información y puedes cambiar tu nombre, tu apellido, tu correo y tu contraseña. La contraseña nueva debe tener mínimo ocho caracteres. En el ícono del rayo están los datos de tu empresa: puedes cambiar el nombre, el correo y el teléfono. El NIT, en cambio, aparece solo para consulta, porque es el identificador legal de la empresa y no se modifica.» |
| **9** | 15:15–16:00 | Pantalla final con los cinco módulos y un resumen en texto. | «Eso fue todo. Recuerda el orden: primero creas tus categorías, luego tus proveedores y clientes, después tus productos, y al final registras las compras y las ventas. Con las compras y las ventas, el inventario se actualiza solo. Y si necesitas repasar, todo está en el manual de usuario. Mucho éxito con tu inventario.» |

### 3.2 Estructura de la demostración en el video

Para que el video no sirva de adorno, la grabación debe mostrar **una sola cuenta**, con los datos de la sección 1.4, recorriendo en este orden: registro → ingreso → categorías → proveedor y cliente → producto → compra → venta → verificación del stock → reversión de la venta → perfil y datos de la empresa.

**El video debe terminar con el producto *Gaseosa 1.5 L* en stock 38**, para que coincida con la demostración en vivo.

---

## 4. Guion de la demostración en vivo (10 minutos)

Siga el bloque 2 del cronograma (sección 2.3). Esta sección es la **ficha de preparación**: los valores exactos a digitar y lo que debe verse.

### 4.1 Secuencia y valores

| # | Módulo | Valores a digitar | Resultado que debe verse |
| --- | --- | --- | --- |
| 1 | Inicio de sesión | `carolina@elprogreso.com` / `Demo2026` | Entra al sistema. |
| 2 | Productos → Añadir producto | Nombre: *Gaseosa 1.5 L* · Categoría: *Bebidas* · Proveedor: *Distribuidora Andina S.A.S.* · Referencia: *BEB-001* · Descripción: *Botella PET de 1.5 litros* · Stock: **0** · Costo: **8.000** · Venta: **12.500** · Estado: Activo | Fila creada con stock 0 y precio $12.500. |
| 3 | Transacciones → Nueva transacción | TIPO: **Entrada** · PROVEEDOR: *Distribuidora Andina S.A.S.* · Línea: *Gaseosa 1.5 L* × **50** | Transacción con total **$400.000**. El stock del producto pasa a **50**. |
| 4 | Transacciones → Nueva transacción | TIPO: **Salida** · CLIENTE: *Comercio Don Pepe S.A.S.* · Línea: *Gaseosa 1.5 L* × **12** | Transacción con total **$150.000**. El stock del producto pasa a **38**. |
| 5 | Productos | — | Fila del producto con **stock 38**. |
| 6 | Transacciones | — | Dos filas: la entrada de $400.000 y la salida de $150.000, con sus fechas. |
| 7 | Transacciones → eliminar la venta | Canasto de la fila de la salida | La venta desaparece. El stock del producto vuelve a **50**. |
| 8 | Transacciones → rehacer la venta | TIPO: **Salida** · CLIENTE: *Comercio Don Pepe S.A.S.* · Línea: *Gaseosa 1.5 L* × **12** | Transacción de $150.000. El stock vuelve a **38**. |

### 4.2 Frases clave del instructor

- «El stock en cero es intencional. Lo sumo con la compra para que vean de dónde sale cada unidad.»
- «En la compra el sistema usa el precio de costo; en la venta, el precio de venta. Nunca escribimos precios a mano.»
- «Miren que no me pidió confirmación al borrar. El canasto borra de inmediato: uno se cerciora de estar en la fila correcta.»
- «Si una operación está mal, no se corrige editando: se borra y se vuelve a registrar. Acabo de borrarla y las unidades volvieron a la bodega.»

### 4.3 Preparación antes de la sesión

- [ ] Verificar que la cuenta de demostración existe y que el NIT de ejemplo no está ocupado.
- [ ] La cuenta debe estar **vacía de productos y transacciones** al empezar la demostración en vivo.
- [ ] Las categorías *Bebidas* y *Aseo del hogar*, el proveedor y el cliente **sí deben existir** en la cuenta de la demostración en vivo: se crean en el video (escenas 4 y 6), pero en la sesión de práctica los asistentes los crean por su cuenta (ejercicio 1). Si no existen al momento de la demostración, créalos en un minuto antes de empezar y no narre ese paso.
- [ ] Tener abierta en una segunda pestaña la guía de práctica.

---

## 5. Práctica guiada (12 minutos)

Entregue la guía impresa. Los datos que se piden son los de la sección 1.4.

### 5.1 Ejercicio 1 — Deje lista la estructura (30:00 – 36:00)

**Objetivo:** crear 2 categorías, 1 proveedor y 1 cliente.

| Paso | Módulo y botón | Qué escribir | Resultado esperado |
| --- | --- | --- | --- |
| 1 | **Categorías** → **Añadir categoría** | Nombre: `Bebidas` | Fila *Bebidas* en la tabla. |
| 2 | **Categorías** → **Añadir categoría** | Nombre: `Aseo del hogar` | Fila *Aseo del hogar* en la tabla. |
| 3 | **Proveedores** → **Añadir proveedor** | Nombre: `Distribuidora Andina S.A.S.` | Fila del proveedor. |
| 4 | **Clientes** → **Añadir cliente** | Identificación: `900.456.789-1` · Nombre: `Comercio Don Pepe S.A.S.` · Email: `contacto@donpepe.com` · Teléfono: `300 555 4433` · Dirección: `Calle 10 # 30-20, Medellín` | Fila del cliente con los cinco campos. |

**Qué debe revisar el instructor antes de avanzar:**

- [ ] La tabla de categorías muestra exactamente dos filas.
- [ ] El cliente quedó guardado con su identificación, y no con un guion en el correo.
- [ ] El asistente entendió que **solo el nombre del proveedor es obligatorio**.

> ⚠ Si alguien quedó atascado: lo más frecuente es que el cliente se guardó con el correo vacío porque el campo es obligatorio. No es posible eliminar clientes desde la aplicación: si se creó mal, hay que corregirlo con el ícono de edición.

### 5.2 Ejercicio 2 — Registre una compra y una venta (36:00 – 42:00)

**Objetivo:** crear un producto, registrar su compra y su venta, y comprobar el resultado en el inventario.

| Paso | Módulo y botón | Qué escribir | Resultado esperado |
| --- | --- | --- | --- |
| 1 | **Productos** → **Añadir producto** | Nombre: `Jabón en polvo 1 kg` · Categoría: `Aseo del hogar` · Referencia: `AEO-001` · Descripción: `Bolsa de 1 kilogramo` · Stock: `0` · Costo: `6.000` · Venta: `9.500` · Estado: Activo | Fila del producto con stock 0. |
| 2 | **Transacciones** → **Nueva transacción** | TIPO: **Entrada** · PROVEEDOR: `Distribuidora Andina S.A.S.` · **+ Agregar** → `Jabón en polvo 1 kg` × `40` → **Crear** | Total **$240.000**. El stock pasa a **40**. |
| 3 | **Transacciones** → **Nueva transacción** | TIPO: **Salida** · CLIENTE: `Comercio Don Pepe S.A.S.` · **+ Agregar** → `Jabón en polvo 1 kg` × `15` → **Crear** | Total **$142.500**. El stock pasa a **25**. |
| 4 | **Productos** | — | La fila del jabón muestra **stock 25**. |

**Pregunta de cierre del ejercicio (la hace el instructor en voz alta):**

> «Compruébenme una cosa: ¿de dónde salieron los 25? ¿Y si mañana se venden 30 unidades más, qué debería decirles el sistema?»

**Respuesta esperada:** los 25 son 40 del total de la compra menos 15 de la venta; y el sistema debe avisar que no hay existencias suficientes, porque solo quedan 25.

**Qué debe revisar el instructor antes de cerrar la práctica:**

- [ ] El producto existe con la categoría **Aseo del hogar** (es el paso donde más se equivocan).
- [ ] Hay dos transacciones: una de **$240.000** y una de **$142.500**.
- [ ] El stock final del producto es **25**.
- [ ] Cada asistente puede explicar, con sus palabras, por qué cambió el stock.

### 5.3 Errores frecuentes en la práctica y cómo orientar

| Lo que pasa | Causa | Orientación del instructor |
| --- | --- | --- |
| El producto no se guarda y no aparece ningún mensaje. | La categoría quedó sin seleccionar. | «Revisa el campo Categoría. Aunque no lo pida, un producto sin categoría no se puede guardar.» |
| El cliente no se guarda. | Faltó el correo, que es obligatorio aunque parezca opcional. | «Todos los campos del cliente son obligatorios. Es el único registro donde pasa eso.» |
| El total de la venta no es el esperado. | Se usó un producto con otro precio de venta. | «El total no se escribe: sale del precio de venta del producto. Revisa cuál producto pusiste en la línea.» |
| No aparece el botón Crear activo. | No se agregó ninguna línea de producto, o falta la cantidad. | «En Transacciones se necesita al menos un producto con cantidad.» |
| Mensaje de stock insuficiente en una venta. | Intentó vender más de lo que había. | «Es el sistema protegiendo el inventario. Reduzca la cantidad o registre antes la compra.» |
| Intentan editar una transacción. | Buscan un ícono de lápiz. | «Las transacciones no se editan. Se borran y se vuelven a registrar.» |

---

## 6. Evaluación y cierre

### 6.1 Preguntas de selección múltiple (responder a mano alzada)

1. Al crear un producto, ¿con qué precio el sistema calcula el total de una **venta**?
   a) Con el precio que escribe el usuario. b) Con el **precio de venta** del producto. c) Con el precio de costo. d) Con el precio de la compra más reciente.
   **Respuesta: b.**
2. Va a registrar una venta de 10 unidades de un producto que tiene 5. ¿Qué hace el sistema?
   a) Guarda la venta y deja el stock en menos cinco. b) Muestra **"Stock insuficiente"** y no guarda nada. c) Guarda la venta igual. d) Pide un código de autorización.
   **Respuesta: b.**
3. Si elimina una transacción de tipo **Salida** (venta), ¿qué pasa con el stock de ese producto?
   a) Baja. b) No cambia. c) **Sube: las unidades vuelven a la bodega.** d) El producto se elimina.
   **Respuesta: c.**
4. ¿Cuál de estos datos **no se puede modificar** después de crear la cuenta?
   a) El correo electrónico. b) El teléfono de la empresa. c) **El NIT de la empresa.** d) El nombre de la empresa.
   **Respuesta: c.**
5. Al crear un cliente, su identificación es:
   a) Opcional. b) **Obligatoria y única dentro de la empresa.** c) Siempre igual al NIT de la empresa. d) Se puede repetir si cambia el nombre.
   **Respuesta: b.**
6. Antes de eliminar un registro, el sistema:
   a) Pide confirmación en una ventana. b) **No avisa y borra de inmediato.** c) Lo impide. d) Pide la contraseña del usuario.
   **Respuesta: b.**

### 6.2 Preguntas abiertas (respuesta escrita)

1. ¿Para qué sirve una categoría, y qué debe hacer si al crear un producto el sistema no lo guarda?
2. Explique con sus palabras qué le ocurre al inventario cuando se registra una entrada (compra) y cuando se registra una salida (venta).
3. Al crear un proveedor, ¿qué tres datos son obligatorios y cuáles son opcionales?
4. Registró una venta por error. ¿Cómo la corrige y qué efecto tiene sobre el inventario?
5. Después de la práctica, su producto quedó con 25 unidades. Si mañana se venden 30, ¿qué le va a decir el sistema y por qué?

### 6.3 Rúbrica de observación por asistente

| Criterio | Logrado (3) | En proceso (2) | No logrado (1) |
| --- | --- | --- | --- |
| Crea su cuenta e ingresa sin ayuda | La crea con todos los datos de la empresa | La crea con ayuda | No logra crearla |
| Organiza el catálogo | Crea categorías, proveedor y cliente sin errores | Crea los registros con algún dato mal | Solo crea parte de los registros |
| Registra compras y ventas | Registra ambas con los valores correctos | Registra ambas con algún valor mal | Solo registra una, o ninguna |
| Comprende el efecto en el inventario | Explica por qué el stock quedó en 25 | Reconoce que el stock cambió pero no lo explica | No logra explicar el cambio |
| Evita errores de eliminación | No eliminó nada por error y sabe que el borrado es inmediato | No eliminó nada pero no sabe que es inmediato | Eliminó un registro por error |

**Puntaje:** de 5 a 15 puntos. **De 5 a 10:** se recomienda repetir la práctica. **De 11 a 15:** el asistente está listo para usar el sistema por su cuenta.

### 6.4 Encuesta de satisfacción (entregar al final)

1. ¿Qué le pareció la explicación del sistema? (1 = Confuso, 5 = Muy clara)
2. ¿Logró crear su cuenta y su catálogo? (Sí, por completo / Sí, con ayuda / No)
3. ¿Entiende cómo registrar una compra y una venta? (Sí, por completo / Más o menos / No)
4. ¿Sabe qué hacer si necesita cambiar su contraseña? (Sí / No)
5. ¿Qué parte del sistema le gustaría ver primero en una próxima sesión? (___)
6. Comentarios adicionales (___)

---

## 7. Anexo A — Avisos del instructor

Estos comportamientos del sistema pueden confundir a los asistentes. menciónelos en voz alta en el momento indicado.

| # | Aviso | Dónde mencionarlo |
| --- | --- | --- |
| 1 | **La pantalla de inicio puede verse vacía.** No es un error: el sistema abre con la barra de módulos y hay que elegir un módulo. | Al terminar la escena 1 del video. |
| 2 | **El registro devuelve al inicio de sesión.** Tras crear la cuenta hay que volver a ingresar con el correo y la contraseña recién creados. | En la escena 2 del video y en el ejercicio 1. |
| 3 | **El borrado es inmediato y no pide confirmación.** Hay que verificar la fila antes de tocar el canasto. En la demostración en vivo y en los ejercicios 1 y 2. |
| 4 | **Los clientes no se pueden eliminar** desde la aplicación: si se crea uno mal, hay que corregirlo con el ícono de edición. | En el ejercicio 1. |
| 5 | **Una categoría con productos no se puede eliminar.** Si alguien intenta borrarla, shows a reasignar o eliminar antes los productos. | En la práctica, si alguien pregunta. |
| 6 | **Algunos formularios no muestran el motivo del error.** Si algo no se guardó, la causa más común es un campo obligatorio vacío. | Al revisar los ejercicios. |
| 7 | **El stock en rojo indica menos de 10 unidades.** Es una señal de alerta, no un error. | En la escena 5 del video. |
| 8 | **La columna "Proveedor" de la tabla de productos puede mostrarse vacía.** Es una parte del sistema que está en construcción. | Solo si alguien lo pregunta. |
| 9 | **La aplicación no tiene panel de estadísticas, reportes ni buscador.** Para consultar, el asistente debe abrir la tabla del módulo correspondiente y revisarla. | En el cierre. |

---

## 8. Anexo B — Producción del video tutorial

### 8.1 Preparación

- [ ] Cuenta de demostración creada y limpia, con los datos de la sección 1.4.
- [ ] Para la grabación del video, la cuenta debe estar **vacía**: el video muestra la creación de las dos categorías, del proveedor y del cliente (escenas 4 y 6). Si ya existen, use otra cuenta o bórrelos antes de grabar.
- [ ] Grabar a **1920 × 1080**, con el cursor visible y el texto del sistema ampliado al 125 % para que se lea bien.
- [ ] Ocultar la barra de direcciones, la bandeja del sistema y cualquier notificación del computador.
- [ ] Usar solo datos ficticios. No mostrar correos ni documentos reales.

### 8.2 Reglas de edición

| Regla | Detalle |
| --- | --- |
| Idioma | Español, con la misma voz en off en toda la locución. |
| Subtítulos | Sí, obligatorios: buena parte de los asistentescapacitación está viendo sin sonido. |
| Ritmo | Pausado. Repetir la acción si el movimiento del mouse fue brusco. |
| Música | Solo en la apertura y el cierre; nunca durante las explicaciones. |
| Transiciones | Cortes simples, sin efectos que distraigan. |
| Marcadores | Poner un capítulo de cada escena para poder saltar a un punto durante la capacitación. |
| Duración final | 16 minutos, ±30 s. |

### 8.3 Orden de grabación

1. Grabe primero la sesión de datos (crear cuenta, crear todo) en una sola toma continua, sin cortes.
2. Grabe por separado las pantallas que se repiten: el listado de productos, el de transacciones y la pantalla de perfil.
3. Grabe la locución en off en un ambiente silencioso, con el guion de la sección 3.1 a la vista.
4. En la edición, inserte la locución sobre la grabación respetando los timecodes de la sección 3.1.

### 8.4 Plan B si la sesión se atrasa

Si al llegar al minuto 30 los asistentes no han terminado el ejercicio 1:

- Elimine la **reversión de la venta** de la demostración en vivo (pasos 7 y 8) y mentione que se explica en el manual.
- En el ejercicio 2, pida solo la **compra** y la verificación del stock, y deje la venta como tarea para la casa.
- Si es necesario, omita la proyección de la escena 6 (proveedores y clientes) yexplíquela en 2 minutos al final.

### 8.5 Condiciones para dar la capacitación por cumplida

- Cada asistente tiene cuenta creada y puede ingresar sin ayuda.
- Cada asistente tiene al menos una categoría, un producto y un proveedor o cliente.
- Cada asistente registró una entrada y una salida, y puede explicar el cambio de inventario.
- La evaluación se aplicó y se registró el resultado en la rúbrica de la sección 6.3.
