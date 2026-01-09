import {createClient} from '@supabase/supabase-js';
import { Database } from './database.types';
export default async function initDbConnectionAndGrabData(){
    const supabaseKey = process.env.DATABASE_PASSWORD;
    const supabaseUrl = process.env.DATABASE_URL;
    const supabase = createClient<Database>(supabaseUrl, supabaseKey);

    const { data, error } = await supabase
    .from('Habit Data')
    .select()
    return data || error
}