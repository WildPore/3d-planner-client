/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useMemo } from "react";
import { useLoader } from "@react-three/fiber";
import { RGBELoader } from "three/addons/loaders/RGBELoader.js";
import {
  PMREMGenerator,
  TextureLoader,
  MeshBasicMaterial,
  BoxGeometry,
  BackSide,
} from "three";

interface SkyboxProps {
  path: string;
}

export default function Skybox({ path }: SkyboxProps) {
  const texture = useLoader(RGBELoader, path);
  const pmremGenerator = useMemo(() => new PMREMGenerator(texture), [texture]);
  const envMap = pmremGenerator.fromEquirectangular(texture).texture;

  const boxGeometry = new BoxGeometry(1000, 1000, 1000);
  const boxMaterial = new MeshBasicMaterial({
    map: new TextureLoader().load(path),
    envMap: envMap,
    side: BackSide,
  });
  return <mesh geometry={boxGeometry} material={boxMaterial} />;
}
