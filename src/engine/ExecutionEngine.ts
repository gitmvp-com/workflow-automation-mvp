import { v4 as uuid } from 'uuid';
import { Workflow, Execution, ExecutionData, ExecutionLog, WorkflowNode } from '@/types/index.js';
import { getNode } from '@/nodes/index.js';

export class ExecutionEngine {
  async execute(workflow: Workflow, initialData: any = {}): Promise<Execution> {
    const execution: Execution = {
      id: uuid(),
      workflowId: workflow.id,
      status: 'running',
      startTime: new Date(),
      data: {},
      logs: [],
    };

    try {
      // Find trigger nodes (nodes with no incoming connections)
      const triggerNodes = workflow.nodes.filter(
        (node) => !workflow.connections.some((conn) => conn.target === node.id)
      );

      if (triggerNodes.length === 0) {
        throw new Error('No trigger nodes found in workflow');
      }

      // Execute trigger nodes with initial data
      const executedNodes = new Set<string>();
      const nodeData: ExecutionData = {};

      for (const triggerNode of triggerNodes) {
        await this.executeNode(workflow, execution, triggerNode, [initialData], nodeData, executedNodes);
      }

      execution.data = nodeData;
      execution.status = 'success';
    } catch (error: any) {
      execution.status = 'error';
      execution.error = error.message;
      this.addLog(execution, 'system', 'error', `Execution failed: ${error.message}`);
    }

    execution.endTime = new Date();
    return execution;
  }

  private async executeNode(
    workflow: Workflow,
    execution: Execution,
    node: WorkflowNode,
    inputData: any[],
    nodeData: ExecutionData,
    executedNodes: Set<string>
  ): Promise<void> {
    if (executedNodes.has(node.id)) {
      return;
    }

    const nodeType = getNode(node.type);
    if (!nodeType) {
      throw new Error(`Unknown node type: ${node.type}`);
    }

    try {
      this.addLog(execution, node.id, 'info', `Executing node with ${inputData.length} input(s)`);

      const result = await nodeType.execute(node, inputData);
      nodeData[node.id] = result;

      this.addLog(execution, node.id, 'info', `Node executed successfully, output: ${result.length} item(s)`);

      // Find all nodes that depend on this node
      const dependentConnections = workflow.connections.filter((conn) => conn.source === node.id);

      for (const connection of dependentConnections) {
        const targetNode = workflow.nodes.find((n) => n.id === connection.target);
        if (targetNode) {
          await this.executeNode(workflow, execution, targetNode, result, nodeData, executedNodes);
        }
      }

      executedNodes.add(node.id);
    } catch (error: any) {
      this.addLog(execution, node.id, 'error', error.message);
      throw error;
    }
  }

  private addLog(execution: Execution, nodeId: string, level: 'info' | 'error' | 'warning', message: string): void {
    execution.logs.push({
      nodeId,
      timestamp: new Date(),
      level,
      message,
    });
  }
}
