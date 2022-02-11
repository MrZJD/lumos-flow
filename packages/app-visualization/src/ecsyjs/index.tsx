import React from 'react';
import ECSYDemo from './ecsy_demo';
import InspireECSDemo from '../inspire-ecs/test/demo';

export default () => {
  return (
    <div>
      <h2>ECSY</h2>

      <h3>ecsy demo</h3>
      <ECSYDemo />

      <h3>inspire-ecs demo</h3>
      <InspireECSDemo />
    </div>
  )
};
