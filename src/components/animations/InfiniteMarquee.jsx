import React from 'react';

export default function InfiniteMarquee({
  items = [],
  speed = '25s',
  direction = 'left',
  className = '',
}) {
  const doubledItems = [...items, ...items, ...items, ...items];

  return (
    <div className={`marquee-container ${direction} ${className}`} style={{ '--marquee-speed': speed }}>
      <div className="marquee-track">
        {doubledItems.map((item, idx) => (
          <div key={idx} className="marquee-item font-mono">
            {item}
            <span className="marquee-dot" />
          </div>
        ))}
      </div>
      <div className="marquee-track" aria-hidden="true">
        {doubledItems.map((item, idx) => (
          <div key={`dup-${idx}`} className="marquee-item font-mono">
            {item}
            <span className="marquee-dot" />
          </div>
        ))}
      </div>
    </div>
  );
}
