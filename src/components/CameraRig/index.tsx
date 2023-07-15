import { ThreeElements, useFrame } from '@react-three/fiber';
import { easing, vector3 } from 'maath';
import { useSnapshot } from 'valtio';
import state from '../../store';
import React, { ReactNode, useRef } from 'react';
import { Euler, Group } from 'three';

interface CameraRigProps {
  children: ReactNode
}

export function CameraRig({ children }: CameraRigProps) {
  const group = useRef(null);
  const snap = useSnapshot(state);

  useFrame((state, delta) => {
    const isBreakpoint = window.innerWidth <= 1260;
    const isMobile = window.innerWidth <= 600;

    let targetPosition = [-0.4, 0, 2] as any;

    if (snap.intro) {
      if (isBreakpoint) targetPosition = [0, 0, 2];
      if (isMobile) targetPosition = [0, 0.2, 2.5];
    } else {
      if (isMobile) targetPosition = [0, 0, 2.5];
      else targetPosition = [0, 0, 2];
    }

    //esse posiciona na tela
    easing.damp3(state.camera.position, targetPosition, 0.25, delta)

    //esse permite a rotação
    easing.dampE(
      //@ts-ignore
      group.current.rotation,
      [state.pointer.y / 10, -state.pointer.x / 5, 0],
      0.25,
      delta,
    );
  });

  return <group ref={group}>{children}</group>;
}
