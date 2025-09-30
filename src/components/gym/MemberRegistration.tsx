import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { Copy, RefreshCw, UserPlus } from 'lucide-react';
import type { ConfirmationData } from '../GymStaffDashboard';

interface MemberRegistrationProps {
  onConfirmation: (data: ConfirmationData) => void;
}

interface FormData {
  name: string;
  username: string;
  password: string;
  membershipType: string;
}

interface GeneratedCredentials {
  username: string;
  password: string;
}

export function MemberRegistration({ onConfirmation }: MemberRegistrationProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    username: '',
    password: '',
    membershipType: ''
  });
  
  const [credentials, setCredentials] = useState<GeneratedCredentials | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const membershipTypes = [
    { value: 'daily', label: 'Daily', price: '₱40/day', description: 'Walk-in users, pay per visit' },
    { value: 'monthly', label: 'Monthly', price: '₱1,200/month', description: 'Subscribed monthly members' }
  ];

  const generatePassword = (): string => {
    return Math.random().toString(36).substring(2, 10);
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Update credentials display when username or password changes
    if (field === 'username' || field === 'password') {
      setCredentials({
        username: field === 'username' ? value : formData.username,
        password: field === 'password' ? value : formData.password
      });
    }
  };

  const handleGeneratePassword = () => {
    const newPassword = generatePassword();
    setFormData(prev => ({ ...prev, password: newPassword }));
    setCredentials(prev => prev ? { ...prev, password: newPassword } : null);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.username || !formData.password || !formData.membershipType) return;
    
    setIsSubmitting(true);
    
    // Simulate registration process
    setTimeout(() => {
      setIsSubmitting(false);
      
      onConfirmation({
        type: 'registration',
        memberName: formData.name,
        membershipType: membershipTypes.find(t => t.value === formData.membershipType)?.label
      });
    }, 2000);
  };

  const isFormValid = formData.name && formData.username && formData.password && formData.membershipType;

  const selectedMembershipType = membershipTypes.find(t => t.value === formData.membershipType);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Member Registration</h2>
        <p className="text-gray-600">Register a new gym member and generate login credentials</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Registration Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <UserPlus className="h-5 w-5" />
                <span>Member Information</span>
              </CardTitle>
              <CardDescription>
                Enter the new member's basic information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  placeholder="Enter full name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="username">Username *</Label>
                <Input
                  id="username"
                  placeholder="Enter username"
                  value={formData.username}
                  onChange={(e) => handleInputChange('username', e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="password">Password *</Label>
                <div className="flex space-x-2">
                  <Input
                    id="password"
                    type="text"
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className="flex-1"
                    required
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleGeneratePassword}
                    className="px-3"
                  >
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div>
                <Label htmlFor="membership">Membership Type *</Label>
                <Select value={formData.membershipType} onValueChange={(value) => handleInputChange('membershipType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select membership type" />
                  </SelectTrigger>
                  <SelectContent>
                    {membershipTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        <div className="flex flex-col">
                          <span className="font-medium">{type.label} - {type.price}</span>
                          <span className="text-sm text-gray-500">{type.description}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedMembershipType && (
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <Badge className="bg-blue-100 text-blue-800 mb-2">{selectedMembershipType.label}</Badge>
                  <p className="text-sm text-blue-700">{selectedMembershipType.description}</p>
                  <p className="text-sm font-medium text-blue-800">{selectedMembershipType.price}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Generated Credentials */}
          <Card>
            <CardHeader>
              <CardTitle>Login Credentials</CardTitle>
              <CardDescription>
                Review the login credentials for the new member
              </CardDescription>
            </CardHeader>
            <CardContent>
              {formData.username && formData.password ? (
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg border">
                    <div className="space-y-3">
                      <div>
                        <Label className="text-sm font-medium text-gray-700">Username</Label>
                        <div className="flex items-center space-x-2 mt-1">
                          <Input 
                            value={formData.username} 
                            readOnly 
                            className="bg-white"
                          />
                          <Button 
                            type="button"
                            variant="outline" 
                            size="sm"
                            onClick={() => copyToClipboard(formData.username)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div>
                        <Label className="text-sm font-medium text-gray-700">Password</Label>
                        <div className="flex items-center space-x-2 mt-1">
                          <Input 
                            value={formData.password} 
                            readOnly 
                            className="bg-white font-mono"
                          />
                          <Button 
                            type="button"
                            variant="outline" 
                            size="sm"
                            onClick={() => copyToClipboard(formData.password)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                    <p className="text-sm text-amber-800">
                      <span className="font-medium">Important:</span> Make sure to share these credentials with the member. 
                      They can be reset later if forgotten.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-900">Next Steps:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Member can use these credentials to log in</li>
                      <li>• QR code will be generated for quick check-ins</li>
                      <li>• Credentials can be reset from member management</li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <UserPlus className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Enter username and password to review credentials</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Submit Button */}
        <div className="mt-6">
          <Button 
            type="submit"
            disabled={!isFormValid || isSubmitting}
            className="w-full bg-green-600 hover:bg-green-700"
            size="lg"
          >
            {isSubmitting ? 'Registering Member...' : 'Register Member'}
          </Button>
        </div>
      </form>
    </div>
  );
}