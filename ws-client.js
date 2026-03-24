// ws-client.js — WebSocket client untuk Noctyra Games
// Ganti URL sesuai server Pterodactyl kamu
const WS_URL = 'wss://panelsaluler.jhonaley.net:2066';

class NoctyraWS {
  constructor() {
    this.ws = null;
    this.roomCode = null;
    this.playerId = null;
    this.onSync = null;    // callback saat state berubah
    this.onToast = null;   // callback toast notif
    this.onStroke = null;  // callback stroke (skribbl)
    this.onChat = null;    // callback chat (skribbl)
    this.onClear = null;   // callback clear canvas
    this.onError = null;   // callback error
    this._reconnectTimer = null;
    this._dead = false;
  }

  connect(onReady) {
    if (this.ws) this.ws.close();
    this.ws = new WebSocket(WS_URL);

    this.ws.onopen = () => {
      console.log('[WS] Connected');
      if (this._reconnectTimer) clearTimeout(this._reconnectTimer);
      if (onReady) onReady();
    };

    this.ws.onmessage = (e) => {
      let msg;
      try { msg = JSON.parse(e.data); } catch { return; }
      this._handleMessage(msg);
    };

    this.ws.onclose = () => {
      if (this._dead) return;
      console.log('[WS] Disconnected, reconnecting...');
      this._reconnectTimer = setTimeout(() => this.connect(), 3000);
    };

    this.ws.onerror = () => {
      if (this.onError) this.onError('Koneksi server gagal');
    };
  }

  _handleMessage(msg) {
    switch (msg.type) {
      case 'sync':
        if (this.onSync) this.onSync(msg.room, msg.private);
        break;
      case 'stroke':
        if (this.onStroke) this.onStroke(msg.stroke);
        break;
      case 'clearCanvas':
        if (this.onClear) this.onClear();
        break;
      case 'chat':
        if (this.onChat) this.onChat(msg.entry);
        break;
      case 'toast':
        if (this.onToast) this.onToast(msg.msg);
        break;
      case 'joined':
        this.playerId = msg.playerId;
        this.roomCode = msg.code;
        break;
      case 'created':
        this.roomCode = msg.code;
        break;
      case 'error':
        if (this.onError) this.onError(msg.msg);
        break;
    }
  }

  send(type, payload = {}) {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) return;
    this.ws.send(JSON.stringify({ type, payload }));
  }

  create(game, name) { this.send('create', { game, name }); }
  join(code, name)   { this.send('join',   { code, name }); }
  leave()            { this.send('leave'); this._dead = true; if (this.ws) this.ws.close(); }
  action(action, extra = {}) { this.send('action', { action, ...extra }); }

  destroy() {
    this._dead = true;
    if (this._reconnectTimer) clearTimeout(this._reconnectTimer);
    if (this.ws) { this.ws.onclose = null; this.ws.close(); }
    this.ws = null;
  }
}
