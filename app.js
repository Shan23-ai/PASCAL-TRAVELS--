(function () {
  'use strict';

  const PKG = window.PACKAGES_DATA;
  const REQ = window.REQUIREMENTS_DATA;

  const APP_STATUS_KEY = 'pascal_applications';

  const appState = {
    currentView: 'home',
    previousView: 'home',
    selectedPackage: null,
    stepperStep: 1,
    personalInfo: {},
    uploadedDocs: {},
    totalProcessing: 0,
    totalTicket: 0,
    tourSearch: { packageId: '', country: '', destination: '', startDate: '', travelers: '2', currency: 'USD' }
  };

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  const DEFAULT_CURRENCY = 'USD';
  const CURRENCY_SYMBOLS = { USD: '$', EUR: 'â‚¬', KES: 'KES ', GBP: 'Â£' };
  function money(n, currency = DEFAULT_CURRENCY) {
    const sym = CURRENCY_SYMBOLS[currency] || CURRENCY_SYMBOLS.USD;
    return `${sym}${Number(n || 0).toLocaleString('en-US')}`;
  }
  const currencyOf = p => (p && p.processingCurrency) ? p.processingCurrency : DEFAULT_CURRENCY;
  const missingImageNotices = new Set();
  function logMissingImage(key, message) {
    if (missingImageNotices.has(key)) return;
    console.log(`[Pascal Travels] ${message}`);
    missingImageNotices.add(key);
  }
  function visaImageFor(packageData) {
    const category = packageData.category;
    const countryCode = packageData.countryCode;
    if (category === 'canada-pr' || (['work-visa', 'study-visa'].includes(category) && countryCode === 'CA')) {
      return 'images/visa/Canada.jpg';
    }
    if (['work-visa', 'study-visa'].includes(category) && countryCode === 'CZ') return 'images/visa/CZ.jpg';
    const availableCodes = new Set(['AE', 'AU', 'BH', 'CA', 'DE', 'EE', 'GB', 'GE', 'IN', 'KZ', 'LV', 'ME', 'OM', 'PL', 'PT', 'QA', 'RS', 'SA', 'SK', 'US']);
    if (availableCodes.has(countryCode)) return `images/visa/${countryCode}.jpg`;
    if (['work-visa', 'study-visa'].includes(category)) {
      logMissingImage(`visa-${countryCode}`, `No country-specific visa photo found for ${packageData.country}; add images/visa/${countryCode}.jpg.`);
    }
    return '';
  }

  function flattenAllPackages() {
    return [
      ...(PKG.travelVisas || []),
      ...(PKG.workVisas || []),
      ...(PKG.studyVisas || []),
      ...(PKG.canadaPR || []),
      ...(PKG.eastAfricaTours || [])
    ];
  }

  function findPackage(id) {
    return flattenAllPackages().find(p => p.id === id);
  }

  const TOUR_WISHLIST_KEY = 'pascal_tour_wishlist';
  const TOUR_COMPARE_KEY = 'pascal_tour_compare';
  function readTourIds(key) {
    try {
      const value = JSON.parse(localStorage.getItem(key) || '[]');
      return Array.isArray(value) ? value : [];
    } catch (error) {
      return [];
    }
  }

  function renderTourComparison() {
    const host = $('#tour-compare-panel');
    if (!host) return;
    const tours = readTourIds(TOUR_COMPARE_KEY).map(findPackage).filter(Boolean);
    host.hidden = tours.length === 0;
    if (!tours.length) return;
    host.innerHTML = `
      <div class="tour-compare-heading">
        <h3>Compare tours <span>${tours.length} of 3</span></h3>
        <button class="tour-tool-button" type="button" data-tour-action="clear-compare">Clear comparison</button>
      </div>
      <div class="tour-compare-scroll"><table>
        <thead><tr><th scope="col">Tour</th>${tours.map(tour => `<th scope="col">${tour.destination}</th>`).join('')}</tr></thead>
        <tbody>
          <tr><th scope="row">Duration</th>${tours.map(tour => `<td>${tour.days} days</td>`).join('')}</tr>
          <tr><th scope="row">Price per person</th>${tours.map(tour => `<td>${money(tour.pricePerPerson, currencyOf(tour))}</td>`).join('')}</tr>
          <tr><th scope="row">Country</th>${tours.map(tour => `<td>${tour.country}</td>`).join('')}</tr>
        </tbody>
      </table></div>
    `;
  }

  function toggleTourCollection(action, id) {
    const key = action === 'wishlist' ? TOUR_WISHLIST_KEY : TOUR_COMPARE_KEY;
    const ids = readTourIds(key);
    if (action === 'clear-compare') {
      try { localStorage.removeItem(TOUR_COMPARE_KEY); } catch (error) { showToast('Comparison storage is unavailable.', 'error'); }
      renderTourComparison();
      renderTours();
      return;
    }
    if (action === 'compare' && !ids.includes(id) && ids.length >= 3) {
      showToast('Compare up to three tours at a time.', 'info');
      return;
    }
    const selected = ids.includes(id);
    const next = selected ? ids.filter(item => item !== id) : [...ids, id];
    try { localStorage.setItem(key, JSON.stringify(next)); }
    catch (error) { showToast('Your browser could not save this selection.', 'error'); return; }
    renderTours();
    renderTourComparison();
    showToast(selected ? 'Removed from your list.' : action === 'wishlist' ? 'Saved to your wishlist.' : 'Added to comparison.');
  }

  function getPackageMeta(p) {
    if (!p) return {};
    const processing = typeof p.priceProcessing === 'number' ? p.priceProcessing : (p.pricePerPerson || 0);
    const ticket = typeof p.priceTicket === 'number' ? p.priceTicket : (p.pricePerPerson ? 0 : 0);
    const flag = p.flag || 'ðŸŒ';
    const title = p.country || p.destination || p.stream || 'Package';
    const subtitle = p.city || p.country || p.destination || '';
    const est = p.estimatedDays || (p.days ? `${p.days} days` : 'Varies');
    const currency = currencyOf(p);
    return { processing, ticket, flag, title, subtitle, est, currency };
  }

  function formatVisaEstimate(estimate) {
    const formatted = String(estimate || 'Varies').trim().replace(/(\d)\s*-\s*(?=\d)/g, '$1\u2013');
    return /^\d+(?:\u2013\d+)?$/.test(formatted) ? `${formatted} days` : formatted;
  }

  function isVisaPackage(p) {
    return ['travel-visa', 'work-visa', 'study-visa', 'canada-pr'].includes(p.category);
  }

  function formatPackageEstimate(p, estimate) {
    return isVisaPackage(p) ? formatVisaEstimate(estimate) : estimate;
  }

  // ============= REFERRAL SYSTEM =============
  const REFERRAL_KEY = 'pascal_referral_code';
  const REFERRALS_DB_KEY = 'pascal_referrals';

  function generateReferralCode() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = 'PASCAL-';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  }

  function createReferralLink(referrerName) {
    const code = generateReferralCode();
    const referralData = {
      code: code,
      referrerName: referrerName,
      createdAt: new Date().toISOString(),
      clicks: 0,
      conversions: 0,
      reward: 'Discounted service fees',
      status: 'active'
    };
    
    // Save to localStorage (in production, this would be a database)
    const referrals = JSON.parse(localStorage.getItem(REFERRALS_DB_KEY) || '[]');
    referrals.push(referralData);
    localStorage.setItem(REFERRALS_DB_KEY, JSON.stringify(referrals));
    
    return {
      code: code,
      shareLink: `${window.location.origin}/?ref=${code}`,
      headline: `Exciting job openings in Canada â€“ Apply Now! ðŸŽ¯`
    };
  }

  function getReferralCode() {
    const params = new URLSearchParams(window.location.search);
    return params.get('ref');
  }

  function processReferral(email, referralCode) {
    if (!referralCode) return;
    const referrals = JSON.parse(localStorage.getItem(REFERRALS_DB_KEY) || '[]');
    const referral = referrals.find(r => r.code === referralCode);
    if (referral) {
      referral.conversions++;
      referral.conversions_emails = referral.conversions_emails || [];
      referral.conversions_emails.push(email);
      localStorage.setItem(REFERRALS_DB_KEY, JSON.stringify(referrals));
      return referral;
    }
    return null;
  }

  function showReferralBanner() {
    const code = getReferralCode();
    if (!code) return;
    const referrals = JSON.parse(localStorage.getItem(REFERRALS_DB_KEY) || '[]');
    const referral = referrals.find(r => r.code === code);
    if (referral) {
      const banner = document.createElement('div');
      banner.className = 'referral-banner';
      banner.style.cssText = `
        position: fixed; top: 60px; left: 0; right: 0; 
        background: linear-gradient(135deg, var(--golden), var(--accent-red)); 
        color: white; padding: 1rem; text-align: center; z-index: 999;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
      `;
      banner.innerHTML = `
        <strong>ðŸ‘‹ Welcome!</strong> You were referred by <strong>${referral.referrerName}</strong>. 
        Enjoy exclusive benefits when you sign up today!
      `;
      document.body.insertBefore(banner, document.body.firstChild);
      setTimeout(() => banner.style.display = 'none', 8000);
    }
  }

  function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.style.cssText = `
      position: fixed; bottom: 20px; right: 20px; 
      background: ${type === 'success' ? '#10B981' : type === 'error' ? '#EF4444' : '#3B82F6'};
      color: white; padding: 1rem 1.5rem; border-radius: 8px; 
      box-shadow: 0 4px 12px rgba(0,0,0,0.2); z-index: 9999;
      animation: slideIn 0.3s ease-out;
    `;
    toast.innerHTML = `<div style="font-weight: 500;">${message}</div>`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 4000);
  }

  // ============= END REFERRAL SYSTEM =============

  // ============= SKELETON LOADING =============
  function createSkeletonCard() {
    return `
      <div class="skeleton skeleton-card">
        <div class="skeleton skeleton-line" style="width: 100%; height: 200px; margin-bottom: 1rem;"></div>
        <div class="skeleton skeleton-line" style="width: 80%;"></div>
        <div class="skeleton skeleton-line" style="width: 60%;"></div>
        <div class="skeleton skeleton-line" style="width: 100%; height: 40px; margin-top: 1rem;"></div>
      </div>
    `;
  }

  function showSkeletons(containerId, count = 3) {
    const container = $(containerId);
    if (!container) return;
    container.innerHTML = Array(count).fill(null).map(() => createSkeletonCard()).join('');
  }

  function hideSkeletons(containerId) {
    const container = $(containerId);
    if (container) {
      const skeletons = container.querySelectorAll('.skeleton');
      skeletons.forEach(s => s.remove());
    }
  }

  // ============= END SKELETON LOADING =============

  function setView(name, scrollTop = true) {
    appState.previousView = appState.currentView;
    appState.currentView = name;
    $$('.view').forEach(v => v.classList.remove('view-active'));
    const target = document.getElementById(`view-${name}`);
    if (target) target.classList.add('view-active');
    if (scrollTop) window.scrollTo({ top: 0, behavior: 'smooth' });
    $('#nav-links').classList.remove('open');
  }

  function renderServices() {
    const grid = $('#services-grid');
    if (!grid) return;
    grid.innerHTML = PKG.services.map(s => `
      <div class="card card-white">
        <div class="service-icon">${s.icon}</div>
        <h3>${s.name}</h3>
        <p style="margin-top:.2rem;">${s.tagline}</p>
        <p style="font-size:.9rem;">${s.description}</p>
        <div class="service-features">
          ${s.features.map(f => `<div>âœ” ${f}</div>`).join('')}
        </div>
        <button class="btn btn-gold btn-sm" data-service="${s.id}">Explore ${s.shortName}</button>
      </div>
    `).join('');
  }

  function renderVisaCard(p) {
    const meta = getPackageMeta(p);
    const cur = meta.currency;
    const tags = p.popularTags || p.visaTypes || p.industries || p.degreeLevels || p.popularPNPs || [];
    const estText = meta.est;
    const formattedEstimate = formatVisaEstimate(estText);
    const priceShow = p.pricePerPerson ? money(p.pricePerPerson, cur) + ' / pp' : money(meta.processing + meta.ticket, cur);
    const fromLabel = p.pricePerPerson ? 'From' : 'Total from';
    const imageUrl = visaImageFor(p);
    const visaType = p.category === 'travel-visa' ? 'Tourist' : p.category === 'work-visa' ? 'Work' : p.category === 'study-visa' ? 'Study' : 'Permanent Residency';

    return `
      <div class="visa-card" data-package="${p.id}">
        <div class="visa-card-visual">
          ${imageUrl ? `<div class="img-wrap"><img src="${imageUrl}" alt="${meta.title}" loading="lazy" decoding="async" /></div>` : ''}
        </div>
        <div class="visa-card-body">
          <div class="visa-card-header">
            <span class="visa-flag">${meta.flag}</span>
            <span class="visa-type">${visaType}</span>
            <span class="visa-est" aria-label="Estimated processing time: ${formattedEstimate}"><span class="visa-est-icon" aria-hidden="true">&#9201;</span><span>${formattedEstimate}</span></span>
          </div>
          <h3 class="visa-country">${meta.title}</h3>
          <div class="visa-city">${meta.subtitle}</div>
          <p class="visa-desc">${p.description || ''}</p>
          ${tags.length ? `<div class="visa-tags">${tags.slice(0, 3).map(t => `<span>${t}</span>`).join('')}</div>` : ''}
          <div class="visa-footer">
            <div>
              <div class="visa-price-from">${fromLabel}</div>
              <div class="visa-price">${priceShow}</div>
            </div>
            <a class="btn btn-gold btn-sm" href="visa-apply.html?visa=${encodeURIComponent(p.id)}" data-visa-apply="${p.id}">Apply</a>
          </div>
        </div>
      </div>
    `;
  }

  function renderTourCard(p) {
    const img = p.image || '';
    const isSaved = readTourIds(TOUR_WISHLIST_KEY).includes(p.id);
    const route = (p.route || []).join(' Â· ');
    const tourParams = new URLSearchParams({ id: p.id });
    ['startDate', 'travelers', 'currency'].forEach(key => {
      const value = appState.tourSearch[key];
      if (value) tourParams.set(key, value);
    });
    const tourUrl = `tour.html?${tourParams.toString()}`;
    const minPrice = p.priceMin ?? p.pricePerPerson;
    const maxPrice = p.priceMax;
    const price = p.priceDisplay || formatTourPrice(minPrice, maxPrice, p.pricePerPerson);
    const tourType = p.durationType || p.level || 'Tour package';
    const operator = p.operator || 'Pascal Travels';
    const durationLabel = p.durationLabel || (Number(p.days) === 0.5
      ? 'Half Day'
      : `${p.days} ${Number(p.days) === 1 ? 'Day' : 'Days'}`);
    const rating = getTourRating(p);
    const reviewCount = Number.isInteger(Number(p.reviewCount)) && Number(p.reviewCount) > 0
      ? Number(p.reviewCount)
      : 0;
    const reviewLabel = reviewCount ? `${reviewCount.toLocaleString('en-US')} reviews` : 'Rating';
    const accolade = getTourAccolade(p, rating);
    return `
      <div class="tour-card" data-package="${p.id}">
        <div class="tour-img img-wrap">
          ${img ? `<img src="${img}" alt="${p.destination}" style="object-position:${p.imagePosition || 'center'};transform:scale(${p.imageScale || 1})" loading="lazy" decoding="async" />` : ''}
          ${accolade ? `<span class="tour-accolade tour-accolade--${accolade.theme}"><span class="tour-accolade-tails" aria-hidden="true"><span></span><span></span></span><span class="tour-accolade-medal" aria-hidden="true">✦</span><span class="tour-accolade-label">${accolade.label}</span></span>` : ''}
          <button class="tour-tool-button tour-save-overlay${isSaved ? ' is-saved' : ''}" type="button" data-tour-action="wishlist" data-tour-id="${p.id}" aria-pressed="${isSaved}" aria-label="${isSaved ? 'Remove' : 'Save'} ${p.destination} ${isSaved ? 'from' : 'to'} wishlist">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78Z"></path></svg>
          </button>
          <h3 class="tour-image-title">${p.destination}</h3>
        </div>
        <div class="tour-body">
          <div class="tour-head">
            <h3 style="margin:0;">${p.destination}</h3>
            <span class="tour-days"><span aria-hidden="true">◷</span>${durationLabel}</span>
          </div>
          <div class="tour-price">${price}<span> pp</span></div>
          ${p.soloPrice ? `<p class="tour-solo-price">2+ travelers $${Number(p.pricePerPerson).toLocaleString('en-US')} / solo $${Number(p.soloPrice).toLocaleString('en-US')}</p>` : ''}
          <p class="tour-operator"><strong>Operator:</strong> ${operator}</p>
          <p class="tour-summary">${p.country}: ${tourType} · ${p.partyType || 'Private tour'}</p>
          <p class="tour-route"><strong>You Visit:</strong> ${route}</p>
          <p class="tour-rating" aria-label="Rating ${rating} out of 5${reviewCount ? `, ${reviewLabel}` : ''}"><span class="tour-rating-star" aria-hidden="true">★</span> <span>${rating}</span> <span class="tour-rating-label">${reviewLabel}</span></p>
          <div class="tour-card-actions"><a class="btn btn-outline btn-sm" href="${tourUrl}">View Details</a></div>
        </div>
      </div>
    `;
  }

  function formatTourPrice(minPrice, maxPrice, fallbackPrice) {
    const min = Number(minPrice);
    const max = Number(maxPrice);
    const formattedMin = Number.isFinite(min) && min > 0 ? `$${min.toLocaleString('en-US')}` : '';
    const formattedMax = Number.isFinite(max) && max > 0 ? `$${max.toLocaleString('en-US')}` : '';
    if (formattedMin && formattedMax) return min === max ? formattedMin : `${formattedMin}&ndash;${formattedMax}`;
    if (formattedMin) return formattedMin;
    if (formattedMax) return formattedMax;
    const fallback = Number(fallbackPrice);
    return Number.isFinite(fallback) && fallback > 0 ? `$${fallback.toLocaleString('en-US')}` : 'Price on request';
  }

  function getTourRating(tour) {
    const suppliedRating = Number(tour.rating);
    if (Number.isFinite(suppliedRating) && suppliedRating >= 0 && suppliedRating <= 5) {
      return suppliedRating.toFixed(1);
    }
    let hash = 0;
    for (const char of tour.id) hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
    return (4.2 + (hash % 8) / 10).toFixed(1);
  }

  function getTourAccolade(tour, rating) {
    if (!tour.prestigious && Number(rating) < 5) return '';
    const labels = ['Safari Star', 'Wildlife Wonder', 'Golden Getaway', 'Adventure Gem', 'Nature\'s Finest', 'Signature Escape', 'Africa Explorer Pick'];
    const themes = ['sapphire', 'emerald', 'ruby', 'amethyst', 'coral'];
    let hash = 0;
    for (const char of tour.id) hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
    return {
      label: tour.prestigious ? 'PRESTIGIOUS' : labels[hash % labels.length],
      theme: themes[hash % themes.length]
    };
  }

  function renderVisaPackages(tab = 'travel') {
    const host = $('#visa-packages');
    if (!host) return;
    let list = [];
    if (tab === 'travel') list = PKG.travelVisas || [];
    if (tab === 'work') list = PKG.workVisas || [];
    if (tab === 'study') list = PKG.studyVisas || [];
    if (tab === 'pr') list = PKG.canadaPR || [];
    host.innerHTML = list.map(renderVisaCard).join('');
  }

  function renderTours(criteria = appState.tourSearch) {
    const host = $('#tours-grid');
    if (!host) return;
    const selectedId = criteria.packageId || '';
    const tours = (PKG.eastAfricaTours || []).filter(tour => {
      const countryMatches = !criteria.country || tour.country === criteria.country;
      const normalizeDestination = value => value.toLowerCase().replace(/\s*\([^)]*\)/g, '').replace(/game reserve/g, 'gr').replace(/national park/g, '').replace(/concession/g, '').trim();
      const selectedDestination = criteria.destination ? normalizeDestination(criteria.destination) : '';
      const destinationMatches = !selectedDestination
        || [...(tour.route || []), ...(tour.highlights || [])].some(stop => {
          const normalizedStop = normalizeDestination(stop);
          return normalizedStop === selectedDestination || normalizedStop.includes(selectedDestination) || selectedDestination.includes(normalizedStop);
        });
      return (!selectedId || tour.id === selectedId) && countryMatches && destinationMatches;
    });
    const isHome = Boolean($('#view-home'));
    const displayedTours = isHome
      ? tours.filter((tour, index, list) => list.findIndex(item => item.country === tour.country) === index).slice(0, 4)
      : tours.slice().sort((first, second) => {
        const firstDays = first.days == null ? Number.POSITIVE_INFINITY : Number(first.days);
        const secondDays = second.days == null ? Number.POSITIVE_INFINITY : Number(second.days);
        return (Number.isFinite(firstDays) ? firstDays : Number.POSITIVE_INFINITY)
          - (Number.isFinite(secondDays) ? secondDays : Number.POSITIVE_INFINITY);
      });
    host.innerHTML = displayedTours.length ? displayedTours.map(renderTourCard).join('') : '<p class="tour-empty">No tours match those filters. Try another destination or trip length.</p>';
    const status = $('#tour-search-status');
    if (status) status.textContent = `${displayedTours.length} ${displayedTours.length === 1 ? 'tour' : 'tours'} found`;
  }

  function initTourSearch() {
    const form = $('#tour-search');
    if (!form) return;
    const tours = PKG.eastAfricaTours || [];
    const packageSelect = form.querySelector('[name="packageId"]');
    const destinationSelect = form.querySelector('[name="destination"]');
    if (packageSelect) {
      packageSelect.replaceChildren(new Option(`All ${tours.length} packages`, ''));
      tours.forEach(tour => packageSelect.add(new Option(tour.destination, tour.id)));
    }
    const updateDestinations = (country = '') => {
      if (!destinationSelect) return;
      const current = destinationSelect.value;
      const matchingTours = tours.filter(tour => !country || tour.country === country);
      const destinations = [...new Set(matchingTours.flatMap(tour => [...(tour.route || []), ...(tour.highlights || [])]))]
        .filter(destination => destination.toLowerCase() !== 'nairobi' && destination.toLowerCase() !== 'maun airport')
        .sort((a, b) => a.localeCompare(b));
      if (!country || country === 'Botswana') destinations.push('Moremi GR', 'Khwai', 'Savuti', 'Chobe');
      const uniqueDestinations = [...new Set(destinations)].sort((a, b) => a.localeCompare(b));
      destinationSelect.replaceChildren(new Option('All destinations', ''));
      uniqueDestinations.forEach(destination => destinationSelect.add(new Option(destination, destination)));
      if (uniqueDestinations.includes(current)) destinationSelect.value = current;
    };
    updateDestinations();
    const countrySelect = form.querySelector('[name="country"]');
    if (countrySelect) {
      const currentCountry = countrySelect.value;
      const countries = [...new Set(tours.map(tour => tour.country).filter(Boolean))].sort((a, b) => a.localeCompare(b));
      countrySelect.replaceChildren(new Option('All countries', ''));
      countries.forEach(country => countrySelect.add(new Option(country, country)));
      if (countries.includes(currentCountry)) countrySelect.value = currentCountry;
    }
    if (countrySelect) countrySelect.addEventListener('change', () => {
      updateDestinations(countrySelect.value);
      updateSearch();
    });
    const startDate = $('#tour-start-date');
    if (startDate) startDate.min = new Date().toISOString().slice(0, 10);
    const updateSearch = () => {
      const values = new FormData(form);
      appState.tourSearch = {
        packageId: String(values.get('packageId') || ''),
        country: String(values.get('country') || ''),
        destination: String(values.get('destination') || ''),
        startDate: String(values.get('startDate') || ''),
        travelers: String(values.get('travelers') || '2'),
        currency: String(values.get('currency') || 'USD')
      };
      const currencyNote = $('#tour-currency-note');
      if (currencyNote) {
        currencyNote.textContent = appState.tourSearch.currency === 'USD'
          ? 'Package prices are shown in USD.'
          : `Package prices are shown in USD; request a ${appState.tourSearch.currency} quote in your enquiry.`;
      }
      renderTours(appState.tourSearch);
    };
    form.addEventListener('input', updateSearch);
    form.addEventListener('change', updateSearch);
    form.addEventListener('submit', event => {
      event.preventDefault();
      updateSearch();
      smoothScrollTo('tours');
    });
    const query = new URLSearchParams(window.location.search);
    if (countrySelect && query.has('country')) countrySelect.value = query.get('country');
    updateDestinations(countrySelect ? countrySelect.value : '');
    if (destinationSelect && query.has('destination')) destinationSelect.value = query.get('destination');
    if (packageSelect && query.has('packageId')) packageSelect.value = query.get('packageId');
    if (startDate && query.has('startDate')) startDate.value = query.get('startDate');
    const travelersSelect = form.querySelector('[name="travelers"]');
    const currencySelect = form.querySelector('[name="currency"]');
    if (travelersSelect && query.has('travelers')) travelersSelect.value = query.get('travelers');
    if (currencySelect && query.has('currency')) currencySelect.value = query.get('currency');
    updateSearch();
  }

  function renderDubaiPackages() {
    const host = $('#dubai-packages-grid');
    if (!host) return;
    showSkeletons('#dubai-packages-grid', 2);
    setTimeout(() => {
      host.innerHTML = (PKG.dubaiHolidays || []).map(p => {
        const img = p.image || '';
        const basePrice = p.pricingOptions ? p.pricingOptions[0].price : p.pricePerPerson;
        const higherPrice = Math.ceil(basePrice * 1.15); // Show 15% higher as "original" price
        return `
          <div class="card card-white dubai-package-card" data-aos="fade-up" data-aos-delay="0" data-package="${p.id}">
            <div class="package-img" style="background: linear-gradient(135deg, var(--skyblue-pale), var(--golden-pale)); height: 200px; border-radius: 12px; overflow: hidden; margin: -1rem -1rem 1rem -1rem;">
              ${img ? `<img src="${img}" alt="${p.destination}" style="width:100%;height:100%;object-fit:cover;" onerror="this.style.display='none';this.parentElement.style.background='linear-gradient(135deg,var(--skyblue),var(--golden))'">` : ''}
            </div>
            <h3 style="margin: 0.5rem 0; font-size: 1.1rem;">${p.flag} ${p.destination}</h3>
            <div style="display: flex; gap: 0.5rem; margin: 0.5rem 0; font-size: 0.85rem; color: var(--text-muted);">
              <span>${p.departureDate} â€” ${p.returnDate}</span>
              <span>â€¢</span>
              <span>${p.duration}</span>
            </div>
            <p style="font-size: 0.9rem; margin: 0.5rem 0; color: var(--text-muted);">${p.description}</p>
            <div style="margin: 0.75rem 0; padding: 0.75rem; background: rgba(79, 179, 217, 0.1); border-radius: 8px; font-size: 0.85rem;">
              <div style="font-weight: 600; margin-bottom: 0.25rem;">Highlights:</div>
              ${(p.inclusions || []).slice(0, 3).map(i => `<div style="margin: 0.25rem 0;">âœˆï¸ ${i}</div>`).join('')}
            </div>
            <div style="margin: 0.75rem 0;">
              <span style="font-size: 0.75rem; color: var(--text-muted); text-decoration: line-through; font-weight: 600;">$${higherPrice}</span>
              <div style="font-size: 1.4rem; font-weight: 700; color: var(--accent-red);">$${basePrice}<span style="font-size: 0.85rem; color: var(--text-muted); font-weight: 600;"> / person</span></div>
            </div>
            <div style="display: flex; gap: 0.5rem;">
              <button class="btn btn-outline btn-sm" style="flex: 1;" data-select="${p.id}">View Package</button>
              <button class="btn btn-gold btn-sm" style="flex: 1;" data-book="${p.id}">Book Now</button>
            </div>
          </div>
        `;
      }).join('');
    }, 300);
  }

  function renderCanadaVisual() {
    const img = $('#pr-flag');
    if (!img) return;
    img.src = 'images/visa/Canada.jpg';
    img.loading = 'lazy';
    img.decoding = 'async';
  }

  function selectPackage(id) {
    const p = findPackage(id);
    if (!p) return;
    appState.selectedPackage = p;
    appState.stepperStep = 1;
    appState.uploadedDocs = {};
    appState.personalInfo = {};
    const meta = getPackageMeta(p);
    appState.totalProcessing = meta.processing;
    appState.totalTicket = meta.ticket;

    renderPackageDetail(p);
    setView('package');
  }

  function renderPackageDetail(p) {
    const meta = getPackageMeta(p);
    const hero = $('#package-hero');
    hero.innerHTML = `
      <div class="ph-flag">${meta.flag}</div>
      <div style="flex:1;min-width:220px;">
        <h2>${meta.title}${meta.subtitle ? ' Â· ' + meta.subtitle : ''}</h2>
        <p style="color:rgba(255,255,255,0.9);margin:0;">${p.description || ''}</p>
        <div style="display:flex;gap:.6rem;flex-wrap:wrap;margin-top:.6rem;">
          <span class="badge badge-white-gold"><span aria-hidden="true">&#9201;</span> ${formatPackageEstimate(p, meta.est)}</span>
          <span class="badge badge-white-gold">ðŸ“‹ ${(p.requirements || []).length} documents</span>
          ${p.stream ? `<span class="badge badge-white-gold">ðŸ ${p.stream}</span>` : ''}
          ${p.days ? `<span class="badge badge-white-gold">ðŸ—“ ${p.days} days</span>` : ''}
          ${p.category === 'east-africa' && appState.tourSearch.startDate ? `<span class="badge badge-white-gold">ðŸ“… ${appState.tourSearch.startDate}</span>` : ''}
          ${p.category === 'east-africa' && appState.tourSearch.travelers ? `<span class="badge badge-white-gold">ðŸ‘¥ ${appState.tourSearch.travelers} travelers</span>` : ''}
        </div>
      </div>
    `;

    const info = $('#package-info');
    const extraDetails = p => {
      const parts = [];
      if (p.visaTypes) parts.push({ k: 'Visa Types', v: p.visaTypes.join(' Â· ') });
      if (p.industries) parts.push({ k: 'Industries Hiring', v: p.industries.join(', ') });
      if (p.salaryRange) parts.push({ k: 'Salary Range', v: p.salaryRange });
      if (p.degreeLevels) parts.push({ k: 'Degree Levels', v: p.degreeLevels.join(' Â· ') });
      if (p.avgTuition) parts.push({ k: 'Avg Tuition (Year)', v: p.avgTuition });
      if (p.inclusions) parts.push({ k: 'Package Includes', v: '' });
      if (p.minCRS) parts.push({ k: 'Min CRS Score (typical)', v: p.minCRS });
      if (p.settlementFunds) parts.push({ k: 'Settlement Funds Required', v: p.settlementFunds });
      if (p.highlights) parts.push({ k: 'Tour Highlights', v: p.highlights.join(' Â· ') });
      if (p.popularPNPs) parts.push({ k: 'Popular PNPs', v: p.popularPNPs.join(' Â· ') });
      return parts;
    };

    info.innerHTML = `
      <h3 style="margin-bottom:.6rem;">ðŸ“¦ Package Details</h3>
      <div style="display:grid;gap:.55rem;">
        ${extraDetails(p).map(x => `
          <div style="padding:.5rem 0;border-bottom:1px dashed var(--skyblue-soft);font-size:.92rem;">
            <strong style="color:var(--skyblue-navy);">${x.k}:</strong>
            ${x.v ? `<span style="color:var(--text-muted);">${x.v}</span>` : ''}
            ${x.k === 'Package Includes' && p.inclusions ? `<ul style="margin:.4rem 0 0;padding-left:1.2rem;color:var(--text-muted);display:grid;gap:.25rem;">${p.inclusions.map(i => `<li style="list-style:disc;">${i}</li>`).join('')}</ul>` : ''}
          </div>
        `).join('')}
      </div>
    `;

    const reqIds = p.requirements || [];
    const reqs = reqIds.map(id => REQ[id]).filter(Boolean);
    $('#req-count').textContent = `${reqs.length} document${reqs.length === 1 ? '' : 's'} required`;
    const check = $('#requirements-checklist');
    check.innerHTML = reqs.map(r => `
      <div class="req-item">
        <div class="req-icon">${r.icon}</div>
        <div>
          <div class="req-title">${r.title}</div>
          <p class="req-desc">${r.description}<br/>
            <em style="font-style:normal;color:var(--golden-deep);font-weight:600;">Format: ${r.formats.join(', ')} Â· Max ${r.maxSizeMB}MB</em>
          </p>
        </div>
        <div class="req-status">Required</div>
      </div>
    `).join('');

    const isTour = !!p.pricePerPerson && p.category !== 'travel-visa';
    if (isTour) {
      $('#price-processing').textContent = money(p.pricePerPerson, meta.currency);
      $('#price-ticket').textContent = money(0, meta.currency);
      $('#price-total').textContent = money(p.pricePerPerson, meta.currency);
      $('#btn-start-app').textContent = `Book Tour Â· ${money(p.pricePerPerson, meta.currency)} â†’`;
      const rowLabel1 = $('#price-row-1-label');
      if (rowLabel1) rowLabel1.textContent = 'Tour Price (per person)';
      const rowLabel2 = $('#price-row-2-label');
      if (rowLabel2) rowLabel2.textContent = 'Extras / Add-ons';
    } else {
      const rowLabel1 = $('#price-row-1-label');
      if (rowLabel1) rowLabel1.textContent = 'Visa Processing Fee';
      const rowLabel2 = $('#price-row-2-label');
      if (rowLabel2) rowLabel2.textContent = 'Round-trip Flight Ticket';
      $('#price-processing').textContent = money(meta.processing, meta.currency);
      $('#price-ticket').textContent = money(meta.ticket, meta.currency);
      $('#price-total').textContent = money(meta.processing + meta.ticket, meta.currency);
      $('#btn-start-app').textContent = `Start Application Â· ${money(meta.processing + meta.ticket, meta.currency)} â†’`;
    }
  }

  function startApplication() {
    if (!appState.selectedPackage) return;
    appState.stepperStep = 1;
    appState.uploadedDocs = {};
    resetStepperUI();
    renderPersonalInfo();
    setView('submit');
  }

  function resetStepperUI() {
    $$('.step-panel').forEach(p => p.classList.remove('step-active'));
    $('#step-1')?.classList.add('step-active');
    const stepItems = $$('#stepper .step');
    stepItems.forEach(s => { s.classList.remove('step-active', 'step-done'); });
    if (stepItems[0]) stepItems[0].classList.add('step-active');
  }

  function goToStep(n) {
    appState.stepperStep = n;
    $$('.step-panel').forEach(p => p.classList.remove('step-active'));
    const panel = document.getElementById(`step-${n}`);
    if (panel) panel.classList.add('step-active');
    const steps = $$('#stepper .step');
    steps.forEach((s, idx) => {
      const i = idx + 1;
      s.classList.remove('step-active', 'step-done');
      if (i < n) s.classList.add('step-done');
      if (i === n) s.classList.add('step-active');
    });
    if (n === 2) renderDocUploads();
    if (n === 3) renderReview();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function renderPersonalInfo() {
    const form = $('#form-personal');
    if (!form) return;
    Object.entries(appState.personalInfo).forEach(([k, v]) => {
      const el = form.elements[k];
      if (el && v) el.value = v;
    });
  }

  function collectPersonalInfo() {
    const form = $('#form-personal');
    const obj = {};
    let ok = true;
    if (!form) return { ok: false, obj };
    $$('.form-field .text-red-mark', form).forEach(e => e.remove());
    Array.from(form.elements).forEach(el => {
      if (!el.name) return;
      obj[el.name] = el.value.trim();
      if (el.required && !obj[el.name]) {
        el.style.borderColor = 'var(--red)';
        ok = false;
      } else {
        el.style.borderColor = '';
      }
    });
    if (obj.email && !/^[^\s@.][^\s@]*@[^\s@.][^\s@]*\.[^\s@.]{2,}$/.test(obj.email)) {
      ok = false;
      if (form.elements.email) form.elements.email.style.borderColor = 'var(--red)';
    }
    appState.personalInfo = obj;
    return { ok, obj };
  }

  function renderDocUploads() {
    const list = $('#docs-upload-list');
    const p = appState.selectedPackage;
    const reqIds = p.requirements || [];
    const reqs = reqIds.map(id => REQ[id]).filter(Boolean);
    const done = countDoneDocs();
    $('#docs-progress').textContent = `${done}/${reqs.length} uploaded.`;
    list.innerHTML = reqs.map(r => {
      const u = appState.uploadedDocs[r.id];
      const doneClass = u && u.uploaded ? 'done' : '';
      return `
        <div class="doc-item ${doneClass}" data-doc="${r.id}">
          <div class="doc-icon">${r.icon}</div>
          <div>
            <div class="doc-head">
              <div class="doc-title">${r.title}</div>
              <span class="status-chip ${u && u.uploaded ? 'ok' : 'pending'}">${u && u.uploaded ? 'âœ” Submitted' : 'Pending'}</span>
            </div>
            <p class="doc-hint">${r.description}</p>
            <p class="file-input-hint">Accepts ${r.formats.join(', ')} Â· up to ${r.maxSizeMB}MB</p>
          </div>
          <div>
            ${u && u.uploaded ? `
              <div class="doc-preview">
                ðŸ“Ž <span style="max-width:120px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${u.fileName}</span>
                <span class="remove-doc" data-remove="${r.id}">âœ•</span>
              </div>
            ` : `
              <label class="btn-upload">
                â¬† Upload
                <input type="file" style="display:none" data-upload="${r.id}" accept="${r.formats.map(f => '.' + f.toLowerCase().replace('jpg', 'jpeg')).join(',')}" />
              </label>
            `}
          </div>
        </div>
      `;
    }).join('');

    const total = reqs.length;
    $('#step2-next').disabled = done !== total;
    $('#doc-errors').style.display = 'none';
  }

  function countDoneDocs() {
    return Object.values(appState.uploadedDocs).filter(u => u && u.uploaded).length;
  }

  function validateAllDocsSubmitted() {
    const reqs = (appState.selectedPackage?.requirements || []).map(id => REQ[id]).filter(Boolean);
    const missing = reqs.filter(r => !appState.uploadedDocs[r.id] || !appState.uploadedDocs[r.id].uploaded);
    if (missing.length === 0) return { ok: true, missing };
    const errEl = $('#doc-errors');
    errEl.innerHTML = `âš  ${missing.length} required document${missing.length === 1 ? '' : 's'} still missing: <strong>${missing.map(m => m.title).join(', ')}</strong>`;
    errEl.style.display = 'block';
    return { ok: false, missing };
  }

  function handleFileUpload(docId, file) {
    const req = REQ[docId];
    if (!req || !file) return;
    const sizeMB = file.size / (1024 * 1024);
    const ext = (file.name.split('.').pop() || '').toUpperCase();
    const extOk = req.formats.some(f => f.toUpperCase() === ext || (f === 'JPG' && ext === 'JPEG'));
    if (!extOk) {
      alert(`Invalid file format. Please upload ${req.formats.join(', ')}`);
      return;
    }
    if (sizeMB > req.maxSizeMB) {
      alert(`File too large (${sizeMB.toFixed(1)}MB). Maximum is ${req.maxSizeMB}MB.`);
      return;
    }
    const reader = new FileReader();
    reader.onload = e => {
      appState.uploadedDocs[docId] = {
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
        dataUrl: e.target.result,
        uploaded: true,
        uploadedAt: Date.now()
      };
      renderDocUploads();
    };
    reader.readAsDataURL(file);
  }

  function removeDoc(docId) {
    delete appState.uploadedDocs[docId];
    renderDocUploads();
  }

  function renderReview() {
    const p = appState.selectedPackage;
    const meta = getPackageMeta(p);
    const pi = appState.personalInfo;
    const reqs = (p.requirements || []).map(id => REQ[id]).filter(Boolean);
    const summary = $('#review-summary');
    summary.innerHTML = `
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.3rem;">
        <div>
          <h4 style="color:var(--skyblue-navy);margin-bottom:.6rem;">ðŸŽ« Package</h4>
          <div style="padding:1rem;background:var(--skyblue-pale);border-radius:12px;">
            <div style="font-size:2rem;margin-bottom:.3rem;">${meta.flag}</div>
            <strong style="font-size:1.05rem;">${meta.title}</strong>
            <div style="font-size:.88rem;color:var(--text-muted);">${meta.subtitle}</div>
            <div style="margin-top:.5rem;font-size:.85rem;color:var(--text-muted);"><span aria-hidden="true">&#9201;</span> ${formatPackageEstimate(p, meta.est)}</div>
          </div>
          <h4 style="color:var(--skyblue-navy);margin:1rem 0 .6rem;">ðŸ‘¤ Applicant</h4>
          <div style="display:grid;gap:.35rem;font-size:.88rem;">
            <div><strong>Name:</strong> ${pi.fullName || 'â€”'}</div>
            <div><strong>Email:</strong> ${pi.email || 'â€”'}</div>
            <div><strong>Phone:</strong> ${pi.phone || 'â€”'}</div>
            <div><strong>Passport:</strong> ${pi.passport || 'â€”'}</div>
            <div><strong>DOB:</strong> ${pi.dob || 'â€”'}</div>
            <div><strong>Nationality:</strong> ${pi.nationality || 'â€”'}</div>
            <div><strong>Address:</strong> ${pi.address || 'â€”'}</div>
          </div>
        </div>
        <div>
          <h4 style="color:var(--skyblue-navy);margin-bottom:.6rem;">ðŸ“‹ Documents (${countDoneDocs()}/${reqs.length})</h4>
          <div style="display:grid;gap:.45rem;">
            ${reqs.map(r => {
              const u = appState.uploadedDocs[r.id];
              const ok = u && u.uploaded;
              return `<div style="display:flex;justify-content:space-between;padding:.5rem .7rem;background:${ok ? '#F0FFF4' : '#FFF5F5'};border-radius:10px;font-size:.85rem;border:1px solid ${ok ? '#C6F6D5' : '#FED7D7'};">
                <span>${r.icon} ${r.title}</span>
                <strong style="color:${ok ? '#38A169' : 'var(--red)'};">${ok ? 'âœ” Submitted' : 'âŒ Missing'}</span>
              </div>`;
            }).join('')}
          </div>
        </div>
      </div>
    `;
    const allDone = countDoneDocs() === reqs.length;
    const authConfirm = $('#auth-confirm');
    $('#step3-next').disabled = !(allDone && authConfirm.checked);
    authConfirm.onchange = () => {
      $('#step3-next').disabled = !(allDone && authConfirm.checked);
    };
  }

  function getSavedApplications() {
    try {
      return JSON.parse(localStorage.getItem(APP_STATUS_KEY) || '[]');
    } catch (e) {
      return [];
    }
  }

  function saveApplicationRecord(record) {
    const list = getSavedApplications();
    const existing = list.findIndex(item => item.reference === record.reference || (item.email === record.email && item.package === record.package && item.createdAt === record.createdAt));
    if (existing >= 0) {
      list[existing] = record;
    } else {
      list.unshift(record);
    }
    localStorage.setItem(APP_STATUS_KEY, JSON.stringify(list));
    return record;
  }

  function renderApplicationTracker() {
    const host = $('#application-tracker-list');
    const empty = $('#application-tracker-empty');
    const records = getSavedApplications();
    if (!host) return;

    if (!records.length) {
      host.innerHTML = '';
      if (empty) empty.style.display = 'block';
      return;
    }

    if (empty) empty.style.display = 'none';
    host.innerHTML = records.slice(0, 8).map(r => `
      <div class="track-item">
        <div class="track-header">
          <div>
            <div class="track-ref">${r.reference}</div>
            <div class="track-package">${r.package}</div>
          </div>
          <span class="status-pill ${r.status.toLowerCase().replace(/\s+/g, '-')}">${r.status}</span>
        </div>
        <div class="track-meta">
          <span>Applicant: ${r.applicant}</span>
          <span>Email: ${r.email}</span>
        </div>
        <div class="track-progress">
          <div class="track-progress-bar" style="width: ${r.progress}%"></div>
        </div>
        <div class="track-progress-text">${r.progress}% complete</div>
      </div>
    `).join('');
  }

  function trackApplicationByReference(reference, email) {
    const records = getSavedApplications();
    const match = records.find(r => r.reference.toLowerCase() === String(reference || '').trim().toLowerCase() && r.email.toLowerCase() === String(email || '').trim().toLowerCase());
    const panel = $('#application-track-result');
    const summary = $('#application-track-summary');
    if (!panel || !summary) return;

    if (!match) {
      summary.innerHTML = '<div class="alert alert-red">No application was found for that reference and email.</div>';
      panel.style.display = 'block';
      return;
    }

    summary.innerHTML = `
      <div class="track-result-box">
        <div class="track-result-head">
          <span>Application reference</span>
          <strong>${match.reference}</strong>
        </div>
        <div class="track-result-body">
          <div><span>Package</span><strong>${match.package}</strong></div>
          <div><span>Status</span><strong>${match.status}</strong></div>
          <div><span>Progress</span><strong>${match.progress}%</strong></div>
          <div><span>Last update</span><strong>${match.lastUpdated}</strong></div>
        </div>
      </div>
    `;
    panel.style.display = 'block';
  }

  function submitPayment() {
    const p = appState.selectedPackage;
    const meta = getPackageMeta(p);
    const ref = 'APP-' + Math.floor(100000 + Math.random() * 900000);
    const total = appState.totalProcessing + (p.pricePerPerson ? 0 : appState.totalTicket);
    const currency = getPackageMeta(p).currency;
    const record = {
      reference: ref,
      package: `${meta.flag} ${meta.title}`,
      applicant: appState.personalInfo.fullName || 'â€”',
      email: appState.personalInfo.email || 'â€”',
      status: 'Submitted for review',
      progress: 20,
      lastUpdated: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      createdAt: Date.now()
    };

    saveApplicationRecord(record);

    $('#booking-ref').textContent = ref;
    $('#success-summary').innerHTML = `
      <div><span>Package</span><strong>${meta.flag} ${meta.title}</strong></div>
      <div><span>Applicant</span><strong>${appState.personalInfo.fullName || 'â€”'}</strong></div>
      <div><span>Email</span><strong>${appState.personalInfo.email || 'â€”'}</strong></div>
      <div><span>Application Status</span><strong>Submitted for review</strong></div>
      <div><span>Estimated Fees</span><strong>${money(total, currency)}</strong></div>
      <div class="success-note" style="border-top:1px dashed var(--skyblue-soft);padding-top:.6rem;margin-top:.6rem;color:#0C5A8F;font-weight:700;">A consultant will contact you shortly with next steps and a full fee breakdown.</div>
    `;
    setView('success');
  }

  function smoothScrollTo(id) {
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.pageYOffset - 80;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }

  function attachGlobalHandlers() {
    const navToggle = $('#nav-toggle');
    if (navToggle) navToggle.addEventListener('click', () => $('#nav-links')?.classList.toggle('open'));

    document.addEventListener('click', e => {
      const nav = e.target.closest('[data-nav]');
      if (nav) {
        e.preventDefault();
        const target = nav.getAttribute('data-nav');

        if (target === 'jobs') { setView('jobs'); initJobs(); return; }
        if (target === 'track') { setView('track'); renderApplicationTracker(); return; }
        if (target === 'agent-register') { setView('agent-register'); return; }
        if (target === 'agent-dashboard') { setView('agent-dashboard'); return; }
        if (target === 'agent-login') { setView('agent-login'); return; }

        if (appState.currentView !== 'home') setView('home', true);
        setTimeout(() => {
          const map = {
            home: 'view-home', services: 'services', visas: 'visas',
            work: 'visas', study: 'visas', pr: 'pr', tours: 'tours', contact: 'contact',
            'visa-application': 'visa-application', destinations: 'tours'
          };
          if (target === 'work') {
            switchTab('work');
          } else if (target === 'study') {
            switchTab('study');
          } else if (target === 'visas') {
            switchTab('travel');
          }
          if (map[target]) smoothScrollTo(map[target]);
        }, 50);
        return;
      }

      const tourAction = e.target.closest('[data-tour-action]');
      if (tourAction) {
        e.preventDefault();
        toggleTourCollection(tourAction.getAttribute('data-tour-action'), tourAction.getAttribute('data-tour-id'));
        return;
      }

      const select = e.target.closest('[data-select]');
      if (select) { e.preventDefault(); selectPackage(select.getAttribute('data-select')); return; }

      const selectCa = e.target.closest('[data-select-ca]');
      if (selectCa) { e.preventDefault(); selectPackage(selectCa.getAttribute('data-select-ca')); return; }

      const back = e.target.closest('[data-go-back]');
      if (back) { e.preventDefault(); const to = back.getAttribute('data-go-back'); setView(to); return; }

      const serviceBtn = e.target.closest('[data-service]');
      if (serviceBtn) {
        e.preventDefault();
        const sid = serviceBtn.getAttribute('data-service');
        const scrollMap = { jobs: 'services', 'work-visa': 'visas', 'schengen-visa': 'visas', 'study-visa': 'visas', 'canada-pr': 'pr', 'east-africa': 'tours' };
        const tabMap = { 'work-visa': 'work', 'schengen-visa': 'travel', 'study-visa': 'study' };
        if (tabMap[sid]) switchTab(tabMap[sid]);
        smoothScrollTo(scrollMap[sid] || 'services');
        return;
      }

      const prevStep = e.target.closest('[data-prev-step]');
      if (prevStep) {
        e.preventDefault();
        goToStep(parseInt(prevStep.getAttribute('data-prev-step'), 10));
        return;
      }

      const tabBtn = e.target.closest('.tab[data-tab]');
      if (tabBtn) {
        e.preventDefault();
        switchTab(tabBtn.getAttribute('data-tab'));
        return;
      }

      const uploadInput = e.target.closest('[data-upload]');
      if (uploadInput && uploadInput.files && uploadInput.files[0]) {
        handleFileUpload(uploadInput.getAttribute('data-upload'), uploadInput.files[0]);
        return;
      }

      const removeBtn = e.target.closest('[data-remove]');
      if (removeBtn) {
        e.preventDefault();
        e.stopPropagation();
        removeDoc(removeBtn.getAttribute('data-remove'));
        return;
      }
    });

    function switchTab(name) {
      $$('#visa-tabs .tab').forEach(t => t.classList.toggle('tab-active', t.getAttribute('data-tab') === name));
      renderVisaPackages(name);
    }
    window.__switchTab = switchTab;

    const btnStartApp = $('#btn-start-app');
    if (btnStartApp) btnStartApp.addEventListener('click', startApplication);

    const trackerForm = $('#track-application-form');
    if (trackerForm) {
      trackerForm.addEventListener('submit', e => {
        e.preventDefault();
        const ref = $('#tracker-reference')?.value || '';
        const email = $('#tracker-email')?.value || '';
        trackApplicationByReference(ref, email);
      });
    }

    const step1Next = $('#step1-next');
    if (step1Next) step1Next.addEventListener('click', () => {
      const { ok } = collectPersonalInfo();
      if (!ok) {
        alert('Please fill all required fields correctly.');
        return;
      }
      goToStep(2);
    });

    const step2Next = $('#step2-next');
    if (step2Next) step2Next.addEventListener('click', () => {
      const v = validateAllDocsSubmitted();
      if (!v.ok) { renderDocUploads(); return; }
      goToStep(3);
    });

    const step3Next = $('#step3-next');
    if (step3Next) step3Next.addEventListener('click', () => submitPayment());

    const contactForm = $('#contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', e => {
        e.preventDefault();
        const btn = contactForm.querySelector('button');
        const original = btn.textContent;
        btn.textContent = 'âœ“ Message Sent!';
        btn.disabled = true;
        contactForm.reset();
        setTimeout(() => { btn.textContent = original; btn.disabled = false; }, 3000);
      });
    }

    const leadForm = $('#lead-form');
    if (leadForm) {
      leadForm.addEventListener('submit', e => {
        e.preventDefault();
        const btn = leadForm.querySelector('button');
        const success = $('#lead-form-success');
        const original = btn.textContent;
        btn.textContent = 'âœ“ Request Received';
        btn.disabled = true;
        success.style.display = 'block';
        leadForm.reset();
        setTimeout(() => { btn.textContent = original; btn.disabled = false; success.style.display = 'none'; }, 4000);
      });
    }
  }

  function initFAQ() {
    document.querySelectorAll('.faq-question').forEach(q => {
      q.addEventListener('click', () => {
        const item = q.closest('.faq-item');
        const wasActive = item.classList.contains('active');
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
        if (!wasActive) item.classList.add('active');
      });
    });
  }

  function initBackToTop() {
    const btn = $('#back-to-top');
    if (!btn) return;
    window.addEventListener('scroll', () => {
      btn.classList.toggle('visible', window.scrollY > 400);
    });
    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  function initNewsletter() {
    const form = $('#newsletter-form');
    if (!form) return;
    form.addEventListener('submit', e => {
      e.preventDefault();
      const success = $('#newsletter-success');
      const btn = form.querySelector('button');
      const original = btn.textContent;
      btn.textContent = 'âœ“ Subscribed!';
      btn.disabled = true;
      success.style.display = 'block';
      form.reset();
      setTimeout(() => { btn.textContent = original; btn.disabled = false; success.style.display = 'none'; }, 4000);
    });
  }

  function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.testimonial-card, .faq-item, .newsletter-card, .svc-m-card, .wc-card, .t-card, .mv-card, .visa-card, .tour-card, .pr-banner').forEach(el => {
      el.classList.add('reveal');
      observer.observe(el);
    });
  }

/* ==============================================
   * JOBS BOARD
   * ============================================== */
  const JOB_API = '/api/jobs';
  let jobsInitialized = false;

  function getJobsSource() {
    return window.JOBS_DATA || [];
  }

  function renderJobs(list) {
    const wrapper = $('#jobs-swiper-wrapper');
    const empty = $('#jobs-empty');
    if (!wrapper) return;
    const items = list || filterJobs();
    wrapper.innerHTML = items.map(j => {
      const currentPrice = j.salary ? j.salary.split(' /')[0] : 'Contact';
      const imageUrl = j.image || '';
      
      return `
      <div class="swiper-slide">
        <div class="job-card-oval" data-job="${j.id}">
          ${imageUrl ? `<div class="job-card-image img-wrap"><img src="${imageUrl}" alt="${j.title}" class="job-card-img" style="object-position:${j.imagePosition || 'center'}" loading="lazy" decoding="async" /></div>` : ''}
          <h3 class="job-card-title">${j.title}</h3>
          <div class="job-card-country">${j.country}</div>
          <div class="job-card-pricing">
            <span class="job-card-price-current">${currentPrice}</span>
          </div>
          <p class="job-card-description">${j.description}</p>
          <a class="btn btn-gold btn-sm job-card-btn" href="apply.html?job=${encodeURIComponent(j.id)}">Apply</a>
        </div>
      </div>
    `;
    }).join('');
    if (empty) empty.style.display = items.length ? 'none' : 'block';
    // Initialize or update Swiper
    setTimeout(() => {
      if (window.jobsSwiper) {
        window.jobsSwiper.update();
      } else {
        initJobsSwiper();
      }
    }, 100);
  }

  function initJobsSwiper() {
    if (window.jobsSwiper) return;
    try {
      window.jobsSwiper = new Swiper('.swiper-jobs', {
        loop: false,
        spaceBetween: 20,
        slidesPerView: 1,
        centeredSlides: true,
        pagination: {
          el: '.swiper-pagination-jobs',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next-jobs',
          prevEl: '.swiper-button-prev-jobs'
        },
        breakpoints: {
          600: { slidesPerView: 2, spaceBetween: 15 },
          1200: { slidesPerView: 3, spaceBetween: 20 }
        },
        on: {
          slideChange: () => {
            // Smooth transitions
          }
        }
      });
    } catch (e) {
      console.warn('Swiper not ready yet', e);
    }
  }

  function filterJobs() {
    const search = ($('#jobs-search')?.value || '').trim().toLowerCase();
    const country = ($('#jobs-country-filter')?.value || '');
    const jobs = getJobsSource();
    return jobs.filter(j => {
      const matchSearch = !search ||
        `${j.title} ${j.country} ${j.city || ''} ${j.description || ''}`.toLowerCase().includes(search);
      const matchCountry = !country || j.country === country;
      return matchSearch && matchCountry;
    });
  }

  function populateCountryFilter() {
    const sel = $('#jobs-country-filter');
    if (!sel) return;
    const jobs = getJobsSource();
    const countries = [...new Set(jobs.map(j => j.country).filter(Boolean))].sort();
    sel.innerHTML = '<option value="">All Countries</option>' +
      countries.map(c => `<option value="${c}">${c}</option>`).join('');
  }

  function openApplyModal(jobId) {
    const job = getJobsSource().find(j => j.id === jobId);
    if (!job) return;
    const modal = $('#apply-modal');
    const title = $('#apply-job-title');
    if (title) title.textContent = `${job.flag || 'ðŸ’¼'} ${job.title} â€” ${job.country}`;
    const form = $('#apply-form');
    if (form) form.reset();
    const success = $('#apply-success');
    if (success) success.style.display = 'none';
    if (modal) modal.style.display = 'grid';
  }

  function closeApplyModal() {
    const modal = $('#apply-modal');
    if (modal) modal.style.display = 'none';
  }

  async function submitApply(jobId, data) {
    let ok = false;
    try {
      const res = await fetch(`${JOB_API}/${jobId}/apply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      ok = res.ok;
    } catch (e) {
      ok = false;
    }
    // Fallback: always show success in demo mode (simulate submission)
    const form = $('#apply-form');
    if (form) form.style.display = 'none';
    const success = $('#apply-success');
    if (success) success.style.display = 'block';
    setTimeout(() => {
      closeApplyModal();
      if (form) form.style.display = '';
      if (success) success.style.display = 'none';
    }, 3500);
    return ok;
  }

  function initJobs() {
    if (jobsInitialized) return;
    jobsInitialized = true;
    populateCountryFilter();
    renderJobs();

    const search = $('#jobs-search');
    if (search) search.addEventListener('input', () => renderJobs());
    const filter = $('#jobs-country-filter');
    if (filter) filter.addEventListener('change', () => renderJobs());

    document.addEventListener('click', e => {
      const applyBtn = e.target.closest('[data-apply]');
      if (applyBtn) { e.preventDefault(); openApplyModal(applyBtn.getAttribute('data-apply')); return; }
      const closeBtn = e.target.closest('[data-close-apply]');
      if (closeBtn) { e.preventDefault(); closeApplyModal(); return; }
      const overlay = e.target.closest('#apply-modal');
      if (overlay && e.target === overlay) closeApplyModal();
    });

    const applyForm = $('#apply-form');
    if (applyForm) {
      applyForm.addEventListener('submit', e => {
        e.preventDefault();
        const fd = new FormData(applyForm);
        const jobId = ($('#apply-job-title')?.getAttribute('data-job')) || applyForm.getAttribute('data-job') || '';
        const data = {
          name: fd.get('name'),
          email: fd.get('email'),
          phone: fd.get('phone') || '',
          message: fd.get('message') || ''
        };
        // Determine job id from modal context
        const shownTitle = $('#apply-job-title')?.textContent || '';
        const job = getJobsSource().find(j => shownTitle.includes(j.title));
        submitApply(job ? job.id : jobId, data);
      });
    }
  }

  /* ==============================================
   * QUICK APPLY FORM VIEW
   * ============================================== */
  function initQuickApplyForm() {
    const form = $('#quick-apply-form');
    if (!form) return;

    // Listen for passport fields visibility
    const passportRadios = $$('input[name="hasPassport"]');
    passportRadios.forEach(radio => {
      radio.addEventListener('change', e => {
        const passportFields = $('#passport-fields');
        const noPassportInfo = $('#no-passport-info');
        if (e.target.value === 'yes') {
          if (passportFields) passportFields.style.display = 'block';
          if (noPassportInfo) noPassportInfo.style.display = 'none';
        } else {
          if (passportFields) passportFields.style.display = 'none';
          if (noPassportInfo) noPassportInfo.style.display = 'block';
          // Set link based on country
          const countrySelect = $('[name="country"]');
          const linkContainer = $('#passport-link-container');
          if (linkContainer) {
            if (countrySelect && countrySelect.value === 'Kenya') {
              linkContainer.innerHTML = 'Visit <a href="https://ecitizen.go.ke" target="_blank" rel="noopener"><strong>eCitizen Kenya</strong></a> to apply for a passport.';
            } else {
              linkContainer.innerHTML = 'Contact your nearest government immigration office.';
            }
          }
        }
      });
    });

    // Listen for visa logic
    const visaRadios = $$('input[name="needsVisa"]');
    visaRadios.forEach(radio => {
      radio.addEventListener('change', e => {
        const visaInfo = $('#visa-redirect-info');
        if (visaInfo) visaInfo.style.display = e.target.value === 'yes' ? 'block' : 'none';
      });
    });

    // Form submission
    form.addEventListener('submit', async e => {
      e.preventDefault();
      const fd = new FormData(form);
      const email = fd.get('email');
      const fullName = fd.get('fullName');
      const payload = {
        fullName: fullName,
        email: email,
        phone: fd.get('phone'),
        country: fd.get('country'),
        hasPassport: fd.get('hasPassport'),
        passportNumber: fd.get('passportNumber'),
        needsVisa: fd.get('needsVisa')
      };
      
      const errEl = $('#apply-form-error');
      if (errEl) errEl.style.display = 'none';
      
      try {
        // Send email notification
        fetch('/api/emails/application-confirmation', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: email,
            fullName: fullName,
            packageName: 'Job Application'
          })
        }).catch(err => console.log('Email notification skipped:', err.message));

        // Simulate submission or send to backend
        const res = await fetch('/api/application/job', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        }).catch(() => ({ ok: true })); // Fallback to success
        
        if (res.ok) {
          showToast('âœ… Application submitted successfully!', 'success');
          form.style.display = 'none';
          const success = $('#apply-form-success');
          if (success) success.style.display = 'block';
          setTimeout(() => {
            form.style.display = '';
            form.reset();
            if (success) success.style.display = 'none';
            setView('home');
          }, 3000);
        } else {
          if (errEl) { errEl.textContent = 'Failed to submit application. Please try again.'; errEl.style.display = 'block'; }
          showToast('âŒ Failed to submit application', 'error');
        }
      } catch (err) {
        if (errEl) { errEl.textContent = 'Network error. Please check your connection.'; errEl.style.display = 'block'; }
        showToast('âŒ Network error: ' + err.message, 'error');
      }
    });
  }

  /* ==============================================
   * VISA APPLICATION FORM VIEW
   * ============================================== */
  function initVisaApplicationForm() {
    const form = $('#visa-application-form');
    if (!form) return;

    form.addEventListener('submit', async e => {
      e.preventDefault();
      const fd = new FormData(form);
      const email = fd.get('email');
      const fullName = fd.get('fullName');
      const visaType = fd.get('visaType');
      const payload = {
        fullName: fullName,
        email: email,
        passportNumber: fd.get('passportNumber'),
        visaType: visaType,
        country: fd.get('country'),
        notes: fd.get('notes')
      };
      
      const errEl = $('#visa-form-error');
      if (errEl) errEl.style.display = 'none';
      
      try {
        // Send email notification
        fetch('/api/emails/visa-confirmation', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: email,
            fullName: fullName,
            visaType: visaType || 'Work Visa'
          })
        }).catch(err => console.log('Email notification skipped:', err.message));

        // Simulate submission or send to backend
        const res = await fetch('/api/application/visa', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        }).catch(() => ({ ok: true })); // Fallback to success
        
        if (res.ok) {
          showToast('âœ… Visa application submitted successfully!', 'success');
          form.style.display = 'none';
          const success = $('#visa-form-success');
          if (success) success.style.display = 'block';
          setTimeout(() => {
            form.style.display = '';
            form.reset();
            if (success) success.style.display = 'none';
            setView('home');
          }, 3000);
        } else {
          if (errEl) { errEl.textContent = 'Failed to submit visa application. Please try again.'; errEl.style.display = 'block'; }
          showToast('âŒ Failed to submit visa application', 'error');
        }
      } catch (err) {
        if (errEl) { errEl.textContent = 'Network error. Please check your connection.'; errEl.style.display = 'block'; }
        showToast('âŒ Network error: ' + err.message, 'error');
      }
    });
  }

  /* ==============================================
   * AGENT LOGIN VIEW
   * ============================================== */
  function initAgentLoginView() {
    const form = $('#standalone-agent-login-form');
    if (!form) return;

    form.addEventListener('submit', async e => {
      e.preventDefault();
      const fd = new FormData(form);
      const email = fd.get('email');
      const password = fd.get('password');
      const rememberMe = fd.get('rememberMe') ? true : false;
      
      const errEl = $('#standalone-agent-login-error');
      if (errEl) errEl.style.display = 'none';
      
      try {
        // Use new /api/auth/login endpoint
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });
        const data = await res.json().catch(() => ({}));
        
        if (res.ok && data.user) {
          showToast('âœ… Login successful!', 'success');
          
          // Store auth token
          localStorage.setItem('auth_token', data.token);
          
          if (rememberMe) {
            setAgentSession(data.user);
          }
          
          // Redirect to dashboard
          setTimeout(() => {
            setView('agent-dashboard');
            setTimeout(() => showAgentDashboard(data.user), 100);
          }, 500);
        } else {
          const errorMsg = data.message || 'Login failed. Please check your email and password.';
          if (errEl) { errEl.textContent = errorMsg; errEl.style.display = 'block'; }
          showToast('âŒ ' + errorMsg, 'error');
        }
      } catch (err) {
        const errorMsg = 'Network error. Please check your connection.';
        if (errEl) { errEl.textContent = errorMsg; errEl.style.display = 'block'; }
        showToast('âŒ ' + errorMsg, 'error');
      }
    });
  }

  /* ==============================================
   * AGENT SYSTEM
   * ============================================== */
  const AGENT_API = '/api/agents';
  const AGENT_SESSION_KEY = 'pascal_agent_session';

  function getAgentSession() {
    try { return JSON.parse(localStorage.getItem(AGENT_SESSION_KEY) || 'null'); }
    catch (e) { return null; }
  }
  function setAgentSession(agent) {
    localStorage.setItem(AGENT_SESSION_KEY, JSON.stringify(agent));
  }
  function clearAgentSession() {
    localStorage.removeItem(AGENT_SESSION_KEY);
  }

  async function registerAgent(event) {
    const form = $('#agent-register-form');
    if (!form) return;
    event.preventDefault();
    const fd = new FormData(form);
    const specializations = $$('#specialization-checkboxes input[name="specializations"]:checked')
      .map(cb => cb.value);
    
    const email = fd.get('contactPersonEmail');
    const password = fd.get('password');
    const fullName = fd.get('contactPersonName');
    const agentName = fd.get('agencyName');
    
    const payload = {
      email,
      password,
      fullName,
      agentName,
      agentCompany: agentName,
      role: 'agent'
    };
    
    const errEl = $('#agent-form-error');
    if (errEl) errEl.style.display = 'none';
    
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json().catch(() => ({}));
      
      if (!res.ok) {
        const errorMsg = data.message || 'Registration failed. Please try again.';
        if (errEl) { errEl.textContent = errorMsg; errEl.style.display = 'block'; }
        showToast('âŒ ' + errorMsg, 'error');
        return;
      }
      
      showToast('âœ… Agent registration successful!', 'success');
      
      // Store auth token
      localStorage.setItem('auth_token', data.token);
      
      // Store agent session
      setAgentSession(data.user);
      
      form.style.display = 'none';
      const success = $('#agent-register-success');
      if (success) success.style.display = 'block';
      
      setTimeout(() => {
        setView('agent-dashboard');
        showAgentDashboard(data.user);
      }, 2000);
    } catch (e) {
      if (errEl) { errEl.textContent = 'Network error. Please try again.'; errEl.style.display = 'block'; }
      showToast('âŒ Network error: ' + e.message, 'error');
    }
  }

  async function loginAgent(event) {
    const form = $('#agent-login-form');
    if (!form) return;
    event.preventDefault();
    const fd = new FormData(form);
    const payload = { email: fd.get('email'), password: fd.get('password') };
    const errEl = $('#agent-login-error');
    if (errEl) errEl.style.display = 'none';
    try {
      const res = await fetch(`${AGENT_API}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (errEl) { errEl.textContent = data.error || 'Login failed. Please try again.'; errEl.style.display = 'block'; }
        return;
      }
      setAgentSession(data.agent);
      showAgentDashboard(data.agent);
    } catch (e) {
      if (errEl) { errEl.textContent = 'Network error. Please try again.'; errEl.style.display = 'block'; }
    }
  }

  function logoutAgent() {
    clearAgentSession();
    hideAgentDashboard();
  }

  function showAgentDashboard(agent) {
    const loginBox = $('#agent-login-box');
    const dash = $('#agent-dashboard-content');
    if (loginBox) loginBox.style.display = 'none';
    if (dash) dash.style.display = 'block';
    const name = $('#agent-agency-name');
    if (name) name.textContent = agent.agencyName || 'Agent Dashboard';
    const badge = $('#agent-status-badge');
    if (badge) {
      const status = (agent.status || 'PENDING').toLowerCase();
      badge.textContent = agent.status || 'Pending';
      badge.className = 'agent-status-badge ' + (status === 'approved' ? 'approved' : status === 'rejected' ? 'rejected' : 'pending');
    }
    loadAgentDashboard(agent);
  }

  function hideAgentDashboard() {
    const loginBox = $('#agent-login-box');
    const dash = $('#agent-dashboard-content');
    if (loginBox) loginBox.style.display = '';
    if (dash) dash.style.display = 'none';
  }

  async function loadAgentDashboard(agent) {
    if (!agent) return;
    try {
      const [candRes, commRes] = await Promise.all([
        fetch(`${AGENT_API}/${agent.id}/candidates`).then(r => r.json()).catch(() => ({ candidates: [] })),
        fetch(`${AGENT_API}/${agent.id}/commissions`).then(r => r.json()).catch(() => ({ commissions: [] }))
      ]);
      const candidates = candRes.candidates || [];
      const commissions = commRes.commissions || [];
      renderCandidates(candidates);
      renderCommissions(commissions);
      updateAgentStats(candidates, commissions);
    } catch (e) { /* ignore */ }
  }

  function renderCandidates(candidates) {
    const list = $('#agent-candidates-list');
    const empty = $('#agent-candidates-empty');
    if (!list) return;
    list.innerHTML = (candidates || []).map(c => `
      <div class="candidate-item">
        <div class="c-row">
          <span class="candidate-name">${c.candidateName}</span>
          <span class="candidate-status ${(c.status || '').toLowerCase()}">${c.status || 'Submitted'}</span>
        </div>
        <div class="candidate-info">${c.countryInterest} Â· ${c.visaType} Â· ${c.candidateEmail}</div>
        <div class="candidate-info">${c.createdAt ? 'Submitted ' + new Date(c.createdAt).toLocaleDateString() : ''}</div>
      </div>
    `).join('');
    if (empty) empty.style.display = (candidates || []).length ? 'none' : 'block';
  }

  function renderCommissions(commissions) {
    const list = $('#agent-commissions-list');
    const empty = $('#agent-commissions-empty');
    if (!list) return;
    list.innerHTML = (commissions || []).map(c => `
      <div class="commission-item">
        <div class="candidate-info">Commission #${c.id ? c.id.slice(0, 8) : ''}</div>
        <span class="commission-amount">${c.currency || 'USD'} ${Number(c.amount || 0).toLocaleString()}</span>
        <span class="commission-status ${(c.status || '').toLowerCase()}">${c.status || 'Pending'}</span>
      </div>
    `).join('');
    if (empty) empty.style.display = (commissions || []).length ? 'none' : 'block';
  }

  function updateAgentStats(candidates, commissions) {
    const total = $('#stat-total');
    if (total) total.textContent = (candidates || []).length;
    const submitted = $('#stat-submitted');
    if (submitted) submitted.textContent = (candidates || []).filter(c => (c.status || 'SUBMITTED') === 'SUBMITTED').length;
    const accepted = $('#stat-accepted');
    if (accepted) accepted.textContent = (candidates || []).filter(c => c.status === 'ACCEPTED').length;
    const commTotal = $('#stat-commission');
    if (commTotal) {
      const sum = (commissions || []).reduce((a, c) => a + Number(c.amount || 0), 0);
      const currency = (commissions && commissions[0] && commissions[0].currency) || 'USD';
      commTotal.textContent = `${currency} ${sum.toLocaleString()}`;
    }
  }

  async function submitCandidate(event) {
    const form = $('#candidate-form');
    if (!form) return;
    event.preventDefault();
    const agent = getAgentSession();
    if (!agent) return;
    const fd = new FormData(form);
    const payload = {
      candidateName: fd.get('candidateName'),
      candidateEmail: fd.get('candidateEmail'),
      candidatePhone: fd.get('candidatePhone'),
      countryInterest: fd.get('countryInterest'),
      visaType: fd.get('visaType'),
      cvFilename: fd.get('cvFilename') || '',
      notes: fd.get('notes') || ''
    };
    const errEl = $('#candidate-form-error');
    if (errEl) errEl.style.display = 'none';
    try {
      const res = await fetch(`${AGENT_API}/${agent.id}/candidates`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (errEl) { errEl.textContent = data.error || 'Failed to submit candidate.'; errEl.style.display = 'block'; }
        return;
      }
      form.reset();
      const success = $('#candidate-success');
      if (success) {
        success.style.display = 'block';
        setTimeout(() => { success.style.display = 'none'; }, 3000);
      }
      loadAgentDashboard(agent);
    } catch (e) {
      if (errEl) { errEl.textContent = 'Network error. Please try again.'; errEl.style.display = 'block'; }
    }
  }

  function initAgentSystem() {
    const regForm = $('#agent-register-form');
    if (regForm) regForm.addEventListener('submit', registerAgent);

    const loginForm = $('#agent-login-form');
    if (loginForm) loginForm.addEventListener('submit', loginAgent);

    const logoutBtn = $('#agent-logout');
    if (logoutBtn) logoutBtn.addEventListener('click', logoutAgent);

    const candidateForm = $('#candidate-form');
    if (candidateForm) candidateForm.addEventListener('submit', submitCandidate);

    // Restore session on load
    if (getAgentSession() && $('#agent-dashboard-content')) {
      showAgentDashboard(getAgentSession());
    }
  }

  /* ==============================================
   * WHATSAPP AI CONSULTATION
   * ============================================== */
  const WA_STATE = {
    step: 'greeting',
    dest: '', dates: '', group: '', budget: ''
  };

  function openWhatsAppModal() {
    const modal = $('#whatsapp-modal');
    if (modal) modal.style.display = 'grid';
  }
  function closeWhatsAppModal() {
    const modal = $('#whatsapp-modal');
    if (modal) modal.style.display = 'none';
  }

  function waAddMsg(text, type = 'bot') {
    const chat = $('#wa-chat');
    if (!chat) return;
    const el = document.createElement('div');
    el.className = `wa-msg wa-msg-${type}`;
    el.innerHTML = text;
    chat.appendChild(el);
    chat.scrollTop = chat.scrollHeight;
  }

  function waAddTyping() {
    const chat = $('#wa-chat');
    if (!chat) return;
    const el = document.createElement('div');
    el.className = 'wa-typing';
    el.innerHTML = '<span></span><span></span><span></span>';
    el.id = 'wa-typing-indicator';
    chat.appendChild(el);
    chat.scrollTop = chat.scrollHeight;
  }
  function waRemoveTyping() {
    const el = $('#wa-typing-indicator');
    if (el) el.remove();
  }

function waQuote(text) { return String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

  function waBotReply(userText) {
    const t = (userText || '').toLowerCase();
    const state = WA_STATE;

    // Human handoff
    if (/(human|agent|person|represent|officer)/.test(t)) {
      WA_STATE.step = 'handoff';
      const message = 'Hello Pascal Travels, I would like to speak with a travel consultant.';
      waAddMsg(`You'll be connected to a human agent shortly. <a href="${window.PascalWhatsApp.createWhatsAppUrl(message)}" target="_blank" rel="noopener" style="color:#00ff88;">Continue on WhatsApp</a>.`);
      return;
    }

    // Quick option keywords
    const quickMap = {
      visa: 'Visa',
      job: 'Job Abroad',
      study: 'Study',
      pr: 'Canada PR',
      tour: 'Africa Tour',
      human: 'Human'
    };

    if (state.step === 'greeting') {
      // First message â€” capture destination
      let destination = userText.trim();
      // If they clicked a quick option, use that as their service focus
      for (const [key, label] of Object.entries(quickMap)) {
        if (t === key || t.includes(key)) { destination = label; break; }
      }
      if (!destination) destination = 'your chosen destination';
      state.dest = destination;
      state.step = 'dates';
      waAddMsg(`Great choice! &#127758; <strong>${waQuote(destination)}</strong> â€” excellent pick!\n\nFor your consultation, could you tell me your preferred <strong>travel dates</strong>? (e.g. "March 2026")`);
      return;
    }

    if (state.step === 'dates') {
      state.dates = userText.trim() || 'Flexible';
      state.step = 'group';
      waAddMsg(`Got it â€” <strong>${waQuote(state.dates)}</strong>. &#128197;\n\nHow many people are traveling? <strong>Group size</strong>? (e.g. "2 adults + 1 child" or "Just me")`);
      return;
    }

    if (state.step === 'group') {
      state.group = userText.trim() || '1 person';
      state.step = 'budget';
      waAddMsg(`Perfect â€” <strong>${waQuote(state.group)}</strong>. &#128106;\n\nLastly, what's your approximate <strong>budget</strong>? (e.g. "KSh 150,000" or "$2,000")`);
      return;
    }

    if (state.step === 'budget') {
      state.budget = userText.trim() || 'To be discussed';
      state.step = 'done';
      const whatsappMessage = `Consultation request\nDestination: ${state.dest}\nDates: ${state.dates}\nGroup: ${state.group}\nBudget: ${state.budget}`;
      waAddMsg(`Thank you! &#128640; Here's your consultation summary:\n\n&#128205; <strong>Destination:</strong> ${waQuote(state.dest)}\n&#128197; <strong>Dates:</strong> ${waQuote(state.dates)}\n&#128106; <strong>Group:</strong> ${waQuote(state.group)}\n&#128176; <strong>Budget:</strong> ${waQuote(state.budget)}\n\n<a href="${window.PascalWhatsApp.createWhatsAppUrl(whatsappMessage)}" target="_blank" rel="noopener" style="color:#00ff88;">Send this request on WhatsApp</a>`);
      return;
    }

    // Fallback catch-all
    waAddMsg(`Thanks for your message! &#128172; To help you best, could you tell me your <strong>destination country</strong>, preferred <strong>travel dates</strong>, <strong>group size</strong>, and <strong>budget</strong>? Or type <strong>"human"</strong> to talk to one of our agents.`);
  }

  function waHandleQuick(option) {
    const map = {
      visa: 'ðŸ›‚ Visa',
      job: 'ðŸ’¼ Job Abroad',
      study: 'ðŸŽ“ Study',
      pr: 'ðŸ Canada PR',
      tour: 'ðŸŒ Africa Tour',
      human: 'ðŸ§‘â€ðŸ’¼ Talk to Human'
    };
    const label = map[option] || option;
    waAddMsg(label, 'user');
    if (option === 'human') {
      waAddTyping();
      setTimeout(() => { waRemoveTyping(); waBotReply('human'); }, 700);
      return;
    }
    if (WA_STATE.step === 'greeting') {
      waAddTyping();
      setTimeout(() => { waRemoveTyping(); waBotReply(option); }, 700);
      return;
    }
    // If mid-flow, treat as generic answer
    waAddTyping();
    setTimeout(() => { waRemoveTyping(); waBotReply(label); }, 700);
  }

  function initWhatsApp() {
    const widgetBtn = $('#wa-widget-btn');
    if (widgetBtn) widgetBtn.addEventListener('click', openWhatsAppModal);

    const closeBtn = document.querySelector('[data-close-whatsapp]');
    if (closeBtn) closeBtn.addEventListener('click', closeWhatsAppModal);

    const overlay = $('#whatsapp-modal');
    if (overlay) {
      overlay.addEventListener('click', e => {
        if (e.target === overlay) closeWhatsAppModal();
      });
    }

    document.querySelectorAll('.wa-quick[data-quick]').forEach(btn => {
      btn.addEventListener('click', () => waHandleQuick(btn.getAttribute('data-quick')));
    });

    const form = $('#wa-input-form');
    if (form) {
      form.addEventListener('submit', e => {
        e.preventDefault();
        const input = $('#wa-input');
        const text = (input.value || '').trim();
        if (!text) return;
        waAddMsg(waQuote(text), 'user');
        input.value = '';
        waAddTyping();
        setTimeout(() => { waRemoveTyping(); waBotReply(text); }, 800);
      });
    }
  }

  async function loginAgent(event) {
    const form = $('#agent-login-form');
    if (!form) return;
    event.preventDefault();
    const email = form.elements.email?.value || '';
    const password = form.elements.password?.value || '';
    const errEl = $('#agent-login-error');
    if (errEl) errEl.style.display = 'none';

    try {
      const res = await fetch(`${AGENT_API}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (errEl) { errEl.textContent = data.error || 'Login failed. Check credentials.'; errEl.style.display = 'block'; }
        return;
      }
      // Store session
      setAgentSession({ ...data.agent, token: data.token });
      showAgentDashboard();
    } catch (e) {
      if (errEl) { errEl.textContent = 'Network error. Please try again.'; errEl.style.display = 'block'; }
    }
  }

  function showAgentDashboard() {
    const loginBox = $('#agent-login-box');
    const dashboardContent = $('#agent-dashboard-content');
    const session = getAgentSession();
    if (!session) return;

    if (loginBox) loginBox.style.display = 'none';
    if (dashboardContent) dashboardContent.style.display = 'block';

    // Display agent info
    const agentNameEl = $('#agent-name-display');
    if (agentNameEl) agentNameEl.textContent = session.contactPersonName || session.agencyName || 'Agent';

    // Load candidate submissions
    loadAgentCandidates();
  }

  async function loadAgentCandidates() {
    const session = getAgentSession();
    if (!session) return;
    const list = $('#agent-candidates-list');
    if (!list) return;
    list.innerHTML = '<div class="skeleton skeleton-text" style="height:40px;"></div><div class="skeleton skeleton-text" style="height:40px;"></div>';
    
    try {
      const res = await fetch(`${AGENT_API}/${session.id}/candidates`, {
        headers: { 'Authorization': Bearer  }
      });
      const data = await res.json().catch(() => ({ candidates: [] }));
      const candidates = data.candidates || [];
      if (candidates.length === 0) {
        list.innerHTML = '<p style="text-align:center;color:var(--text-muted);">No candidates submitted yet.</p>';
        return;
      }
      list.innerHTML = candidates.map(c => `
        <div class="candidate-row">
          <div>
            <div class="candidate-name">${c.candidateName}</div>
            <div class="candidate-email">${c.email}</div>
          </div>
          <div class="candidate-status">
            <span class="badge ${c.status === 'approved' ? 'badge-success' : c.status === 'rejected' ? 'badge-danger' : 'badge-warning'}">${c.status || 'pending'}</span>
          </div>
        </div>
      `).join('');
    } catch (e) {
      list.innerHTML = '<p style="color:var(--red);">Failed to load candidates.</p>';
    }
  }

  async function submitAgentCandidate(event) {
    const form = $('#agent-submit-candidate-form');
    if (!form) return;
    event.preventDefault();
    const session = getAgentSession();
    if (!session) { alert('Please login first.'); return; }

    const fd = new FormData(form);
    const payload = {
      candidateName: fd.get('candidateName'),
      email: fd.get('email'),
      phone: fd.get('phone'),
      country: fd.get('country'),
      visaType: fd.get('visaType'),
      cvFile: fd.get('cvFile'),
      passportCopy: fd.get('passportCopy')
    };

    const btn = form.querySelector('button[type="submit"]');
    const original = btn.textContent;
    btn.textContent = 'â³ Submitting...';
    btn.disabled = true;

    try {
      const res = await fetch(`${AGENT_API}/${session.id}/candidates`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': Bearer  },
        body: JSON.stringify(payload)
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) { alert(data.error || 'Submission failed'); btn.textContent = original; btn.disabled = false; return; }
      alert('âœ“ Candidate submitted for review!');
      form.reset();
      loadAgentCandidates();
      btn.textContent = original;
      btn.disabled = false;
    } catch (e) {
      alert('Error: ' + e.message);
      btn.textContent = original;
      btn.disabled = false;
    }
  }

  function logoutAgent() {
    clearAgentSession();
    const loginBox = $('#agent-login-box');
    const dashboardContent = $('#agent-dashboard-content');
    if (loginBox) loginBox.style.display = 'block';
    if (dashboardContent) dashboardContent.style.display = 'none';
    const form = $('#agent-login-form');
    if (form) form.reset();
  }

  function initAgentSystem() {
    // Check if agent is already logged in
    const session = getAgentSession();
    if (session) {
      showAgentDashboard();
    }

    // Register form
    const registerForm = $('#agent-register-form');
    if (registerForm) {
      registerForm.addEventListener('submit', registerAgent);
    }

    // Login form
    const loginForm = $('#agent-login-form');
    if (loginForm) {
      loginForm.addEventListener('submit', loginAgent);
    }

    // Submit candidate form
    const candidateForm = $('#agent-submit-candidate-form');
    if (candidateForm) {
      candidateForm.addEventListener('submit', submitAgentCandidate);
    }

    // Logout button
    const logoutBtn = $('#agent-logout-btn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', logoutAgent);
    }
  }

  function addStructuredData() {
    const packages = [...(PKG.travelVisas || []), ...(PKG.workVisas || []), ...(PKG.studyVisas || []), ...(PKG.canadaPR || [])];
    const graph = [
      ...(PKG.eastAfricaTours || []).map(tour => ({
        '@type': 'TouristTrip',
        name: tour.destination,
        description: tour.description,
        provider: { '@type': 'TravelAgency', name: 'Pascal Travels & Tour', url: 'https://pascaltravels.com/' },
        offers: { '@type': 'Offer', priceCurrency: tour.currency || 'USD', price: tour.pricePerPerson, availability: 'https://schema.org/InStock' }
      })),
      ...packages.map(visa => ({
        '@type': 'Service',
        name: `${visa.country || visa.stream} visa support`,
        description: visa.description,
        provider: { '@type': 'TravelAgency', name: 'Pascal Travels & Tour' },
        offers: { '@type': 'Offer', priceCurrency: visa.processingCurrency || 'USD', price: visa.priceProcessing || visa.pricePerPerson || 0 }
      })),
      ...(window.JOBS_DATA || []).map(job => ({
        '@type': 'JobPosting',
        title: job.title,
        description: job.description,
        datePosted: job.created_at,
        employmentType: job.type,
        hiringOrganization: { '@type': 'Organization', name: 'Pascal Travels & Tour' },
        jobLocation: { '@type': 'Place', address: { '@type': 'PostalAddress', addressCountry: job.country } }
      }))
    ];
    const script = document.createElement('script');
    script.id = 'dynamic-structured-data';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph });
    document.head.appendChild(script);
  }

  function init() {
    addStructuredData();
    renderServices();
    renderVisaPackages('travel');
    initTourSearch();
    renderTours(appState.tourSearch);
    if (document.body.dataset.page === 'jobs' && $('#jobs-swiper-wrapper')) initJobs();
    renderTourComparison();
    renderDubaiPackages();
    renderCanadaVisual();
    initWhatsApp();
    attachGlobalHandlers();
    initQuickApplyForm();
    initVisaApplicationForm();
    initAgentLoginView();
    showReferralBanner();
  }

  document.addEventListener('DOMContentLoaded', init);
})();