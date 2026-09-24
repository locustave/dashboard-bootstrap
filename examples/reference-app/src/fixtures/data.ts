import type { MetricItem } from '@dashboard-bootstrap/templates';

export const metrics: MetricItem[] = [
  { label: 'Total Revenue', value: '$48,352', trend: { direction: 'up', value: '+12.5%' } },
  { label: 'Active Users', value: '2,847', trend: { direction: 'up', value: '+8.2%' } },
  { label: 'Conversion Rate', value: '3.24%', trend: { direction: 'down', value: '-0.4%' } },
  { label: 'Avg. Session', value: '4m 32s', trend: { direction: 'neutral', value: '0.0%' } },
];

export interface User extends Record<string, unknown> {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  lastActive: string;
}

export const users: User[] = [
  { id: '1', name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'active', lastActive: '2 min ago' },
  { id: '2', name: 'Bob Smith', email: 'bob@example.com', role: 'Editor', status: 'active', lastActive: '1 hour ago' },
  { id: '3', name: 'Carol White', email: 'carol@example.com', role: 'Viewer', status: 'inactive', lastActive: '3 days ago' },
  { id: '4', name: 'David Brown', email: 'david@example.com', role: 'Editor', status: 'active', lastActive: '5 min ago' },
  { id: '5', name: 'Eve Davis', email: 'eve@example.com', role: 'Admin', status: 'active', lastActive: 'Just now' },
];

export const userColumns = [
  { id: 'name' as const, label: 'Name' },
  { id: 'email' as const, label: 'Email' },
  { id: 'role' as const, label: 'Role' },
  { id: 'status' as const, label: 'Status' },
  { id: 'lastActive' as const, label: 'Last Active' },
];

export const settingsSections = [
  { id: 'general', label: 'General' },
  { id: 'security', label: 'Security' },
  { id: 'notifications', label: 'Notifications' },
  { id: 'billing', label: 'Billing' },
  { id: 'integrations', label: 'Integrations' },
];

export const wizardSteps = [
  { label: 'Account' },
  { label: 'Organization' },
  { label: 'Preferences' },
  { label: 'Review' },
];

export const catalogItems = [
  { id: 'slack', title: 'Slack', description: 'Team messaging and notifications' },
  { id: 'github', title: 'GitHub', description: 'Code repository and CI/CD' },
  { id: 'stripe', title: 'Stripe', description: 'Payment processing' },
  { id: 'sendgrid', title: 'SendGrid', description: 'Email delivery service' },
  { id: 'datadog', title: 'Datadog', description: 'Monitoring and observability' },
  { id: 'twilio', title: 'Twilio', description: 'SMS and voice communication' },
];

export interface Message {
  id: string;
  from: string;
  subject: string;
  preview: string;
  time: string;
}

export const messages: Message[] = [
  { id: '1', from: 'Alice Johnson', subject: 'Q3 Report Ready', preview: 'The quarterly report has been finalized...', time: '10:23 AM' },
  { id: '2', from: 'Bob Smith', subject: 'Deploy Scheduled', preview: 'Production deploy is set for tonight...', time: '9:45 AM' },
  { id: '3', from: 'Carol White', subject: 'Design Review', preview: 'Please review the updated mockups...', time: 'Yesterday' },
];
