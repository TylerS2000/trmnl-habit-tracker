import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Database } from './types/database.types';

export class supabaseDB {
    supabaseUrl: string;
    supabaseKey: string;
    supabaseClient: SupabaseClient;

    constructor(supabaseUrl: string, supabaseKey: string) {
        this.supabaseKey = supabaseKey;
        this.supabaseUrl = supabaseUrl

        this.supabaseClient = createClient<Database>(this.supabaseUrl, this.supabaseKey);
    }

    async fetchProfileAndAllData(user_id) {
        return await this.supabaseClient.from("Habits")
            .select(`
                    id,
                    name,
                    "Habit Dates" (
                    completed_at
                    )
                `)
            .eq('user_id', user_id)
    }
}