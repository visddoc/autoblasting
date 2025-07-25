document.addEventListener('DOMContentLoaded', function () {
    const usernameInput = document.getElementById('username');
    const targetInput = document.getElementById('targetInput');
    const targetCards = document.querySelectorAll('.target-card');
    const preview = document.getElementById('preview');
    const generateBtn = document.getElementById('generateBtn');
    const copyBtn = document.getElementById('copyBtn');
    const timeIndicator = document.getElementById('timeIndicator');
    const charCount = document.getElementById('charCount');
    const readTime = document.getElementById('readTime');

    let selectedTarget = null;

    // Initialize with stats
    updateStats(preview.textContent);

    // Update time indicator
    function updateTimeIndicator() {
        const hour = new Date().getHours();
        let timeType, greeting;

        if (hour >= 4 && hour < 11) {
            timeType = 'Pagi';
            greeting = '🌅 Selamat pagi';
        } else if (hour >= 11 && hour < 15) {
            timeType = 'Siang';
            greeting = '☀️ Selamat siang';
        } else if (hour >= 15 && hour < 19) {
            timeType = 'Sore';
            greeting = '🌇 Selamat sore';
        } else {
            timeType = 'Malam';
            greeting = '🌙 Selamat malam';
        }

        timeIndicator.textContent = timeType;
        return { timeType, greeting };
    }

    // Update time initially
    const currentTime = updateTimeIndicator();

    // Handle target selection
    targetCards.forEach(card => {
        card.addEventListener('click', function () {
            targetCards.forEach(c => c.classList.remove('selected', 'ring-2', 'ring-whatsapp-500'));
            this.classList.add('selected', 'ring-2', 'ring-whatsapp-500');
            selectedTarget = parseInt(this.dataset.target);

            // Add animation
            this.classList.add('ring-opacity-50');
            setTimeout(() => {
                this.classList.remove('ring-opacity-50');
            }, 300);
        });
    });

    // Function to get current date
    function getCurrentDate() {
        const now = new Date();
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const year = now.getFullYear();
        return `${day}/${month}/${year}`;
    }

    // Update stats
    function updateStats(text) {
        // Character count
        const count = text.length;
        charCount.textContent = count;

        // Read time (average reading speed: 200 words per minute)
        const words = text.split(/\s+/).length;
        const time = Math.ceil(words / 3.33); // 200 words/min = 3.33 words/sec
        readTime.textContent = time;
    }

    // Generate message
    generateBtn.addEventListener('click', function () {
        const username = usernameInput.value.trim();
        const achieved = parseInt(targetInput.value) || 0;
        const { timeType, greeting } = updateTimeIndicator();
        const currentDate = getCurrentDate();

        // Validation
        if (!username) {
            alert('Silakan masukkan username!');
            usernameInput.focus();
            return;
        }

        if (achieved === 0) {
            alert('Silakan masukkan target yang sudah dicapai!');
            targetInput.focus();
            return;
        }

        if (!selectedTarget) {
            alert('Silakan pilih target harian!');
            return;
        }

        // Calculate difference
        const difference = selectedTarget - achieved;

        // Generate professional message
        let message = `🔔 *Laporan Target Harian* 🔔\n\n`;
        message += `${greeting},\n\n`;
        message += `Perkenalkan, saya *Muhammad Riduwan Khafidi* dari tim Support Data Admin.\n\n`;
        message += `Saya ingin memberikan update mengenai progress target harian Anda:\n\n`;
        message += `👤 *Nama*: @${username}\n`;
        message += `📅 *Tanggal*: ${currentDate}\n`;
        message += `🎯 *Target Harian*: ${selectedTarget} unit\n`;
        message += `✅ *Tercapai*: ${achieved} unit\n`;
        message += `⚠️ *Kekurangan*: ${difference} unit\n\n`;
        message += `Terus semangat! Anda masih memiliki waktu untuk mencapai target harian.\n\n`;
        message += `Terima kasih atas kerja kerasnya. Semoga hari Anda produktif!\n\n`;
        message += `_Pesan ini hanya pengingat. Mohon abaikan jika target sudah tercapai._`;

        // Display preview
        preview.textContent = message;
        updateStats(message);

        // Add animation to preview
        preview.parentElement.classList.add('ring-2', 'ring-whatsapp-500', 'ring-opacity-50');
        setTimeout(() => {
            preview.parentElement.classList.remove('ring-2', 'ring-whatsapp-500', 'ring-opacity-50');
        }, 1000);

        // Button animation
        generateBtn.innerHTML = '<i class="fas fa-check mr-3"></i> Berhasil Digenerate!';
        generateBtn.classList.remove('btn-pulse');
        generateBtn.classList.add('from-green-500', 'to-green-600');

        setTimeout(() => {
            generateBtn.innerHTML = '<i class="fas fa-bolt mr-3"></i> Generate Pesan';
            generateBtn.classList.remove('from-green-500', 'to-green-600');
            generateBtn.classList.add('from-whatsapp-500', 'to-whatsapp-600', 'btn-pulse');
        }, 3000);
    });

    // Copy message
    copyBtn.addEventListener('click', function () {
        const textToCopy = preview.textContent;

        if (!textToCopy || textToCopy.includes('@username')) {
            alert('Silakan generate pesan terlebih dahulu!');
            return;
        }

        navigator.clipboard.writeText(textToCopy)
            .then(() => {
                // Button feedback
                copyBtn.innerHTML = '<i class="fas fa-check mr-3"></i> Tersalin!';
                copyBtn.classList.add('from-green-700', 'to-green-800');

                setTimeout(() => {
                    copyBtn.innerHTML = '<i class="fas fa-copy mr-3"></i> Salin Pesan';
                    copyBtn.classList.remove('from-green-700', 'to-green-800');
                }, 2000);
            })
            .catch(err => {
                console.error('Gagal menyalin teks: ', err);
                alert('Gagal menyalin teks!');
            });
    });

    // Auto-focus on username input
    usernameInput.focus();
});