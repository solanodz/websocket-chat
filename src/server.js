import app from './app.js';
import { init } from './socket.js'

const PORT = 8080;

const httpServer = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto https://localhost:${PORT}`);
});

init(httpServer)