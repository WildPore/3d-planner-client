import React, { useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import socket from "./socket";
import { Vector3 } from "three";

interface CubeProps {
  position: [number, number, number];
}

function Cube({ position }: CubeProps) {
  const mesh = useRef<THREE.Mesh | null>(null);
  const { camera } = useThree();

  useEffect(() => {
    socket.on("move-cube", (newPosition: [number, number, number]) => {
      mesh.current?.position.set(...newPosition);
      console.log("move-cube");
    });

    return () => {
      socket.off("move-cube");
    };
  }, []);

  useFrame(() => {
    camera.lookAt(mesh.current?.position || new Vector3(0, 0, 0));
  });

  return (
    <mesh
      ref={mesh}
      position={position}
      onClick={() => {
        const randomPosition: [number, number, number] = [
          Math.random() * 10 - 5,
          Math.random() * 10 - 5,
          Math.random() * 10 - 5,
        ];

        socket.emit("move-cube", randomPosition);
        mesh.current?.position.set(...randomPosition);
      }}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={"wheat"} />
    </mesh>
  );
}

export default function CubeMover() {
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Cube position={[0, 0, 0]} />
    </Canvas>
  );
}
