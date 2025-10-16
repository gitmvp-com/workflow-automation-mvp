import { ManualTrigger } from './ManualTrigger.js';
import { HttpRequest } from './HttpRequest.js';
import { Code } from './Code.js';
import { Set } from './Set.js';
import { Merge } from './Merge.js';
import { Webhook } from './Webhook.js';
import { NodeType } from '@/types/index.js';

const nodeRegistry: Record<string, NodeType> = {
  manualTrigger: ManualTrigger,
  httpRequest: HttpRequest,
  code: Code,
  set: Set,
  merge: Merge,
  webhook: Webhook,
};

export function getNode(type: string): NodeType | undefined {
  return nodeRegistry[type];
}

export function getAllNodes(): NodeType[] {
  return Object.values(nodeRegistry);
}
