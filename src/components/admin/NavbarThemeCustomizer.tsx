import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Palette, Type, Move, Monitor, Tablet, Smartphone } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface NavbarTheme {
  primaryColor: string;
  whatsappBgColor: string;
  signInBgColor: string;
  adminBgColor: string;
  cartIconColor: string;
  fontFamily: string;
  buttonPadding: number;
  buttonGap: number;
  logoHeight: {
    desktop: number;
    tablet: number;
    mobile: number;
  };
}

const defaultTheme: NavbarTheme = {
  primaryColor: "#bf0d0d",
  whatsappBgColor: "#16a34a",
  signInBgColor: "#2563eb",
  adminBgColor: "#2563eb",
  cartIconColor: "#000000",
  fontFamily: "system-ui",
  buttonPadding: 10,
  buttonGap: 8,
  logoHeight: {
    desktop: 128,
    tablet: 112,
    mobile: 80,
  },
};

type DeviceType = 'desktop' | 'tablet' | 'mobile';

export const NavbarThemeCustomizer = () => {
  const [theme, setTheme] = useState<NavbarTheme>(defaultTheme);
  const [saving, setSaving] = useState(false);
  const [previewDevice, setPreviewDevice] = useState<DeviceType>('desktop');

  useEffect(() => {
    fetchTheme();
  }, []);

  const fetchTheme = async () => {
    try {
      const { data } = await supabase
        .from("site_settings")
        .select("setting_value")
        .eq("setting_key", "navbar_theme")
        .maybeSingle();

      if (data?.setting_value) {
        setTheme({ ...defaultTheme, ...(data.setting_value as any) });
      }
    } catch (error) {
      console.error("Error fetching theme:", error);
    }
  };

  const saveTheme = async () => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from("site_settings")
        .upsert(
          [
            {
              setting_key: "navbar_theme",
              setting_value: theme as any,
              updated_by: (await supabase.auth.getUser()).data.user?.id,
            },
          ],
          { onConflict: "setting_key" }
        );

      if (error) throw error;

      toast.success("Navbar theme saved successfully");
      
      // Reload the page to apply theme changes
      setTimeout(() => window.location.reload(), 1000);
    } catch (error) {
      console.error("Error saving theme:", error);
      toast.error("Failed to save theme");
    } finally {
      setSaving(false);
    }
  };

  const resetTheme = () => {
    setTheme(defaultTheme);
    toast.info("Theme reset to defaults. Click Save to apply.");
  };

  const getDeviceIcon = (device: DeviceType) => {
    switch (device) {
      case 'desktop': return Monitor;
      case 'tablet': return Tablet;
      case 'mobile': return Smartphone;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="h-5 w-5" />
          Navbar Theme Customizer
        </CardTitle>
        <CardDescription>
          Customize button colors, fonts, and spacing for your navbar
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs defaultValue="colors" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="colors">
              <Palette className="h-4 w-4 mr-2" />
              Colors
            </TabsTrigger>
            <TabsTrigger value="typography">
              <Type className="h-4 w-4 mr-2" />
              Typography
            </TabsTrigger>
            <TabsTrigger value="spacing">
              <Move className="h-4 w-4 mr-2" />
              Spacing
            </TabsTrigger>
          </TabsList>

          <TabsContent value="colors" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="primaryColor">Primary Navigation Color</Label>
                <div className="flex gap-2">
                  <Input
                    id="primaryColor"
                    type="color"
                    value={theme.primaryColor}
                    onChange={(e) => setTheme({ ...theme, primaryColor: e.target.value })}
                    className="h-10 w-20"
                  />
                  <Input
                    type="text"
                    value={theme.primaryColor}
                    onChange={(e) => setTheme({ ...theme, primaryColor: e.target.value })}
                    className="flex-1"
                    placeholder="#bf0d0d"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="whatsappBgColor">WhatsApp Button Color</Label>
                <div className="flex gap-2">
                  <Input
                    id="whatsappBgColor"
                    type="color"
                    value={theme.whatsappBgColor}
                    onChange={(e) => setTheme({ ...theme, whatsappBgColor: e.target.value })}
                    className="h-10 w-20"
                  />
                  <Input
                    type="text"
                    value={theme.whatsappBgColor}
                    onChange={(e) => setTheme({ ...theme, whatsappBgColor: e.target.value })}
                    className="flex-1"
                    placeholder="#16a34a"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="signInBgColor">Sign In Button Color</Label>
                <div className="flex gap-2">
                  <Input
                    id="signInBgColor"
                    type="color"
                    value={theme.signInBgColor}
                    onChange={(e) => setTheme({ ...theme, signInBgColor: e.target.value })}
                    className="h-10 w-20"
                  />
                  <Input
                    type="text"
                    value={theme.signInBgColor}
                    onChange={(e) => setTheme({ ...theme, signInBgColor: e.target.value })}
                    className="flex-1"
                    placeholder="#2563eb"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="adminBgColor">Admin Button Color</Label>
                <div className="flex gap-2">
                  <Input
                    id="adminBgColor"
                    type="color"
                    value={theme.adminBgColor}
                    onChange={(e) => setTheme({ ...theme, adminBgColor: e.target.value })}
                    className="h-10 w-20"
                  />
                  <Input
                    type="text"
                    value={theme.adminBgColor}
                    onChange={(e) => setTheme({ ...theme, adminBgColor: e.target.value })}
                    className="flex-1"
                    placeholder="#2563eb"
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="typography" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="fontFamily">Font Family</Label>
              <Select
                value={theme.fontFamily}
                onValueChange={(value) => setTheme({ ...theme, fontFamily: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="system-ui">System Default</SelectItem>
                  <SelectItem value="'Inter', sans-serif">Inter</SelectItem>
                  <SelectItem value="'Roboto', sans-serif">Roboto</SelectItem>
                  <SelectItem value="'Open Sans', sans-serif">Open Sans</SelectItem>
                  <SelectItem value="'Poppins', sans-serif">Poppins</SelectItem>
                  <SelectItem value="'Montserrat', sans-serif">Montserrat</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Logo Height - Desktop: {theme.logoHeight.desktop}px</Label>
                <Slider
                  value={[theme.logoHeight.desktop]}
                  onValueChange={([value]) =>
                    setTheme({ ...theme, logoHeight: { ...theme.logoHeight, desktop: value } })
                  }
                  min={80}
                  max={200}
                  step={4}
                />
              </div>

              <div className="space-y-2">
                <Label>Logo Height - Tablet: {theme.logoHeight.tablet}px</Label>
                <Slider
                  value={[theme.logoHeight.tablet]}
                  onValueChange={([value]) =>
                    setTheme({ ...theme, logoHeight: { ...theme.logoHeight, tablet: value } })
                  }
                  min={80}
                  max={180}
                  step={4}
                />
              </div>

              <div className="space-y-2">
                <Label>Logo Height - Mobile: {theme.logoHeight.mobile}px</Label>
                <Slider
                  value={[theme.logoHeight.mobile]}
                  onValueChange={([value]) =>
                    setTheme({ ...theme, logoHeight: { ...theme.logoHeight, mobile: value } })
                  }
                  min={60}
                  max={120}
                  step={4}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="spacing" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label>Button Padding: {theme.buttonPadding}px</Label>
              <Slider
                value={[theme.buttonPadding]}
                onValueChange={([value]) => setTheme({ ...theme, buttonPadding: value })}
                min={4}
                max={20}
                step={1}
              />
            </div>

            <div className="space-y-2">
              <Label>Button Gap: {theme.buttonGap}px</Label>
              <Slider
                value={[theme.buttonGap]}
                onValueChange={([value]) => setTheme({ ...theme, buttonGap: value })}
                min={2}
                max={24}
                step={1}
              />
            </div>
          </TabsContent>
        </Tabs>

        {/* Live Preview */}
        <Card className="bg-muted/30">
          <CardHeader>
            <CardTitle className="text-base">Live Preview</CardTitle>
            <CardDescription>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs">View as:</span>
                {(['desktop', 'tablet', 'mobile'] as DeviceType[]).map((device) => {
                  const Icon = getDeviceIcon(device);
                  return (
                    <Button
                      key={device}
                      variant={previewDevice === device ? "default" : "outline"}
                      size="sm"
                      onClick={() => setPreviewDevice(device)}
                      className="gap-1"
                    >
                      <Icon className="h-3 w-3" />
                      <span className="capitalize text-xs">{device}</span>
                    </Button>
                  );
                })}
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div 
              className="relative rounded-lg overflow-hidden border-2 border-border"
              style={{
                maxWidth: previewDevice === 'mobile' ? '375px' : previewDevice === 'tablet' ? '768px' : '100%',
                margin: '0 auto',
              }}
            >
              {/* Top bar preview */}
              <div 
                className="p-4 bg-white flex items-center justify-between"
                style={{ fontFamily: theme.fontFamily }}
              >
                <div 
                  className="bg-white rounded-lg px-3 py-2 shadow-sm flex items-center"
                  style={{ height: `${theme.logoHeight[previewDevice]}px` }}
                >
                  <div className="text-xs font-bold">LOGO</div>
                </div>
                
                <div className="flex items-center" style={{ gap: `${theme.buttonGap}px` }}>
                  <button
                    style={{
                      backgroundColor: theme.whatsappBgColor,
                      padding: `${theme.buttonPadding}px`,
                      borderRadius: '8px',
                      color: 'white',
                      fontSize: '12px',
                      fontWeight: '600',
                    }}
                  >
                    WhatsApp
                  </button>
                  <button
                    style={{
                      backgroundColor: theme.signInBgColor,
                      padding: `${theme.buttonPadding}px`,
                      borderRadius: '8px',
                      color: 'white',
                      fontSize: '12px',
                      fontWeight: '600',
                    }}
                  >
                    Sign In
                  </button>
                  <div style={{ padding: `${theme.buttonPadding}px` }}>🛒</div>
                </div>
              </div>
              
              {/* Navigation bar preview */}
              <div 
                className="p-4 text-white flex items-center gap-1"
                style={{ backgroundColor: theme.primaryColor, fontFamily: theme.fontFamily }}
              >
                <div className="text-xs font-medium px-3 py-2">Home</div>
                <div className="text-xs font-medium px-3 py-2">About</div>
                <div className="text-xs font-medium px-3 py-2">Products</div>
                <div className="text-xs font-medium px-3 py-2">Services</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button onClick={saveTheme} disabled={saving} className="flex-1">
            {saving ? "Saving..." : "Save Theme"}
          </Button>
          <Button onClick={resetTheme} variant="outline">
            Reset to Default
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
