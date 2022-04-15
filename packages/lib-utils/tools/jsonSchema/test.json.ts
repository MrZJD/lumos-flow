export default {
  // 无递归，properties算复合控件最多三层
  $schema: "http://json-schema.org/draft-07/schema",
  properties: {
    common: {
      title: "特征信息",
      type: "object",
      properties: {
        pack_realtime_stream: {
          title: "打包实时流",
          type: "boolean",
        },
        pack_time_shift_stream: {
          title: "打包时移流",
          type: "boolean",
        },
      },
      required: ["pack_realtime_stream", "pack_time_shift_stream"],
      // 满足pack_time_shift_stream等于true, 就对then内容新增, 暂时不支持解析else
      if: {
        properties: {
          pack_time_shift_stream: { const: true },
        },
      },
      then: {
        properties: {
          // 联动不会与上面properties做diff，只会在上面基础上添加，如果已经有同名会直接替换
          time_shift_interval: {
            title: "时移",
            type: "array",
            min: -120,
            max: 0,
            format: "slide",
            items: {
              type: "number",
            },
          },
        },
      },
    },
    enqueue: {
      title: "入审前规则配置",
      type: "object",
      properties: {
        enqueue_delay: {
          title: "进审延时(秒)",
          type: "integer",
        },
        enqueue_interval: {
          title: "进审间隔(秒)",
          type: "integer",
        },
        expired_duration: {
          title: "任务状态有效期(秒)",
          type: "integer",
        },
        room_finish_abandon: {
          title: "关播废弃",
          type: "boolean",
        },
        room_interrupt_abandon: {
          title: "中断废弃",
          type: "boolean",
        },
      },
    },
  },
  type: "object",
};
