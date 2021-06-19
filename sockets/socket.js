const { io } = require('../index');

// Sockets messages
io.on('connection', client => {
    console.log('Client connected');

    client.on('disconnect', () => {
        console.log('Client disconnected');
    });
    
    // Listen event
    // client.on('message', (payload) => {
    //     console.log('Message!!', payload);
    //     // Emitir un mensaje a todos los clientes conectados
    //     io.emit('message', { admin: 'New message' });
    // });

});