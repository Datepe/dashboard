import React, { useEffect, useState } from "react";
import mqtt from "mqtt";
import { Flat, Heat, Nested } from "@alptugidin/react-circular-progress-bar";

const client = mqtt.connect("ws://192.168.1.5:9001"); // Conectar al servidor MQTT

const App = () => {
  const [message, setMessage] = useState<any>(null);
  const [render, setRender] = useState<any>(false);

  client.on("connect", () => {
    console.log("Conectado al servidor MQTT");
    client.subscribe("data0024/Json"); // Sustituye 'topic_name' por el nombre real del tema MQTT
    setRender(true);
  });

  // Manejar los mensajes recibidos
  client.on("message", (topic, payload) => {
    console.log("Mensaje recibido:", payload.toString());
    setMessage(payload.toString());
  });

  return (
    <div className="p-4 flex space-x-6">
      <>
        <div className="h-[300px] w-[300px] shadow-md p-2 rounded-md border-[1px] ">
          <Heat
            progress={message ? JSON.parse(message)?.ruido : 0}
            range={{ from: 0, to: 600 }}
            sign={{ value: "", position: "end" }}
            showValue={true}
            revertBackground={false}
            text={"Ruido"}
            sx={{
              barWidth: 5,
              bgColor: "#dadada",
              shape: "half",
              valueSize: 13,
              textSize: 13,
              valueFamily: "Trebuchet MS",
              textFamily: "Trebuchet MS",
              valueWeight: "normal",
              textWeight: "normal",
              textColor: "#000000",
              valueColor: "#000000",
              loadingTime: 1000,
              strokeLinecap: "round",
              valueAnimation: true,
              intersectionEnabled: true,
            }}
          />
        </div>
        <div className="h-[300px] w-[300px] shadow-md p-2 rounded-md border-[1px]">
          <Heat
            progress={message ? JSON.parse(message)?.presion : 0}
            range={{ from: 0, to: 1030 }}
            sign={{ value: "", position: "end" }}
            showValue={true}
            revertBackground={false}
            text={"Presión"}
            sx={{
              barWidth: 5,
              bgColor: "#dadada",
              shape: "half",
              valueSize: 13,
              textSize: 13,
              valueFamily: "Trebuchet MS",
              textFamily: "Trebuchet MS",
              valueWeight: "normal",
              textWeight: "normal",
              textColor: "#000000",
              valueColor: "#000000",
              loadingTime: 1000,
              strokeLinecap: "round",
              valueAnimation: true,
              intersectionEnabled: true,
            }}
          />
        </div>
        <div className="h-[300px] w-[300px] shadow-md p-2 rounded-md border-[1px] flex justify-center ">
          <div
            onClick={() => {}}
            className={`${
              JSON.parse(message)?.relay == 1 ? "bg-[#94FF8B]" : "bg-[#FF8B8B]"
            }  text-white font-bold rounded-full cursor-pointer h-[100px] w-[100px] shadow-md flex text-center items-center justify-center`}
          >
            {JSON.parse(message)?.relay == 1 ? "Encendido" : "Apagado"}
          </div>
        </div>
      </>
    </div>
  );
};

export default App;
