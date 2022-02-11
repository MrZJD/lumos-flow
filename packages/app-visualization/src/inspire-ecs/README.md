# Inspire ECS

ECS架构

World = Entity + System组成

Entity => 由若干Component组成 => Component上面有数据和状态

System => 可以读取/修改实体的状态

## API设计思路

```typescript
const world = new World();

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

  drawBox(position: Position) {}

  drawCircle(position: Position) {}
}

RendererSystem.toString = () => 'RendererSystem';

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
```
