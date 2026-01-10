import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Database } from './types/database.types';

export class supabaseDB {
    supabaseUrl: string;ß
    supabaseKey: string;
    supabaseClient: SupabaseClient;

    constructor(supabaseUrl:string, supabaseKey:string) {
        this.supabaseKey = supabaseKey;
        this.supabaseUrl = supabaseUrl

        this.supabaseClient = createClient<Database>(this.supabaseUrl, this.supabaseKey);
    }

    async grabAllHabitData() {
        try {
            const data = await this.supabaseClient
                .from('Habit Data')
                .select()
            return data
        } catch (e) {
            throw e
        }
    }
    async grabHabitDataById(id) {
        try {
            const data = await this.supabaseClient
                .from('Habit Data')
                .select('dates')
                .eq('id', id)
            return data
        } catch (e) {
            throw e
        }
    }

}