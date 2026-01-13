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

    async uploadNewHabit(user_id: string, habitName: string) {
        const { data, error } = await this.supabaseClient
            .from("Habits")
            .insert([
                {
                    user_id: user_id,
                    name: habitName
                }
            ])
            .select() // Returns the created habit object
            .single(); // Returns as an object instead of an array

        if (error) throw error;
        return data;
    }
}