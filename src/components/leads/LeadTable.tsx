// components/leads/LeadTable.tsx
"use client";

import { useEffect } from 'react';
import { format } from 'date-fns';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLeadStore } from '@/store/leadStore';
import { Lead, LeadStatus } from '@/types/lead';

export function LeadTable() {
  const { leads, isLoading, fetchLeads } = useLeadStore();

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  // Function to get the badge color based on status
  const getStatusBadgeVariant = (status: LeadStatus) => {
    switch (status) {
      case 'New':
        return "bg-blue-100 text-blue-800 hover:bg-blue-100";
      case 'Engaged':
        return "bg-purple-100 text-purple-800 hover:bg-purple-100";
      case 'Proposal Sent':
        return "bg-amber-100 text-amber-800 hover:bg-amber-100";
      case 'Closed-Won':
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case 'Closed-Lost':
        return "bg-red-100 text-red-800 hover:bg-red-100";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  };

  if (isLoading && leads.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>All Leads</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center py-8">
            <div className="animate-pulse flex space-x-2">
              <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
              <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
              <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>All Leads</span>
          <Badge variant="outline" className="ml-2">
            {leads.length} {leads.length === 1 ? 'Lead' : 'Leads'}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {leads.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No leads found. Create your first lead!</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leads.map((lead) => (
                  <TableRow key={lead._id}>
                    <TableCell className="font-medium">{lead.name}</TableCell>
                    <TableCell>{lead.email}</TableCell>
                    <TableCell>
                      <Badge className={getStatusBadgeVariant(lead.status as LeadStatus)}>
                        {lead.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {format(new Date(lead.createdAt), 'MMM d, yyyy')}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}