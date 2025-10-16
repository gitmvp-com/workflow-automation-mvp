import 'reflect-metadata';
import express from 'express';
import { WorkflowStore } from '@/storage/WorkflowStore.js';
import { ExecutionEngine } from '@/engine/ExecutionEngine.js';
import { createWorkflowRoutes } from '@/routes/workflows.js';
import { createExecutionRoutes } from '@/routes/executions.js';
import { createWebhookRoutes } from '@/routes/webhooks.js';

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Initialize stores and engine
const store = new WorkflowStore();
const engine = new ExecutionEngine();

// Routes
app.use('/api/workflows', createWorkflowRoutes(store, engine));
app.use('/api/executions', createExecutionRoutes(store));
app.use('/webhook', createWebhookRoutes(store, engine));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Node types endpoint
app.get('/api/nodes', (req, res) => {
  const { getAllNodes } = await import('@/nodes/index.js');
  const nodes = getAllNodes();
  res.json(
    nodes.map((node) => ({
      name: node.name,
      description: node.description,
      category: node.category,
    }))
  );
});

// Error handling
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(port, () => {
  console.log(`✨ Workflow Automation MVP running on http://localhost:${port}`);
  console.log(`📚 API Documentation: http://localhost:${port}/api/workflows`);
});
