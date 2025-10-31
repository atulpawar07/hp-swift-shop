import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Upload, Image as ImageIcon, Info } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const SiteSettings = () => {
  const { isAdmin } = useAuth();
  const [coverPhoto, setCoverPhoto] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCoverPhoto();
  }, []);

  const fetchCoverPhoto = async () => {
    const { data, error } = await supabase
      .from("site_settings")
      .select("setting_value")
      .eq("setting_key", "cover_photo")
      .maybeSingle();

    if (error) {
      console.error("Error fetching cover photo:", error);
    } else if (data?.setting_value && typeof data.setting_value === 'object') {
      const value = data.setting_value as { url?: string };
      setCoverPhoto(value.url || "");
    }
    setLoading(false);
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
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
      if (coverPhoto) {
        const oldPath = coverPhoto.split("/").pop();
        if (oldPath) {
          await supabase.storage.from("site-assets").remove([`cover-photos/${oldPath}`]);
        }
      }

      // Upload new file
      const fileExt = file.name.split(".").pop();
      const fileName = `cover-${Date.now()}.${fileExt}`;
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
      const { error: dbError } = await supabase
        .from("site_settings")
        .upsert({
          setting_key: "cover_photo",
          setting_value: { url: publicUrl },
          updated_by: (await supabase.auth.getUser()).data.user?.id,
        }, {
          onConflict: "setting_key",
        });

      if (dbError) throw dbError;

      setCoverPhoto(publicUrl);
      toast.success("Cover photo updated successfully");
    } catch (error) {
      console.error("Error uploading cover photo:", error);
      toast.error("Failed to upload cover photo");
    } finally {
      setUploading(false);
    }
  };

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Site Settings</h1>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ImageIcon className="h-5 w-5" />
              Navbar Cover Photo
            </CardTitle>
            <CardDescription>
              Upload a cover photo for the navbar header
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                <strong>Recommended size: 1920x200 pixels</strong>
                <br />
                Maximum file size: 5MB. Supported formats: JPG, PNG, WEBP
                <br />
                The logo area will maintain a white background for visibility.
              </AlertDescription>
            </Alert>

            {coverPhoto && (
              <div className="space-y-2">
                <Label>Current Cover Photo</Label>
                <div className="relative w-full h-40 rounded-lg overflow-hidden border border-border">
                  <img
                    src={coverPhoto}
                    alt="Current cover"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="cover-upload">Upload New Cover Photo</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="cover-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  disabled={uploading}
                  className="flex-1"
                />
                <Button disabled={uploading}>
                  <Upload className="h-4 w-4 mr-2" />
                  {uploading ? "Uploading..." : "Upload"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SiteSettings;
