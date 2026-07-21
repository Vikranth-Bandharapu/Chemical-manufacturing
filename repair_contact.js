const fs = require('fs');
let html = fs.readFileSync('contact.html', 'utf8');

const anchor = `<h5 class="fw-bold text-blue">Tech Support</h5>`;
const anchorIdx = html.indexOf(anchor);

const endAnchor = `<h2 class="section-title text-center mb-5" data-aos="fade-up">Logistics & Support FAQ</h2>`;
const endIdx = html.indexOf(endAnchor, anchorIdx);

if (anchorIdx !== -1 && endIdx !== -1) {
    // Find the start of the `<section class="section-padding bg-white">` before endIdx
    const sectionStart = html.lastIndexOf('<section', endIdx);

    const replacement = `<h5 class="fw-bold text-blue">Tech Support</h5>
                    <a href="mailto:support@chemco.com" class="text-secondary text-decoration-none small">support@chemco.com</a>
                </div>
                <div class="col-auto px-4" data-aos="zoom-in" data-aos-delay="200">
                    <i class="fa-solid fa-users text-orange fa-2x mb-2"></i>
                    <h5 class="fw-bold text-blue">Human Resources</h5>
                    <a href="mailto:hr@chemco.com" class="text-secondary text-decoration-none small">hr@chemco.com</a>
                </div>
            </div>
        </div>
    </section>

    <!-- 7. Map -->
    <section class="bg-white">
        <!-- Google Maps Embed -->
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.091176506307!2d-74.00440332341908!3d40.760010971383785!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c258fa498a4627%3A0xc07a8fc0fa32d664!2sTech%20District!5e0!3m2!1sen!2sus!4v1714412234000!5m2!1sen!2sus" width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    </section>

    <!-- 8. Business Hours -->
    <section class="section-padding bg-blue text-white text-center">
        <div class="container" data-aos="fade-up">
            <i class="fa-solid fa-clock text-orange fa-3x mb-3"></i>
            <h3 class="font-heading fw-bold text-white mb-4">Business Hours</h3>
            <p class="lead opacity-75 mb-0">Monday - Friday: 8:00 AM - 6:00 PM (EST)</p>
            <p class="opacity-75 small">Our chemical emergency response team is available 24/7 globally.</p>
        </div>
    </section>

    <!-- 9. FAQ Specific -->
    `;
    
    const newHtml = html.substring(0, anchorIdx) + replacement + html.substring(sectionStart);
    fs.writeFileSync('contact.html', newHtml);
    console.log("Fixed contact.html successfully.");
} else {
    console.log("Could not find anchors:", anchorIdx, endIdx);
}
