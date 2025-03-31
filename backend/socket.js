const socketIo = require('socket.io');
const userModel = require('./models/user.model');
const captainModel = require('./models/captain.model');

let io;

function initializeSocket(server) {
    io = socketIo(server, {
        cors: {
            origin: '*',
            methods: [ 'GET', 'POST' ]
        }
    });

    io.on('connection', (socket) => {
        console.log(`Client connected: ${socket.id}`);


        socket.on('join', async (data) => {
            const { userId, userType } = data;
            console.log(`User joined: ${userId}, Type: ${userType}`);
            if (userType === 'user') {
                await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
            } else if (userType === 'captain') {
                await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
            }
        });


        socket.on('update-location-captain', async (data) => {
            const { userId, location } = data;
        
            if (!location || typeof location.ltd !== 'number' || typeof location.lng !== 'number') {
                return socket.emit('error', { message: 'Invalid location data' });
            }
        
            const captain = await captainModel.findById(userId);
            if (!captain) {
                return socket.emit('error', { message: 'Captain not found' });
            }
        
            try {
                await captainModel.findByIdAndUpdate(userId, {
                    location: {
                        type: 'Point',
                        coordinates: [location.lng, location.ltd] 
                    }
                });
                
                // Optionally send confirmation
                socket.emit('location-updated', { success: true });
            } catch (error) {
                console.error("Error updating captain location:", error);
                socket.emit('error', { message: 'Error updating location' });
            }
        });

        socket.on('disconnect', () => {
            console.log(`Client disconnected: ${socket.id}`);
        });
    });
}

const sendMessageToSocketId = (socketId, messageObject) => {

console.log(`Sending message to socketId ${socketId}`,messageObject);


    if (io) {
        io.to(socketId).emit(messageObject.event, messageObject.data);
    } else {
        console.log('Socket.io not initialized.');
    }
}

module.exports = { initializeSocket, sendMessageToSocketId };