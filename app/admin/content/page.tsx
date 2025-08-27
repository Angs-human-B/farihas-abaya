"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "react-hot-toast";
import {
  Save,
  Upload,
  Plus,
  Edit2,
  Trash2,
  Star,
  MapPin,
  Instagram,
  Facebook,
  Phone,
  Mail,
} from "lucide-react";

interface HeroContent {
  id: string;
  title: string;
  titleAr?: string;
  subtitle: string;
  ctaText: string;
  bgImage: string;
  isActive: boolean;
  order: number;
}

interface Testimonial {
  id: string;
  name: string;
  review: string;
  rating: number;
  image?: string;
  isActive: boolean;
  createdAt: Date;
}

interface Store {
  id: string;
  name: string;
  address: string;
  phone: string;
  hours: string;
  mapUrl: string;
  image?: string;
  isActive: boolean;
}

interface SiteSettings {
  id: string;
  brandStory: string;
  brandStoryAr?: string;
  craftmanship: string;
  instagram?: string;
  facebook?: string;
  whatsapp: string;
  email: string;
}

export default function ContentPage() {
  const [heroContents, setHeroContents] = useState<HeroContent[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [stores, setStores] = useState<Store[]>([]);
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Fetch all content data
  const fetchContent = async () => {
    try {
      setLoading(true);

      const [
        heroResponse,
        testimonialsResponse,
        storesResponse,
        settingsResponse,
      ] = await Promise.all([
        fetch("/api/admin/content/hero"),
        fetch("/api/admin/content/testimonials"),
        fetch("/api/admin/content/stores"),
        fetch("/api/admin/content/settings"),
      ]);

      if (heroResponse.ok) {
        const heroData = await heroResponse.json();
        setHeroContents(heroData);
      }

      if (testimonialsResponse.ok) {
        const testimonialsData = await testimonialsResponse.json();
        setTestimonials(testimonialsData);
      }

      if (storesResponse.ok) {
        const storesData = await storesResponse.json();
        setStores(storesData);
      }

      if (settingsResponse.ok) {
        const settingsData = await settingsResponse.json();
        setSiteSettings(settingsData);
      }
    } catch (error) {
      toast.error("Error fetching content");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  // Save site settings
  const saveSiteSettings = async (settings: Partial<SiteSettings>) => {
    try {
      setSaving(true);
      const response = await fetch("/api/admin/content/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      if (response.ok) {
        toast.success("Settings saved successfully");
        fetchContent();
      } else {
        toast.error("Failed to save settings");
      }
    } catch (error) {
      toast.error("Error saving settings");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Content Management</h1>
        <p className="text-gray-600">
          Manage your website content and settings
        </p>
      </div>

      <Tabs defaultValue="hero" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="hero">Hero Content</TabsTrigger>
          <TabsTrigger value="brand">Brand Story</TabsTrigger>
          <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
          <TabsTrigger value="stores">Store Info</TabsTrigger>
          <TabsTrigger value="settings">Site Settings</TabsTrigger>
        </TabsList>

        {/* Hero Content Tab */}
        <TabsContent value="hero" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Hero Sections</CardTitle>
                  <CardDescription>
                    Manage your homepage hero content and background images
                  </CardDescription>
                </div>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Hero Slide
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {heroContents.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">No hero content found</p>
                  <Button>Create First Hero Slide</Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {heroContents.map((hero) => (
                    <div key={hero.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-medium">{hero.title}</h3>
                        <div className="flex items-center space-x-2">
                          <span
                            className={`px-2 py-1 text-xs rounded ${
                              hero.isActive
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {hero.isActive ? "Active" : "Inactive"}
                          </span>
                          <Button size="sm" variant="outline">
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm mb-2">
                        {hero.subtitle}
                      </p>
                      <p className="text-sm text-gray-500">
                        CTA: {hero.ctaText}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Brand Story Tab */}
        <TabsContent value="brand" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Brand Story</CardTitle>
              <CardDescription>
                Update your brand story and craftsmanship content
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Brand Story (English)
                </label>
                <textarea
                  rows={6}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                  placeholder="Enter your brand story..."
                  defaultValue={siteSettings?.brandStory || ""}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Brand Story (Arabic)
                </label>
                <textarea
                  rows={6}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                  placeholder="أدخل قصة علامتك التجارية..."
                  defaultValue={siteSettings?.brandStoryAr || ""}
                  dir="rtl"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Craftsmanship Description
                </label>
                <textarea
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                  placeholder="Describe your craftsmanship..."
                  defaultValue={siteSettings?.craftmanship || ""}
                />
              </div>

              <Button onClick={() => saveSiteSettings({})} disabled={saving}>
                <Save className="mr-2 h-4 w-4" />
                {saving ? "Saving..." : "Save Brand Story"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Testimonials Tab */}
        <TabsContent value="testimonials" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Customer Testimonials</CardTitle>
                  <CardDescription>
                    Manage customer reviews and testimonials
                  </CardDescription>
                </div>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Testimonial
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {testimonials.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">No testimonials found</p>
                  <Button>Add First Testimonial</Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {testimonials.map((testimonial) => (
                    <div key={testimonial.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-medium">{testimonial.name}</h3>
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < testimonial.rating
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                        {testimonial.review}
                      </p>
                      <div className="flex items-center justify-between">
                        <span
                          className={`px-2 py-1 text-xs rounded ${
                            testimonial.isActive
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {testimonial.isActive ? "Active" : "Inactive"}
                        </span>
                        <div className="flex space-x-1">
                          <Button size="sm" variant="outline">
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Stores Tab */}
        <TabsContent value="stores" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Store Locations</CardTitle>
                  <CardDescription>
                    Manage your physical store locations and contact information
                  </CardDescription>
                </div>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Store
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {stores.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">No stores found</p>
                  <Button>Add First Store</Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {stores.map((store) => (
                    <div key={store.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-medium">{store.name}</h3>
                        <div className="flex items-center space-x-2">
                          <span
                            className={`px-2 py-1 text-xs rounded ${
                              store.isActive
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {store.isActive ? "Active" : "Inactive"}
                          </span>
                          <Button size="sm" variant="outline">
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          <span>{store.address}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone className="h-4 w-4 text-gray-400" />
                          <span>{store.phone}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-600">
                            Hours: {store.hours}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Site Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Site Settings</CardTitle>
              <CardDescription>
                Configure social media links and contact information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    <Instagram className="inline h-4 w-4 mr-1" />
                    Instagram URL
                  </label>
                  <Input
                    placeholder="https://instagram.com/farihasabaya"
                    defaultValue={siteSettings?.instagram || ""}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    <Facebook className="inline h-4 w-4 mr-1" />
                    Facebook URL
                  </label>
                  <Input
                    placeholder="https://facebook.com/farihasabaya"
                    defaultValue={siteSettings?.facebook || ""}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    <Phone className="inline h-4 w-4 mr-1" />
                    WhatsApp Number
                  </label>
                  <Input
                    placeholder="+880 1XXX-XXXXXX"
                    defaultValue={siteSettings?.whatsapp || ""}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    <Mail className="inline h-4 w-4 mr-1" />
                    Email Address
                  </label>
                  <Input
                    placeholder="info@farihasabaya.com"
                    defaultValue={siteSettings?.email || ""}
                  />
                </div>
              </div>

              <Button onClick={() => saveSiteSettings({})} disabled={saving}>
                <Save className="mr-2 h-4 w-4" />
                {saving ? "Saving..." : "Save Settings"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
