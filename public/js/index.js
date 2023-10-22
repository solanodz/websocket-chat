(function () {
    let username;
    const socket = io();
    //form-message
    const formMessage = document.getElementById('form-message');
    //input-message
    const inputMessage = document.getElementById('input-message');
    //log-messages
    const logMessages = document.getElementById('log-messages');

    formMessage.addEventListener('submit', (event) => {
        event.preventDefault();
        const text = inputMessage.value;
        socket.emit('new-message', { username, text });
        console.log('Nuevo mensaje enviado', { username, text });
        inputMessage.value = '';
        inputMessage.focus();
    });

    function updateLogMessages(messages) {
        logMessages.innerText = '';
        messages.forEach((msg) => {
            const p = document.createElement('p');
            p.innerText = `${msg.username}: ${msg.text}`;
            logMessages.appendChild(p);
        });
    }

    socket.on('notification', ({ messages }) => {
        updateLogMessages(messages);
    });

    socket.on('new-client', () => {
        Swal.fire({
            text: 'Nuevo usuario conectado!',
            toast: true,
            position: 'top-right',
        })
    });

    Swal.fire({
        title: 'Bienvenido al chat!',
        input: 'text',
        inputPlaceholder: 'Ingrese su nombre de usuario',
        confirmButtonText: 'Ingresar',
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        showCancelButton: false,
        showCloseButton: false,
        inputValidator: (value) => {
            if (!value) {
                return 'Por favor, ingrese un nombre de usuario válido'
            }
        }
    })
        .then((result) => {
            username = result.value.trim();
            Swal.fire({
                title: `Bienvenido ${result.value.trim()}!`,
                icon: 'success',
                showConfirmButton: false,
                timer: 1500
            })
            console.log(`Hola, ${result.value}! Bienvenido al chat!`);
        }
        )
})()