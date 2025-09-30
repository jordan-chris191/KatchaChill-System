import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { CheckCircle, Calendar, DollarSign, User, ArrowLeft, Download, Share } from 'lucide-react';
import type { ConfirmationData } from '../GymStaffDashboard';

interface ConfirmationPageProps {
  data: ConfirmationData;
  onBack: () => void;
}

export function ConfirmationPage({ data, onBack }: ConfirmationPageProps) {
  const getCurrentDate = () => {
    return new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getConfirmationMessage = () => {
    switch (data.type) {
      case 'payment':
        return 'Payment confirmed and attendance recorded successfully!';
      case 'registration':
        return 'Member registration completed successfully!';
      case 'extension':
        return 'Membership extension processed successfully!';
      default:
        return 'Operation completed successfully!';
    }
  };

  const getConfirmationDetails = () => {
    switch (data.type) {
      case 'payment':
        return {
          title: 'Payment & Attendance Confirmation',
          description: 'The member has been checked in and payment has been recorded',
          items: [
            { label: 'Member Name', value: data.memberName },
            { label: 'Amount Paid', value: data.amount ? `₱${data.amount}` : 'No payment' },
            { label: 'Membership Type', value: data.membershipType || 'N/A' },
            { label: 'Valid Until', value: data.validUntil || 'N/A' },
            { label: 'Check-in Time', value: getCurrentTime() },
            { label: 'Date', value: getCurrentDate() }
          ]
        };
      case 'registration':
        return {
          title: 'Member Registration Confirmation',
          description: 'New member has been successfully registered in the system',
          items: [
            { label: 'Member Name', value: data.memberName },
            { label: 'Membership Type', value: data.membershipType || 'N/A' },
            { label: 'Registration Date', value: getCurrentDate() },
            { label: 'Status', value: 'Active' }
          ]
        };
      case 'extension':
        return {
          title: 'Membership Extension Confirmation',
          description: 'Membership has been successfully extended',
          items: [
            { label: 'Member Name', value: data.memberName },
            { label: 'Payment Amount', value: data.amount ? `₱${data.amount}` : 'N/A' },
            { label: 'Membership Type', value: data.membershipType || 'N/A' },
            { label: 'New Expiry Date', value: data.validUntil || 'N/A' },
            { label: 'Extension Date', value: getCurrentDate() }
          ]
        };
      default:
        return {
          title: 'Operation Confirmation',
          description: 'The operation has been completed successfully',
          items: []
        };
    }
  };

  const details = getConfirmationDetails();

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Back Button */}
      <Button variant="outline" onClick={onBack} className="mb-4">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Dashboard
      </Button>

      {/* Success Card */}
      <Card className="border-green-200 bg-green-50">
        <CardContent className="p-8">
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-green-800">Success!</h2>
              <p className="text-green-700 mt-2">{getConfirmationMessage()}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Details Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            {data.type === 'payment' && <DollarSign className="h-5 w-5" />}
            {data.type === 'registration' && <User className="h-5 w-5" />}
            {data.type === 'extension' && <Calendar className="h-5 w-5" />}
            <span>{details.title}</span>
          </CardTitle>
          <CardDescription>{details.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {details.items.map((item, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                <span className="text-gray-600">{item.label}</span>
                <span className="font-medium">{item.value}</span>
              </div>
            ))}
          </div>

          {/* Status Badge */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-center space-x-2">
              <Badge className="bg-green-100 text-green-800 text-sm px-3 py-1">
                ✓ Processed Successfully
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button variant="outline" className="w-full">
          <Download className="h-4 w-4 mr-2" />
          Download Receipt
        </Button>
        <Button variant="outline" className="w-full">
          <Share className="h-4 w-4 mr-2" />
          Send Receipt
        </Button>
        <Button onClick={onBack} className="w-full bg-blue-600 hover:bg-blue-700">
          Continue Working
        </Button>
      </div>

      {/* Additional Information */}
      {data.type === 'payment' && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-800">Attendance Logged</h4>
                <p className="text-sm text-blue-700">
                  {data.memberName} has been checked into the gym at {getCurrentTime()} on {getCurrentDate()}.
                  {data.validUntil && ` Membership is valid until ${data.validUntil}.`}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {data.type === 'registration' && (
        <Card className="bg-purple-50 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <User className="h-5 w-5 text-purple-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-purple-800">Account Created</h4>
                <p className="text-sm text-purple-700">
                  Login credentials have been generated for {data.memberName}. 
                  Make sure to share the username and password with the member.
                  QR code for quick check-ins will be available in the member portal.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {data.type === 'extension' && (
        <Card className="bg-orange-50 border-orange-200">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <Calendar className="h-5 w-5 text-orange-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-orange-800">Membership Extended</h4>
                <p className="text-sm text-orange-700">
                  {data.memberName}'s membership has been extended and is now valid until {data.validUntil}.
                  {data.amount && ` Payment of ₱${data.amount} has been recorded.`}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}