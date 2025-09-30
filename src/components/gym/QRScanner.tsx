import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Camera, Upload, User, CreditCard, CheckCircle } from 'lucide-react';
import type { ConfirmationData } from '../GymStaffDashboard';

interface QRScannerProps {
  onConfirmation: (data: ConfirmationData) => void;
}

interface MemberData {
  id: string;
  name: string;
  membershipType: 'Daily' | 'Monthly';
  status: 'Active' | 'Expired';
  expiryDate?: string; // Only for monthly members
}

export function QRScanner({ onConfirmation }: QRScannerProps) {
  const [scannedMember, setScannedMember] = useState<MemberData | null>(null);
  const [amountPaid, setAmountPaid] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Mock member data for demo
  const mockMembers: MemberData[] = [
    {
      id: 'MM001',
      name: 'John Doe',
      membershipType: 'Monthly',
      status: 'Active',
      expiryDate: '2024-12-31'
    },
    {
      id: 'DM001', 
      name: 'Alex Johnson',
      membershipType: 'Daily',
      status: 'Active'
    },
    {
      id: 'DM002',
      name: 'Maria Garcia',
      membershipType: 'Daily',
      status: 'Active'
    },
    {
      id: 'MM002',
      name: 'Jane Smith',
      membershipType: 'Monthly',
      status: 'Active',
      expiryDate: '2024-11-30'
    }
  ];

  const handleScanQR = () => {
    // Simulate QR scan - in real implementation, this would use camera
    const randomMember = mockMembers[Math.floor(Math.random() * mockMembers.length)];
    setScannedMember(randomMember);
    
    // Auto-set amount based on membership type
    if (randomMember.membershipType === 'Daily') {
      setAmountPaid('40'); // Daily rate
    } else {
      setAmountPaid('0'); // Monthly members don't pay daily
    }
  };

  const handleUploadQR = () => {
    // Simulate file upload
    const randomMember = mockMembers[Math.floor(Math.random() * mockMembers.length)];
    setScannedMember(randomMember);
    
    if (randomMember.membershipType === 'Daily') {
      setAmountPaid('40');
    } else {
      setAmountPaid('0');
    }
  };

  const handleProcessPayment = () => {
    if (!scannedMember) return;
    
    setIsProcessing(true);
    
    // Simulate processing time
    setTimeout(() => {
      setIsProcessing(false);
      
      onConfirmation({
        type: 'payment',
        memberName: scannedMember.name,
        amount: parseFloat(amountPaid) || 0,
        validUntil: scannedMember.expiryDate,
        membershipType: scannedMember.membershipType
      });
    }, 1500);
  };

  const getMembershipColor = (type: string) => {
    switch (type) {
      case 'Monthly': return 'bg-blue-100 text-blue-800';
      case 'Daily': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">QR Code Scanner</h2>
        <p className="text-gray-600">Scan member QR codes to log attendance and process payments</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Scanner Panel */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Camera className="h-5 w-5" />
              <span>Scanner</span>
            </CardTitle>
            <CardDescription>
              Use camera to scan QR code or upload an image
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Camera Preview Placeholder */}
            <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center border-2 border-dashed border-gray-300">
              <div className="text-center">
                <Camera className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Camera feed would appear here</p>
                <p className="text-sm text-gray-400">Position QR code within the frame</p>
              </div>
            </div>

            <div className="space-y-3">
              <Button 
                onClick={handleScanQR} 
                className="w-full bg-blue-600 hover:bg-blue-700"
                size="lg"
              >
                <Camera className="h-4 w-4 mr-2" />
                Start Scanning
              </Button>
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-gray-500">Or</span>
                </div>
              </div>
              
              <Button 
                variant="outline" 
                onClick={handleUploadQR}
                className="w-full"
                size="lg"
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload QR Image
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Member Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span>Member Details</span>
            </CardTitle>
            <CardDescription>
              Information will appear after scanning QR code
            </CardDescription>
          </CardHeader>
          <CardContent>
            {scannedMember ? (
              <div className="space-y-6">
                {/* Member Info */}
                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <Avatar className="h-16 w-16">
                    <AvatarFallback className="text-lg">
                      {scannedMember.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{scannedMember.name}</h3>
                    <p className="text-sm text-gray-600">ID: {scannedMember.id}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <Badge className={getMembershipColor(scannedMember.membershipType)}>
                        {scannedMember.membershipType}
                      </Badge>
                      <Badge className={getStatusColor(scannedMember.status)}>
                        {scannedMember.status}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Auto-logged attendance */}
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <p className="font-medium text-green-800">Attendance Logged</p>
                  </div>
                  <p className="text-sm text-green-600 mt-1">
                    Check-in recorded at {new Date().toLocaleTimeString()}
                  </p>
                </div>

                {/* Payment Section */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <CreditCard className="h-5 w-5 text-gray-600" />
                    <h4 className="font-medium">Payment</h4>
                  </div>
                  
                  <div>
                    <Label htmlFor="amount">Amount Paid (₱)</Label>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="Enter amount"
                      value={amountPaid}
                      onChange={(e) => setAmountPaid(e.target.value)}
                      className="mt-1"
                    />
                    {scannedMember.membershipType === 'Daily' && (
                      <p className="text-sm text-gray-500 mt-1">
                        Suggested: ₱40 (Daily rate)
                      </p>
                    )}
                    {scannedMember.membershipType === 'Monthly' && (
                      <p className="text-sm text-blue-600 mt-1">
                        Monthly member - no daily payment required
                      </p>
                    )}
                  </div>

                  <Button 
                    onClick={handleProcessPayment}
                    disabled={isProcessing || (!amountPaid && scannedMember.membershipType === 'Daily')}
                    className="w-full bg-green-600 hover:bg-green-700"
                    size="lg"
                  >
                    {isProcessing ? 'Processing...' : 'Confirm Payment & Attendance'}
                  </Button>
                </div>

                {/* Membership Info */}
                <div className="pt-4 border-t border-gray-200">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Membership Type</p>
                      <p className="font-medium">{scannedMember.membershipType}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Valid Until</p>
                      <p className="font-medium">{scannedMember.expiryDate || 'Pay per visit'}</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No member scanned yet</p>
                <p className="text-sm text-gray-400">Scan a QR code to view member details</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}