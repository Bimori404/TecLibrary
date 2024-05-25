import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://mmscmgwxbisucowgopxz.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1tc2NtZ3d4YmlzdWNvd2dvcHh6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxNjYwMzM2NSwiZXhwIjoyMDMyMTc5MzY1fQ.-IJLucB3JW-9qqqy__OxTi4vXC-UiThZ4yiCjLbP9o8'

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;
