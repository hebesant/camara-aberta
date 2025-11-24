import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://loahjrgofgbeiyvfhmfh.supabase.co"
const supabaseAnonKey = "sb_publishable_h8Ti0DuistPeHTAxSEy9CQ_BGvH3NCm"

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("As variáveis de ambiente do Supabase não foram definidas.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
