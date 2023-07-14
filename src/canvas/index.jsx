import { Canvas } from '@react-three/fiber';
import { Environment, Center } from '@react-three/drei';

import { Shirt } from '../components/Shirt';
import { Backdrop } from '../components/Backdrop';
import { CameraRig } from '../components/CameraRig';

export function CanvasModel() {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <Environment preset="city" />
      <CameraRig>
        {/* <Backdrop /> */}
        <Center>
          <Shirt />
        </Center>
      </CameraRig>
    </Canvas>
  );
}
