// app/page.tsx
import { LeadForm } from '@/components/leads/LeadForm';
import { LeadTable } from '@/components/leads/LeadTable';

export default function Dashboard() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Lead Management System</h1>
        <p className="text-muted-foreground mt-2">Track and manage your sales leads efficiently</p>
      </div>
      
      <div className="grid gap-8 md:grid-cols-2">
        <LeadForm />
        <LeadTable />
      </div>
    </div>
  );
}