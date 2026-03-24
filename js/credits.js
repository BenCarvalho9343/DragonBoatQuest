const Credits = {
  open: false,
  scrollY: 0,
  scrollSpeed: 30,
  autoScroll: true,

  toggle() {
    this.open = !this.open;
    if (this.open) this.scrollY = 0;
  },

  close() {
    this.open = false;
    this.scrollY = 0;
  },

  update(deltaTime) {
    if (!this.open) return;
    if (this.autoScroll) this.scrollY += this.scrollSpeed * deltaTime;
  },

  handleKey(key) {
    if (!this.open) return;
    if (key === 'ArrowDown') this.scrollY += 20;
    if (key === 'ArrowUp') this.scrollY = Math.max(0, this.scrollY - 20);
    if (key === 'Escape' || key === ' ') this.close();
    if (key === 'a' || key === 'A') this.autoScroll = !this.autoScroll;
  },

  draw(ctx) {
    if (!this.open) return;

    ctx.fillStyle = '#050510';
    ctx.fillRect(0, 0, 480, 432);

    for (let i = 0; i < 40; i++) {
      ctx.fillStyle = 'rgba(255,255,255,' + (0.2 + (i % 5) * 0.1) + ')';
      ctx.fillRect((i * 73) % 460 + 10, (i * 47) % 420 + 5, 1, 1);
    }

    ctx.fillStyle = '#f0c040';
    ctx.font = 'bold 14px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('DRAGON BOAT QUEST', 240, 30);
    ctx.fillStyle = '#555';
    ctx.font = '8px monospace';
    ctx.fillText('Credits', 240, 44);

    ctx.save();
    ctx.beginPath();
    ctx.rect(0, 52, 480, 368);
    ctx.clip();

    const sections = [
      { type: 'gap' },
      { type: 'heading', text: 'DEVELOPED BY' },
      { type: 'name', text: 'Ben Carvalho',
        sub: 'Secklow Hundred Dragon Boat Club' },
      { type: 'gap' },
      { type: 'heading', text: 'SECKLOW HUNDRED' },
      { type: 'sub', text: 'Milton Keynes, England' },
      { type: 'gap' },
      { type: 'heading', text: 'CREW' },
      { type: 'credit', left: 'Lesley',  right: 'Striker' },
      { type: 'credit', left: 'Marcus',  right: 'Engine' },
      { type: 'credit', left: 'Todd',    right: 'Engine' },
      { type: 'credit', left: 'Dan',     right: 'Anchor' },
      { type: 'credit', left: 'Naomi',   right: 'Engine' },
      { type: 'credit', left: 'Tom',     right: 'Engine' },
      { type: 'credit', left: 'Rachel',  right: 'Striker' },
      { type: 'credit', left: 'Jason',   right: 'Engine' },
      { type: 'credit', left: 'Ben',     right: 'Engine / Developer' },
      { type: 'credit', left: 'Brendan', right: 'Anchor' },
      { type: 'credit', left: 'Marlee',  right: 'Engine' },
      { type: 'credit', left: 'Amelia',  right: 'Engine' },
      { type: 'credit', left: 'Liz',     right: 'Drummer' },
      { type: 'credit', left: 'Steve',   right: 'Sweep' },
      { type: 'gap' },
      { type: 'heading', text: 'CHARACTERS' },
      { type: 'name', text: 'Coach Tim',
        sub: 'Based on no one in particular' },
      { type: 'name', text: 'Ada',
        sub: 'Soaring Dragons — real paddler, real legend' },
      { type: 'gap' },
      { type: 'heading', text: 'RIVAL CLUBS' },
      { type: 'name', text: 'Soaring Dragons',         sub: 'Loughborough' },
      { type: 'name', text: 'Notts Anaconda',           sub: 'Nottingham' },
      { type: 'name', text: 'St Neots Dragon Boat Trust', sub: 'St Neots' },
      { type: 'name', text: 'Powerhouse Dragons',       sub: 'Middlesbrough' },
      { type: 'name', text: 'Amathus',                  sub: 'Liverpool' },
      { type: 'name', text: 'Thames Valley Dragons',    sub: 'London' },
      { type: 'gap' },
      { type: 'heading', text: 'INTERNATIONAL RIVALS' },
      { type: 'name', text: 'Fire Dragons',    sub: 'Duisburg, Germany' },
      { type: 'name', text: 'CGCSA Dragons',   sub: 'Hong Kong' },
      { type: 'name', text: 'Viking Dragons',  sub: 'Norway' },
      { type: 'name', text: 'Paddle Power',    sub: 'Canada' },
      { type: 'name', text: 'Golden Dragons',  sub: 'Australia' },
      { type: 'gap' },
      { type: 'heading', text: 'MUSIC' },
      { type: 'name', text: 'Royalty Free Music', sub: 'OpenGameArt.org' },
      { type: 'gap' },
      { type: 'heading', text: 'BUILT WITH' },
      { type: 'name', text: 'HTML5 Canvas', sub: 'No engine — pure JavaScript' },
      { type: 'name', text: 'Electron',     sub: 'Desktop packaging' },
      { type: 'gap' },
      { type: 'heading', text: 'THANK YOU' },
      { type: 'para', text: 'To everyone at Secklow Hundred who' },
      { type: 'para', text: 'played, tested, and gave feedback.' },
      { type: 'para', text: 'To the BDA and all the clubs who' },
      { type: 'para', text: 'make British dragon boating great.' },
      { type: 'gap' },
      { type: 'gap' },
      { type: 'name', text: 'SECKLOW HUNDRED',
        sub: 'National League Champions' },
      { type: 'gap' },
      { type: 'gap' },
    ];

    let y = 70 - this.scrollY;
    const lineH = 22;

    sections.forEach(s => {
      if (s.type === 'gap') { y += lineH; return; }
      if (s.type === 'heading') {
        ctx.fillStyle = '#f0c040';
        ctx.font = 'bold 10px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(s.text, 240, y);
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(120, y + 4);
        ctx.lineTo(360, y + 4);
        ctx.stroke();
        y += lineH;
        return;
      }
      if (s.type === 'name') {
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 10px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(s.text, 240, y);
        if (s.sub) {
          ctx.fillStyle = '#666';
          ctx.font = '8px monospace';
          ctx.fillText(s.sub, 240, y + 12);
          y += 8;
        }
        y += lineH;
        return;
      }
      if (s.type === 'sub') {
        ctx.fillStyle = '#555';
        ctx.font = '8px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(s.text, 240, y);
        y += lineH - 6;
        return;
      }
      if (s.type === 'credit') {
        ctx.fillStyle = '#aaaaaa';
        ctx.font = '9px monospace';
        ctx.textAlign = 'right';
        ctx.fillText(s.left, 220, y);
        ctx.fillStyle = '#555';
        ctx.fillText('--', 232, y);
        ctx.fillStyle = '#666';
        ctx.textAlign = 'left';
        ctx.fillText(s.right, 244, y);
        y += lineH - 4;
        return;
      }
      if (s.type === 'para') {
        ctx.fillStyle = '#555';
        ctx.font = '8px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(s.text, 240, y);
        y += lineH - 6;
        return;
      }
    });

    ctx.restore();

    const fadeTop = ctx.createLinearGradient(0, 52, 0, 90);
    fadeTop.addColorStop(0, '#050510');
    fadeTop.addColorStop(1, 'rgba(5,5,16,0)');
    ctx.fillStyle = fadeTop;
    ctx.fillRect(0, 52, 480, 38);

    const fadeBot = ctx.createLinearGradient(0, 380, 0, 420);
    fadeBot.addColorStop(0, 'rgba(5,5,16,0)');
    fadeBot.addColorStop(1, '#050510');
    ctx.fillStyle = fadeBot;
    ctx.fillRect(0, 380, 480, 40);

    ctx.fillStyle = '#333';
    ctx.font = '7px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('[ up/down ] scroll    [ A ] auto-scroll    [ Space ] close',
      240, 424);
  },
};