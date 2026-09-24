import React from 'react';
import { DetailTemplate } from '@dashboard-bootstrap/templates';
import Typography from '@mui/material/Typography';

export default function UserDetailPage() {
  return (
    <DetailTemplate
      title="Alice Johnson"
      sections={[
        {
          title: 'Profile',
          content: (
            <div>
              <Typography variant="body2">Email: alice@example.com</Typography>
              <Typography variant="body2">Role: Admin</Typography>
              <Typography variant="body2">Joined: January 15, 2024</Typography>
            </div>
          ),
        },
        {
          title: 'Activity',
          content: (
            <div>
              <Typography variant="body2">Last login: 2 minutes ago</Typography>
              <Typography variant="body2">Total sessions: 342</Typography>
            </div>
          ),
        },
      ]}
    />
  );
}
