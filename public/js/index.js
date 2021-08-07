window.addEventListener("load", function () {
    const _DOM = {
        form: null,
        list: null,
        text: null
    }

    const cacheDOM = () => {
        _DOM.form = document.getElementById('todo-form');
        _DOM.list = document.getElementById('todo-list');
        _DOM.text = document.getElementById('todo-text');
    }

    const manejadorDeEventos = () => {
        _DOM.form.addEventListener("submit", (e) => {
            e.preventDefault();
            if(_DOM.text.value === ""){
                Swal.fire('¡Error!', '¡Campo de texto vacio!', 'error')
                return;
            }
            const domTemporal = this.document.createElement('div');
            let elementoPlantilla = `
            <li class="list-group-item">
                <div class="d-flex justify-content-between align-items-center">
                    <span>${_DOM.text.value}</span>
                    <div>
                        <button class="boton-editar btn btn-outline-success py-1">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="boton-eliminar btn btn-outline-danger py-1">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </div>
                </div>
            </li>            
            `
            domTemporal.innerHTML = elementoPlantilla;
            const elementoLista = domTemporal.firstElementChild;
            _DOM.list.append(elementoLista);
            manejadorEventosDinamicos();
            _DOM.text.value = "";
            Swal.fire('¡Exito!', '¡Se ha añadido una tarea!', 'success')
        })
    }

    const manejadorEventosDinamicos = () => {
        const botonesEliminar = document.getElementsByClassName('boton-eliminar')
        const botonesEditar = document.getElementsByClassName('boton-editar')

        for (let i = 0; i < botonesEliminar.length; i++) {
            botonesEliminar[i].addEventListener("click", (e) => {
                Swal.fire({
                    title: '¿Esta seguro?',
                    text: "¡No podra revertirlo!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: '¡Si, eliminar!',
                    cancelButtonText:  '¡Cancelar!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        const { target: { offsetParent } } = e;
                        _DOM.list.removeChild(offsetParent);
                        Swal.fire('¡Exito!', '¡Se ha eliminado una tarea!', 'success')
                    }
                })
            })
        }

        for (let i = 0; i < botonesEditar.length; i++) {
            botonesEditar[i].addEventListener("click", (e) => {
                if (_DOM.text.value === "") {
                    Swal.fire('¡Error!', '¡Campo de texto vacio!', 'error')
                    return;
                };
                let button = (e.target.tagName === "I") ? e.target.parentNode : e.target;
                let span = button.parentNode.parentNode.firstElementChild;
                span.innerText = _DOM.text.value;
                _DOM.text.value = "";
                Swal.fire('¡Exito!', '¡Tarea editada exitosamente!', 'success')
                
            })
        }
    }

    const init = () => {
        cacheDOM();
        manejadorDeEventos();
    }
    init();
});