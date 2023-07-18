import { Canvas } from "@react-three/fiber";

import SelectScreen from "./components/SelectScreen/SelectScreen";

function App() {
  return (
    <div id="scene">
      <Canvas shadows camera={{ position: [0, 0, 20], fov: 30 }}>
        <color attach="background" args={["#171720"]} />
        <SelectScreen />
      </Canvas>
    </div>
  );
}

export default App;
