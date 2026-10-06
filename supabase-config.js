const SUPABASE_URL = 'https://mgtdeclkffmstobjzger.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_DB-QDNr14KUiPuGTV4vxnw_TQulRShY';

const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY
);
console.log('Supabase conectado:', !!supabaseClient);