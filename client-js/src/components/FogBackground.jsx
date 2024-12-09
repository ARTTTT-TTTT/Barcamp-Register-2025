import { useEffect, useRef, useState } from "react";
import NET from "vanta/dist/vanta.fog.min";
import * as THREE from "three";

function Net() {
  const [index, setIndex] = useState(0);
  const vantaRef = useRef(null);

  useEffect(() => {
    let loop = setInterval(() => {
      setIndex((pre) => (pre + 1) % 6);
    }, 5000);

    return () => clearInterval(loop);
  }, []);

  useEffect(() => {
    let vanta = NET({
      el: vantaRef.current,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.0,
      minWidth: 200.0,
      scaleMobile: 1.0,
      color: 0xf3faf9,
      blurFactor: 0.48,
      speed: 2.5,
      zoom: 0.1,
      highlightColor: 0x60bbaa,
      midtoneColor: 0xbebebe,
      lowlightColor: 0xe6e6e6,
      THREE,
    });

    return () => vanta.destroy();
  }, []);

  return (
    <div>
      <div className="fixed left-0 top-0 w-full h-screen bg-black/40 backdrop-blur-xs z-[1]" />
      <div
        ref={vantaRef}
        className="fixed left-0 top-0 w-full h-screen  z-[1] opacity-10"
      />
    </div>
  );
}

export default Net;
