import 'react-native-url-polyfill/auto'

import { createClient } from '@supabase/supabase-js'

import type { Database } from '@/core/database.types'

import 'expo-sqlite/localStorage/install'

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!
const supabasePublishableKey = process.env.EXPO_PUBLIC_SUPABASE_KEY!

export const supabase = createClient<Database>(supabaseUrl, supabasePublishableKey, {
    auth: {
        storage: localStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    },
})