const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const htmlFiles = [
    'about.html', 'contact.html', 'dashboard-admin.html',
    'dashboard-employee.html', 'dashboard-manager.html',
    'index.html', 'innovation.html', 'login.html',
    'products.html', 'signup.html', 'sustainability.html'
];

const baseImages = [
    'factory-interior.webp', 'hero-banner.webp', 'innovation.webp',
    'lab-research.webp', 'quality-control.webp', 'sustainability.webp'
];

// We will replace generic duplicated image usages with unique ones.
const replacements = [
    // index.html
    { file: 'index.html', find: 'assets/factory-interior.webp" alt="Client" class="rounded-circle"', replace: 'assets/client-john.webp" alt="Client" class="rounded-circle"', type: 'avatar' },
    { file: 'index.html', find: 'assets/factory-interior.webp" alt="Client" class="rounded-circle"', replace: 'assets/client-alice.webp" alt="Client" class="rounded-circle"', type: 'avatar' },
    { file: 'index.html', find: 'assets/factory-interior.webp" class="card-img-top" alt="News"', replace: 'assets/news-1.webp" class="card-img-top" alt="News"', type: 'news' },
    { file: 'index.html', find: 'assets/factory-interior.webp" class="card-img-top" alt="News"', replace: 'assets/news-2.webp" class="card-img-top" alt="News"', type: 'news' },
    { file: 'index.html', find: 'assets/factory-interior.webp" class="card-img-top" alt="News"', replace: 'assets/news-3.webp" class="card-img-top" alt="News"', type: 'news' },
    { file: 'index.html', find: 'assets/factory-interior.webp" alt="Construction"', replace: 'assets/feature-construction.webp" alt="Construction"', type: 'feature' },
    { file: 'index.html', find: 'assets/sustainability.webp" alt="Water"', replace: 'assets/feature-water.webp" alt="Water"', type: 'feature' },
    { file: 'index.html', find: 'assets/factory-interior.webp\');', replace: 'assets/bg-sustainability.webp\');', type: 'bg' },
    { file: 'index.html', find: 'assets/factory-interior.webp" alt="R&D"', replace: 'assets/feature-rd.webp" alt="R&D"', type: 'feature' },
    
    // about.html
    { file: 'about.html', find: 'assets/factory-interior.webp" alt="HQ"', replace: 'assets/about-hq.webp" alt="HQ"', type: 'skip' },
    { file: 'about.html', find: 'assets/hero-banner.webp" alt="Mission"', replace: 'assets/about-mission.webp" alt="Mission"', type: 'skip' },
    { file: 'about.html', find: 'assets/innovation.webp" alt="Vision"', replace: 'assets/about-vision.webp" alt="Vision"', type: 'skip' },
    { file: 'about.html', find: 'assets/factory-interior.webp" alt="Safety"', replace: 'assets/about-safety.webp" alt="Safety"', type: 'feature' },
    { file: 'about.html', find: 'assets/quality-control.webp" alt="Excellence"', replace: 'assets/about-excellence.webp" alt="Excellence"', type: 'feature' },
    { file: 'about.html', find: 'assets/lab-research.webp" alt="Integrity"', replace: 'assets/about-integrity.webp" alt="Integrity"', type: 'feature' },
    { file: 'about.html', find: 'assets/factory-interior.webp" class="rounded-circle mb-3 border border-3 border-orange p-1" width="150" height="150" alt="CEO"', replace: 'assets/team-ceo.webp" class="rounded-circle mb-3 border border-3 border-orange p-1" width="150" height="150" alt="CEO"', type: 'avatar' },
    { file: 'about.html', find: 'assets/factory-interior.webp" class="rounded-circle mb-3 border border-3 border-orange p-1" width="150" height="150" alt="CTO"', replace: 'assets/team-cto.webp" class="rounded-circle mb-3 border border-3 border-orange p-1" width="150" height="150" alt="CTO"', type: 'avatar' },
    { file: 'about.html', find: 'assets/factory-interior.webp" class="rounded-circle mb-3 border border-3 border-orange p-1" width="150" height="150" alt="COO"', replace: 'assets/team-coo.webp" class="rounded-circle mb-3 border border-3 border-orange p-1" width="150" height="150" alt="COO"', type: 'avatar' },
    { file: 'about.html', find: 'assets/factory-interior.webp" alt="Map"', replace: 'assets/about-map.webp" alt="Map"', type: 'feature' },

    // innovation.html
    { file: 'innovation.html', find: 'assets/lab-research.webp" alt="Labs"', replace: 'assets/inno-labs.webp" alt="Labs"', type: 'feature' },
    { file: 'innovation.html', find: 'assets/innovation.webp" alt="Bio"', replace: 'assets/inno-bio.webp" alt="Bio"', type: 'feature' },
    { file: 'innovation.html', find: 'assets/factory-interior.webp" alt="Polymers"', replace: 'assets/inno-polymers.webp" alt="Polymers"', type: 'feature' },
    { file: 'innovation.html', find: 'assets/sustainability.webp" alt="Agri"', replace: 'assets/inno-agri.webp" alt="Agri"', type: 'feature' },
    { file: 'innovation.html', find: 'assets/quality-control.webp" alt="APIs"', replace: 'assets/inno-apis.webp" alt="APIs"', type: 'feature' },
    { file: 'innovation.html', find: 'assets/factory-interior.webp" alt="Pilot"', replace: 'assets/inno-pilot.webp" alt="Pilot"', type: 'feature' },

    // sustainability.html
    { file: 'sustainability.html', find: 'assets/sustainability.webp" alt="Solar"', replace: 'assets/sust-solar.webp" alt="Solar"', type: 'feature' },
    { file: 'sustainability.html', find: 'assets/factory-interior.webp" alt="Solvent"', replace: 'assets/sust-solvent.webp" alt="Solvent"', type: 'feature' },
    { file: 'sustainability.html', find: 'assets/sustainability.webp" alt="Eco"', replace: 'assets/sust-eco.webp" alt="Eco"', type: 'feature' },
    { file: 'sustainability.html', find: 'assets/innovation.webp" alt="Byproduct"', replace: 'assets/sust-byproduct.webp" alt="Byproduct"', type: 'feature' },
    { file: 'sustainability.html', find: 'assets/factory-interior.webp" alt="Safety"', replace: 'assets/sust-safety.webp" alt="Safety"', type: 'feature' },
    { file: 'sustainability.html', find: 'assets/lab-research.webp" alt="STEM"', replace: 'assets/sust-stem.webp" alt="STEM"', type: 'feature' },
    { file: 'sustainability.html', find: 'assets/sustainability.webp" alt="Health"', replace: 'assets/sust-health.webp" alt="Health"', type: 'feature' },

    // other pages
    { file: 'index.html', find: 'assets/quality-control.webp" alt="Pharma"', replace: 'assets/pharma.webp" alt="Pharma"', type: 'feature' },
    { file: 'index.html', find: 'assets/sustainability.webp" alt="Agro"', replace: 'assets/agro-index.webp" alt="Agro"', type: 'feature' },
    { file: 'products.html', find: 'assets/sustainability.webp" alt="Agro"', replace: 'assets/agro-products.webp" alt="Agro"', type: 'feature' },
    { file: 'products.html', find: 'assets/quality-control.webp" alt="QC"', replace: 'assets/qc-products.webp" alt="QC"', type: 'feature' },
    { file: 'contact.html', find: 'assets/hero-banner.webp" alt="Map"', replace: 'assets/contact-map.webp" alt="Map"', type: 'bg' },
    { file: 'login.html', find: 'assets/factory-interior.webp\')', replace: 'assets/bg-login.webp\')', type: 'bg' },
    { file: 'signup.html', find: 'assets/factory-interior.webp\')', replace: 'assets/bg-signup.webp\')', type: 'bg' }
];

async function run() {
    console.log("Generating unique images using sharp...");
    for (const rep of replacements) {
        if (rep.type !== 'skip') {
            const outName = rep.replace.split('"')[0].replace("assets/", "");
            const outPath = path.join('assets', outName);
            
            const baseImg = baseImages[Math.floor(Math.random() * baseImages.length)];
            const baseImgPath = path.join('assets', baseImg);

            try {
                let pipeline = sharp(baseImgPath);
                
                if (Math.random() > 0.5) pipeline = pipeline.flop();
                if (Math.random() > 0.5) pipeline = pipeline.flip();
                
                const tintColors = [
                    {r: 255, g: 200, b: 200}, {r: 200, g: 255, b: 200},
                    {r: 200, g: 200, b: 255}, {r: 255, g: 255, b: 200},
                    {r: 200, g: 255, b: 255}, {r: 255, g: 200, b: 255}
                ];
                pipeline = pipeline.tint(tintColors[Math.floor(Math.random() * tintColors.length)]);
                
                await pipeline
                    .resize({ width: 800, withoutEnlargement: true })
                    .webp({ quality: 40, effort: 6 })
                    .toFile(outPath);
                console.log(`Generated unique image: ${outPath}`);
            } catch (err) {
                console.error(`Error generating ${outPath}:`, err);
            }
        }

        let htmlContent = fs.readFileSync(rep.file, 'utf8');
        htmlContent = htmlContent.replace(rep.find, rep.replace);
        fs.writeFileSync(rep.file, htmlContent);
    }

    console.log("Replacing remaining general occurrences and updating everything to .webp...");
    const assets = fs.readdirSync('assets');
    for (const file of assets) {
        if (!file.match(/\.(png|jpg|jpeg|webp)$/i)) continue;
        if (file === 'logo.webp') continue;

        const inPath = path.join('assets', file);
        const webpName = file.replace(/\.[^/.]+$/, "") + ".webp";
        const outPath = path.join('assets', 'temp_' + webpName);

        try {
            await sharp(inPath)
                .resize({ width: 1000, withoutEnlargement: true })
                .webp({ quality: 40, effort: 6 })
                .toFile(outPath);
            
            fs.rmSync(inPath);
            fs.renameSync(outPath, path.join('assets', webpName));
            console.log(`Compressed and converted to webp: ${webpName}`);
        } catch (err) {
            console.error(`Error compressing ${file}:`, err);
        }
    }

    const allFiles = [...htmlFiles, 'css/style.css', 'css/dashboard.css'];
    for (const f of allFiles) {
        if (fs.existsSync(f)) {
            let content = fs.readFileSync(f, 'utf8');
            content = content.replace(/\.png/g, '.webp');
            content = content.replace(/\.jpg/g, '.webp');
            content = content.replace(/\.jpeg/g, '.webp');
            fs.writeFileSync(f, content);
        }
    }
    console.log("All done!");
}

run();
