import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { TrendingUp, TrendingDown, Users, DollarSign, Calendar, Target } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

export function Analytics() {
  const monthlyRevenue = [
    { month: 'Jan', revenue: 32000, members: 180 },
    { month: 'Feb', revenue: 35000, members: 195 },
    { month: 'Mar', revenue: 38000, members: 210 },
    { month: 'Apr', revenue: 41000, members: 225 },
    { month: 'May', revenue: 39000, members: 220 },
    { month: 'Jun', revenue: 43000, members: 240 },
    { month: 'Jul', revenue: 45000, members: 255 },
    { month: 'Aug', revenue: 47000, members: 270 },
    { month: 'Sep', revenue: 45280, members: 284 },
  ];

  const membershipDistribution = [
    { name: 'Basic', value: 45, color: '#10b981' },
    { name: 'Premium', value: 35, color: '#3b82f6' },
    { name: 'VIP', value: 20, color: '#8b5cf6' },
  ];

  const dailyCheckIns = [
    { day: 'Mon', checkIns: 145 },
    { day: 'Tue', checkIns: 162 },
    { day: 'Wed', checkIns: 178 },
    { day: 'Thu', checkIns: 155 },
    { day: 'Fri', checkIns: 189 },
    { day: 'Sat', checkIns: 203 },
    { day: 'Sun', checkIns: 134 },
  ];

  const peakHours = [
    { hour: '6 AM', usage: 45 },
    { hour: '7 AM', usage: 78 },
    { hour: '8 AM', usage: 92 },
    { hour: '9 AM', usage: 65 },
    { hour: '10 AM', usage: 48 },
    { hour: '11 AM', usage: 52 },
    { hour: '12 PM', usage: 71 },
    { hour: '1 PM', usage: 86 },
    { hour: '2 PM', usage: 69 },
    { hour: '3 PM', usage: 58 },
    { hour: '4 PM', usage: 74 },
    { hour: '5 PM', usage: 95 },
    { hour: '6 PM', usage: 112 },
    { hour: '7 PM', usage: 98 },
    { hour: '8 PM', usage: 87 },
    { hour: '9 PM', usage: 63 },
    { hour: '10 PM', usage: 34 },
  ];

  const kpiData = [
    {
      title: 'Monthly Revenue',
      value: '$45,280',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-green-600'
    },
    {
      title: 'Total Members',
      value: '1,284',
      change: '+8.2%',
      trend: 'up',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      title: 'Avg. Daily Check-ins',
      value: '166',
      change: '+5.1%',
      trend: 'up',
      icon: Calendar,
      color: 'text-purple-600'
    },
    {
      title: 'Member Retention',
      value: '89.5%',
      change: '-2.3%',
      trend: 'down',
      icon: Target,
      color: 'text-orange-600'
    }
  ];

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi) => (
          <Card key={kpi.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{kpi.title}</p>
                  <p className="text-2xl font-bold">{kpi.value}</p>
                  <div className="flex items-center space-x-1 mt-1">
                    {kpi.trend === 'up' ? (
                      <TrendingUp className="h-3 w-3 text-green-600" />
                    ) : (
                      <TrendingDown className="h-3 w-3 text-red-600" />
                    )}
                    <span className={`text-xs ${kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {kpi.change}
                    </span>
                  </div>
                </div>
                <kpi.icon className={`h-8 w-8 ${kpi.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue & Members Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue & Member Growth</CardTitle>
            <CardDescription>Monthly revenue and member count over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="revenue" orientation="left" />
                <YAxis yAxisId="members" orientation="right" />
                <Tooltip 
                  formatter={(value, name) => [
                    name === 'revenue' ? `$${value.toLocaleString()}` : `${value} members`,
                    name === 'revenue' ? 'Revenue' : 'Members'
                  ]}
                />
                <Line 
                  yAxisId="revenue" 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  name="revenue"
                />
                <Line 
                  yAxisId="members" 
                  type="monotone" 
                  dataKey="members" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  name="members"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Membership Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Membership Distribution</CardTitle>
            <CardDescription>Breakdown of membership plans</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={membershipDistribution}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {membershipDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center space-x-6 mt-4">
              {membershipDistribution.map((item) => (
                <div key={item.name} className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm">{item.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Daily Check-ins */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Check-ins</CardTitle>
            <CardDescription>Daily check-in patterns over the week</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dailyCheckIns}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value} check-ins`, 'Check-ins']} />
                <Bar dataKey="checkIns" fill="#8b5cf6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Peak Hours */}
        <Card>
          <CardHeader>
            <CardTitle>Peak Usage Hours</CardTitle>
            <CardDescription>Gym usage throughout the day</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={peakHours}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value} people`, 'Usage']} />
                <Line 
                  type="monotone" 
                  dataKey="usage" 
                  stroke="#f59e0b" 
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Insights</CardTitle>
          <CardDescription>Key insights and recommendations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-medium text-green-800">Peak Performance</h4>
              <p className="text-sm text-green-600 mt-1">
                Evening hours (5-7 PM) show highest usage. Consider extending staff hours.
              </p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-800">Growth Opportunity</h4>
              <p className="text-sm text-blue-600 mt-1">
                Morning hours (6-9 AM) have capacity for 30% more members.
              </p>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg">
              <h4 className="font-medium text-orange-800">Retention Focus</h4>
              <p className="text-sm text-orange-600 mt-1">
                Member retention decreased 2.3%. Consider loyalty programs.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}