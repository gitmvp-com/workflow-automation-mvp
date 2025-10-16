import { NodeType, WorkflowNode } from '@/types/index.js';

export const Webhook: NodeType = {
  name: 'webhook',
  description: 'Receive data from webhooks',
  category: 'trigger',
  async execute(node: WorkflowNode, inputData: any[]): Promise<any[]> {
    // Webhook returns the received data
    return inputData.length > 0 ? inputData : [{}];
  },
};
