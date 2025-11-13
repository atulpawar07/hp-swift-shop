import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Navigate, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Upload, Image as ImageIcon, Info, ArrowLeft, Monitor, Tablet, Smartphone, Download } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";

interface CoverPhotoSettings {
  url: string;
  position: { x: number; y: number };
  scale: number;
}

interface LogoSettings {
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
  const [logos, setLogos] = useState<Record<DeviceType, LogoSettings>>({
    desktop: { url: "", position: { x: 0, y: 0 }, scale: 1 },
    tablet: { url: "", position: { x: 0, y: 0 }, scale: 1 },
    mobile: { url: "", position: { x: 0, y: 0 }, scale: 1 },
  });
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeDevice, setActiveDevice] = useState<DeviceType>('desktop');
  const [adjustingType, setAdjustingType] = useState<'cover' | 'logo' | null>(null);
  const [adjustingDevice, setAdjustingDevice] = useState<DeviceType | null>(null);

  useEffect(() => {
    fetchCoverPhotos();
  }, []);

  const fetchCoverPhotos = async () => {
    try {
      const devices: DeviceType[] = ['desktop', 'tablet', 'mobile'];
      const newCoverPhotos = { ...coverPhotos };
      const newLogos = { ...logos };

      for (const device of devices) {
        // Fetch cover photo
        const { data: coverData } = await supabase
          .from("site_settings")
          .select("setting_value")
          .eq("setting_key", `cover_photo_${device}`)
          .maybeSingle();

        if (coverData?.setting_value) {
          const value = coverData.setting_value as any;
          if (value && typeof value === 'object' && 'url' in value) {
            newCoverPhotos[device] = {
              url: value.url || "",
              position: value.position || { x: 0, y: 0 },
              scale: value.scale || 1,
            };
          }
        }

        // Fetch logo
        const { data: logoData } = await supabase
          .from("site_settings")
          .select("setting_value")
          .eq("setting_key", `logo_${device}`)
          .maybeSingle();

        if (logoData?.setting_value) {
          const value = logoData.setting_value as any;
          if (value && typeof value === 'object' && 'url' in value) {
            newLogos[device] = {
              url: value.url || "",
              position: value.position || { x: 0, y: 0 },
              scale: value.scale || 1,
            };
          }
        }
      }

      setCoverPhotos(newCoverPhotos);
      setLogos(newLogos);
    } catch (error) {
      console.error("Error fetching settings:", error);
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

      // Update local state with preview (not saved to DB yet)
      const newSettings: CoverPhotoSettings = {
        url: publicUrl,
        position: { x: 0, y: 0 },
        scale: 1,
      };

      setCoverPhotos(prev => ({
        ...prev,
        [device]: newSettings,
      }));
      
      // Automatically open adjustment controls
      setAdjustingType('cover');
      setAdjustingDevice(device);
      
      toast.success(`Cover photo uploaded. Adjust position and click Save to apply.`);
    } catch (error) {
      console.error("Error uploading cover photo:", error);
      toast.error("Failed to upload cover photo");
    } finally {
      setUploading(false);
    }
  };

  const handleFileUploadLogo = async (event: React.ChangeEvent<HTMLInputElement>, device: DeviceType) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size must be less than 5MB");
      return;
    }

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    setUploading(true);

    try {
      if (logos[device].url) {
        const oldPath = logos[device].url.split("/").pop();
        if (oldPath) {
          await supabase.storage.from("site-assets").remove([`logos/${oldPath}`]);
        }
      }

      const fileExt = file.name.split(".").pop();
      const fileName = `logo-${device}-${Date.now()}.${fileExt}`;
      const filePath = `logos/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("site-assets")
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("site-assets")
        .getPublicUrl(filePath);

      // Update local state with preview (not saved to DB yet)
      const newSettings: LogoSettings = {
        url: publicUrl,
        position: { x: 0, y: 0 },
        scale: 1,
      };

      setLogos(prev => ({ ...prev, [device]: newSettings }));
      
      // Automatically open adjustment controls
      setAdjustingType('logo');
      setAdjustingDevice(device);
      
      toast.success(`Logo uploaded. Adjust position and click Save to apply.`);
    } catch (error) {
      console.error("Error uploading logo:", error);
      toast.error("Failed to upload logo");
    } finally {
      setUploading(false);
    }
  };

  const handleAdjustmentChange = async (
    type: 'cover' | 'logo',
    device: DeviceType,
    field: 'x' | 'y' | 'scale',
    value: number
  ) => {
    if (type === 'cover') {
      const updated = { ...coverPhotos[device] };
      if (field === 'scale') {
        updated.scale = value;
      } else {
        updated.position[field] = value;
      }
      setCoverPhotos(prev => ({ ...prev, [device]: updated }));
    } else {
      const updated = { ...logos[device] };
      if (field === 'scale') {
        updated.scale = value;
      } else {
        updated.position[field] = value;
      }
      setLogos(prev => ({ ...prev, [device]: updated }));
    }
  };

  const saveAdjustments = async (type: 'cover' | 'logo', device: DeviceType) => {
    try {
      const settingKey = type === 'cover' ? `cover_photo_${device}` : `logo_${device}`;
      const settingValue = type === 'cover' ? coverPhotos[device] : logos[device];

      const { error } = await supabase
        .from("site_settings")
        .upsert([{
          setting_key: settingKey,
          setting_value: settingValue as any,
          updated_by: (await supabase.auth.getUser()).data.user?.id,
        }], { onConflict: "setting_key" });

      if (error) throw error;

      toast.success("Adjustments saved successfully");
      setAdjustingType(null);
      setAdjustingDevice(null);
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
      case 'desktop': return { width: '100%', height: '160px' };
      case 'tablet': return { width: '768px', height: '140px' };
      case 'mobile': return { width: '375px', height: '120px' };
    }
  };

  const downloadCoverPhoto = async (device: DeviceType) => {
    const url = coverPhotos[device].url;
    if (!url) return;

    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `cover-photo-${device}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
      toast.success('Cover photo downloaded');
    } catch (error) {
      console.error('Error downloading cover photo:', error);
      toast.error('Failed to download cover photo');
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
            <Alert className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
              <Info className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <AlertDescription className="text-sm space-y-2">
                <div>
                  <strong className="text-base block mb-2">📐 Recommended Image Sizes:</strong>
                  <ul className="space-y-1.5 ml-4">
                    <li><strong>Desktop:</strong> 1920 × 180 pixels (width × height)</li>
                    <li><strong>Tablet:</strong> 1024 × 170 pixels (width × height)</li>
                    <li><strong>Mobile:</strong> 768 × 160 pixels (width × height)</li>
                  </ul>
                </div>
                <div className="pt-2 border-t border-blue-200 dark:border-blue-800">
                  <p><strong>Guidelines:</strong></p>
                  <ul className="ml-4 mt-1 space-y-1">
                    <li>• Maximum file size: 5MB</li>
                    <li>• Supported formats: JPG, PNG, WEBP</li>
                    <li>• Use landscape images for best results</li>
                    <li>• After upload, use sliders to adjust position & scale</li>
                    <li>• Logo area keeps white background for visibility</li>
                  </ul>
                </div>
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
                <TabsContent key={device} value={device} className="space-y-6">
                  {/* Cover Photo Upload */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Cover Photo</CardTitle>
                      <CardDescription>Background image for the navbar</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Input
                            id={`cover-upload-${device}`}
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileUpload(e, device)}
                            disabled={uploading}
                            className="flex-1"
                          />
                          <Button disabled={uploading} size="sm">
                            <Upload className="h-4 w-4 mr-2" />
                            Upload
                          </Button>
                          {coverPhotos[device].url && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => downloadCoverPhoto(device)}
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                      
                      {coverPhotos[device].url && adjustingType === 'cover' && adjustingDevice === device && (
                        <div className="space-y-3 pt-2 border-t">
                          <Label className="text-sm font-semibold">Adjust Cover Photo</Label>
                          <div className="space-y-2">
                            <Label className="text-xs">Horizontal: {coverPhotos[device].position.x}%</Label>
                            <Slider
                              value={[coverPhotos[device].position.x]}
                              onValueChange={([value]) => handleAdjustmentChange('cover', device, 'x', value)}
                              min={-50}
                              max={50}
                              step={1}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-xs">Vertical: {coverPhotos[device].position.y}%</Label>
                            <Slider
                              value={[coverPhotos[device].position.y]}
                              onValueChange={([value]) => handleAdjustmentChange('cover', device, 'y', value)}
                              min={-50}
                              max={50}
                              step={1}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-xs">Scale: {coverPhotos[device].scale.toFixed(2)}x</Label>
                            <Slider
                              value={[coverPhotos[device].scale]}
                              onValueChange={([value]) => handleAdjustmentChange('cover', device, 'scale', value)}
                              min={0.5}
                              max={3}
                              step={0.1}
                            />
                          </div>
                          <div className="flex gap-2">
                            <Button onClick={() => saveAdjustments('cover', device)} size="sm" className="flex-1">Save</Button>
                            <Button variant="outline" onClick={() => { setAdjustingType(null); setAdjustingDevice(null); }} size="sm" className="flex-1">Cancel</Button>
                          </div>
                        </div>
                      )}
                      
                      {coverPhotos[device].url && !(adjustingType === 'cover' && adjustingDevice === device) && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => { setAdjustingType('cover'); setAdjustingDevice(device); }}
                          className="w-full"
                        >
                          Adjust Cover Photo
                        </Button>
                      )}
                    </CardContent>
                  </Card>

                  {/* Logo Upload */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Logo</CardTitle>
                      <CardDescription>Logo image that appears over the cover</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Input
                            id={`logo-upload-${device}`}
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileUploadLogo(e, device)}
                            disabled={uploading}
                            className="flex-1"
                          />
                          <Button disabled={uploading} size="sm">
                            <Upload className="h-4 w-4 mr-2" />
                            Upload
                          </Button>
                        </div>
                      </div>
                      
                      {logos[device].url && adjustingType === 'logo' && adjustingDevice === device && (
                        <div className="space-y-3 pt-2 border-t">
                          <Label className="text-sm font-semibold">Adjust Logo</Label>
                          <div className="space-y-2">
                            <Label className="text-xs">Horizontal: {logos[device].position.x}%</Label>
                            <Slider
                              value={[logos[device].position.x]}
                              onValueChange={([value]) => handleAdjustmentChange('logo', device, 'x', value)}
                              min={-50}
                              max={50}
                              step={1}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-xs">Vertical: {logos[device].position.y}%</Label>
                            <Slider
                              value={[logos[device].position.y]}
                              onValueChange={([value]) => handleAdjustmentChange('logo', device, 'y', value)}
                              min={-50}
                              max={50}
                              step={1}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-xs">Scale: {logos[device].scale.toFixed(2)}x</Label>
                            <Slider
                              value={[logos[device].scale]}
                              onValueChange={([value]) => handleAdjustmentChange('logo', device, 'scale', value)}
                              min={0.5}
                              max={3}
                              step={0.1}
                            />
                          </div>
                          <div className="flex gap-2">
                            <Button onClick={() => saveAdjustments('logo', device)} size="sm" className="flex-1">Save</Button>
                            <Button variant="outline" onClick={() => { setAdjustingType(null); setAdjustingDevice(null); }} size="sm" className="flex-1">Cancel</Button>
                          </div>
                        </div>
                      )}
                      
                      {logos[device].url && !(adjustingType === 'logo' && adjustingDevice === device) && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => { setAdjustingType('logo'); setAdjustingDevice(device); }}
                          className="w-full"
                        >
                          Adjust Logo
                        </Button>
                      )}
                    </CardContent>
                  </Card>

                  {/* Preview Section */}
                  {(coverPhotos[device].url || logos[device].url) && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Live Preview</CardTitle>
                        <CardDescription>How the navbar will look on {device}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div 
                          className="relative mx-auto rounded-lg overflow-hidden border-2 border-border shadow-lg bg-white"
                          style={{
                            maxWidth: getDevicePreviewSize(device).width,
                            height: getDevicePreviewSize(device).height,
                          }}
                        >
                          {/* Cover Photo with gradient overlay to match actual navbar */}
                          <div className="absolute inset-0 overflow-hidden">
                            {coverPhotos[device].url ? (
                              <>
                                <img
                                  src={coverPhotos[device].url}
                                  alt={`${device} cover preview`}
                                  className="w-full h-full object-cover transition-transform duration-200"
                                  style={{
                                    transform: `scale(${coverPhotos[device].scale}) translate(${coverPhotos[device].position.x}%, ${coverPhotos[device].position.y}%)`,
                                    transformOrigin: 'center center',
                                  }}
                                />
                                {/* Gradient overlay to match actual navbar */}
                                <div className="absolute inset-0 bg-gradient-to-r from-black/5 to-transparent"></div>
                              </>
                            ) : (
                              <>
                                <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-blue-50"></div>
                                <div className="absolute inset-0 opacity-[0.03]">
                                  <div className="absolute inset-0" style={{
                                    backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(0,0,0,.05) 35px, rgba(0,0,0,.05) 70px)`
                                  }}></div>
                                </div>
                              </>
                            )}
                          </div>
                          
                          {/* Logo layer with white background - matches actual navbar */}
                          <div className="absolute left-4 top-1/2 -translate-y-1/2 bg-white rounded-lg px-3 py-2 shadow-sm z-10 flex items-center justify-center" 
                               style={{ 
                                 width: device === 'mobile' ? '160px' : device === 'tablet' ? '220px' : '280px',
                                 height: device === 'mobile' ? '80px' : device === 'tablet' ? '112px' : '128px'
                               }}>
                            {logos[device].url ? (
                              <img
                                src={logos[device].url}
                                alt={`${device} logo preview`}
                                className="max-w-full max-h-full object-contain transition-transform duration-200"
                                style={{
                                  transform: `scale(${logos[device].scale}) translate(${logos[device].position.x}%, ${logos[device].position.y}%)`,
                                  transformOrigin: 'center center',
                                }}
                              />
                            ) : (
                              <div className="flex items-center justify-center w-full h-full">
                                <span className="text-xs text-muted-foreground">No logo</span>
                              </div>
                            )}
                          </div>

                          {/* Right side elements placeholder - to show full navbar context */}
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 z-10">
                            <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                              <div className="w-4 h-4 text-green-600">📱</div>
                            </div>
                            <div className="hidden md:flex gap-2">
                              <div className="w-16 h-8 bg-gray-200 rounded"></div>
                              <div className="w-16 h-8 bg-gray-200 rounded"></div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
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
