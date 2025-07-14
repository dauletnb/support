document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    const landingPage = document.getElementById('landing-page');
    const readLetterBtn = document.getElementById('read-letter-btn');
    const letterSection = document.getElementById('letter-section');
    const envelope = document.getElementById('envelope');
    const letterContainer = document.getElementById('letter-container');
    const audio = document.getElementById('background-audio');
    const soundToggleBtn = document.getElementById('sound-toggle-btn');
    const downloadPdfBtn = document.getElementById('download-pdf-btn');
    const prevPageBtn = document.getElementById('prev-page-btn');
    const nextPageBtn = document.getElementById('next-page-btn');
    const pageIndicator = document.getElementById('page-indicator');
    const pages = document.querySelectorAll('.page');

    // --- Letter Content (in Russian) ---
    const letterContent = [
        "Моя любимая, — я знаю, как устают твои плечи, неся тяжесть дней, которые так много от тебя требуют. Я вижу тихую силу в твоих глазах, даже когда ты думаешь, что никто не смотрит.",
        "Меня нет рядом. Я не могу встретить тебя у двери, взять твоё пальто или налить чашку чая. Но в этот тихий момент, когда ты читаешь эти слова, я надеюсь, ты чувствуешь моё присутствие, окутывающее тебя, как тёплое одеяло.",
        "Ты сильная. И нежная. Ты — шедевр стойкости и изящества. Никогда не сомневайся в свете, который ты приносишь в этот мир, даже в те дни, когда чувствуешь себя в тени облаков.",
        "Я просто хотел, чтобы ты знала, что тебя видят. Тебя ценят. Каждое усилие, каждая молчаливая борьба, каждая маленькая победа не остаются незамеченными. Я всегда болею за тебя.",
        "Спи спокойно этой ночью. Отпусти все тяготы и дай отдых своему усталому сердцу. Тебя любят. Больше, чем могут выразить слова на странице. Тебя очень, очень любят."
    ];

    // --- State ---
    let currentPage = 0;
    let isAudioPlaying = false;
    let isTyping = false;

    // --- Typewriter Effect ---
    function typeWriter(element, text, speed = 50) {
        isTyping = true;
        let i = 0;
        element.innerHTML = '';
        element.style.borderRight = '.15em solid var(--accent-color)'; // Show cursor
        
        function typing() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(typing, speed);
            } else {
                element.style.borderRight = 'none'; // Hide cursor when done
                isTyping = false;
            }
        }
        typing();
    }

    // --- Page Navigation ---
    function updatePage() {
        pages.forEach((page, index) => {
            page.classList.remove('active-page', 'flipped');
            if (index < currentPage) {
                page.classList.add('flipped');
            } else if (index === currentPage) {
                page.classList.add('active-page');
                const typewriterEl = page.querySelector('.typewriter');
                if (typewriterEl) {
                    typeWriter(typewriterEl, letterContent[currentPage]);
                }
            }
        });

        // Update controls
        pageIndicator.textContent = `Страница ${currentPage + 1} из ${pages.length}`;
        prevPageBtn.disabled = currentPage === 0;
        nextPageBtn.disabled = currentPage === pages.length - 1;
    }

    nextPageBtn.addEventListener('click', () => {
        if (currentPage < pages.length - 1 && !isTyping) {
            currentPage++;
            updatePage();
        }
    });

    prevPageBtn.addEventListener('click', () => {
        if (currentPage > 0 && !isTyping) {
            currentPage--;
            updatePage();
        }
    });

    // --- Initial Setup ---
    readLetterBtn.addEventListener('click', () => {
        landingPage.classList.add('fade-out');
        // Start audio on user interaction
        if (!isAudioPlaying) {
            audio.play().catch(e => console.error("Audio play failed:", e));
            isAudioPlaying = true;
            soundToggleBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
        }
        
        setTimeout(() => {
            landingPage.classList.add('d-none');
            letterSection.classList.remove('d-none');
        }, 500); // Match CSS transition duration
    });
    
    envelope.addEventListener('click', () => {
        envelope.classList.add('open');
        setTimeout(() => {
            envelope.style.transition = 'opacity 0.5s';
            envelope.style.opacity = '0';
            letterContainer.classList.remove('d-none');
        }, 1500); // After envelope animation
        setTimeout(() => {
            envelope.classList.add('d-none');
            letterContainer.classList.add('visible');
            updatePage(); // Start typewriter on the first page
        }, 1600);
    });

    // --- Audio Control ---
    soundToggleBtn.addEventListener('click', () => {
        if (isAudioPlaying) {
            audio.pause();
            soundToggleBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
        } else {
            audio.play();
            soundToggleBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
        }
        isAudioPlaying = !isAudioPlaying;
    });

    // --- PDF Download ---
    downloadPdfBtn.addEventListener('click', () => {
        alert("PDF generation for Cyrillic text with custom fonts is complex and may not render correctly with jsPDF's default settings. This is a placeholder for a more advanced implementation.");
        // NOTE: jsPDF has poor support for Unicode/Cyrillic characters with custom web fonts out-of-the-box.
        // A proper implementation would require embedding the font files (e.g., .ttf) into the script, which is a heavy and complex process.
        // The code below will likely render garbled text.
        /*
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF({
            orientation: 'p',
            unit: 'mm',
            format: 'a4'
        });

        doc.setFont('Helvetica', 'normal'); // Helvetica does not support Cyrillic well.
        doc.setFontSize(22);
        doc.text("Моей любимой...", 20, 30);
        
        doc.setFontSize(12);
        let y = 50;
        letterContent.forEach(paragraph => {
            const splitText = doc.splitTextToSize(paragraph, 170);
            doc.text(splitText, 20, y);
            y += (splitText.length * 7) + 10;
            if (y > 270) {
                doc.addPage();
                y = 20;
            }
        });
        
        doc.setFontSize(16);
        doc.text("- Со всей моей любовью", 130, y + 10);
        
        doc.save('My-Beloved-Letter-RU.pdf');
        */
    });
});
