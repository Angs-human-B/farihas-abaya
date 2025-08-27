"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Package,
  Star,
  MessageSquare,
  Users,
  TrendingUp,
  Plus,
  Edit,
  Eye,
  Clock,
} from "lucide-react";
import Link from "next/link";

interface DashboardStats {
  totalProducts: number;
  featuredProducts: number;
  activeTestimonials: number;
  totalInquiries: number;
  inStockProducts: number;
  outOfStockProducts: number;
}

interface RecentInquiry {
  id: string;
  customerName: string;
  email: string;
  message: string;
  createdAt: Date;
  status: "new" | "responded" | "closed";
}

interface QuickAction {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  color: string;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    featuredProducts: 0,
    activeTestimonials: 0,
    totalInquiries: 0,
    inStockProducts: 0,
    outOfStockProducts: 0,
  });
  const [recentInquiries, setRecentInquiries] = useState<RecentInquiry[]>([]);
  const [loading, setLoading] = useState(true);

  const quickActions: QuickAction[] = [
    {
      title: "Add Product",
      description: "Add a new product to your catalog",
      href: "/admin/products?action=add",
      icon: <Plus className="h-6 w-6" />,
      color: "bg-blue-500",
    },
    {
      title: "Update Hero",
      description: "Modify homepage hero content",
      href: "/admin/content?tab=hero",
      icon: <Edit className="h-6 w-6" />,
      color: "bg-purple-500",
    },
    {
      title: "View Site",
      description: "Preview your live website",
      href: "/",
      icon: <Eye className="h-6 w-6" />,
      color: "bg-green-500",
    },
    {
      title: "Manage Stores",
      description: "Update store locations",
      href: "/admin/content?tab=stores",
      icon: <Package className="h-6 w-6" />,
      color: "bg-orange-500",
    },
  ];

  // Fetch dashboard data
  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      const [statsResponse, inquiriesResponse] = await Promise.all([
        fetch("/api/admin/dashboard/stats"),
        fetch("/api/admin/dashboard/inquiries"),
      ]);

      if (statsResponse.ok) {
        const statsData = await statsResponse.json();
        setStats(statsData);
      }

      if (inquiriesResponse.ok) {
        const inquiriesData = await inquiriesResponse.json();
        setRecentInquiries(inquiriesData);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-gold/10 to-yellow-100 rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome to Farihas Abaya Admin
        </h1>
        <p className="text-gray-600">
          Manage your premium abaya store with ease. Here's what's happening
          today.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-6">
            <div className="flex items-center">
              <Package className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Total Products
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.totalProducts}
                </p>
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-green-600">
                {stats.inStockProducts} in stock
              </span>
              <span className="text-gray-400 mx-2">•</span>
              <span className="text-red-600">
                {stats.outOfStockProducts} out of stock
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-gold">
          <CardContent className="p-6">
            <div className="flex items-center">
              <Star className="h-8 w-8 text-gold" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Featured Products
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.featuredProducts}
                </p>
              </div>
            </div>
            <div className="mt-4">
              <Link
                href="/admin/products"
                className="text-sm text-gold hover:underline"
              >
                Manage featured →
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-6">
            <div className="flex items-center">
              <MessageSquare className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Testimonials
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.activeTestimonials}
                </p>
              </div>
            </div>
            <div className="mt-4">
              <Link
                href="/admin/content?tab=testimonials"
                className="text-sm text-green-600 hover:underline"
              >
                Manage reviews →
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Customer Inquiries
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.totalInquiries}
                </p>
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-orange-600">
                {recentInquiries.filter((i) => i.status === "new").length} new
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="mr-2 h-5 w-5" />
            Quick Actions
          </CardTitle>
          <CardDescription>
            Common tasks to manage your store efficiently
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Link key={index} href={action.href}>
                <div className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer">
                  <div
                    className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center text-white mb-3`}
                  >
                    {action.icon}
                  </div>
                  <h3 className="font-medium text-gray-900 mb-1">
                    {action.title}
                  </h3>
                  <p className="text-sm text-gray-600">{action.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Inquiries */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Inquiries</CardTitle>
                <CardDescription>
                  Latest customer messages and inquiries
                </CardDescription>
              </div>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {recentInquiries.length === 0 ? (
              <div className="text-center py-8">
                <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No inquiries yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {recentInquiries.slice(0, 5).map((inquiry) => (
                  <div
                    key={inquiry.id}
                    className="border-b border-gray-100 pb-4 last:border-b-0"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">
                        {inquiry.customerName}
                      </h4>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          inquiry.status === "new"
                            ? "bg-orange-100 text-orange-800"
                            : inquiry.status === "responded"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {inquiry.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                      {inquiry.message}
                    </p>
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="h-3 w-3 mr-1" />
                      {formatDate(inquiry.createdAt)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Site Health */}
        <Card>
          <CardHeader>
            <CardTitle>Site Health</CardTitle>
            <CardDescription>Overview of your website status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-sm font-medium">Website Status</span>
                </div>
                <span className="text-sm text-green-700">Online</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                  <span className="text-sm font-medium">Product Images</span>
                </div>
                <span className="text-sm text-blue-700">
                  {stats.totalProducts > 0 ? "Optimized" : "No products"}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
                  <span className="text-sm font-medium">Content Updates</span>
                </div>
                <span className="text-sm text-yellow-700">Recent</span>
              </div>

              <div className="pt-4">
                <Link href="/" target="_blank">
                  <Button variant="outline" className="w-full">
                    <Eye className="mr-2 h-4 w-4" />
                    View Live Site
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
