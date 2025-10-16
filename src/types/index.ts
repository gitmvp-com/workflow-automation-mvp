export interface Position {
  x: number;
  y: number;
}

export interface NodeConnection {
  input: string[];
}

export interface WorkflowNode {
  id: string;
  type: string;
  position: Position;
  parameters: Record<string, any>;
  connections?: NodeConnection;
}

export interface Workflow {
  id: string;
  name: string;
  description?: string;
  nodes: WorkflowNode[];
  connections: Array<{
    source: string;
    target: string;
    sourceHandle?: string;
    targetHandle?: string;
  }>;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ExecutionData {
  [nodeId: string]: any[];
}

export interface ExecutionLog {
  nodeId: string;
  timestamp: Date;
  level: 'info' | 'error' | 'warning';
  message: string;
  data?: any;
}

export interface Execution {
  id: string;
  workflowId: string;
  status: 'running' | 'success' | 'error' | 'paused';
  startTime: Date;
  endTime?: Date;
  data: ExecutionData;
  logs: ExecutionLog[];
  error?: string;
}

export interface NodeType {
  name: string;
  description: string;
  category: string;
  execute(node: WorkflowNode, inputData: any[]): Promise<any[]>;
}
