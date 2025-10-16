import { v4 as uuid } from 'uuid';
import { Workflow, Execution } from '@/types/index.js';

export class WorkflowStore {
  private workflows: Map<string, Workflow> = new Map();
  private executions: Map<string, Execution> = new Map();

  // Workflow methods
  createWorkflow(data: Omit<Workflow, 'id' | 'createdAt' | 'updatedAt'>): Workflow {
    const workflow: Workflow = {
      ...data,
      id: uuid(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.workflows.set(workflow.id, workflow);
    return workflow;
  }

  getWorkflow(id: string): Workflow | undefined {
    return this.workflows.get(id);
  }

  getAllWorkflows(): Workflow[] {
    return Array.from(this.workflows.values());
  }

  updateWorkflow(id: string, data: Partial<Workflow>): Workflow | undefined {
    const workflow = this.workflows.get(id);
    if (workflow) {
      const updated = { ...workflow, ...data, updatedAt: new Date() };
      this.workflows.set(id, updated);
      return updated;
    }
    return undefined;
  }

  deleteWorkflow(id: string): boolean {
    return this.workflows.delete(id);
  }

  // Execution methods
  createExecution(execution: Execution): void {
    this.executions.set(execution.id, execution);
  }

  getExecution(id: string): Execution | undefined {
    return this.executions.get(id);
  }

  getExecutionsByWorkflow(workflowId: string): Execution[] {
    return Array.from(this.executions.values()).filter((e) => e.workflowId === workflowId);
  }

  getAllExecutions(): Execution[] {
    return Array.from(this.executions.values());
  }
}
