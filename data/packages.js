window.PACKAGES_DATA = {
  services: [
    {
      id: 'jobs',
      name: 'Overseas Jobs',
      shortName: 'Jobs',
      icon: '💼',
      tagline: 'Skilled & unskilled employment abroad',
      description: 'Expert assistance in securing skilled & unskilled jobs abroad — from application to travel preparation. Verified employers across UAE, Qatar, Europe and more.',
      features: ['Verified employer network', 'Skilled & unskilled placement', 'Contract negotiation', 'Pre-departure orientation']
    },
    {
      id: 'work-visa',
      name: 'Work Visas',
      shortName: 'Work Visas',
      icon: '🛠️',
      tagline: 'Legal employment visas worldwide',
      description: 'End-to-end work visa processing with employer documentation, permits, work contracts, and consulate appointment booking.',
      features: ['🇦🇪 UAE (Dubai)', '🇶🇦 Qatar', '🇨🇿 Czech Republic', '🇩🇪 Germany', '🇱🇻 Latvia', '🇷🇸 Serbia', '🇲🇪 Montenegro', '🇸🇰 Slovakia', '🇵🇱 Poland', '🇵🇹 Portugal', '🇪🇪 Estonia & many more']
    },
    {
      id: 'schengen-visa',
      name: 'Schengen Visas',
      shortName: 'Schengen',
      icon: '🇪🇺',
      tagline: '27 European countries — one visa',
      description: 'Specialized help with accurate, complete, and compliant Schengen visa applications covering 27 European nations.',
      features: ['27 country access', 'Single/multiple entry', 'Insurance & itinerary support', 'Fast processing (3-15 days)']
    },
    {
      id: 'study-visa',
      name: 'Study Abroad',
      shortName: 'Study Visas',
      icon: '🎓',
      tagline: 'Admissions + visas + travel prep',
      description: 'Guidance on university admissions, study visas, and seamless travel preparation for students heading to Europe, UK, Canada, USA, Australia.',
      features: ['🇨🇿 Czech Republic', '🇩🇪 Germany', '🇱🇻 Latvia', '🇷🇸 Serbia', '🇲🇪 Montenegro', '🇸🇰 Slovakia', '🇵🇱 Poland', '🇵🇹 Portugal', '🇪🇪 Estonia & many more']
    },
    {
      id: 'canada-pr',
      name: 'Canada PR & Visas',
      shortName: 'Canada / UK / USA / Europe',
      icon: '🍁',
      tagline: 'Permanent Residency & destination visas',
      description: 'Express Entry, PNP nominations, Family Sponsorship. Also destination visas to United Kingdom, Canada, United States, and all of Europe.',
      features: ['🇬🇧 United Kingdom', '🇨🇦 Canada (Express Entry / PNP)', '🇺🇸 United States', '🇪🇺 Europe (Schengen & national)', 'CRS score booster', 'Post-landing settlement']
    },
    {
      id: 'east-africa',
      name: 'Africa Tours',
      shortName: 'Africa',
      icon: '🦁',
      tagline: 'Safari, beaches & gorilla treks',
      description: 'Curated local tours and safaris across Kenya, Tanzania, Uganda, Rwanda — wildlife encounters, beach getaways, cultural immersion, all expertly planned.',
      features: ['Masai Mara Great Migration', 'Serengeti & Ngorongoro', 'Bwindi Gorilla Trek (Uganda)', 'Rwanda Volcanoes Gorillas', 'Zanzibar beach holidays', 'Mombasa & Diani coast']
    }
  ],

  travelVisas: [
    { id: 'uae-tv', category: 'travel-visa', country: 'United Arab Emirates', countryCode: 'AE', flag: '🇦🇪', city: 'Dubai / Abu Dhabi', priceProcessing: 189, priceTicket: 620, estimatedDays: '5-7', description: 'Visit the futuristic skylines, luxury malls, and desert adventures of the UAE.', requirements: ['passport', 'photos', 'bankStatement', 'flightItinerary', 'hotelBooking', 'travelInsurance'], visaTypes: ['Tourist (30 days)', 'Visit (90 days)', 'Transit (96 hrs)'], popularTags: ['Burj Khalifa', 'Desert Safari', 'Luxury Shopping'] },
    { id: 'kazakhstan-tv', category: 'travel-visa', country: 'Kazakhstan', countryCode: 'KZ', flag: '🇰🇿', city: 'Almaty / Astana', priceProcessing: 149, priceTicket: 780, estimatedDays: '7-10', description: 'Explore the vast steppes, modern architecture, and mountain landscapes of Central Asia.', requirements: ['passport', 'photos', 'bankStatement', 'flightItinerary', 'hotelBooking', 'invitationLetter'], visaTypes: ['Tourist (30 days)', 'Business'], popularTags: ['Mountain Lakes', 'Silk Road', 'Astana City'] },
    { id: 'india-tv', category: 'travel-visa', country: 'India', countryCode: 'IN', flag: '🇮🇳', city: 'Mumbai / Delhi', priceProcessing: 129, priceTicket: 550, estimatedDays: '3-5', description: 'Discover ancient palaces, vibrant festivals, and diverse cultures across incredible India.', requirements: ['passport', 'photos', 'bankStatement', 'flightItinerary', 'hotelBooking', 'itineraryDetails'], visaTypes: ['e-Tourist (30 days)', 'e-Tourist (1 year)'], popularTags: ['Taj Mahal', 'Bollywood', 'Spiritual'] },
    { id: 'oman-tv', category: 'travel-visa', country: 'Oman', countryCode: 'OM', flag: '🇴🇲', city: 'Muscat', priceProcessing: 159, priceTicket: 580, estimatedDays: '5-7', description: 'Experience authentic Arabian hospitality, stunning fjords, desert camps, and historic forts.', requirements: ['passport', 'photos', 'bankStatement', 'flightItinerary', 'hotelBooking', 'travelInsurance'], visaTypes: ['e-Visa (30 days)', 'Express (24 hrs)'], popularTags: ['Desert Camps', 'Historic Forts', 'Dolphin Watching'] },
    { id: 'saudi-tv', category: 'travel-visa', country: 'Saudi Arabia', countryCode: 'SA', flag: '🇸🇦', city: 'Riyadh / Jeddah', priceProcessing: 179, priceTicket: 600, estimatedDays: '5-8', description: 'Discover NEOM, Red Sea projects, historical Diriyah, and modern Saudi Arabia.', requirements: ['passport', 'photos', 'bankStatement', 'flightItinerary', 'hotelBooking'], visaTypes: ['Tourist eVisa (90 days)', 'Umrah + Tourist'], popularTags: ['Al-Ula Heritage', 'Red Sea', 'NEOM'] },
    { id: 'qatar-tv', category: 'travel-visa', country: 'Qatar', countryCode: 'QA', flag: '🇶🇦', city: 'Doha', priceProcessing: 139, priceTicket: 590, estimatedDays: '4-6', description: 'World-class museums, futuristic stadiums, luxury hotels, and genuine Arabian hospitality.', requirements: ['passport', 'photos', 'bankStatement', 'flightItinerary', 'hotelBooking', 'travelInsurance'], visaTypes: ['Hayya Card (90 days)', 'Tourist eVisa'], popularTags: ['Museums', 'Lusail City', 'Doha Corniche'] },
    { id: 'bahrain-tv', category: 'travel-visa', country: 'Bahrain', countryCode: 'BH', flag: '🇧🇭', city: 'Manama', priceProcessing: 149, priceTicket: 560, estimatedDays: '5-7', description: 'Island kingdom with ancient history, modern souqs, pearl diving, and F1 circuit.', requirements: ['passport', 'photos', 'bankStatement', 'flightItinerary', 'hotelBooking'], visaTypes: ['eVisa (14/30 days)', 'Multi-entry'], popularTags: ['Pearl Diving', 'F1 Circuit', 'Ancient Sites'] },
    { id: 'georgia-tv', category: 'travel-visa', country: 'Georgia', countryCode: 'GE', flag: '🇬🇪', city: 'Tbilisi', priceProcessing: 119, priceTicket: 680, estimatedDays: '7-10', description: 'Caucasus gem with ancient wine culture, mountain monasteries, and charming old towns.', requirements: ['passport', 'photos', 'bankStatement', 'flightItinerary', 'hotelBooking', 'travelInsurance'], visaTypes: ['eVisa (30/90 days)'], popularTags: ['Wine Tours', 'Caucasus Mountains', 'Old Tbilisi'] },
    { id: 'uk-tv', category: 'travel-visa', country: 'United Kingdom', countryCode: 'GB', flag: '🇬🇧', city: 'London / Manchester', priceProcessing: 229, priceTicket: 890, estimatedDays: '15-21', description: 'Standard Visitor visa for tourism, family visits, or short business trips across England, Scotland, Wales, NI.', requirements: ['passport', 'photos', 'bankStatement', 'flightItinerary', 'hotelBooking', 'invitationLetter', 'travelInsurance'], visaTypes: ['Standard Visitor (6 months)', 'Long-term 2/5/10 yr'], popularTags: ['Big Ben', 'Royal Palaces', 'Scottish Highlands'] },
    { id: 'usa-tv', category: 'travel-visa', country: 'United States', countryCode: 'US', flag: '🇺🇸', city: 'Nationwide', priceProcessing: 279, priceTicket: 1150, estimatedDays: '21-45', description: 'B1/B2 visitor visa application with DS-160 filing, interview prep, and consulate appointment booking.', requirements: ['passport', 'photos', 'bankStatement', 'flightItinerary', 'itineraryDetails'], visaTypes: ['B1 Business', 'B2 Tourism', 'B1/B2 Combined'], popularTags: ['New York', 'California', 'National Parks'] }
  ],

  workVisas: [
    { id: 'dubai-wv', category: 'work-visa', country: 'United Arab Emirates (Dubai)', countryCode: 'AE', flag: '🇦🇪', city: 'Dubai', priceProcessing: 250000, priceTicket: 0, processingCurrency: 'KES', estimatedDays: '~2 months', ageLimit: 'All nationalities (excl. sanctioned countries)', description: 'DUBAI — Employment Visa & Legal Work Placement. Full employer-sponsored work permit, employment contract, and legal placement with UAE-registered companies.', requirements: ['passport', 'cv', 'diploma', 'policeClearance'], visaTypes: ['Work Permit (Employment Visa)'], industries: ['Hospitality', 'Construction', 'Retail', 'Logistics', 'Healthcare', 'Domestic'], salaryRange: 'AED 2,000 – AED 6,000/month',
      pricingBreakdown: { currency: 'KES', totalServiceFee: 250000, installments: [{ label: 'Initial payment', amount: 100000 }, { label: 'Final payment (upon document readiness)', amount: 150000 }],
        visitOption: { label: 'Visit Visa + Ticket + Airport Pickup + Accommodation + Job', total: 230000, installments: [{ label: '1st installment', amount: 80000 }, { label: '2nd installment', amount: 100000 }, { label: '3rd installment', amount: 50000 }] } },
      employerDocs: ['Official Work Permit', 'Employment Contract', 'Proof of Accommodation (optional)'],
      procedureSteps: [
        'Candidate submits all required documents (passport 6+ months valid, CV, address, education docs, police clearance) and pays initial KES 100,000.',
        'Pascal forwards the profile to the UAE employer who initiates work permit & MOHRE application.',
        'Once the document package is ready the candidate receives certified confirmation of readiness and pays the final KES 150,000.',
        'The complete work visa file (Work Permit + contract + accommodation support) is released to the candidate for entry.'
      ],
      additionalInfo: ['Target audience: Candidates of all nationalities except sanctioned/restricted-travel countries.', 'Processing time: approximately 2 months from document submission.', 'Work visa is issued for 2 years (standard UAE employment visa), renewable.', 'Medical fitness test conducted on arrival in the UAE.'] },

    { id: 'qatar-wv', category: 'work-visa', country: 'Qatar', countryCode: 'QA', flag: '🇶🇦', city: 'Doha', priceProcessing: 270000, priceTicket: 0, processingCurrency: 'KES', estimatedDays: '~2 months', ageLimit: 'All nationalities (excl. sanctioned countries)', description: 'QATAR — Employment Visa & Legal Work Placement. Employer-sponsored work permit and employment contract with Qatari-registered companies across hospitality, construction, healthcare, and oil & gas support.', requirements: ['passport', 'cv', 'diploma', 'policeClearance'], visaTypes: ['Work Permit (Qatar Employment Visa)'], industries: ['Hospitality', 'Construction', 'Healthcare', 'Oil & Gas Support', 'Retail'], salaryRange: 'QAR 2,000 – QAR 7,000/month',
      pricingBreakdown: { currency: 'KES', totalServiceFee: 270000, installments: [{ label: 'Initial payment', amount: 120000 }, { label: 'Final payment (upon document readiness)', amount: 150000 }],
        visitOption: { label: 'Visit Visa + Ticket + Airport Pickup + Accommodation + Job', total: 250000, installments: [{ label: '1st installment', amount: 100000 }, { label: '2nd installment', amount: 100000 }, { label: '3rd installment', amount: 50000 }] } },
      employerDocs: ['Official Work Permit', 'Employment Contract', 'Proof of Accommodation (optional)'],
      procedureSteps: [
        'Candidate submits all required documents (passport 6+ months valid, CV, address, education docs, police clearance) and pays initial KES 120,000.',
        'Pascal forwards the candidate profile to the Qatari employer to begin Ministry of Labour work permit processing.',
        'Once documents are ready the candidate receives sworn confirmation of readiness and pays the final KES 150,000.',
        'Work visa documents are dispatched to the candidate for visa stamping and travel to Doha.'
      ],
      additionalInfo: ['Target audience: Candidates of all nationalities except sanctioned/restricted-travel countries.', 'Processing time: approximately 2 months.', 'Qatar work residence visa is valid for 2 years, renewable through employer.', 'Qatar ID (QID) is processed after arrival by the employer.'] },

    { id: 'czech-wv', category: 'work-visa', country: 'Czech Republic', countryCode: 'CZ', flag: '🇨🇿', city: 'Prague', priceProcessing: 4000, priceTicket: 0, processingCurrency: 'EUR', estimatedDays: 'Document preparation 5–10 business days · DHL delivery up to 10 days', ageLimit: 'All nationalities (excl. restricted/high-risk countries)', description: 'CZECH REPUBLIC — 2-Year Work Card. Central EU single-market access. Full employment contract, accommodation confirmation, and business-entity acceptance letter for Employee Card.', requirements: ['passport', 'cv', 'sponsorshipLetter', 'accommodationProof'], visaTypes: ['Employee / Work Card (2 years)'], industries: ['IT & Software', 'Automotive', 'Manufacturing', 'Tourism & Hospitality'], salaryRange: '€1,200 – €3,500/month',
      pricingBreakdown: { currency: 'EUR', totalServiceFee: 4000, installments: [{ label: 'First payment (advance)', amount: 1500 }, { label: 'Second payment (upon document readiness)', amount: 2500 }] },
      visaSupportPackage: ['Employment contract', 'Proof of accommodation', 'Confirmation from a Czech business entity accepting a third-country national for employment purposes'],
      candidateRequiredToProvide: ['A scanned copy of your valid international passport (first page and any visa/stamp pages)', 'Completed job application form (we will provide a template)', 'Updated CV', 'Full residential address', 'Preferred activation date of the invitation (considering time for document preparation is required)', 'Payment confirmation'],
      procedureSteps: [
        'Step 1: Candidate submits passport scan, completed job application template, CV, full residential address, preferred invitation activation date, and payment confirmation. Pays first advance of €1,500.',
        'Step 2: Pascal forwards all data to the Czech business partner; document preparation takes 5–10 business days.',
        'Step 3: Upon certified document readiness the candidate pays the remaining €2,500 final balance.',
        'Step 4: Full visa support package (employment contract + accommodation + entity confirmation letter) is dispatched via DHL (up to 10 days) for consulate submission.'
      ],
      additionalInfo: ['Work / Employee Card is issued for 2 years by the Czech consulate.', 'After 4 years of continuous legal stay, long-term residency is available (per Czech legislation).', 'EU Blue Card upgrade option is available for highly-qualified candidates meeting salary thresholds.'] },

    { id: 'germany-wv', category: 'work-visa', country: 'Germany', countryCode: 'DE', flag: '🇩🇪', city: 'Berlin / Munich', priceProcessing: 3500, priceTicket: 750, processingCurrency: 'EUR', estimatedDays: 'Up to 20 weeks (document processing) + up to 10 business days delivery', ageLimit: 'Applicants must be 45 years old or younger. All nationalities except international terrorism sanctions.', description: 'GERMANY — Employment Documents for Skilled Workers. EU powerhouse with IHK recognition of qualifications, German Employment Agency (ZAV) approval, and full employer sponsorship.', requirements: ['passport', 'photos', 'employmentContract', 'diploma', 'cv', 'workExperience', 'languageTest'], visaTypes: ['EU Blue Card', 'Work Visa (Skilled)'], industries: ['Engineering', 'IT', 'Healthcare', 'Automotive', 'Construction'], salaryRange: '€3,500 – €7,000/month',
      pricingBreakdown: { currency: 'EUR', totalServiceFee: 3500, installments: [{ label: 'Initial payment (post-verification)', amount: 2000 }, { label: 'Final payment (upon document readiness)', amount: 1500 }] },
      employerDocs: ['Official Work Permit', 'Employment Contract', 'Invitation Letter for residence application', 'Access to German Language Courses'],
      procedureSteps: [
        'Step 1 – Pre-Assessment & Verification: A manager conducts a preliminary verification interview (screen-recorded) to confirm work history and qualifications. Candidate then pays initial €2,000 to start processing.',
        'Step 2 – Document Preparation: Qualifications recognition by IHK (Chamber of Industry and Commerce), employment contract drafting, submission to German Employment Agency (ZAV), preparation of all embassy-level visa documents.',
        'Step 3 – Arrival & Employment: Candidate welcomed with temporary accommodation, official work registration, probationary employment begins as per contract. Final €1,500 balance is paid on certified digital confirmation of document readiness.'
      ],
      additionalInfo: ['Documents are issued for 1 year.', 'Visa is issued for a 12-month period with an initial 90-day stay allowance.', 'Candidate applies for the visa at the German consulate; consular fees paid by candidate (vary by country).', 'Upon arrival the employer provides assistance with the residence permit (TRC) process.'] },

    { id: 'latvia-wv', category: 'work-visa', country: 'Latvia', countryCode: 'LV', flag: '🇱🇻', city: 'Riga', priceProcessing: 5000, priceTicket: 0, processingCurrency: 'EUR', estimatedDays: 'Doc prep 2–6 weeks · DHL delivery up to 20 days', ageLimit: '18 – 55 years · All nationalities except sanctioned/travel-restricted countries', description: 'LATVIA — Seasonal work with official documents. Baltic seasonal and full-time work programs with employer permits, contracts, and invitation letters for visa submission.', requirements: ['passport', 'cv', 'diploma', 'policeClearance'], visaTypes: ['Seasonal Work Visa (3 months) → TRC after 2 months'], industries: ['Agriculture / Seasonal', 'Logistics', 'Wood Processing', 'Hospitality'], salaryRange: '€1,200 – €3,000/month',
      pricingBreakdown: { currency: 'EUR', totalCostOfService: 5000, installments: [{ label: 'Initial payment', amount: 2000 }, { label: 'Final payment (upon document readiness)', amount: 3000 }] },
      requiredFromCandidate: ['High-quality scanned copy of the passport (1st page + all stamps)', 'Completed job application brief (template provided)', 'CV (résumé)', 'Full residential address', 'Police clearance certificate', 'Educational diploma (if available)', 'Additional education info (if available)', 'Payment confirmation for service'],
      employerDocs: ['Official work permit', 'Employment contract', 'Invitation letter for visa submission'],
      procedureSteps: [
        'Step 1: Candidate submits all required documents (as per Required From Candidate list) and pays the initial amount of €2,000. Pascal forwards the candidate profile to the employer and initiates document preparation.',
        'Step 2: Once official documents are ready the candidate receives sworn confirmation of readiness and proceeds with the final payment of €1,900.',
        'Step 3: The complete document package is then handed over / dispatched via DHL (up to 20 days) for visa application.'
      ],
      additionalInfo: ['The employer fully supports the candidate throughout the visa process, including consulate appointment registration.', 'After 2 months of employment assistance is provided to apply for a Temporary Residence Permit (TRC) — additional cost €950.', 'Candidates first apply for a seasonal work visa valid for 3 months.', 'Estimated consular/service fees: €60–90 (paid by the candidate directly at the consulate or VFS).', 'Applicants from India, Nepal, and Sri Lanka must undergo document verification through Hello Verify India Private Limited PRIOR to submitting a visa application via VFS Global Latvia — verification must be completed before submitting the visa request.'] },

    { id: 'serbia-wv', category: 'work-visa', country: 'Serbia', countryCode: 'RS', flag: '🇷🇸', city: 'Belgrade', priceProcessing: 3500, priceTicket: 0, processingCurrency: 'EUR', estimatedDays: 'Document preparation: up to 3 weeks · Visa issuance approx. 60 working days from submission to consulate', ageLimit: '18 – 55 years · All nationalities except restricted/high-risk nations', description: 'SERBIA — Full work document package. Employer-issued Work Permit, Employment Contract, Official Job Offer, and PPZ document for consulate submission.', requirements: ['passport', 'cv', 'diploma'], visaTypes: ['Temporary Residence Visa (Work, Type D)'], industries: ['IT Outsourcing', 'Manufacturing', 'Agriculture', 'Construction'], salaryRange: '€800 – €2,200/month',
      pricingBreakdown: { currency: 'EUR', totalCost: 3500, installments: [{ label: 'Advance payment', amount: 2000 }, { label: 'Final payment (once documents are ready)', amount: 1500 }] },
      requiredFromCandidate: ['Scanned copy of international passport (main page + any stamps)', 'CV (résumé)', 'Full residential address', 'Diploma (if available)'],
      employerDocs: ['Work permit', 'Employment contract', 'Official job offer', 'PPZ document'],
      procedureSteps: [
        'Step 1: The candidate makes an initial payment of €1,800. Pascal forwards the candidate data to the employer and document processing begins.',
        'Step 2: Once the documents are ready, the candidate pays the remaining €1,500 and receives the full electronic document package.'
      ],
      additionalInfo: ['Government service fees (consular and notarial): approx. €65–110 — paid separately by the candidate at the consulate/notary.', 'The electronic documents are valid for 6 months from the date of issue.'] },

    { id: 'montenegro-wv', category: 'work-visa', country: 'Montenegro', countryCode: 'ME', flag: '🇲🇪', city: 'Podgorica', priceProcessing: 3900, priceTicket: 700, processingCurrency: 'EUR', estimatedDays: 'Doc prep 7–14 working days · Visa processing 25–40 working days', ageLimit: '18 – 55 years', description: 'MONTENEGRO — Work Visa & Employment Opportunity. Adriatic gem with booming tourism, real estate, construction, and renewable energy projects. Full company invitation + contract + CRPS certificate.', requirements: ['passport', 'cv', 'diploma', 'policeClearance', 'workExperience'], visaTypes: ['Type D Visa (180 days) → 1-year Work Permit → TRC'], industries: ['Tourism', 'Construction', 'Renewable Energy', 'Hospitality'], salaryRange: '€700 – €1,800/month',
      pricingBreakdown: { currency: 'EUR', totalCostOfService: 3900, installments: [{ label: 'Initial payment (€2,000 advance)', amount: 2000 }, { label: 'Final payment (upon receipt of documents)', amount: 1900 }] },
      employerDocs: ['Invitation letter from the company', 'Official employment contract', 'Certificate of company registration (CRPS)'],
      visaSubmissionDocs: ['Employer invitation letter', 'Signed work contract', 'Company registration (CRPS)', 'Visa application form', 'Two recent passport-size photos', 'Bank statement with stamp (recommended)', 'Police clearance certificate in English', 'Medical insurance valid 180 days (tourist coverage)', 'Proof of employment history (diplomas / certificates / work book)', 'Round-trip flight reservation to Podgorica or Tivat', 'Visa fee payment (instructions via embassy email)'],
      procedureSteps: [
        'Step 1: Candidate pays an advance of €2,000. Pascal initiates document processing and submits the data to the employer.',
        'Step 2: Once documents are ready the candidate receives certified scans. After confirming readiness, candidate pays the remaining €1,900 to receive the full document package.',
        'Step 3: Candidate attends in-person visa appointment at the relevant consulate (see Visa Submission Locations below) with all listed documentation.'
      ],
      visaSubmissionLocations: [
        'India, Nepal, Bangladesh → Embassy of Serbia in New Delhi',
        'Pakistan → Embassy of Serbia in Tehran'
      ],
      additionalInfo: ['Passport must be valid for at least 18 months.', 'Police clearance must be in English; notarization not required.', 'Proof of work experience (licenses, recommendations, experience certificates) especially valued for construction roles.', 'Basic English communication skills required.', 'Type D visa issued for 180 days; documents are issued for a 1-year work permit.', 'After arrival the employer assists with the Temporary Residence Card (TRC).', 'Approximate visa application fee: ~€100 (may vary by country of submission).'] },

    { id: 'slovakia-wv', category: 'work-visa', country: 'Slovakia', countryCode: 'SK', flag: '🇸🇰', city: 'Bratislava', priceProcessing: 3500, priceTicket: 690, processingCurrency: 'EUR', estimatedDays: 'Doc prep 21–28 business days · Add. labor office 28 bd · DHL up to 10 days · Visa issuance 30–35 bd', ageLimit: '18 – 55 years', description: 'SLOVAKIA — Complete work documentation package. Central European manufacturing & IT hub integrated into the EU single market. Full work permit, employment contract, job offer, guarantee letter & accommodation proof.', requirements: ['passport', 'cv', 'diploma'], visaTypes: ['Single Permit (Work + Residence)', 'EU Blue Card'], industries: ['Automotive', 'IT', 'Electronics', 'Manufacturing', 'Welding / Electrical / Driver (qualified)'], salaryRange: '€1,000 – €2,800/month',
      pricingBreakdown: { currency: 'EUR', totalCostOfService: 3500, installments: [{ label: 'Initial payment', amount: 2000 }, { label: 'Final payment (upon receipt of documents)', amount: 1500 }] },
      employerDocs: ['Work permit', 'Employment contract / Job offer letter', 'Letter of guarantee', 'Proof of accommodation'],
      procedureSteps: [
        'Step 1: Candidate submits all required documents (scanned passport main page + stamps, CV, full residential address, diploma if applicable, educational background, skill certificates if qualified role — welders, electricians, drivers, basic English A2–B1) and pays initial €2,000.',
        'Step 2: Pascal forwards the candidate profile to the employer and initiates document preparation including any additional labor-office confirmation (28 business days for select countries).',
        'Step 3: Once official documents are ready the candidate receives sworn confirmation of readiness and pays the final €1,500. Complete document package is dispatched via DHL (up to 10 days).',
        'Step 4: Visa is affixed at the consulate after documents approval (30–35 business days).'
      ],
      additionalInfo: ['Passport must be valid for at least 12 months from date of submission.', 'Basic English knowledge A2–B1 level is required.', 'Type D national visa is issued for 6 to 12 months.', 'Approximate consular and service fees: €60–100 (paid directly by candidate).', 'All documents valid for 1 year.', 'Upon arrival employer assists with Temporary Residence Card (TRC).'] },

    { id: 'poland-wv', category: 'work-visa', country: 'Poland', countryCode: 'PL', flag: '🇵🇱', city: 'Warsaw / Krakow', priceProcessing: 849, priceTicket: 680, processingCurrency: 'EUR', estimatedDays: '30-45 days', description: 'One of Europe\'s fastest-growing economies. Strong demand in IT, manufacturing, and BPO shared services.', requirements: ['passport', 'photos', 'employmentContract', 'diploma', 'policeClearance', 'medical', 'proofOfFunds'], visaTypes: ['Work Permit + Residence', 'EU Blue Card'], industries: ['IT', 'Manufacturing', 'BPO / Shared Services'], salaryRange: '€1,100 – €3,200/month' },

    { id: 'portugal-wv', category: 'work-visa', country: 'Portugal', countryCode: 'PT', flag: '🇵🇹', city: 'Lisbon / Porto', priceProcessing: 6000, priceTicket: 780, processingCurrency: 'EUR', estimatedDays: 'Up to 60 working days from start of application', ageLimit: 'All nationalities except those under international sanctions/travel restrictions', description: 'PORTUGAL — Employment Visa & Legal Job Placement. Atlantic coast lifestyle, booming tech scene, renewable energy and tourism. Full employer work permit, contract, accommodation, and business entity hosting confirmation.', requirements: ['passport', 'cv', 'diploma', 'policeClearance'], visaTypes: ['Residence Visa Type D (Work, 365 days) → TRC 1–2 yrs'], industries: ['Tech & Startups', 'Tourism', 'Renewables', 'Construction'], salaryRange: '€1,200 – €3,500/month',
      pricingBreakdown: { currency: 'EUR', serviceFee: 6000, installments: [{ label: 'Initial payment', amount: 3000 }, { label: 'Final payment (upon document readiness)', amount: 3000 }] },
      employerDocs: ['Official Work Permit', 'Signed Employment Contract', 'Proof of Accommodation in Portugal', 'Official confirmation that a Portuguese business entity is hosting a third-country national for employment purposes'],
      procedureSteps: [
        'Step 1: Candidate submits all required documents (high-quality passport bio-page + all stamped pages, completed order brief, updated CV, residential address, education certificates, police clearance, proof of initial installment) and pays initial €3,000.',
        'Step 2: Pascal forwards the candidate profile to the Portuguese employer and initiates document preparation.',
        'Step 3: Once official documents are ready the candidate receives sworn confirmation of readiness and proceeds with the final payment of €2,500.',
        'Step 4: The complete document package is handed over for visa application submission at the nearest Portuguese Embassy or Visa Center.'
      ],
      additionalInfo: ['The Type D visa is issued for 365 days.', 'Visa and consular fees are to be covered by the candidate directly at the Embassy or Visa Center.', 'Upon arrival in Portugal, the employer assists in obtaining a Temporary Residence Card (TRC) valid for 1 to 2 years.'] },

    { id: 'estonia-wv', category: 'work-visa', country: 'Estonia', countryCode: 'EE', flag: '🇪🇪', city: 'Tallinn', priceProcessing: 5000, priceTicket: 710, processingCurrency: 'EUR', estimatedDays: 'Up to 60 working days from the start of the procedure', ageLimit: 'All nationalities except those under international sanctions/travel restrictions', description: 'ESTONIA — Employment Visa & Legal Work Placement. Digital society pioneer with e-Residency program and vibrant startup ecosystem. Full employer work permit, contract, accommodation, and Estonian business entity confirmation letter.', requirements: ['passport', 'cv', 'diploma', 'policeClearance'], visaTypes: ['Type D National Visa (6-12 months) → Temporary Residence Card (1–2 years)'], industries: ['Fintech & IT', 'Startups', 'Cybersecurity'], salaryRange: '€1,500 – €3,800/month',
      pricingBreakdown: { currency: 'EUR', totalServiceFee: 5000, installments: [{ label: 'Initial payment (€2,500)', amount: 2500 }, { label: 'Final payment (upon document readiness, €2,500)', amount: 2500 }] },
      employerDocs: ['Official Work Permit', 'Employment Contract', 'Proof of Accommodation in Estonia', 'Confirmation letter from the Estonian business entity stating acceptance of a third-country national for the purpose of employment'],
      procedureSteps: [
        'Step 1: The candidate submits all required documents (high-quality passport scan main page + entry/exit stamps, completed order brief, CV, full residential address, education documents, police clearance, proof of initial installment payment) and makes the initial payment of €2,500. Pascal forwards candidate information to the employer to begin processing.',
        'Step 2: Once the document package is ready, the candidate receives certified confirmation of readiness and pays the remaining €2,000. The final package is then sent to the candidate for visa application.'
      ],
      additionalInfo: ['A Type D national visa is issued for 6 to 12 months.', 'Visa and consular service fees are paid directly by the candidate to the consulate — not included in the service offer.', 'Employment documents are issued for a 1-year period and provided in electronic format.', 'After arrival and 3 months of employment the employer provides support in applying for a Temporary Residence Card (TRC) valid for 1 to 2 years.', 'The employer pre-registers the candidate for their visa appointment at the Estonian consulate.'] }
  ],

  studyVisas: [
    { id: 'usa-sv', category: 'study-visa', country: 'United States', countryCode: 'US', flag: '🇺🇸', city: 'Nationwide', priceProcessing: 699, priceTicket: 950, estimatedDays: '45-60', description: 'World\'s top-ranked universities, diverse campuses, and Optional Practical Training (OPT) post-graduation.', requirements: ['passport', 'photos', 'admissionLetter', 'tuitionReceipt', 'diploma', 'languageTest', 'proofOfFunds', 'bankStatement'], degreeLevels: ['Bachelor\'s', 'Master\'s', 'PhD', 'Community College'], avgTuition: '$20,000 - $60,000/year' },
    { id: 'uk-sv', category: 'study-visa', country: 'United Kingdom', countryCode: 'GB', flag: '🇬🇧', city: 'London / Manchester', priceProcessing: 599, priceTicket: 820, estimatedDays: '30-45', description: 'Prestigious Russell Group universities, 2-year Graduate Route post-study work visa.', requirements: ['passport', 'photos', 'admissionLetter', 'tuitionReceipt', 'diploma', 'languageTest', 'bankStatement'], degreeLevels: ['Bachelor\'s', 'Master\'s', 'PhD', 'Foundation'], avgTuition: '£15,000 - £38,000/year' },
    { id: 'canada-sv', category: 'study-visa', country: 'Canada', countryCode: 'CA', flag: '🇨🇦', city: 'Toronto / Vancouver', priceProcessing: 549, priceTicket: 890, estimatedDays: '30-45', description: 'PGWP pathway to PR. High-quality education, multicultural cities, and safe environment.', requirements: ['passport', 'photos', 'admissionLetter', 'tuitionReceipt', 'diploma', 'languageTest', 'proofOfFunds'], degreeLevels: ['Bachelor\'s', 'Master\'s', 'PhD', 'Diploma'], avgTuition: 'C$20,000 - C$45,000/year' },
    { id: 'australia-sv', category: 'study-visa', country: 'Australia', countryCode: 'AU', flag: '🇦🇺', city: 'Sydney / Melbourne', priceProcessing: 579, priceTicket: 1050, estimatedDays: '30-45', description: 'Group of 8 universities, 2-4 year post-study work rights, excellent quality of life.', requirements: ['passport', 'photos', 'admissionLetter', 'tuitionReceipt', 'diploma', 'languageTest', 'proofOfFunds', 'medical'], degreeLevels: ['Bachelor\'s', 'Master\'s', 'PhD', 'Vocational'], avgTuition: 'A$25,000 - A$55,000/year' },
    { id: 'czech-sv', category: 'study-visa', country: 'Czech Republic', countryCode: 'CZ', flag: '🇨🇿', city: 'Prague', priceProcessing: 449, priceTicket: 720, estimatedDays: '30-60', description: 'Affordable tuition, centuries-old universities, and EU student mobility via Erasmus+.', requirements: ['passport', 'photos', 'admissionLetter', 'diploma', 'languageTest', 'proofOfFunds', 'accommodationProof'], degreeLevels: ['Bachelor\'s', 'Master\'s', 'PhD', 'Medical / Engineering'], avgTuition: '€0 (public Czech-taught) – €12,000/year (English)' },
    { id: 'germany-sv', category: 'study-visa', country: 'Germany', countryCode: 'DE', flag: '🇩🇪', city: 'Berlin / Munich', priceProcessing: 499, priceTicket: 750, estimatedDays: '45-60', description: 'Tuition-free public universities, 18-month job seeker visa post-graduation.', requirements: ['passport', 'photos', 'admissionLetter', 'diploma', 'languageTest', 'blockedAccount', 'healthInsurance' ], degreeLevels: ['Bachelor\'s', 'Master\'s', 'PhD'], avgTuition: '€0 (public) – €20,000 (private)' , _blockedAccountNote: true },
    { id: 'latvia-sv', category: 'study-visa', country: 'Latvia', countryCode: 'LV', flag: '🇱🇻', city: 'Riga', priceProcessing: 399, priceTicket: 680, estimatedDays: '30-45', description: 'Baltic EU member with strong technical universities, affordable tuition, and post-study work opportunities.', requirements: ['passport', 'photos', 'admissionLetter', 'diploma', 'proofOfFunds', 'accommodationProof'], degreeLevels: ['Bachelor\'s', 'Master\'s', 'PhD'], avgTuition: '€2,500 – €7,000/year' },
    { id: 'serbia-sv', category: 'study-visa', country: 'Serbia', countryCode: 'RS', flag: '🇷🇸', city: 'Belgrade / Novi Sad', priceProcessing: 379, priceTicket: 620, estimatedDays: '25-40', description: 'Affordable EU-candidate country universities, English-taught medical programs, and low cost of living.', requirements: ['passport', 'photos', 'admissionLetter', 'diploma', 'proofOfFunds'], degreeLevels: ['Bachelor\'s', 'Master\'s', 'PhD', 'Medicine'], avgTuition: '€1,500 – €6,000/year' },
    { id: 'montenegro-sv', category: 'study-visa', country: 'Montenegro', countryCode: 'ME', flag: '🇲🇪', city: 'Podgorica', priceProcessing: 369, priceTicket: 700, estimatedDays: '25-40', description: 'Small Adriatic nation with accredited medical schools, tourism & business faculties, and warm climate.', requirements: ['passport', 'photos', 'admissionLetter', 'diploma', 'proofOfFunds'], degreeLevels: ['Bachelor\'s', 'Master\'s', 'Medicine / Dentistry'], avgTuition: '€2,000 – €7,500/year' },
    { id: 'slovakia-sv', category: 'study-visa', country: 'Slovakia', countryCode: 'SK', flag: '🇸🇰', city: 'Bratislava', priceProcessing: 399, priceTicket: 690, estimatedDays: '30-45', description: 'Central EU country with affordable technical universities, medical programs, and automotive-engineering pathways.', requirements: ['passport', 'photos', 'admissionLetter', 'diploma', 'proofOfFunds', 'accommodationProof'], degreeLevels: ['Bachelor\'s', 'Master\'s', 'PhD'], avgTuition: '€0 (Slovak-taught) – €5,500/year (English)' },
    { id: 'poland-sv', category: 'study-visa', country: 'Poland', countryCode: 'PL', flag: '🇵🇱', city: 'Warsaw / Krakow', priceProcessing: 429, priceTicket: 680, estimatedDays: '30-45', description: 'Fast-growing EU economy, excellent technical universities, and 9-month post-study job seeker visa.', requirements: ['passport', 'photos', 'admissionLetter', 'diploma', 'proofOfFunds', 'accommodationProof'], degreeLevels: ['Bachelor\'s', 'Master\'s', 'PhD'], avgTuition: '€1,800 – €8,000/year' },
    { id: 'portugal-sv', category: 'study-visa', country: 'Portugal', countryCode: 'PT', flag: '🇵🇹', city: 'Lisbon / Porto', priceProcessing: 479, priceTicket: 780, estimatedDays: '35-50', description: 'Sunny coastal EU country with ranked universities in Lisbon, Porto, and Coimbra. Golden Visa pathway via investments after graduation.', requirements: ['passport', 'photos', 'admissionLetter', 'diploma', 'proofOfFunds', 'accommodationProof'], degreeLevels: ['Bachelor\'s', 'Master\'s', 'PhD'], avgTuition: '€600 (public) – €9,500 (private)' },
    { id: 'estonia-sv', category: 'study-visa', country: 'Estonia', countryCode: 'EE', flag: '🇪🇪', city: 'Tallinn', priceProcessing: 419, priceTicket: 710, estimatedDays: '30-45', description: 'Digital-society pioneer with tuition-free Estonian-taught programs and strong IT/fintech programs in English. Post-graduation 12-month job seeker visa.', requirements: ['passport', 'photos', 'admissionLetter', 'diploma', 'proofOfFunds', 'accommodationProof'], degreeLevels: ['Bachelor\'s', 'Master\'s', 'PhD'], avgTuition: '€0 (ET-taught) – €7,000/year (English)' }
  ],

  canadaPR: [
    { id: 'ca-expressentry', category: 'canada-pr', country: 'Canada', countryCode: 'CA', flag: '🍁', stream: 'Express Entry', priceProcessing: 2499, estimatedDays: '6-9 months', description: 'Federal Skilled Worker, Federal Skilled Trades, and Canadian Experience Class. Points-based system for skilled workers.', requirements: ['passport', 'languageTest', 'workExperience', 'diploma', 'policeClearance', 'medical', 'proofOfFunds'], minCRS: '~500 (varies)', settlementFunds: '$13,757 single / $21,552 couple', inclusions: ['Profile creation & CRS optimization', 'Document collection & review', 'ITA application filing', 'PR card tracking'] },
    { id: 'ca-pnp', category: 'canada-pr', country: 'Canada', countryCode: 'CA', flag: '🍁', stream: 'Provincial Nominee Program (PNP)', priceProcessing: 2999, estimatedDays: '9-15 months', description: 'Nomination by a Canadian province (Ontario, BC, Alberta, Manitoba etc.) gives 600 extra CRS points — near-guaranteed ITA.', requirements: ['passport', 'languageTest', 'workExperience', 'diploma', 'policeClearance', 'medical'], popularPNPs: ['Ontario OINP', 'BC PNP', 'Alberta AINP', 'Manitoba MPNP'], inclusions: ['Province eligibility assessment', 'Nomination application', 'Federal PR stage', 'Settlement guidance'] },
    { id: 'ca-family-sponsorship', category: 'canada-pr', country: 'Canada', countryCode: 'CA', flag: '🍁', stream: 'Family Sponsorship', priceProcessing: 1899, estimatedDays: '12-18 months', description: 'Canadian citizens or PRs can sponsor spouse, common-law partner, dependent children, or parents/grandparents.', requirements: ['passport', 'marriage/relationship proof', 'sponsor financial docs', 'policeClearance', 'medical'], inclusions: ['Relationship documentation', 'Sponsor eligibility check', 'Spousal PR application', 'Interview prep (if needed)'] }
  ],

  eastAfricaTours: [
    {
      id: 'enchanting-mara-wild-heart',
      category: 'east-africa',
      country: 'Kenya',
      countryCode: 'KE',
      flag: '🇰🇪',
      destination: '3-Day Enchanting Mara Wild Heart',
      days: 3,
      pricePerPerson: 2300,
      soloPrice: 3200,
      currency: 'USD',
      level: 'Luxury',
      partyType: 'Private tour',
      accommodationType: 'Luxury lodge',
      rating: 5.0,
      reviewCount: 214,
      route: ['Nairobi', 'Masai Mara', 'Nairobi'],
      accommodations: ['Elewana Sand River Masai Mara'],
      description: '3-Day Enchanting Mara Wild Heart',
      inclusions: ['Pop-up roof 4x4', 'Meals All Included'],
      highlights: ['Masai Mara'],
      image: 'images/tours/Wildebeest herd crossing the Mara River.jpg',
      imagePosition: 'center 52%',
      imageScale: 1.15,
      gallery: ['images/tours/Wildebeest herd crossing the Mara River.jpg', 'images/tours/Wildebeest migration.jpg', 'images/tours/Lion and lioness.jpg', 'images/tours/Three giraffes.jpg', 'images/tours/Watamu_001.jpg', 'images/tours/Diani_Beach_021.jpg']
    },
    {
      id: 'uganda-best-of-uganda',
      category: 'east-africa',
      country: 'Uganda',
      countryCode: 'UG',
      flag: '🇺🇬',
      destination: '10-Day Best of Uganda Gorillas and Wildlife Safari',
      days: 10,
      pricePerPerson: 2640,
      priceMin: 2640,
      priceMax: 2640,
      detailRateMin: 2970,
      detailRateMax: 2970,
      currency: 'USD',
      level: 'Mid-range',
      partyType: 'Private tour',
      accommodationType: 'Lodge',
      rating: 4.9,
      reviewCount: 276,
      route: ['Entebbe', 'Ziwa Rhino Ranch', 'Murchison Falls NP', 'Kibale NP', 'Queen Elizabeth NP', 'Bwindi Impenetrable NP', 'Lake Mburo NP', 'Entebbe'],
      accommodations: ['ViaVia Entebbe Guesthouse', 'Nkundwa Nile View Lodge', 'Kibale Forest Lodge', 'Pumba Safari Cottages', 'Bwindi lodge'],
      description: 'On your 10 days safari in Uganda, you will experience the famous Big Five, enjoy unforgettable chimpanzee trekking in Kibale Forest NP and gorilla trekking in Bwindi Impenetrable NP.',
      inclusions: ['Gorilla trek', 'Chimp trek', 'Game drives', 'Boat cruise', 'Rhino tracking', 'All meals included'],
      highlights: ['Entebbe', 'Ziwa Rhino Ranch', 'Murchison Falls', 'Kibale', 'Queen Elizabeth', 'Bwindi'],
      image: 'images/uganda/Queen_Elizabeth_National_Park_005.jpg',
      imageScale: 1.15,
      gallery: ['images/uganda/Queen_Elizabeth_National_Park_005.jpg', 'images/uganda/Murchison_Falls_National_Park_028.jpg', 'images/uganda/Ziwa_Rhino_and_Wildlife_Ranch_008.jpg', 'images/uganda/Bwindi_Impenetrable_National_Park_024.jpg', 'images/uganda/Kalinzu_Forest_Reserve_002.jpg', 'images/uganda/Mgahinga_Gorilla_National_Park_009.jpg']
    },
    {
      id: 'botswana-delta-discovery',
      category: 'east-africa',
      country: 'Botswana',
      countryCode: 'BW',
      flag: '🇧🇼',
      destination: '6-Day Delta Discovery',
      days: 6,
      pricePerPerson: 4036,
      priceMin: 4036,
      priceMax: 6652,
      detailRateMin: 4541,
      detailRateMax: 7484,
      currency: 'USD',
      level: 'Luxury',
      partyType: 'Private tour',
      accommodationType: 'Lodge & tented camp',
      rating: 5.0,
      reviewCount: 148,
      route: ['Maun', 'Moremi Game Reserve', 'Okavango Delta', 'Maun'],
      routeDays: ['Maun · Day 1', 'Moremi Game Reserve · Days 1–3', 'Okavango Delta · Days 4–5', 'Maun · Day 6'],
      accommodations: ['Camp Moremi (Days 1–3)', 'Xugana Island Lodge (Days 4–5)'],
      accommodationDetails: [
        { days: 'Days 1–3', name: 'Camp Moremi', description: 'Luxury+ tented camp inside Moremi Game Reserve (Okavango Delta)', meals: 'All meals included' },
        { days: 'Days 4–5', name: 'Xugana Island Lodge', description: 'Luxury lodge inside the Okavango Delta', meals: 'All meals included' },
        { days: 'Day 6', name: 'End of tour', description: 'Maun', meals: 'Meals at own expense' }
      ],
      transport: '4x4 open-vehicle and light aircraft flights Maun–Moremi–Okavango–Maun.',
      description: 'Five-night fully inclusive luxury safari. Spend three nights at Camp Moremi in the heart of Moremi Game Reserve, tracking wildlife on open-vehicle game drives. Then fly deep into the Okavango Delta for two nights at Xugana Island Lodge, with traditional mokoro canoe excursions, guided bush walks, sunset motorboat safaris and exceptional birdlife.',
      inclusions: ['4x4 open-vehicle game drives', 'Light aircraft transfers', 'Mokoro excursions', 'Guided bush walks', 'Motorized boat safaris', 'Birding', 'All meals on safari nights'],
      highlights: ['Maun', 'Moremi Game Reserve', 'Okavango Delta'],
      gallery: ['images/moremi/Moremi_Game_Reserve_005.jpg', 'images/moremi/Moremi_Game_Reserve_006.jpg', 'images/moremi/Moremi_Game_Reserve_011.jpg', 'images/moremi/Moremi_Game_Reserve_015.jpg', 'images/moremi/Moremi_Game_Reserve_036.jpg', 'images/moremi/Moremi_Game_Reserve_040.jpg'],
      image: 'images/moremi/Moremi_Game_Reserve_005.jpg',
      imageScale: 1.15,
      destinationInfo: { name: 'Moremi Game Reserve (Okavango Delta)', bestTime: 'July to October · Best wildlife viewing', highSeason: 'July to October · Higher rates', bestWeather: 'May to August · Less hot during the day' },
      wildlife: [
        { name: 'Elephant', abundance: 'Abundant' }, { name: 'Giraffe', abundance: 'Common' },
        { name: 'Buffalo', abundance: 'Common' }, { name: 'Zebra', abundance: 'Common' },
        { name: 'Wildebeest', abundance: 'Common' }, { name: 'Hippo', abundance: 'Abundant' },
        { name: 'Lion', abundance: 'Present' }, { name: 'Leopard', abundance: 'Present' },
        { name: 'Wild dog', abundance: 'Present' }, { name: 'Crocodile', abundance: 'Present' },
        { name: 'Birdlife', abundance: 'Rich' }
      ]
    },
    {
      id: 'golden-savannah-budget-safari',
      category: 'east-africa',
      country: 'Kenya',
      countryCode: 'KE',
      flag: '🇰🇪',
      destination: '7-Day Golden Savannah Budget Safari',
      days: 7,
      pricePerPerson: 1799,
      currency: 'USD',
      level: 'Budget',
      bestSeller: true,
      partyType: 'Private tour',
      accommodationType: 'Budget lodge',
      rating: 4.8,
      reviewCount: 521,
      route: ['Nairobi', 'Amboseli', 'Hell\'s Gate', 'Nakuru', 'Mara', 'Nairobi'],
      accommodations: ['Nyati (Days 1–2)', 'Leisure Apex (Day 3)', 'Cedar Ridge (Day 4)', 'Mili Mingi (Days 5–6)'],
      description: '7-Day Golden Savannah Budget Safari',
      inclusions: ['Pop-up roof 4x4', 'Meals All Included'],
      highlights: ['Amboseli', 'Hell\'s Gate', 'Nakuru', 'Mara'],
      image: 'images/tours/Three giraffes.jpg',
      imagePosition: 'center 72%',
      imageScale: 1.15,
      gallery: ['images/tours/Three giraffes.jpg', 'images/tours/Wildebeest migration.jpg', 'images/tours/Lion and lioness.jpg', 'images/tours/Wildebeest herd crossing the Mara River.jpg', 'images/tours/Watamu_001.jpg', 'images/tours/Diani_Beach_021.jpg']
    },
    {
      id: 'uganda-gorilla-chimp-big5',
      category: 'east-africa',
      country: 'Uganda',
      countryCode: 'UG',
      flag: '🇺🇬',
      destination: '10-Day Gorilla, Chimpanzee & Big 5 Game Safari in Uganda',
      days: 10,
      pricePerPerson: 3180,
      priceMin: 3180,
      priceMax: 3180,
      detailRateMin: 3578,
      detailRateMax: 3578,
      currency: 'USD',
      level: 'Mid-range',
      partyType: 'Private tour',
      accommodationType: 'Lodge & guest house',
      rating: 5.0,
      reviewCount: 138,
      route: ['Entebbe', 'Mabamba Swamp', 'Ziwa Rhino Ranch', 'Murchison Falls NP', 'Kibale NP', 'Kalinzu FR', 'Ishasha Sector', 'Bwindi Impenetrable NP', 'Lake Bunyonyi', 'Lake Mburo NP', 'Entebbe'],
      accommodations: ['Ziwa Rhino and Wildlife Ranch', 'Bamboo Village Safari Lodge', 'Isunga Lodge', 'Irungu Forest Safari Lodge', 'Bwindi and Bunyonyi lodges'],
      description: 'Ultimate wildlife experience, close-up mountain gorillas + chimpanzees + classic Big Five. Explore Murchison Falls, Queen Elizabeth, Bwindi. Track rhinos at Ziwa, cruise Nile + Kazinga Channel, unwind by Lake Bunyonyi.',
      inclusions: ['Gorilla trek', 'Chimp trek', 'Rhino track', 'Boat cruise', 'Game drives', 'All meals included'],
      highlights: ['Mabamba Swamp', 'Ziwa Rhino Ranch', 'Murchison Falls', 'Kibale', 'Queen Elizabeth', 'Bwindi'],
      image: 'images/uganda/Bwindi_Impenetrable_National_Park_024.jpg',
      imageScale: 1.15,
      gallery: ['images/uganda/Bwindi_Impenetrable_National_Park_024.jpg', 'images/uganda/Bwindi_Impenetrable_National_Park_042.jpg', 'images/uganda/Bwindi_Impenetrable_National_Park_053.jpg', 'images/uganda/Murchison_Falls_National_Park_040.jpg', 'images/uganda/Queen_Elizabeth_National_Park_012.jpg', 'images/uganda/Ziwa_Rhino_and_Wildlife_Ranch_001.jpg']
    },
    {
      id: 'botswana-delta-kadizora',
      category: 'east-africa',
      country: 'Botswana',
      countryCode: 'BW',
      flag: '🇧🇼',
      destination: '4-Day Delta Kadizora Safari',
      days: 4,
      pricePerPerson: 2323,
      priceMin: 2323,
      priceMax: 2568,
      detailRateMin: 2555,
      detailRateMax: 2825,
      currency: 'USD',
      level: 'Luxury',
      partyType: 'Shared tour · max 10 per vehicle',
      accommodationType: 'Tented camp',
      rating: 4.9,
      reviewCount: 5577,
      route: ['Maun', 'Okavango Delta', 'Maun Airport'],
      routeDays: ['Maun · Start', 'Okavango Delta · Days 1–3', 'Maun Airport · Day 4'],
      accommodations: ['Kadizora Camp (Days 1–3)'],
      accommodationDetails: [
        { days: 'Days 1–3', name: 'Kadizora Camp', description: 'Luxury tented camp in the Northern Okavango Delta', meals: 'Day 1 dinner; Days 2–3 all meals included' },
        { days: 'Day 4', name: 'End of tour', description: 'Maun Airport', meals: 'Breakfast included' }
      ],
      transport: 'Light aircraft, 4x4 vehicle and mokoro.',
      description: 'Kadizora Camp in the Northern Okavango Delta combines a luxury tented stay with wilderness. Enjoy guided game drives and mokoro rides, gourmet dining, an outdoor boma for stargazing, a swimming pool and time to unwind by the fire pit.',
      inclusions: ['Light aircraft transfers', '4x4 game drives', 'Mokoro rides', 'Boma stargazing', 'Swimming pool', 'Day 1 dinner', 'Days 2–3 all meals', 'Day 4 breakfast'],
      highlights: ['Maun', 'Northern Okavango Delta'],
      gallery: ['images/moremi/Moremi_Game_Reserve_011.jpg', 'images/moremi/Moremi_Game_Reserve_043.jpg', 'images/moremi/Moremi_Game_Reserve_040.jpg', 'images/moremi/Moremi_Game_Reserve_005.jpg', 'images/moremi/Moremi_Game_Reserve_006.jpg', 'images/moremi/Moremi_Game_Reserve_015.jpg'],
      image: 'images/moremi/Moremi_Game_Reserve_011.jpg',
      imageScale: 1.15,
      destinationInfo: { name: 'Okavango Delta', bestTime: 'July to October · Best wildlife viewing', highSeason: 'July to October · Higher rates', bestWeather: 'May to August · Less hot during the day' },
      wildlife: [
        { name: 'Elephant', abundance: 'Common' }, { name: 'Giraffe', abundance: 'Common' },
        { name: 'Buffalo', abundance: 'Common' }, { name: 'Zebra', abundance: 'Common' },
        { name: 'Wildebeest', abundance: 'Common' }, { name: 'Hippo', abundance: 'Common' },
        { name: 'Lion', abundance: 'Present' }, { name: 'Leopard', abundance: 'Present' },
        { name: 'Wild dog', abundance: 'Present' }, { name: 'Crocodile', abundance: 'Present' },
        { name: 'Birdlife', abundance: 'Rich' }
      ]
    },
    {
      id: 'big-five-northern-frontier',
      category: 'east-africa',
      country: 'Kenya',
      countryCode: 'KE',
      flag: '🇰🇪',
      destination: '7-Day Big Five & Northern Frontier',
      days: 7,
      pricePerPerson: 3059,
      currency: 'USD',
      level: 'Mid-range',
      partyType: 'Private tour',
      accommodationType: 'Mid-range lodge',
      rating: 4.9,
      reviewCount: 342,
      route: ['Nairobi', 'Samburu', 'Ol Pejeta', 'Naivasha', 'Mara', 'Nairobi'],
      accommodations: ['Samburu Sopa (Days 1–2)', 'Sweetwaters Serena (Day 3)', 'Naivasha Sopa (Day 4)', 'Mara Maisha (Days 5–6)'],
      description: '7-Day Big Five & Northern Frontier',
      inclusions: ['Pop-up roof 4x4', 'Meals All Included'],
      highlights: ['Samburu', 'Ol Pejeta', 'Naivasha', 'Mara'],
      image: 'images/tours/Diani_Beach_021.jpg',
      imagePosition: 'center 50%',
      imageScale: 1.15,
      gallery: ['images/tours/Diani_Beach_021.jpg', 'images/tours/Watamu_001.jpg', 'images/tours/Three giraffes.jpg', 'images/tours/Wildebeest migration.jpg', 'images/tours/Lion and lioness.jpg', 'images/tours/Wildebeest herd crossing the Mara River.jpg']
    },
    {
      id: 'uganda-affordable-safari',
      category: 'east-africa',
      country: 'Uganda',
      countryCode: 'UG',
      flag: '🇺🇬',
      destination: '7-Day Uganda Affordable Safari with Gorilla and Chimps',
      days: 7,
      pricePerPerson: 2240,
      priceMin: 2240,
      priceMax: 2280,
      detailRateMin: 2520,
      detailRateMax: 2520,
      currency: 'USD',
      level: 'Budget',
      partyType: 'Shared tour (max 4 people per vehicle)',
      accommodationType: 'Lodge & tented bush camp',
      rating: 5.0,
      reviewCount: 59,
      route: ['Kampala', 'Lake Mburo NP', 'Bwindi Impenetrable NP', 'Queen Elizabeth NP', 'Kibale NP', 'Kampala'],
      accommodations: ['Eagle\'s Nest Camp', 'Rushaga Gorilla Havens Lodge', 'Pumba Safari Cottages', 'Kibale Forest Lodge'],
      description: 'Unforgettable safari, Africa\'s majestic primates - gorillas + chimpanzees. Game drives + boat cruises, savannah + aquatic animals. Lake Bunyonyi offers a serene boat experience.',
      inclusions: ['Gorilla trek', 'Chimp trek', 'Game drives', 'Boat cruise', 'All meals included'],
      highlights: ['Lake Mburo', 'Bwindi', 'Queen Elizabeth', 'Kibale'],
      image: 'images/uganda/Ziwa_Rhino_and_Wildlife_Ranch_008.jpg',
      imageScale: 1.15,
      gallery: ['images/uganda/Ziwa_Rhino_and_Wildlife_Ranch_008.jpg', 'images/uganda/Kalinzu_Forest_Reserve_003 (1).jpg', 'images/uganda/Queen_Elizabeth_National_Park_014.jpg', 'images/uganda/Bwindi_Impenetrable_National_Park_055.jpg', 'images/uganda/Murchison_Falls_National_Park_044.jpg', 'images/uganda/Mgahinga_Gorilla_National_Park_015.jpg']
    },
    {
      id: 'botswana-okavango-chobe-mobile',
      category: 'east-africa',
      country: 'Botswana',
      countryCode: 'BW',
      flag: '🇧🇼',
      destination: '10-Day Botswana Okavango and Chobe Mobile Expedition',
      days: 10,
      pricePerPerson: 4050,
      priceMin: 4050,
      priceMax: 4950,
      detailRateMin: 4556,
      detailRateMax: 5569,
      currency: 'USD',
      level: 'Budget',
      partyType: 'Private tour',
      accommodationType: 'Camping',
      rating: 5.0,
      reviewCount: 76,
      route: ['Maun', 'Moremi Game Reserve', 'Khwai Concession', 'Savuti (Chobe National Park)', 'Maun'],
      routeDays: ['Maun · Day 1', 'Moremi Game Reserve · Days 1–3', 'Khwai Concession · Days 4–6', 'Savuti (Chobe National Park) · Days 7–9', 'Maun · Day 10'],
      accommodations: ['Budget camping in Moremi (Days 1–3)', 'Budget camping in Khwai Concession (Days 4–6)', 'Budget camping in Savuti (Days 7–9)'],
      accommodationDetails: [
        { days: 'Days 1–3', name: 'Budget camping', description: 'Inside Moremi Game Reserve (Okavango Delta)', meals: 'All meals included' },
        { days: 'Days 4–6', name: 'Budget camping', description: 'Inside Khwai Concession (Okavango Delta)', meals: 'All meals included' },
        { days: 'Days 7–9', name: 'Budget camping', description: 'Inside Savuti (Chobe National Park)', meals: 'All meals included' },
        { days: 'Day 10', name: 'End of tour', description: 'Maun', meals: 'Breakfast and lunch included' }
      ],
      accommodationNote: 'Additional accommodation before and at the end of the tour can be arranged at extra cost.',
      transport: '4x4 mobile safari vehicle with professional guide.',
      description: 'Nine-night mobile tented safari into Moremi Game Reserve, Khwai Private Concession and the Savuti region of Chobe National Park. Stay in spacious 3m × 3m dome tents with private en-suite bathroom and flushing toilet, accompanied by an experienced professional safari guide.',
      inclusions: ['Mobile 4x4 safari vehicle', 'Professional safari guide', 'En-suite dome tent camping', 'Game drives', 'Guided walks', 'Night drives where permitted', 'Birding', 'All meals during safari'],
      highlights: ['Maun', 'Moremi Game Reserve', 'Khwai Concession', 'Savuti', 'Chobe National Park'],
      gallery: ['images/moremi/Moremi_Game_Reserve_042.jpg', 'images/moremi/Moremi_Game_Reserve_043.jpg', 'images/moremi/Moremi_Game_Reserve_044.jpg', 'images/moremi/Moremi_Game_Reserve_056.jpg', 'images/moremi/Moremi_Game_Reserve_057.jpg', 'images/moremi/Moremi_Game_Reserve_059.jpg'],
      image: 'images/moremi/Moremi_Game_Reserve_006.jpg',
      imageScale: 1.15,
      destinationInfo: { name: 'Moremi, Khwai and Savuti', bestTime: 'July to October · Best wildlife viewing', highSeason: 'July to October · Higher rates', bestWeather: 'May to August · Less hot during the day' },
      wildlife: [
        { name: 'Elephant', abundance: 'Common' }, { name: 'Giraffe', abundance: 'Common' },
        { name: 'Buffalo', abundance: 'Common' }, { name: 'Zebra', abundance: 'Common' },
        { name: 'Wildebeest', abundance: 'Common' }, { name: 'Hippo', abundance: 'Common' },
        { name: 'Lion', abundance: 'Present' }, { name: 'Leopard', abundance: 'Present' },
        { name: 'Wild dog', abundance: 'Present' }, { name: 'Crocodile', abundance: 'Present' },
        { name: 'Birdlife', abundance: 'Rich' }
      ],
      tourFeatures: ['Budget camping', 'Can be customized']
    },
    {
      id: 'bush-and-beach-bliss',
      category: 'east-africa',
      country: 'Kenya',
      countryCode: 'KE',
      flag: '🇰🇪',
      destination: '7-Day Bush and Beach Bliss',
      days: 7,
      pricePerPerson: 3048,
      currency: 'USD',
      level: 'Luxury',
      partyType: 'Private tour',
      accommodationType: 'Beach resort',
      rating: 4.5,
      reviewCount: 176,
      route: ['Nairobi', 'Mara', 'Nakuru', 'Diani', 'Nairobi'],
      accommodations: ['Jambo Mara (Days 1–2)', 'Hillcourt (Day 3)', 'Diani Sea Resort (Days 4–6)'],
      description: '7-Day Bush and Beach Bliss',
      inclusions: ['Pop-up roof 4x4', 'Flight', 'Meals All Included'],
      highlights: ['Mara', 'Nakuru', 'Diani'],
      image: 'images/tours/Diani_Beach_021.jpg',
      imagePosition: 'center 54%',
      imageScale: 1.15,
      gallery: ['images/tours/Diani_Beach_021.jpg', 'images/tours/Watamu_001.jpg', 'images/tours/Three giraffes.jpg', 'images/tours/Wildebeest herd crossing the Mara River.jpg', 'images/tours/Wildebeest migration.jpg', 'images/tours/Lion and lioness.jpg']
    },
    {
      id: 'epic-natures-masterpiece',
      category: 'east-africa',
      country: 'Kenya',
      countryCode: 'KE',
      flag: '🇰🇪',
      destination: '6-Day Epic Nature\'s Masterpiece',
      days: 6,
      pricePerPerson: 2811,
      currency: 'USD',
      level: 'Mid-range',
      partyType: 'Private tour',
      accommodationType: 'Mid-range lodge',
      rating: 4.5,
      reviewCount: 189,
      route: ['Nairobi', 'Amboseli', 'Naivasha', 'Mara', 'Nairobi'],
      accommodations: ['Amboseli Sopa (Days 1–2)', 'Naivasha Sopa (Day 3)', 'Mara Sopa (Days 4–5)'],
      description: '6-Day Epic Nature\'s Masterpiece',
      inclusions: ['Pop-up roof 4x4', 'Meals All Included'],
      highlights: ['Amboseli', 'Naivasha', 'Mara'],
      image: 'images/tours/Wildebeest herd crossing the Mara River.jpg',
      imagePosition: 'center 48%',
      imageScale: 1.15,
      gallery: ['images/tours/Wildebeest herd crossing the Mara River.jpg', 'images/tours/Wildebeest migration.jpg', 'images/tours/Lion and lioness.jpg', 'images/tours/Three giraffes.jpg', 'images/tours/Watamu_001.jpg', 'images/tours/Diani_Beach_021.jpg']
    },
    {
      id: 'amboseli-tsavo-diani',
      category: 'east-africa',
      country: 'Kenya',
      countryCode: 'KE',
      flag: '🇰🇪',
      destination: '7-Day Amboseli, Tsavo and Diani',
      days: 7,
      pricePerPerson: 1999,
      currency: 'USD',
      level: 'Mid-range',
      partyType: 'Private tour',
      accommodationType: 'Safari lodge',
      rating: 4.5,
      reviewCount: 143,
      route: ['Nairobi', 'Amboseli', 'Tsavo West', 'Tsavo East', 'Diani', 'Watamu', 'Nairobi'],
      accommodations: ['Sentrim Amboseli (Days 1–2)', 'Ngulia (Day 3)', 'Sentrim Tsavo (Day 4)', 'Diani Sea Lodge (Days 5–6)'],
      description: '7-Day Amboseli, Tsavo and Diani',
      inclusions: ['Pop-up roof 4x4', 'Meals All Included'],
      highlights: ['Amboseli', 'Tsavo West', 'Tsavo East', 'Diani', 'Watamu'],
      image: 'images/tours/Watamu_001.jpg',
      imagePosition: 'center 50%',
      imageScale: 1.15,
      gallery: ['images/tours/Watamu_001.jpg', 'images/tours/Diani_Beach_021.jpg', 'images/tours/Three giraffes.jpg', 'images/tours/Wildebeest herd crossing the Mara River.jpg', 'images/tours/Wildebeest migration.jpg', 'images/tours/Lion and lioness.jpg']
    },
    {
      id: 'prestigious-amboseli-land-cruiser-day-safari',
      category: 'east-africa',
      country: 'Kenya',
      countryCode: 'KE',
      flag: '🇰🇪',
      destination: '1-Day Amboseli Private Land Cruiser Safari',
      days: 1,
      durationLabel: '1 Day',
      durationType: 'Day tour',
      pricePerPerson: 275,
      currency: 'USD',
      prestigious: true,
      level: 'Day tour',
      partyType: 'Private tour',
      operator: 'Gemfinders Tours and Travel',
      rating: 4.9,
      reviewCount: 100,
      route: ['Nairobi (Start)', 'Amboseli NP', 'Nairobi (End)'],
      description: 'Private day safari from Nairobi in a 4x4 Land Cruiser reserved for your party, with your own driver-guide. Look for elephants and wildlife across plains and wetlands, with views of Mt. Kilimanjaro when weather is clear. Stop for lunch at Ol Tukai Lodge inside the park before continuing the game drive and returning to Nairobi.',
      features: ['Day tour', 'No accommodation', 'Private tour', 'Can start any day', 'Can be customized', 'Suitable for solo travelers', 'Minimum age: 2 years'],
      activities: ['Game drives', 'Pop-up roof 4x4'],
      transfer: 'Transfers from and back to the airport included.',
      image: 'images/premium-packages/amboseli-elephants-crop.jpg',
      imagePosition: 'center',
      imageScale: 1,
      gallery: [
        'images/premium-packages/amboseli-elephants-crop.jpg',
        'images/premium-packages/nairobi-giraffe-crop.jpg',
        'images/premium-packages/masai-mara-migration-crop.jpg',
        'images/premium-packages/nairobi-rhinos-crop.jpg',
        'images/premium-packages/nairobi-skyline-safari-crop.jpg'
      ]
    },
    {
      id: 'prestigious-nairobi-park-giraffe-shopping',
      category: 'east-africa',
      country: 'Kenya',
      countryCode: 'KE',
      flag: '🇰🇪',
      destination: '1-Day National Park Safari, Giraffe Centre & Shopping',
      days: 1,
      durationLabel: '1 Day',
      durationType: 'Day tour',
      pricePerPerson: 166,
      currency: 'USD',
      prestigious: true,
      level: 'Day tour',
      partyType: 'Private tour',
      operator: 'Michoore Tours and Travel',
      rating: 5.0,
      reviewCount: 14,
      route: ['Nairobi (Start)', 'Nairobi NP', 'Nairobi (End)'],
      description: 'Full-day trip to Nairobi National Park, uniquely positioned just 7 km from city skyscrapers. This stronghold for four of the Big Five and more than 400 bird species includes open grass plains and highland dry forests, with an optional visit to the Giraffe Centre and souvenir shopping.',
      features: ['Day tour', 'No accommodation', 'Private tour', 'Can start any day', 'Can be customized', 'Suitable for solo travelers', 'Minimum age: 1 year'],
      activities: ['Game drive', 'Open-sided 4x4', 'Pop-up roof minivan'],
      transfer: 'Transfers from and back to the airport included.',
      image: 'images/premium-packages/nairobi-giraffe-crop.jpg',
      imagePosition: 'center',
      imageScale: 1,
      gallery: [
        'images/premium-packages/amboseli-elephants-crop.jpg',
        'images/premium-packages/nairobi-giraffe-crop.jpg',
        'images/premium-packages/masai-mara-migration-crop.jpg',
        'images/premium-packages/nairobi-rhinos-crop.jpg',
        'images/premium-packages/nairobi-skyline-safari-crop.jpg'
      ]
    },
    {
      id: 'prestigious-masai-mara-day-tour',
      category: 'east-africa',
      country: 'Kenya',
      countryCode: 'KE',
      flag: '🇰🇪',
      destination: '1-Day Tour to Masai Mara National Reserve from Nairobi',
      days: 1,
      durationLabel: '1 Day',
      durationType: 'Day tour',
      pricePerPerson: 332,
      currency: 'USD',
      prestigious: true,
      level: 'Day tour',
      partyType: 'Shared tour (maximum 7 people per vehicle)',
      operator: 'African Beast Tours and Safaris',
      rating: 4.9,
      reviewCount: 119,
      route: ['Nairobi (Start)', 'Masai Mara NR', 'Nairobi (End)'],
      description: 'Full-day tour from Nairobi to Masai Mara National Reserve for a chance to see the Big Five. Travel between July and September for a chance to witness the wildebeest migration. Learn about the ecosystem from your guide and spot wildlife from a pop-up-roof, open-sided 4x4.',
      features: ['Day tour', 'No accommodation', 'Shared tour, maximum 7 people', 'Can start any day', 'Cannot be customized', 'Suitable for solo travelers', 'Minimum age: 2 years'],
      activities: ['Game drive', 'Open-sided 4x4', 'Pop-up roof 4x4', 'Minivan and bus'],
      transfer: 'Transfers from and back to the airport included.',
      image: 'images/premium-packages/masai-mara-migration-crop.jpg',
      imagePosition: 'center',
      imageScale: 1,
      gallery: [
        'images/premium-packages/amboseli-elephants-crop.jpg',
        'images/premium-packages/nairobi-giraffe-crop.jpg',
        'images/premium-packages/masai-mara-migration-crop.jpg',
        'images/premium-packages/nairobi-rhinos-crop.jpg',
        'images/premium-packages/nairobi-skyline-safari-crop.jpg'
      ]
    },
    {
      id: 'prestigious-nairobi-park-half-day',
      category: 'east-africa',
      country: 'Kenya',
      countryCode: 'KE',
      flag: '🇰🇪',
      destination: '1/2-Day Nairobi National Park Exciting Tour',
      days: 0.5,
      durationLabel: 'Half Day',
      durationType: 'Half-day tour',
      pricePerPerson: 115,
      currency: 'USD',
      prestigious: true,
      level: 'Half-day tour',
      partyType: 'Shared tour (maximum 7 people per vehicle)',
      operator: 'Buffalo Steps Adventures',
      rating: 5.0,
      reviewCount: 23,
      route: ['Nairobi (Start)', 'Nairobi NP', 'Nairobi (End)'],
      description: 'Ideal for travelers on a short trip to Nairobi, this wildlife-viewing experience takes place a short distance from Nairobi CBD and can be done in the morning or afternoon. Animals may include lions, leopards, cheetahs, buffaloes, and black and white rhinoceros.',
      features: ['Half-day tour', 'No accommodation', 'Shared tour, maximum 7 people', 'Can start any day', 'Cannot be customized', 'Suitable for solo travelers', 'Minimum age: 3 years'],
      activities: ['Game drive', 'Pop-up roof 4x4', 'Pop-up roof minivan'],
      transfer: 'Airport transfers can be arranged for an extra cost.',
      image: 'images/premium-packages/nairobi-rhinos-crop.jpg',
      imagePosition: 'center',
      imageScale: 1,
      gallery: [
        'images/premium-packages/amboseli-elephants-crop.jpg',
        'images/premium-packages/nairobi-giraffe-crop.jpg',
        'images/premium-packages/masai-mara-migration-crop.jpg',
        'images/premium-packages/nairobi-rhinos-crop.jpg',
        'images/premium-packages/nairobi-skyline-safari-crop.jpg'
      ]
    },
    {
      id: 'prestigious-nairobi-transit-mini-safari',
      category: 'east-africa',
      country: 'Kenya',
      countryCode: 'KE',
      flag: '🇰🇪',
      destination: '1/2-Day Transit Passenger Mini Safari Nairobi',
      days: 0.5,
      durationLabel: 'Half Day',
      durationType: 'Half-day tour',
      pricePerPerson: 135,
      currency: 'USD',
      prestigious: true,
      level: 'Half-day tour',
      partyType: 'Private tour',
      operator: 'Kichaka Tours and Travel',
      rating: 5.0,
      reviewCount: 82,
      route: ['Nairobi (Start)', 'Nairobi NP', 'Nairobi (End)'],
      description: 'Perfect while passing through JKIA airport in Nairobi, this transit mini safari visits Nairobi National Park, the only wildlife park in the heart of a capital city. Enjoy open grass plains and search for black rhinos, lions, leopards, cheetahs, hyenas, buffaloes, and giraffes against views of the city skyline.',
      features: ['Half-day tour', 'Private tour organized exclusively for you', 'Can start any day', 'Suitable for solo travelers', 'Suitable for all ages'],
      activities: ['Game drives', 'Pop-up roof minivan'],
      transfer: 'Transfers from and back to the airport included.',
      image: 'images/premium-packages/nairobi-skyline-safari-crop.jpg',
      imagePosition: 'center',
      imageScale: 1,
      gallery: [
        'images/premium-packages/amboseli-elephants-crop.jpg',
        'images/premium-packages/nairobi-giraffe-crop.jpg',
        'images/premium-packages/masai-mara-migration-crop.jpg',
        'images/premium-packages/nairobi-rhinos-crop.jpg',
        'images/premium-packages/nairobi-skyline-safari-crop.jpg'
      ]
    }
  ],

  dubaiHolidays: [
    { id: 'dubai-pkg1', category: 'dubai-holiday', country: 'UAE', countryCode: 'AE', flag: '🇦🇪', destination: 'Dubai & Abu Dhabi August Holiday', departureDate: '5 Aug', returnDate: '11 Aug', duration: '6 Days / 5 Nights', flights: 'NBO→DXB 07:10–13:15, DXB→NBO 01:20–05:25', hotels: 'Grand Millennium Al Wahda, Al Khoory Sky Garden', pricePerPerson: 1220, currency: 'USD', description: 'Experience Dubai and Abu Dhabi with unforgettable tours, luxury accommodation and exciting adventures. 3 nights Dubai + 2 nights Abu Dhabi with breakfast.', inclusions: ['3 nights Dubai + 2 nights Abu Dhabi with breakfast', 'Tourism dirham', 'Transfers', 'Half-day Dubai city tour', 'Desert safari with BBQ', 'Marina cruise with dinner', 'Abu Dhabi city tour', 'Welcome kit', 'Ferrari World general entry', 'All transfers in 49-seater coach'], pricingOptions: [{ type: 'Persons Sharing', price: 1220 }, { type: 'Single', price: 1440 }, { type: 'Child Without Bed', price: 1100 }, { type: 'Child With Bed', price: 1200 }], lipaPolePole: true, packageImage: 'photorealistic Dubai skyline at night with Burj Khalifa and Palm Jumeirah, luxury resort hotel, UAE flag, golden lights, modern cityscape' },
    { id: 'dubai-pkg2', category: 'dubai-holiday', country: 'UAE', countryCode: 'AE', flag: '🇦🇪', destination: 'Dubai & Abu Dhabi August Holiday', departureDate: '6 Aug', returnDate: '12 Aug', duration: '6 Days / 5 Nights', flights: 'NBO→DXB 07:10–13:15, DXB→NBO 01:20–05:25', hotels: 'Grand Millennium Al Wahda, Hyatt Regency Creek Heights', pricePerPerson: 1320, currency: 'USD', description: 'Experience Dubai and Abu Dhabi with unforgettable tours, luxury accommodation and exciting adventures. Same inclusions as Package 1 with Lotus Marina Cruise.', inclusions: ['3 nights Dubai + 2 nights Abu Dhabi with breakfast', 'Tourism dirham', 'Transfers', 'Half-day Dubai city tour', 'Desert safari with BBQ', 'Lotus Marina Cruise with dinner', 'Abu Dhabi city tour', 'Welcome kit', 'Ferrari World general entry', 'All transfers in 2x35-seater coaches', 'UAE VAT included'], pricingOptions: [{ type: 'Persons Sharing', price: 1320 }, { type: 'Single', price: 1580 }, { type: 'Child Without Bed', price: 1160 }, { type: 'Child With Bed', price: 1310 }], lipaPolePole: true, packageImage: 'photorealistic Dubai Marina with luxury yachts and high-rise buildings, clear blue water, sunset golden light, modern luxury lifestyle' },
    { id: 'dubai-pkg3', category: 'dubai-holiday', country: 'UAE', countryCode: 'AE', flag: '🇦🇪', destination: 'Dubai & Abu Dhabi Adventure', departureDate: '11 Aug', returnDate: '17 Aug', duration: '6 Days / 5 Nights', flights: 'NBO→DXB 22:45–04:50, DXB→NBO 15:55–20:00', hotels: 'Sofitel Abu Dhabi Corniche, DoubleTree by Hilton Dubai Deira', pricePerPerson: 1320, currency: 'USD', description: 'Luxury adventure in Dubai and Abu Dhabi. 2 nights Abu Dhabi + 3 nights Dubai with premium accommodations and exclusive experiences.', inclusions: ['Meet & greet', 'Welcome kit', 'Water provided', '2 nights Abu Dhabi + 3 nights Dubai with breakfast', 'Abu Dhabi city tour', 'Ferrari World', 'Yas Water World', 'Dubai city tour', 'Marina cruise with dinner', 'Desert safari with BBQ', 'Hotel dirham', 'Private coach'], exclusions: ['Quad bike not included'], pricingOptions: [{ type: 'Persons Sharing', price: 1320 }, { type: 'Single', price: 1540 }, { type: 'Child Without Bed', price: 1150 }, { type: 'Child With Bed', price: 1300 }], lipaPolePole: true, packageImage: 'photorealistic Abu Dhabi Emirates Palace, Sheikh Zayed Grand Mosque, modern architecture, desert sand golden light, Arabian luxury travel destination' },
    { id: 'dubai-pkg4', category: 'dubai-holiday', country: 'UAE', countryCode: 'AE', flag: '🇦🇪', destination: 'Dubai School\'s Out — August Adventure', departureDate: '12 Aug', returnDate: '18 Aug', duration: '6 Days / 5 Nights', flights: 'NBO→DXB 06:45–12:50, DXB→NBO 00:55–05:00', hotels: 'Al Khoory Sky Garden Deira', pricePerPerson: 1050, currency: 'USD', description: 'Perfect for families and students. 5 nights in Dubai with breakfast, perfect for school holidays with fun activities and adventures.', inclusions: ['Meet & greet', 'Welcome kit (chocolate, dates, biscuits, juice)', '5 nights accommodation with breakfast', 'Dubai airport transfers', 'Half-day Dubai city tour', 'Marina Dhow Cruise with dinner', 'Desert safari with BBQ', 'Hotel dirham', 'Private 50-seater coach'], exclusions: ['Quad bike not included'], pricingOptions: [{ type: 'Persons Sharing', price: 1050 }, { type: 'Single', price: 1270 }, { type: 'Child Without Bed', price: 950 }, { type: 'Child With Bed', price: 1050 }], lipaPolePole: true, packageImage: 'photorealistic Dubai for families, happy diverse children and families at beach resort, colorful water activities, fun holiday atmosphere, sunny bright day' }
  ]
};

const localTourDayPlans = {
  'enchanting-mara-wild-heart': [
    { route: 'Nairobi → Mara', accommodation: 'Elewana Sand River Masai Mara' },
    { route: 'Mara', accommodation: 'Elewana Sand River Masai Mara' },
    { route: 'Mara → Nairobi' }
  ],
  'epic-natures-masterpiece': [
    { route: 'Nairobi → Amboseli', accommodation: 'Amboseli Sopa' },
    { route: 'Amboseli', accommodation: 'Amboseli Sopa' },
    { route: 'Amboseli → Naivasha', accommodation: 'Naivasha Sopa' },
    { route: 'Naivasha → Mara', accommodation: 'Mara Sopa' },
    { route: 'Mara', accommodation: 'Mara Sopa' },
    { route: 'Mara → Nairobi' }
  ],
  'big-five-northern-frontier': [
    { route: 'Nairobi → Samburu', accommodation: 'Samburu Sopa' },
    { route: 'Samburu', accommodation: 'Samburu Sopa' },
    { route: 'Samburu → Ol Pejeta', accommodation: 'Sweetwaters Serena' },
    { route: 'Ol Pejeta → Naivasha', accommodation: 'Naivasha Sopa' },
    { route: 'Naivasha → Mara', accommodation: 'Mara Maisha' },
    { route: 'Mara', accommodation: 'Mara Maisha' },
    { route: 'Mara → Nairobi' }
  ],
  'bush-and-beach-bliss': [
    { route: 'Nairobi → Mara', accommodation: 'Jambo Mara' },
    { route: 'Mara', accommodation: 'Jambo Mara' },
    { route: 'Mara → Nakuru', accommodation: 'Hillcourt' },
    { route: 'Nakuru → Diani', accommodation: 'Diani Sea Resort' },
    { route: 'Diani', accommodation: 'Diani Sea Resort' },
    { route: 'Diani', accommodation: 'Diani Sea Resort' },
    { route: 'Diani → Nairobi' }
  ],
  'golden-savannah-budget-safari': [
    { route: 'Nairobi → Amboseli', accommodation: 'Nyati' },
    { route: 'Amboseli', accommodation: 'Nyati' },
    { route: 'Amboseli → Hell’s Gate', accommodation: 'Leisure Apex' },
    { route: 'Hell’s Gate → Nakuru', accommodation: 'Cedar Ridge' },
    { route: 'Nakuru → Mara', accommodation: 'Mili Mingi' },
    { route: 'Mara', accommodation: 'Mili Mingi' },
    { route: 'Mara → Nairobi' }
  ],
  'amboseli-tsavo-diani': [
    { route: 'Nairobi → Amboseli', accommodation: 'Sentrim Amboseli' },
    { route: 'Amboseli', accommodation: 'Sentrim Amboseli' },
    { route: 'Amboseli → Tsavo West', accommodation: 'Ngulia' },
    { route: 'Tsavo West → Tsavo East', accommodation: 'Sentrim Tsavo' },
    { route: 'Tsavo East → Diani', accommodation: 'Diani Sea Lodge' },
    { route: 'Diani and Watamu', accommodation: 'Diani Sea Lodge' },
    { route: 'Watamu → Nairobi' }
  ]
};

window.PACKAGES_DATA.eastAfricaTours.forEach(tour => {
  tour.dayPlan = localTourDayPlans[tour.id] || tour.dayPlan || [];
});

const localTourImages = {
  'enchanting-mara-wild-heart': 'images/tour-packages/enchanting-mara-wild-heart.jpg',
  'epic-natures-masterpiece': 'images/tour-packages/epic-natures-masterpiece.jpg',
  'big-five-northern-frontier': 'images/tour-packages/big-five-northern-frontier.jpg',
  'bush-and-beach-bliss': 'images/tour-packages/bush-and-beach-bliss.jpg',
  'golden-savannah-budget-safari': 'images/tour-packages/golden-savannah-budget-safari.jpg',
  'amboseli-tsavo-diani': 'images/tour-packages/amboseli-tsavo-diani.jpg'
};

const kenyaPhotoPaths = (folder, filenames) => filenames.map(filename => `images/${folder}/${filename}`);
const amboseliPhotos = kenyaPhotoPaths('amboseli', [
  'Amboseli_National_Park_013.jpg', 'Amboseli_National_Park_028.jpg', 'Amboseli_National_Park_051.jpg',
  'Amboseli_National_Park_054.jpg', 'Amboseli_National_Park_062.jpg', 'Lake_Naivasha_002.jpg',
  'Lake_Naivasha_005.jpg', 'Lake_Naivasha_013.jpg', 'Masai_Mara_National_Reserve_008.jpg',
  'Masai_Mara_National_Reserve_050.jpg', 'Masai_Mara_National_Reserve_065.jpg',
  'Masai_Mara_National_Reserve_089.jpg', 'Masai_Mara_National_Reserve_102.jpg',
  'Masai_Mara_National_Reserve_111.jpg', 'Masai_Mara_National_Reserve_114.jpg',
  'Masai_Mara_National_Reserve_133.jpg', 'Masai_Mara_National_Reserve_135.jpg'
]);
const hellsGatePhotos = kenyaPhotoPaths('hells-gate', [
  'Amboseli_National_Park_002.jpg', 'Amboseli_National_Park_003.jpg', 'Amboseli_National_Park_004.jpg',
  'Amboseli_National_Park_005.jpg', 'Amboseli_National_Park_006.jpg', 'Amboseli_National_Park_010.jpg',
  'Amboseli_National_Park_011.jpg', 'Amboseli_National_Park_012.jpg', 'Amboseli_National_Park_013.jpg',
  'Amboseli_National_Park_014.jpg', 'Amboseli_National_Park_016.jpg', 'Amboseli_National_Park_018.jpg',
  'Amboseli_National_Park_019.jpg', 'Amboseli_National_Park_020.jpg', 'Amboseli_National_Park_021 (1).jpg',
  'Amboseli_National_Park_021.jpg', 'Amboseli_National_Park_024.jpg', 'Amboseli_National_Park_026.jpg',
  'Amboseli_National_Park_030.jpg', 'Amboseli_National_Park_032.jpg', 'Amboseli_National_Park_033.jpg',
  'Amboseli_National_Park_034.jpg', 'Amboseli_National_Park_037.jpg', 'Amboseli_National_Park_041.jpg',
  'Amboseli_National_Park_042.jpg', 'Amboseli_National_Park_043.jpg', 'Amboseli_National_Park_044.jpg',
  'Amboseli_National_Park_056.jpg', 'Amboseli_National_Park_057.jpg', 'Amboseli_National_Park_058.jpg',
  'Amboseli_National_Park_059.jpg', 'Amboseli_National_Park_061.jpg', 'Amboseli_National_Park_064.jpg',
  'Amboseli_National_Park_066.jpg', 'Lake_Nakuru_National_Park_002.jpg', 'Lake_Nakuru_National_Park_006.jpg',
  'Lake_Nakuru_National_Park_010.jpg', 'Lake_Nakuru_National_Park_013.jpg', 'Lake_Nakuru_National_Park_014.jpg',
  'Lake_Nakuru_National_Park_015.jpg', 'Lake_Nakuru_National_Park_018.jpg', 'Lake_Nakuru_National_Park_019.jpg',
  'Lake_Nakuru_National_Park_020.jpg', 'Lake_Nakuru_National_Park_024.jpg', 'Lake_Nakuru_National_Park_026.jpg',
  'Lake_Nakuru_National_Park_027.jpg', 'Lake_Nakuru_National_Park_028.jpg', 'Lake_Nakuru_National_Park_029.jpg',
  'Lake_Nakuru_National_Park_035.jpg', 'Lake_Nakuru_National_Park_036.jpg'
]);
const tsavoPhotos = kenyaPhotoPaths('tsavo', [
  'Amboseli_National_Park_018.jpg', 'Amboseli_National_Park_037.jpg', 'Amboseli_National_Park_043.jpg',
  'Diani_Beach_021.jpg', 'Diani_Beach_038.jpg', 'Diani_Beach_039.jpg',
  'Masai_Mara_National_Reserve_017.jpg', 'Masai_Mara_National_Reserve_045.jpg',
  'Masai_Mara_National_Reserve_057.jpg', 'Tsavo_East_National_Park_009.jpg',
  'Tsavo_East_National_Park_020.jpg', 'Tsavo_East_National_Park_039.jpg',
  'Tsavo_West_National_Park_003.jpg', 'Tsavo_West_National_Park_005.jpg',
  'Tsavo_West_National_Park_018 (1).jpg', 'Watamu_001.jpg', 'Watamu_003.jpg',
  'Watamu_004.jpg', 'Watamu_005.jpg'
]);
const maraPhotoNames = [
  'Masai_Mara_National_Reserve_008.jpg', 'Masai_Mara_National_Reserve_017.jpg',
  'Masai_Mara_National_Reserve_045.jpg', 'Masai_Mara_National_Reserve_050.jpg',
  'Masai_Mara_National_Reserve_057.jpg', 'Masai_Mara_National_Reserve_065.jpg',
  'Masai_Mara_National_Reserve_089.jpg', 'Masai_Mara_National_Reserve_102.jpg',
  'Masai_Mara_National_Reserve_111.jpg', 'Masai_Mara_National_Reserve_114.jpg',
  'Masai_Mara_National_Reserve_133.jpg', 'Masai_Mara_National_Reserve_135.jpg',
  '681_16107045092365_sand-river-breakfast-table-close-up.jpg',
  '681_16107045096176_sand-river-dining-room-twilight.jpg',
  '681_16107045098307_elewana-sand-river-reception-area.jpg',
  '681_1610704509949_elewana-sand-river-main-area-camp-fire-1.jpg',
  '681_16107045100743_elewana-sand-river-luxury-tent-new-outdoor-shower.jpg',
  '681_16107045100744_elewana-sand-river-luxury-tent-interior-double-1.jpg',
  '681_16107045102037_sand-river-dining-experience-with-view.jpg',
  '681_16107045102129_elewana-sand-river-family-tent.jpg',
  '681_16107045102152_elewana-sand-river-game-drive-at-sunrise.jpg',
  '681_16107045102181_elewana-sand-river-game-drive-.jpg',
  '681_16107045102184_elewana-sand-river-luxury-tent-bathroom.jpg',
  '681_1610704510218_elewana-sand-river-main-area-outside-dining-1.jpg',
  '681_1610704510255_elewana-sand-river-luxury-tent-interior-double.jpg',
  '681_16107045102579_sandriver-1.jpg', '681_16107045103766_elewana-sand-river-family-tent-shower.jpg',
  '681_16107045104716_sandriver-4.jpg', '681_16107045104831_elewana-sand-river-main-area---bar.jpg',
  '681_16107045105005_elewana-sand-river-luxury-tent-new-outdoor-shower-1.jpg',
  '681_1610704510682_elewana-sand-river-luxury-tent-interior-twin.jpg',
  '681_16107045106885_elewana-sand-river-infinity-pool-view.jpg',
  '681_16107045106943_elewana-sand-river-luxury-tent-interior-twin-1.jpg',
  '681_16107045106996_elewana-sand-river-main-area-dining-tent.jpg',
  '681_16107045107156_elewana-sand-river-infinity-pool.jpg',
  '681_16107045107497_elewana-sand-river-private-dining-by-camp-fire.jpg',
  '681_16107045107992_elewana-sand-river-main-area-1.jpg',
  '681_16107045108008_elewana-sand-river-main-area-outside-dining.jpg',
  '681_16107045108071_elewana-sand-river-main-area-camp-fire.jpg',
  '681_16107045108194_elewana-sand-river-luxury-tent-exterior (1).jpg'
];
const maraPhotos = kenyaPhotoPaths('mara', maraPhotoNames);
const localTourGalleries = {
  'enchanting-mara-wild-heart': maraPhotos,
  'epic-natures-masterpiece': [...amboseliPhotos, ...maraPhotos],
  'big-five-northern-frontier': [...amboseliPhotos, ...maraPhotos],
  'bush-and-beach-bliss': [...maraPhotos, ...tsavoPhotos],
  'golden-savannah-budget-safari': [...hellsGatePhotos, ...amboseliPhotos, ...maraPhotos],
  'amboseli-tsavo-diani': [...amboseliPhotos, ...tsavoPhotos]
};

window.PACKAGES_DATA.eastAfricaTours.forEach(tour => {
  tour.image = localTourImages[tour.id] || tour.image || '';
  tour.imageScale = localTourImages[tour.id] ? 1 : tour.imageScale || 1;
  tour.gallery = localTourGalleries[tour.id] || tour.gallery || [];
});

(function fillInferredRequirements() {
  const pkg = window.PACKAGES_DATA;
  pkg.workVisas.forEach(w => {
    if (!w.requirements.includes('sponsorshipLetter') && (w.countryCode === 'DE' || w.countryCode === 'CZ' || w.countryCode === 'PT' || w.countryCode === 'EE' || w.countryCode === 'SK' || w.countryCode === 'PL')) {
      w.requirements.push('sponsorshipLetter');
    }
  });
  pkg.studyVisas.forEach(s => {
    if (s._blockedAccountNote && !s.requirements.includes('proofOfFunds')) {
      s.requirements.push('proofOfFunds');
    }
  });
})();
