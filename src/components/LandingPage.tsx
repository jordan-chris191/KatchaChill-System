import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { 
  Dumbbell, 
  Users, 
  Shield, 
  Clock, 
  Star, 
  MapPin, 
  Phone, 
  Mail,
  Download,
  Smartphone,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

interface LandingPageProps {
  onSignIn: () => void;
  onSignUp: () => void;
}

export function LandingPage({ onSignIn, onSignUp }: LandingPageProps) {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      icon: <Dumbbell className="h-8 w-8" />,
      title: "Modern Equipment",
      description: "State-of-the-art fitness equipment for all your workout needs"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Expert Trainers",
      description: "Certified personal trainers to guide your fitness journey"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Safe Environment",
      description: "Clean, sanitized, and secure facilities for your peace of mind"
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: "Flexible Hours",
      description: "Open 24/7 to fit your busy schedule"
    }
  ];

  const membership = [
    {
      type: "Daily Pass",
      price: "₱40",
      period: "per visit",
      features: [
        "Full gym access",
        "Locker room",
        "Basic equipment",
        "Pay as you go"
      ],
      popular: false
    },
    {
      type: "Monthly",
      price: "₱1,200",
      period: "per month",
      features: [
        "Unlimited gym access",
        "All equipment",
        "Locker room",
        "Best value"
      ],
      popular: true
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 md:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 md:space-x-3">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                <Dumbbell className="h-4 w-4 md:h-6 md:w-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg md:text-xl font-bold text-gray-900">Katcha Chill</h1>
                <p className="text-xs md:text-sm text-gray-600 hidden sm:block">Fitness & Wellness</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 md:space-x-3">
              <Button variant="ghost" onClick={onSignIn} size="sm" className="hidden sm:inline-flex">
                Sign In
              </Button>
              <Button 
                onClick={onSignUp} 
                size="sm"
                className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
              >
                <span className="hidden sm:inline">Get Started</span>
                <span className="sm:hidden">Join</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-12 md:py-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="space-y-6 md:space-y-8 text-center lg:text-left">
              <div className="space-y-4">
                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 text-xs md:text-sm">
                  Your Fitness Journey Starts Here
                </Badge>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Welcome to{' '}
                  <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                    Katcha Chill
                  </span>
                </h1>
                <p className="text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  Experience fitness like never before. Modern equipment, expert guidance, 
                  and a community that supports your wellness goals.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-start">
                <Button 
                  size="lg" 
                  onClick={onSignUp}
                  className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 px-6 md:px-8 h-12 md:h-14"
                >
                  Start Your Journey
                  <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                </Button>
                <Button size="lg" variant="outline" onClick={onSignIn} className="h-12 md:h-14">
                  Member Sign In
                </Button>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-green-600" />
                  <span>No joining fees</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-green-600" />
                  <span>Flexible memberships</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10">
                <Card className="p-6 backdrop-blur-sm bg-white/90 shadow-2xl">
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">Quick Stats</h3>
                      <Badge variant="secondary">Live</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">500+</div>
                        <div className="text-sm text-gray-600">Active Members</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">12</div>
                        <div className="text-sm text-gray-600">Expert Trainers</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">24/7</div>
                        <div className="text-sm text-gray-600">Open Hours</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-orange-600">95%</div>
                        <div className="text-sm text-gray-600">Satisfaction</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Background decorative elements */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-green-400/20 rounded-3xl transform rotate-3 scale-105"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-blue-400/10 rounded-3xl transform -rotate-2 scale-110"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold text-gray-900">Why Choose Katcha Chill?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We provide everything you need for a complete fitness experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className={`p-6 transition-all duration-300 hover:shadow-lg cursor-pointer ${
                  activeFeature === index ? 'ring-2 ring-blue-500 shadow-lg' : ''
                }`}
                onClick={() => setActiveFeature(index)}
              >
                <CardContent className="space-y-4 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-green-100 rounded-2xl flex items-center justify-center mx-auto text-blue-600">
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Membership Plans */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold text-gray-900">Choose Your Plan</h2>
            <p className="text-xl text-gray-600">Flexible options to fit your lifestyle</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {membership.map((plan, index) => (
              <Card 
                key={index} 
                className={`relative p-8 ${
                  plan.popular 
                    ? 'ring-2 ring-blue-500 shadow-xl scale-105' 
                    : 'hover:shadow-lg'
                } transition-all duration-300`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600">
                    Most Popular
                  </Badge>
                )}
                <CardContent className="space-y-6 text-center">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{plan.type}</h3>
                    <div className="mt-2">
                      <span className="text-4xl font-bold text-blue-600">{plan.price}</span>
                      <span className="text-gray-600"> {plan.period}</span>
                    </div>
                  </div>
                  
                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center justify-center space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    onClick={onSignUp}
                    className={`w-full ${
                      plan.popular 
                        ? 'bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700' 
                        : ''
                    }`}
                    variant={plan.popular ? 'default' : 'outline'}
                  >
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile App Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-green-600">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-white space-y-8">
              <div className="space-y-4">
                <h2 className="text-4xl font-bold">Get the Mobile App</h2>
                <p className="text-xl text-blue-100">
                  Access your membership, track workouts, and manage your fitness journey 
                  on the go with our mobile app.
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-300" />
                  <span>QR code for easy check-ins</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-300" />
                  <span>Track your workout progress</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-300" />
                  <span>View gym capacity in real-time</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-300" />
                  <span>Manage your membership</span>
                </div>
              </div>
              
              <Button 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-gray-100"
              >
                <Smartphone className="mr-2 h-5 w-5" />
                Download on Play Store
                <Download className="ml-2 h-5 w-5" />
              </Button>
            </div>
            
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8">
                <div className="bg-white rounded-2xl p-6 shadow-2xl">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-green-600 rounded-xl flex items-center justify-center">
                        <Dumbbell className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Katcha Chill</h4>
                        <p className="text-sm text-gray-600">Fitness App</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="h-2 bg-gray-200 rounded-full">
                        <div className="h-2 bg-blue-600 rounded-full w-3/4"></div>
                      </div>
                      <div className="text-sm text-gray-600">Today's Progress: 75%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold text-gray-900">Visit Us Today</h2>
            <p className="text-xl text-gray-600">Ready to start your fitness journey?</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="p-6 text-center">
              <CardContent className="space-y-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto">
                  <MapPin className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold">Location</h3>
                <p className="text-gray-600">123 Fitness Street<br />Wellness City, WC 12345</p>
              </CardContent>
            </Card>

            <Card className="p-6 text-center">
              <CardContent className="space-y-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto">
                  <Phone className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold">Phone</h3>
                <p className="text-gray-600">+63 (02) 123-4567<br />Call us anytime</p>
              </CardContent>
            </Card>

            <Card className="p-6 text-center">
              <CardContent className="space-y-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto">
                  <Mail className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold">Email</h3>
                <p className="text-gray-600">info@katchachill.com<br />We'll respond quickly</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                  <Dumbbell className="h-5 w-5 text-white" />
                </div>
                <span className="font-bold">Katcha Chill</span>
              </div>
              <p className="text-gray-400">Your partner in fitness and wellness journey.</p>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><button onClick={onSignIn} className="hover:text-white transition-colors">Member Portal</button></li>
                <li><button onClick={onSignUp} className="hover:text-white transition-colors">Join Now</button></li>
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Personal Training</li>
                <li>Group Classes</li>
                <li>Equipment Access</li>
                <li>Wellness Programs</li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold">Hours</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Monday - Sunday</li>
                <li>24 Hours</li>
                <li>Always Open</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Katcha Chill Fitness & Wellness. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}