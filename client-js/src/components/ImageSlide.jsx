import { useEffect, useRef, useState } from "react";
import GLOBE from "vanta/dist/vanta.globe.min";
import * as THREE from "three";

function ImageSlide() {
  const [index, setIndex] = useState(0);
  const vantaRef = useRef(null);

  useEffect(() => {
    let loop = setInterval(() => {
      setIndex((pre) => (pre + 1) % 6);
    }, 5000);

    return () => clearInterval(loop);
  }, []);

  useEffect(() => {
    let vanta = GLOBE({
      el: vantaRef.current,
      mouseControls: true,
      touchControls: true,
      gyroControls: true,
      minHeight: 200.0,
      minWidth: 200.0,
      scale: 1.0,
      scaleMobile: 1.0,
      color: 0xff823f,
      color2: 0xff8c8c,
      backgroundColor: 0x0,
      //backgroundAlpha: 0.0,
      THREE,
    });

    return () => vanta.destroy();
  }, []);

  return (
    <div>
      <div className="fixed left-0 top-0 w-full h-screen bg-black/50 backdrop-blur-sm z-[1]" />
      <div
        ref={vantaRef}
        className="fixed left-0 top-0 w-full h-screen  z-[1] opacity-30"
      />
      <div
        style={{
          transform: `translate(-${index * 100}% , 0)`,
        }}
        className="transition-all ease-in-out duration-[0.5s] w-full h-screen flex fixed left-0 top-0"
      >
        <img
          className="object-cover min-w-full h-full"
          src="/gallery/gallery1.jpg"
        />
        <img
          className="object-cover min-w-full h-full"
          src="/gallery/gallery2.jpg"
        />
        <img
          className="object-cover min-w-full h-full"
          src="/gallery/gallery3.jpg"
        />
        <img
          className="object-cover min-w-full h-full"
          src="/gallery/gallery4.jpg"
        />
        <img
          className="object-cover min-w-full h-full"
          src="/gallery/gallery5.jpg"
        />
        <img
          className="object-cover min-w-full h-full"
          src="/gallery/gallery6.jpg"
        />
      </div>
    </div>
  );
}

export default ImageSlide;
