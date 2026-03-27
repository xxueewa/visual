import { useEffect, useRef } from 'react';
import { animate, svg } from 'animejs';

const PATH =
  'M75.824 1.12541C56.401 3.13181 33.3106 16.7307 24.1933 23.2794L8.827 41.2534C5.85619 46.8267 0.0374904 59.729 0.529211 66.7514C1.14386 75.5294 3.60247 88.0694 5.75375 92.6674C7.90503 97.2654 21.12 115.657 32.7984 124.017C44.4768 132.377 77.9753 139.901 93.3415 139.483C108.708 139.065 137.289 128.197 149.582 119.001C159.417 111.645 166.997 100.331 169.558 95.5934C170.992 90.856 174.168 78.4554 175.397 66.7514C176.627 55.0474 166.485 39.8601 161.261 33.7294C155.524 28.0167 141.223 15.3374 129.913 10.3214C115.776 4.05141 100.103 -1.38259 75.824 0Z';

export default function Scroll() {
  const pointerRef = useRef<SVGGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!pointerRef.current || !pathRef.current) return;

    const duration = 1000;

    const pointerAnimation = animate(pointerRef.current, {
      autoplay: false,
      ease: 'linear',
      duration,
      ...svg.createMotionPath(pathRef.current),
    });

    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const pixelsPerLoop = maxScroll;

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const progress = (window.scrollY % pixelsPerLoop) / pixelsPerLoop;
        pointerAnimation.seek(progress * duration);
        ticking = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="scroll-container">
      <div className="sticky-svg">
        <svg viewBox="-2 -4 180 146" overflow="visible">
          <title>Suzuka</title>
          <g stroke="none" fill="none" fillRule="evenodd">
            <g ref={pointerRef}>
              <rect x="0" y="0" width="5" height="5" rx="2" fill="#e69bba" />
            </g>
            <path ref={pathRef} d={PATH} stroke="none" strokeWidth="2" />
          </g>
        </svg>
      </div>
      <style>{`
        .scroll-container {
          height: 3000px;
          position: relative;
        }
        .sticky-svg {
          position: sticky;
          top: 0;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .sticky-svg svg {
          width: min(80vw, 80vh);
          height: min(80vw, 80vh);
        }
      `}</style>
    </div>
  );
}
