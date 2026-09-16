const text = { fontFamily: 'Inter, sans-serif', fontSize: 15.5, fontWeight: 600 } as const;

export function Flywheel() {
  return (
    <section className="shell section" aria-labelledby="flywheel-h">
      <div className="sec-head">
        <p className="microlabel green">How WizGrowth works</p>
        <h2 id="flywheel-h">
          Grow brands. Grow <span className="fx">people.</span>
        </h2>
        <p className="intent">
          The agency runs growth as a craft for clients. The academy teaches that same craft from
          live, current work — not recycled theory. Each side is proof of the other.
        </p>
      </div>
      <div
        className="exhibit"
        style={{
          background: 'var(--white)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--r-l)',
          padding: 30,
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <div className="fly-mobile">
          <div className="fm-step" style={{ background: 'var(--paper-muted)', color: 'var(--ink)' }}>
            Agency runs real campaigns
          </div>
          <div className="fm-arrow">↓</div>
          <div className="fm-step" style={{ background: 'var(--forest)', color: 'var(--paper-hi)' }}>
            Results become proof + playbooks
          </div>
          <div className="fm-arrow">↓</div>
          <div className="fm-step" style={{ background: 'var(--marigold)', color: 'var(--ink)' }}>
            Academy teaches from live work
          </div>
          <div className="fm-arrow">↓</div>
          <div className="fm-step" style={{ background: 'var(--ink)', color: 'var(--paper)' }}>
            Talent + community
          </div>
          <div className="fm-loop">
            …which feeds hiring, referrals and credibility back into the agency ↺
          </div>
        </div>
        <div className="fly-scroll">
          <svg
            viewBox="0 0 960 190"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="The WizGrowth flywheel: agency work creates proof and playbooks, which power the academy curriculum, which produces trained talent and community, which strengthens the agency."
            style={{ display: 'block', width: '100%', minWidth: 640, height: 'auto' }}
          >
            <rect x="8" y="52" width="200" height="76" rx="16" fill="#EBE2CC" />
            <text x="108" y="84" textAnchor="middle" fill="#14191F" {...text}>
              Agency runs
            </text>
            <text x="108" y="106" textAnchor="middle" fill="#14191F" {...text}>
              real campaigns
            </text>
            <path d="M216 90 h44" stroke="#0F5C42" strokeWidth="2.5" />
            <circle cx="262" cy="90" r="4.5" fill="#0F5C42" />
            <rect x="276" y="52" width="200" height="76" rx="16" fill="#0F5C42" />
            <text x="376" y="84" textAnchor="middle" fill="#FBF4DF" {...text}>
              Results become
            </text>
            <text x="376" y="106" textAnchor="middle" fill="#FBF4DF" {...text}>
              proof + playbooks
            </text>
            <path d="M484 90 h44" stroke="#0F5C42" strokeWidth="2.5" />
            <circle cx="530" cy="90" r="4.5" fill="#0F5C42" />
            <rect x="544" y="52" width="200" height="76" rx="16" fill="#F5A623" />
            <text x="644" y="84" textAnchor="middle" fill="#14191F" {...text}>
              Academy teaches
            </text>
            <text x="644" y="106" textAnchor="middle" fill="#14191F" {...text}>
              from live work
            </text>
            <path d="M752 90 h44" stroke="#0F5C42" strokeWidth="2.5" />
            <circle cx="798" cy="90" r="4.5" fill="#0F5C42" />
            <rect x="812" y="52" width="140" height="76" rx="16" fill="#14191F" />
            <text x="882" y="84" textAnchor="middle" fill="#F2EAD8" {...text}>
              Talent +
            </text>
            <text x="882" y="106" textAnchor="middle" fill="#F2EAD8" {...text}>
              community
            </text>
            <path
              d="M882 132 v28 H108 v-28"
              stroke="#C2B695"
              strokeWidth="2"
              strokeDasharray="5 6"
              fill="none"
            />
            <text
              x="495"
              y="178"
              textAnchor="middle"
              fontFamily="Inter, sans-serif"
              fontSize="13"
              fill="#6B6258"
            >
              …which feeds hiring, referrals, and credibility back into the agency
            </text>
          </svg>
        </div>
        <p className="cap" style={{ fontSize: 14.5, color: 'var(--ink-muted)', marginTop: 18 }}>
          The flywheel, in one line: we grow brands, and we grow the people who grow brands.
        </p>
      </div>
    </section>
  );
}
