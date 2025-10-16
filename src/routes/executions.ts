import { Router, Request, Response } from 'express';
import { WorkflowStore } from '@/storage/WorkflowStore.js';

export function createExecutionRoutes(store: WorkflowStore): Router {
  const router = Router();

  // List all executions
  router.get('/', (req: Request, res: Response) => {
    const executions = store.getAllExecutions();
    res.json(executions);
  });

  // Get execution
  router.get('/:id', (req: Request, res: Response) => {
    const execution = store.getExecution(req.params.id);
    if (execution) {
      res.json(execution);
    } else {
      res.status(404).json({ error: 'Execution not found' });
    }
  });

  // Get execution logs
  router.get('/:id/logs', (req: Request, res: Response) => {
    const execution = store.getExecution(req.params.id);
    if (execution) {
      res.json(execution.logs);
    } else {
      res.status(404).json({ error: 'Execution not found' });
    }
  });

  return router;
}
