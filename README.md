# Workflow Automation MVP

A simplified workflow automation platform inspired by n8n. This MVP demonstrates core workflow automation capabilities without authentication or complex integrations.

## Features

- **Visual Workflow Builder**: Create workflows with connected nodes
- **Node Types**:
  - Manual Trigger: Start workflows manually
  - HTTP Request: Make API calls
  - Code: Execute JavaScript code
  - Set: Set/transform data
  - Merge: Combine multiple inputs
  - Webhook: Receive webhook events
- **Workflow Execution**: Execute workflows with real-time logging
- **Data Transformation**: Pass and transform data between nodes
- **REST API**: Complete REST API for workflow management

## Quick Start

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The server will start on http://localhost:3000

### Build

```bash
npm run build
npm start
```

## API Endpoints

### Workflows

- `GET /api/workflows` - List all workflows
- `POST /api/workflows` - Create a new workflow
- `GET /api/workflows/:id` - Get workflow details
- `PUT /api/workflows/:id` - Update workflow
- `DELETE /api/workflows/:id` - Delete workflow
- `POST /api/workflows/:id/execute` - Execute workflow

### Executions

- `GET /api/executions` - List executions
- `GET /api/executions/:id` - Get execution details
- `GET /api/executions/:id/logs` - Get execution logs

### Webhooks

- `POST /webhook/:workflowId` - Receive webhook events

## Example Workflow

```json
{
  "name": "My First Workflow",
  "nodes": [
    {
      "id": "node-1",
      "type": "manualTrigger",
      "position": { "x": 0, "y": 0 },
      "parameters": {}
    },
    {
      "id": "node-2",
      "type": "httpRequest",
      "position": { "x": 300, "y": 0 },
      "parameters": {
        "url": "https://api.example.com/data",
        "method": "GET"
      },
      "connections": {
        "input": ["node-1"]
      }
    }
  ]
}
```

## Architecture

- **Express.js**: HTTP server
- **In-Memory Storage**: Workflows and executions (for MVP)
- **Modular Node System**: Extensible node types
- **Execution Engine**: Runs workflows with data flow

## Development

The project is structured as follows:

- `src/` - Source code
  - `server.ts` - Express server setup
  - `types/` - TypeScript type definitions
  - `nodes/` - Node implementations
  - `engine/` - Workflow execution engine
  - `routes/` - API routes
  - `utils/` - Utility functions

## License

MIT
