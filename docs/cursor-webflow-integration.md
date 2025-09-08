# Cursor and Webflow Integration Guide

This document explains how to use the Cursor and Webflow integration for the Collaboration Online Meet project.

## Configuration Files Overview

### QWEN.md
This file contains custom configurations and integration settings for Qwen Code to work seamlessly with the project. It includes:
- Project overview and technology stack
- Cursor integration settings
- AI development guidelines
- MCP integration configuration
- Development workflow guidelines

### mcp.json
This file contains the configuration for the MCP server integration, including:
- Server URL and timeout settings
- Webflow and Figma integration endpoints
- Logging and backup configurations
- Webflow CLI settings and site information

### settings.json
This file contains Cursor-specific settings for the Webflow integration:
- Integration enablement flags
- Default site configurations
- MCP server settings
- Development settings

### .cursor/rules/webflow.mdc
This is a Cursor rule file that enforces Webflow integration best practices:
- Webflow CLI command guidelines
- MCP server integration requirements
- Design system compliance rules
- Deployment workflow guidelines

## Setting Up Cursor Integration

1. Install Cursor IDE from https://cursor.sh/
2. Open the project in Cursor
3. The IDE will automatically detect and apply the configuration files
4. Ensure you have access to the MCP server credentials

## Using Webflow Integration

### Prerequisites
- Access to the PSU-Rizal Webflow workspace
- MCP server credentials
- Webflow CLI (automatically managed through the project)

### Webflow CLI Commands
The integration uses the following Webflow CLI commands:
- `webflow login` - Authenticate with Webflow
- `webflow sites list` - List available Webflow sites
- `webflow sites pull <site-id>` - Pull site data from Webflow
- `webflow sites push <site-id>` - Push site changes to Webflow
- `webflow cms pull <site-id>` - Pull CMS data from Webflow
- `webflow cms push <site-id>` - Push CMS changes to Webflow

### MCP Integration Workflow
All Webflow operations must go through the MCP server:

1. Before any Webflow operation, Cursor calls the MCP server to:
   - Validate user permissions
   - Log the operation for audit purposes
   - Retrieve the latest Webflow assets

2. After any Webflow operation, Cursor calls the MCP server to:
   - Report operation status
   - Sync any changes with the project repository
   - Update audit logs

## Design System Compliance

When working with Webflow components:

1. Only use components from the official PSU-Rizal Webflow workspace
2. Maintain consistency with the existing design system
3. Follow responsive design principles
4. Ensure accessibility compliance

## Deployment Workflow

1. All changes must be tested locally first
2. Use `webflow sites pull` to get the latest site data
3. Make required changes in the local environment
4. Call MCP server to validate changes
5. Use `webflow sites push` to deploy changes
6. Verify deployment through the MCP server

## Troubleshooting

### Common Issues

1. **Authentication failures**: Ensure MCP server credentials are correct
2. **Permission errors**: Verify you have the required permissions for Webflow operations
3. **Sync issues**: Check network connectivity to the MCP server

### Getting Help

If you encounter issues with the integration:
1. Check the MCP server logs for error details
2. Verify your permissions with the project administrator
3. Consult the project documentation in the `/docs` folder