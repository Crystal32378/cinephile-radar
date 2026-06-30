// Cinephile Radar & Tracker - Application Logic

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    lucide.createIcons();
    
    // Application State
    let watchedIds = loadWatchedMovies();
    let currentTab = 'all';
    let searchQuery = '';
    let selectedDecade = 'all';
    let selectedCountry = 'all';
    let selectedStatus = 'all';
    
    // DOM Elements
    const moviesGrid = document.getElementById('movies-grid');
    const noResults = document.getElementById('no-results');
    const searchInput = document.getElementById('search-input');
    const filterDecade = document.getElementById('filter-decade');
    const filterCountry = document.getElementById('filter-country');
    const filterStatus = document.getElementById('filter-status');
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    // Progress Elements
    const totalRing = document.getElementById('total-ring');
    const totalPercent = document.getElementById('total-percent');
    const totalCount = document.getElementById('total-count');
    const userTierText = document.getElementById('user-tier');
    
    const statsOscar = document.getElementById('stats-oscar');
    const statsCannes = document.getElementById('stats-cannes');
    const statsVenice = document.getElementById('stats-venice');
    const statsBerlin = document.getElementById('stats-berlin');
    
    const barOscar = document.getElementById('bar-oscar');
    const barCannes = document.getElementById('bar-cannes');
    const barVenice = document.getElementById('bar-venice');
    const barBerlin = document.getElementById('bar-berlin');

    // Modals
    const modalRoulette = document.getElementById('modal-roulette');
    const modalShare = document.getElementById('modal-share');
    const modalDetail = document.getElementById('modal-detail');
    
    const btnRoulette = document.getElementById('btn-roulette');
    const btnShare = document.getElementById('btn-share');
    
    const closeBtns = document.querySelectorAll('.close-modal');
    
    // Roulette Elements
    const btnSpin = document.getElementById('btn-spin');
    const rouletteWheel = document.getElementById('roulette-wheel');
    const rouletteResult = document.getElementById('roulette-result');
    
    // Share Elements
    const shareUsernameInput = document.getElementById('share-username');
    const shareCanvas = document.getElementById('share-canvas');
    const btnDownloadCard = document.getElementById('btn-download-card');
    
    // Movie Details Elements
    const detailTitleCn = document.getElementById('detail-title-cn');
    const detailTitleEn = document.getElementById('detail-title-en');
    const detailFestival = document.getElementById('detail-festival');
    const detailYear = document.getElementById('detail-year');
    const detailDirector = document.getElementById('detail-director');
    const detailCountry = document.getElementById('detail-country');
    const linkImdb = document.getElementById('link-imdb');
    const linkLetterboxd = document.getElementById('link-letterboxd');
    const linkYoutube = document.getElementById('link-youtube');

    // Load watched movies from LocalStorage
    function loadWatchedMovies() {
        try {
            const stored = localStorage.getItem('watched_movie_ids');
            return stored ? JSON.parse(stored) : [];
        } catch (e) {
            console.error("Error loading localStorage:", e);
            return [];
        }
    }
    
    // Save watched movies to LocalStorage
    function saveWatchedMovies() {
        try {
            localStorage.setItem('watched_movie_ids', JSON.stringify(watchedIds));
        } catch (e) {
            console.error("Error saving localStorage:", e);
        }
    }
    
    // Calculate and update progress dashboard
    function updateProgress() {
        if (!window.MOVIE_DATA || window.MOVIE_DATA.length === 0) return;
        
        const total = window.MOVIE_DATA.length;
        const watchedCount = window.MOVIE_DATA.filter(m => watchedIds.includes(m.id)).length;
        const overallPercent = total > 0 ? (watchedCount / total) * 100 : 0;
        
        // Update total progress circular ring
        totalPercent.textContent = `${overallPercent.toFixed(1)}%`;
        totalCount.textContent = `${watchedCount}/${total}`;
        
        // Ring circumference is ~326.7
        const circ = 326.7;
        const offset = circ - (overallPercent / 100) * circ;
        totalRing.style.strokeDashoffset = offset;
        
        // Update user tier ranking text
        let tier = "新手影迷";
        let nextPercent = 0.0;
        if (overallPercent >= 90) {
            tier = "神級影聖 (傳奇)";
        } else if (overallPercent >= 70) {
            tier = "狂熱影癡 (大師)";
        } else if (overallPercent >= 50) {
            tier = "電影達人 (專家)";
        } else if (overallPercent >= 30) {
            tier = "資深電影迷 (進階)";
        } else if (overallPercent >= 10) {
            tier = "文青影迷 (初階)";
        } else {
            tier = "新晉影迷 (新手)";
        }
        userTierText.innerHTML = `<strong>${tier}</strong> (${overallPercent.toFixed(1)}%)`;
        
        // Breakdown calculations
        const fests = {
            oscar: { total: 0, watched: 0 },
            cannes: { total: 0, watched: 0 },
            venice: { total: 0, watched: 0 },
            berlin: { total: 0, watched: 0 }
        };
        
        window.MOVIE_DATA.forEach(m => {
            if (fests[m.festival]) {
                fests[m.festival].total++;
                if (watchedIds.includes(m.id)) {
                    fests[m.festival].watched++;
                }
            }
        });
        
        // Update UI for breakdowns
        Object.keys(fests).forEach(fest => {
            const data = fests[fest];
            const pct = data.total > 0 ? (data.watched / data.total) * 100 : 0;
            
            // Set text stats
            const statsEl = document.getElementById(`stats-${fest}`);
            if (statsEl) {
                statsEl.textContent = `${data.watched}/${data.total} (${pct.toFixed(0)}%)`;
            }
            
            // Set progress bar width
            const barEl = document.getElementById(`bar-${fest}`);
            if (barEl) {
                barEl.style.width = `${pct}%`;
            }
        });
    }
    
    // Get decade string from year
    function getDecade(year) {
        if (year >= 2020) return '2020s';
        if (year >= 2010) return '2010s';
        if (year >= 2000) return '2000s';
        if (year >= 1990) return '1990s';
        if (year >= 1980) return '1980s';
        if (year >= 1970) return '1970s';
        if (year >= 1960) return '1960s';
        return 'earlier';
    }
    
    // Get simple country group code
    function getCountryGroup(country) {
        if (!country) return 'other';
        const c = country.toLowerCase();
        if (c.includes('united states') || c.includes('美國')) return 'us';
        if (c.includes('france') || c.includes('法國')) return 'fr';
        if (c.includes('italy') || c.includes('義大')) return 'it';
        if (c.includes('united kingdom') || c.includes('英國')) return 'uk';
        if (c.includes('japan') || c.includes('日本')) return 'jp';
        if (c.includes('south korea') || c.includes('韓國') || c.includes('korea')) return 'kr';
        if (c.includes('taiwan') || c.includes('台灣') || c.includes('臺灣')) return 'tw';
        if (c.includes('hong kong') || c.includes('香港')) return 'hk';
        return 'other';
    }

    // Filter movie database according to current filter choices
    function getFilteredMovies() {
        if (!window.MOVIE_DATA) return [];
        
        return window.MOVIE_DATA.filter(movie => {
            // 1. Tab filter
            if (currentTab !== 'all' && movie.festival !== currentTab) {
                return false;
            }
            
            // 2. Search query filter
            if (searchQuery) {
                const q = searchQuery.toLowerCase();
                const titleCn = movie.title_cn.toLowerCase();
                const titleEn = movie.title_en.toLowerCase();
                const director = movie.director.toLowerCase();
                const country = movie.country.toLowerCase();
                if (!titleCn.includes(q) && !titleEn.includes(q) && !director.includes(q) && !country.includes(q)) {
                    return false;
                }
            }
            
            // 3. Decade filter
            if (selectedDecade !== 'all') {
                const dec = getDecade(movie.year);
                if (dec !== selectedDecade) return false;
            }
            
            // 4. Country filter
            if (selectedCountry !== 'all') {
                const cg = getCountryGroup(movie.country);
                if (cg !== selectedCountry) return false;
            }
            
            // 5. Status filter
            if (selectedStatus !== 'all') {
                const isWatched = watchedIds.includes(movie.id);
                if (selectedStatus === 'watched' && !isWatched) return false;
                if (selectedStatus === 'unwatched' && isWatched) return false;
            }
            
            return true;
        });
    }
    
    // Festival badge text and icon
    const festivalConfig = {
        oscar: { name: '奧斯卡最佳影片', icon: 'award', class: 'oscar' },
        cannes: { name: '坎城金棕櫚獎', icon: 'palmtree', class: 'cannes' },
        venice: { name: '威尼斯金獅獎', icon: 'crown', class: 'venice' },
        berlin: { name: '柏林金熊獎', icon: 'gem', class: 'berlin' }
    };
    
    // Render movies in grid
    function renderMovies() {
        moviesGrid.innerHTML = '';
        const list = getFilteredMovies();
        
        if (list.length === 0) {
            noResults.classList.remove('hidden');
            return;
        }
        noResults.classList.add('hidden');
        
        list.forEach(movie => {
            const isWatched = watchedIds.includes(movie.id);
            const conf = festivalConfig[movie.festival] || { name: movie.festival, icon: 'film', class: '' };
            
            const card = document.createElement('div');
            card.className = `movie-card ${isWatched ? 'watched' : ''} ${movie.festival}-card`;
            card.dataset.id = movie.id;
            
            card.innerHTML = `
                <div class="card-header-meta">
                    <span class="card-festival-badge ${conf.class}">
                        <i data-lucide="${conf.icon}"></i> ${conf.name}
                    </span>
                    <span class="card-year">${movie.year}</span>
                </div>
                <div class="card-body">
                    <h3 class="card-title-cn" title="${movie.title_cn}">${movie.title_cn}</h3>
                    <p class="card-title-en" title="${movie.title_en}">${movie.title_en}</p>
                    <div class="card-details">
                        <span class="card-label">導演</span>
                        <span class="card-val" title="${movie.director}">${movie.director}</span>
                        <span class="card-label">國家</span>
                        <span class="card-val" title="${movie.country}">${movie.country}</span>
                    </div>
                </div>
                <div class="card-footer">
                    <label class="watched-toggle">
                        <div class="toggle-box">
                            <i data-lucide="check"></i>
                        </div>
                        <span>已觀看</span>
                    </label>
                    <button class="btn-detail-link" title="查看詳情">
                        <i data-lucide="info"></i>
                    </button>
                </div>
            `;
            
            // Toggle watch status click
            const toggle = card.querySelector('.watched-toggle');
            toggle.addEventListener('click', (e) => {
                e.stopPropagation(); // prevent card click
                toggleWatched(movie.id);
            });
            
            // Detail click (clicking body or detail button)
            const body = card.querySelector('.card-body');
            body.addEventListener('click', () => showMovieDetail(movie));
            
            const detailBtn = card.querySelector('.btn-detail-link');
            detailBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                showMovieDetail(movie);
            });
            
            moviesGrid.appendChild(card);
        });
        
        // Re-run Lucide icons creation for new items
        lucide.createIcons();
    }
    
    // Toggle watched state of a movie
    function toggleWatched(id) {
        const index = watchedIds.indexOf(id);
        if (index === -1) {
            watchedIds.push(id);
        } else {
            watchedIds.splice(index, 1);
        }
        
        saveWatchedMovies();
        updateProgress();
        
        // Update card directly without full re-render for smooth experience
        const card = document.querySelector(`.movie-card[data-id="${id}"]`);
        if (card) {
            const isWatched = watchedIds.includes(id);
            if (isWatched) {
                card.classList.add('watched');
            } else {
                card.classList.remove('watched');
            }
        }
    }
    
    // Open details modal
    function showMovieDetail(movie) {
        detailTitleCn.textContent = movie.title_cn;
        detailTitleEn.textContent = movie.title_en;
        
        const conf = festivalConfig[movie.festival] || { name: movie.festival };
        detailFestival.textContent = conf.name;
        detailFestival.className = `detail-badge ${movie.festival}`;
        
        detailYear.textContent = `${movie.year} 年`;
        detailDirector.textContent = movie.director;
        detailCountry.textContent = movie.country;
        
        // Link Search Setup
        const queryText = `${movie.title_cn} ${movie.title_en} ${movie.year}`;
        linkImdb.href = `https://www.imdb.com/find?q=${encodeURIComponent(movie.title_en)}`;
        linkLetterboxd.href = `https://letterboxd.com/search/${encodeURIComponent(movie.title_en)}`;
        linkYoutube.href = `https://www.youtube.com/results?search_query=${encodeURIComponent(queryText + ' 預告')}`;
        
        openModal(modalDetail);
    }
    
    // Setup Modal helper functions
    function openModal(modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeModal(modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Setup Modals event handlers
    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const activeModal = document.querySelector('.modal.active');
            if (activeModal) closeModal(activeModal);
        });
    });
    
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            closeModal(e.target);
        }
    });

    // Filters and search inputs event listeners
    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.trim();
        renderMovies();
    });
    
    filterDecade.addEventListener('change', (e) => {
        selectedDecade = e.target.value;
        renderMovies();
    });
    
    filterCountry.addEventListener('change', (e) => {
        selectedCountry = e.target.value;
        renderMovies();
    });
    
    filterStatus.addEventListener('change', (e) => {
        selectedStatus = e.target.value;
        renderMovies();
    });
    
    // Tab switching event listener
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            tabButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentTab = btn.dataset.tab;
            renderMovies();
        });
    });

    // --- Cinephile Roulette (隨機抽選) ---
    btnRoulette.addEventListener('click', () => {
        rouletteWheel.classList.remove('hidden');
        rouletteResult.classList.add('hidden');
        rouletteWheel.innerHTML = '<span class="wheel-text">今晚看哪一部好呢？...</span>';
        openModal(modalRoulette);
    });
    
    btnSpin.addEventListener('click', () => {
        // Filter unwatched movies from current filters
        const unwatchedFiltered = getFilteredMovies().filter(m => !watchedIds.includes(m.id));
        
        if (unwatchedFiltered.length === 0) {
            rouletteWheel.innerHTML = '<span class="wheel-text" style="color: var(--color-berlin);">此條件下沒有未觀看的電影喔！</span>';
            return;
        }
        
        btnSpin.disabled = true;
        rouletteWheel.classList.remove('hidden');
        rouletteResult.classList.add('hidden');
        
        let counter = 0;
        const maxSpins = 15;
        const interval = setInterval(() => {
            const randMovie = unwatchedFiltered[Math.floor(Math.random() * unwatchedFiltered.length)];
            rouletteWheel.innerHTML = `<span class="wheel-text" style="font-size: 1.4rem;">🎬 ${randMovie.title_cn}</span>`;
            counter++;
            
            if (counter >= maxSpins) {
                clearInterval(interval);
                
                // Final selection
                const finalMovie = unwatchedFiltered[Math.floor(Math.random() * unwatchedFiltered.length)];
                showRouletteResult(finalMovie);
                btnSpin.disabled = false;
            }
        }, 120);
    });
    
    function showRouletteResult(movie) {
        rouletteWheel.classList.add('hidden');
        rouletteResult.classList.remove('hidden');
        
        const conf = festivalConfig[movie.festival] || { name: movie.festival, class: '' };
        
        rouletteResult.innerHTML = `
            <div class="movie-card watched ${movie.festival}-card" style="margin: 0; box-shadow: 0 4px 15px rgba(0,0,0,0.5);">
                <div class="card-header-meta">
                    <span class="card-festival-badge ${conf.class}">${conf.name}</span>
                    <span class="card-year">${movie.year}</span>
                </div>
                <div class="card-body">
                    <h3 class="card-title-cn" style="font-size: 1.25rem;">${movie.title_cn}</h3>
                    <p class="card-title-en" style="margin-bottom: 16px;">${movie.title_en}</p>
                    <div class="card-details" style="font-size: 0.85rem;">
                        <span class="card-label">導演</span>
                        <span class="card-val">${movie.director}</span>
                        <span class="card-label">國家</span>
                        <span class="card-val">${movie.country}</span>
                    </div>
                </div>
                <div class="card-footer" style="margin-top: 15px;">
                    <span style="font-size: 0.85rem; font-weight: 700; color: var(--accent-gold);">推薦選片！</span>
                    <button class="btn btn-secondary btn-small" id="btn-roulette-detail">查看詳情</button>
                </div>
            </div>
        `;
        
        const detailBtn = document.getElementById('btn-roulette-detail');
        detailBtn.addEventListener('click', () => {
            closeModal(modalRoulette);
            showMovieDetail(movie);
        });
    }

    // --- Share Card Generator (畫 Canvas 分享卡片) ---
    btnShare.addEventListener('click', () => {
        openModal(modalShare);
        drawShareCard();
    });
    
    shareUsernameInput.addEventListener('input', () => {
        drawShareCard();
    });
    
    function drawShareCard() {
        const ctx = shareCanvas.getContext('2d');
        const username = shareUsernameInput.value.trim() || '社團資深影迷';
        
        // Draw background
        // Linear gradient dark theater theme
        const bgGrad = ctx.createLinearGradient(0, 0, 600, 400);
        bgGrad.addColorStop(0, '#0f1216');
        bgGrad.addColorStop(1, '#1b222c');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, 600, 400);
        
        // Draw gold outer border line
        ctx.strokeStyle = '#c5a059';
        ctx.lineWidth = 4;
        ctx.strokeRect(10, 10, 580, 380);
        
        ctx.strokeStyle = 'rgba(197, 160, 89, 0.25)';
        ctx.lineWidth = 1;
        ctx.strokeRect(15, 15, 570, 370);
        
        // Draw Header Title
        ctx.fillStyle = '#c5a059';
        ctx.font = 'bold 24px "Outfit", "Noto Sans TC"';
        ctx.fillText('🎬 影迷觀影殿堂解鎖證書', 40, 55);
        
        ctx.fillStyle = '#8f9aa8';
        ctx.font = '12px "Outfit", "Noto Sans TC"';
        ctx.fillText('奧斯卡 ‧ 坎城 ‧ 威尼斯 ‧ 柏林四大殿堂得獎清單追蹤', 40, 80);
        
        // Draw separator line
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
        ctx.beginPath();
        ctx.moveTo(40, 95);
        ctx.lineTo(560, 95);
        ctx.stroke();
        
        // Stats Calculations
        const total = window.MOVIE_DATA ? window.MOVIE_DATA.length : 0;
        const watchedCount = window.MOVIE_DATA ? window.MOVIE_DATA.filter(m => watchedIds.includes(m.id)).length : 0;
        const overallPercent = total > 0 ? (watchedCount / total) * 100 : 0;
        
        const fests = {
            oscar: { total: 0, watched: 0, label: '奧斯卡最佳影片', color: '#e5c158' },
            cannes: { total: 0, watched: 0, label: '坎城金棕櫚獎', color: '#00e676' },
            venice: { total: 0, watched: 0, label: '威尼斯金獅獎', color: '#2979ff' },
            berlin: { total: 0, watched: 0, label: '柏林金熊獎', color: '#ff1744' }
        };
        
        if (window.MOVIE_DATA) {
            window.MOVIE_DATA.forEach(m => {
                if (fests[m.festival]) {
                    fests[m.festival].total++;
                    if (watchedIds.includes(m.id)) {
                        fests[m.festival].watched++;
                    }
                }
            });
        }
        
        // Draw Left: User info and overall percentage
        ctx.fillStyle = '#f5f6f8';
        ctx.font = 'bold 20px "Outfit", "Noto Sans TC"';
        ctx.fillText(username, 40, 140);
        
        ctx.fillStyle = '#8f9aa8';
        ctx.font = '14px "Outfit", "Noto Sans TC"';
        ctx.fillText('已在四大殿堂解鎖解密：', 40, 170);
        
        // Big Percentage text
        ctx.fillStyle = '#e5c158';
        ctx.font = 'bold 54px "Outfit", "Noto Sans TC"';
        ctx.fillText(`${overallPercent.toFixed(1)}%`, 40, 235);
        
        ctx.fillStyle = '#f5f6f8';
        ctx.font = '500 15px "Outfit", "Noto Sans TC"';
        ctx.fillText(`已觀看 ${watchedCount} / 總共 ${total} 部`, 40, 270);
        
        // Fun Tier Badge
        let tier = "新手影迷";
        if (overallPercent >= 90) tier = "傳奇神級影聖 🏆";
        else if (overallPercent >= 70) tier = "狂熱大師影癡 🍿";
        else if (overallPercent >= 50) tier = "電影專家達人 🎥";
        else if (overallPercent >= 30) tier = "資深電影大師 🎬";
        else if (overallPercent >= 10) tier = "文青文雅影迷 🎞️";
        else tier = "新晉入門影迷 📽️";
        
        ctx.fillStyle = 'rgba(197, 160, 89, 0.15)';
        ctx.fillRect(40, 290, 210, 32);
        ctx.strokeStyle = '#c5a059';
        ctx.lineWidth = 1;
        ctx.strokeRect(40, 290, 210, 32);
        
        ctx.fillStyle = '#f5f6f8';
        ctx.font = 'bold 13px "Outfit", "Noto Sans TC"';
        ctx.fillText(tier, 55, 311);
        
        // Draw Right: Festival breakdown progress bars
        let startY = 135;
        Object.keys(fests).forEach(fest => {
            const data = fests[fest];
            const pct = data.total > 0 ? (data.watched / data.total) * 100 : 0;
            
            // Label
            ctx.fillStyle = '#f5f6f8';
            ctx.font = 'bold 12px "Outfit", "Noto Sans TC"';
            ctx.fillText(data.label, 290, startY);
            
            // Stats Text
            ctx.fillStyle = '#8f9aa8';
            ctx.font = '11px "Outfit", "Noto Sans TC"';
            ctx.fillText(`${data.watched}/${data.total} (${pct.toFixed(0)}%)`, 490, startY);
            
            // Progress Track
            ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
            ctx.fillRect(290, startY + 8, 260, 8);
            
            // Progress Bar Fill
            ctx.fillStyle = data.color;
            ctx.fillRect(290, startY + 8, (pct / 100) * 260, 8);
            
            startY += 50;
        });
        
        // Draw Footer Branding text
        ctx.fillStyle = '#8f9aa8';
        ctx.font = '10px "Outfit", "Noto Sans TC"';
        ctx.fillText('奧斯卡坎城柏林威尼斯都可以 ‧ 社群專屬追蹤器', 40, 360);
    }
    
    // Download generated sharing card
    btnDownloadCard.addEventListener('click', () => {
        const username = shareUsernameInput.value.trim() || '社團資深影迷';
        const dataUrl = shareCanvas.toDataURL('image/png');
        
        const link = document.createElement('a');
        link.download = `影迷雷達解鎖證書-${username}.png`;
        link.href = dataUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });

    // Fallback Mock Data just in case raw download is still in progress
    const mockMoviesFallback = [
        { id: 'cannes_2024_anora', festival: 'cannes', year: 2024, title_cn: '阿諾拉', title_en: 'Anora', director: 'Sean Baker', country: 'United States' },
        { id: 'oscar_2024_oppenheimer', festival: 'oscar', year: 2023, title_cn: '奧本海默', title_en: 'Oppenheimer', director: 'Christopher Nolan', country: 'United States' },
        { id: 'oscar_2022_everything', festival: 'oscar', year: 2022, title_cn: '媽的多重宇宙', title_en: 'Everything Everywhere All at Once', director: 'Daniel Kwan, Daniel Scheinert', country: 'United States' },
        { id: 'cannes_2019_parasite', festival: 'cannes', year: 2019, title_cn: '寄生上流', title_en: 'Parasite', director: 'Bong Joon Ho', country: 'South Korea' }
    ];

    // Load initial data and render
    function init() {
        if (!window.MOVIE_DATA) {
            console.warn("MOVIE_DATA not found. Retrying in 1s or loading mock fallback...");
            // Set mock movies as fallback just in case data.js is not loaded yet
            window.MOVIE_DATA = mockMoviesFallback;
        }
        
        updateProgress();
        renderMovies();
    }
    
    // If database takes a bit longer to download, retry rendering once loaded
    let initRetries = 0;
    function checkDataAndInit() {
        if (window.MOVIE_DATA && window.MOVIE_DATA.length > mockMoviesFallback.length) {
            init();
        } else if (initRetries < 5) {
            initRetries++;
            setTimeout(checkDataAndInit, 1000);
        } else {
            init();
        }
    }
    
    checkDataAndInit();
});
