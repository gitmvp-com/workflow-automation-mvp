import { NodeType, WorkflowNode } from '@/types/index.js';

export const Set: NodeType = {
  name: 'set',
  description: 'Set or transform data values',
  category: 'action',
  async execute(node: WorkflowNode, inputData: any[]): Promise<any[]> {
    const { assignments } = node.parameters;

    if (!assignments || !Array.isArray(assignments)) {
      throw new Error('Set: Assignments are required');
    }

    const results: any[] = [];

    for (const item of inputData) {
      const newItem = { ...item };

      for (const assignment of assignments) {
        const { key, value } = assignment;
        if (key) {
          newItem[key] = value;
        }
      }

      results.push(newItem);
    }

    return results;
  },
};
