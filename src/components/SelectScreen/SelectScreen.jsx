import { useRef, useEffect, useState } from "react";

import {
  Environment,
  CameraControls,
  Text,
  useCursor,
} from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";

import { Cargo, Rogue, Time } from "../Ships";
import Card from "./components/Card";

export default function SelectScreen() {
  const [active, setActive] = useState(null);
  const [hovered, setHovered] = useState(null);
  useCursor(hovered);
  const controlsRef = useRef();
  const cargoRef = useRef();
  const rogueRef = useRef();
  const timeRef = useRef();
  const scene = useThree((state) => state.scene);

  useEffect(() => {
    if (active) {
      const targetPosition = new THREE.Vector3();
      scene.getObjectByName(active).getWorldPosition(targetPosition);

      controlsRef.current.setLookAt(
        0,
        0,
        10,
        targetPosition.x,
        targetPosition.y,
        targetPosition.z,
        true
      );
    } else {
      controlsRef.current.setLookAt(0, 0, 20, 0, 0, 0, true);
    }
  }, [active]);

  const toggleActive = (name) => setActive(active === name ? null : name);

  useEffect(() => {
    if (active === "cargo") {
      gsap.to(cargoRef.current.position, {
        duration: 5,
        repeat: -1,
        yoyo: true,
        y: 0.2,
      });
      gsap.to(cargoRef.current.rotation, {
        duration: 200,
        repeat: -1,
        yoyo: true,
        y: Math.PI * 20,
      });
    } else {
      gsap.to(cargoRef.current.position, {
        duration: 5,
        repeat: -1,
        yoyo: true,
        y: 0.2,
      });
    }
    console.log(hovered);

    if (active === "rogue") {
      gsap.to(rogueRef.current.position, {
        duration: 5,
        repeat: -1,
        yoyo: true,
        y: 0.2,
      });
      gsap.to(rogueRef.current.rotation, {
        duration: 200,
        repeat: -1,
        yoyo: true,
        y: Math.PI * 20,
      });
    } else {
      gsap.to(rogueRef.current.position, {
        duration: 3,
        repeat: -1,
        yoyo: true,
        y: 0.2,
      });
      gsap.to(rogueRef.current.rotation, {
        duration: 5,
        repeatDelay: 2,
        repeat: -1,
        yoyo: true,
        z: Math.PI * 2,
      });
      gsap.from(rogueRef.current.position, {
        duration: 5,
        // repeatDelay: 2,
        repeat: -1,
        yoyo: true,
        x: -Math.sin(Math.PI * 0.2),
        y: -Math.cos(Math.PI * 0.2),
      });
      gsap.to(rogueRef.current.position, {
        duration: 5,
        // repeatDelay: 2,
        repeat: -1,
        yoyo: true,
        x: Math.sin(Math.PI * 0.2),
        y: Math.cos(Math.PI * 0.2),
      });
    }

    if (active === "time") {
      gsap.to(timeRef.current.position, {
        duration: 5,
        repeat: -1,
        yoyo: true,
        y: 0.2,
      });
      gsap.to(timeRef.current.rotation, {
        duration: 200,
        repeat: -1,
        yoyo: true,
        y: Math.PI * 20,
      });
    } else {
      gsap.to(timeRef.current.rotation, {
        duration: 200,
        // repeatDelay: 2,
        repeat: -1,
        yoyo: true,
        y: Math.PI * 20,
      });
    }
  }, [active]);

  return (
    <>
      <CameraControls
        ref={controlsRef}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 3}
        maxAzimuthAngle={Math.PI / 4}
        minAzimuthAngle={-Math.PI / 4}
        minDistance={1}
        maxDistance={20}
      />
      <ambientLight intensity={0.5} />
      <Environment preset="night" />
      <mesh>
        <Text
          font="fonts/Tektur-VariableFont_wdth,wght.ttf"
          fontSize={0.5}
          position={[0, -2.5, 0]}
        >
          Select your ship
          <meshStandardMaterial color="white" />
        </Text>
        <group
          active={active}
          onClick={() => toggleActive("cargo")}
          onPointerEnter={() => setHovered("cargo")}
          onPointerLeave={() => setHovered(null)}
        >
          <Card
            texture="textures/cargo-world.jpg"
            position-x={-4}
            position-z={0.5}
            rotation-y={Math.PI / 8}
            active={active}
            name="cargo"
            ship={<Cargo scale={0.8} ref={cargoRef} />}
            hovered={hovered}
          />
          {active !== "cargo" && (
            <Cargo
              scale={0.4}
              position-x={-3.37}
              position-z={2}
              rotation-y={Math.PI / 8}
              ref={cargoRef}
            />
          )}
        </group>
        <group
          active={active}
          onClick={() => toggleActive("rogue")}
          onPointerEnter={() => setHovered("rogue")}
          onPointerLeave={() => setHovered(null)}
        >
          <Card
            texture="textures/rogue-world.jpg"
            name="rogue"
            active={active}
            ship={<Rogue scale={0.4} ref={rogueRef} />}
            hovered={hovered}
          />
          {active !== "rogue" && (
            <Rogue scale={0.2} position-z={2} ref={rogueRef} />
          )}
        </group>
        <group
          active={active}
          onClick={() => toggleActive("time")}
          onPointerEnter={() => setHovered("time")}
          onPointerLeave={() => setHovered(null)}
        >
          <Card
            texture="textures/time-world.jpg"
            position-x={4}
            position-z={0.5}
            rotation-y={-(Math.PI / 8)}
            name="time"
            active={active}
            ship={<Time scale={0.4} ref={timeRef} />}
            hovered={hovered}
          />
          {active !== "time" && (
            <Time
              scale={0.2}
              position-x={3.37}
              position-z={2}
              rotation-y={-(Math.PI / 8)}
              ref={timeRef}
            />
          )}
        </group>
      </mesh>
    </>
  );
}
