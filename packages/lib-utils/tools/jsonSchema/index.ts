/**
 * 思路：iterator + mapper
 */
import MatchManger from '../../pattern/MatchManager';
import TestJSON from './test.json';

type PropertyType = 'object' | 'string' | 'boolean' | 'integer';

type OtherParams = undefined | { name?: string };

interface JSONSchema {
  $schema?: string;
  type: PropertyType;
  title?: string;
  properties?: Record<string, JSONSchema>;
}

const jsonManager = new MatchManger<JSONSchema, OtherParams, any>(null);

jsonManager.add(
  schema => schema.type === 'object',
  (schema, attr) => ({
    component: '分组Wrap',
    label: `组名 - ${schema.title}`,
    field: attr?.name,
    children: Object
      .entries(schema.properties || {})
      .map(([iName, iSchema]) => jsonManager.resolve(iSchema, { name: iName }))
  })
);

jsonManager.add(
  schema => schema.type === 'string',
  (schema, attr) => ({
    component: `Input输入框`,
    field: attr?.name,
    label: schema.title
  })
);

jsonManager.add(
  schema => schema.type === 'boolean',
  (schema, attr) => ({
    component: 'Switch开关',
    field: attr?.name,
    label: schema.title
  })
);

jsonManager.add(
  schema => schema.type === 'integer',
  (schema, attr) => ({
    component: 'InputNumber',
    field: attr?.name,
    label: schema.title
  })
);

const result = jsonManager.resolve(TestJSON as JSONSchema);
