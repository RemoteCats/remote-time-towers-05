// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://iqvxvjylnzdyldsfxbem.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlxdnh2anlsbnpkeWxkc2Z4YmVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUxNDQwMzcsImV4cCI6MjA2MDcyMDAzN30.S0KyHz7lzAQcMcrgiXWt8dQGSDC9tG4DumAFIaSPHLs";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);