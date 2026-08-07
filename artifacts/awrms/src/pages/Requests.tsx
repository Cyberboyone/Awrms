import { SidebarLayout } from '../components/SidebarLayout';
import { useGetWasteRequests } from '@workspace/api-client-react';
import { 
  ClipboardList, 
  CheckCircle, 
  Clock, 
  UserCircle,
  AlertCircle,
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

export default function Requests() {
  const { data: requests } = useGetWasteRequests();

  const stats = [
    { title: 'Total Requests', value: '128', icon: ClipboardList, color: 'text-blue-600', bg: 'bg-blue-100' },
    { title: 'Completed', value: '98', icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-100' },
    { title: 'Pending', value: '30', icon: Clock, color: 'text-orange-600', bg: 'bg-orange-100' },
    { title: 'Assigned', value: '12', icon: UserCircle, color: 'text-purple-600', bg: 'bg-purple-100' },
    { title: 'Urgent', value: '5', icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-100' },
  ];

  // Mock data if API is empty
  const tableData = requests?.length ? requests : [
    { id: 1042, location: 'Science Block', category: 'plastic', preferred_date: new Date().toISOString(), status: 'pending', assigned_to: null },
    { id: 1041, location: 'Main Library', category: 'paper', preferred_date: new Date(Date.now() - 86400).toISOString(), status: 'completed', assigned_to: 'John Personnel' },
    { id: 1040, location: 'Hostel A', category: 'metal', preferred_date: new Date(Date.now() + 172800).toISOString(), status: 'assigned', assigned_to: 'Sarah Worker' },
    { id: 1039, location: 'Cafeteria', category: 'organic', preferred_date: new Date(Date.now() - 259200).toISOString(), status: 'completed', assigned_to: 'John Personnel' },
    { id: 1038, location: 'Admin Block', category: 'other', preferred_date: new Date().toISOString(), status: 'pending', assigned_to: null },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed': return <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-0">Completed</Badge>;
      case 'assigned': return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-0">Assigned</Badge>;
      case 'pending': return <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100 border-0">Pending</Badge>;
      case 'cancelled': return <Badge className="bg-red-100 text-red-700 hover:bg-red-100 border-0">Cancelled</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <SidebarLayout pageTitle="Collection Requests">
      <div className="flex flex-col gap-6">
        
        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
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
              <h2 className="text-lg font-bold text-slate-800">Collection Requests</h2>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="gap-2">
                  <Download className="h-4 w-4" /> Export
                </Button>
                <Button size="sm" className="bg-[#1B4332] hover:bg-[#153427] gap-2">
                  <Plus className="h-4 w-4" /> New Request
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input placeholder="Search requests..." className="pl-9 bg-slate-50" />
              </div>
              
              <Select defaultValue="all">
                <SelectTrigger className="w-[140px] bg-slate-50">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="assigned">Assigned</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>

              <Select defaultValue="this_month">
                <SelectTrigger className="w-[160px] bg-slate-50">
                  <SelectValue placeholder="Date Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="this_week">This Week</SelectItem>
                  <SelectItem value="this_month">This Month</SelectItem>
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
                  <th className="px-5 py-4">REQ ID</th>
                  <th className="px-5 py-4">Location</th>
                  <th className="px-5 py-4">Category</th>
                  <th className="px-5 py-4">Preferred Date</th>
                  <th className="px-5 py-4">Assigned To</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {tableData.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-5 py-4 font-medium text-[#2D6A4F]">REQ-{row.id}</td>
                    <td className="px-5 py-4 text-slate-800 font-medium">{row.location}</td>
                    <td className="px-5 py-4 capitalize text-slate-600">{row.category}</td>
                    <td className="px-5 py-4 text-slate-600">{row.preferred_date ? format(new Date(row.preferred_date), 'MMM dd, yyyy') : 'Any time'}</td>
                    <td className="px-5 py-4 text-slate-600">{row.assigned_to || <span className="text-slate-400 italic">Unassigned</span>}</td>
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
