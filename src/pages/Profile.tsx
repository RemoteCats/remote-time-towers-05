
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const profileSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters").optional(),
  bio: z.string().max(160, "Bio must be less than 160 characters").optional(),
  avatar_url: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: "",
      bio: "",
      avatar_url: "",
    },
  });
  
  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }
    
    const getProfile = async () => {
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();
        
        if (error) {
          console.error("Error fetching profile:", error);
          return;
        }
        
        setProfile(data);
        
        // Update form values
        form.reset({
          username: data?.username || "",
          bio: data?.bio || "",
          avatar_url: data?.avatar_url || "",
        });
      } catch (error) {
        console.error("Profile fetch error:", error);
      }
    };
    
    getProfile();
  }, [user, navigate, form]);
  
  const onSubmit = async (values: ProfileFormValues) => {
    if (!user) return;
    
    setLoading(true);
    
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          username: values.username,
          bio: values.bio,
          avatar_url: values.avatar_url,
          updated_at: new Date(),
        })
        .eq("id", user.id);
      
      if (error) {
        toast({
          title: "Update failed",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Profile updated",
          description: "Your profile has been updated successfully",
        });
      }
    } catch (error) {
      console.error("Profile update error:", error);
      toast({
        title: "Something went wrong",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  if (!user) {
    return null;
  }
  
  return (
    <div className="container py-8">
      <div className="max-w-2xl mx-auto">
        <Card className="border-[#999266]/20 bg-black/80">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-[#999266]">Your Profile</CardTitle>
            <CardDescription className="text-[#999266]/80">
              Update your profile information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center mb-6">
              <Avatar className="h-20 w-20 mr-4 border-2 border-[#999266]/30">
                <AvatarImage src={profile?.avatar_url || user.user_metadata.avatar_url} />
                <AvatarFallback className="bg-[#999266]/10 text-[#999266]">
                  {user.email?.charAt(0).toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-lg font-medium text-[#999266]">
                  {profile?.username || user.email?.split('@')[0] || "User"}
                </h3>
                <p className="text-sm text-[#999266]/70">{user.email}</p>
              </div>
            </div>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#999266]">Username</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Your username" 
                          {...field} 
                          className="border-[#999266]/20 bg-black/50 text-[#999266]"
                        />
                      </FormControl>
                      <FormDescription className="text-[#999266]/70">
                        This is your public display name
                      </FormDescription>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="avatar_url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#999266]">Avatar URL</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="https://example.com/your-avatar.jpg" 
                          {...field} 
                          className="border-[#999266]/20 bg-black/50 text-[#999266]"
                        />
                      </FormControl>
                      <FormDescription className="text-[#999266]/70">
                        URL to your profile picture
                      </FormDescription>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#999266]">Bio</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Tell us about yourself" 
                          {...field} 
                          className="border-[#999266]/20 bg-black/50 text-[#999266] min-h-[100px]"
                        />
                      </FormControl>
                      <FormDescription className="text-[#999266]/70">
                        Brief description about yourself
                      </FormDescription>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-transparent border-[#999266] text-[#999266] hover:bg-[#999266] hover:text-black"
                >
                  {loading ? "Saving..." : "Save Profile"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
