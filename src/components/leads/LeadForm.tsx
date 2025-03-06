// components/leads/LeadForm.tsx
"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
// import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLeadStore } from '@/store/leadStore';
import { CreateLeadDto } from '@/types/lead';

export function LeadForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { createLead } = useLeadStore();
  
  const form = useForm<CreateLeadDto>({
    defaultValues: {
      name: '',
      email: '',
      status: 'New'
    }
  });
  
  const onSubmit = async (data: CreateLeadDto) => {
    setIsSubmitting(true);
    try {
      await createLead(data);
      form.reset();
      // toast({
      //   title: 'Success',
      //   description: 'Lead created successfully',
      // });
    } catch  {
      // toast({
      //   title: 'Error',
      //   description: error.response?.data?.message || 'Failed to create lead',
      //   variant: 'destructive',
      // });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Lead</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              rules={{ required: 'Name is required' }}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="john@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              rules={{ 
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              }}
            />
            
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="New">New</SelectItem>
                      <SelectItem value="Engaged">Engaged</SelectItem>
                      <SelectItem value="Proposal Sent">Proposal Sent</SelectItem>
                      <SelectItem value="Closed-Won">Closed-Won</SelectItem>
                      <SelectItem value="Closed-Lost">Closed-Lost</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? 'Creating...' : 'Add Lead'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}