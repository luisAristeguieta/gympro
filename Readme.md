# GymPro - Navegación Avanzada y Rutinas Fitness

Aplicación móvil desarrollada con React Native, Expo y TypeScript.

Para la realización de este proyecto se diseñó la identidad visual de la marca deportiva **GymPro**, demostrando patrones avanzados de navegación anidada multinivel, para este caso se usaron 3 tipos de navegación:

🗂️ Drawer Navigation (Sidepanel): Este fue desarrollado como el menú principal de la app para el nivel 1, ocultando el panel lateral izquierdo con las secciones de "Configuracion" y "Mi Entrenamiento"

📱 Tab Button Navigation: Gestiona la navegacion interna, empleado para el nivel 2, dejando una barra inferior fija, que permite alternar instanteamente Entre las pantallas de "Progreso" y "Rutina".

🥞 Stack Navigation: Siendo desarrollado para el nivel 3, de unas barajas y aplicando navegación profunda al estar en la pantalla de "Rutinas" se incorpara el botón con "Ver Rutina de Pecho" que lleva a la pantalla del "Plan de Entrenamiento" permitiendo nativamente el retorno para regresar a la lista. 
---

## 🏋️‍♂️ Descripción del Proyecto

La aplicación implementa una jerarquía completa de navegación combinada con persistencia de estado global en memoria:

* **Menú Lateral (DrawerNavigator - Nivel 1):** Acceso global con iconos vectoriales a las secciones principales:
  * **Mi Entrenamiento:** Carga e integra directamente el navegador de pestañas completo.
  * **Configuración:** Vista independiente para ajustes generales de la cuenta y preferencias.
* **Pestañas Inferiores (TabNavigator - Nivel 2):** Navegación persistente entre módulos de entrenamiento:
   * **Progreso (ProgressScreen):** Indicadores y métricas semanales de rendimiento físico.
   * **Rutinas (RoutineListScreen):** Listado dinámico con `FlatList` alimentado por `RoutineContext`:
     * Cabecera compacta con imagotipo corporativo oficial GymPro.
     * Tarjetas de rutinas con nombre, grupo muscular y duración estimada en minutos.
     * Acciones rápidas por tarjeta: Ver Detalle (ojo), Editar (lápiz) y Eliminar (basurero con modal de confirmación).
* **Pila de Navegación Global (RootStackNavigator - Nivel 3):** Navegación profunda hacia el detalle de entrenamiento:
  * **Detalle de Rutina (`ChestDetailScreen`):** Vista apilable que cubre el Drawer y las pestañas, mostrando el desglose técnico de series y ejercicios con botón nativo de retorno.

---

## 🕹️ Tecnologías Implementadas

* React Native
* Expo
* TypeScript
* @react-navigation/native
* @react-navigation/native-stack
* @react-navigation/drawer
* @react-navigation/bottom-tabs
* react-native-safe-area-context
* react-native-gesture-handler
* react-native-reanimated
* @expo/vector-icons (Ionicons)

---

## 🔧 Instalación y Uso

Para poder ejecutar el proyecto, sigue los siguientes pasos:

1. Clona el repositorio desde la terminal:
   ```bash
   git clone [https://github.com/luisAristeguieta/GymPro.git](https://github.com/luisAristeguieta/GymPro.git)
   cd GymPro


2. Instala las dependencias en la terminal del editor:
```bash
npm install
```

3. Inicia el servidor Expo:
```bash
npx expo start --tunnel
```

4. Ejecuta en tu móvil con la app Expo Go:
Escanea el código QR resultante o abre el enlace generado desde la aplicación Expo Go en Android o iOS.

## 📱 Vista Previa de la Aplicación

| Listado Dinámico (Rutinas) | Detalle de Rutina | Creación de Rutina | Modificación de Rutina |
| :---: | :---: | :---: | :---: |
| <img src="./Entregable/Entregables%202/4.png" width="260" /> | <img src="./Entregable/Entregables%202/1.png" width="260" /> | <img src="./Entregable/Entregables%202/2.png" width="260" /> | <img src="./Entregable/Entregables%202/3.png" width="260" /> |

### 📹 Video Demostrativo
* **Ruta local del video:** `./Entregable/Entregables%202/20260922234656.mp4`