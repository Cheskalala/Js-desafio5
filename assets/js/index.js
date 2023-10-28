document.addEventListener("DOMContentLoaded", function () {
    const tareaInput = document.getElementById("tarea-input");
    const descripcionTarea = document.getElementById("descripcion-input");  //pendiente
    const agregarBtn = document.getElementById("agregar-btn");
    const tareaList = document.getElementById("tarea-list");
    const totalTareas = document.getElementById("total-tareas");
    const tareasCompletadas = document.getElementById("tareas-completadas");

    let tareas = [
        { id: 1, nombre: "Tarea 1", completada: false, descripcion: "descripcion tarea" },
        { id: 2, nombre: "Tarea 2", completada: false, descripcion: "descripcion tarea" },
        { id: 3, nombre: "Tarea 3", completada: true, descripcion: "descripcion tarea" },
    ];

    function actualizarListaTareas() {
        tareaList.innerHTML = "";
        tareas.forEach((tarea, index) => {
            const tareaElement = document.createElement("div");
            tareaElement.className = `tarea ${tarea.completada ? 'tarea-completada' : ''}`;
            tareaElement.innerHTML = `
            
                <span>ID: ${tarea.id}</span> <span class="descripcion-tarea">${tarea.nombre}</span>
                <div class="botones">                
                <button class="cambiar-btn" data-index="${index}">checkout</button>
                <img class="borrar-btn" data-index="${index}" src="./assets/img/borrar.png" alt="Borrar"> 
                </div>
            `;
            tareaList.appendChild(tareaElement);
        });
    }

    function actualizarResumen() {
        totalTareas.textContent = tareas.length;
        const completadas = tareas.filter(tarea => tarea.completada).length;
        tareasCompletadas.textContent = completadas;
    }

    // Agregar tarea
    agregarBtn.addEventListener("click", function () {
        const nombre = tareaInput.value.trim();
        if (nombre !== "") {
            const nuevaTarea = { id: tareas.length + 1, nombre, completada: false };
            tareas.push(nuevaTarea);
            actualizarListaTareas();
            actualizarResumen();
            tareaInput.value = "";
        }
    });

    // Borrar tarea
    tareaList.addEventListener("click", function (event) {
        if (event.target.classList.contains("borrar-btn")) {
            const index = event.target.getAttribute("data-index");
            tareas.splice(index, 1);
            actualizarListaTareas();
            actualizarResumen();
        }
    });

    // Cambiar estado de tarea
    tareaList.addEventListener("click", function (event) {
        if (event.target.classList.contains("cambiar-btn")) {
            const index = event.target.getAttribute("data-index");
            tareas[index].completada = !tareas[index].completada;
            actualizarListaTareas();
            actualizarResumen();
        }
    });

    actualizarListaTareas();
    actualizarResumen();
});