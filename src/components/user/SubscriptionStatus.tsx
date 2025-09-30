import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Calendar, CreditCard, AlertCircle, CheckCircle, QrCode } from 'lucide-react';

interface SubscriptionStatusProps {
  membershipType: 'Daily' | 'Monthly';
  className?: string;
}

export function SubscriptionStatus({ membershipType, className }: SubscriptionStatusProps) {
  const currentDate = new Date();
  const expiryDate = new Date('2024-12-31');
  const daysLeft = Math.ceil((expiryDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));

  if (membershipType === 'Daily') {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Membership Status
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              Daily Pass
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div className="space-y-2">
                <h4 className="font-medium text-yellow-800">You are not subscribed to a monthly plan</h4>
                <p className="text-sm text-yellow-700">
                  You're currently using daily passes at ₱40 per visit. Upgrade to monthly for unlimited access at ₱1,200/month.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Current Plan</p>
              <p className="font-semibold">Daily Pass (Pay per visit)</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Rate</p>
              <p className="font-semibold text-green-600">₱40 per session</p>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium">Benefits of Monthly Membership:</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>Unlimited gym access</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>Save money after 30 visits</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>Priority equipment access</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>Fixed monthly rate</span>
              </li>
            </ul>
          </div>

          <Button className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
            <CreditCard className="mr-2 h-4 w-4" />
            Upgrade to Monthly Plan
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Membership Status
          <Badge variant="default" className="bg-blue-600">
            Monthly Member
          </Badge>
        </CardTitle>
        <CardDescription>Your subscription details and benefits</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start space-x-3">
            <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
            <div className="space-y-2">
              <h4 className="font-medium text-blue-800">Active Monthly Subscription</h4>
              <p className="text-sm text-blue-700">
                You have unlimited access to all gym facilities and equipment.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Plan Type</p>
            <p className="font-semibold">Monthly Unlimited</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Expires On</p>
            <p className="font-semibold">December 31, 2024</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Days Remaining</p>
            <p className={`font-semibold ${daysLeft <= 7 ? 'text-red-600' : daysLeft <= 30 ? 'text-orange-600' : 'text-green-600'}`}>
              {daysLeft} days
            </p>
          </div>
        </div>

        {daysLeft <= 30 && (
          <div className={`p-3 rounded-lg ${daysLeft <= 7 ? 'bg-red-50 border border-red-200' : 'bg-orange-50 border border-orange-200'}`}>
            <div className="flex items-center space-x-2">
              <AlertCircle className={`h-4 w-4 ${daysLeft <= 7 ? 'text-red-600' : 'text-orange-600'}`} />
              <span className={`text-sm font-medium ${daysLeft <= 7 ? 'text-red-800' : 'text-orange-800'}`}>
                {daysLeft <= 7 ? 'Subscription expiring soon!' : 'Renewal reminder'}
              </span>
            </div>
            <p className={`text-sm mt-1 ${daysLeft <= 7 ? 'text-red-700' : 'text-orange-700'}`}>
              {daysLeft <= 7 
                ? 'Your subscription expires in less than a week. Renew now to avoid interruption.'
                : 'Your subscription expires in less than a month. Consider renewing early.'
              }
            </p>
          </div>
        )}

        <div className="space-y-3">
          <h4 className="font-medium">Your Benefits:</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span>Unlimited gym access</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span>All equipment available</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span>Locker room access</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span>QR code check-ins</span>
            </li>
          </ul>
        </div>

        <div className="flex space-x-2">
          <Button variant="outline" className="flex-1">
            <QrCode className="mr-2 h-4 w-4" />
            Download QR Code
          </Button>
          <Button className="flex-1 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
            <Calendar className="mr-2 h-4 w-4" />
            Renew Subscription
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}