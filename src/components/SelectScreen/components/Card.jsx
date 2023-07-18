import { useRef, isValidElement, cloneElement } from "react";

import {
  Environment,
  MeshPortalMaterial,
  RoundedBox,
  useTexture,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { easing } from "maath";

export default function Card({
  texture,
  environment = "night",
  children,
  active,
  onSelect,
  name,
  ship,
  hovered,
  ...props
}) {
  const card = useRef();
  const map = useTexture(texture);

  useFrame((_state, delta) => {
    easing.damp(card.current, "blend", active === name ? 1 : 0, 0.1, delta);
  });

  return (
    <group {...props}>
      <RoundedBox
        args={[3, 3, 0.1]}
        radius={0.1}
        onClick={onSelect}
        name={name}
      >
        <MeshPortalMaterial ref={card}>
          <ambientLight intensity={0.5} />
          <Environment
            preset={active === name || hovered === name ? "city" : environment}
          />
          {active === name && ship}
          <mesh>
            <sphereGeometry args={[5, 32, 32]} />
            <meshStandardMaterial map={map} side={THREE.BackSide} />
          </mesh>
        </MeshPortalMaterial>
      </RoundedBox>
    </group>
  );
}
