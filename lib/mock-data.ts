export type Category =
  | "Plumber"
  | "Electrician"
  | "Accountant"
  | "Lawyer"
  | "Dentist"
  | "Doctor"
  | "Contractor"
  | "IT"
  | "Realtor"
  | "Landscaper"
  | "Cleaner"
  | "Mechanic"
  | "Trainer"
  | "Tutor"
  | "Chef"
  | "Other";

export interface User {
  id: string;
  username: string;
  name: string;
  avatarUrl: string;
  bio: string;
  location: string;
  createdAt: string;
}

export interface Vouch {
  id: string;
  authorId: string;
  recipientName: string;
  recipientBusiness: string;
  category: Category;
  description: string;
  rating: 1 | 2 | 3 | 4 | 5;
  recipientPhone?: string;
  recipientWebsite?: string;
  recipientInstagram?: string;
  isPublic: boolean;
  featuredOrder?: number;
  likeCount: number;
  createdAt: string;
}

export interface VouchRequest {
  id: string;
  requesterId: string;
  targetUserId: string;
  categoryNeeded: Category;
  message: string;
  status: "Pending" | "Answered";
}

export interface Follow {
  followerId: string;
  followingId: string;
}

export const MOCK_USERS: User[] = [
  {
    id: "user-justin",
    username: "justin",
    name: "Justin Notarfrancesco",
    avatarUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    bio: "I keep a living list of people I trust for the real stuff — home fixes, money, and local service.",
    location: "New York, NY",
    createdAt: "2023-02-18",
  },
  {
    id: "user-nick",
    username: "nick",
    name: "Nick Bossetti",
    avatarUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
    bio: "I share practical recommendations from the people who actually show up and do the work well.",
    location: "Columbus, OH",
    createdAt: "2022-11-03",
  },
  {
    id: "user-ben",
    username: "ben",
    name: "Benjamin Johnson",
    avatarUrl:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
    bio: "I keep a trusted directory of specialists for family life, renovations, and everyday wins.",
    location: "Denver, CO",
    createdAt: "2024-01-12",
  },
];

export const MOCK_VOUCHES: Vouch[] = [
  {
    id: "vouch-1",
    authorId: "user-justin",
    recipientName: "Mike Alvarez",
    recipientBusiness: "Alvarez Plumbing Co.",
    category: "Plumber",
    description: "Fast, transparent, and calm under pressure. He fixed the leak before it became a disaster.",
    rating: 5,
    recipientPhone: "(512) 555-0141",
    recipientWebsite: "https://alvarezplumbing.example",
    recipientInstagram: "@alvarezplumbing",
    isPublic: true,
    featuredOrder: 1,
    likeCount: 18,
    createdAt: "2024-04-02",
  },
  {
    id: "vouch-2",
    authorId: "user-justin",
    recipientName: "Nina Patel",
    recipientBusiness: "Northstar Accounting",
    category: "Accountant",
    description: "A thoughtful professional who made tax season feel manageable and clear.",
    rating: 5,
    recipientPhone: "(512) 555-0167",
    recipientWebsite: "https://northstaraccounting.example",
    isPublic: true,
    featuredOrder: 2,
    likeCount: 12,
    createdAt: "2024-03-14",
  },
  {
    id: "vouch-3",
    authorId: "user-justin",
    recipientName: "Darius Holt",
    recipientBusiness: "Holt Electric",
    category: "Electrician",
    description: "Excellent communication and tidy work. He handled a tricky switch issue without drama.",
    rating: 4,
    recipientPhone: "(512) 555-0199",
    isPublic: true,
    likeCount: 9,
    createdAt: "2024-02-09",
  },
  {
    id: "vouch-4",
    authorId: "user-justin",
    recipientName: "Alicia Brooks",
    recipientBusiness: "Brooks Realty",
    category: "Realtor",
    description: "Patient, responsive, and genuinely helpful in a high-stakes move.",
    rating: 5,
    recipientWebsite: "https://brooksrealty.example",
    isPublic: true,
    likeCount: 14,
    createdAt: "2024-01-24",
  },
  {
    id: "vouch-5",
    authorId: "user-nick",
    recipientName: "Tessa Moore",
    recipientBusiness: "Studio Tessa",
    category: "Dentist",
    description: "Calm, precise, and easy to trust. The kind of dentist people recommend without hesitation.",
    rating: 5,
    recipientPhone: "(718) 555-0132",
    isPublic: true,
    featuredOrder: 1,
    likeCount: 16,
    createdAt: "2024-04-11",
  },
  {
    id: "vouch-6",
    authorId: "user-nick",
    recipientName: "Jordan Lee",
    recipientBusiness: "Lattice IT",
    category: "IT",
    description: "Solved a major setup issue in one visit and explained everything clearly.",
    rating: 5,
    recipientWebsite: "https://latticeit.example",
    isPublic: true,
    likeCount: 11,
    createdAt: "2024-03-22",
  },
  {
    id: "vouch-7",
    authorId: "user-nick",
    recipientName: "Rosa Kim",
    recipientBusiness: "Rosa's Cleaning",
    category: "Cleaner",
    description: "Reliable, warm, and exceptionally thorough. The home felt noticeably better after every visit.",
    rating: 4,
    recipientPhone: "(718) 555-0154",
    isPublic: true,
    likeCount: 7,
    createdAt: "2024-02-18",
  },
  {
    id: "vouch-8",
    authorId: "user-nick",
    recipientName: "Theo Bell",
    recipientBusiness: "Bell Contractors",
    category: "Contractor",
    description: "Great eye for detail and no nonsense. He kept the timeline realistic.",
    rating: 4,
    recipientWebsite: "https://bellcontractors.example",
    isPublic: true,
    likeCount: 8,
    createdAt: "2024-01-07",
  },
  {
    id: "vouch-9",
    authorId: "user-ben",
    recipientName: "Eva Cruz",
    recipientBusiness: "Cruz Mechanic",
    category: "Mechanic",
    description: "Honest about costs and quick to explain the fix. The best kind of no-pressure service.",
    rating: 5,
    recipientPhone: "(303) 555-0183",
    isPublic: true,
    featuredOrder: 1,
    likeCount: 13,
    createdAt: "2024-04-01",
  },
  {
    id: "vouch-10",
    authorId: "user-ben",
    recipientName: "Leo Grant",
    recipientBusiness: "Grant Fitness",
    category: "Trainer",
    description: "Supportive, practical, and fantastic at making progress feel sustainable.",
    rating: 5,
    recipientWebsite: "https://grantfitness.example",
    isPublic: true,
    likeCount: 10,
    createdAt: "2024-03-01",
  },
  {
    id: "vouch-11",
    authorId: "user-ben",
    recipientName: "Parker Diaz",
    recipientBusiness: "Parker Law",
    category: "Lawyer",
    description: "Thoughtful, direct, and steady in a stressful situation. Very easy to recommend.",
    rating: 4,
    recipientPhone: "(303) 555-0190",
    isPublic: true,
    likeCount: 6,
    createdAt: "2024-02-12",
  },
  {
    id: "vouch-12",
    authorId: "user-ben",
    recipientName: "Lina Ortiz",
    recipientBusiness: "Lina Landscapes",
    category: "Landscaper",
    description: "Beautiful design, clear communication, and work that genuinely feels worth it.",
    rating: 5,
    recipientWebsite: "https://linalandscapes.example",
    isPublic: true,
    likeCount: 9,
    createdAt: "2024-01-19",
  },
];

export let MOCK_VOUCHES_STORE: Vouch[] = [...MOCK_VOUCHES];

export function addVouch(input: Omit<Vouch, "id" | "createdAt" | "likeCount" | "isPublic" | "featuredOrder"> & Partial<Pick<Vouch, "isPublic" | "likeCount" | "featuredOrder">>): Vouch {
  const vouch: Vouch = {
    id: `vouch-${Date.now()}`,
    createdAt: new Date().toISOString().slice(0, 10),
    likeCount: 0,
    isPublic: true,
    featuredOrder: undefined,
    ...input,
  };

  MOCK_VOUCHES_STORE = [vouch, ...MOCK_VOUCHES_STORE];
  return vouch;
}

export const MOCK_VOUCH_REQUESTS: VouchRequest[] = [
  {
    id: "request-1",
    requesterId: "user-nick",
    targetUserId: "user-justin",
    categoryNeeded: "Plumber",
    message: "I need a good plumber in Austin who can fix an urgent leak. Can you help?",
    status: "Pending",
  },
  {
    id: "request-2",
    requesterId: "user-ben",
    targetUserId: "user-nick",
    categoryNeeded: "Accountant",
    message: "I am looking for a smart accountant for a small business setup in Brooklyn.",
    status: "Pending",
  },
];

export const MOCK_FOLLOWS: Follow[] = [
  { followerId: "user-justin", followingId: "user-nick" },
  { followerId: "user-justin", followingId: "user-ben" },
  { followerId: "user-nick", followingId: "user-justin" },
  { followerId: "user-ben", followingId: "user-justin" },
];

export const MOCK_CURRENT_USER = MOCK_USERS[0];

export function getUserByUsername(username: string) {
  return MOCK_USERS.find((user) => user.username.toLowerCase() === username.toLowerCase());
}

export function getVouchesByAuthor(authorId: string) {
  return MOCK_VOUCHES_STORE.filter((vouch) => vouch.authorId === authorId && vouch.isPublic);
}

export function getFeedVouches(userId: string) {
  const followedIds = MOCK_FOLLOWS.filter((follow) => follow.followerId === userId).map((follow) => follow.followingId);
  return MOCK_VOUCHES_STORE.filter((vouch) => followedIds.includes(vouch.authorId));
}

export function getExploreResults(category?: Category, location?: string) {
  return MOCK_VOUCHES_STORE.filter((vouch) => {
    const author = MOCK_USERS.find((user) => user.id === vouch.authorId);
    const locationMatch = !location || author?.location.toLowerCase().includes(location.toLowerCase());
    const categoryMatch = !category || vouch.category === category;
    return locationMatch && categoryMatch && vouch.isPublic;
  });
}

export function getCategoryMeta(category: Category) {
  const map: Record<
    Category,
    { label: string; icon: string; accent: string; soft: string }
  > = {
    Plumber: { label: "Plumber", icon: "🚿", accent: "text-cyan-700", soft: "bg-cyan-50" },
    Electrician: { label: "Electrician", icon: "⚡", accent: "text-amber-700", soft: "bg-amber-50" },
    Accountant: { label: "Accountant", icon: "📊", accent: "text-violet-700", soft: "bg-violet-50" },
    Lawyer: { label: "Lawyer", icon: "⚖️", accent: "text-slate-700", soft: "bg-slate-100" },
    Dentist: { label: "Dentist", icon: "🦷", accent: "text-emerald-700", soft: "bg-emerald-50" },
    Doctor: { label: "Doctor", icon: "🩺", accent: "text-rose-700", soft: "bg-rose-50" },
    Contractor: { label: "Contractor", icon: "🧱", accent: "text-orange-700", soft: "bg-orange-50" },
    IT: { label: "IT", icon: "💻", accent: "text-indigo-700", soft: "bg-indigo-50" },
    Realtor: { label: "Realtor", icon: "🏠", accent: "text-sky-700", soft: "bg-sky-50" },
    Landscaper: { label: "Landscaper", icon: "🌿", accent: "text-lime-700", soft: "bg-lime-50" },
    Cleaner: { label: "Cleaner", icon: "🧹", accent: "text-fuchsia-700", soft: "bg-fuchsia-50" },
    Mechanic: { label: "Mechanic", icon: "🔧", accent: "text-blue-700", soft: "bg-blue-50" },
    Trainer: { label: "Trainer", icon: "🏋️", accent: "text-pink-700", soft: "bg-pink-50" },
    Tutor: { label: "Tutor", icon: "📚", accent: "text-teal-700", soft: "bg-teal-50" },
    Chef: { label: "Chef", icon: "🍳", accent: "text-red-700", soft: "bg-red-50" },
    Other: { label: "Other", icon: "✨", accent: "text-stone-700", soft: "bg-stone-100" },
  };

  return map[category];
}
