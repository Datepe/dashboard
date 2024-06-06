import React, { useEffect, useState } from "react";
import mqtt from "mqtt";
import { Flat, Heat, Nested } from "@alptugidin/react-circular-progress-bar";
import LoginForm from "./Login";

const client = mqtt.connect("ws://192.168.1.5:9001"); // Conectar al servidor MQTT

const App = () => {
  const [message, setMessage] = useState<any>(null);

  useEffect(() => {
    // Suscribirse al tema deseado
    client.on("connect", () => {
      console.log("Conectado al servidor MQTT");
      client.subscribe("data0024/Json"); // Sustituye 'topic_name' por el nombre real del tema MQTT
    });

    // Manejar los mensajes recibidos
    client.on("message", (topic, payload) => {
      console.log("Mensaje recibido:", payload.toString());
      setMessage(payload.toString());
    });

    return () => {
      client.end(); // Cerrar la conexión al desmontar el componente
    };
  }, []);

  const enviarDatosAMQTT = (estado:any) => {
    console.log("estado",JSON.stringify(estado == 1 ? 0 : 1));
    client.publish("data0024/relay", JSON.stringify(estado == 1 ? 0 : 1));
  };

  return ( 
    <div className="">
      <LoginForm />
    </div>
  );
};

export default App;
