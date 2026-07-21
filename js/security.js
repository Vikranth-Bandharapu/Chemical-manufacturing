// Smart Security Dashboard Interactivity

// Inject Lockdown CSS
const style = document.createElement('style');
style.textContent = `
    body.lockdown-active {
        animation: emergency-flash 2s infinite;
        overflow: hidden;
    }
    @keyframes emergency-flash {
        0%, 100% { background-color: #f8f9fa; }
        50% { background-color: rgba(220, 53, 69, 0.1); }
    }
    body.lockdown-active .glass-panel {
        border-color: rgba(220, 53, 69, 0.5);
    }
    #lockdown-overlay {
        position: fixed;
        top: 0; left: 0; right: 0; bottom: 0;
        background: rgba(220, 53, 69, 0.95);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        animation: overlay-fade-in 0.3s;
    }
    @keyframes overlay-fade-in {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    .log-entry {
        animation: slide-in 0.3s ease-out forwards;
    }
    @keyframes slide-in {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Live UTC Clock
    const clockElements = document.querySelectorAll('.live-clock');
    
    function updateClocks() {
        const now = new Date();
        const timeString = now.toISOString().substring(11, 19) + 'Z';
        clockElements.forEach(el => {
            el.textContent = timeString;
        });
    }
    
    if (clockElements.length > 0) {
        updateClocks();
        setInterval(updateClocks, 1000);
    }

    // 2. Lockdown Protocol
    const lockdownBtns = document.querySelectorAll('.btn-lockdown');
    
    lockdownBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            toggleLockdown();
        });
    });

    function toggleLockdown() {
        const body = document.body;
        const isLockdown = body.classList.contains('lockdown-active');
        
        if (isLockdown) {
            body.classList.remove('lockdown-active');
            const overlay = document.getElementById('lockdown-overlay');
            if (overlay) overlay.remove();
        } else {
            body.classList.add('lockdown-active');
            
            // Create full screen emergency overlay
            const overlay = document.createElement('div');
            overlay.id = 'lockdown-overlay';
            overlay.innerHTML = `
                <div class="lockdown-content text-center">
                    <i class="fa-solid fa-triangle-exclamation fa-5x mb-3"></i>
                    <h1 class="display-3 fw-bold security-font">SYSTEM LOCKDOWN</h1>
                    <p class="lead security-font">EMERGENCY PROTOCOL ENGAGED. ALL SECTORS SEALED.</p>
                    <button class="btn btn-outline-light btn-lg mt-4 security-font btn-lockdown-cancel">OVERRIDE (AUTHORIZATION REQUIRED)</button>
                </div>
            `;
            document.body.appendChild(overlay);
            
            document.querySelector('.btn-lockdown-cancel').addEventListener('click', toggleLockdown);
        }
    }

    // 3. Live Data Simulation - Admin Access Logs
    const logFeed = document.getElementById('log-feed-container');
    if (logFeed) {
        const events = ['AUTH_SUCCESS', 'AUTH_FAILED', 'SYS_WARNING', 'NODE_SYNC'];
        const users = ['S_JENKINS', 'M_WEBER', 'L_CHEN', 'UNKNOWN_IP', 'SYSTEM'];
        const locations = ['(NY)', '(Frankfurt)', '(Internal)', '(External)'];

        setInterval(() => {
            const eventType = events[Math.floor(Math.random() * events.length)];
            const user = users[Math.floor(Math.random() * users.length)];
            const loc = locations[Math.floor(Math.random() * locations.length)];
            const time = new Date().toISOString().substring(11, 19) + 'Z';
            
            let color = 'text-info';
            if (eventType === 'AUTH_SUCCESS') color = 'text-success';
            if (eventType === 'AUTH_FAILED' || eventType === 'SYS_WARNING') color = 'text-danger';

            const newLog = document.createElement('div');
            newLog.className = 'mb-3 pb-3 border-bottom border-light log-entry';
            newLog.innerHTML = `
                <div class="d-flex justify-content-between">
                    <span class="security-font ${color} small fw-bold">${eventType}</span>
                    <span class="security-font text-muted small">${time}</span>
                </div>
                <div class="text-dark small mt-1">UID: ${user} <span class="text-muted">| LOC: ${loc}</span></div>
            `;
            
            logFeed.prepend(newLog);
            
            // Keep only last 10 logs
            if (logFeed.children.length > 10) {
                logFeed.removeChild(logFeed.lastChild);
            }
        }, 3500); // New log every 3.5 seconds
    }

    // 4. Live Data Simulation - Manager Telemetry
    const yieldMetric = document.getElementById('live-yield');
    if (yieldMetric) {
        let currentYield = 94.2;
        setInterval(() => {
            // Fluctuate between -0.5 and +0.5
            const fluctuation = (Math.random() - 0.5) * 1.0;
            currentYield = Math.min(100, Math.max(85, currentYield + fluctuation));
            yieldMetric.innerHTML = currentYield.toFixed(1) + '%';
        }, 2000);
    }
});
