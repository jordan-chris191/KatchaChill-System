import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Search, Plus, Edit, Wrench, AlertTriangle } from 'lucide-react';

interface Equipment {
  id: string;
  name: string;
  category: string;
  brand: string;
  model: string;
  status: 'Working' | 'Maintenance' | 'Out of Order';
  lastMaintenance: string;
  nextMaintenance: string;
  location: string;
  notes?: string;
}

export function EquipmentManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const [equipment] = useState<Equipment[]>([
    {
      id: 'EQ001',
      name: 'Treadmill Pro X1',
      category: 'Cardio',
      brand: 'FitTech',
      model: 'TX-2024',
      status: 'Working',
      lastMaintenance: '2024-08-15',
      nextMaintenance: '2024-11-15',
      location: 'Cardio Zone A',
      notes: 'Recently serviced, running smoothly'
    },
    {
      id: 'EQ002',
      name: 'Leg Press Machine',
      category: 'Strength',
      brand: 'PowerLift',
      model: 'LP-500',
      status: 'Working',
      lastMaintenance: '2024-07-20',
      nextMaintenance: '2024-10-20',
      location: 'Strength Area B'
    },
    {
      id: 'EQ003',
      name: 'Elliptical Trainer',
      category: 'Cardio',
      brand: 'CardioMax',
      model: 'EL-300',
      status: 'Maintenance',
      lastMaintenance: '2024-09-01',
      nextMaintenance: '2024-09-15',
      location: 'Cardio Zone B',
      notes: 'Belt needs adjustment'
    },
    {
      id: 'EQ004',
      name: 'Smith Machine',
      category: 'Strength',
      brand: 'IronForce',
      model: 'SM-Pro',
      status: 'Working',
      lastMaintenance: '2024-08-01',
      nextMaintenance: '2024-11-01',
      location: 'Free Weights'
    },
    {
      id: 'EQ005',
      name: 'Rowing Machine',
      category: 'Cardio',
      brand: 'RowTech',
      model: 'RT-2023',
      status: 'Out of Order',
      lastMaintenance: '2024-06-15',
      nextMaintenance: '2024-09-15',
      location: 'Cardio Zone C',
      notes: 'Motor malfunction, awaiting parts'
    },
    {
      id: 'EQ006',
      name: 'Cable Crossover',
      category: 'Strength',
      brand: 'CableFlex',
      model: 'CX-Dual',
      status: 'Working',
      lastMaintenance: '2024-08-10',
      nextMaintenance: '2024-11-10',
      location: 'Functional Training'
    }
  ]);

  const filteredEquipment = equipment.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.model.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusColor = (status: Equipment['status']) => {
    switch (status) {
      case 'Working': return 'default';
      case 'Maintenance': return 'secondary';
      case 'Out of Order': return 'destructive';
      default: return 'secondary';
    }
  };

  const getStatusIcon = (status: Equipment['status']) => {
    switch (status) {
      case 'Maintenance': return <Wrench className="h-3 w-3" />;
      case 'Out of Order': return <AlertTriangle className="h-3 w-3" />;
      default: return null;
    }
  };

  const categories = ['Cardio', 'Strength', 'Functional', 'Free Weights'];
  const statuses = ['Working', 'Maintenance', 'Out of Order'];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">
              {equipment.filter(e => e.status === 'Working').length}
            </div>
            <p className="text-sm text-muted-foreground">Working</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600">
              {equipment.filter(e => e.status === 'Maintenance').length}
            </div>
            <p className="text-sm text-muted-foreground">Maintenance</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-600">
              {equipment.filter(e => e.status === 'Out of Order').length}
            </div>
            <p className="text-sm text-muted-foreground">Out of Order</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">{equipment.length}</div>
            <p className="text-sm text-muted-foreground">Total Equipment</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Equipment Management</CardTitle>
              <CardDescription>Track and maintain gym equipment</CardDescription>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Equipment
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Add New Equipment</DialogTitle>
                  <DialogDescription>
                    Enter the equipment details to add to inventory.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">Name</Label>
                    <Input id="name" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="category" className="text-right">Category</Label>
                    <Select>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(cat => (
                          <SelectItem key={cat} value={cat.toLowerCase()}>{cat}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="brand" className="text-right">Brand</Label>
                    <Input id="brand" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="model" className="text-right">Model</Label>
                    <Input id="model" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="location" className="text-right">Location</Label>
                    <Input id="location" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="notes" className="text-right">Notes</Label>
                    <Textarea id="notes" className="col-span-3" rows={3} />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button>Add Equipment</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search equipment..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(cat => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                {statuses.map(status => (
                  <SelectItem key={status} value={status}>{status}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Equipment Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Equipment</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Next Maintenance</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEquipment.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {item.brand} {item.model} • ID: {item.id}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{item.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(item.status)} className="flex items-center gap-1 w-fit">
                        {getStatusIcon(item.status)}
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{item.location}</TableCell>
                    <TableCell>
                      <span className={
                        new Date(item.nextMaintenance) < new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
                          ? 'text-orange-600 font-medium'
                          : ''
                      }>
                        {item.nextMaintenance}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Wrench className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredEquipment.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No equipment found matching your criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}