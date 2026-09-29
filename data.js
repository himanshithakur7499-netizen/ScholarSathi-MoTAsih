export const schemes = [
  {
    id: 'pre',
    short: 'Pre-Matric',
    title: 'Pre-Matric Scholarship',
    level: 'School • IX–X',
    icon: '🎒',
    tone: 'blue',
    status: 'Explore',
    description: 'Support for eligible ST school students with a guided application journey.'
  },
  {
    id: 'post',
    short: 'Post-Matric',
    title: 'Post-Matric Scholarship',
    level: 'College & Higher Education',
    icon: '🎓',
    tone: 'green',
    status: 'Eligible',
    description: 'Your profile matches the configured demo rules for this scheme.'
  },
  {
    id: 'top',
    short: 'Top Class',
    title: 'Top Class Scholarship',
    level: 'Higher Education',
    icon: '🏆',
    tone: 'gold',
    status: 'Review',
    description: 'Check institution and course conditions before applying.'
  },
  {
    id: 'nfs',
    short: 'NFST',
    title: 'National Fellowship (NFST)',
    level: 'Research / Fellowship',
    icon: '🔬',
    tone: 'purple',
    status: 'Explore',
    description: 'Fellowship discovery with qualification-focused guidance.'
  },
  {
    id: 'nos',
    short: 'NOS',
    title: 'National Overseas Scholarship',
    level: 'Overseas Higher Education',
    icon: '🌍',
    tone: 'orange',
    status: 'Explore',
    description: 'Track overseas scholarship requirements and application status.'
  }
];

export const application = {
  id: 'MO-PS-2026-00421',
  scheme: 'Post-Matric Scholarship',
  submitted: '18 Sep 2026',
  status: 'Needs Action',
  progress: 68,
  nextAction: 'Resolve income verification mismatch',
  timeline: [
    { label: 'Draft', date: '14 Sep', state: 'done' },
    { label: 'Submitted', date: '18 Sep', state: 'done' },
    { label: 'Eligibility', date: '18 Sep', state: 'done' },
    { label: 'Documents', date: '19 Sep', state: 'done' },
    { label: 'Verification', date: '22 Sep', state: 'warning' },
    { label: 'Institution', date: 'Pending', state: 'pending' },
    { label: 'Sanction', date: 'Pending', state: 'pending' },
    { label: 'DBT', date: 'Pending', state: 'pending' }
  ]
};

export const documents = [
  { name: 'ST Certificate', source: 'e-District (Mock)', status: 'Verified', meta: '12 Mar 2026' },
  { name: 'Income Certificate', source: 'e-District (Mock)', status: 'Mismatch', meta: '22 Sep 2026' },
  { name: 'Academic Record', source: 'APAAR (Mock)', status: 'Verified', meta: '19 Sep 2026' },
  { name: 'Institution Enrollment', source: 'UDISE+/Institute (Mock)', status: 'Verified', meta: '19 Sep 2026' },
  { name: 'Domicile Certificate', source: 'State e-District (Mock)', status: 'Verified', meta: '08 Jan 2026' }
];

export const verifications = [
  { name: 'Identity', source: 'UIDAI Adapter', status: 'Verified' },
  { name: 'ST Status', source: 'e-District Adapter', status: 'Verified' },
  { name: 'Income', source: 'e-District Adapter', status: 'Mismatch' },
  { name: 'Enrollment', source: 'UDISE+ Adapter', status: 'Verified' },
  { name: 'Academic Record', source: 'APAAR Adapter', status: 'Verified' }
];

export const notifications = [
  { title: 'Income verification needs action', time: '2h ago', type: 'warning' },
  { title: 'Academic record verified', time: 'Yesterday', type: 'success' },
  { title: 'Application moved to verification', time: '3 days ago', type: 'info' }
];

export const unreached = [
  { id: 'U-1042', name: 'Ravi Kumar', institution: 'Govt. College', scheme: 'Post-Matric', enrolled: true, receiving: false, match: '94%' },
  { id: 'U-1188', name: 'Meena Lakra', institution: 'Tribal Women’s College', scheme: 'Top Class', enrolled: true, receiving: false, match: '91%' },
  { id: 'U-1234', name: 'Kiran Soren', institution: 'Govt. Degree College', scheme: 'Post-Matric', enrolled: true, receiving: true, match: '88%' }
];
