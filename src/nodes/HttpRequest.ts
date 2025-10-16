import axios from 'axios';
import { NodeType, WorkflowNode } from '@/types/index.js';

export const HttpRequest: NodeType = {
  name: 'httpRequest',
  description: 'Make HTTP requests to APIs',
  category: 'action',
  async execute(node: WorkflowNode, inputData: any[]): Promise<any[]> {
    const { url, method = 'GET', headers = {}, body } = node.parameters;

    if (!url) {
      throw new Error('HTTP Request: URL is required');
    }

    const results: any[] = [];

    for (const item of inputData) {
      try {
        const config: any = {
          method,
          url,
          headers,
        };

        if (body) {
          config.data = typeof body === 'string' ? JSON.parse(body) : body;
        }

        const response = await axios(config);
        results.push(response.data);
      } catch (error: any) {
        throw new Error(`HTTP Request failed: ${error.message}`);
      }
    }

    return results;
  },
};
