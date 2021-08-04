import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';

export default function TestWebsocket() {
    //     const [isPaused, setPause] = useState(false);
    // const uri = "http://localhost:5000/";
    //     const ws = useRef(null);

    //     useEffect(() => {
    //         ws.current = new WebSocket("wss://echo.websocket.org");
    //         ws.current.onopen = () => console.log("ws opened");
    //         ws.current.onclose = () => console.log("ws closed");

    //         return () => {
    //             ws.current.close();
    //         };
    ////eslint-disable-next-line
    //     }, []);

    var socket;
    const connect = () => {
        console.log('aa')
        socket = io.connect("http://localhost:5000/");
        socket.on('after connect', function(msg) {
            console.log('After connect', msg);
            // $('#log').append('<br>' + $('<div/>').text('Received: ' + msg.data).html());
        });
        
    }
    const disconnect = () => {
        socket.disconnect();
    }

    // useEffect(() => {
    //     const socket = io.connect(uri, { forceNew: true });
    //     console.log(socket)

    //     // // socket.on("connect", () => {
    //     // //     // either with send()
    //     // //     // socket.send("Hello!");

    //     // //     // or with emit() and custom event names
    //     // //     // socket.emit("salutations", "Hello!", { "mr": "john" }, Uint8Array.from([1, 2, 3, 4]));
    //     // // });

    //     // socket.on("messages", function (data) {
    //     //     console.log(data);
    //     // });
    // }, []);

    //     useEffect(() => {
    //         if (!ws.current) return;

    //         ws.current.onmessage = e => {
    //             if (isPaused) return;
    //             const message = JSON.parse(e.data);
    //             console.log("e", message);
    //         };
    //     }, [isPaused]);

    return (
        <div>
            <div id="messages">En desarrollo</div>
            <button onClick={connect}>
                conectar
            </button>
            <button onClick={disconnect}>
                desconectar
            </button>
            {/* <button onClick={() => setPause(!isPaused)}>
                {isPaused ? "Resume" : "Pause"}
            </button> */}
        </div>
    );
}