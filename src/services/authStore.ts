export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'muzaki';
  phone?: string;
  avatar?: string;
  level?: string;
}

export interface UserCredential {
  email: string;
  password: string;
  profile: UserProfile;
}

const STORAGE_KEY = 'zifora_auth_user_v1';

// 1 Akun Admin dan 1 Akun Pengguna (Framework Tanpa Supabase/Cloud)
export const REGISTERED_ACCOUNTS: UserCredential[] = [
  {
    email: 'admin@zifora.org',
    password: 'admin123',
    profile: {
      id: 'usr-admin-1',
      name: 'Super Admin ZIFORA',
      email: 'admin@zifora.org',
      role: 'admin',
      phone: '081299009436',
      level: 'Pengelola Pusat ZISWAF',
    },
  },
  {
    email: 'user@zifora.org',
    password: 'user123',
    profile: {
      id: 'usr-user-1',
      name: 'Rahmat Hidayat (Donatur)',
      email: 'user@zifora.org',
      role: 'muzaki',
      phone: '081298765432',
      level: 'Muzaki Platinum',
    },
  },
];

export function getCurrentUser(): UserProfile | null {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    // Default to Muzaki for initial preview or null
    return REGISTERED_ACCOUNTS[1].profile;
  }
  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
}

export function setCurrentUser(user: UserProfile | null): void {
  if (user) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(STORAGE_KEY);
  }
  window.dispatchEvent(new Event('zifora_auth_change'));
}

export function login(email: string, password: string): { success: boolean; user?: UserProfile; error?: string } {
  const cleanEmail = email.trim().toLowerCase();
  const found = REGISTERED_ACCOUNTS.find(
    (acc) => acc.email.toLowerCase() === cleanEmail && acc.password === password
  );

  if (found) {
    setCurrentUser(found.profile);
    return { success: true, user: found.profile };
  }

  return {
    success: false,
    error: 'Email atau password salah! Gunakan akun demo di bawah.',
  };
}

export function logout(): void {
  setCurrentUser(null);
}

export function switchRole(role: 'admin' | 'muzaki'): UserProfile {
  const target = REGISTERED_ACCOUNTS.find((acc) => acc.profile.role === role);
  if (target) {
    setCurrentUser(target.profile);
    return target.profile;
  }
  return REGISTERED_ACCOUNTS[0].profile;
}
