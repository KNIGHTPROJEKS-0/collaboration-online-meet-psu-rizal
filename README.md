# Collaboration Online Meet - PSU Rizal Campus

Welcome to the **Collaboration Online Meet (COM)** project for Palawan State University Rizal Campus!  
This platform is designed to enable seamless online collaboration, video conferencing, and academic management for students and faculty—especially in situations where remote access and digital backup are critical.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Key Features](#key-features)
- [Getting Started](#getting-started)
- [Design & Automation Guidelines](#design--automation-guidelines)
- [Development Guidelines](#development-guidelines)
- [AI & Cursor Manifestation](#ai--cursor-manifestation)
- [MCP Integration: Figma & Webflow](#mcp-integration-figma--webflow)
- [Contribution Guide](#contribution-guide)
- [File & Directory Structure](#file--directory-structure)
- [License](#license)
- [Acknowledgements](#acknowledgements)

---

## Project Overview

**Collaboration Online Meet** is a web-based solution to facilitate online learning, meetings, and resource management for PSU-Rizal.  
It addresses challenges of remote education, including backup and restoration, attendance, grades tracking, and flexible communication, especially during emergencies (e.g., pandemics).

COM is designed to:

- Support students with part-time jobs or limited resources.
- Help instructors and students stay organized, compliant, and connected.
- Ensure data security, privacy, and system reliability.

---

## Key Features

- Secure video conferencing and online meeting rooms.
- Attendance and grade monitoring.
- File submission with automatic backup and restore.
- Integration with **Figma** (for design systems) and **Webflow** (for live deployment).
- Automated design-to-deployment workflow via MCP server and Cursor.
- User roles: Admin, Instructor, Student.
- Compliance with PSU-Rizal academic and branding guidelines.
- Accessibility and responsive design.

---

## Getting Started

### Prerequisites

- Node.js (LTS recommended)
- npm or yarn
- Access to PSU-Rizal Figma and Webflow workspaces
- MCP server connection credentials (provided by project admin)

### Installation

```bash
git clone https://github.com/KNIGHTPROJEKS-0/collaboration-online-meet-psu-rizal.git
cd collaboration-online-meet-psu-rizal
npm install
# or
yarn install
```

### Environment Setup

1. Copy `.env.example` to `.env` and fill in required secrets (API keys, MCP server URLs, etc.).
2. Ensure you have access to designated Figma and Webflow projects.

### Running the Project

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view in your browser.

---

## Design & Automation Guidelines

1. **All design and UI/UX changes must be performed through the MCP server using Cursor automation.**
   - Retrieve and create designs using only Figma and Webflow components from the official PSU-Rizal workspace.
   - Do not directly upload or bypass the automated workflow.
2. **Design tokens, components, and modules must be reused where possible.**
3. **All MCP transactions are logged for traceability.**
4. **Manual edits to production UI files are prohibited:** Use the automation pipeline.

**See [`CURSOR_RULE_WEBFLOW_FIGMA.md`](./CURSOR_RULE_WEBFLOW_FIGMA.md) for the full enforced policy.**

---

## Development Guidelines

- Use feature branches for all changes: `feature/<short-desc>`.
- All code must pass lint and test checks before PR submission.
- Document new endpoints, modules, or UI flows in the `/docs` folder.
- Respect `.cursorignore` to avoid leaking secrets and unnecessary files.
- Configure Cursor using the provided `QWEN.md`, `mcp.json`, and `settings.json` files.
- Follow the Webflow integration guide in `/docs/cursor-webflow-integration.md` for UI changes.

---

## AI & Cursor Manifestation

This project is **AI-IDE readable** and supports **Cursor** for automation and AI-driven development.  
All workflows—especially UI/UX—are orchestrated through AI triggers and MCP server calls for:

- Figma asset management
- Webflow deployment and CMS sync
- Backup, restore, and file monitoring

**AI agents or Cursor must always:**

- Use the MCP server for any design, update, or retrieval.
- Validate user permissions before executing admin/instructor actions.
- Log all changes with context and a rollback option.

### Cursor Configuration Files

This project includes several configuration files to optimize Cursor integration:

- `QWEN.md` - Custom configuration for Qwen Code with project-specific guidelines
- `mcp.json` - MCP server configuration for Webflow and Figma integrations
- `settings.json` - Cursor settings for Webflow integration
- `.cursor/rules/webflow.mdc` - Custom rule for Webflow integration enforcement

### Implementation Analysis

See our detailed analysis of what Cursor has implemented vs. what was orchestrated:
- `docs/cursor-implementation-analysis.md` - Analysis of Cursor's actual implementation
- `docs/refined-requirements.md` - Refined requirements for the platform

---

## MCP Integration: Figma & Webflow

- **Figma:** All designs are versioned and stored in the PSU-Rizal Figma workspace. Use only approved libraries.
- **Webflow:** Web deployments (pages, CMS, assets) are managed through the Webflow workspace and linked to Figma sources via MCP.
- **Automation:** Cursor and AI agents must call MCP endpoints for:
  - Fetching or updating Figma modules
  - Publishing changes to Webflow
  - Syncing user data, attendance, and grades

**Manual bypass is strictly forbidden. All exceptions must be logged and approved.**

---

## Contribution Guide

1. Fork the repo and create a feature branch.
2. Commit descriptive messages and reference any related issue or requirement.
3. Submit a Pull Request for review.
4. Ensure all UI/UX changes follow the automation and MCP workflows.
5. Respect project scope and limitations—only PSU-Rizal authorized users may access certain features.

---

## File & Directory Structure

```
/
├── src/                # Application source code
├── public/             # Static assets
├── docs/               # Documentation and guidelines
│   ├── cursor-webflow-integration.md  # Integration guide
│   ├── cursor-implementation-analysis.md  # Analysis of Cursor's implementation
│   └── refined-requirements.md  # Refined project requirements
├── .cursor/            # Cursor AI configuration
│   └── rules/          # Cursor rules for MCP/Webflow integration
├── .cursorignore       # Files/folders ignored by Cursor/AI-IDE
├── QWEN.md             # Qwen Code configuration and guidelines
├── mcp.json            # MCP server configuration for Webflow/Figma
├── settings.json       # Cursor settings for Webflow integration
├── CURSOR_RULE_WEBFLOW_FIGMA.md  # Design automation enforcement
├── .env.example        # Example environment variables
├── package.json
└── README.md
```

---

## License

This project is for academic and research purposes at Palawan State University - Rizal Campus.  
See `LICENSE` for details.

---

## Acknowledgements

- Palawan State University - Rizal Campus
- All faculty, students, and developers contributing to this project
- Integrations: Figma, Webflow, MCP Server, Cursor, and open-source libraries

---

> **AI/IDE Manifestation:**  
> All project workflows, design automations, and deployments are intended to be readable, interpretable, and actionable by AI development environments (such as Cursor, Copilot, or similar). For more, refer to the `CURSOR_RULE_WEBFLOW_FIGMA.md`.
