# Example: SaaS CRM Dashboard

## Input — Product Requirements

> We need an admin dashboard for a SaaS CRM. The app manages contacts, deals, and companies. Sales reps need to see their pipeline metrics, browse and search contacts, view deal details, and configure notification preferences. New users should go through an onboarding wizard.

## Output — dashboard.yaml

```yaml
version: 1
application:
  name: CRM Dashboard
  description: Sales team CRM for managing contacts, deals, and companies

navigation:
  - label: Dashboard
    icon: home
    route: /
  - label: Contacts
    icon: users
    route: /contacts
  - label: Deals
    icon: dollar-sign
    route: /deals
  - label: Companies
    icon: building
    route: /companies
  - label: Settings
    icon: settings
    route: /settings
  - label: Onboarding
    icon: compass
    route: /onboarding

pages:
  dashboard:
    route: /
    template: dashboard
    capabilities:
      metrics: true
      charts: true
      activity-feed: true
  contacts:
    route: /contacts
    template: table
    capabilities:
      search: true
      filters: true
      sorting: true
      pagination: true
  contact-detail:
    route: /contacts/:id
    template: detail
    capabilities:
      tabs: true
      actions: true
      related-items: true
  deals:
    route: /deals
    template: table
    capabilities:
      search: true
      filters: true
      sorting: true
      row-actions: true
  deal-detail:
    route: /deals/:id
    template: detail
    capabilities:
      tabs: true
      sidebar: true
      actions: true
  companies:
    route: /companies
    template: table
    capabilities:
      search: true
      filters: true
      sorting: true
  company-detail:
    route: /companies/:id
    template: detail
    capabilities:
      tabs: true
      related-items: true
  settings:
    route: /settings
    template: settings
    capabilities:
      sections: true
      save-confirmation: true
  onboarding:
    route: /onboarding
    template: wizard
    capabilities:
      steps: true
      validation: true
      progress-bar: true
```

## Coverage Report

```
Generated using existing templates:
- Dashboard (dashboard) — pipeline metrics, charts, recent activity
- Contacts (table) — searchable contact list
- Contact Detail (detail) — contact profile with tabs
- Deals (table) — deal pipeline list
- Deal Detail (detail) — deal information with sidebar
- Companies (table) — company directory
- Company Detail (detail) — company profile
- Settings (settings) — notification preferences
- Onboarding (wizard) — new user setup

Requires custom implementation:
- Deal pipeline Kanban board view
- Email integration and send functionality
- Revenue forecasting charts
- Contact import from CSV/external sources
```
