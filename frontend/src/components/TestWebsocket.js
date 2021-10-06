import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';

export default function TestWebsocket() {
    //     const [isPaused, setPause] = useState(false);
    // const uri = "http://localhost:5000/";
    //     const ws = useRef(null);

    var socket;
    let desconectar = {
        disabled: true
    }
    let conectar = {
        disabled: false
    }
    let varDireccion= 'vad_doa';
        // var jobValue = document.getElementsByName('txtJob')[0].value

    const connect1 = () => {
        // conectando al servidor
        // socket = io.connect("http://localhost:5000/");
        // //Para emitir eventos al servidor socket
        // // socket.emit('request', /* */); 
        
        // // escuchando los eventos
        // socket.on('after connect', function(msg) {
        //     console.log('After connect', msg);
        //     // $('#log').append('<br>' + $('<div/>').text('Received: ' + msg.data).html());
        // });

        socket = io.connect('http://192.168.0.4:200/intensidad');
        socket.on('SendMetrics', function(msg) {
            console.log('SendMetrics', msg);
            // $('#log').html('<br>' + $('<div/>').text('Received: ' + JSON.stringify(msg)).html());
        });
        
    }
    const disconnect1 = () => {
        // desconectar el socket del servidor
        conectar['disabled'] = false;
        desconectar['disabled'] = true;
        socket.disconnect();
    }

    return (
        <div>
            <div id="messages">En desarrollo</div>
            <button onClick={connect1}>
                conectar
            </button>
            <button onClick={disconnect1}>
                desconectar
            </button>
        </div>
    );
}