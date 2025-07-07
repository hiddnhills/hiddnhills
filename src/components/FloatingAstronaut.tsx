import React, { useEffect, useState, useMemo, memo } from "react";

interface AstronautPosition {
  x: number;
  y: number;
  rotation: number;
  scale: number;
}

export const FloatingAstronaut = memo(() => {
  const [position, setPosition] = useState<AstronautPosition>({
    x: 10,
    y: 10,
    rotation: 0,
    scale: 1,
  });

  // Real astronaut image from reference
  const astronautImage = useMemo(
    () => (
      <img
        src="https://cdn.builder.io/api/v1/assets/0dd1a1ded0234fbb9d750f1dcd8d1bea/reference-edited-9f4b96?format=webp&width=800"
        alt="Cool astronaut with red snapback"
        className="astronaut-clean"
        style={{
          width: "80px",
          height: "80px",
          objectFit: "contain",
          filter: "contrast(1.1) saturate(1.1) brightness(1.0)",
        }}
      />
    ),
    [],
  );

  // Cool floating animation with attitude
  useEffect(() => {
    let animationFrame: number;
    let startTime = Date.now();

    const animate = () => {
      const elapsed = (Date.now() - startTime) / 1000;

      // Cooler motion with swagger
      const x =
        15 + Math.sin(elapsed * 0.2) * 35 + Math.cos(elapsed * 0.4) * 25;
      const y = 8 + Math.cos(elapsed * 0.3) * 30 + Math.sin(elapsed * 0.5) * 20;

      // More dynamic rotation with attitude
      const rotation =
        Math.sin(elapsed * 0.15) * 20 + Math.cos(elapsed * 0.25) * 10;

      // Pulsing scale with cool factor
      const scale =
        1 + Math.sin(elapsed * 0.6) * 0.15 + Math.cos(elapsed * 1.2) * 0.05;

      setPosition({ x, y, rotation, scale });

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  const containerStyle = useMemo(
    () => ({
      position: "fixed" as const,
      top: `${position.y}%`,
      left: `${position.x}%`,
      transform: `rotate(${position.rotation}deg) scale(${position.scale})`,
      zIndex: 1,
      pointerEvents: "none" as const,
      opacity: 1.0,
      transition: "transform 0.3s ease-out",
    }),
    [position],
  );

  return (
    <div
      style={containerStyle}
      className="select-none astronaut-container"
      aria-hidden="true"
    >
      {astronautImage}
    </div>
  );
});

FloatingAstronaut.displayName = "FloatingAstronaut";
