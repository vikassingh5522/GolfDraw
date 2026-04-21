const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();

const User = require('./models/User');
const Score = require('./models/Score');
const Charity = require('./models/Charity');
const Payment = require('./models/Payment');
const Draw = require('./models/Draw');
const Winner = require('./models/Winner');

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to MongoDB');

  // Clear existing data
  await Promise.all([
    User.deleteMany({}),
    Score.deleteMany({}),
    Charity.deleteMany({}),
    Payment.deleteMany({}),
    Draw.deleteMany({}),
    Winner.deleteMany({})
  ]);
  console.log('Cleared existing data');

  // ── CHARITIES ──────────────────────────────────────────────
  const charities = await Charity.insertMany([
    {
      name: 'First Tee Foundation',
      description: 'Introducing golf to young people from all backgrounds, building character through the game. Programs in over 150 chapters across the country providing free coaching, mentorship, and life skills training.',
      images: [],
      featured: true,
      totalContributions: 18750.50,
      events: [
        { title: 'Junior Golf Camp 2026', date: new Date('2026-06-15'), description: 'Week-long camp for kids ages 8-14 with PGA instructors' },
        { title: 'Scholarship Gala Dinner', date: new Date('2026-08-22'), description: 'Annual fundraiser to support college scholarships for program graduates' },
        { title: 'Community Open Day', date: new Date('2026-05-10'), description: 'Free golf taster sessions at 50 locations nationwide' }
      ]
    },
    {
      name: 'Wounded Warriors Golf Project',
      description: 'Providing adaptive golf programs for injured military veterans. Therapeutic golf sessions help with physical rehabilitation, PTSD recovery, and community reintegration.',
      images: [],
      featured: true,
      totalContributions: 24300.00,
      events: [
        { title: 'Veterans Tournament', date: new Date('2026-07-04'), description: 'Annual 4th of July tournament at Pebble Beach with celebrity sponsors' },
        { title: 'Adaptive Equipment Drive', date: new Date('2026-05-20'), description: 'Collecting and distributing adaptive golf equipment to VA hospitals' }
      ]
    },
    {
      name: 'Golf for Africa',
      description: 'Building sustainable golf academies across sub-Saharan Africa to create economic opportunity. Each academy includes education facilities, job training, and community health programs.',
      images: [],
      featured: true,
      totalContributions: 31200.75,
      events: [
        { title: 'Nairobi Academy Opening', date: new Date('2026-09-01'), description: 'Grand opening of the 5th academy in Kenya' },
        { title: 'Charity Pro-Am', date: new Date('2026-06-28'), description: 'Pro-Am event with African Tour professionals' },
        { title: 'Equipment Shipping Day', date: new Date('2026-04-30'), description: 'Container of donated clubs and gear shipped to Ghana' }
      ]
    },
    {
      name: 'Green Fairways Initiative',
      description: 'Dedicated to environmental sustainability in golf. Funding research into water-efficient course management, native grass restoration, and eliminating harmful pesticides from golf courses worldwide.',
      images: [],
      featured: false,
      totalContributions: 9800.25,
      events: [
        { title: 'Eco-Course Certification Workshop', date: new Date('2026-05-15'), description: 'Training course managers in sustainable practices' },
        { title: 'Tree Planting Marathon', date: new Date('2026-10-12'), description: 'Planting 10,000 native trees across 25 courses' }
      ]
    },
    {
      name: 'Special Olympics Golf',
      description: 'Supporting golf programs for athletes with intellectual disabilities. Providing coaching, equipment, and competition opportunities at local, national, and international levels.',
      images: [],
      featured: false,
      totalContributions: 14500.00,
      events: [
        { title: 'Regional Qualifiers', date: new Date('2026-06-05'), description: 'State-level qualifying rounds for National Games' },
        { title: 'Unified Golf Day', date: new Date('2026-08-15'), description: 'Paired events with Special Olympics athletes and community golfers' }
      ]
    },
    {
      name: 'Girls Golf Academy',
      description: 'Breaking barriers for women and girls in golf. Scholarships, coaching clinics, and mentorship programs designed to increase female participation from junior through professional levels.',
      images: [],
      featured: true,
      totalContributions: 22100.00,
      events: [
        { title: 'Women in Golf Summit', date: new Date('2026-07-18'), description: 'Conference featuring LPGA pros, industry leaders, and scholarships' },
        { title: 'High School League Finals', date: new Date('2026-05-25'), description: 'Championship tournament for girls high school golf teams' },
        { title: 'Summer Swing Camp', date: new Date('2026-07-01'), description: '3-day intensive for girls aged 10-17' }
      ]
    },
    {
      name: 'Caddie Scholarship Fund',
      description: 'Providing college tuition assistance to current and former golf caddies. Over 200 scholarships awarded annually, continuing a tradition that has supported thousands of students since 1960.',
      images: [],
      featured: false,
      totalContributions: 45600.50,
      events: [
        { title: 'Annual Scholarship Awards', date: new Date('2026-08-30'), description: '200 scholarships awarded at ceremony in Chicago' },
        { title: 'Caddie Appreciation Week', date: new Date('2026-06-10'), description: 'Events at partner courses celebrating caddies' }
      ]
    },
    {
      name: 'Golf Against Cancer',
      description: 'Raising funds for cancer research through golf events. 100% of tournament proceeds go directly to cutting-edge oncology research at partner hospitals and university labs.',
      images: [],
      featured: false,
      totalContributions: 38900.00,
      events: [
        { title: 'Marathon Golf Challenge', date: new Date('2026-06-21'), description: '100 holes in one day - pledges per hole for research funding' },
        { title: 'Pink Ribbon Classic', date: new Date('2026-10-01'), description: 'Breast cancer awareness tournament at 30 courses simultaneously' }
      ]
    },
    {
      name: 'Urban Links',
      description: 'Bringing golf to inner-city communities. Building public short courses and driving ranges in underserved neighborhoods, with free youth programs and adult beginner clinics.',
      images: [],
      featured: false,
      totalContributions: 11250.00,
      events: [
        { title: 'Detroit Course Groundbreaking', date: new Date('2026-05-30'), description: 'Construction begins on 9-hole community course' },
        { title: 'City Golf Festival', date: new Date('2026-08-08'), description: 'Free golf festival in downtown parks across 10 cities' }
      ]
    },
    {
      name: 'Seniors on the Green',
      description: 'Combating isolation in elderly communities through golf. Organizing weekly social golf groups, providing transport to courses, and funding adaptive equipment for mobility-challenged seniors.',
      images: [],
      featured: false,
      totalContributions: 7650.00,
      events: [
        { title: 'Golden Tee Tournament', date: new Date('2026-09-15'), description: 'Over-65s tournament with social lunch and prizes' },
        { title: 'Walking Group Launch', date: new Date('2026-04-28'), description: 'New weekly walking golf groups at 20 courses for over-60s' }
      ]
    }
  ]);
  console.log(`Seeded ${charities.length} charities`);

  // ── USERS ──────────────────────────────────────────────────
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash('password123', salt);

  const now = new Date();
  const usersData = [
    // Admin
    {
      name: 'Admin User',
      email: 'admin@golfdraw.com',
      password: hashedPassword,
      role: 'admin',
      subscription: { plan: null, status: 'inactive', startDate: null, renewalDate: null, cancelledAt: null },
      charity: { charityId: null, contributionPercent: 10 }
    },
    // Active subscribers
    {
      name: 'James McAllister',
      email: 'james.mcallister@email.com',
      password: hashedPassword,
      role: 'subscriber',
      subscription: { plan: 'yearly', status: 'active', startDate: new Date('2026-01-10'), renewalDate: new Date('2027-01-10'), cancelledAt: null },
      charity: { charityId: charities[0]._id, contributionPercent: 15 }
    },
    {
      name: 'Sarah Chen',
      email: 'sarah.chen@email.com',
      password: hashedPassword,
      role: 'subscriber',
      subscription: { plan: 'monthly', status: 'active', startDate: new Date('2026-03-01'), renewalDate: new Date('2026-05-01'), cancelledAt: null },
      charity: { charityId: charities[5]._id, contributionPercent: 20 }
    },
    {
      name: 'Roberto Martinez',
      email: 'roberto.m@email.com',
      password: hashedPassword,
      role: 'subscriber',
      subscription: { plan: 'yearly', status: 'active', startDate: new Date('2025-11-15'), renewalDate: new Date('2026-11-15'), cancelledAt: null },
      charity: { charityId: charities[2]._id, contributionPercent: 10 }
    },
    {
      name: 'Emma Thompson',
      email: 'emma.t@email.com',
      password: hashedPassword,
      role: 'subscriber',
      subscription: { plan: 'monthly', status: 'active', startDate: new Date('2026-04-01'), renewalDate: new Date('2026-05-01'), cancelledAt: null },
      charity: { charityId: charities[1]._id, contributionPercent: 25 }
    },
    {
      name: 'David Park',
      email: 'david.park@email.com',
      password: hashedPassword,
      role: 'subscriber',
      subscription: { plan: 'yearly', status: 'active', startDate: new Date('2026-02-20'), renewalDate: new Date('2027-02-20'), cancelledAt: null },
      charity: { charityId: charities[3]._id, contributionPercent: 10 }
    },
    {
      name: 'Lisa O\'Brien',
      email: 'lisa.obrien@email.com',
      password: hashedPassword,
      role: 'subscriber',
      subscription: { plan: 'monthly', status: 'active', startDate: new Date('2026-03-15'), renewalDate: new Date('2026-05-15'), cancelledAt: null },
      charity: { charityId: charities[4]._id, contributionPercent: 30 }
    },
    {
      name: 'Michael Nguyen',
      email: 'michael.n@email.com',
      password: hashedPassword,
      role: 'subscriber',
      subscription: { plan: 'yearly', status: 'active', startDate: new Date('2026-01-05'), renewalDate: new Date('2027-01-05'), cancelledAt: null },
      charity: { charityId: charities[6]._id, contributionPercent: 12 }
    },
    {
      name: 'Karen Whitfield',
      email: 'karen.w@email.com',
      password: hashedPassword,
      role: 'subscriber',
      subscription: { plan: 'monthly', status: 'active', startDate: new Date('2026-04-05'), renewalDate: new Date('2026-05-05'), cancelledAt: null },
      charity: { charityId: charities[7]._id, contributionPercent: 15 }
    },
    {
      name: 'Tom Bradley',
      email: 'tom.bradley@email.com',
      password: hashedPassword,
      role: 'subscriber',
      subscription: { plan: 'yearly', status: 'active', startDate: new Date('2025-12-01'), renewalDate: new Date('2026-12-01'), cancelledAt: null },
      charity: { charityId: charities[0]._id, contributionPercent: 20 }
    },
    {
      name: 'Priya Sharma',
      email: 'priya.sharma@email.com',
      password: hashedPassword,
      role: 'subscriber',
      subscription: { plan: 'monthly', status: 'active', startDate: new Date('2026-03-20'), renewalDate: new Date('2026-04-20'), cancelledAt: null },
      charity: { charityId: charities[8]._id, contributionPercent: 10 }
    },
    {
      name: 'Chris Evans',
      email: 'chris.evans@email.com',
      password: hashedPassword,
      role: 'subscriber',
      subscription: { plan: 'yearly', status: 'active', startDate: new Date('2026-02-01'), renewalDate: new Date('2027-02-01'), cancelledAt: null },
      charity: { charityId: charities[2]._id, contributionPercent: 18 }
    },
    {
      name: 'Angela Foster',
      email: 'angela.f@email.com',
      password: hashedPassword,
      role: 'subscriber',
      subscription: { plan: 'monthly', status: 'active', startDate: new Date('2026-04-10'), renewalDate: new Date('2026-05-10'), cancelledAt: null },
      charity: { charityId: charities[5]._id, contributionPercent: 22 }
    },
    {
      name: 'Ryan Hughes',
      email: 'ryan.h@email.com',
      password: hashedPassword,
      role: 'subscriber',
      subscription: { plan: 'yearly', status: 'active', startDate: new Date('2025-10-15'), renewalDate: new Date('2026-10-15'), cancelledAt: null },
      charity: { charityId: charities[1]._id, contributionPercent: 10 }
    },
    {
      name: 'Megan Scott',
      email: 'megan.scott@email.com',
      password: hashedPassword,
      role: 'subscriber',
      subscription: { plan: 'monthly', status: 'active', startDate: new Date('2026-03-25'), renewalDate: new Date('2026-04-25'), cancelledAt: null },
      charity: { charityId: charities[9]._id, contributionPercent: 15 }
    },
    // Lapsed subscribers
    {
      name: 'Jake Morrison',
      email: 'jake.m@email.com',
      password: hashedPassword,
      role: 'subscriber',
      subscription: { plan: 'monthly', status: 'lapsed', startDate: new Date('2025-09-01'), renewalDate: new Date('2025-12-01'), cancelledAt: new Date('2025-11-28') },
      charity: { charityId: charities[3]._id, contributionPercent: 10 }
    },
    {
      name: 'Diana Ross',
      email: 'diana.r@email.com',
      password: hashedPassword,
      role: 'subscriber',
      subscription: { plan: 'yearly', status: 'lapsed', startDate: new Date('2024-06-01'), renewalDate: new Date('2025-06-01'), cancelledAt: new Date('2025-05-15') },
      charity: { charityId: charities[7]._id, contributionPercent: 10 }
    },
    // Visitors (free accounts)
    {
      name: 'Alex Turner',
      email: 'alex.turner@email.com',
      password: hashedPassword,
      role: 'visitor',
      subscription: { plan: null, status: 'inactive', startDate: null, renewalDate: null, cancelledAt: null },
      charity: { charityId: null, contributionPercent: 10 }
    },
    {
      name: 'Sophie Baker',
      email: 'sophie.b@email.com',
      password: hashedPassword,
      role: 'visitor',
      subscription: { plan: null, status: 'inactive', startDate: null, renewalDate: null, cancelledAt: null },
      charity: { charityId: null, contributionPercent: 10 }
    },
    {
      name: 'Nathan Cole',
      email: 'nathan.cole@email.com',
      password: hashedPassword,
      role: 'visitor',
      subscription: { plan: null, status: 'inactive', startDate: null, renewalDate: null, cancelledAt: null },
      charity: { charityId: null, contributionPercent: 10 }
    },
    {
      name: 'Olivia Grant',
      email: 'olivia.g@email.com',
      password: hashedPassword,
      role: 'visitor',
      subscription: { plan: null, status: 'inactive', startDate: null, renewalDate: null, cancelledAt: null },
      charity: { charityId: null, contributionPercent: 10 }
    }
  ];

  // Insert without triggering the pre-save hash (password already hashed)
  const users = await User.insertMany(usersData);
  console.log(`Seeded ${users.length} users (1 admin, 14 active subscribers, 2 lapsed, 4 visitors)`);

  const subscribers = users.filter(u => u.subscription.status === 'active');

  // ── SCORES ─────────────────────────────────────────────────
  const courses = [
    'St Andrews Old Course', 'Pebble Beach', 'Augusta National', 'Royal Melbourne',
    'Pinehurst No. 2', 'Torrey Pines', 'Whistling Straits', 'Bethpage Black',
    'TPC Sawgrass', 'Carnoustie', 'Royal Troon', 'Muirfield',
    'Shinnecock Hills', 'Oakmont', 'Winged Foot', 'Merion Golf Club'
  ];
  const weathers = ['sunny', 'cloudy', 'rainy', 'windy'];
  const roundTypes = ['18-hole', '9-hole'];

  const scoresData = [];
  for (const user of subscribers) {
    for (let i = 0; i < 5; i++) {
      const d = new Date('2026-04-01');
      d.setDate(d.getDate() - (i * 4) - Math.floor(Math.random() * 3));
      scoresData.push({
        userId: user._id,
        score: Math.floor(Math.random() * 35) + 10, // 10–44
        date: d,
        courseName: courses[Math.floor(Math.random() * courses.length)],
        handicap: Math.round((Math.random() * 28 + 2) * 10) / 10,
        weather: weathers[Math.floor(Math.random() * weathers.length)],
        roundType: roundTypes[Math.floor(Math.random() * roundTypes.length)],
        notes: ['Great round', 'Struggled on the back nine', 'Best putting session yet', 'Wind made it tough', 'Solid iron play', 'Need to work on chipping', 'Birdie on 18!', 'Consistent round', ''][Math.floor(Math.random() * 9)]
      });
    }
  }
  const scores = await Score.insertMany(scoresData);
  console.log(`Seeded ${scores.length} scores (5 per active subscriber)`);

  // ── PAYMENTS ───────────────────────────────────────────────
  const paymentsData = [];
  for (const user of subscribers) {
    const plan = user.subscription.plan;
    const amount = plan === 'yearly' ? 99.99 : 9.99;
    const charityPct = user.charity?.contributionPercent || 10;
    const charityContribution = Math.round(amount * (charityPct / 100) * 100) / 100;
    const prizePoolContribution = Math.round((amount - charityContribution) * 0.6 * 100) / 100;

    // Initial subscription payment
    paymentsData.push({
      userId: user._id,
      amount,
      type: 'subscription',
      status: 'completed',
      plan,
      charityContribution,
      prizePoolContribution
    });

    // Some users have additional monthly payments
    if (plan === 'monthly') {
      for (let m = 0; m < 2; m++) {
        paymentsData.push({
          userId: user._id,
          amount: 9.99,
          type: 'subscription',
          status: 'completed',
          plan: 'monthly',
          charityContribution,
          prizePoolContribution
        });
      }
    }
  }

  // Donation payments from some users
  const donorUsers = subscribers.slice(0, 8);
  const donationAmounts = [25, 50, 10, 100, 15, 75, 30, 20];
  for (let i = 0; i < donorUsers.length; i++) {
    paymentsData.push({
      userId: donorUsers[i]._id,
      amount: donationAmounts[i],
      type: 'donation',
      status: 'completed',
      plan: null,
      charityContribution: donationAmounts[i],
      prizePoolContribution: 0
    });
  }

  const payments = await Payment.insertMany(paymentsData);
  console.log(`Seeded ${payments.length} payments`);

  // ── DRAWS ──────────────────────────────────────────────────
  const drawsData = [
    {
      month: 1, year: 2026,
      winningNumbers: [7, 14, 22, 31, 38],
      drawType: 'random',
      status: 'published',
      prizePool: { total: 72.50, fiveMatch: 29.00, fourMatch: 25.38, threeMatch: 18.12 },
      jackpotRollover: 0,
      publishedAt: new Date('2026-01-31')
    },
    {
      month: 2, year: 2026,
      winningNumbers: [3, 18, 25, 33, 41],
      drawType: 'algorithmic',
      status: 'published',
      prizePool: { total: 101.00, fiveMatch: 69.40, fourMatch: 35.35, threeMatch: 25.25 },
      jackpotRollover: 29.00,
      publishedAt: new Date('2026-02-28')
    },
    {
      month: 3, year: 2026,
      winningNumbers: [11, 19, 27, 35, 44],
      drawType: 'random',
      status: 'published',
      prizePool: { total: 85.20, fiveMatch: 34.08, fourMatch: 29.82, threeMatch: 21.30 },
      jackpotRollover: 0,
      publishedAt: new Date('2026-03-31')
    },
    {
      month: 4, year: 2026,
      winningNumbers: [5, 16, 23, 30, 42],
      drawType: 'algorithmic',
      status: 'simulated',
      prizePool: { total: 90.50, fiveMatch: 36.20, fourMatch: 31.68, threeMatch: 22.62 },
      jackpotRollover: 0,
      publishedAt: null
    }
  ];

  const draws = await Draw.insertMany(drawsData);
  console.log(`Seeded ${draws.length} draws (3 published, 1 simulated)`);

  // ── WINNERS ────────────────────────────────────────────────
  const publishedDraws = draws.filter(d => d.status === 'published');

  const winnersData = [
    // January draw winners
    {
      userId: subscribers[0]._id, drawId: publishedDraws[0]._id,
      matchType: '3-match', matchedNumbers: [14, 22, 38],
      prizeAmount: 18.12,
      verification: { proofUrl: null, status: 'approved' },
      paymentStatus: 'paid'
    },
    {
      userId: subscribers[3]._id, drawId: publishedDraws[0]._id,
      matchType: '3-match', matchedNumbers: [7, 31, 38],
      prizeAmount: 18.12,
      verification: { proofUrl: null, status: 'approved' },
      paymentStatus: 'paid'
    },
    {
      userId: subscribers[7]._id, drawId: publishedDraws[0]._id,
      matchType: '4-match', matchedNumbers: [7, 14, 22, 31],
      prizeAmount: 25.38,
      verification: { proofUrl: null, status: 'approved' },
      paymentStatus: 'paid'
    },
    // February draw winners
    {
      userId: subscribers[1]._id, drawId: publishedDraws[1]._id,
      matchType: '3-match', matchedNumbers: [18, 25, 41],
      prizeAmount: 12.63,
      verification: { proofUrl: null, status: 'approved' },
      paymentStatus: 'paid'
    },
    {
      userId: subscribers[5]._id, drawId: publishedDraws[1]._id,
      matchType: '3-match', matchedNumbers: [3, 33, 41],
      prizeAmount: 12.63,
      verification: { proofUrl: null, status: 'approved' },
      paymentStatus: 'paid'
    },
    {
      userId: subscribers[9]._id, drawId: publishedDraws[1]._id,
      matchType: '4-match', matchedNumbers: [3, 18, 25, 33],
      prizeAmount: 35.35,
      verification: { proofUrl: null, status: 'approved' },
      paymentStatus: 'paid'
    },
    {
      userId: subscribers[11]._id, drawId: publishedDraws[1]._id,
      matchType: '5-match', matchedNumbers: [3, 18, 25, 33, 41],
      prizeAmount: 69.40,
      verification: { proofUrl: null, status: 'approved' },
      paymentStatus: 'paid'
    },
    // March draw winners
    {
      userId: subscribers[2]._id, drawId: publishedDraws[2]._id,
      matchType: '3-match', matchedNumbers: [19, 27, 44],
      prizeAmount: 10.65,
      verification: { proofUrl: null, status: 'approved' },
      paymentStatus: 'paid'
    },
    {
      userId: subscribers[4]._id, drawId: publishedDraws[2]._id,
      matchType: '3-match', matchedNumbers: [11, 35, 44],
      prizeAmount: 10.65,
      verification: { proofUrl: null, status: 'pending' },
      paymentStatus: 'pending'
    },
    {
      userId: subscribers[6]._id, drawId: publishedDraws[2]._id,
      matchType: '4-match', matchedNumbers: [11, 19, 27, 35],
      prizeAmount: 29.82,
      verification: { proofUrl: null, status: 'pending' },
      paymentStatus: 'pending'
    },
    {
      userId: subscribers[8]._id, drawId: publishedDraws[2]._id,
      matchType: '3-match', matchedNumbers: [27, 35, 44],
      prizeAmount: 10.65,
      verification: { proofUrl: null, status: 'pending' },
      paymentStatus: 'pending'
    },
    {
      userId: subscribers[10]._id, drawId: publishedDraws[2]._id,
      matchType: '4-match', matchedNumbers: [19, 27, 35, 44],
      prizeAmount: 29.82,
      verification: { proofUrl: null, status: 'approved' },
      paymentStatus: 'paid'
    },
    {
      userId: subscribers[13]._id, drawId: publishedDraws[2]._id,
      matchType: '3-match', matchedNumbers: [11, 19, 44],
      prizeAmount: 10.65,
      verification: { proofUrl: null, status: 'rejected' },
      paymentStatus: 'pending'
    }
  ];

  const winners = await Winner.insertMany(winnersData);
  console.log(`Seeded ${winners.length} winners across 3 draws`);

  // ── SUMMARY ────────────────────────────────────────────────
  console.log('\n── Seed Complete ──');
  console.log(`  Users:     ${users.length} (admin: admin@golfdraw.com / password123)`);
  console.log(`  Charities: ${charities.length}`);
  console.log(`  Scores:    ${scores.length}`);
  console.log(`  Payments:  ${payments.length}`);
  console.log(`  Draws:     ${draws.length}`);
  console.log(`  Winners:   ${winners.length}`);
  console.log('\n  All user passwords: password123');
  console.log('  Login as subscriber: james.mcallister@email.com / password123');
  console.log('  Login as admin:      admin@golfdraw.com / password123');

  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
