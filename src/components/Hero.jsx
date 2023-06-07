import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import camera from "../images/camera.png";
import "./hero.scss";
import folderimg from "../images/Right Bottom card.png";

function Hero() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const firstLine = container.querySelector('.firstline');
    const secondLine = container.querySelector('.secondline');
    const capsule = container.querySelector('.capsule');
    const textCapsule = capsule.querySelector('.text-capsule');
    const folder = container.querySelector('.folder');
    const folderImg = folder.querySelector('.folder-img');

    // Set initial positions
    gsap.set([firstLine, secondLine], { y: '100%' });
    gsap.set(capsule, { scaleX: 0, scaleY: 0 });
    gsap.set(folder, { x: '-100%' });

    // Create the animation timeline
    const tl = gsap.timeline({ onComplete: enableScroll });

    tl.to([firstLine, secondLine], { y: '0%', stagger: 0.2, duration: 1.5, ease: 'power4.out' })
      .to(capsule, { scaleX: 1, scaleY: 1, duration: 0.6, ease: 'back.out(1.7)' })
      .to(textCapsule, { opacity: 1, duration: 0.6}, '-=0.5')
      .to(container, { overflow: 'visible' }, '-=0.5')
      .to(folder, { x: '0%', duration: 1, ease: 'power4.out' }, '-=0.5')
      .fromTo(folderImg, { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.7)' }, '-=0.5');

    // Disable scroll during the animation
    function disableScroll() {
      document.body.style.overflow = 'hidden';
    }

    // Enable scroll after the animation is complete
    function enableScroll() {
      document.body.style.overflow = 'visible';
    }

    // Start the animation
    tl.play();
  }, []);

  return (
    <section ref={containerRef} className="container">
      <div className="firstline">
        <span>find</span> <img src={camera} alt="camera" /> <span>Content</span>
      </div>
      <div className="secondline">Creators</div>
      <div className="capsule">
        <h2 className="text-capsule">In Just A Click</h2>
      </div>
      <div className="folder">
        <img className="folder-img" src={folderimg} alt="" />
      </div>
    </section>
  );
}

export default Hero;