const fs = require('fs');

// 1. Admin Dashboard
let adminHtml = fs.readFileSync('dashboard-admin.html', 'utf8');
const adminAnchor = `            <!-- Tab: Tracking (mapped from tab-sites) -->`;
const adminReplacement = `                <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem; margin-top: 2rem;">
                    <div class="glass-card" style="padding: 2rem;">
                        <h3 style="margin-bottom:1rem; color:#0dcaf0;">System Health</h3>
                        <div><strong>CPU Usage</strong> - 42% <br><span style="font-size:0.8rem; color:rgba(255,255,255,0.6);">Stable across all clusters</span></div>
                        <div style="margin-top: 1rem;"><strong>Memory</strong> - 68% <br><span style="font-size:0.8rem; color:rgba(255,255,255,0.6);">Within normal parameters</span></div>
                    </div>
                    <div class="glass-card" style="padding: 2rem;">
                        <h3 style="margin-bottom:1rem; color:#10b981;">Recent Logins</h3>
                        <div><strong>Admin_02</strong> - 10:45Z <br><span style="font-size:0.8rem; color:rgba(255,255,255,0.6);">IP: 192.168.1.105</span></div>
                        <div style="margin-top: 1rem;"><strong>Sec_Lead</strong> - 09:12Z <br><span style="font-size:0.8rem; color:rgba(255,255,255,0.6);">IP: 10.0.4.22</span></div>
                    </div>
                </div>
            </div>

            <!-- Tab: Tracking (mapped from tab-sites) -->`;
adminHtml = adminHtml.replace(`            </div>\n\n            <!-- Tab: Tracking (mapped from tab-sites) -->`, adminReplacement);
// Wait, to be safe, I'll just use indexOf and substring
const adminIdx = adminHtml.indexOf(adminAnchor);
if (adminIdx !== -1) {
    const startIdx = adminHtml.lastIndexOf('</div>', adminIdx - 5);
    adminHtml = adminHtml.substring(0, startIdx) + adminReplacement.substring(0, adminReplacement.length - adminAnchor.length) + "\n" + adminAnchor + adminHtml.substring(adminIdx + adminAnchor.length);
    fs.writeFileSync('dashboard-admin.html', adminHtml);
}

// 2. Manager Dashboard
let managerHtml = fs.readFileSync('dashboard-manager.html', 'utf8');
const managerAnchor = `            <!-- Tab: Silos (mapped from tab-sites) -->`;
const managerReplacement = `                <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem; margin-top: 2rem;">
                    <div class="glass-card" style="padding: 2rem;">
                        <h3 style="margin-bottom:1rem; color:#0dcaf0;">Upcoming Shipments</h3>
                        <div><strong>To: Frankfurt Plant</strong> - 14:00Z <br><span style="font-size:0.8rem; color:rgba(255,255,255,0.6);">Status: Loading</span></div>
                        <div style="margin-top: 1rem;"><strong>To: Singapore Hub</strong> - 18:30Z <br><span style="font-size:0.8rem; color:rgba(255,255,255,0.6);">Status: Pending Customs</span></div>
                    </div>
                    <div class="glass-card" style="padding: 2rem;">
                        <h3 style="margin-bottom:1rem; color:#10b981;">Team Performance</h3>
                        <div><strong>Shift A</strong> - 98% Efficiency <br><span style="font-size:0.8rem; color:rgba(255,255,255,0.6);">Above target</span></div>
                        <div style="margin-top: 1rem;"><strong>Shift B</strong> - 92% Efficiency <br><span style="font-size:0.8rem; color:rgba(255,255,255,0.6);">On target</span></div>
                    </div>
                </div>
            </div>`;
const managerIdx = managerHtml.indexOf(managerAnchor);
if (managerIdx !== -1) {
    const startIdx = managerHtml.lastIndexOf('</div>', managerIdx - 5);
    managerHtml = managerHtml.substring(0, startIdx) + managerReplacement + "\n\n" + managerAnchor + managerHtml.substring(managerIdx + managerAnchor.length);
    fs.writeFileSync('dashboard-manager.html', managerHtml);
}

// 3. Employee Dashboard
let employeeHtml = fs.readFileSync('dashboard-employee.html', 'utf8');
const employeeTaskAnchor = `                </div>\n            </div>\n\n            <!-- Announcements & Quick Actions -->`;
const employeeTaskInsert = `                    <div class="task-item d-flex align-items-center justify-content-between p-3 rounded mb-3">
                        <div>
                            <h6 class="mb-1 fw-bold text-dark security-font">HAZMAT Refresher Training</h6>
                            <p class="mb-0 small text-muted">Complete module 4 of the new safety guidelines.</p>
                        </div>
                        <span class="badge bg-danger bg-opacity-10 text-danger border border-danger px-3 py-2 security-font">OVERDUE</span>
                    </div>\n                </div>\n            </div>\n\n            <!-- Announcements & Quick Actions -->`;
employeeHtml = employeeHtml.replace(employeeTaskAnchor, employeeTaskInsert);

const employeeAnnounceAnchor = `                <div class="glass-panel" style="border-top: 4px solid var(--clr-orange);">`;
const employeeAnnounceInsert = `                    <div class="p-3 mb-3" style="background: rgba(16,185,129,0.05); border-left: 4px solid #10b981; border-radius: 4px;">
                        <strong class="text-success security-font">SYSTEM:</strong>
                        <div class="small text-muted mt-1">Biometric scanners in Sector B are now online.</div>
                    </div>\n                </div>\n\n                <div class="glass-panel" style="border-top: 4px solid var(--clr-orange);">`;
employeeHtml = employeeHtml.replace(employeeAnnounceAnchor, employeeAnnounceInsert);

fs.writeFileSync('dashboard-employee.html', employeeHtml);
console.log("All dashboards updated with more content.");
