"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import TrueFocus from "./TrueFocus";

// SVGs for the blobs
const BLOB1_WIDTH = 120;
const BLOB1_HEIGHT = 135;
const Blob1 = () => (
  <svg width={BLOB1_WIDTH} height={BLOB1_HEIGHT} viewBox="0 0 357 405" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill="#F04A23" opacity="1.000000" stroke="none" d="M151.059662,139.914764 C155.743439,154.964355 168.414948,158.113373 181.657776,161.085281 C203.243378,165.929459 224.800201,170.985687 246.158951,176.733566 C267.879242,182.578751 288.312531,191.670456 306.590393,204.968613 C328.363708,220.809952 342.900879,241.494476 348.049561,268.356415 C353.416656,296.357971 348.124054,322.133759 332.048309,345.552155 C316.611664,368.039581 295.250671,381.728271 268.475494,387.038940 C237.984619,393.086609 210.429474,385.963776 186.112717,367.344727 C167.005768,352.714783 155.559967,332.678375 150.018692,309.303925 C146.556107,294.697815 144.743469,279.910370 144.960846,264.861664 C145.149078,251.830643 144.912201,238.793854 145.045471,225.761490 C145.095963,220.824951 145.656433,215.893631 145.974762,210.071381 C146.309998,206.052917 146.831894,202.930786 146.970245,199.791763 C147.715149,182.891663 148.283768,165.983337 149.121155,149.088165 C149.273941,146.005905 150.388870,142.971344 151.059662,139.914764 z"/>
    <path fill="#F58022" opacity="1.000000" stroke="none" d="M150.889633,139.559143 C150.388870,142.971344 149.273941,146.005905 149.121155,149.088165 C148.283768,165.983337 147.715149,182.891663 146.970245,199.791763 C146.831894,202.930786 146.309998,206.052917 145.937668,209.615326 C143.298798,204.557755 141.306885,198.649155 137.941910,193.668167 C131.690765,184.414948 121.941376,180.502335 111.382141,177.943298 C92.949486,173.476120 74.361450,169.594910 56.760883,162.091156 C31.864479,151.476913 13.573343,134.641403 7.535606,107.647202 C2.498681,85.127533 7.359644,64.139732 22.442398,46.061672 C38.131042,27.257395 58.551334,18.466709 82.638298,20.213057 C108.040619,22.054766 127.770973,34.310925 140.418610,56.909115 C148.112701,70.656548 150.721375,85.682426 150.971054,101.206848 C151.129074,111.032318 151.021042,120.862473 150.987595,130.690369 C150.977951,133.528366 150.813232,136.365829 150.889633,139.559143 z"/>
  </svg>
);
const BLOB2_WIDTH = 160;
const BLOB2_HEIGHT = 140;
const Blob2 = () => (
  <svg width={BLOB2_WIDTH} height={BLOB2_HEIGHT} viewBox="0 0 492 428" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill="#0EB178" opacity="1.000000" stroke="none" d="M298.996429,179.168213 C284.158691,183.049667 278.326294,193.719635 275.873230,207.960236 C271.710632,232.124466 267.428925,256.317535 261.780029,280.162750 C255.913513,304.926483 247.027573,328.683380 232.094101,349.768982 C214.885345,374.067261 192.108536,389.610779 162.641312,395.033661 C130.492691,400.949982 101.530075,393.226593 76.123802,373.344269 C54.460072,356.390747 41.410290,333.564484 37.181244,306.404877 C32.535347,276.568207 39.828674,249.116135 57.757984,224.964996 C73.993111,203.095947 96.418350,190.216415 122.730499,184.057617 C138.929199,180.266068 155.355865,178.076767 172.052689,177.952301 C186.986816,177.841003 201.917496,177.307510 216.851028,177.031708 C218.625549,176.998917 220.408386,177.415710 223.057556,177.798065 C247.126266,178.314774 270.324829,178.655594 293.523285,179.004074 C295.348083,179.031464 297.172058,179.112244 298.996429,179.168213 z"/>
    <path fill="#FAD01E" opacity="1.000000" stroke="none" d="M299.460297,179.094055 C297.172058,179.112244 295.348083,179.031464 293.523285,179.004074 C270.324829,178.655594 247.126266,178.314774 223.463394,177.902603 C226.450745,175.867477 229.911865,173.918076 233.352402,171.933029 C244.519028,165.490265 250.203262,155.479477 253.092239,143.162460 C258.110443,121.767426 263.108032,100.335213 269.240417,79.246048 C272.886200,66.708229 280.162933,55.558758 289.423370,46.274998 C300.784576,34.885139 314.375336,27.290718 330.656250,24.927885 C353.618439,21.595411 374.439240,25.950130 392.563477,41.037731 C407.285583,53.293240 416.241486,68.673950 419.099915,87.762070 C422.343292,109.420578 417.406769,128.804047 404.285431,146.226807 C390.836517,164.084473 372.230835,172.461746 350.748199,176.087402 C333.876831,178.934799 316.925507,179.103683 299.460297,179.094055 z"/>
  </svg>
);

function getRandomVelocity() {
  const angle = Math.random() * 2 * Math.PI;
  const speed = 0.5 + Math.random() * 0.6; // slower for smaller blobs
  return { x: Math.cos(angle) * speed, y: Math.sin(angle) * speed };
}

function getRandomPosition(
  containerWidth: number,
  containerHeight: number,
  width: number,
  height: number
) {
  return {
    x: Math.random() * (containerWidth - width),
    y: Math.random() * (containerHeight - height),
  };
}

type BlobState = { x: number; y: number; vx: number; vy: number; type: 1 | 2 };
const MOBILE_BLOB_COUNT = 3;
const DESKTOP_BLOB_COUNT = 10;

export default function ComingSoon() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [blobs, setBlobs] = useState<BlobState[]>([]);
  const [blobCount, setBlobCount] = useState(DESKTOP_BLOB_COUNT);

  useEffect(() => {
    function updateBlobCount() {
      if (window.innerWidth <= 768) {
        setBlobCount(MOBILE_BLOB_COUNT);
      } else {
        setBlobCount(DESKTOP_BLOB_COUNT);
      }
    }
    updateBlobCount();
    window.addEventListener("resize", updateBlobCount);
    return () => window.removeEventListener("resize", updateBlobCount);
  }, []);

  useEffect(() => {
    function updateSize() {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setContainerSize({ width: rect.width, height: rect.height });
      }
    }
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    if (containerSize.width === 0 || containerSize.height === 0) return;
    const arr: BlobState[] = [];
    for (let i = 0; i < blobCount; ++i) {
      const pos1 = getRandomPosition(containerSize.width, containerSize.height, BLOB1_WIDTH, BLOB1_HEIGHT);
      const vel1 = getRandomVelocity();
      arr.push({ x: pos1.x, y: pos1.y, vx: vel1.x, vy: vel1.y, type: 1 });
      const pos2 = getRandomPosition(containerSize.width, containerSize.height, BLOB2_WIDTH, BLOB2_HEIGHT);
      const vel2 = getRandomVelocity();
      arr.push({ x: pos2.x, y: pos2.y, vx: vel2.x, vy: vel2.y, type: 2 });
    }
    setBlobs(arr);
  }, [containerSize.width, containerSize.height, blobCount]);

  useEffect(() => {
    let animationFrame: number;
    function animate() {
      setBlobs((prev) => {
        const arr = prev.map((blob) => {
          const width = blob.type === 1 ? BLOB1_WIDTH : BLOB2_WIDTH;
          const height = blob.type === 1 ? BLOB1_HEIGHT : BLOB2_HEIGHT;
          const { x, y, vx, vy, type } = blob;
          let newX = x + vx;
          let newY = y + vy;
          let newVx = vx;
          let newVy = vy;
          if (newX < 0) {
            newX = -newX;
            newVx *= -1;
          } else if (newX > containerSize.width - width) {
            newX = 2 * (containerSize.width - width) - newX;
            newVx *= -1;
          }
          if (newY < 0) {
            newY = -newY;
            newVy *= -1;
          } else if (newY > containerSize.height - height) {
            newY = 2 * (containerSize.height - height) - newY;
            newVy *= -1;
          }
          return { x: newX, y: newY, vx: newVx, vy: newVy, type };
        });
        // Simple collision: bounce if overlapping
        for (let i = 0; i < arr.length; ++i) {
          for (let j = i + 1; j < arr.length; ++j) {
            const a = arr[i];
            const b = arr[j];
            const aw = a.type === 1 ? BLOB1_WIDTH : BLOB2_WIDTH;
            const ah = a.type === 1 ? BLOB1_HEIGHT : BLOB2_HEIGHT;
            const bw = b.type === 1 ? BLOB1_WIDTH : BLOB2_WIDTH;
            const bh = b.type === 1 ? BLOB1_HEIGHT : BLOB2_HEIGHT;
            const acx = a.x + aw / 2, acy = a.y + ah / 2;
            const bcx = b.x + bw / 2, bcy = b.y + bh / 2;
            const dx = acx - bcx, dy = acy - bcy;
            const minDist = Math.max(aw, ah, bw, bh) * 0.45;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < minDist) {
              const tempVx = a.vx;
              const tempVy = a.vy;
              a.vx = b.vx;
              a.vy = b.vy;
              b.vx = tempVx;
              b.vy = tempVy;
              const overlap = minDist - dist;
              const nx = dx / dist;
              const ny = dy / dist;
              a.x += nx * (overlap / 2);
              a.y += ny * (overlap / 2);
              b.x -= nx * (overlap / 2);
              b.y -= ny * (overlap / 2);
            }
          }
        }
        return arr;
      });
      animationFrame = requestAnimationFrame(animate);
    }
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [containerSize.width, containerSize.height]);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center bg-white overflow-hidden"
      style={{ width: "100vw", height: "100vh" }}
    >
      {/* Top Logo Placeholder */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20">
        <div className="rounded-2xl px-6 py-2 bg-white/60 backdrop-blur-md">
          <Image
            src="/MiniHackathon Logo.svg"
            alt="MiniHackathon Logo"
            width={260}
            height={60}
            style={{ objectFit: "contain" }}
            priority
          />
        </div>
      </div>

      {/* Centered Coming Soon Text */}
      <TrueFocus 
        sentence="Coming Soon"
        manualMode={false}
        blurAmount={5}
        borderColor="red"
        animationDuration={2}
        pauseBetweenAnimations={1}
      />

      {/* Animated Blobs */}
      {blobs.length > 0 && blobs.map((blob, i) => (
        <div
          key={i}
          className="absolute z-0 opacity-30"
          style={{
            left: blob.x,
            top: blob.y,
            width: blob.type === 1 ? BLOB1_WIDTH : BLOB2_WIDTH,
            height: blob.type === 1 ? BLOB1_HEIGHT : BLOB2_HEIGHT,
            pointerEvents: "none",
          }}
        >
          {blob.type === 1 ? <Blob1 /> : <Blob2 />}
        </div>
      ))}

      {/* Bottom Logo Placeholder */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
        <div className="rounded-2xl px-2 py-2 bg-white/60 backdrop-blur-md flex flex-col items-center">
          <span className="text-xs text-gray-500 mb-2">Organized By</span>
          <Image
            src="/ms_club_logo.svg"
            alt="MS Club Logo"
            width={160}
            height={40}
            style={{ objectFit: "contain" }}
          />
        </div>
      </div>
    </div>
  );
}
