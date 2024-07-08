import { createClient } from "@supabase/supabase-js";

export const SUPABASE_URL = "https://aajwzuuqresmowecstsa.supabase.co";
const supabase = createClient(
  SUPABASE_URL,
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFhand6dXVxcmVzbW93ZWNzdHNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTgyNjc3NzcsImV4cCI6MjAzMzg0Mzc3N30.GdyEsz6ClFag8e_WdD_2RR0KdF64o_1YEsmORA4AGc4"
);

export default supabase;
