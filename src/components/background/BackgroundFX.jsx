import PixelBlast from "./PixelBlast";

export default function BackgroundFX() {
  return (
    <div className="bgfx"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
      aria-hidden="true"
    >
      <PixelBlast
        variant="square"
        pixelSize={4}
        color="#6b7280"
        patternScale={2}
        patternDensity={1}
        enableRipples
        rippleSpeed={0.4}
        rippleThickness={0.12}
        rippleIntensityScale={1.5}
        liquid={false}
        speed={0.5}
        edgeFade={0.25}
        transparent
      />
    </div>
  );
}
