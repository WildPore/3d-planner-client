import { useRef } from 'react';
import { useLoader, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

interface ModelProps {
	modelPath: string;
}

export default function Model({ modelPath }: ModelProps) {
	const group = useRef<THREE.Group | null>(null);
	const { nodes, materials } = useLoader(GLTFLoader, modelPath);

	if (materials && materials[0]) {
		materials[0].color.set(0xff0000);
	}

	useFrame(() => {
		if (group.current) {
			group.current.rotation.x += 0.005;
			group.current.rotation.y += 0.005;
		}
	});

	return (
		<group ref={group}>
			<primitive object={nodes.Scenes} />
			<OrbitControls />
		</group>
	)
}