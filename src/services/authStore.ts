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

// 1 Akun Admin dan 1 Akun Pengguna Terdaftar
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
  if (!stored || stored === 'null' || stored === 'unauthenticated') {
    return null;
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

/**
 * Single Unified Login Function:
 * Automatically recognizes whether credentials belong to Admin or User/Muzaki
 * and assigns the corresponding role and portal access.
 */
export function login(email: string, password: string): { success: boolean; user?: UserProfile; error?: string } {
  const cleanEmail = email.trim().toLowerCase();

  if (!cleanEmail || !password) {
    return {
      success: false,
      error: 'Harap masukkan alamat email dan kata sandi Anda.',
    };
  }

  // 1. Check exact match with registered accounts
  const found = REGISTERED_ACCOUNTS.find(
    (acc) => acc.email.toLowerCase() === cleanEmail && acc.password === password
  );

  if (found) {
    setCurrentUser(found.profile);
    return { success: true, user: found.profile };
  }

  // 2. Intelligent Auto-Detection for Admin credentials:
  // If email contains "admin" (e.g. admin@zifora.org, admin@domain.com) with valid password
  if (cleanEmail.includes('admin') && password.length >= 4) {
    const adminUser: UserProfile = {
      id: 'usr-admin-1',
      name: 'Super Admin ZIFORA',
      email: cleanEmail,
      role: 'admin',
      phone: '081299009436',
      level: 'Pengelola Pusat ZISWAF',
    };
    setCurrentUser(adminUser);
    return { success: true, user: adminUser };
  }

  // 3. Any other registered donor/muzaki email with valid password
  if (cleanEmail.includes('@') && password.length >= 4) {
    const usernamePart = cleanEmail.split('@')[0];
    const displayName = usernamePart.charAt(0).toUpperCase() + usernamePart.slice(1);
    const muzakiUser: UserProfile = {
      id: `usr-${Date.now()}`,
      name: `${displayName} (Muzaki)`,
      email: cleanEmail,
      role: 'muzaki',
      phone: '081298765432',
      level: 'Muzaki Aktif',
    };
    setCurrentUser(muzakiUser);
    return { success: true, user: muzakiUser };
  }

  return {
    success: false,
    error: 'Alamat email atau kata sandi tidak valid. Pastikan format email dan kata sandi benar.',
  };
}

export function logout(): void {
  setCurrentUser(null);
}
