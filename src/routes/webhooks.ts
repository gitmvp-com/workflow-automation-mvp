import { Router, Request, Response } from 'express';
import { WorkflowStore } from '@/storage/WorkflowStore.js';
import { ExecutionEngine } from '@/engine/ExecutionEngine.js';

export function createWebhookRoutes(store: WorkflowStore, engine: ExecutionEngine): Router {
  const router = Router();

  // Webhook endpoint
  router.post('/:workflowId', async (req: Request, res: Response) => {
    try {
      const workflow = store.getWorkflow(req.params.workflowId);
      if (!workflow) {
        res.status(404).json({ error: 'Workflow not found' });
        return;
      }

      // Execute workflow with webhook data
      const execution = await engine.execute(workflow, req.body);
      store.createExecution(execution);
      res.status(200).json({ success: true, executionId: execution.id });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  return router;
}
