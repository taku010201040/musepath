const url = 'https://taku010201040.github.io/musepath/';

async function verifySite() {
    console.log('🔄 Verifying MusePath deployment...');

    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);

        const html = await res.text();
        console.log('✅ Site is accessible (HTTP 200)');

        // Check for key elements
        const checks = [
            { key: 'Title', expected: 'MusePath' },
            { key: 'Main Heading', expected: 'あなたの可能性を見つける' },
            { key: 'Feature Section', expected: '主な機能' },
            { key: 'Dashboard Link', expected: 'dashboard' },
        ];

        let passed = 0;
        for (const check of checks) {
            if (html.includes(check.expected)) {
                console.log(`✅ Found: ${check.key}`);
                passed++;
            } else {
                console.error(`❌ Missing: ${check.key}`);
            }
        }

        console.log('\n--- Result ---');
        if (passed === checks.length) {
            console.log('🎉 Verification PASSED: Site content is correctly deployed.');
        } else {
            console.log('⚠️ Verification WARNING: Some content is missing.');
        }

    } catch (error) {
        console.error('❌ Verification FAILED:', error.message);
    }
}

verifySite();
