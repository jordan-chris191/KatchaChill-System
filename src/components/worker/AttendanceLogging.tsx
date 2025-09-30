import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Search, UserCheck, DollarSign, Plus, Calendar, Clock, Users } from 'lucide-react';
import type { User } from '../../App';

interface AttendanceRecord {
  id: string;
  memberId: string;
  memberName: string;
  memberType: 'regular' | 'subscribed';
  date: string;
  timeIn: string;
  timeOut?: string;
  loggedBy: string;
}

interface PaymentRecord {
  id: string;
  memberId: string;
  memberName: string;
  amount: number;
  type: 'daily' | 'monthly';
  date: string;
  loggedBy: string;
}

interface Member {
  id: string;
  name: string;
  type: 'regular' | 'subscribed';
  status?: 'Active' | 'Expired';
}

interface AttendanceLoggingProps {
  currentUser: User;
}

export function AttendanceLogging({ currentUser }: AttendanceLoggingProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [attendanceDialogOpen, setAttendanceDialogOpen] = useState(false);
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  // Mock data
  const [members] = useState<Member[]>([
    { id: 'RM001', name: 'Alex Johnson', type: 'regular' },
    { id: 'RM002', name: 'Maria Garcia', type: 'regular' },
    { id: 'RM003', name: 'David Wilson', type: 'regular' },
    { id: 'SM001', name: 'John Doe', type: 'subscribed', status: 'Active' },
    { id: 'SM002', name: 'Jane Smith', type: 'subscribed', status: 'Active' },
    { id: 'SM003', name: 'Mike Johnson', type: 'subscribed', status: 'Expired' },
  ]);

  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([
    {
      id: '1',
      memberId: 'SM001',
      memberName: 'John Doe',
      memberType: 'subscribed',
      date: '2024-09-24',
      timeIn: '08:30',
      timeOut: '10:15',
      loggedBy: 'Worker Staff'
    },
    {
      id: '2',
      memberId: 'RM001',
      memberName: 'Alex Johnson',
      memberType: 'regular',
      date: '2024-09-24',
      timeIn: '09:15',
      loggedBy: 'Worker Staff'
    },
    {
      id: '3',
      memberId: 'SM002',
      memberName: 'Jane Smith',
      memberType: 'subscribed',
      date: '2024-09-24',
      timeIn: '07:45',
      timeOut: '09:30',
      loggedBy: 'Worker Staff'
    }
  ]);

  const [paymentRecords, setPaymentRecords] = useState<PaymentRecord[]>([
    {
      id: '1',
      memberId: 'RM001',
      memberName: 'Alex Johnson',
      amount: 40,
      type: 'daily',
      date: '2024-09-24',
      loggedBy: 'Worker Staff'
    },
    {
      id: '2',
      memberId: 'SM001',
      memberName: 'John Doe',
      amount: 1200,
      type: 'monthly',
      date: '2024-09-01',
      loggedBy: 'Admin User'
    }
  ]);

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const todayAttendance = attendanceRecords.filter(record => record.date === selectedDate);
  const todayPayments = paymentRecords.filter(record => record.date === selectedDate);

  const handleLogAttendance = (member: Member) => {
    const now = new Date();
    const timeString = now.toTimeString().slice(0, 5);
    
    const newRecord: AttendanceRecord = {
      id: Date.now().toString(),
      memberId: member.id,
      memberName: member.name,
      memberType: member.type,
      date: selectedDate,
      timeIn: timeString,
      loggedBy: currentUser.name
    };

    setAttendanceRecords(prev => [newRecord, ...prev]);
    setAttendanceDialogOpen(false);
    setSelectedMember(null);
  };

  const handleLogPayment = (member: Member, paymentType: 'daily' | 'monthly') => {
    const amount = paymentType === 'daily' ? 40 : 1200; // Default monthly amount
    
    const newRecord: PaymentRecord = {
      id: Date.now().toString(),
      memberId: member.id,
      memberName: member.name,
      amount: amount,
      type: paymentType,
      date: selectedDate,
      loggedBy: currentUser.name
    };

    setPaymentRecords(prev => [newRecord, ...prev]);
    setPaymentDialogOpen(false);
    setSelectedMember(null);
  };

  const getMemberTypeColor = (type: 'regular' | 'subscribed') => {
    return type === 'subscribed' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800';
  };

  const getPaymentTypeColor = (type: 'daily' | 'monthly') => {
    return type === 'daily' ? 'bg-green-100 text-green-800' : 'bg-purple-100 text-purple-800';
  };

  const todayStats = {
    totalAttendance: todayAttendance.length,
    regularMembers: todayAttendance.filter(r => r.memberType === 'regular').length,
    subscribedMembers: todayAttendance.filter(r => r.memberType === 'subscribed').length,
    dailyPayments: todayPayments.filter(p => p.type === 'daily').reduce((sum, p) => sum + p.amount, 0),
    monthlyPayments: todayPayments.filter(p => p.type === 'monthly').reduce((sum, p) => sum + p.amount, 0)
  };

  return (
    <div className="space-y-6">
      {/* Date Selector and Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>Date Selection</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="date">Select Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">{todayStats.totalAttendance}</p>
                  <p className="text-sm text-muted-foreground">Total Attendance</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">₱{todayStats.dailyPayments + todayStats.monthlyPayments}</p>
                  <p className="text-sm text-muted-foreground">Total Payments</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Today's Summary</CardTitle>
            <CardDescription>Breakdown for {selectedDate}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Regular Members:</span>
                <Badge variant="outline">{todayStats.regularMembers}</Badge>
              </div>
              <div className="flex justify-between">
                <span>Subscribed Members:</span>
                <Badge variant="outline">{todayStats.subscribedMembers}</Badge>
              </div>
              <div className="flex justify-between">
                <span>Daily Payments:</span>
                <Badge className="bg-green-100 text-green-800">₱{todayStats.dailyPayments}</Badge>
              </div>
              <div className="flex justify-between">
                <span>Monthly Payments:</span>
                <Badge className="bg-purple-100 text-purple-800">₱{todayStats.monthlyPayments}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Dialog open={attendanceDialogOpen} onOpenChange={setAttendanceDialogOpen}>
          <DialogTrigger asChild>
            <Card className="cursor-pointer hover:bg-gray-50 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-center justify-center space-x-3">
                  <UserCheck className="h-8 w-8 text-blue-600" />
                  <div className="text-center">
                    <h3 className="font-semibold">Log Attendance</h3>
                    <p className="text-sm text-muted-foreground">Record member check-in</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Log Member Attendance</DialogTitle>
              <DialogDescription>
                Select a member to record their gym attendance
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="member-search">Search Member</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="member-search"
                    placeholder="Search by name or ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="max-h-60 overflow-y-auto space-y-2">
                {filteredMembers.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
                    onClick={() => handleLogAttendance(member)}
                  >
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-sm text-muted-foreground">{member.id}</p>
                      </div>
                    </div>
                    <Badge className={getMemberTypeColor(member.type)}>
                      {member.type}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={paymentDialogOpen} onOpenChange={setPaymentDialogOpen}>
          <DialogTrigger asChild>
            <Card className="cursor-pointer hover:bg-gray-50 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-center justify-center space-x-3">
                  <DollarSign className="h-8 w-8 text-green-600" />
                  <div className="text-center">
                    <h3 className="font-semibold">Log Payment</h3>
                    <p className="text-sm text-muted-foreground">Record daily or monthly payment</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Log Member Payment</DialogTitle>
              <DialogDescription>
                Select a member and payment type to record
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="payment-member-search">Search Member</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="payment-member-search"
                    placeholder="Search by name or ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="max-h-60 overflow-y-auto space-y-2">
                {filteredMembers.map((member) => (
                  <div key={member.id} className="border rounded-lg p-3">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{member.name}</p>
                          <p className="text-sm text-muted-foreground">{member.id}</p>
                        </div>
                      </div>
                      <Badge className={getMemberTypeColor(member.type)}>
                        {member.type}
                      </Badge>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleLogPayment(member, 'daily')}
                        className="flex-1"
                      >
                        Daily (₱40)
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleLogPayment(member, 'monthly')}
                        className="flex-1"
                      >
                        Monthly (₱1200)
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Records Tables */}
      <Tabs defaultValue="attendance" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="attendance">Today's Attendance ({todayAttendance.length})</TabsTrigger>
          <TabsTrigger value="payments">Today's Payments ({todayPayments.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="attendance">
          <Card>
            <CardHeader>
              <CardTitle>Attendance Records</CardTitle>
              <CardDescription>Member check-ins for {selectedDate}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Member</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Time In</TableHead>
                      <TableHead>Time Out</TableHead>
                      <TableHead>Logged By</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {todayAttendance.map((record) => (
                      <TableRow key={record.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>
                                {record.memberName.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{record.memberName}</p>
                              <p className="text-sm text-muted-foreground">{record.memberId}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getMemberTypeColor(record.memberType)}>
                            {record.memberType}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium">{record.timeIn}</TableCell>
                        <TableCell>{record.timeOut || '-'}</TableCell>
                        <TableCell>{record.loggedBy}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                {todayAttendance.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No attendance records for this date</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments">
          <Card>
            <CardHeader>
              <CardTitle>Payment Records</CardTitle>
              <CardDescription>Payments collected on {selectedDate}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Member</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Logged By</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {todayPayments.map((record) => (
                      <TableRow key={record.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>
                                {record.memberName.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{record.memberName}</p>
                              <p className="text-sm text-muted-foreground">{record.memberId}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getPaymentTypeColor(record.type)}>
                            {record.type}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium">₱{record.amount}</TableCell>
                        <TableCell>{record.date}</TableCell>
                        <TableCell>{record.loggedBy}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                {todayPayments.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No payment records for this date</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}