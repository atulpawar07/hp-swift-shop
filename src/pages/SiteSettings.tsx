import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Navigate, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Upload, Image as ImageIcon, Info, ArrowLeft, Monitor, Tablet, Smartphone } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";

interface CoverPhotoSettings {
  url: string;
  position: { x: number; y: number };
  scale: number;
}

type DeviceType = 'desktop' | 'tablet' | 'mobile';

const SiteSettings = () => {
  const { isAdmin, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [coverPhotos, setCoverPhotos] = useState<Record<DeviceType, CoverPhotoSettings>>({
    desktop: { url: "", position: { x: 0, y: 0 }, scale: 1 },
    tablet: { url: "", position: { x: 0, y: 0 }, scale: 1 },
    mobile: { url: "", position: { x: 0, y: 0 }, scale: 1 },
  });
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeDevice, setActiveDevice] = useState<DeviceType>('desktop');
  const [adjusting, setAdjusting] = useState<DeviceType | null>(null);
  const imageRefs = useRef<Record<DeviceType, HTMLImageElement | null>>({
    desktop: null,
    tablet: null,
    mobile: null,
  });

  useEffect(() => {
    fetchCoverPhotos();
  }, []);

  const fetchCoverPhotos = async () => {
    try {
      const devices: DeviceType[] = ['desktop', 'tablet', 'mobile'];
      const newCoverPhotos = { ...coverPhotos };

      for (const device of devices) {
        const { data, error } = await supabase
          .from("site_settings")
          .select("setting_value")
          .eq("setting_key", `cover_photo_${device}`)
          .maybeSingle();

        if (!error && data?.setting_value) {
          const value = data.setting_value as any;
          if (value && typeof value === 'object' && 'url' in value) {
            newCoverPhotos[device] = {
              url: value.url || "",
              position: value.position || { x: 0, y: 0 },
              scale: value.scale || 1,
            };
          }
        }
      }

      setCoverPhotos(newCoverPhotos);
    } catch (error) {
      console.error("Error fetching cover photos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>, device: DeviceType) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size must be less than 5MB");
      return;
    }

    // Check file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    setUploading(true);

    try {
      // Delete old cover photo if exists
      if (coverPhotos[device].url) {
        const oldPath = coverPhotos[device].url.split("/").pop();
        if (oldPath) {
          await supabase.storage.from("site-assets").remove([`cover-photos/${oldPath}`]);
        }
      }

      // Upload new file
      const fileExt = file.name.split(".").pop();
      const fileName = `cover-${device}-${Date.now()}.${fileExt}`;
      const filePath = `cover-photos/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("site-assets")
        .upload(filePath, file, {
          upsert: true,
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from("site-assets")
        .getPublicUrl(filePath);

      // Save to database
      const newSettings: CoverPhotoSettings = {
        url: publicUrl,
        position: { x: 0, y: 0 },
        scale: 1,
      };

      const { error: dbError } = await supabase
        .from("site_settings")
        .upsert([{
          setting_key: `cover_photo_${device}`,
          setting_value: newSettings as any,
          updated_by: (await supabase.auth.getUser()).data.user?.id,
        }], {
          onConflict: "setting_key",
        });

      if (dbError) throw dbError;

      setCoverPhotos(prev => ({
        ...prev,
        [device]: newSettings,
      }));
      
      toast.success(`${device.charAt(0).toUpperCase() + device.slice(1)} cover photo updated successfully`);
    } catch (error) {
      console.error("Error uploading cover photo:", error);
      toast.error("Failed to upload cover photo");
    } finally {
      setUploading(false);
    }
  };

  const handleAdjustmentChange = async (device: DeviceType, field: 'x' | 'y' | 'scale', value: number) => {
    const updated = { ...coverPhotos[device] };
    
    if (field === 'scale') {
      updated.scale = value;
    } else {
      updated.position[field] = value;
    }

    setCoverPhotos(prev => ({
      ...prev,
      [device]: updated,
    }));
  };

  const saveAdjustments = async (device: DeviceType) => {
    try {
      const { error } = await supabase
        .from("site_settings")
        .upsert([{
          setting_key: `cover_photo_${device}`,
          setting_value: coverPhotos[device] as any,
          updated_by: (await supabase.auth.getUser()).data.user?.id,
        }], {
          onConflict: "setting_key",
        });

      if (error) throw error;

      toast.success("Adjustments saved successfully");
      setAdjusting(null);
    } catch (error) {
      console.error("Error saving adjustments:", error);
      toast.error("Failed to save adjustments");
    }
  };

  const getDeviceIcon = (device: DeviceType) => {
    switch (device) {
      case 'desktop': return Monitor;
      case 'tablet': return Tablet;
      case 'mobile': return Smartphone;
    }
  };

  const getDevicePreviewSize = (device: DeviceType) => {
    switch (device) {
      case 'desktop': return { width: '100%', height: '150px' };
      case 'tablet': return { width: '768px', height: '140px' };
      case 'mobile': return { width: '375px', height: '120px' };
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/admin/dashboard")}
            className="hover:bg-accent"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-3xl font-bold">Site Settings</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ImageIcon className="h-5 w-5" />
              Navbar Cover Photos (Responsive)
            </CardTitle>
            <CardDescription>
              Upload device-specific cover photos that extend to the full navbar height
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                <strong>Recommended sizes:</strong>
                <br />
                • Desktop: 1920x150px | Tablet: 1024x140px | Mobile: 768x120px
                <br />
                Maximum file size: 5MB. Supported formats: JPG, PNG, WEBP
                <br />
                The logo area will maintain a white background for visibility.
              </AlertDescription>
            </Alert>

            <Tabs value={activeDevice} onValueChange={(v) => setActiveDevice(v as DeviceType)}>
              <TabsList className="grid w-full grid-cols-3">
                {(['desktop', 'tablet', 'mobile'] as DeviceType[]).map((device) => {
                  const Icon = getDeviceIcon(device);
                  return (
                    <TabsTrigger key={device} value={device} className="gap-2">
                      <Icon className="h-4 w-4" />
                      {device.charAt(0).toUpperCase() + device.slice(1)}
                    </TabsTrigger>
                  );
                })}
              </TabsList>

              {(['desktop', 'tablet', 'mobile'] as DeviceType[]).map((device) => (
                <TabsContent key={device} value={device} className="space-y-4">
                  {/* Upload Section */}
                  <div className="space-y-2">
                    <Label htmlFor={`cover-upload-${device}`}>Upload {device.charAt(0).toUpperCase() + device.slice(1)} Cover Photo</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id={`cover-upload-${device}`}
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, device)}
                        disabled={uploading}
                        className="flex-1"
                      />
                      <Button disabled={uploading}>
                        <Upload className="h-4 w-4 mr-2" />
                        {uploading ? "Uploading..." : "Upload"}
                      </Button>
                    </div>
                  </div>

                  {/* Preview Section */}
                  {coverPhotos[device].url && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Preview - How it will look on {device}</Label>
                        <div 
                          className="relative mx-auto rounded-lg overflow-hidden border-2 border-border shadow-lg"
                          style={{
                            maxWidth: getDevicePreviewSize(device).width,
                            height: getDevicePreviewSize(device).height,
                          }}
                        >
                          {/* Cover Photo with adjustments */}
                          <div className="absolute inset-0 overflow-hidden bg-gradient-to-br from-white via-gray-50 to-blue-50">
                            <img
                              ref={(el) => imageRefs.current[device] = el}
                              src={coverPhotos[device].url}
                              alt={`${device} cover preview`}
                              className="w-full h-full object-cover transition-transform duration-200"
                              style={{
                                transform: `scale(${coverPhotos[device].scale}) translate(${coverPhotos[device].position.x}%, ${coverPhotos[device].position.y}%)`,
                                transformOrigin: 'center center',
                              }}
                            />
                          </div>
                          
                          {/* Logo area overlay */}
                          <div className="absolute left-0 top-0 bottom-0 bg-white" 
                               style={{ width: device === 'mobile' ? '180px' : device === 'tablet' ? '280px' : '380px' }}>
                            <div className="flex items-center justify-center h-full px-4">
                              <span className="text-xs text-muted-foreground">Logo Area</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Adjustment Controls */}
                      {adjusting === device ? (
                        <Card className="border-primary">
                          <CardHeader>
                            <CardTitle className="text-base">Adjust Image Position & Scale</CardTitle>
                            <CardDescription>Fine-tune how the image appears</CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div className="space-y-2">
                              <Label>Horizontal Position: {coverPhotos[device].position.x}%</Label>
                              <Slider
                                value={[coverPhotos[device].position.x]}
                                onValueChange={([value]) => handleAdjustmentChange(device, 'x', value)}
                                min={-50}
                                max={50}
                                step={1}
                                className="w-full"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Vertical Position: {coverPhotos[device].position.y}%</Label>
                              <Slider
                                value={[coverPhotos[device].position.y]}
                                onValueChange={([value]) => handleAdjustmentChange(device, 'y', value)}
                                min={-50}
                                max={50}
                                step={1}
                                className="w-full"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Scale: {coverPhotos[device].scale.toFixed(2)}x</Label>
                              <Slider
                                value={[coverPhotos[device].scale]}
                                onValueChange={([value]) => handleAdjustmentChange(device, 'scale', value)}
                                min={0.5}
                                max={3}
                                step={0.1}
                                className="w-full"
                              />
                            </div>
                            <div className="flex gap-2">
                              <Button onClick={() => saveAdjustments(device)} className="flex-1">
                                Save Adjustments
                              </Button>
                              <Button variant="outline" onClick={() => setAdjusting(null)} className="flex-1">
                                Cancel
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ) : (
                        <Button 
                          variant="outline" 
                          onClick={() => setAdjusting(device)}
                          className="w-full"
                        >
                          Adjust Position & Scale
                        </Button>
                      )}
                    </div>
                  )}
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SiteSettings;
