import React, { useEffect, useState, useRef } from "react";
import Matter from "matter-js";
import { motion } from "framer-motion";

const STATIC_DENSITY = 15;
const PARTICLE_SIZE = 60;
const PARTICLE_BOUNCYNESS = 0.9;

export const MatterBanner = ({ phoneNumber }) => {
  const boxRef = useRef(null);
  const canvasRef = useRef(null);

  const [constraints, setContraints] = useState();
  const [scene, setScene] = useState();

  const [someStateValue, setSomeStateValue] = useState(false);

  const handleResize = () => {
    setContraints(boxRef.current.getBoundingClientRect());
  };

  const handleClick = () => {
    setSomeStateValue(!someStateValue);
  };

  useEffect(() => {
    let Engine = Matter.Engine;
    let Render = Matter.Render;
    let World = Matter.World;
    let Bodies = Matter.Bodies;

    let engine = Engine.create({});

    let render = Render.create({
      element: boxRef.current,
      engine: engine,
      canvas: canvasRef.current,
      options: {
        background: "transparent",
        wireframes: false,
      },
    });

    const floor = Bodies.rectangle(0, 0, 0, STATIC_DENSITY, {
      isStatic: true,
      render: {
        fillStyle: "black",
      },
    });

    World.add(engine.world, [floor]);

    Engine.run(engine);
    Render.run(render);

    setContraints(boxRef.current.getBoundingClientRect());
    setScene(render);

    window.addEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (constraints) {
      let { width, height } = constraints;

      // Dynamically update canvas and bounds
      scene.bounds.max.x = width;
      scene.bounds.max.y = height;
      scene.options.width = width;
      scene.options.height = height;
      scene.canvas.width = width;
      scene.canvas.height = height;

      // Dynamically update floor
      const floor = scene.engine.world.bodies[0];

      Matter.Body.setPosition(floor, {
        x: width / 2,
        y: height + STATIC_DENSITY / 2,
      });

      Matter.Body.setVertices(floor, [
        { x: 0, y: height },
        { x: width, y: height },
        { x: width, y: height + STATIC_DENSITY },
        { x: 0, y: height + STATIC_DENSITY },
      ]);
    }
  }, [scene, constraints]);

  useEffect(() => {
    // Add a new "ball" everytime `someStateValue` changes
    if (scene) {
      let { width } = constraints;
      let randomX = Math.floor(Math.random() * -width) + width;
      Matter.World.add(
        scene.engine.world,
        Matter.Bodies.circle(randomX, -PARTICLE_SIZE, PARTICLE_SIZE, {
          restitution: PARTICLE_BOUNCYNESS,
          render: {
            sprite: {
              texture: "/images/ball.png",
            },
          },
        })
      );
    }
  }, [someStateValue, constraints, scene]);

  const fadeIn = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        type: "easeInOut",
        duration: 2,
        delay: 1,
      },
    },
  };

  const fadeIn2 = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        type: "easeInOut",
        duration: 2,
        delay: 2,
      },
    },
  };

  const fadeIn3 = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        type: "easeInOut",
        duration: 2,
        delay: 3,
      },
    },
  };

  return (
    <div className="relative h-[80vh] min-h-[400px] mt-[90px] p-[16px] border-b-[4px]">
      <motion.h1
        variants={fadeIn}
        initial="hidden"
        animate="show"
        className="text-[68px] md:text-[140px] font-[900]"
      >
        Hungry?
      </motion.h1>
      <motion.p
        variants={fadeIn2}
        initial="hidden"
        animate="show"
        className="text-[16px] md:text-[26px] leading-[20px] md:leading-[41px] font-[700]"
      >
        A classic pizza taste from days gone by
      </motion.p>
      <motion.button
        variants={fadeIn3}
        initial="hidden"
        animate="show"
        className="rounded-full bg-[red] mt-[24px] py-[8px] px-[12px] text-[white] font-[900]"
        onClick={() => handleClick()}
      >
        Click for pizza!
      </motion.button>

      {someStateValue === false && (
        <p className="absolute left-0 bottom-0 px-[16px] text-[26px] md:text-[42px] font-[900] z-[100]">
          Call {phoneNumber}
        </p>
      )}
      <div
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        ref={boxRef}
      >
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
};

export default MatterBanner;
