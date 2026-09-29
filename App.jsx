import React, { useMemo, useState } from 'react';
import { application, documents, notifications, schemes, unreached, verifications } from './data';

const nav = [
  ['dashboard', '⌂', 'Dashboard'],
  ['scholarships', '▦', 'Scholarships'],
  ['applications', '◫', 'Applications'],
  ['verification', '✓', 'Verification'],
  ['documents', '▣', 'Document Wallet'],
  ['jago', '✦', 'JAGO Assistant'],
  ['alerts', '◉', 'Notifications']
];

const adminNav = [
  ['admin', '▤', 'Admin Insights'],
  ['beneficiaries', '◎', 'Unreached Students']
];

function App() {
  const [page, setPage] = useState('dashboard');
  const [role, setRole] = useState('student');
  const [lang, setLang] = useState('en');
  const [jagoOpen, setJagoOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [toast, setToast] = useState('');

  const switchPage = (value) => {
    setPage(value);
    setJagoOpen(value === 'jago');
  };

  const pushToast = (message) => {
    setToast(message);
    window.setTimeout(() => setToast(''), 2600);
  };

  const labels = {
    en: { hello: 'Good morning, Asha 👋', subtitle: 'Your scholarship journey, simplified.', jago: 'Ask JAGO' },
    hi: { hello: 'सुप्रभात, आशा 👋', subtitle: 'आपकी छात्रवृत्ति यात्रा, अब आसान।', jago: 'JAGO से पूछें' }
  };

  return (
    <div className="app-shell">
      <div className="demo-banner">
        <span>SIH PROTOTYPE</span>
        <strong>•</strong>
        Synthetic data + mock verification adapters. No live government API is being called.
      </div>

      <Sidebar page={page} setPage={switchPage} role={role} setRole={setRole} />

      <main className="main-area">
        <Topbar
          lang={lang}
          setLang={setLang}
          role={role}
          onLogin={() => setShowLogin(true)}
          onJago={() => { switchPage('jago'); setJagoOpen(true); }}
          labels={labels[lang]}
        />

        <div className="content-wrap">
          {role === 'student' ? (
            <>
              {page === 'dashboard' && <StudentDashboard lang={lang} onNavigate={switchPage} onToast={pushToast} />}
              {page === 'scholarships' && <ScholarshipsPage onNavigate={switchPage} onToast={pushToast} />}
              {page === 'applications' && <ApplicationsPage onNavigate={switchPage} />}
              {page === 'verification' && <VerificationPage onToast={pushToast} />}
              {page === 'documents' && <DocumentsPage onToast={pushToast} />}
              {page === 'jago' && <JagoPage lang={lang} />}
              {page === 'alerts' && <AlertsPage />}
            </>
          ) : (
            <>
              {page !== 'admin' && page !== 'beneficiaries' && <AdminHome onNavigate={switchPage} />}
              {page === 'admin' && <AdminHome onNavigate={switchPage} />}
              {page === 'beneficiaries' && <BeneficiariesPage onToast={pushToast} />}
            </>
          )}
        </div>
      </main>

      {toast && <div className="toast">✓ {toast}</div>}

      {jagoOpen && page !== 'jago' && (
        <button className="jago-float" onClick={() => switchPage('jago')}>
          <span>✦</span> JAGO
        </button>
      )}

      {showLogin && <LoginModal onClose={() => setShowLogin(false)} onContinue={() => { setShowLogin(false); pushToast('Demo login successful'); }} />}
    </div>
  );
}

function Sidebar({ page, setPage, role, setRole }) {
  const items = role === 'student' ? nav : adminNav;
  return (
    <aside className="sidebar">
      <div className="brand" onClick={() => setPage(role === 'student' ? 'dashboard' : 'admin')}>
        <div className="brand-mark">M</div>
        <div><b>MoTA</b><small>Scholarship</small></div>
      </div>

      <div className="portal-pill">{role === 'student' ? 'STUDENT PORTAL' : 'ADMIN PORTAL'}</div>

      <nav>
        {items.map(([id, icon, label]) => (
          <button key={id} className={page === id ? 'nav-item active' : 'nav-item'} onClick={() => setPage(id)}>
            <span className="nav-icon">{icon}</span><span>{label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <button className="switcher" onClick={() => { setRole(role === 'student' ? 'admin' : 'student'); setPage(role === 'student' ? 'admin' : 'dashboard'); }}>
          <span>⇄</span> Switch to {role === 'student' ? 'Admin Demo' : 'Student Demo'}
        </button>
        <div className="support-card">
          <div className="support-icon">?</div>
          <div><b>Need help?</b><span>Ask JAGO anytime.</span></div>
        </div>
      </div>
    </aside>
  );
}

function Topbar({ lang, setLang, role, onLogin, onJago, labels }) {
  return (
    <header className="topbar">
      <div className="crumb">{role === 'student' ? 'Student Home' : 'Administration'} <span>/</span> <b>{labels.jago ? (role === 'student' ? 'Scholarship Services' : 'Insights') : 'Scholarship Services'}</b></div>
      <div className="top-actions">
        <div className="lang-toggle">
          <button className={lang === 'en' ? 'selected' : ''} onClick={() => setLang('en')}>EN</button>
          <button className={lang === 'hi' ? 'selected' : ''} onClick={() => setLang('hi')}>हिं</button>
        </div>
        <button className="top-jago" onClick={onJago}>✦ {lang === 'en' ? 'JAGO' : 'JAGO'} </button>
        <button className="profile-chip" onClick={onLogin}><span className="avatar">A</span><span>Asha Kumari</span><span>⌄</span></button>
      </div>
    </header>
  );
}

function StudentDashboard({ lang, onNavigate, onToast }) {
  const t = lang === 'hi';
  return (
    <div className="page">
      <section className="hero-card">
        <div>
          <p className="eyebrow">UNIFIED SCHOLARSHIP JOURNEY</p>
          <h1>{t ? 'आपकी छात्रवृत्ति यात्रा, अब एक जगह।' : 'Your scholarship journey, in one place.'}</h1>
          <p>{t ? 'पात्रता देखें, आवेदन पूरा करें और हर चरण का स्टेटस ट्रैक करें।' : 'Discover eligibility, reuse verified documents and track every stage from application to DBT.'}</p>
          <div className="hero-actions">
            <button className="primary-btn" onClick={() => onNavigate('scholarships')}>Find My Scholarship <span>→</span></button>
            <button className="ghost-btn" onClick={() => onNavigate('verification')}>View Verification</button>
          </div>
        </div>
        <div className="hero-art">
          <div className="orbit orbit-a"></div><div className="orbit orbit-b"></div>
          <div className="hero-phone"><span>✓</span><b>Scholarship</b><small>Passport Ready</small></div>
          <div className="floating-tag tag-top">5 schemes</div>
          <div className="floating-tag tag-bottom">DBT tracked</div>
        </div>
      </section>

      <div className="kpi-grid">
        <Kpi icon="◈" value="5" label="MoTA Schemes" tone="blue" />
        <Kpi icon="✓" value="4/5" label="Documents Verified" tone="green" />
        <Kpi icon="↗" value="68%" label="Application Progress" tone="amber" />
        <Kpi icon="!" value="1" label="Action Required" tone="red" />
      </div>

      <section className="grid-2-1">
        <div className="panel">
          <SectionHead title="Your Scholarship Passport" action="View Passport" onAction={() => onNavigate('documents')} />
          <div className="passport-row">
            <div className="profile-avatar">AK</div>
            <div className="passport-main"><h3>Asha Kumari</h3><p>UG Student • Synthetic Demo Record</p><div className="verified-line"><span>✓ ST Verified</span><span>✓ Enrollment Verified</span><span>✓ Academic Record</span></div></div>
            <div className="passport-score"><b>92%</b><span>Profile Ready</span></div>
          </div>
          <div className="passport-bar"><span style={{ width: '92%' }}></span></div>
        </div>
        <div className="panel highlight-panel">
          <div className="mini-icon">✦</div>
          <p className="eyebrow">JAGO</p>
          <h3>{t ? 'आपका आवेदन क्यों लंबित है?' : 'Why is my application pending?'}</h3>
          <p>{t ? 'JAGO आपके सत्यापन डेटा को पढ़कर अगला कदम समझाता है।' : 'Get a student-specific explanation using your current application context.'}</p>
          <button className="dark-btn" onClick={() => onNavigate('jago')}>Ask JAGO →</button>
        </div>
      </section>

      <section className="panel">
        <SectionHead title="My Scholarships" action="View all" onAction={() => onNavigate('scholarships')} />
        <div className="scheme-grid">
          {schemes.map((s) => <SchemeCard key={s.id} scheme={s} onClick={() => onNavigate('scholarships')} />)}
        </div>
      </section>

      <section className="grid-2-1">
        <div className="panel">
          <SectionHead title="Current Application" action="Open Application" onAction={() => onNavigate('applications')} />
          <div className="application-head"><div><span className="status-chip warning">Needs Action</span><h3>{application.scheme}</h3><p>Application ID {application.id}</p></div><div className="progress-ring"><span>{application.progress}%</span></div></div>
          <div className="timeline-mini">
            {application.timeline.slice(0, 5).map((t) => <div key={t.label} className={`timeline-node ${t.state}`}><span></span><small>{t.label}</small></div>)}
          </div>
          <div className="action-box"><div><b>Next step</b><p>{application.nextAction}</p></div><button className="primary-btn small" onClick={() => onNavigate('verification')}>Resolve now</button></div>
        </div>
        <div className="panel alerts-panel">
          <SectionHead title="Latest Alerts" action="See all" onAction={() => onNavigate('alerts')} />
          {notifications.map((n) => <div className="alert-row" key={n.title}><span className={`alert-dot ${n.type}`}></span><div><b>{n.title}</b><small>{n.time}</small></div></div>)}
        </div>
      </section>
    </div>
  );
}

function ScholarshipsPage({ onNavigate, onToast }) {
  const [filter, setFilter] = useState('All');
  const filtered = filter === 'All' ? schemes : schemes.filter(s => s.status === filter);
  return (
    <div className="page">
      <PageHeader title="Find My Scholarship" desc="Explore all five MoTA schemes using your verified profile." />
      <div className="finder-card">
        <div className="finder-icon">✦</div>
        <div><p className="eyebrow">SMART ELIGIBILITY</p><h2>Which scholarship fits you?</h2><p>Your demo profile is pre-filled. The rule engine checks scheme conditions and explains the result.</p></div>
        <button className="primary-btn" onClick={() => onToast('Eligibility engine checked all 5 demo schemes.')}>Run Eligibility Check →</button>
      </div>
      <div className="filter-row">{['All', 'Eligible', 'Review', 'Explore'].map(f => <button key={f} className={filter === f ? 'filter-btn active' : 'filter-btn'} onClick={() => setFilter(f)}>{f}</button>)}</div>
      <div className="scheme-list-grid">{filtered.map(s => <LargeSchemeCard key={s.id} scheme={s} onApply={() => onNavigate('applications')} onToast={onToast} />)}</div>
    </div>
  );
}

function ApplicationsPage({ onNavigate }) {
  return (
    <div className="page">
      <PageHeader title="Application Tracker" desc="One timeline from submission to sanction and DBT." />
      <div className="panel application-card">
        <div className="application-top"><div><span className="status-chip warning">Needs Action</span><h2>{application.scheme}</h2><p>Application ID • {application.id}</p></div><div className="application-progress"><b>{application.progress}%</b><span>Complete</span></div></div>
        <div className="big-timeline">
          {application.timeline.map((t, i) => <div className={`big-node ${t.state}`} key={t.label}><div className="line"></div><div className="node-dot">{t.state === 'done' ? '✓' : t.state === 'warning' ? '!' : '•'}</div><div className="node-copy"><b>{t.label}</b><span>{t.date}</span></div></div>)}
        </div>
        <div className="explain-card"><div className="explain-icon">!</div><div><b>Why is this pending?</b><p>Income verification returned a mismatch in the demo data. Your application is not rejected.</p><button className="link-btn" onClick={() => onNavigate('verification')}>View mismatch & next action →</button></div></div>
      </div>
    </div>
  );
}

function VerificationPage({ onToast }) {
  const [resolved, setResolved] = useState(false);
  return (
    <div className="page">
      <PageHeader title="Unified Verification Center" desc="Routine checks are automated; exceptions are routed for action." />
      <div className="panel verification-summary"><div><p className="eyebrow">APPLICATION {application.id}</p><h2>Verification Health</h2><p>4 checks verified • 1 exception requiring action</p></div><div className="health-ring"><b>{resolved ? '100%' : '80%'}</b><span>verified</span></div></div>
      <div className="panel"><SectionHead title="Verification Checks" action="Adapter Map" onAction={() => onToast('Demo adapter map: Identity • ST • Income • Enrollment • Academic')} />
        <div className="verify-table">
          {verifications.map(v => <div className="verify-row" key={v.name}><div className="verify-name"><span className={`check-icon ${v.status === 'Mismatch' && !resolved ? 'bad' : 'good'}`}>{v.status === 'Mismatch' && !resolved ? '!' : '✓'}</span><div><b>{v.name}</b><small>{v.source}</small></div></div><span className={`status-chip ${v.status === 'Mismatch' && !resolved ? 'warning' : 'success'}`}>{v.status === 'Mismatch' && !resolved ? 'Mismatch' : 'Verified'}</span><button className="outline-btn" onClick={() => onToast(`${v.name}: ${v.status}`)}>Details</button></div>)}
        </div>
      </div>
      {!resolved ? <div className="mismatch-card"><div className="mismatch-icon">!</div><div className="mismatch-content"><p className="eyebrow">EXCEPTION DETECTED</p><h3>Income certificate mismatch</h3><p>Profile income and certificate income do not match in this synthetic demo record.</p><div className="mismatch-actions"><button className="primary-btn" onClick={() => { setResolved(true); onToast('Mismatch resolved in demo mode.'); }}>Resolve with Demo Fix</button><button className="ghost-btn" onClick={() => onToast('Manual review request created in demo mode.')}>Request Manual Review</button></div></div></div> : <div className="success-banner"><span>✓</span><div><b>Exception resolved</b><p>All demo verification checks are now green. The next stage is institution verification.</p></div></div>}
      <div className="prototype-note"><b>How this maps to production:</b> replace each mock adapter with an authorized API/connector; keep the same normalized verification response contract.</div>
    </div>
  );
}

function DocumentsPage({ onToast }) {
  return (
    <div className="page">
      <PageHeader title="Digital Document Wallet" desc="Reuse verified documents instead of repeatedly uploading the same files." />
      <div className="wallet-hero"><div className="wallet-badge">▣</div><div><p className="eyebrow">SCHOLARSHIP PASSPORT</p><h2>5 document checks • 4 verified</h2><p>Prototype: synthetic records with a DigiLocker-style connector placeholder.</p></div><button className="primary-btn" onClick={() => onToast('DigiLocker demo connector opened.')}>Connect DigiLocker</button></div>
      <div className="document-grid">{documents.map(d => <div className="document-card" key={d.name}><div className="doc-icon">▤</div><div className="doc-info"><b>{d.name}</b><span>{d.source}</span><small>{d.meta}</small></div><span className={`status-chip ${d.status === 'Verified' ? 'success' : 'warning'}`}>{d.status}</span><button className="outline-btn" onClick={() => onToast(`${d.name}: ${d.status}`)}>{d.status === 'Verified' ? 'Reuse' : 'Fix'}</button></div>)}</div>
    </div>
  );
}

function JagoPage({ lang }) {
  return <JagoChat lang={lang} fullPage />;
}

function JagoChat({ lang, fullPage = false }) {
  const [messages, setMessages] = useState([
    { from: 'bot', text: lang === 'hi' ? 'नमस्ते आशा! मैं JAGO हूँ। छात्रवृत्ति पात्रता, दस्तावेज़, आवेदन स्थिति या भुगतान के बारे में पूछें।' : 'Hi Asha! I’m JAGO. Ask me about eligibility, documents, application status or payment.' }
  ]);
  const [input, setInput] = useState('');
  const quick = lang === 'hi'
    ? ['मेरा आवेदन लंबित क्यों है?', 'अगला कदम क्या है?', 'कौन से दस्तावेज़ चाहिए?']
    : ['Why is my application pending?', 'What should I do next?', 'Which documents are required?'];

  const answer = (q) => {
    const lower = q.toLowerCase();
    if (lower.includes('pending') || lower.includes('लंबित')) return lang === 'hi'
      ? 'आपका आवेदन आय सत्यापन पर लंबित है। सिस्टम ने आय प्रमाणपत्र में mismatch पाया है। आवेदन अस्वीकृत नहीं हुआ है। सुधारित प्रमाणपत्र अपलोड करें या Manual Review चुनें।'
      : 'Your application is pending at income verification. A mismatch was detected in the income certificate. Your application is not rejected. Upload the corrected certificate or request Manual Review.';
    if (lower.includes('next') || lower.includes('अगला')) return lang === 'hi'
      ? 'अगला कदम: आय प्रमाणपत्र mismatch को resolve करें। ST status, enrollment और academic record पहले ही verified हैं।'
      : 'Next step: resolve the income-certificate mismatch. Your ST status, enrollment and academic record are already verified.';
    if (lower.includes('document') || lower.includes('दस्तावेज़')) return lang === 'hi'
      ? 'आपके demo application में ST Certificate, Income Certificate, Academic Record, Enrollment और Domicile Certificate उपयोग हो रहे हैं। Verified documents को दोबारा इस्तेमाल किया जा सकता है।'
      : 'Your demo application uses ST Certificate, Income Certificate, Academic Record, Enrollment and Domicile Certificate. Verified documents can be reused.';
    if (lower.includes('eligible') || lower.includes('पात्र')) return lang === 'hi'
      ? 'आपका demo profile Post-Matric Scholarship के configured rules से match करता है। अंतिम eligibility authorized verification और scheme rules पर निर्भर करेगी।'
      : 'Your demo profile matches the configured rules for Post-Matric Scholarship. Final eligibility would depend on authorized verification and applicable scheme rules.';
    if (lower.includes('payment') || lower.includes('भुगतान')) return lang === 'hi'
      ? 'DBT status अभी “Pending after verification” है। Verification complete होने के बाद sanction और DBT stages आगे बढ़ेंगी।'
      : 'DBT status is currently “Pending after verification”. After verification, the application can move through sanction and DBT stages.';
    return lang === 'hi'
      ? 'मैं पात्रता, आवेदन स्थिति, दस्तावेज़, mismatch और अगले कदम पर मदद कर सकता हूँ।'
      : 'I can help with eligibility, application status, documents, verification mismatches and next steps.';
  };

  const send = (text = input) => {
    const clean = text.trim();
    if (!clean) return;
    setMessages(prev => [...prev, { from: 'user', text: clean }, { from: 'bot', text: answer(clean) }]);
    setInput('');
  };

  return (
    <div className={fullPage ? 'page jago-page' : 'jago-popover'}>
      {fullPage && <PageHeader title="JAGO AI Assistant" desc="Personalized scholarship guidance in English & Hindi — powered by prototype student context." />}
      <div className="jago-layout">
        <div className="jago-intro"><div className="jago-symbol">✦</div><p className="eyebrow">JAGO / PROTOTYPE</p><h2>{lang === 'hi' ? 'सवाल पूछिए। अगला कदम समझिए।' : 'Ask a question. Know your next step.'}</h2><p>{lang === 'hi' ? 'JAGO demo application और verification context के आधार पर जवाब देता है।' : 'This prototype JAGO uses the demo application and verification context to give student-specific answers.'}</p><div className="jago-points"><span>✓ English + Hindi</span><span>✓ Student-specific context</span><span>✓ Next-action guidance</span></div></div>
        <div className="jago-chat card-shadow">
          <div className="chat-head"><div className="chat-avatar">✦</div><div><b>JAGO</b><span>Scholarship Assistant • Online</span></div><span className="online-dot"></span></div>
          <div className="chat-body">{messages.map((m, i) => <div key={i} className={`chat-bubble ${m.from}`}>{m.text}</div>)}<div className="quick-prompts">{quick.map(q => <button key={q} onClick={() => send(q)}>{q}</button>)}</div></div>
          <div className="chat-input"><input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} placeholder={lang === 'hi' ? 'अपना सवाल लिखें…' : 'Type your question…'} /><button onClick={() => send()}>→</button></div>
        </div>
      </div>
      <div className="prototype-note"><b>Demo note:</b> This chatbot is a frontend prototype. Production JAGO integration should use an authorized MoTA interface and verified backend application data.</div>
    </div>
  );
}

function AlertsPage() {
  return <div className="page"><PageHeader title="Notifications" desc="Action alerts so no important milestone is missed." /><div className="panel notification-list">{notifications.concat([{ title: 'DBT milestone will appear here after sanction', time: 'Demo', type: 'info' }]).map(n => <div className="notification-card" key={n.title}><span className={`alert-dot ${n.type}`}></span><div><b>{n.title}</b><p>{n.type === 'warning' ? 'Review the highlighted action to keep your application moving.' : 'This notification is part of the prototype workflow.'}</p></div><small>{n.time}</small></div>)}</div></div>;
}

function AdminHome({ onNavigate }) {
  return (
    <div className="page">
      <PageHeader title="Government & Institution Insights" desc="A unified monitoring view across applications, exceptions, sanctions and beneficiary gaps." />
      <div className="kpi-grid admin-kpis"><Kpi icon="◫" value="1,248" label="Applications" tone="blue" /><Kpi icon="✓" value="876" label="Verified" tone="green" /><Kpi icon="!" value="92" label="Exceptions" tone="red" /><Kpi icon="◎" value="137" label="Potential Unreached" tone="amber" /></div>
      <div className="grid-2-1"><div className="panel"><SectionHead title="Processing Overview" action="View exceptions" onAction={() => onNavigate('beneficiaries')} /><div className="bars"><Bar label="Submitted" value={88} /><Bar label="Verification" value={71} /><Bar label="Institution Review" value={55} /><Bar label="Sanction" value={38} /></div></div><div className="panel highlight-panel"><div className="mini-icon">◎</div><p className="eyebrow">PROACTIVE COVERAGE</p><h3>Potentially unreached students</h3><p>Use matching signals from enrollment + scholarship records to prepare an outreach list.</p><button className="dark-btn" onClick={() => onNavigate('beneficiaries')}>Open Discovery →</button></div></div>
      <div className="panel"><SectionHead title="Recent Exceptions" action="Open verification" onAction={() => onNavigate('beneficiaries')} />{['Income mismatch • 32 cases', 'Institution record not found • 11 cases', 'Expired document • 8 cases'].map(x => <div className="exception-row" key={x}><span className="alert-dot warning"></span><b>{x}</b><span>Manual review</span></div>)}</div>
    </div>
  );
}

function BeneficiariesPage({ onToast }) {
  const [contacted, setContacted] = useState([]);
  return <div className="page"><PageHeader title="Unreached Student Discovery" desc="Prototype matching of enrollment and scholarship signals to identify potential benefit gaps." /><div className="panel"><div className="match-banner"><div><p className="eyebrow">MATCH ENGINE</p><h2>Potentially eligible • not receiving</h2><p>Demo-only records — use for the SIH walkthrough.</p></div><button className="primary-btn" onClick={() => onToast('Matching complete: 2 priority outreach records found.')}>Run Matching →</button></div><div className="beneficiary-table"><div className="table-head"><span>Student</span><span>Institution</span><span>Scheme</span><span>Match</span><span>Action</span></div>{unreached.map(u => <div className="table-row" key={u.id}><div><b>{u.name}</b><small>{u.id}</small></div><span>{u.institution}</span><span className="scheme-pill">{u.scheme}</span><span>{u.match}</span><button className={contacted.includes(u.id) ? 'outline-btn done' : 'outline-btn'} onClick={() => { setContacted(c => c.includes(u.id) ? c : [...c, u.id]); onToast(`${u.name} added to outreach list.`); }}>{contacted.includes(u.id) ? 'Added ✓' : u.receiving ? 'View' : 'Outreach'}</button></div>)}</div></div></div>;
}

function LargeSchemeCard({ scheme, onApply, onToast }) {
  return <div className={`large-scheme-card tone-${scheme.tone}`}><div className="scheme-top"><div className="scheme-icon">{scheme.icon}</div><span className={`status-chip ${scheme.status === 'Eligible' ? 'success' : scheme.status === 'Review' ? 'warning' : 'neutral'}`}>{scheme.status}</span></div><p className="eyebrow">{scheme.level}</p><h3>{scheme.title}</h3><p>{scheme.description}</p><div className="scheme-actions"><button className="ghost-btn" onClick={() => onToast(`Eligibility details opened for ${scheme.short}.`)}>View criteria</button><button className="primary-btn small" onClick={onApply}>{scheme.status === 'Eligible' ? 'Start Application' : 'Explore'} →</button></div></div>;
}

function SchemeCard({ scheme, onClick }) {
  return <button className="scheme-card" onClick={onClick}><div className={`scheme-icon tone-${scheme.tone}`}>{scheme.icon}</div><div><b>{scheme.short}</b><span>{scheme.status}</span></div><span className="arrow">→</span></button>;
}

function Kpi({ icon, value, label, tone }) {
  return <div className="kpi"><div className={`kpi-icon ${tone}`}>{icon}</div><div><b>{value}</b><span>{label}</span></div></div>;
}

function SectionHead({ title, action, onAction }) { return <div className="section-head"><h3>{title}</h3>{action && <button className="link-btn" onClick={onAction}>{action} →</button>}</div>; }
function PageHeader({ title, desc }) { return <div className="page-header"><div><p className="eyebrow">MOTA SCHOLARSHIP PLATFORM</p><h1>{title}</h1><p>{desc}</p></div><span className="header-badge">● Prototype Live</span></div>; }
function Bar({ label, value }) { return <div className="bar-row"><span>{label}</span><div className="bar-track"><i style={{ width: `${value}%` }}></i></div><b>{value}%</b></div>; }

function LoginModal({ onClose, onContinue }) {
  return <div className="modal-backdrop"><div className="modal"><button className="close-btn" onClick={onClose}>×</button><div className="modal-logo">M</div><p className="eyebrow">DEMO LOGIN</p><h2>Welcome to MoTA Scholarship</h2><p>Use the synthetic demo student to explore the prototype.</p><label>Mobile / Student ID<input defaultValue="9876543210" /></label><button className="primary-btn full" onClick={onContinue}>Continue to Demo →</button><small>Prototype only • No real OTP is sent.</small></div></div>;
}

export default App;
