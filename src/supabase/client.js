import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://mkzsygoszpytisrpuqna.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1renN5Z29zenB5dGlzcnB1cW5hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQzODc5MzgsImV4cCI6MjAxOTk2MzkzOH0.STwuoLExd8Gy5X6sJQQ2rK2sbtZ-vhyFS36I9-1aMq0";
export const supabase = createClient(supabaseUrl, supabaseKey);
