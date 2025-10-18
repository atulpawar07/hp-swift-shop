import { useEffect, useRef } from "react";

interface Partner {
  name: string;
  logo: string;
}

interface PartnerCarouselProps {
  partners: Partner[];
}

const PartnerCarousel = ({ partners }: PartnerCarouselProps) => {
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    let rotation = 0;
    const speed = 0.8; // Rotation speed

    const animate = () => {
      rotation += speed;
      if (carousel) {
        carousel.style.transform = `rotateY(${rotation}deg)`;
      }
      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, []);

  const radius = 300; // Radius of the circle
  const angleStep = 360 / partners.length;

  return (
    <div className="relative w-full h-[500px] flex items-center justify-center perspective-[1500px]">
      <div 
        ref={carouselRef}
        className="relative w-full h-full preserve-3d"
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {partners.map((partner, index) => {
          const angle = angleStep * index;
          const x = Math.sin((angle * Math.PI) / 180) * radius;
          const z = Math.cos((angle * Math.PI) / 180) * radius;

          return (
            <div
              key={index}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{
                transform: `translate3d(${x}px, 0, ${z}px) rotateY(${-angle}deg)`,
              }}
            >
              <div className="bg-background rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow backdrop-blur-sm bg-opacity-95">
                <img
                  src={partner.logo}
                  alt={`${partner.name} logo`}
                  className="h-16 w-auto object-contain"
                  onError={(e) => {
                    // Fallback to placeholder if image fails to load
                    e.currentTarget.src = "https://via.placeholder.com/150x60?text=" + partner.name;
                  }}
                />
                <p className="text-center mt-2 text-sm font-medium text-foreground">
                  {partner.name}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PartnerCarousel;
