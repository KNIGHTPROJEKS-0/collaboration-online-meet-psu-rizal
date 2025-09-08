# Qwen Code Configuration for Collaboration Online Meet - PSU Rizal

This file contains custom configurations and integration settings for Qwen Code to work seamlessly with the Collaboration Online Meet project for Palawan State University Rizal Campus.

## Project Overview

This is a React-based web application designed for online collaboration, video conferencing, and academic management. The project integrates with Figma and Webflow through an MCP server for design automation and deployment.

## Technology Stack

- React 18
- Chakra UI for component library
- Emotion for styling
- TanStack Query for data fetching
- Firebase for backend services
- Zustand for state management
- React Router for navigation
- Webflow CLI for deployment integration

## Cursor Integration Settings

### Design Automation Rules

1. All UI/UX changes must be performed through the MCP server using Cursor automation
2. Retrieve and create designs using only Figma and Webflow components from the official PSU-Rizal workspace
3. All MCP transactions are logged for traceability
4. Manual edits to production UI files are prohibited

### Webflow Integration

The project uses `@webflow/webflow-cli` for integration with Webflow. When making design changes:

1. Always use the MCP server to fetch/update Figma modules
2. Publish changes to Webflow through the MCP server
3. Sync user data, attendance, and grades through MCP endpoints

## AI Development Guidelines

### Code Generation Patterns

- Use functional components with React hooks
- Follow Chakra UI component patterns
- Implement proper error handling with TanStack Query
- Use Zustand for complex state management
- Follow existing file structure and naming conventions

### Component Structure

```
src/
├── components/
│   ├── Auth/           # Authentication components
│   ├── Dashboard/      # Dashboard components
│   └── VideoConference/ # Video conferencing components
├── services/           # API and service integrations
├── auth.js             # Authentication logic
├── firebase.js         # Firebase configuration
├── theme.js            # Chakra UI theme customization
└── ...
```

## MCP Integration Configuration

### Required Environment Variables

- `REACT_APP_MCP_SERVER_URL` - MCP server endpoint
- `REACT_APP_FIGMA_ACCESS_TOKEN` - Figma API access token
- `REACT_APP_WEBFLOW_API_KEY` - Webflow API key
- `REACT_APP_FIREBASE_CONFIG` - Firebase configuration

### Integration Endpoints

1. Figma Asset Management: `/api/mcp/figma`
2. Webflow Deployment: `/api/mcp/webflow`
3. Backup and Restore: `/api/mcp/backup`
4. User Data Sync: `/api/mcp/sync`

## Development Workflow

1. All changes must go through feature branches: `feature/<description>`
2. Code must pass linting and testing before PR submission
3. UI/UX changes must follow the automated MCP workflow
4. Document new endpoints, modules, or UI flows in the `/docs` folder

## Custom Commands

- `npm start` - Run development server
- `npm run build` - Create production build
- `npm test` - Run tests
- Webflow deployment commands via `@webflow/webflow-cli`

## File Ignoring

Respect `.cursorignore` to avoid leaking secrets and unnecessary files:
- Environment files (.env, .env.*)
- Node modules
- Build outputs
- Log files
- OS-specific files (.DS_Store, Thumbs.db)

## Webflow-Specific Guidelines

When working with Webflow components:

1. Always use the Webflow CLI for deployment
2. Follow the design tokens and components from the PSU-Rizal Webflow workspace
3. Maintain consistency with existing responsive design patterns
4. Ensure all components are accessible and meet PSU-Rizal branding guidelines

## Figma Integration Guidelines

When retrieving or creating Figma designs:

1. Use only assets from the official PSU-Rizal Figma workspace
2. Reuse existing components and design tokens where possible
3. Maintain version control through the MCP server
4. Follow institutional accessibility and branding standards