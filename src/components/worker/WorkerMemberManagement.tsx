import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Label } from '../ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Search, Edit, Trash2, UserPlus, Eye, History } from 'lucide-react';
import type { User } from '../../App';

interface RegularMember {
  id: string;
  name: string;
  email: string;
  username: string;
  registeredOn: string;
  type: 'regular';
}

interface SubscribedMember {
  id: string;
  name: string;
  email: string;
  username: string;
  registeredOn: string;
  startDate: string;
  expiryDate: string;
  status: 'Active' | 'Expired';
  type: 'subscribed';
}

type Member = RegularMember | SubscribedMember;

interface AccountHistoryEntry {
  id: string;
  memberId: string;
  action: string;
  dateOfAction: string;
  processedBy: string;
}

interface ExtensionHistoryEntry {
  id: string;
  memberId: string;
  memberName: string;
  previousExpiry: string;
  newExpiry: string;
  extendedBy: number; // days
  processedBy: string;
  dateOfAction: string;
}

interface WorkerMemberManagementProps {
  currentUser: User;
}

export function WorkerMemberManagement({ currentUser }: WorkerMemberManagementProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [accountHistoryOpen, setAccountHistoryOpen] = useState(false);
  const [extensionHistoryOpen, setExtensionHistoryOpen] = useState(false);

  const [regularMembers] = useState<RegularMember[]>([
    {
      id: 'RM001',
      name: 'Alex Johnson',
      email: 'alex@example.com',
      username: 'alexj',
      registeredOn: '2024-01-15',
      type: 'regular'
    },
    {
      id: 'RM002',
      name: 'Maria Garcia',
      email: 'maria@example.com',
      username: 'mariag',
      registeredOn: '2024-02-20',
      type: 'regular'
    },
    {
      id: 'RM003',
      name: 'David Wilson',
      email: 'david@example.com',
      username: 'davidw',
      registeredOn: '2024-03-10',
      type: 'regular'
    }
  ]);

  const [subscribedMembers] = useState<SubscribedMember[]>([
    {
      id: 'SM001',
      name: 'John Doe',
      email: 'john@example.com',
      username: 'johnd',
      registeredOn: '2024-01-15',
      startDate: '2024-01-15',
      expiryDate: '2024-12-31',
      status: 'Active',
      type: 'subscribed'
    },
    {
      id: 'SM002',
      name: 'Jane Smith',
      email: 'jane@example.com',
      username: 'janes',
      registeredOn: '2024-02-20',
      startDate: '2024-02-20',
      expiryDate: '2024-11-20',
      status: 'Active',
      type: 'subscribed'
    },
    {
      id: 'SM003',
      name: 'Mike Johnson',
      email: 'mike@example.com',
      username: 'mikej',
      registeredOn: '2023-12-10',
      startDate: '2023-12-10',
      expiryDate: '2024-03-10',
      status: 'Expired',
      type: 'subscribed'
    }
  ]);

  const [accountHistory] = useState<AccountHistoryEntry[]>([
    {
      id: '1',
      memberId: 'RM001',
      action: 'Name changed from Alex J to Alex Johnson',
      dateOfAction: '2024-08-15',
      processedBy: 'Admin User'
    },
    {
      id: '2',
      memberId: 'RM001',
      action: 'Username changed from alex to alexj',
      dateOfAction: '2024-07-20',
      processedBy: 'Worker Staff'
    },
    {
      id: '3',
      memberId: 'SM001',
      action: 'Password reset',
      dateOfAction: '2024-09-01',
      processedBy: 'Admin User'
    }
  ]);

  const [extensionHistory] = useState<ExtensionHistoryEntry[]>([
    {
      id: '1',
      memberId: 'SM001',
      memberName: 'John Doe',
      previousExpiry: '2024-10-31',
      newExpiry: '2024-12-31',
      extendedBy: 61,
      processedBy: 'Admin User',
      dateOfAction: '2024-09-15'
    },
    {
      id: '2',
      memberId: 'SM002',
      memberName: 'Jane Smith',
      previousExpiry: '2024-09-20',
      newExpiry: '2024-11-20',
      extendedBy: 61,
      processedBy: 'Worker Staff',
      dateOfAction: '2024-08-20'
    }
  ]);

  const getDaysLeft = (expiryDate: string): number => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  };

  const filteredRegularMembers = regularMembers.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredSubscribedMembers = subscribedMembers.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: 'Active' | 'Expired') => {
    return status === 'Active' ? 'default' : 'destructive';
  };

  const handleEdit = (member: Member) => {
    setSelectedMember(member);
    setEditDialogOpen(true);
  };

  const handleAccountHistory = (member: Member) => {
    setSelectedMember(member);
    setAccountHistoryOpen(true);
  };

  const handleExtensionHistory = (member: SubscribedMember) => {
    setSelectedMember(member);
    setExtensionHistoryOpen(true);
  };

  const getMemberAccountHistory = (memberId: string) => {
    return accountHistory.filter(entry => entry.memberId === memberId);
  };

  const getMemberExtensionHistory = (memberId: string) => {
    return extensionHistory.filter(entry => entry.memberId === memberId);
  };

  return (
    <div className="space-y-6">
      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search members by name, email, or username..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Member Tables */}
      <Tabs defaultValue="regular" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="regular">Regular Members ({filteredRegularMembers.length})</TabsTrigger>
          <TabsTrigger value="subscribed">Subscribed Members ({filteredSubscribedMembers.length})</TabsTrigger>
        </TabsList>

        {/* Regular Members Table */}
        <TabsContent value="regular">
          <Card>
            <CardHeader>
              <CardTitle>Regular Members</CardTitle>
              <CardDescription>Members with basic gym access</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Member</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Registered On</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRegularMembers.map((member) => (
                      <TableRow key={member.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>
                                {member.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{member.username}</p>
                              <p className="text-sm text-muted-foreground">{member.email}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{member.name}</TableCell>
                        <TableCell>{member.registeredOn}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end space-x-2">
                            <Button variant="ghost" size="sm" onClick={() => handleEdit(member)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Subscribed Members Table */}
        <TabsContent value="subscribed">
          <Card>
            <CardHeader>
              <CardTitle>Subscribed Members</CardTitle>
              <CardDescription>Members with active subscriptions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Status</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Registered On</TableHead>
                      <TableHead>Start Date</TableHead>
                      <TableHead>Expiry Date</TableHead>
                      <TableHead>Days Left</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSubscribedMembers.map((member) => (
                      <TableRow key={member.id}>
                        <TableCell>
                          <Badge variant={getStatusColor(member.status)}>
                            {member.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>
                                {member.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{member.name}</p>
                              <p className="text-sm text-muted-foreground">{member.email}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{member.registeredOn}</TableCell>
                        <TableCell>{member.startDate}</TableCell>
                        <TableCell>{member.expiryDate}</TableCell>
                        <TableCell>
                          <span className={getDaysLeft(member.expiryDate) <= 7 ? 'text-red-600 font-medium' : ''}>
                            {getDaysLeft(member.expiryDate)} days
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end space-x-2">
                            <Button variant="ghost" size="sm" onClick={() => handleExtensionHistory(member)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleEdit(member)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Edit Member Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Member: {selectedMember?.name}</DialogTitle>
            <DialogDescription>
              Choose an action to perform on this member account
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Button variant="outline" className="w-full">
              Change Name
            </Button>
            {selectedMember?.type === 'subscribed' && (
              <Button variant="outline" className="w-full">
                Change Days Left
              </Button>
            )}
            <Button variant="outline" className="w-full">
              Reset Account (Username/Password)
            </Button>
            <Button variant="outline" className="w-full" onClick={() => {
              setEditDialogOpen(false);
              handleAccountHistory(selectedMember!);
            }}>
              <History className="h-4 w-4 mr-2" />
              Account History
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Account History Dialog */}
      <Dialog open={accountHistoryOpen} onOpenChange={setAccountHistoryOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Account History: {selectedMember?.name}</DialogTitle>
            <DialogDescription>
              All changes made to this member's account
            </DialogDescription>
          </DialogHeader>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Actions</TableHead>
                  <TableHead>Date of Action</TableHead>
                  <TableHead>Processed By</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {selectedMember && getMemberAccountHistory(selectedMember.id).map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell>{entry.action}</TableCell>
                    <TableCell>{entry.dateOfAction}</TableCell>
                    <TableCell>{entry.processedBy}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </DialogContent>
      </Dialog>

      {/* Extension History Dialog */}
      <Dialog open={extensionHistoryOpen} onOpenChange={setExtensionHistoryOpen}>
        <DialogContent className="max-w-6xl">
          <DialogHeader>
            <DialogTitle>Extension History: {selectedMember?.name}</DialogTitle>
            <DialogDescription>
              All subscription extensions for this member
            </DialogDescription>
          </DialogHeader>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Previous Expiry</TableHead>
                  <TableHead>New Expiry</TableHead>
                  <TableHead>Extended By</TableHead>
                  <TableHead>Processed By</TableHead>
                  <TableHead>Date of Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {selectedMember && getMemberExtensionHistory(selectedMember.id).map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell>{entry.memberName}</TableCell>
                    <TableCell>{entry.previousExpiry}</TableCell>
                    <TableCell>{entry.newExpiry}</TableCell>
                    <TableCell>{entry.extendedBy} days</TableCell>
                    <TableCell>{entry.processedBy}</TableCell>
                    <TableCell>{entry.dateOfAction}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}