import React, { useEffect, useRef } from 'react';
import { World, System, Component, Types, TagComponent, Entity } from 'ecsy';

const NUM_ELEMENTS = 10;
const SPEED_MUTIPLITER = 0.1;
const SHAPE_SIZE = 30;
const SHAPE_HALF_SIZE = SHAPE_SIZE / 2;
const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 400;

let context: CanvasRenderingContext2D | null;

type TVelocity = { x: number, y: number };

class Velocity extends Component<TVelocity> {}

Velocity.schema = {
  x: { type: Types.Number },
  y: { type: Types.Number }
};

class Position extends Component<{ x: number, y: number }> {}

Position.schema = {
  x: { type: Types.Number },
  y: { type: Types.Number }
};

class Shape extends Component<{ primitive: string; }> {}

Shape.schema = {
  primitive: {
    type: Types.String,
    default: 'box'
  }
};

class Renderable extends TagComponent {}

class MovableSystem extends System {
  execute(delta: number, time: number) {
    this.queries.moving.results.forEach(entity => {
      const velocity = entity.getComponent<Component<TVelocity>>(Velocity);
      const position = entity.getMutableComponent<Position>(Position);

      position.x += velocity.x * delta;
      position.y += velocity.y * delta;

      if (position.x > CANVAS_WIDTH + SHAPE_HALF_SIZE) {
        position.x = - SHAPE_HALF_SIZE;
      }
      if (position.x < - SHAPE_HALF_SIZE) {
        position.x = CANVAS_WIDTH + SHAPE_HALF_SIZE;
      }
      if (position.y > CANVAS_HEIGHT + SHAPE_HALF_SIZE) {
        position.y = - SHAPE_HALF_SIZE;
      }
      if (position.y < - SHAPE_HALF_SIZE) {
        position.y = CANVAS_HEIGHT + SHAPE_HALF_SIZE
      }
    });
  }
}

MovableSystem.queries = {
  moving: {
    components: [Velocity, Position]
  }
};

class RendererSystem extends System {
  execute(delta: number, time: number) {
    if (!context) {
      return;
    }

    context.fillStyle = '#d4d4d4';
    context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    this.queries.renderables.results.forEach(entity => {
      const shape = entity.getComponent<Shape>(Shape);
      const position = entity.getComponent(Position);
      
      if (shape?.primitive === 'box') {
        this.drawBox(position);
      } else {
        this.drawCircle(position);
      }
    });
  }

  drawBox(position: Position) {
    if (!context) {
      return;
    }

    context.beginPath();
    context.rect(position.x - SHAPE_HALF_SIZE, position.y - SHAPE_HALF_SIZE, SHAPE_SIZE, SHAPE_SIZE);
    context.fillStyle = '#e2736e';
    context.fill();
    context.lineWidth = 2;
    context.strokeStyle = '#b74843';
    context.stroke();
  }

  drawCircle(position: Position) {
    if (!context) {
      return;
    }

    context.beginPath();
    context.arc(position.x, position.y, SHAPE_HALF_SIZE, 0, 2 * Math.PI);
    context.fillStyle = '#39c495';
    context.fill();
    context.lineWidth = 2;
    context.strokeStyle = '#0b845b';
    context.stroke();
  }
}

RendererSystem.queries = {
  renderables: {
    components: [Renderable, Shape]
  }
};

function getRandomVelocity() {
  return {
    x: SPEED_MUTIPLITER * (2 * Math.random() - 1),
    y: SPEED_MUTIPLITER * (2 * Math.random() - 1)
  };
}

function getRandomPosition() {
  return {
    x: Math.random() * CANVAS_WIDTH,
    y: Math.random() * CANVAS_HEIGHT
  }
}

function getRandomShape() {
  return {
    primitive: Math.random() >= 0.5 ? 'circle' : 'box'
  };
}

export default () => {
  const canvasRef = useRef<HTMLCanvasElement>();

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }


    context = canvasRef.current.getContext("2d");

    const world = new World();
    world
      .registerComponent(Velocity)
      .registerComponent(Position)
      .registerComponent(Shape)
      .registerComponent(Renderable)
      .registerSystem(MovableSystem)
      .registerSystem(RendererSystem);

    for (let i = 0; i < NUM_ELEMENTS; i++) {
      world
        .createEntity()
        .addComponent(Velocity, getRandomVelocity())
        .addComponent(Shape, getRandomShape())
        .addComponent(Position, getRandomPosition())
        .addComponent(Renderable)        
    }

    var lastTime = performance.now();

    // Run!
    function run() {
      // Compute delta and elapsed time
      context?.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      var time = performance.now();
      var delta = time - lastTime;

      // Run all the systems
      world.execute(delta, time);

      lastTime = time;
      requestAnimationFrame(run);
    }

    run();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={CANVAS_WIDTH}
      height={CANVAS_HEIGHT}
    />
  );
}
