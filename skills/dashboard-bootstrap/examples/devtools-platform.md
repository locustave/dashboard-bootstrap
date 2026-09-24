# Example: Developer Tools Platform

## Input — Product Requirements

> Build an admin panel for a developer tools platform. It has API key management, usage analytics, webhook configuration, an integration marketplace, and a workflow automation builder. Users should be able to monitor API usage, browse available integrations, and build automation workflows visually.

## Output — dashboard.yaml

```yaml
version: 1
application:
  name: DevTools Admin
  description: Developer tools platform administration

navigation:
  - label: Overview
    icon: home
    route: /
  - label: API Keys
    icon: key
    route: /api-keys
  - label: Usage
    icon: bar-chart
    route: /usage
  - label: Webhooks
    icon: zap
    route: /webhooks
  - label: Integrations
    icon: package
    route: /integrations
  - label: Workflows
    icon: layers
    route: /workflows
  - label: Settings
    icon: settings
    route: /settings

pages:
  overview:
    route: /
    template: dashboard
    capabilities:
      metrics: true
      charts: true
      quick-actions: true
  api-keys:
    route: /api-keys
    template: table
    capabilities:
      search: true
      row-actions: true
  api-key-detail:
    route: /api-keys/:id
    template: detail
    capabilities:
      tabs: true
      actions: true
  usage:
    route: /usage
    template: dashboard
    capabilities:
      metrics: true
      charts: true
  webhooks:
    route: /webhooks
    template: table
    capabilities:
      search: true
      filters: true
      row-actions: true
  integrations:
    route: /integrations
    template: catalog
    capabilities:
      search: true
      filters: true
      grid-view: true
  workflows:
    route: /workflows
    template: builder
    capabilities:
      drag-drop: true
      preview: true
      undo-redo: true
      save: true
      toolbar: true
  settings:
    route: /settings
    template: settings
    capabilities:
      sections: true
      save-confirmation: true
```

## Coverage Report

```
Generated using existing templates:
- Overview (dashboard) — API call metrics, error rates, quick actions
- API Keys (table) — key listing with actions
- API Key Detail (detail) — key configuration and usage
- Usage Analytics (dashboard) — usage charts and metrics
- Webhooks (table) — webhook endpoint management
- Integrations (catalog) — browsable integration marketplace
- Workflows (builder) — visual workflow automation editor
- Settings (settings) — account and platform settings

Requires custom implementation:
- Real-time API usage streaming graphs
- Webhook payload inspection and replay
- Workflow execution engine and logs
- OAuth app registration flow
```
