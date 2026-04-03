// Mobile menu toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Nav solidify on scroll
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
    nav.style.background = window.scrollY > 80
        ? 'rgba(60, 52, 47, 0.98)'
        : 'rgba(60, 52, 47, 0.92)';
});

// Photo strip: duplicate images for seamless loop
const photoTrack = document.querySelector('.photo-strip-track');
if (photoTrack) {
    const images = photoTrack.innerHTML;
    photoTrack.innerHTML = images + images;
}

// Poster Archive
const posterUrls = [
    "0312-TSR-poster-02LR.jpg",
    "060918-New-Rave-TV-IG02.png",
    "10452853_10152178849396860_7268235506848620832_oSFW.jpg",
    "12-og.jpg",
    "13240560_1088076404599094_2301026323603676212_n.14632053_std.jpg",
    "13323301_1322233577805931_3729043234621316847_o.jpg",
    "13394189_1722395898041047_6217652610010658539_n.jpg",
    "20130509-173945-163700.jpg",
    "20130531-122111-907197.jpg",
    "20160531-143653-216884.jpg",
    "20170609HSH.jpg",
    "29791876_1639505809465404_3947465293126696960_o.jpg",
    "30624235_1631421410239862_3880254110120804352_n.jpg",
    "30657201_793268690870932_5196154513915904000_n.jpg",
    "30706514_10211602158544944_4116123088268034048_n.jpg",
    "30709657_2066188193654053_2115499026546688000_n.jpg",
    "30727419_10211602191345764_4921618370404548608_o.jpg",
    "31225651_1647361461979190_8868892374277816320_n.jpg",
    "31265335_10155481740607717_7175107434639629284_n.jpg",
    "31394835_446540012446908_7810013572368433152_n.jpg",
    "31493423_1664543910294927_1235373752724750336_n.jpg",
    "31646822_1217722431696645_1221557706923507352_n.jpg",
    "31673347_2098535636886750_1173178344196276224_n.jpg",
    "31950362_10155570018241453_6389550222657191936_n.jpg",
    "31958406_1659023674146302_5892190823642038272_n.jpg",
    "31959826_2115054641842477_3924424069188943872_n.jpg",
    "32105366_1635368773183464_2104529894821068800_n.jpg",
    "32116537_1683999614987567_7709898640612917248_n.jpg",
    "32130480_1776221929090775_5224139163606974464_n.jpg",
    "32169375_1731046470275455_220588841717727232_n.jpg",
    "32169616_1731051673608268_6204926002557091840_n.jpg",
    "32258036_1543693522425788_9109430763559845888_n.jpg",
    "32294122_10160658937970227_2459015226754859008_n.jpg",
    "32336943_2406061589422650_4165806934940712960_n.jpg",
    "32453879_2170542086565621_4020624438901866496_n.jpg",
    "32525948_2068354216740726_7651900776637267968_n.jpg",
    "32737789_2101377186855798_3579235717953355776_n.jpg",
    "32764686_1005263769637920_7208364666530037760_n.jpg",
    "32796144_1642560755792879_6876124078323793920_n.jpg",
    "32928237_1681740221908629_1347424965531533312_n.jpg",
    "33378163_10215180638686434_5926877666719301632_n.jpg",
    "33383678_1686687451413906_3386259293996056576_n.jpg",
    "33421555_2075934025753357_2293964224889618432_n.jpg",
    "33426019_10213733475204670_6139445077191163904_n.jpg",
    "33849797_2081278248552268_6189518700735889408_n.jpg",
    "33894460_1749982251756787_6388539268960092160_n.jpg",
    "34035988_10155248235007047_8761845704608972800_n.jpg",
    "34062994_1682830725098930_5236315627819368448_n.jpg",
    "3611230588_1561910f70.jpg",
    "400_blog.jpg",
    "43-og.jpg",
    "479451c6bbcd37aae42b31a1f0351faa--event-posters-concert-posters.jpg",
    "506f216c32097e46dc61ca9ffecf4e59--low-life-brooklyn.jpg",
    "5366-e8f2-48c6-88c1-bbb32a8c942a.jpg",
    "6a0133f3b98a81970b01a73ddd856a970d-300wi.jpg",
    "6a0133f3b98a81970b01a73ddd856a970d.jpg",
    "79-og.jpg",
    "9-13_aq_cover_-_the_hollow.jpg",
    "93-og.jpg",
    "94-og.jpg",
    "980x.png",
    "AD_Northside_2017_Final_Med-785x1016.jpg",
    "aldousharding-copy-2.jpg",
    "aldousharding-copy-2+(1).jpg",
    "b4db342a085b4ebd976b4c54bfe7b880.png",
    "beertree3-690x1024.jpg",
    "Bella+Union+Northside+2015.jpg",
    "BestCoast_TourPoster_11x17_800.png",
    "BowlTrain-640x433+(1).png",
    "brooklyn-street-art-northside-open-studios.jpg",
    "BTRNORTHSIDE2018-v4.png",
    "cantorabowlpostersmall-580.jpg",
    "ccm-northside-01.png",
    "ccm-northside-02.png",
    "ccm-northside-02+(1).png",
    "ccm-northside-03+(1).png",
    "cde314c747fd6f61837ab1d8331a3298.jpg",
    "dam-funk-rub.jpg",
    "DB91xTmXYAAfp2s.jpg",
    "DCDnfeuVoAALYHY.jpg",
    "DedKmuIXUAAaQ3S.jpg",
    "Deeic0YXUAg0K_z.jpg",
    "deli-flyer-chris-oneal.jpg",
    "dirty-projectors-northside-show.jpg",
    "download.jpg",
    "download.png",
    "download+(1).jpg",
    "e0b98b77-485a-421c-b4d2-19dcadc4508c.jpg",
    "e9d2ec3c9832de93bff52f8a7c514843.jpg",
    "file+(2).jpg",
    "file+(3).jpg",
    "file+(4).jpg",
    "GBV-GP.jpg",
    "goydates2016.jpg",
    "GreenpointersSupercrushNorthsideShowcase.jpg",
    "HNSF-flier-image-232x300.png",
    "Huge-Northside_Flyer_party_2016.gif",
    "IARC_Summer2018Showcase.jpg",
    "iceage-prurient-stereogum-s.jpg",
    "Issue6_NorthsideParty_TomTom.jpg",
    "KanineRecords_northside_flier2015_800_V03_pw.gif",
    "LMA_Northside+Poster+2015-3.jpg",
    "miguel_showannouncement_social.png",
    "newsb.png",
    "NMF_2013_Poster_WEB.jpg",
    "northside_fb.png",
    "northside_final_11x17.jpg",
    "Northside_of_Eden_Fest_NYC-480x661.jpg",
    "Northside_POSTERR.png",
    "northside-2011.jpg",
    "northside-2011+(1).jpg",
    "northside-festival-app-300.jpg",
    "Northside-Festival-Brooklyn-2015-Poster.jpg",
    "northside-initial-lineup.jpg",
    "northside-music-fest-1024x1024.jpg",
    "northside.jpg",
    "northside+(2).png",
    "Northside15Flyer_700.jpg",
    "northside2.jpg",
    "northside2014.jpg",
    "northsidefest.jpg",
    "northsideflyer1200x1600600.jpg",
    "northsideMSL_710.jpg",
    "northsideposter+(1).jpg",
    "northsideposter+(1)+(1).jpg",
    "northsideposter1.jpg",
    "northsidepostersmall.jpg",
    "ns-posterD1.jpg",
    "ns-posterD1+(1).jpg",
    "NS15_POSTER_East_River_Ferry4-660x1037.jpg",
    "NS18_LizPhair_draft2.png",
    "NS18_Music_DearNora_Social.jpg",
    "NS18_Music_SingleShowPromos_TopazJones.jpg",
    "original.png",
    "PitchforkNorthside_Instagram.jpg",
    "Poster-Unit-J.jpg",
    "R_NF_G.001-1800x1800.jpeg",
    "redbullcreation_poster_final_sm.jpg",
    "rtjsbnp.jpg",
    "SA_ITWF_RELEASE_FLYER.jpg",
    "Shamir_Orville.JPG",
    "sheaposter.jpg",
    "Stonefield-north-american-tour-2016.jpg",
    "surferblood-GP.jpg",
    "The-Toaster-6.15.13.jpg",
    "The-Toaster-6.15.13+(1).jpg",
    "tumblr_lmqmdg6LCU1qggrox.jpg",
    "tumblr_n4g2l46Dbp1sfi8q7o1_1280.jpg",
    "tumblr_n5u7vuvo8J1s54spqo1_1280.jpg",
    "tumblr_nna19yIwBV1qco1x4o1_500.jpg",
    "tumblr_oobgb6RMLc1ub7t59o1_1280_670.jpg",
    "twoarms_northside_03.jpg",
    "unnamed-1.jpg",
    "unnamed-1+copy.jpg",
    "unnamed.jpg",
    "unnamed+(1).jpg",
    "unnamed+copy.jpg",
    "unnamed3.jpg",
    "us-0611-102276-front.jpg",
    "us-0612-103095-front.jpg",
    "us-0612-103095-front+(1).jpg",
    "us-0612-723819-0-back.jpg",
    "us-0613-603314-front.jpg",
    "us-0614-375730-front.jpg",
    "us-0615-372355-front.jpg",
    "us-0625-174384-front.jpg",
    "Watain-6.15.14.jpg",
    "what-cheer.jpeg"
];

const posterWall = document.getElementById('poster-wall');

// Shuffle posters for variety
function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// Build poster wall
const shuffled = shuffle([...posterUrls]);
shuffled.forEach(path => {
    const img = document.createElement('img');
    img.src = "images/posters/" + path;
    img.alt = "Northside Festival show poster";
    img.loading = "lazy";
    img.addEventListener('click', () => openLightbox(img.src));
    posterWall.appendChild(img);
});

// Year by Year toggles
document.querySelectorAll('.year-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
        const target = document.getElementById(btn.dataset.target);
        const isOpen = target.classList.toggle('open');
        btn.classList.toggle('active');
        btn.textContent = isOpen ? 'Close' : 'Year by Year';
    });
});

// Poster toggle
const posterWrapper = document.getElementById('poster-wall-wrapper');
const posterToggleBtn = document.getElementById('poster-toggle-btn');

posterToggleBtn.addEventListener('click', () => {
    const expanded = posterWrapper.classList.toggle('expanded');
    posterToggleBtn.textContent = expanded ? 'Show Less' : 'Show All 168 Posters';
    if (!expanded) {
        posterWrapper.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
});

// Lightbox
const lightbox = document.createElement('div');
lightbox.className = 'lightbox';
lightbox.innerHTML = '<span class="lightbox-close">&times;</span><img src="" alt="Poster">';
document.body.appendChild(lightbox);

const lightboxImg = lightbox.querySelector('img');
const lightboxClose = lightbox.querySelector('.lightbox-close');

function openLightbox(src) {
    lightboxImg.src = src;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

lightbox.addEventListener('click', closeLightbox);
lightboxClose.addEventListener('click', closeLightbox);
lightboxImg.addEventListener('click', e => e.stopPropagation());

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeLightbox();
});

// Photo Library
const libraryPhotos = [
    "images/festival/NSide16_Music_06102016_GrandmasterFlash_McCarrenPark_ColeGiordano-701039.jpg",
    "images/festival/04_nside2016_hinds_mccarrenpark_stephanieaugello.jpg",
    "images/festival/15_nside2016_brianwilson_mccarrenpark_stephanieaugello.jpg",
    "images/festival/20160609_BM_SweetCrude_BrooklynBowl_EbruYildiz_12.jpg",
    "images/festival/bkmag_nside_kelseymitchell_30.jpg",
    "images/festival/bkmag_nside_kelseymitchell_38.jpg",
    "images/festival/bkmag_nside_sunflowerbean_kelseymitchell_72.jpg",
    "images/festival/Friday-+The+Very+Best+at+McCarren+Park.jpg",
    "images/festival/ft_vLgbmTsmHVClCohTuRbggLfXloq_IknKVVTKRLLQ.jpeg",
    "images/festival/IMG_1855.jpg",
    "images/festival/IMG_9661.jpg",
    "images/festival/Northside+Saturday+-+lg-224.jpg",
    "images/festival/NSide16_Music_06092016_Subhumans_StVitus_ColeGiordano-701342.jpg",
    "images/festival/NSide16_Music_06102016_GrandmasterFlash_McCarrenPark_ColeGiordano-701260.jpg",
    "images/festival/NSide2016_Innovation_june8th2016_Dylan+Johnson-25.JPG",
    "images/festival/NSide2016_Innovation_june8th2016_Dylan+Johnson-33.JPG",
    "images/festival/nside2016_music_06092016_mccarren_wolfparade_020.jpg",
    "images/festival/NSide2016_Music_Babys+All+Right_Diet+Cig_Childbirth_Collen-Green_june9th2016_Dylan-Johnson-14.JPG",
    "images/festival/NSide2016_Music_Babys+All+Right_Diet+Cig_Childbirth_Collen-Green_june9th2016_Dylan-Johnson-29.JPG",
    "images/festival/NSide2016_Music_Grandmaster+Flash_june9th2016_Dylan-Johnson-1.JPG",
    "images/festival/NSide2016_Music_Grandmaster+Flash_june9th2016_Dylan-Johnson-27.JPG",
    "images/festival/NSide2016_Music_Palisades_Two+Inch+Astronaut-The+World+is+a+Beautiful+Place+and+I+am+Ready+to+Die+_june9th2016_Dylan-Johnson-13.JPG",
    "images/festival/NSide2016_Shea+Stadium_Drella-Sharkmuffin_Aye+Nako_Childbirth_june8th2016_Dylan+Johnson-31.JPG",
    "images/festival/W7kgXt3Ux8Wh6k_tfvdDp79Snwy8Wa6xj-K0GgBaRk4.jpeg",
    "images/festival/8472wolfenson.JPG",
    "images/festival/0124volo.jpg",
    "images/summerscreen/bkmag_summerscreen_7_13_kelseymitchell22+(1).JPG",
    "images/summerscreen/bkmag_summerscreen_7_13_kelseymitchell40+(1).JPG",
    "images/summerscreen/bkmag_summerscreen_7-6-16_kelseymitchell_28.JPG",
    "images/summerscreen/IMG_6916.JPG",
    "images/summerscreen/IMG_7013.JPG",
    "images/summerscreen/IMG_7329.jpg",
    "images/summerscreen/IMG_7412+(1).jpg",
    "images/summerscreen/IMG_7434.jpg",
    "images/summerscreen/SS_Photo02.jpg",
    "images/summerscreen/Summerscreen+-+Brooklyn+Mag+-+Crowd+Shots+(43+of+46).jpg",
    "images/summerscreen/Summerscreen+-+Brooklyn+Mag+(62+of+81).jpg",
    "images/taste-talks/-7.jpg",
    "images/taste-talks/-7.8.jpg",
    "images/taste-talks/14937122924_ff17ae7386_o.jpg",
    "images/taste-talks/IMG_1735.jpg",
    "images/taste-talks/insta+(116).jpg",
    "images/taste-talks/insta+(182).jpg",
    "images/taste-talks/Taste+Talk+-+Dylan+Johnson-56.jpg",
    "images/taste-talks/Taste+Talks+BBQ+-+print-1.JPG",
    "images/taste-talks/Taste+Talks+BBQ+-+print-15.JPG",
    "images/taste-talks/Taste+Talks+BBQ+-+print-27.JPG",
    "images/taste-talks/Taste+Talks+BBQ+-+print-33.JPG",
    "images/taste-talks/TasteTalks2015_9-12_Kinfolk+90_La+Brea+Food+Truck_Max+Branigan_032.jpg",
    "images/taste-talks/TT_MotherofPearl_LizClayman_091215_002.jpg",
    "images/taste-talks/TT_MotherofPearl_LizClayman_091215_011.jpg",
    "images/taste-talks/TT_MotherofPearl_LizClayman_091215_035.jpg",
    "images/taste-talks/TT_MotherofPearl_LizClayman_091215_203.jpg",
    "images/creative/0054volo.jpg",
    "images/creative/0119volo.jpg",
    "images/creative/0202volo.jpg",
    "images/creative/0211volo.jpg",
    "images/creative/1.jpg",
    "images/creative/18-1.jpg",
    "images/creative/2.jpg",
    "images/creative/6-1.jpg",
    "images/creative/6.jpg",
    "images/creative/7.jpg",
    "images/creative/8.jpg",
    "images/creative/9145wolfenson.JPG",
    "images/creative/9354wolfenson.JPG",
    "images/creative/brianwilson_janebruce.jpg",
    "images/creative/Northside-Bleached-small-3.jpg",
    "images/creative/Northside-Bleached-small-44.jpg",
    "images/creative/NS_web_images2.png",
    "images/creative/NS_web_images4.png",
    "images/creative/NS_web_images6.png",
    "images/history/history-2014-expansion.jpeg",
    "images/history/history-bam-partnership.jpeg",
    "images/history/history-festival-2009.jpeg",
    "images/history/history-summerscreen.png",
    "images/history/Screen+Shot+2014-03-07+at+11.43.14+PM.png",
    "images/people/131109_Alex_0373.jpg",
    "images/people/Daniel-Stedman-Northside-New-York-Times-Arts-Cover.png",
    "images/people/Scott.JPG"
];

const photoLibraryWall = document.getElementById('photo-library-wall');
if (photoLibraryWall) {
    const shuffledPhotos = shuffle([...libraryPhotos]);
    shuffledPhotos.forEach(src => {
        const img = document.createElement('img');
        img.src = src;
        img.alt = "Northside Media";
        img.loading = "lazy";
        img.addEventListener('click', () => openLightbox(img.src));
        photoLibraryWall.appendChild(img);
    });
}

// Photo library toggle
const photoLibWrapper = document.getElementById('photo-library-wrapper');
const photoLibToggle = document.getElementById('photo-library-toggle');
if (photoLibToggle) {
    photoLibToggle.addEventListener('click', () => {
        const expanded = photoLibWrapper.classList.toggle('expanded');
        photoLibToggle.textContent = expanded ? 'Show Less' : 'Show All Photos';
        if (!expanded) {
            photoLibWrapper.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
}

// Cover Viewer
const coverSrcs = [
    "images/bkmag/BK12_00+COVER.jpg",
    "images/bkmag/Solange-Brooklyn-Magazine-Cover.png",
    "images/bkmag/Emily-Cover.jpg",
    "images/bkmag/Olivia-Cover.png",
    "images/bkmag/Theophilus-Cover.png",
    "images/bkmag/Alek-Wek.png",
    "images/bkmag/cover_J.jpg",
    "images/bkmag/cover.jpg"
];

const coverViewer = document.getElementById('cover-viewer');
const coverViewerImg = document.getElementById('cover-viewer-img');
const coverViewerClose = document.getElementById('cover-viewer-close');
const coverViewerPrev = document.getElementById('cover-viewer-prev');
const coverViewerNext = document.getElementById('cover-viewer-next');
let currentCoverIndex = 0;

if (coverViewer) {
    // Click cover to open viewer
    document.querySelectorAll('.covers-track img').forEach(img => {
        img.addEventListener('click', () => {
            currentCoverIndex = parseInt(img.dataset.index) || 0;
            coverViewerImg.src = coverSrcs[currentCoverIndex];
            coverViewer.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Navigation
    coverViewerPrev.addEventListener('click', (e) => {
        e.stopPropagation();
        currentCoverIndex = (currentCoverIndex - 1 + coverSrcs.length) % coverSrcs.length;
        coverViewerImg.src = coverSrcs[currentCoverIndex];
    });

    coverViewerNext.addEventListener('click', (e) => {
        e.stopPropagation();
        currentCoverIndex = (currentCoverIndex + 1) % coverSrcs.length;
        coverViewerImg.src = coverSrcs[currentCoverIndex];
    });

    // Close
    function closeCoverViewer() {
        coverViewer.classList.remove('active');
        document.body.style.overflow = '';
    }

    coverViewerClose.addEventListener('click', closeCoverViewer);
    coverViewer.addEventListener('click', (e) => {
        if (e.target === coverViewer) closeCoverViewer();
    });

    // Keyboard nav
    document.addEventListener('keydown', (e) => {
        if (!coverViewer.classList.contains('active')) return;
        if (e.key === 'Escape') closeCoverViewer();
        if (e.key === 'ArrowLeft') coverViewerPrev.click();
        if (e.key === 'ArrowRight') coverViewerNext.click();
    });
}

// Scroll-triggered fade-in
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.brand-item, .brand-detail, .timeline-item, .press-quote, .stat, .service').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// Stagger animations
document.querySelectorAll('.brand-item').forEach((el, i) => { el.style.transitionDelay = `${i * 0.06}s`; });
document.querySelectorAll('.press-quote').forEach((el, i) => { el.style.transitionDelay = `${i * 0.1}s`; });
document.querySelectorAll('.timeline-item').forEach((el, i) => { el.style.transitionDelay = `${i * 0.08}s`; });
document.querySelectorAll('.stat').forEach((el, i) => { el.style.transitionDelay = `${i * 0.1}s`; });

// Animation styles
const style = document.createElement('style');
style.textContent = `
    .fade-in { opacity: 0; transform: translateY(16px); transition: opacity 0.5s ease, transform 0.5s ease; }
    .fade-in.visible { opacity: 1; transform: translateY(0); }
`;
document.head.appendChild(style);
