const SUPABASE_URL = 'https://gzbapigubbswkhmpkmou.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd6YmFwaWd1YmJzd2tobXBrbW91Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDc4Nzk0NTMsImV4cCI6MTk2MzQ1NTQ1M30.4fqkZViMQGidqxI8xltReNok9umY5rBiZ0lrBWSVBks';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

export function getUser() {
    return client.auth.session() && client.auth.session().user;
}

export function checkAuth() {
    const user = getUser();

    if (!user) location.replace('../');
}

export function redirectIfLoggedIn() {
    if (getUser()) {
        location.replace('./other-page');
    }
}

export async function signupUser(email, password) {
    const response = await client.auth.signUp({ email, password });

    return response.user;
}

export async function signInUser(email, password) {
    const response = await client.auth.signIn({ email, password });

    return response.user;
}

export async function logout() {
    await client.auth.signOut();

    return (window.location.href = '../');
}

export async function getWorkshops(){
    //const response = [{ id: '1', name: 'Mess Hall', participants: [{ id: '1', name: 'Jason', emoji: '1' }] },
        //{ id: '2', name: 'R&R', participants: [{ id: '1', name: 'Jane', emoji: '2' }, { id: '1', name: 'Jackson', emoji: '1' }] }];
    
    const response = await client
        .from('workshop')
        .select('*, participants (*)');
    
    console.log(response.body);

    return response.body; //add . body
}

export async function createParticipant(name, emoji, workID){
    await client
        .from('participants')
        .insert({ name: name, emoji: emoji, workshop_id: workID });
}

export async function deleteParticipant(id){
    await client
        .from('participants')
        .delete()
        .match({ id });
}
// function checkError({ data, error }) {
//     return error ? console.error(error) : data;
// }
