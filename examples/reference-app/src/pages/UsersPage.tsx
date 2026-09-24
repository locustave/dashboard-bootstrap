import React from 'react';
import { TableTemplate } from '@dashboard-bootstrap/templates';
import { users, userColumns } from '../fixtures/data';
import type { User } from '../fixtures/data';

export default function UsersPage() {
  return (
    <TableTemplate<User>
      title="Users"
      description="Manage team members and permissions"
      columns={userColumns}
      rows={users}
      getRowKey={(row) => row.id}
      emptyTitle="No users found"
      emptyDescription="Add your first team member to get started."
    />
  );
}
