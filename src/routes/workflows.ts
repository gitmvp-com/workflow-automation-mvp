import { Router, Request, Response } from 'express';
import { WorkflowStore } from '@/storage/WorkflowStore.js';
import { ExecutionEngine } from '@/engine/ExecutionEngine.js';

export function createWorkflowRoutes(store: WorkflowStore, engine: ExecutionEngine): Router {
  const router = Router();

  // List all workflows
  router.get('/', (req: Request, res: Response) => {
    const workflows = store.getAllWorkflows();
    res.json(workflows);
  });

  // Create workflow
  router.post('/', (req: Request, res: Response) => {
    try {
      const workflow = store.createWorkflow({
        name: req.body.name || 'Untitled Workflow',
        description: req.body.description,
        nodes: req.body.nodes || [],
        connections: req.body.connections || [],
        active: req.body.active !== false,
      });
      res.status(201).json(workflow);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Get workflow
  router.get('/:id', (req: Request, res: Response) => {
    const workflow = store.getWorkflow(req.params.id);
    if (workflow) {
      res.json(workflow);
    } else {
      res.status(404).json({ error: 'Workflow not found' });
    }
  });

  // Update workflow
  router.put('/:id', (req: Request, res: Response) => {
    try {
      const workflow = store.updateWorkflow(req.params.id, req.body);
      if (workflow) {
        res.json(workflow);
      } else {
        res.status(404).json({ error: 'Workflow not found' });
      }
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Delete workflow
  router.delete('/:id', (req: Request, res: Response) => {
    const deleted = store.deleteWorkflow(req.params.id);
    if (deleted) {
      res.json({ success: true });
    } else {
      res.status(404).json({ error: 'Workflow not found' });
    }
  });

  // Execute workflow
  router.post('/:id/execute', async (req: Request, res: Response) => {
    try {
      const workflow = store.getWorkflow(req.params.id);
      if (!workflow) {
        res.status(404).json({ error: 'Workflow not found' });
        return;
      }

      const execution = await engine.execute(workflow, req.body);
      store.createExecution(execution);
      res.status(201).json(execution);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  return router;
}
