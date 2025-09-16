// In a real application, this data would come from a secure backend and blockchain.

export const initialUsers = {
  'investor@demo.com': { 
    id: 1, 
    type: 'investor', 
    name: 'Ada Lovelace', 
    email: 'investor@demo.com', 
    password: 'password123', 
    wallet: { ngn: 5000000, usdt: 1250.50, usdc: 800.25 },
    kycStatus: 'Verified', // 'Not Submitted', 'Pending', 'Verified'
    twoFactorEnabled: true,
  },
  'developer@demo.com': { 
    id: 2, 
    type: 'developer', 
    name: 'Charles Babbage', 
    email: 'developer@demo.com', 
    password: 'password123', 
    wallet: { ngn: 1200000, usdt: 500, usdc: 100 },
    companyProfile: {
        name: 'Babbage Constructions Ltd.',
        regNumber: 'RC123456',
        address: '1 Innovation Drive, Yaba, Lagos',
        website: 'https://babbageconstructions.com',
    },
    twoFactorEnabled: false,
    treasuryAddress: '0x1234ABCD5678EFGH9101KLMN1213OPQR1415STUV', // Collected during KYC
  },
  'admin@demo.com': { id: 3, type: 'admin', name: 'Admin Grace Hopper', email: 'admin@demo.com', password: 'password123', wallet: { ngn: 0, usdt: 0, usdc: 0 } },
  'buyer@demo.com': { 
    id: 4, 
    type: 'investor', 
    name: 'Bayo Adekunle', 
    email: 'buyer@demo.com', 
    password: 'password123', 
    wallet: { ngn: 2500000, usdt: 2000, usdc: 1500 },
    kycStatus: 'Not Submitted',
    twoFactorEnabled: false,
  },
};

export const initialProjects = [
  {
    id: 1,
    title: 'Lekki Pearl Residence',
    tokenTicker: 'LPR',
    tokenSupply: 250000,
    developerId: 2,
    developerName: 'Charles Babbage',
    location: 'Lekki, Lagos',
    fundingGoal: 250000,
    amountRaised: 250000, // Fully funded
    apy: 15,
    term: 24, // months
    startDate: '2024-03-01T00:00:00Z',
    description: 'A premium residential complex featuring 50 luxury apartments with state-of-the-art facilities. Located in the heart of Lekki, it promises high rental yield and capital appreciation. The property includes a swimming pool, a fully-equipped gym, and 24/7 security.',
    imageUrl: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=2000',
    images: [
        'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=2000',
        'https://images.unsplash.com/photo-1600585152220-90363fe7e115?q=80&w=2000',
        'https://images.unsplash.com/photo-1570129477492-45c003edd2e7?q=80&w=2000',
        'https://images.unsplash.com/photo-1605276374104-5de67d60924f?q=80&w=2000',
    ],
    status: 'funded', // 'pending', 'active', 'funded', 'completed'
    projectWalletBalance: 5000, // For APY payments
    completionDate: '2024-05-15T00:00:00Z',
    fundsWithdrawn: true,
  },
  {
    id: 2,
    title: 'Eko Atlantic Tower',
    tokenTicker: 'EAT',
    tokenSupply: 1000000,
    developerId: 2,
    developerName: 'Charles Babbage',
    location: 'Eko Atlantic, Lagos',
    fundingGoal: 1000000,
    amountRaised: 450000,
    apy: 18,
    term: 36,
    startDate: '2023-09-10T00:00:00Z',
    description: 'A visionary skyscraper that will redefine the Lagos skyline. This mixed-use development includes commercial, residential, and recreational spaces, offering unparalleled views and luxury living.',
    imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2000',
    images: [
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2000',
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2000',
        'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=2000',
    ],
    status: 'active',
    projectWalletBalance: 12000,
    fundsWithdrawn: false,
  },
  {
    id: 3,
    title: 'Abuja Smart City Villas',
    tokenTicker: 'ASV',
    tokenSupply: 500000,
    developerId: 2,
    developerName: 'Charles Babbage',
    location: 'Gwarinpa, Abuja',
    fundingGoal: 500000,
    amountRaised: 150000,
    apy: 16.5,
    term: 30,
    description: 'An exclusive community of 20 smart homes in a serene district of Abuja, designed for modern living and sustainable luxury. Each villa is equipped with the latest smart home technology for comfort and security.',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000',
    images: [
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000',
        'https://images.unsplash.com/photo-1600585153492-3f19d532b259?q=80&w=2000',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2000',
    ],
    status: 'active',
    projectWalletBalance: 0,
    fundsWithdrawn: false,
  },
  {
    id: 4,
    title: 'Ikeja Tech Hub',
    tokenTicker: 'ITH',
    tokenSupply: 300000,
    developerId: 2,
    developerName: 'Charles Babbage',
    location: 'Ikeja, Lagos',
    fundingGoal: 300000,
    amountRaised: 0,
    apy: 17,
    term: 36,
    description: 'A state-of-the-art co-working and innovation hub in the heart of Ikeja Computer Village. Designed to foster collaboration and growth for tech startups, offering flexible office spaces, event halls, and networking opportunities.',
    imageUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2000',
    images: [
        'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2000',
        'https://images.unsplash.com/photo-1521737852577-684822188716?q=80&w=2000',
        'https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?q=80&w=2000',
    ],
    status: 'pending', // Submitted for admin approval
    projectWalletBalance: 0,
    fundsWithdrawn: false,
  },
];

// This structure represents token ownership.
export const initialPortfolios = {
  1: { // Ada Lovelace's portfolio
    tokens: [
      { tokenId: 'proj1-sec-1', projectId: 1, type: 'SECURITY', amount: 5000, originalOwnerId: 1, lastApyClaimDate: '2025-08-05T00:00:00Z' },
      { tokenId: 'proj1-mkt-1', projectId: 1, type: 'MARKET', amount: 5000, ownerId: 1, status: 'held' }, // status: 'held' or 'listed'
      { tokenId: 'proj2-sec-1', projectId: 2, type: 'SECURITY', amount: 10000, originalOwnerId: 1, lastApyClaimDate: '2025-09-01T00:00:00Z' },
      { tokenId: 'proj2-mkt-1', projectId: 2, type: 'MARKET', amount: 10000, ownerId: 1, status: 'held' },
    ]
  },
  4: { // Bayo Adekunle's portfolio
    tokens: [
        { tokenId: 'proj1-sec-2', projectId: 1, type: 'SECURITY', amount: 2500, originalOwnerId: 4, lastApyClaimDate: '2025-07-20T00:00:00Z' },
        { tokenId: 'proj1-mkt-2', projectId: 1, type: 'MARKET', amount: 2500, ownerId: 4, status: 'held' },
    ]
  }
};

// Represents tokens listed on the secondary market
export const initialMarketListings = [
    { listingId: 1, tokenId: 'proj2-mkt-1', sellerId: 1, projectId: 2, amount: 2000, price: 2100 } // Ada is selling 2000 of her market tokens for project 2 at a premium
];
