import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Receipt, Download, CreditCard, Calendar, DollarSign, AlertCircle } from 'lucide-react';

interface Payment {
  id: string;
  date: string;
  description: string;
  amount: number;
  method: 'Credit Card' | 'Bank Transfer' | 'Cash';
  status: 'Completed' | 'Pending' | 'Failed';
  invoiceNumber: string;
  membershipPeriod?: string;
}

interface MembershipPlan {
  name: string;
  price: number;
  duration: string;
  features: string[];
  current: boolean;
}

export function PaymentHistory() {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const [payments] = useState<Payment[]>([
    {
      id: '1',
      date: '2024-09-01',
      description: 'Monthly Membership - September',
      amount: 1200.00,
      method: 'Credit Card',
      status: 'Completed',
      invoiceNumber: 'INV-2024-001',
      membershipPeriod: 'Sep 1 - Sep 30, 2024'
    },
    {
      id: '2',
      date: '2024-08-01',
      description: 'Monthly Membership - August',
      amount: 1200.00,
      method: 'Credit Card',
      status: 'Completed',
      invoiceNumber: 'INV-2024-002',
      membershipPeriod: 'Aug 1 - Aug 31, 2024'
    },
    {
      id: '3',
      date: '2024-07-15',
      description: 'Daily Gym Access',
      amount: 40.00,
      method: 'Cash',
      status: 'Completed',
      invoiceNumber: 'INV-2024-003'
    },
    {
      id: '4',
      date: '2024-07-01',
      description: 'Monthly Membership - July',
      amount: 1200.00,
      method: 'Credit Card',
      status: 'Completed',
      invoiceNumber: 'INV-2024-004',
      membershipPeriod: 'Jul 1 - Jul 31, 2024'
    },
    {
      id: '5',
      date: '2024-06-20',
      description: 'Daily Gym Access',
      amount: 40.00,
      method: 'Cash',
      status: 'Completed',
      invoiceNumber: 'INV-2024-005'
    },
    {
      id: '6',
      date: '2024-06-01',
      description: 'Monthly Membership - June',
      amount: 1200.00,
      method: 'Credit Card',
      status: 'Failed',
      invoiceNumber: 'INV-2024-006',
      membershipPeriod: 'Jun 1 - Jun 30, 2024'
    }
  ]);

  const [membershipPlans] = useState<MembershipPlan[]>([
    {
      name: 'Daily',
      price: 40.00,
      duration: 'per visit',
      features: ['Gym access', 'Locker room', 'Basic equipment', 'Pay per visit'],
      current: false
    },
    {
      name: 'Monthly',
      price: 1200.00,
      duration: 'per month',
      features: ['Unlimited gym access', 'Locker room', 'All equipment', 'Fixed monthly rate'],
      current: true
    }
  ]);

  const filteredPayments = payments.filter(payment => {
    if (selectedFilter === 'all') return true;
    return payment.status.toLowerCase() === selectedFilter;
  });

  const getStatusColor = (status: Payment['status']) => {
    switch (status) {
      case 'Completed': return 'default';
      case 'Pending': return 'secondary';
      case 'Failed': return 'destructive';
      default: return 'secondary';
    }
  };

  const getMethodIcon = (method: Payment['method']) => {
    switch (method) {
      case 'Credit Card': return <CreditCard className="h-4 w-4" />;
      case 'Bank Transfer': return <Receipt className="h-4 w-4" />;
      case 'Cash': return <DollarSign className="h-4 w-4" />;
      default: return <Receipt className="h-4 w-4" />;
    }
  };

  const totalPaid = payments
    .filter(p => p.status === 'Completed')
    .reduce((sum, payment) => sum + payment.amount, 0);

  const currentYear = new Date().getFullYear();
  const yearlyTotal = payments
    .filter(p => p.status === 'Completed' && new Date(p.date).getFullYear() === currentYear)
    .reduce((sum, payment) => sum + payment.amount, 0);

  return (
    <div className="space-y-6">
      {/* Payment Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Current Plan</p>
                <p className="text-2xl font-bold">Monthly</p>
                <p className="text-sm text-muted-foreground">₱1,200/month</p>
              </div>
              <CreditCard className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">This Year</p>
                <p className="text-2xl font-bold">₱{yearlyTotal.toFixed(2)}</p>
                <p className="text-sm text-muted-foreground">Total paid</p>
              </div>
              <Calendar className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Next Payment</p>
                <p className="text-2xl font-bold">Oct 1</p>
                <p className="text-sm text-muted-foreground">Auto-renewal</p>
              </div>
              <AlertCircle className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Payment History */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Payment History</CardTitle>
                <CardDescription>Your transaction history and receipts</CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <select 
                  value={selectedFilter} 
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  className="px-3 py-1 border rounded text-sm"
                >
                  <option value="all">All Payments</option>
                  <option value="completed">Completed</option>
                  <option value="pending">Pending</option>
                  <option value="failed">Failed</option>
                </select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPayments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell>{payment.date}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{payment.description}</p>
                          {payment.membershipPeriod && (
                            <p className="text-sm text-muted-foreground">{payment.membershipPeriod}</p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getMethodIcon(payment.method)}
                          <span className="text-sm">{payment.method}</span>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">₱{payment.amount.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(payment.status)}>
                          {payment.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {payment.status === 'Completed' && (
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Membership Plans */}
        <Card>
          <CardHeader>
            <CardTitle>Membership Plans</CardTitle>
            <CardDescription>Compare and upgrade your plan</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {membershipPlans.map((plan) => (
                <div 
                  key={plan.name}
                  className={`p-4 border rounded-lg ${plan.current ? 'border-primary bg-primary/5' : ''}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">{plan.name}</h4>
                    {plan.current && <Badge>Current</Badge>}
                  </div>
                  <p className="text-2xl font-bold mb-2">
                    ₱{plan.price}
                    <span className="text-sm font-normal text-muted-foreground"> {plan.duration}</span>
                  </p>
                  <ul className="text-sm space-y-1 mb-4">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <div className="w-1 h-1 bg-primary rounded-full" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  {!plan.current && (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="w-full">
                          {plan.price > membershipPlans.find(p => p.current)?.price! ? 'Upgrade' : 'Downgrade'}
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Change Membership Plan</DialogTitle>
                          <DialogDescription>
                            Are you sure you want to change to the {plan.name} plan?
                          </DialogDescription>
                        </DialogHeader>
                        <div className="py-4">
                          <p className="text-sm text-muted-foreground">
                            Your new plan will take effect from the next billing cycle on October 1, 2024.
                          </p>
                        </div>
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline">Cancel</Button>
                          <Button>Confirm Change</Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}