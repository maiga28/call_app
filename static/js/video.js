const localVideo = document.getElementById('localVideo');
const remoteVideo = document.getElementById('remoteVideo');
const startCallButton = document.getElementById('startCall');
const startAudioCallButton = document.getElementById('startAudioCallButton');
const endCallButton = document.getElementById('endCall');
const socket = new WebSocket('ws://localhost:8000/ws/chat/'); // Update with your WebSocket URL

let localStream;
let peerConnection;

const configuration = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };

// When a WebSocket message is received
socket.onmessage = (event) => {
    const data = JSON.parse(event.data);

    if (data.offer) {
        handleOffer(data.offer);
    }

    if (data.answer) {
        handleAnswer(data.answer);
    }

    if (data.iceCandidate) {
        handleNewICECandidate(data.iceCandidate);
    }
};

// Function to start the video call
startCallButton.addEventListener('click', async () => {
    // Get video and audio stream
    localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    localVideo.srcObject = localStream;

    startCall(localStream);
});

// Function to start the audio call
startAudioCallButton.addEventListener('click', async () => {
    // Get only audio stream
    localStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
    localVideo.srcObject = localStream;

    startCall(localStream);
});

// Shared function to initiate call (audio/video)
async function startCall(localStream) {
    peerConnection = new RTCPeerConnection(configuration);
    localStream.getTracks().forEach(track => peerConnection.addTrack(track, localStream));

    peerConnection.ontrack = (event) => {
        remoteVideo.srcObject = event.streams[0];
    };

    peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
            // Send the ICE candidate via WebSocket
            socket.send(JSON.stringify({ iceCandidate: event.candidate }));
        }
    };

    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);

    // Send the offer via WebSocket
    socket.send(JSON.stringify({ offer }));
}

// Handle offer received from remote peer
async function handleOffer(offer) {
    peerConnection = new RTCPeerConnection(configuration);

    localStream.getTracks().forEach(track => peerConnection.addTrack(track, localStream));

    await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);

    // Send the answer via WebSocket
    socket.send(JSON.stringify({ answer }));

    peerConnection.ontrack = (event) => {
        remoteVideo.srcObject = event.streams[0];
    };
}

// Handle answer received from remote peer
function handleAnswer(answer) {
    peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
}

// Handle new ICE candidates
function handleNewICECandidate(candidate) {
    const iceCandidate = new RTCIceCandidate(candidate);
    peerConnection.addIceCandidate(iceCandidate);
}

// End the call
endCallButton.addEventListener('click', endCall);

function endCall() {
    if (peerConnection) {
        peerConnection.close();
        peerConnection = null;
    }

    if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
        localVideo.srcObject = null;
        remoteVideo.srcObject = null;
    }

    console.log("Call ended.");
}
