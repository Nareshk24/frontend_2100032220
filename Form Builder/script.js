document.addEventListener('DOMContentLoaded', () => {
    const addBtn = document.querySelector('.add');
    const inputGroup = document.querySelector('.inp-group');

    function addInput() {
        const name = document.createElement('input');
        name.type = 'text';
        name.placeholder = 'Enter Your Name';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.name = `checkbox-${inputGroup.childElementCount}`;

        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = `radio-group-${inputGroup.childElementCount}`;

        const btn = document.createElement('a');
        btn.className = 'delete';
        btn.innerHTML = '&times;';
        btn.addEventListener('click', removeInput);

        const flex = document.createElement('div');
        flex.className = 'flex';

        flex.appendChild(name);
        flex.appendChild(checkbox);
        flex.appendChild(radio);
        flex.appendChild(btn);
        inputGroup.appendChild(flex);
    }

    function removeInput(event) {
        const flex = event.target.parentNode;
        inputGroup.removeChild(flex);
    }

    addBtn.addEventListener('click', (e) => {
        e.preventDefault();
        addInput();
    });
});
