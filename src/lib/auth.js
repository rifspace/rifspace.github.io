
// Simple mock authentication using localStorage

const STORAGE_KEY = 'rifspace_admin_auth';

export const login = (username, password) => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return { success: false, message: 'No admin account found. Please sign up.' };

    const credentials = JSON.parse(stored);
    if (username === credentials.username && password === credentials.password) {
        localStorage.setItem('rifspace_admin_session', 'true');
        return { success: true };
    }

    return { success: false, message: 'Invalid credentials.' };
};

export const signup = (username, password) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ username, password }));
    localStorage.setItem('rifspace_admin_session', 'true');
    return { success: true };
};

export const logout = () => {
    localStorage.removeItem('rifspace_admin_session');
};

export const isAuthenticated = () => {
    return localStorage.getItem('rifspace_admin_session') === 'true';
};

export const getAdminUser = () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored).username : null;
};
