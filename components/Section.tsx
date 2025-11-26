import React, { ReactNode, useEffect, useRef, useState } from 'react';

interface SectionProps {
  id?: string;
  children: ReactNode;
  className?: string;
  bgClass?: string;
}

export const Section: React.FC<SectionProps> = ({ id, children, className = "", bgClass = "bg-transparent" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      id={id} 
      ref={sectionRef} 
      className={`py-16 md:py-24 relative overflow-visible ${bgClass} transition-opacity duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
    >
      <div className={`container mx-auto px-4 md:px-8 max-w-5xl relative z-10 ${className}`}>
        {children}
      </div>
    </section>
  );
};