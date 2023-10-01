import * as THREE from "three";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { OrbitControls, TransformControls } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";

import { useCommandSubtype } from "./context/useCommandSubtype";
import { CommandSubtype } from "./context/CommandSubtype";

import socket from "./socket";

interface CubeProps {
  position: [number, number, number];
}

type Vector3 = [number, number, number];

function Cube({ position }: CubeProps) {
  const [clicked, setClicked] = useState(false);
  const { subtype } = useCommandSubtype();
  const mesh = useRef<THREE.Mesh | null>(null);

  useEffect(() => {
    socket.on(
      "move-cube",
      (newPosition: Vector3, newRotation: Vector3, newScale: Vector3) => {
        mesh.current?.position.set(...newPosition);
        mesh.current?.rotation.set(...newRotation);
        mesh.current?.scale.set(...newScale);
      }
    );

    return () => {
      socket.off("move-cube");
    };
  }, []);

  // useFrame(() => {
  //   camera.lookAt(mesh.current?.position || new Vector3(0, 0, 0));
  // });

  const handleObjectChange = () => {
    const { x, y, z } = mesh.current.position;
    socket.emit(
      "move-cube",
      [...mesh.current.position],
      [...mesh.current.rotation],
      [...mesh.current.scale]
    );
  };

  function handleClick(event) {
    if (event.button === 0) {
      setClicked(!clicked);
    }

    if (event.button === 2) {
      console.log("right click");
    }
  }

  return (
    <>
      <mesh ref={mesh} position={position} onClick={handleClick}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={"wheat"} />
      </mesh>
      {clicked && (
        <TransformControls
          object={mesh}
          mode={subtype || "translate"}
          onChange={handleObjectChange}
        />
      )}
    </>
  );
}

export default function CubeMover() {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 20, 30]} intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.3} />
      <Cube position={[0, 0, 0]} />
      <OrbitControls makeDefault />
      <axesHelper args={[5]} />
    </Canvas>
  );
}
