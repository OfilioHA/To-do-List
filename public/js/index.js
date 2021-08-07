window.addEventListener("load", function() { 
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
            const elementoLista = document.createElement('li');
            elementoLista.classList.add('list-group-item');
            elementoLista.innerText = _DOM.text.value;
            _DOM.list.append(elementoLista);
            _DOM.text.value = "";
        })
    }

    const init = () => {
        cacheDOM();
        manejadorDeEventos();
        console.log(_DOM);
    }
    init();
});