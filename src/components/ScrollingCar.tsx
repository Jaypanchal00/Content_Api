"use client";
import { motion, useScroll, useTransform } from "motion/react";

export default function ScrollProgressLine() {
  const { scrollYProgress } = useScroll();
  // Transform scroll progress to pathLength (0 to 1)
  const progressWidth = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Branch and leaf effects trigger progressively with scroll
  const branchScale = useTransform(scrollYProgress, [0, 2.5], [0, 2.5]);
  const leafScale = useTransform(scrollYProgress, [0.1, 1], [0, 0]);

  // Positions along the progress line (25%, 50%, 75%, 100%)
  const spiralPositions = [
    { t: 0.25, angle: -90, delay: 0 },
    { t: 0.5, angle: 10, delay: 0.1 },
    { t: 0.75, angle: 95, delay: 0.2 },
    { t: 1, angle: 90, delay: 0.3 },
  ];

  // Spiral points for each branch (relative to base point)
  const spiralPoints = [
    { t: 0, dx: 0, dy: 0 },
    { t: 0.2, dx: 10, dy: -5, scale: 0.8 },
    { t: 0.4, dx: 15, dy: -10, scale: 0.7 },
    { t: 0.6, dx: 10, dy: -15, scale: 0.6 },
    { t: 0.8, dx: 5, dy: -20, scale: 0.5 },
    { t: 1, dx: 0, dy: -25, scale: 0.4 },
  ];

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 w-[80%] max-w-2xl h-16 z-50">
      <svg
        className="w-full h-full"
        viewBox="0 0 1020 150"
        preserveAspectRatio="xMidYMid meet"
        style={{ pointerEvents: "none" }}
      >
        {/* Background track - static wave path */}
        <path
          d="M0,75 Q125,50 250,75 T500,75 T750,75 T1000,75"
          stroke="rgba(75, 85, 99, 0.5)"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />

        {/* Animated progress wave */}
        <motion.path
          d="M0,75 Q125,50 250,75 T500,75 T750,75 T1000,75"
          stroke="url(#branchGradient)"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          style={{
            pathLength: progressWidth,
            filter: "drop-shadow(0 10px 28px #71f1a1)",
          }}
        />

        {spiralPositions.map((pos, index) => {
          // Calculate position on the quadratic Bezier curve
          const t = pos.t;
          const controlPoints = [
            { x: 0, y: 75 },
            { x: 125, y: 50 },
            { x: 250, y: 75 },
            { x: 375, y: 50 },
            { x: 500, y: 75 },
            { x: 625, y: 50 },
            { x: 750, y: 75 },
            { x: 875, y: 50 },
            { x: 1000, y: 75 },
          ];
          const segment = Math.floor(t * 4);
          const localT = (t * 4) % 1;
          const p0 = controlPoints[segment * 2];
          const p1 = controlPoints[segment * 2 + 1];
          const p2 =
            controlPoints[segment * 2 + 2] || controlPoints[segment * 2];
          const baseX =
            (1 - localT) * (1 - localT) * p0.x +
            2 * (1 - localT) * localT * p1?.x +
            localT * localT * p2.x;
          const baseY =
            (1 - localT) * (1 - localT) * p0.y +
            2 * (1 - localT) * localT * p1?.y +
            localT * localT * p2.y;

          // Rotate spiral points based on angle
          const angleRad = (pos.angle * Math.PI) / 180;
          const rotatedSpiralPoints = spiralPoints.map((point) => ({
            ...point,
            x:
              baseX +
              point.dx * Math.cos(angleRad) -
              point.dy * Math.sin(angleRad),
            y:
              baseY +
              point.dx * Math.sin(angleRad) +
              point.dy * Math.cos(angleRad),
          }));

          return (
            <motion.g key={index}>
              {/* Spiral branch path */}
              <motion.path
                d={`
                  M${rotatedSpiralPoints[0].x},${rotatedSpiralPoints[0].y}
                  C${rotatedSpiralPoints[1].x},${rotatedSpiralPoints[1].y},
                  ${rotatedSpiralPoints[2].x},${rotatedSpiralPoints[2].y},
                  ${rotatedSpiralPoints[3].x},${rotatedSpiralPoints[3].y}
                  C${rotatedSpiralPoints[4].x},${rotatedSpiralPoints[4].y},
                  ${rotatedSpiralPoints[5].x - 5 * Math.cos(angleRad)},
                  ${rotatedSpiralPoints[5].y - 5 * Math.sin(angleRad)},
                  ${rotatedSpiralPoints[5].x},${rotatedSpiralPoints[5].y}
                `}
                stroke="url(#branchGradient)"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                style={{ pathLength: branchScale }}
                transition={{
                  delay: pos.delay,
                  duration: 0.8,
                  ease: "easeOut",
                }}
              />

              {/* Leaves on spiral branch */}
              {rotatedSpiralPoints.slice(1).map((point, leafIndex) => (
                <motion.path
                  key={leafIndex}
                  d={`
                    M${point.x},${point.y}
                    C${point.x + 2},${point.y - 3},
                    ${point.x + 4},${point.y - 4},
                    ${point.x + 3},${point.y - 6}
                    C${point.x + 2},${point.y - 8},
                    ${point.x - 2},${point.y - 8},
                    ${point.x - 3},${point.y - 6}
                    C${point.x - 4},${point.y - 4},
                    ${point.x - 2},${point.y - 3},
                    ${point.x},${point.y}
                  `}
                  fill="url(#leafGradient)"
                  initial={{ scale: 0, opacity: 0 }}
                  style={{
                    scale: leafScale,
                    opacity: leafScale,
                    transformOrigin: `${point.x}px ${point.y}px`,
                    rotate:
                      leafIndex % 2 === 0 ? 30 + pos.angle : -30 + pos.angle,
                  }}
                  transition={{
                    delay: pos.delay + 0.1 + leafIndex * 0.05,
                    duration: 0.6,
                    ease: "easeOut",
                  }}
                />
              ))}
            </motion.g>
          );
        })}

        {/* Gradient definitions */}
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="50%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>

          <linearGradient id="branchGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22c55e" />
            <stop offset="100%" stopColor="#16a34a" />
          </linearGradient>

          <radialGradient id="leafGradient">
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="100%" stopColor="#059669" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
}
