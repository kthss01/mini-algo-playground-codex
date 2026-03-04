export const problems = [
  {
    id: 'P000',
    title: 'Dummy',
    defaultInput: {
      items: [1, 2, 3],
    },
    rendererType: 'array',
    buildSteps: (input) => {
      const items = Array.isArray(input.items) ? input.items : [];
      return [
        {
          kind: 'state',
          payload: {
            items,
            pointer: 0,
          },
          meta: { label: 'init' },
        },
        {
          kind: 'visit',
          payload: {
            items,
            pointer: 1,
          },
          meta: { label: 'visit index 1' },
        },
        {
          kind: 'state',
          payload: {
            items,
            done: true,
          },
          meta: { label: 'done' },
        },
      ];
    },
  },
];
