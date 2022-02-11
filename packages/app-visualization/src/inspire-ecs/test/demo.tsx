import React, { useEffect, useRef } from 'react';
import { World, System, Component, Entity } from '../index';

const NUM_ELEMENTS = 10;
const SPEED_MUTIPLITER = 0.1;
const SHAPE_SIZE = 30;
const SHAPE_HALF_SIZE = SHAPE_SIZE / 2;
const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 400;

let context: CanvasRenderingContext2D | null;

class Velocity extends Component<{ x: number, y: number }> {}

Velocity.defaultValue = { x: 0, y: 0 };
Velocity.toString = () => 'Velocity';

class Position extends Component<{ x: number, y: number }> {}

Position.defaultValue = { x: 0, y: 0 };
Position.toString = () => 'Position';

class Shape extends Component<{ primitive: string; }> {}

Shape.defaultValue = { primitive: 'box' };
Shape.toString = () => 'Shape';

class Box extends Entity {}

Box.toString = () => 'Box';

class MovableSystem extends System {
  execute(delta: number, time: number) {
    this.world.getEntity(Box).forEach(entity => {
      const velocity = entity.getComponent(Velocity);
      const position = entity.getComponent(Position);

      if (!velocity || !position) {
        return;
      }

      const v = velocity.getValue();
      const p = position.getValue();

      const nextP = {
        x: p.x + v.x * delta,
        y: p.y + v.y * delta,
      };

      if (nextP.x > CANVAS_WIDTH + SHAPE_HALF_SIZE) {
        nextP.x = - SHAPE_HALF_SIZE;
      }
      if (nextP.x < - SHAPE_HALF_SIZE) {
        nextP.x = CANVAS_WIDTH + SHAPE_HALF_SIZE;
      }
      if (nextP.y > CANVAS_HEIGHT + SHAPE_HALF_SIZE) {
        nextP.y = - SHAPE_HALF_SIZE;
      }
      if (nextP.y < - SHAPE_HALF_SIZE) {
        nextP.y = CANVAS_HEIGHT + SHAPE_HALF_SIZE;
      }

      position.setValue(nextP);
    });
  }
}

MovableSystem.toString = () => 'MovableSystem';

class RendererSystem extends System {
  execute(delta: number, time: number) {
    if (!context) {
      return;
    }

    context.fillStyle = '#d4d4d4';
    context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    this.world.getEntity(Box).forEach(entity => {
      const shape = entity.getComponent(Shape);
      const position = entity.getComponent(Position);

      if (!shape || !position) {
        return;
      }

      if (shape?.getValue()?.primitive === 'box') {
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

    const p = position.getValue();

    context.beginPath();
    context.rect(p.x - SHAPE_HALF_SIZE, p.y - SHAPE_HALF_SIZE, SHAPE_SIZE, SHAPE_SIZE);
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

    const p = position.getValue();

    context.beginPath();
    context.arc(p.x, p.y, SHAPE_HALF_SIZE, 0, 2 * Math.PI);
    context.fillStyle = '#39c495';
    context.fill();
    context.lineWidth = 2;
    context.strokeStyle = '#0b845b';
    context.stroke();
  }
}

RendererSystem.toString = () => 'RendererSystem';

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

    world.addSystem(
      MovableSystem,
      RendererSystem
    );

    for (let i = 0; i < NUM_ELEMENTS; i++) {
      world.addEntity(
        new Box()
          .attach(new Velocity(getRandomVelocity()))
          .attach(new Shape(getRandomShape()))
          .attach(new Position(getRandomPosition()))
      )      
    }

    world.bootstrap();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={CANVAS_WIDTH}
      height={CANVAS_HEIGHT}
    />
  );
}
