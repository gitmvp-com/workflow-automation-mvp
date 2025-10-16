import { NodeType, WorkflowNode } from '@/types/index.js';

export const Code: NodeType = {
  name: 'code',
  description: 'Execute custom JavaScript code',
  category: 'action',
  async execute(node: WorkflowNode, inputData: any[]): Promise<any[]> {
    const { code } = node.parameters;

    if (!code) {
      throw new Error('Code: Code is required');
    }

    const results: any[] = [];

    for (const item of inputData) {
      try {
        // Create a safe function with access to the input item
        const fn = new Function('item', `return (async () => { ${code} })()`); // eslint-disable-line no-new-func
        const result = await fn(item);
        results.push(result);
      } catch (error: any) {
        throw new Error(`Code execution failed: ${error.message}`);
      }
    }

    return results;
  },
};
