import React from 'react';
import InstanceForm from '../components/InstanceForm';

function InstancesPage() {
  return (
    <>
      <h2>Create Instance</h2>
      <InstanceForm onSuccess={() => window.location.reload()} />
      {/* Add instance list later */}
    </>
  );
}

export default InstancesPage;
