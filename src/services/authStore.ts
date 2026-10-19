export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'muzaki';
  phone?: string;
  avatar?: string;
  level?: string;
}

const STORAGE_KEY = 'zifora_auth_user_v1';

export const DEMO_USERS: Record<'admin' | 'muzaki', UserProfile> = {
  muzaki: {
    id: 'usr-muzaki-1',
    name: 'Rahmat Hidayat, S.T.',
    email: 'rahmat.h@gmail.com',
    role: 'muzaki',
    phone: '081298765432',
    level: 'Muzaki Platinum',
  },
  admin: {
    id: 'usr-admin-1',
    name: 'Super Admin ZIFORA',
    email: 'admin@zifora.org',
    role: 'admin',
    phone: '081299009436',
    level: 'Pengelola Pusat ZISWAF',
  },
};

export function getCurrentUser(): UserProfile {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEMO_USERS.muzaki));
    return DEMO_USERS.muzaki;
  }
  try {
    return JSON.parse(stored);
  } catch {
    return DEMO_USERS.muzaki;
  }
}

export function setCurrentUser(user: UserProfile): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  window.dispatchEvent(new Event('zifora_auth_change'));
}

export function switchRole(role: 'admin' | 'muzaki'): UserProfile {
  const user = DEMO_USERS[role];
  setCurrentUser(user);
  return user;
}
