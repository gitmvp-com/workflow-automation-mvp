import { NodeType, WorkflowNode } from '@/types/index.js';

export const Merge: NodeType = {
  name: 'merge',
  description: 'Merge data from multiple inputs',
  category: 'action',
  async execute(node: WorkflowNode, inputData: any[]): Promise<any[]> {
    const { mergeStrategy = 'combine' } = node.parameters;

    if (mergeStrategy === 'combine') {
      // Combine all inputs into a single object array
      return [inputData];
    } else if (mergeStrategy === 'array') {
      // Return as array of all items
      return inputData;
    } else if (mergeStrategy === 'object') {
      // Merge all items into a single object
      const merged: any = {};
      for (const item of inputData) {
        if (typeof item === 'object' && item !== null) {
          Object.assign(merged, item);
        }
      }
      return [merged];
    }

    return inputData;
  },
};
