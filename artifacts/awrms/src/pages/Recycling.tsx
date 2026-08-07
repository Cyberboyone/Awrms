import { SidebarLayout } from '../components/SidebarLayout';
import { useGetRecyclingRecords } from '@workspace/api-client-react';
import { 
  Recycle, 
  CheckCircle, 
  Settings, 
  PackageCheck,
  Plus,
  Download,
  Search,
  Filter,
  Eye,
  Edit,
  Trash
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { Badge } from '../components/ui/badge';
import { format } from 'date-fns';

export default function Recycling() {
  const { data: records } = useGetRecyclingRecords();

  const stats = [
    { title: 'Total Processed', value: '4,500kg', icon: PackageCheck, color: 'text-blue-600', bg: 'bg-blue-100' },
    { title: 'Fully Recycled', value: '3,800kg', icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-100' },
    { title: 'In Processing', value: '700kg', icon: Settings, color: 'text-orange-600', bg: 'bg-orange-100' },
    { title: 'Efficiency', value: '84%', icon: Recycle, color: 'text-purple-600', bg: 'bg-purple-100' },
  ];

  // Mock data if API is empty
  const tableData = records?.length ? records : [
    { id: 2042, material_type: 'plastic', quantity_kg: 145, collection_date: new Date().toISOString(), status: 'recycled', location: 'Processing Center A' },
    { id: 2041, material_type: 'paper', quantity_kg: 320, collection_date: new Date(Date.now() - 86400).toISOString(), status: 'processing', location: 'Processing Center B' },
    { id: 2040, material_type: 'metal', quantity_kg: 218, collection_date: new Date(Date.now() - 172800).toISOString(), status: 'sorted', location: 'Sorting Facility' },
    { id: 2039, material_type: 'glass', quantity_kg: 85, collection_date: new Date(Date.now() - 259200).toISOString(), status: 'collected', location: 'Storage C' },
    { id: 2038, material_type: 'organic', quantity_kg: 165, collection_date: new Date().toISOString(), status: 'disposed', location: 'Compost Site' },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'recycled': return <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-0">Recycled</Badge>;
      case 'processing': return <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100 border-0">Processing</Badge>;
      case 'sorted': return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-0">Sorted</Badge>;
      case 'collected': return <Badge className="bg-slate-100 text-slate-700 hover:bg-slate-100 border-0">Collected</Badge>;
      case 'disposed': return <Badge className="bg-stone-100 text-stone-700 hover:bg-stone-100 border-0">Disposed</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getTypeIcon = (type: string) => {
    const colors: Record<string, string> = {
      plastic: 'bg-blue-500',
      paper: 'bg-amber-500',
      metal: 'bg-purple-500',
      glass: 'bg-emerald-500',
      organic: 'bg-orange-500',
      other: 'bg-slate-500'
    };
    const bg = colors[type] || colors.other;
    return (
      <div className="flex items-center gap-2">
        <div className={`w-3 h-3 rounded-full ${bg}`}></div>
        <span className="capitalize font-medium">{type}</span>
      </div>
    );
  };

  return (
    <SidebarLayout pageTitle="Recycling Management">
      <div className="flex flex-col gap-6">
        
        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white rounded-xl border p-4 shadow-sm flex flex-col">
              <div className={`p-2.5 rounded-full ${stat.bg} ${stat.color} w-10 h-10 flex items-center justify-center mb-3`}>
                <stat.icon className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-bold text-slate-800">{stat.value}</h3>
              <p className="text-xs text-slate-500 font-medium">{stat.title}</p>
            </div>
          ))}
        </div>

        {/* Main Section */}
        <div className="bg-white rounded-xl border shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 border-b">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <h2 className="text-lg font-bold text-slate-800">Recycling Records</h2>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="gap-2">
                  <Download className="h-4 w-4" /> Export
                </Button>
                <Button size="sm" className="bg-[#1B4332] hover:bg-[#153427] gap-2">
                  <Plus className="h-4 w-4" /> Add Record
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input placeholder="Search records..." className="pl-9 bg-slate-50" />
              </div>
              
              <Select defaultValue="all">
                <SelectTrigger className="w-[160px] bg-slate-50">
                  <SelectValue placeholder="All Materials" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Materials</SelectItem>
                  <SelectItem value="plastic">Plastic</SelectItem>
                  <SelectItem value="paper">Paper</SelectItem>
                  <SelectItem value="metal">Metal</SelectItem>
                  <SelectItem value="glass">Glass</SelectItem>
                </SelectContent>
              </Select>
              
              <Select defaultValue="all">
                <SelectTrigger className="w-[140px] bg-slate-50">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="recycled">Recycled</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="sorted">Sorted</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="secondary" className="gap-2 bg-slate-100 text-slate-700 hover:bg-slate-200">
                <Filter className="h-4 w-4" /> Filter
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-500 font-medium border-b">
                <tr>
                  <th className="px-5 py-4">Record ID</th>
                  <th className="px-5 py-4">Material</th>
                  <th className="px-5 py-4">Quantity (kg)</th>
                  <th className="px-5 py-4">Date Logged</th>
                  <th className="px-5 py-4">Facility Location</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {tableData.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-5 py-4 font-medium text-[#2D6A4F]">REC-{row.id}</td>
                    <td className="px-5 py-4">{getTypeIcon(row.material_type)}</td>
                    <td className="px-5 py-4 font-medium text-slate-800">{row.quantity_kg} kg</td>
                    <td className="px-5 py-4 text-slate-600">{row.collection_date ? format(new Date(row.collection_date), 'MMM dd, yyyy') : 'Unknown'}</td>
                    <td className="px-5 py-4 text-slate-600">{row.location || 'Unknown'}</td>
                    <td className="px-5 py-4">{getStatusBadge(row.status)}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-1.5 text-slate-400 hover:text-[#2D6A4F] hover:bg-[#F0FFF4] rounded-md transition-colors">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors">
                          <Trash className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="p-4 border-t flex items-center justify-between text-sm text-slate-500">
            <div>Showing 1 to 5 of {tableData.length} entries</div>
            <div className="flex items-center gap-1">
              <Button variant="outline" size="sm" disabled>Previous</Button>
              <Button variant="outline" size="sm" className="bg-[#1B4332] text-white hover:bg-[#153427] border-0">1</Button>
              <Button variant="outline" size="sm">2</Button>
              <Button variant="outline" size="sm">Next</Button>
            </div>
          </div>
        </div>

      </div>
    </SidebarLayout>
  );
}
