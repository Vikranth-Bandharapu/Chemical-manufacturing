const fs = require('fs');

let html = fs.readFileSync('blog.html', 'utf8');

const newContent = `
    <!-- 1. Page Banner -->
    <section class="page-banner text-center" style="background: linear-gradient(rgba(10,37,64,0.8), rgba(10,37,64,0.9)), url('assets/hero-banner.webp') center/cover;">
        <div class="container position-relative z-2">
            <h1 class="text-white font-heading fw-bold mb-3 gs-reveal">Chemco Blog</h1>
            <div class="breadcrumb-custom gs-reveal justify-content-center">
                <a href="index.html">Home</a> <span>/</span> <span class="text-white">Blog</span>
            </div>
        </div>
    </section>

    <!-- 2. Featured Post -->
    <section class="section-padding bg-white">
        <div class="container">
            <h2 class="section-title text-center mb-5" data-aos="fade-up">Featured Insight</h2>
            <div class="row align-items-center g-5">
                <div class="col-lg-7" data-aos="fade-right">
                    <img src="assets/news-1.webp" alt="Featured" class="img-fluid rounded shadow-lg w-100" style="height: 400px; object-fit: cover;">
                </div>
                <div class="col-lg-5" data-aos="fade-left">
                    <span class="badge bg-orange mb-3 px-3 py-2">Corporate News</span>
                    <h3 class="font-heading fw-bold text-blue mb-3">Pioneering the Future of Sustainable Chemical Synthesis</h3>
                    <p class="text-secondary mb-4">Discover how our latest multi-million dollar investment in green catalytic technologies is set to reduce our carbon footprint by 40% across all European manufacturing plants...</p>
                    <div class="d-flex align-items-center justify-content-between mb-4 text-muted small">
                        <span><i class="fa-regular fa-calendar-days text-orange me-2"></i> Aug 15, 2026</span>
                        <span><i class="fa-regular fa-clock text-orange me-2"></i> 6 min read</span>
                    </div>
                    <a href="404.html" class="btn-custom btn-primary-custom">Read Full Article</a>
                </div>
            </div>
        </div>
    </section>

    <!-- 3. Blog Grid -->
    <section class="section-padding bg-light">
        <div class="container">
            <div class="d-flex justify-content-between align-items-end mb-5" data-aos="fade-up">
                <div>
                    <h5 class="text-orange mb-3 text-uppercase fw-bold">Latest Articles</h5>
                    <h2 class="section-title mb-0">Industry & Technical Updates</h2>
                </div>
                <div class="d-none d-md-block">
                    <select class="form-select border-orange text-blue fw-bold" style="width: 200px;">
                        <option>All Categories</option>
                        <option>Research & Dev</option>
                        <option>Safety Guidelines</option>
                        <option>Market Trends</option>
                    </select>
                </div>
            </div>
            
            <div class="row g-4">
                <!-- Post 1 -->
                <div class="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="100">
                    <div class="card h-100 border-0 shadow-sm blog-card">
                        <div class="overflow-hidden">
                            <img src="assets/news-2.webp" class="card-img-top" alt="News" style="height:220px; object-fit:cover; transition: transform 0.5s;">
                        </div>
                        <div class="card-body p-4">
                            <span class="text-orange small fw-bold text-uppercase mb-2 d-block">Research</span>
                            <h4 class="card-title fw-bold text-blue mb-3">Breakthroughs in Bio-based Polymer Adhesives</h4>
                            <p class="card-text text-secondary small mb-4">Our R&D team has successfully synthesized a new class of adhesives derived from 100% renewable plant resources.</p>
                            <a href="404.html" class="fw-bold text-orange text-decoration-none">Read More <i class="fa-solid fa-arrow-right ms-1"></i></a>
                        </div>
                    </div>
                </div>
                <!-- Post 2 -->
                <div class="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="200">
                    <div class="card h-100 border-0 shadow-sm blog-card">
                        <div class="overflow-hidden">
                            <img src="assets/news-3.webp" class="card-img-top" alt="News" style="height:220px; object-fit:cover; transition: transform 0.5s;">
                        </div>
                        <div class="card-body p-4">
                            <span class="text-orange small fw-bold text-uppercase mb-2 d-block">Market Trends</span>
                            <h4 class="card-title fw-bold text-blue mb-3">Global Supply Chain Resilience in 2026</h4>
                            <p class="card-text text-secondary small mb-4">Navigating the complexities of raw material sourcing and logistics in a rapidly shifting global market.</p>
                            <a href="404.html" class="fw-bold text-orange text-decoration-none">Read More <i class="fa-solid fa-arrow-right ms-1"></i></a>
                        </div>
                    </div>
                </div>
                <!-- Post 3 -->
                <div class="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="300">
                    <div class="card h-100 border-0 shadow-sm blog-card">
                        <div class="overflow-hidden">
                            <img src="assets/feature-rd.webp" class="card-img-top" alt="News" style="height:220px; object-fit:cover; transition: transform 0.5s;">
                        </div>
                        <div class="card-body p-4">
                            <span class="text-orange small fw-bold text-uppercase mb-2 d-block">Safety</span>
                            <h4 class="card-title fw-bold text-blue mb-3">Updating Handling Protocols for Reactive Agents</h4>
                            <p class="card-text text-secondary small mb-4">A comprehensive guide on the new safety standards for storing and transporting volatile chemical intermediates.</p>
                            <a href="404.html" class="fw-bold text-orange text-decoration-none">Read More <i class="fa-solid fa-arrow-right ms-1"></i></a>
                        </div>
                    </div>
                </div>
                <!-- Post 4 -->
                <div class="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="400">
                    <div class="card h-100 border-0 shadow-sm blog-card">
                        <div class="overflow-hidden">
                            <img src="assets/inno-bio.webp" class="card-img-top" alt="News" style="height:220px; object-fit:cover; transition: transform 0.5s;">
                        </div>
                        <div class="card-body p-4">
                            <span class="text-orange small fw-bold text-uppercase mb-2 d-block">Technology</span>
                            <h4 class="card-title fw-bold text-blue mb-3">The Integration of AI in Chemical Modeling</h4>
                            <p class="card-text text-secondary small mb-4">How Chemco is utilizing machine learning to predict molecular behaviors and accelerate new drug discovery pipelines.</p>
                            <a href="404.html" class="fw-bold text-orange text-decoration-none">Read More <i class="fa-solid fa-arrow-right ms-1"></i></a>
                        </div>
                    </div>
                </div>
                <!-- Post 5 -->
                <div class="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="500">
                    <div class="card h-100 border-0 shadow-sm blog-card">
                        <div class="overflow-hidden">
                            <img src="assets/sust-stem.webp" class="card-img-top" alt="News" style="height:220px; object-fit:cover; transition: transform 0.5s;">
                        </div>
                        <div class="card-body p-4">
                            <span class="text-orange small fw-bold text-uppercase mb-2 d-block">Community</span>
                            <h4 class="card-title fw-bold text-blue mb-3">Chemco Sponsored STEM Initiative Reaches 10k Students</h4>
                            <p class="card-text text-secondary small mb-4">Our commitment to education continues to grow as we expand our laboratory sponsorship program to new districts.</p>
                            <a href="404.html" class="fw-bold text-orange text-decoration-none">Read More <i class="fa-solid fa-arrow-right ms-1"></i></a>
                        </div>
                    </div>
                </div>
                <!-- Post 6 -->
                <div class="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="600">
                    <div class="card h-100 border-0 shadow-sm blog-card">
                        <div class="overflow-hidden">
                            <img src="assets/product-catalysts.webp" class="card-img-top" alt="News" style="height:220px; object-fit:cover; transition: transform 0.5s;">
                        </div>
                        <div class="card-body p-4">
                            <span class="text-orange small fw-bold text-uppercase mb-2 d-block">Products</span>
                            <h4 class="card-title fw-bold text-blue mb-3">Introducing the X-700 High-Yield Catalyst Series</h4>
                            <p class="card-text text-secondary small mb-4">A deep dive into the technical specifications and industrial applications of our newly launched catalyst line.</p>
                            <a href="404.html" class="fw-bold text-orange text-decoration-none">Read More <i class="fa-solid fa-arrow-right ms-1"></i></a>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Pagination -->
            <div class="mt-5 d-flex justify-content-center" data-aos="fade-up">
                <nav aria-label="Page navigation">
                    <ul class="pagination pagination-lg">
                        <li class="page-item disabled">
                            <a class="page-link text-blue" href="#" tabindex="-1" aria-disabled="true"><i class="fa-solid fa-chevron-left"></i></a>
                        </li>
                        <li class="page-item active"><a class="page-link bg-orange border-orange text-white" href="#">1</a></li>
                        <li class="page-item"><a class="page-link text-blue" href="#">2</a></li>
                        <li class="page-item"><a class="page-link text-blue" href="#">3</a></li>
                        <li class="page-item">
                            <a class="page-link text-blue" href="#"><i class="fa-solid fa-chevron-right"></i></a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    </section>

    <!-- 4. CTA Newsletter -->
    <section class="section-padding bg-blue text-white text-center">
        <div class="container" data-aos="zoom-in">
            <h2 class="font-heading fw-bold text-white mb-4">Subscribe to our Insights</h2>
            <p class="lead mb-4 mx-auto opacity-75" style="max-width: 600px;">Get the latest industry news, technical guides, and Chemco updates delivered directly to your inbox.</p>
            <div class="d-flex justify-content-center">
                <form class="d-flex" style="max-width: 500px; width: 100%;">
                    <input type="email" class="form-control rounded-start-pill py-3 px-4 border-0" placeholder="Enter your email address" required>
                    <button class="btn btn-primary-custom rounded-end-pill px-4 m-0 border-0" style="border-radius: 0 50px 50px 0;" type="submit">Subscribe</button>
                </form>
            </div>
        </div>
    </section>
`;

// Extract content before '<!-- 1. Page Banner -->' and after '<!-- Footer -->'
const startIdx = html.indexOf('<!-- 1. Page Banner -->');
const endIdx = html.indexOf('<!-- Footer -->');

if (startIdx !== -1 && endIdx !== -1) {
    const newHtml = html.substring(0, startIdx) + newContent + "\n    " + html.substring(endIdx);
    fs.writeFileSync('blog.html', newHtml);
    console.log("blog.html content replaced successfully.");
} else {
    console.log("Could not find replacement markers.");
}
