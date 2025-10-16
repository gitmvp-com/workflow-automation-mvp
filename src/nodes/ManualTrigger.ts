import { NodeType, WorkflowNode } from '@/types/index.js';

export const ManualTrigger: NodeType = {
  name: 'manualTrigger',
  description: 'Starts a workflow manually',
  category: 'trigger',
  async execute(node: WorkflowNode, inputData: any[]): Promise<any[]> {
    // Manual trigger returns the input data as is
    return inputData.length > 0 ? inputData : [{}];
  },
};
