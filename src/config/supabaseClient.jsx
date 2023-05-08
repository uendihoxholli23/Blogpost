import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  " https://dbtsblqhxgiirlluwxsr.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRidHNibHFoeGdpaXJsbHV3eHNyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODI2OTM0MzMsImV4cCI6MTk5ODI2OTQzM30.cD5j8AtBsO4ALzwm9WTI_518c_YGoZrtLQSXcPseGWQ"
);

export default supabase;
