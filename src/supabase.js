import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://flswzpdhegomcczchnmy.supabase.co";
const supabaseKey = "sb_publishable_ad2gHLLVvL_RppCnc_hhSg_CXmljyl8";

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
);
