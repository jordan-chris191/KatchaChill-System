import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Search, Calendar, DollarSign, Users, CreditCard } from 'lucide-react';
import type { ConfirmationData } from '../GymStaffDashboard';

interface MonthlyMember {
  id: string;
  name: string;
  membershipType: 'Monthly';
  status: 'Active' | 'Expired' | 'Expiring Soon';
  startDate: string;
  expiryDate: string;
  lastPayment: string;
  paymentMethod: string;
}

interface SubscribedMembersProps {
  onConfirmation: (data: ConfirmationData) => void;
}

export function SubscribedMembers({ onConfirmation }: SubscribedMembersProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMember, setSelectedMember] = useState<MonthlyMember | null>(null);
  const [extensionDialogOpen, setExtensionDialogOpen] = useState(false);
  const [extensionDays, setExtensionDays] = useState('30');
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const [members] = useState<MonthlyMember[]>([
    {
      id: 'MM001',
      name: 'John Doe',
      membershipType: 'Monthly',
      status: 'Active',
      startDate: '2024-01-15',
      expiryDate: '2024-12-31',
      lastPayment: '2024-09-01',
      paymentMethod: 'Credit Card'
    },
    {
      id: 'MM002',
      name: 'Jane Smith',
      membershipType: 'Monthly',
      status: 'Active',
      startDate: '2024-02-20',
      expiryDate: '2024-11-20',
      lastPayment: '2024-08-20',
      paymentMethod: 'Bank Transfer'
    },
    {
      id: 'MM003',
      name: 'Mike Johnson',
      membershipType: 'Monthly',
      status: 'Expired',
      startDate: '2023-12-10',
      expiryDate: '2024-03-10',
      lastPayment: '2024-02-10',
      paymentMethod: 'Cash'
    },
    {
      id: 'MM004',
      name: 'Sarah Wilson',
      membershipType: 'Monthly',
      status: 'Expiring Soon',
      startDate: '2024-03-05',
      expiryDate: '2024-10-05',
      lastPayment: '2024-09-05',
      paymentMethod: 'Credit Card'
    }
  ]);

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getDaysLeft = (expiryDate: string): number => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  };

  const getStatusColor = (status: MonthlyMember['status']) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Expiring Soon': return 'bg-orange-100 text-orange-800';
      case 'Expired': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getMembershipColor = (type: string) => {
    return 'bg-blue-100 text-blue-800'; // All monthly members have same color
  };

  const handleExtendMembership = (member: MonthlyMember) => {
    setSelectedMember(member);
    setExtensionDialogOpen(true);
    
    // Set default payment amount for monthly membership
    setPaymentAmount('1200');
  };

  const calculateNewExpiryDate = (currentExpiry: string, daysToAdd: number): string => {
    const currentDate = new Date(currentExpiry);
    currentDate.setDate(currentDate.getDate() + daysToAdd);
    return currentDate.toISOString().split('T')[0];
  };

  const processExtension = () => {
    if (!selectedMember) return;
    
    setIsProcessing(true);
    
    setTimeout(() => {
      setIsProcessing(false);
      setExtensionDialogOpen(false);
      
      const newExpiryDate = calculateNewExpiryDate(selectedMember.expiryDate, parseInt(extensionDays));
      
      onConfirmation({
        type: 'extension',
        memberName: selectedMember.name,
        amount: parseFloat(paymentAmount),
        validUntil: newExpiryDate,
        membershipType: selectedMember.membershipType
      });
      
      // Reset form
      setExtensionDays('30');
      setPaymentAmount('');
      setPaymentMethod('');
      setSelectedMember(null);
    }, 1500);
  };

  const memberStats = {
    total: members.length,
    active: members.filter(m => m.status === 'Active').length,
    expiring: members.filter(m => m.status === 'Expiring Soon').length,
    expired: members.filter(m => m.status === 'Expired').length
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Monthly Members</h2>
        <p className="text-gray-600">Manage monthly subscription renewals and extensions</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Members</p>
                <p className="text-2xl font-bold">{memberStats.total}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active</p>
                <p className="text-2xl font-bold text-green-600">{memberStats.active}</p>
              </div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Expiring Soon</p>
                <p className="text-2xl font-bold text-orange-600">{memberStats.expiring}</p>
              </div>
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Expired</p>
                <p className="text-2xl font-bold text-red-600">{memberStats.expired}</p>
              </div>
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Member List</CardTitle>
              <CardDescription>Manage subscriptions and process renewals</CardDescription>
            </div>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Member</TableHead>
                  <TableHead>Membership</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Expiry Date</TableHead>
                  <TableHead>Days Left</TableHead>
                  <TableHead>Last Payment</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMembers.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback>
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{member.name}</p>
                          <p className="text-sm text-gray-500">{member.id}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getMembershipColor(member.membershipType)}>
                        {member.membershipType}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(member.status)}>
                        {member.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{member.expiryDate}</TableCell>
                    <TableCell>
                      <span className={getDaysLeft(member.expiryDate) <= 7 ? 'text-red-600 font-medium' : ''}>
                        {getDaysLeft(member.expiryDate)} days
                      </span>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm">{member.lastPayment}</p>
                        <p className="text-xs text-gray-500">{member.paymentMethod}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        size="sm"
                        onClick={() => handleExtendMembership(member)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <Calendar className="h-4 w-4 mr-1" />
                        Extend
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Extension Dialog */}
      <Dialog open={extensionDialogOpen} onOpenChange={setExtensionDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Extend Membership</DialogTitle>
            <DialogDescription>
              Extend membership for {selectedMember?.name}
            </DialogDescription>
          </DialogHeader>
          
          {selectedMember && (
            <div className="space-y-4">
              {/* Current Info */}
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3 mb-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      {selectedMember.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{selectedMember.name}</p>
                    <Badge className={getMembershipColor(selectedMember.membershipType)} size="sm">
                      {selectedMember.membershipType}
                    </Badge>
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  <p>Current expiry: {selectedMember.expiryDate}</p>
                  <p>Days left: {getDaysLeft(selectedMember.expiryDate)}</p>
                </div>
              </div>

              {/* Extension Settings */}
              <div>
                <Label htmlFor="days">Extension Period</Label>
                <div className="flex space-x-2 mt-1">
                  <Button
                    type="button"
                    variant={extensionDays === '30' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setExtensionDays('30')}
                  >
                    +30 days
                  </Button>
                  <Button
                    type="button"
                    variant={extensionDays === '60' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setExtensionDays('60')}
                  >
                    +60 days
                  </Button>
                  <Button
                    type="button"
                    variant={extensionDays === '90' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setExtensionDays('90')}
                  >
                    +90 days
                  </Button>
                </div>
                <Input
                  id="days"
                  type="number"
                  placeholder="Custom days"
                  value={extensionDays}
                  onChange={(e) => setExtensionDays(e.target.value)}
                  className="mt-2"
                />
              </div>

              {/* New Expiry Preview */}
              {extensionDays && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-800">
                    <span className="font-medium">New expiry date:</span> {calculateNewExpiryDate(selectedMember.expiryDate, parseInt(extensionDays))}
                  </p>
                </div>
              )}

              {/* Payment Information */}
              <div className="space-y-3">
                <div>
                  <Label htmlFor="amount">Payment Amount (₱)</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="amount"
                      type="number"
                      placeholder="Enter amount"
                      value={paymentAmount}
                      onChange={(e) => setPaymentAmount(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="payment-method">Payment Method</Label>
                  <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cash">Cash</SelectItem>
                      <SelectItem value="card">Credit Card</SelectItem>
                      <SelectItem value="bank">Bank Transfer</SelectItem>
                      <SelectItem value="gcash">GCash</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setExtensionDialogOpen(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={processExtension}
                  disabled={!extensionDays || !paymentAmount || !paymentMethod || isProcessing}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  {isProcessing ? 'Processing...' : 'Confirm Extension'}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}