import { useState } from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Calendar, Clock, Users, Search, Filter } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface AttendanceRecord {
  id: string;
  memberId: string;
  memberName: string;
  membershipType: 'Regular' | 'Premium' | 'VIP';
  checkInTime: string;
  checkOutTime?: string;
  date: string;
  paymentAmount?: number;
  loggedBy: string;
}

export function AttendanceLog() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const [attendanceRecords] = useState<AttendanceRecord[]>([
    {
      id: '1',
      memberId: 'SM001',
      memberName: 'John Doe',
      membershipType: 'Premium',
      checkInTime: '08:30',
      checkOutTime: '10:15',
      date: '2024-09-24',
      loggedBy: 'Staff Member'
    },
    {
      id: '2',
      memberId: 'RM001',
      memberName: 'Alex Johnson',
      membershipType: 'Regular',
      checkInTime: '09:15',
      date: '2024-09-24',
      paymentAmount: 40,
      loggedBy: 'Staff Member'
    },
    {
      id: '3',
      memberId: 'SM002',
      memberName: 'Jane Smith',
      membershipType: 'VIP',
      checkInTime: '07:45',
      checkOutTime: '09:30',
      date: '2024-09-24',
      loggedBy: 'Staff Member'
    },
    {
      id: '4',
      memberId: 'RM002',
      memberName: 'Maria Garcia',
      membershipType: 'Regular',
      checkInTime: '10:30',
      date: '2024-09-24',
      paymentAmount: 40,
      loggedBy: 'Staff Member'
    },
    {
      id: '5',
      memberId: 'SM003',
      memberName: 'Mike Johnson',
      membershipType: 'Premium',
      checkInTime: '06:00',
      checkOutTime: '07:30',
      date: '2024-09-24',
      loggedBy: 'Staff Member'
    },
    {
      id: '6',
      memberId: 'RM003',
      memberName: 'David Wilson',
      membershipType: 'Regular',
      checkInTime: '11:45',
      date: '2024-09-23',
      paymentAmount: 40,
      loggedBy: 'Staff Member'
    },
    {
      id: '7',
      memberId: 'SM004',
      memberName: 'Sarah Wilson',
      membershipType: 'VIP',
      checkInTime: '19:00',
      checkOutTime: '20:45',
      date: '2024-09-23',
      loggedBy: 'Staff Member'
    }
  ]);

  const filteredRecords = attendanceRecords.filter(record => {
    const matchesDate = record.date === selectedDate;
    const matchesSearch = record.memberName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.memberId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || record.membershipType === filterType;
    
    return matchesDate && matchesSearch && matchesType;
  });

  const getMembershipColor = (type: string) => {
    switch (type) {
      case 'VIP': return 'bg-purple-100 text-purple-800';
      case 'Premium': return 'bg-blue-100 text-blue-800';
      case 'Regular': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const calculateDuration = (checkIn: string, checkOut?: string): string => {
    if (!checkOut) return 'Still inside';
    
    const [inHour, inMin] = checkIn.split(':').map(Number);
    const [outHour, outMin] = checkOut.split(':').map(Number);
    
    const inMinutes = inHour * 60 + inMin;
    const outMinutes = outHour * 60 + outMin;
    const duration = outMinutes - inMinutes;
    
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  const todayStats = {
    totalCheckIns: filteredRecords.length,
    regularMembers: filteredRecords.filter(r => r.membershipType === 'Regular').length,
    subscribedMembers: filteredRecords.filter(r => r.membershipType === 'Premium' || r.membershipType === 'VIP').length,
    totalPayments: filteredRecords.reduce((sum, r) => sum + (r.paymentAmount || 0), 0),
    stillInside: filteredRecords.filter(r => !r.checkOutTime).length
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Attendance Log</h2>
        <p className="text-gray-600">Track member check-ins and check-outs</p>
      </div>

      {/* Date Selection and Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>Date Selection</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <Label htmlFor="date">Select Date</Label>
              <Input
                id="date"
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="mt-1"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Daily Summary</CardTitle>
            <CardDescription>Statistics for {selectedDate}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Total Check-ins</span>
                <Badge variant="outline">{todayStats.totalCheckIns}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Regular Members</span>
                <Badge className="bg-green-100 text-green-800">{todayStats.regularMembers}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Subscribed Members</span>
                <Badge className="bg-blue-100 text-blue-800">{todayStats.subscribedMembers}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Currently Inside</span>
                <Badge className="bg-orange-100 text-orange-800">{todayStats.stillInside}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Summary</CardTitle>
            <CardDescription>Daily payments collected</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600">₱{todayStats.totalPayments}</p>
              <p className="text-sm text-gray-600">Total collected</p>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  From {filteredRecords.filter(r => r.paymentAmount).length} payments
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Attendance Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Attendance Records</CardTitle>
              <CardDescription>Member check-ins for {selectedDate}</CardDescription>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search members..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Regular">Regular</SelectItem>
                  <SelectItem value="Premium">Premium</SelectItem>
                  <SelectItem value="VIP">VIP</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Member</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Check-in</TableHead>
                  <TableHead>Check-out</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead>Logged By</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRecords.map((record) => (
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
                          <p className="text-sm text-gray-500">{record.memberId}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getMembershipColor(record.membershipType)}>
                        {record.membershipType}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span>{record.checkInTime}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {record.checkOutTime ? (
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4 text-gray-400" />
                          <span>{record.checkOutTime}</span>
                        </div>
                      ) : (
                        <Badge className="bg-green-100 text-green-800">Inside</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <span className={!record.checkOutTime ? 'text-green-600 font-medium' : ''}>
                        {calculateDuration(record.checkInTime, record.checkOutTime)}
                      </span>
                    </TableCell>
                    <TableCell>
                      {record.paymentAmount ? (
                        <Badge className="bg-green-100 text-green-800">
                          ₱{record.paymentAmount}
                        </Badge>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-gray-600">{record.loggedBy}</span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {filteredRecords.length === 0 && (
              <div className="text-center py-12">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No attendance records found</p>
                <p className="text-sm text-gray-400">
                  Try selecting a different date or adjusting your filters
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}