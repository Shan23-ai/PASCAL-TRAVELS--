/**
 * Pascal Travels & Tour — Jobs Board Data
 * Sample job listings shown on the Jobs page.
 * Each job: id, title, country, flag, description, requirements[], application_link, type, salary.
 */
window.JOBS_DATA = [
  {
    id: 'job-canada-software',
    title: 'Software Engineer',
    country: 'Canada',
    flag: '🇨🇦',
    city: 'Toronto / Vancouver',
    type: 'Full-time',
    salary: 'CAD 80,000 – 120,000 / year',
    description: 'Join a fast-growing Canadian tech company building scalable products. 3+ years experience required and a work permit is available for qualified candidates.',
    requirements: [
      '3+ years experience in software development',
      'Bachelor\u2019s degree in Computer Science or related field',
      'Proficiency in JavaScript / Python / Java',
      'Work permit sponsorship available'
    ],
    application_link: 'apply.html?job=job-canada-software',
    created_at: '2026-01-01'
  },
  {
    id: 'job-uk-nurse',
    title: 'Registered Nurse',
    country: 'UK',
    flag: '🇬🇧',
    city: 'London / Manchester',
    type: 'Full-time',
    salary: '£28,000 – £38,000 / year',
    description: 'Registered nurse positions across NHS and private hospitals. Relocation assistance provided. Must hold current nursing license and pass NMC registration.',
    requirements: [
      'Registered nurse with valid license',
      'NMC registration eligibility',
      'IELTS OET (minimum C+)',
      'Relocation assistance provided'
    ],
    application_link: 'apply.html?job=job-uk-nurse',
    created_at: '2026-01-01'
  },
  {
    id: 'job-australia-construction',
    title: 'Construction Worker',
    country: 'Australia',
    flag: '🇦🇺',
    city: 'Sydney / Melbourne / Brisbane',
    type: 'Full-time',
    salary: 'AUD 55,000 – 75,000 / year',
    description: 'Skilled construction roles with major Australian developers. 2+ years experience required. Employer sponsorship available under the TSS visa program.',
    requirements: [
      '2+ years construction experience',
      'Relevant trade certification preferred',
      'Physical fitness and safety awareness',
      'Employer sponsorship available'
    ],
    application_link: 'apply.html?job=job-australia-construction',
    created_at: '2026-01-01'
  },
  {
    id: 'job-uae-teacher',
    title: 'Teacher',
    country: 'UAE',
    flag: '🇦🇪',
    city: 'Dubai / Abu Dhabi',
    type: 'Full-time',
    salary: 'AED 12,000 – 20,000 / month',
    description: 'Teaching positions in international schools across Dubai and Abu Dhabi. Bachelor\u2019s degree and teaching license required. Tax-free salary with housing allowance.',
    requirements: [
      'Bachelor\u2019s degree in Education or subject area',
      'Valid teaching license / PGCE',
      '2+ years teaching experience',
      'Tax-free salary + housing allowance'
    ],
    application_link: 'apply.html?job=job-uae-teacher',
    created_at: '2026-01-01'
  },
  {
    id: 'job-germany-engineer',
    title: 'Mechanical Engineer',
    country: 'Germany',
    flag: '🇩🇪',
    city: 'Berlin / Munich / Stuttgart',
    type: 'Full-time',
    salary: '€45,000 – 70,000 / year',
    description: 'Engineering roles in automotive and manufacturing. EU Blue Card sponsorship available for qualified candidates with German or English proficiency.',
    requirements: [
      'Bachelor\u2019s degree in Mechanical Engineering',
      '3+ years relevant experience',
      'English B2 / German advantageous',
      'EU Blue Card sponsorship available'
    ],
    application_link: 'apply.html?job=job-germany-engineer',
    created_at: '2026-01-01'
  },
  {
    id: 'job-qatar-hospitality',
    title: 'Hospitality Staff',
    country: 'Qatar',
    flag: '🇶🇦',
    city: 'Doha',
    type: 'Full-time',
    salary: 'QAR 2,500 – 4,500 / month',
    description: 'Hotel and hospitality roles across Doha\u2019s luxury hotels and resorts. Accommodation and transport provided. Ideal for service-oriented candidates.',
    requirements: [
      'Hospitality / customer service experience',
      'Good English communication',
      'Accommodation & transport provided',
      'Valid passport (6+ months)'
    ],
    application_link: 'apply.html?job=job-qatar-hospitality',
    created_at: '2026-01-01'
  },
  {
    id: 'job-saudi-healthcare',
    title: 'Healthcare Assistance',
    country: 'Saudi Arabia',
    flag: '🇸🇦',
    city: 'Riyadh / Jeddah',
    type: 'Full-time',
    salary: 'SAR 2,000 – 3,500 / month',
    description: 'Healthcare assistant roles in Saudi hospitals and clinics. Free accommodation, transport, and medical cover. Prior caregiving experience beneficial.',
    requirements: [
      'Healthcare / caregiving experience',
      'Basic English / Arabic advantageous',
      'Free accommodation & transport',
      'Valid passport (6+ months)'
    ],
    application_link: 'apply.html?job=job-saudi-healthcare',
    created_at: '2026-01-01'
  },
  {
    id: 'job-estonia-it',
    title: 'IT Support Specialist',
    country: 'Estonia',
    flag: '🇪🇪',
    city: 'Tallinn',
    type: 'Full-time',
    salary: '€1,800 – 3,200 / month',
    description: 'IT support roles in Estonia\u2019s thriving digital ecosystem. Startups and established firms alike. English working environment, Type D visa support.',
    requirements: [
      'IT / technical support experience',
      'Strong English communication',
      'Windows / Linux knowledge',
      'Type D visa support provided'
    ],
    application_link: 'apply.html?job=job-estonia-it',
    created_at: '2026-01-01'
  }
];

const localJobImages = {
  'job-canada-software': 'images/jobs/SOFT.jpg',
  'job-uk-nurse': 'images/jobs/NURSE.jpg',
  'job-australia-construction': 'images/jobs/CWO.jpg',
  'job-uae-teacher': 'images/jobs/Teach.jpg',
  'job-germany-engineer': 'images/jobs/Mech.jpg',
  'job-qatar-hospitality': 'images/jobs/Hos.jpg',
  'job-saudi-healthcare': 'images/jobs/Health.jpg',
  'job-estonia-it': 'images/jobs/IT.jpg'
};
const localJobImagePositions = {
  'job-canada-software': '38% center',
  'job-uk-nurse': '72% center',
  'job-australia-construction': 'center center',
  'job-uae-teacher': '40% 42%',
  'job-germany-engineer': '38% center',
  'job-qatar-hospitality': 'center center',
  'job-saudi-healthcare': '58% center',
  'job-estonia-it': '38% center'
};

window.JOBS_DATA.forEach(job => {
  job.image = localJobImages[job.id] || '';
  job.imagePosition = localJobImagePositions[job.id] || 'center';
});
