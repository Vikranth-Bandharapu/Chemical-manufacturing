const fs = require('fs');
const path = require('path');

function addContent(filename, isEmployee) {
    const filePath = path.join(__dirname, filename);
    if (!fs.existsSync(filePath)) return;
    
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Find the end of the overview tab.
    // In both files, there is an overview tab that ends with a </div> before the next tab.
    // Let's just look for <!-- Tab: Tracking (mapped from tab-sites) --> or similar.
    
    let newContent = '';
    
    if (isEmployee) {
        newContent = `
                <!-- Added Content per Request -->
                <div style="margin-top: 2rem;">
                    <h3 class="security-font mb-3 text-blue border-bottom border-orange pb-2 d-inline-block">Company Announcements & Compliance Updates</h3>
                    <div class="row g-4 mt-2">
                        <div class="col-md-6">
                            <div class="glass-panel h-100" style="border-left: 4px solid #10b981;">
                                <h5 class="fw-bold"><i class="fa-solid fa-bullhorn text-success me-2"></i> Q3 Safety Protocols Update</h5>
                                <p class="text-muted small mb-2">Effective Oct 1st, 2026</p>
                                <p class="mb-0 fs-6">All personnel must complete the newly updated hazardous materials handling certification module on the learning portal before the end of the quarter. Failure to comply will result in temporary suspension of lab access.</p>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="glass-panel h-100" style="border-left: 4px solid var(--clr-orange);">
                                <h5 class="fw-bold"><i class="fa-solid fa-award text-orange me-2"></i> Chemco Innovation Award</h5>
                                <p class="text-muted small mb-2">Nominations Open</p>
                                <p class="mb-0 fs-6">We are now accepting nominations for the annual innovation award. If your team has implemented a process improvement that saved time or reduced waste, please submit your project summary to the committee.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div style="margin-top: 2rem;">
                    <h3 class="security-font mb-3 text-blue border-bottom border-orange pb-2 d-inline-block">Quick Resource Links</h3>
                    <div class="d-flex flex-wrap gap-3 mt-2">
                        <a href="404.html" class="btn btn-outline-secondary px-4 py-2"><i class="fa-solid fa-file-pdf me-2"></i> Employee Handbook</a>
                        <a href="404.html" class="btn btn-outline-secondary px-4 py-2"><i class="fa-solid fa-notes-medical me-2"></i> Benefits Portal</a>
                        <a href="404.html" class="btn btn-outline-secondary px-4 py-2"><i class="fa-solid fa-calendar-check me-2"></i> Leave Request</a>
                        <a href="404.html" class="btn btn-outline-secondary px-4 py-2"><i class="fa-solid fa-headset me-2"></i> IT Support Ticket</a>
                    </div>
                </div>
`;
        // Append before <!-- Tab: Tasks -->
        content = content.replace(/<!-- Tab: Tasks -->/, newContent + '\n            <!-- Tab: Tasks -->');
        
    } else {
        newContent = `
                <!-- Added Content per Request -->
                <div style="margin-top: 2rem;">
                    <h2 class="text-gradient" style="margin-bottom: 1.5rem;">Global Supply Chain Pulse</h2>
                    <div class="stats-grid" style="grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));">
                        <div class="glass-card" style="padding: 1.5rem; border-left: 3px solid #0dcaf0;">
                            <div style="font-size: 0.9rem; color: rgba(255,255,255,0.7);">Raw Material Inbound</div>
                            <div style="font-size: 1.5rem; font-weight: bold; margin-top: 0.5rem;">12,450 T</div>
                            <div style="font-size: 0.8rem; color: #10b981; margin-top: 0.5rem;"><i class="fa-solid fa-arrow-trend-up"></i> +4.2% vs Last Week</div>
                        </div>
                        <div class="glass-card" style="padding: 1.5rem; border-left: 3px solid #10b981;">
                            <div style="font-size: 0.9rem; color: rgba(255,255,255,0.7);">Production Yield</div>
                            <div style="font-size: 1.5rem; font-weight: bold; margin-top: 0.5rem;">98.7%</div>
                            <div style="font-size: 0.8rem; color: #10b981; margin-top: 0.5rem;"><i class="fa-solid fa-check"></i> Target Exceeded</div>
                        </div>
                        <div class="glass-card" style="padding: 1.5rem; border-left: 3px solid var(--accent-color);">
                            <div style="font-size: 0.9rem; color: rgba(255,255,255,0.7);">Outbound Shipments</div>
                            <div style="font-size: 1.5rem; font-weight: bold; margin-top: 0.5rem;">42 Active</div>
                            <div style="font-size: 0.8rem; color: #ffb400; margin-top: 0.5rem;"><i class="fa-solid fa-clock"></i> 2 Delayed (Weather)</div>
                        </div>
                        <div class="glass-card" style="padding: 1.5rem; border-left: 3px solid #ff3366;">
                            <div style="font-size: 0.9rem; color: rgba(255,255,255,0.7);">Inventory Alerts</div>
                            <div style="font-size: 1.5rem; font-weight: bold; margin-top: 0.5rem;">3 Items</div>
                            <div style="font-size: 0.8rem; color: #ff3366; margin-top: 0.5rem;"><i class="fa-solid fa-triangle-exclamation"></i> Below minimum threshold</div>
                        </div>
                    </div>
                </div>
                
                <div class="glass-card" style="margin-top: 2rem; padding: 2rem;">
                    <h3 style="margin-bottom: 1.5rem;">Recent Security Audits</h3>
                    <table style="width:100%; border-collapse:collapse; text-align:left;">
                        <tr style="border-bottom:1px solid rgba(255,255,255,0.1);"><th style="padding:0.75rem;">Facility</th><th style="padding:0.75rem;">Date</th><th style="padding:0.75rem;">Auditor</th><th style="padding:0.75rem;">Score</th><th style="padding:0.75rem;">Status</th></tr>
                        <tr style="border-bottom:1px solid rgba(255,255,255,0.05);"><td style="padding:0.75rem;">North America (NY)</td><td style="padding:0.75rem;">Oct 12, 2026</td><td style="padding:0.75rem;">Ext_TUV</td><td style="padding:0.75rem;">98/100</td><td style="padding:0.75rem; color:#00ff88;">PASSED</td></tr>
                        <tr style="border-bottom:1px solid rgba(255,255,255,0.05);"><td style="padding:0.75rem;">Europe (Frankfurt)</td><td style="padding:0.75rem;">Sep 28, 2026</td><td style="padding:0.75rem;">Int_SecOps</td><td style="padding:0.75rem;">95/100</td><td style="padding:0.75rem; color:#00ff88;">PASSED</td></tr>
                        <tr><td style="padding:0.75rem;">Asia Pacific (SG)</td><td style="padding:0.75rem;">Sep 15, 2026</td><td style="padding:0.75rem;">Ext_SGS</td><td style="padding:0.75rem;">82/100</td><td style="padding:0.75rem; color:#ffaa00;">MINOR FINDINGS</td></tr>
                    </table>
                </div>
`;
        // Append before <!-- Tab: Tracking (mapped from tab-sites) -->
        content = content.replace(/<!-- Tab: Tracking \(mapped from tab-sites\) -->/, newContent + '\n            <!-- Tab: Tracking (mapped from tab-sites) -->');
    }
    
    fs.writeFileSync(filePath, content);
}

addContent('dashboard-employee.html', true);
addContent('dashboard-admin.html', false);
console.log('Added more content to dashboards');
