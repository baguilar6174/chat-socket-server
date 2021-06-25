const { io } = require('../bin/www');
const { verifyJWT } = require('../helpers/jwt');
const { userConnected, userDisconnected, saveMessage } = require('../controllers/socket');

// Sockets messages
io.on('connection', (client) => {
    console.log('Client connected');
    
    const [valid, code] = verifyJWT(client.handshake.headers['authorization']);
    
    // Verificar autenticación
    if(!valid) { return client.disconnect(); }

    userConnected(code);

    // Ingresar al usuario a una sala
    client.join(code);
    
    // Listen personal-message
    client.on('personal-message', async (payload) => {
        await saveMessage(payload);
        io.to(payload.to).emit('personal-message', payload );
    });

    client.on('disconnect', () => {
        console.log('Client disconnected');
        userDisconnected(code);
    });

});