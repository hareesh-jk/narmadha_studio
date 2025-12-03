import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Camera,
  Calendar,
  Users,
  Image,
  DollarSign,
  Settings,
  LogOut,
  Menu,
  X,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  Package,
  FileText,
  Bell,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const sidebarItems = [
  { icon: TrendingUp, label: "Dashboard", href: "/admin/dashboard", active: true },
  { icon: Calendar, label: "Bookings", href: "/admin/bookings" },
  { icon: Image, label: "Portfolio", href: "/admin/portfolio" },
  { icon: Users, label: "Customers", href: "/admin/customers" },
  { icon: Package, label: "Services", href: "/admin/services" },
  { icon: DollarSign, label: "Pricing", href: "/admin/pricing" },
  { icon: FileText, label: "Content", href: "/admin/content" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
];

const stats = [
  {
    label: "Total Bookings",
    value: "156",
    change: "+12%",
    trend: "up",
    icon: Calendar,
  },
  {
    label: "Revenue This Month",
    value: "₹4,85,000",
    change: "+8%",
    trend: "up",
    icon: DollarSign,
  },
  {
    label: "New Customers",
    value: "23",
    change: "+15%",
    trend: "up",
    icon: Users,
  },
  {
    label: "Portfolio Views",
    value: "2,340",
    change: "+25%",
    trend: "up",
    icon: Image,
  },
];

const recentBookings = [
  {
    id: "BK001",
    customer: "Priya Sharma",
    service: "Wedding Photography",
    date: "Dec 15, 2025",
    status: "confirmed",
    amount: "₹75,000",
  },
  {
    id: "BK002",
    customer: "Rahul Mehta",
    service: "Kids Portrait",
    date: "Dec 10, 2025",
    status: "pending",
    amount: "₹15,000",
  },
  {
    id: "BK003",
    customer: "Anjali Singh",
    service: "Birthday Event",
    date: "Dec 8, 2025",
    status: "completed",
    amount: "₹35,000",
  },
  {
    id: "BK004",
    customer: "Vikram Patel",
    service: "Studio Portrait",
    date: "Dec 5, 2025",
    status: "completed",
    amount: "₹8,000",
  },
];

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-800",
  completed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-foreground/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-64 bg-card border-r border-border transition-transform duration-300 lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <Link to="/" className="flex items-center gap-2">
              <Camera className="h-7 w-7 text-primary" />
              <span className="font-serif text-xl font-semibold">Lumière</span>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {sidebarItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                  item.active
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-border">
            <Link to="/">
              <Button variant="ghost" className="w-full justify-start">
                <LogOut className="h-5 w-5 mr-3" />
                Logout
              </Button>
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-background/95 backdrop-blur border-b border-border">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 hover:bg-muted rounded-lg"
              >
                <Menu className="h-5 w-5" />
              </button>
              <h1 className="font-serif text-2xl font-semibold">Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon-sm" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center">
                  3
                </span>
              </Button>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-medium text-primary">AM</span>
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium">Admin</p>
                  <p className="text-xs text-muted-foreground">admin@lumiere.studio</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6">
          {/* Stats Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-xl p-6 shadow-soft"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <stat.icon className="h-5 w-5 text-primary" />
                  </div>
                  <span
                    className={cn(
                      "text-xs font-medium px-2 py-1 rounded-full",
                      stat.trend === "up"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    )}
                  >
                    {stat.change}
                  </span>
                </div>
                <div className="font-serif text-2xl font-semibold">{stat.value}</div>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Recent Bookings & Quick Actions */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Recent Bookings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="lg:col-span-2 bg-card rounded-xl shadow-soft"
            >
              <div className="flex items-center justify-between p-6 border-b border-border">
                <h2 className="font-semibold">Recent Bookings</h2>
                <Link to="/admin/bookings">
                  <Button variant="ghost" size="sm">
                    View All
                  </Button>
                </Link>
              </div>
              <div className="p-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-sm text-muted-foreground">
                        <th className="pb-4">ID</th>
                        <th className="pb-4">Customer</th>
                        <th className="pb-4">Service</th>
                        <th className="pb-4">Date</th>
                        <th className="pb-4">Status</th>
                        <th className="pb-4 text-right">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      {recentBookings.map((booking) => (
                        <tr key={booking.id} className="border-t border-border">
                          <td className="py-4 font-mono text-xs">{booking.id}</td>
                          <td className="py-4 font-medium">{booking.customer}</td>
                          <td className="py-4 text-muted-foreground">
                            {booking.service}
                          </td>
                          <td className="py-4 text-muted-foreground">{booking.date}</td>
                          <td className="py-4">
                            <span
                              className={cn(
                                "px-2 py-1 rounded-full text-xs font-medium capitalize",
                                statusColors[booking.status as keyof typeof statusColors]
                              )}
                            >
                              {booking.status}
                            </span>
                          </td>
                          <td className="py-4 text-right font-medium">
                            {booking.amount}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-card rounded-xl shadow-soft p-6"
            >
              <h2 className="font-semibold mb-6">Quick Actions</h2>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="h-4 w-4 mr-3" />
                  New Booking
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Image className="h-4 w-4 mr-3" />
                  Upload Portfolio
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-3" />
                  Add Customer
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Package className="h-4 w-4 mr-3" />
                  Create Gallery
                </Button>
              </div>

              {/* Today's Schedule */}
              <div className="mt-8">
                <h3 className="font-semibold mb-4">Today's Schedule</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                    <Clock className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm font-medium">Wedding Shoot</p>
                      <p className="text-xs text-muted-foreground">10:00 AM - 6:00 PM</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="text-sm font-medium">Gallery Delivery</p>
                      <p className="text-xs text-muted-foreground">Client: Priya S.</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                    <AlertCircle className="h-5 w-5 text-yellow-600" />
                    <div>
                      <p className="text-sm font-medium">3 Pending Reviews</p>
                      <p className="text-xs text-muted-foreground">Customer photos</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}
