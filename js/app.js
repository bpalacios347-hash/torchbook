/* ================================================
   TORCHBOOK — Main Application Logic
   Bible Study & Sermon Notebook App (v5.0)
   ================================================ */

(function () {
    'use strict';

    // ---- Configuration ----
    const BIBLE_VERSIONS = {
        es_rvr: { file: 'data/bibles/es_rvr.json', name: 'Reina Valera 1960 (RVR1960)', lang: 'es' },
        es_nvi: { file: 'data/bibles/es_nvi.json', name: 'Nueva Versión Internacional (NVI)', lang: 'es' },
        es_ntv: { file: 'data/bibles/es_ntv.json', name: 'Nueva Traducción Viviente (NTV)', lang: 'es' },
        es_lbla: { file: 'data/bibles/es_lbla.json', name: 'La Biblia de las Américas (LBLA)', lang: 'es' },
        es_dhh: { file: 'data/bibles/es_dhh.json', name: 'Dios Habla Hoy (DHH)', lang: 'es' },
        es_tla: { file: 'data/bibles/es_tla.json', name: 'Traducción en Lenguaje Actual (TLA)', lang: 'es' },
        es_rva: { file: 'data/bibles/es_rva.json', name: 'Reina Valera Actualizada 2015 (RVA)', lang: 'es' },
        en_kjv: { file: 'data/bibles/en_kjv.json', name: 'King James Version', lang: 'en' },
        en_bbe: { file: 'data/bibles/en_bbe.json', name: 'Basic English Bible', lang: 'en' },
        pt_nvi: { file: 'data/bibles/pt_nvi.json', name: 'Nova Versão Internacional', lang: 'pt' },
        fr_apee: { file: 'data/bibles/fr_apee.json', name: 'Bible de l\'Épée 1805', lang: 'fr' },
        de_schlachter: { file: 'data/bibles/de_schlachter.json', name: 'Schlachter Bibel 1951', lang: 'de' },
    };

    const OLD_TESTAMENT_COUNT = 39;

    const CANONICAL_BOOK_NAMES = [
        "Génesis", "Éxodo", "Levítico", "Números", "Deuteronomio", "Josué", "Jueces", "Rut",
        "1 Samuel", "2 Samuel", "1 Reyes", "2 Reyes", "1 Crónicas", "2 Crónicas", "Esdras", "Nehemías",
        "Ester", "Job", "Salmos", "Proverbios", "Eclesiastés", "Cantares", "Isaías", "Jeremías",
        "Lamentaciones", "Ezequiel", "Daniel", "Oseas", "Joel", "Amós", "Abdías", "Jonás",
        "Miqueas", "Nahúm", "Habacuc", "Sofonías", "Hageo", "Zacarías", "Malaquías",
        "Mateo", "Marcos", "Lucas", "Juan", "Hechos", "Romanos", "1 Corintios",
        "2 Corintios", "Gálatas", "Efesios", "Filipenses", "Colosenses", "1 Tesalonicenses", "2 Tesalonicenses",
        "1 Timoteo", "2 Timoteo", "Tito", "Filemón", "Hebreos", "Santiago", "1 Pedro",
        "2 Pedro", "1 Juan", "2 Juan", "3 Juan", "Judas", "Apocalipsis"
    ];

    const BOOK_NAMES_ES = {
        'genesis': 0, 'gn': 0, 'gen': 0, 'gé': 0, 'ge': 0, 'génesis': 0,
        'exodo': 1, 'ex': 1, 'éxodo': 1,
        'levitico': 2, 'lv': 2, 'lev': 2, 'levítico': 2,
        'numeros': 3, 'nm': 3, 'num': 3, 'números': 3,
        'deuteronomio': 4, 'dt': 4, 'deut': 4,
        'josue': 5, 'jos': 5, 'josué': 5,
        'jueces': 6, 'jue': 6, 'jc': 6,
        'rut': 7, 'rt': 7,
        '1 samuel': 8, '1samuel': 8, '1sam': 8, '1 sam': 8, '1s': 8,
        '2 samuel': 9, '2samuel': 9, '2sam': 9, '2 sam': 9, '2s': 9,
        '1 reyes': 10, '1reyes': 10, '1re': 10, '1 re': 10, '1r': 10,
        '2 reyes': 11, '2reyes': 11, '2re': 11, '2 re': 11, '2r': 11,
        '1 cronicas': 12, '1cronicas': 12, '1cro': 12, '1 cro': 12, '1 crónicas': 12,
        '2 cronicas': 13, '2cronicas': 13, '2cro': 13, '2 cro': 13, '2 crónicas': 13,
        'esdras': 14, 'esd': 14,
        'nehemias': 15, 'neh': 15, 'nehemías': 15,
        'ester': 16, 'est': 16,
        'job': 17,
        'salmos': 18, 'sal': 18, 'salmo': 18, 'sl': 18, 'ps': 18,
        'proverbios': 19, 'pr': 19, 'prov': 19,
        'eclesiastes': 20, 'ec': 20, 'ecl': 20, 'eclesiastés': 20,
        'cantares': 21, 'cnt': 21, 'cantar': 21, 'cantar de los cantares': 21,
        'isaias': 22, 'is': 22, 'isa': 22, 'isaías': 22,
        'jeremias': 23, 'jer': 23, 'jeremías': 23,
        'lamentaciones': 24, 'lm': 24, 'lam': 24,
        'ezequiel': 25, 'ez': 25, 'eze': 25,
        'daniel': 26, 'dn': 26, 'dan': 26,
        'oseas': 27, 'os': 27,
        'joel': 28, 'jl': 28,
        'amos': 29, 'am': 29, 'amós': 29,
        'abdias': 30, 'abd': 30, 'abdías': 30,
        'jonas': 31, 'jon': 31, 'jonás': 31,
        'miqueas': 32, 'mi': 32, 'miq': 32,
        'nahum': 33, 'nah': 33, 'na': 33, 'nahúm': 33,
        'habacuc': 34, 'hab': 34,
        'sofonias': 35, 'sof': 35, 'sofonías': 35,
        'hageo': 36, 'hag': 36,
        'zacarias': 37, 'zac': 37, 'zacarías': 37,
        'malaquias': 38, 'mal': 38, 'malaquías': 38,
        'mateo': 39, 'mt': 39, 'mat': 39, 's. mateo': 39,
        'marcos': 40, 'mr': 40, 'mc': 40, 'mar': 40, 's. marcos': 40,
        'lucas': 41, 'lc': 41, 'luc': 41, 's. lucas': 41,
        'juan': 42, 'jn': 42, 's. juan': 42, 's.juan': 42,
        'hechos': 43, 'hch': 43, 'hec': 43,
        'romanos': 44, 'ro': 44, 'rom': 44,
        '1 corintios': 45, '1corintios': 45, '1cor': 45, '1 cor': 45, '1co': 45,
        '2 corintios': 46, '2corintios': 46, '2cor': 46, '2 cor': 46, '2co': 46,
        'galatas': 47, 'ga': 47, 'gal': 47, 'gálatas': 47,
        'efesios': 48, 'ef': 48,
        'filipenses': 49, 'fil': 49, 'flp': 49,
        'colosenses': 50, 'col': 50,
        '1 tesalonicenses': 51, '1tesalonicenses': 51, '1tes': 51, '1 ts': 51,
        '2 tesalonicenses': 52, '2tesalonicenses': 52, '2tes': 52, '2 ts': 52,
        '1 timoteo': 53, '1timoteo': 53, '1tim': 53, '1 ti': 53,
        '2 timoteo': 54, '2timoteo': 54, '2tim': 54, '2 ti': 54,
        'tito': 55, 'tit': 55,
        'filemon': 56, 'flm': 56, 'filemón': 56,
        'hebreos': 57, 'he': 57, 'heb': 57,
        'santiago': 58, 'stg': 58, 'sant': 58,
        '1 pedro': 59, '1pedro': 59, '1pe': 59, '1p': 59,
        '2 pedro': 60, '2pedro': 60, '2pe': 60, '2p': 60,
        '1 juan': 61, '1juan': 61, '1jn': 61,
        '2 juan': 62, '2juan': 62, '2jn': 62,
        '3 juan': 63, '3juan': 63, '3jn': 63,
        'judas': 64, 'jud': 64,
        'apocalipsis': 65, 'ap': 65, 'apoc': 65,
    };

    // ---- Theological Dictionary Dataset ----
    const DICTIONARY_TERMS = [
        { term: "Ágape", origin: "Griego (ἀγάπη)", def: "Amor incondicional, abnegado y supremo de Dios hacia la humanidad, expresado plenamente en Cristo (Juan 3:16, 1 Corintios 13)." },
        { term: "Gracia", origin: "Hebreo (חֵן / Chen) y Griego (χάρις / Charis)", def: "Favor inmerecido otorgado por Dios al ser humano para salvación y fortalecimiento, sin depender de las obras humanas (Efesios 2:8-9)." },
        { term: "Justificación", origin: "Griego (δικαίωσις / Dikaiosis)", def: "Acto judicial de Dios mediante el cual declara justo al pecador sobre la base de la fe en la obra redentora de Jesucristo (Romanos 5:1)." },
        { term: "Shalom", origin: "Hebreo (שָׁלוֹם)", def: "Paz integral, plenitud, bienestar, armonía y salud que proviene del pacto con Dios; no es solo la ausencia de conflicto." },
        { term: "Fe", origin: "Griego (πίστις / Pistis)", def: "Certeza de lo que se espera y convicción de lo que no se ve; confianza viva e activa en la palabra y promesas de Dios (Hebreos 11:1)." },
        { term: "Redención", origin: "Griego (ἀπολύτρωσις / Apolytrosis)", def: "Rescate pagado para liberar a un esclavo del pecado; el precio fue la sangre vertida por Cristo en la cruz (1 Pedro 1:18-19)." },
        { term: "Santificación", origin: "Griego (ἁγιασμός / Hagiasmos)", def: "Proceso continuo guiado por el Espíritu Santo para apartarse del pecado y conformar el carácter a la imagen de Cristo (1 Tesalonicenses 4:3)." },
        { term: "Propiciación", origin: "Griego (ἱλασμός / Hilasmos)", def: "Sacrificio que satisface la perfecta justicia divina y desvía la ira justa de Dios sobre el pecado (1 Juan 2:2)." },
        { term: "Misericordia", origin: "Hebreo (חֶסֶד / Chesed)", def: "Compasión entrañable y amor fiel del pacto de Dios que perdona y no nos da el castigo que merecemos (Lamentaciones 3:22-23)." },
        { term: "Exégesis", origin: "Griego (ἐξήγησις)", def: "Método de interpretación bíblica que extrae el significado original e intencionado del texto según su contexto histórico y gramatical." },
        { term: "Hermenéutica", origin: "Griego (ἑρμηνευτική)", def: "Ciencia y arte de interpretar las Escrituras para aplicar su mensaje eterno a la vida contemporánea." },
        { term: "Pacto", origin: "Hebreo (בְּרִית / Berit)", def: "Alianza solemne y sagrada establecida por Dios con su pueblo, respaldada por promesas e impulsada por el amor divino." },
        { term: "Parábola", origin: "Griego (παραβολή / Parabole)", def: "Narración terrenal con un significado espiritual o celestial profundo utilizada magistralmente por Jesús." },
        { term: "Discipulado", origin: "Griego (μαθητεία / Matheteia)", def: "Proceso de seguir a Jesús, aprender de sus enseñanzas y multiplicar su verdad en la vida de otros (Mateo 28:19)." },
        { term: "Escatología", origin: "Griego (ἔσχατος / Eschatos)", def: "Estudio teológico de las cosas últimas y del cumplimiento de la profecía bíblica (segunda venida, resurrección, juicio y eternidad)." },
        { term: "Inspiración", origin: "Griego (θεόπνευστος / Theopneustos)", def: "Literalmente 'soplado por Dios'. La verdad de que las Escrituras fueron inspiradas por el Espíritu Santo (2 Timoteo 3:16)." },
        { term: "Koinonía", origin: "Griego (κοινωνία)", def: "Comunión, fraternidad intencional y participación compartida de la vida en el Espíritu Santo entre creyentes (Hechos 2:42)." },
        { term: "Evangelio", origin: "Griego (εὐαγγέλιον / Euangelion)", def: "Buenas nuevas de la salvación en Jesucristo, su muerte, sepultura y resurrección victoriosa." }
    ];

    // ---- Reading Plans Dataset ----
    const READING_PLANS = {
        plan_evangelios: {
            title: "4 Evangelios en 30 Días",
            items: [
                { id: "e_1", title: "Día 1: Mateo 1 - 4", passage: "Mateo 1:1" },
                { id: "e_2", title: "Día 2: Mateo 5 - 7 (Sermón del Monte)", passage: "Mateo 5:1" },
                { id: "e_3", title: "Día 3: Mateo 8 - 10", passage: "Mateo 8:1" },
                { id: "e_4", title: "Día 4: Mateo 11 - 13", passage: "Mateo 11:1" },
                { id: "e_5", title: "Día 5: Mateo 14 - 17", passage: "Mateo 14:1" },
                { id: "e_6", title: "Día 6: Mateo 18 - 21", passage: "Mateo 18:1" },
                { id: "e_7", title: "Día 7: Mateo 22 - 25", passage: "Mateo 22:1" },
                { id: "e_8", title: "Día 8: Mateo 26 - 28", passage: "Mateo 26:1" },
                { id: "e_9", title: "Día 9: Marcos 1 - 4", passage: "Marcos 1:1" },
                { id: "e_10", title: "Día 10: Marcos 5 - 8", passage: "Marcos 5:1" },
                { id: "e_11", title: "Día 11: Marcos 9 - 12", passage: "Marcos 9:1" },
                { id: "e_12", title: "Día 12: Marcos 13 - 16", passage: "Marcos 13:1" },
                { id: "e_13", title: "Día 13: Lucas 1 - 3", passage: "Lucas 1:1" },
                { id: "e_14", title: "Día 14: Lucas 4 - 6", passage: "Lucas 4:1" },
                { id: "e_15", title: "Día 15: Lucas 7 - 9", passage: "Lucas 7:1" },
                { id: "e_16", title: "Día 16: Lucas 10 - 12", passage: "Lucas 10:1" },
                { id: "e_17", title: "Día 17: Lucas 13 - 16", passage: "Lucas 13:1" },
                { id: "e_18", title: "Día 18: Lucas 17 - 19", passage: "Lucas 17:1" },
                { id: "e_19", title: "Día 19: Lucas 20 - 22", passage: "Lucas 20:1" },
                { id: "e_20", title: "Día 20: Lucas 23 - 24", passage: "Lucas 23:1" },
                { id: "e_21", title: "Día 21: Juan 1 - 3", passage: "Juan 1:1" },
                { id: "e_22", title: "Día 22: Juan 4 - 6", passage: "Juan 4:1" },
                { id: "e_23", title: "Día 23: Juan 7 - 9", passage: "Juan 7:1" },
                { id: "e_24", title: "Día 24: Juan 10 - 12", passage: "Juan 10:1" },
                { id: "e_25", title: "Día 25: Juan 13 - 15", passage: "Juan 13:1" },
                { id: "e_26", title: "Día 26: Juan 16 - 17", passage: "Juan 16:1" },
                { id: "e_27", title: "Día 27: Juan 18 - 19", passage: "Juan 18:1" },
                { id: "e_28", title: "Día 28: Juan 20 - 21", passage: "Juan 20:1" }
            ]
        },
        plan_sabiduria: {
            title: "Sabiduría: Salmos & Proverbios",
            items: [
                { id: "s_1", title: "Día 1: Salmo 1 - 5 & Proverbios 1", passage: "Salmos 1:1" },
                { id: "s_2", title: "Día 2: Salmo 6 - 10 & Proverbios 2", passage: "Salmos 6:1" },
                { id: "s_3", title: "Día 3: Salmo 11 - 15 & Proverbios 3", passage: "Salmos 11:1" },
                { id: "s_4", title: "Día 4: Salmo 16 - 20 & Proverbios 4", passage: "Salmos 16:1" },
                { id: "s_5", title: "Día 5: Salmo 23 & Proverbios 5", passage: "Salmos 23:1" },
                { id: "s_6", title: "Día 6: Salmo 27 & Proverbios 6", passage: "Salmos 27:1" },
                { id: "s_7", title: "Día 7: Salmo 34 & Proverbios 7", passage: "Salmos 34:1" },
                { id: "s_8", title: "Día 8: Salmo 51 (Arrepentimiento) & Proverbios 8", passage: "Salmos 51:1" },
                { id: "s_9", title: "Día 9: Salmo 91 (Protección) & Proverbios 9", passage: "Salmos 91:1" },
                { id: "s_10", title: "Día 10: Salmo 103 & Proverbios 10", passage: "Salmos 103:1" },
                { id: "s_11", title: "Día 11: Salmo 119:1-32 & Proverbios 11", passage: "Salmos 119:1" },
                { id: "s_12", title: "Día 12: Salmo 121 & Proverbios 12", passage: "Salmos 121:1" },
                { id: "s_13", title: "Día 13: Salmo 139 & Proverbios 31", passage: "Salmos 139:1" }
            ]
        },
        plan_anual: {
            title: "Biblia Completa (Panorama)",
            items: [
                { id: "a_1", title: "Génesis 1 - 3 & Mateo 1", passage: "Génesis 1:1" },
                { id: "a_2", title: "Génesis 4 - 7 & Mateo 2", passage: "Génesis 4:1" },
                { id: "a_3", title: "Éxodo 1 - 4 & Mateo 3", passage: "Éxodo 1:1" },
                { id: "a_4", title: "Éxodo 14 - 15 & Mateo 4", passage: "Éxodo 14:1" },
                { id: "a_5", title: "Josué 1 - 3 & Hechos 1", passage: "Josué 1:1" },
                { id: "a_6", title: "1 Samuel 16 - 17 & Romanos 1", passage: "1 Samuel 16:1" },
                { id: "a_7", title: "Isaías 53 & 1 Corintios 15", passage: "Isaías 53:1" },
                { id: "a_8", title: "Apocalipsis 21 - 22", passage: "Apocalipsis 21:1" }
            ]
        }
    };

    function getCanonicalBookName(index) {
        if (index >= 0 && index < CANONICAL_BOOK_NAMES.length) {
            return CANONICAL_BOOK_NAMES[index];
        }
        return `Libro ${index + 1}`;
    }

    function parsePassageReference(inputVal) {
        if (!inputVal) return null;
        const q = inputVal.trim();

        const match = q.match(/^([\d\s\wáéíóúñÁÉÍÓÚÑ]+?)\s+(\d+)(?::(\d+)(?:-\d+)?)?$/i);

        if (match) {
            const bookStr = match[1].trim().toLowerCase();
            const chapterNum = parseInt(match[2]);
            const verseNum = match[3] ? parseInt(match[3]) : null;

            let bookIndex = BOOK_NAMES_ES[bookStr];
            if (bookIndex === undefined) {
                for (let i = 0; i < CANONICAL_BOOK_NAMES.length; i++) {
                    const normName = CANONICAL_BOOK_NAMES[i].toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                    const normQuery = bookStr.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                    if (normName === normQuery || normName.startsWith(normQuery)) {
                        bookIndex = i;
                        break;
                    }
                }
            }

            if (bookIndex !== undefined && bookIndex >= 0 && bookIndex < 66) {
                const canonicalBook = CANONICAL_BOOK_NAMES[bookIndex];
                const displayRef = verseNum 
                    ? `${canonicalBook} ${chapterNum}:${verseNum}`
                    : `${canonicalBook} ${chapterNum}`;

                return {
                    bookIndex,
                    chapter: chapterNum - 1,
                    verse: verseNum ? verseNum - 1 : null,
                    displayRef
                };
            }
        }

        return null;
    }

    // ---- Application State ----
    const state = {
        currentVersion: 'es_rvr',
        parallelVersion: 'en_kjv',
        parallelMode: false,
        bibleData: {},
        currentBookIndex: -1,
        currentChapter: -1,
        notes: {},            // { "version:bookIndex:chapter:verse": { text: "...", pinned: bool, date: "..." } }
        freeNotes: [],        // [ { id: "fn_...", title: "...", content: "...", pinned: bool, tag: "Fe", linkedVerses: ["Juan 3:16"], date: "..." } ]
        highlights: {},       // { "bookIndex:chapter:verse": "yellow|green|blue|pink|orange" }
        favorites: new Set(), // Set of "bookIndex:chapter:verse"
        readingPlanState: {}, // { "planId:itemId": bool }
        selectedTag: 'all',   // 'all' | 'Fe' | 'Evangelismo' | ...
        openBooks: new Set(),
        testament: 'old',
        sidebarCollapsed: false,
        notebookCollapsed: true,
        notebookTab: 'all',   // 'all' | 'predicas' | 'verses' | 'favorites'
        fontSize: 1.05,       // rem
        fontFamily: 'lora',   // 'lora' | 'sans'
        theme: 'dark',        // 'dark' | 'light' | 'soft' | 'unicolor' | 'vibrant'
    };

    // Pulpit Sermon Timer State
    let sermonTimerInterval = null;
    let sermonTimerSeconds = 0;
    let sermonTimerTarget = 1800; // 30 min default
    let sermonTimerRunning = false;

    // Audio Bible Speech State
    let isSpeechSpeaking = false;

    // Canvas Verse Image State
    let selectedImageCardBg = 'dark';
    let currentTargetVerseData = null;

    // Modal state for Free Notes
    let currentFreeNoteId = null;
    let currentLinkedVerses = [];

    // Modal state for Verse Notes
    let editingNoteKey = null;

    // ---- DOM Elements ----
    const dom = {
        loadingScreen: document.getElementById('loading-screen'),
        loadingBarFill: document.getElementById('loading-bar-fill'),
        app: document.getElementById('app'),
        sidebarToggle: document.getElementById('sidebar-toggle'),
        sidebar: document.getElementById('sidebar'),
        logoBtn: document.getElementById('logo-btn'),
        booksList: document.getElementById('books-list'),
        tabOld: document.getElementById('tab-old'),
        tabNew: document.getElementById('tab-new'),
        versionSelect: document.getElementById('version-select'),
        parallelVersionWrapper: document.getElementById('parallel-version-wrapper'),
        parallelVersionSelect: document.getElementById('parallel-version-select'),
        parallelToggle: document.getElementById('parallel-toggle'),
        btnOpenDictionary: document.getElementById('btn-open-dictionary'),
        btnOpenReadingPlans: document.getElementById('btn-open-reading-plans'),
        btnAudioBible: document.getElementById('btn-audio-bible'),
        audioVoiceSelect: document.getElementById('audio-voice-select'),
        audioSpeedSelect: document.getElementById('audio-speed-select'),

        searchInput: document.getElementById('search-input'),
        searchResults: document.getElementById('search-results'),
        fontDecrease: document.getElementById('font-decrease'),
        fontIncrease: document.getElementById('font-increase'),
        fontFamilyToggle: document.getElementById('font-family-toggle'),

        // Theme Dropdown
        themeMenuBtn: document.getElementById('theme-menu-btn'),
        themeDropdownMenu: document.getElementById('theme-dropdown-menu'),

        notebookToggle: document.getElementById('notebook-toggle'),
        notebookDrawer: document.getElementById('notebook-drawer'),
        notebookClose: document.getElementById('notebook-close'),
        btnNewFreeNote: document.getElementById('btn-new-free-note'),
        btnExportBackup: document.getElementById('btn-export-backup'),
        btnImportBackup: document.getElementById('btn-import-backup'),
        importBackupFile: document.getElementById('import-backup-file'),
        tabNotesAll: document.getElementById('tab-notes-all'),
        tabNotesPredicas: document.getElementById('tab-notes-predicas'),
        tabNotesVerses: document.getElementById('tab-notes-verses'),
        tabNotesFavorites: document.getElementById('tab-notes-favorites'),
        categoryChipsBar: document.getElementById('category-chips-bar'),
        notesBadgeCount: document.getElementById('notes-badge-count'),
        notebookNotesList: document.getElementById('notebook-notes-list'),
        notesSearchInput: document.getElementById('notes-search-input'),
        welcomeScreen: document.getElementById('welcome-screen'),
        btnReadVod: document.getElementById('btn-read-vod'),
        quickStartGen: document.getElementById('quick-start-gen'),
        quickStartPsalms: document.getElementById('quick-start-psalms'),
        quickStartJohn: document.getElementById('quick-start-john'),
        readingArea: document.getElementById('reading-area'),
        readingBreadcrumb: document.getElementById('reading-breadcrumb'),
        versesContainer: document.getElementById('verses-container'),
        prevChapter: document.getElementById('prev-chapter'),
        nextChapter: document.getElementById('next-chapter'),
        
        // Verse Note Modal
        noteModal: document.getElementById('note-modal'),
        modalTitle: document.getElementById('modal-title'),
        modalVersePreview: document.getElementById('modal-verse-preview'),
        verseNoteEditor: document.getElementById('verse-note-editor'),
        modalClose: document.getElementById('modal-close'),
        modalCancel: document.getElementById('modal-cancel'),
        modalSave: document.getElementById('modal-save'),

        // Free Note / Sermon Modal
        freeNoteModal: document.getElementById('free-note-modal'),
        freeNoteModalTitle: document.getElementById('free-note-modal-title'),
        freeNoteTitle: document.getElementById('free-note-title'),
        freeNoteTagsInput: document.getElementById('free-note-tags-input'),
        freeNoteEditor: document.getElementById('free-note-editor'),
        linkVerseInput: document.getElementById('link-verse-input'),
        btnAddLinkedVerse: document.getElementById('btn-add-linked-verse'),
        linkedVersesTags: document.getElementById('linked-verses-tags'),
        freeNoteModalClose: document.getElementById('free-note-modal-close'),
        freeNoteModalCancel: document.getElementById('free-note-modal-cancel'),
        freeNoteModalSave: document.getElementById('free-note-modal-save'),

        // View Sermon Modal & Pulpit Timer
        viewSermonModal: document.getElementById('view-sermon-modal'),
        viewSermonTitle: document.getElementById('view-sermon-title'),
        viewSermonDate: document.getElementById('view-sermon-date'),
        viewSermonTagBadge: document.getElementById('view-sermon-tag-badge'),
        viewSermonContent: document.getElementById('view-sermon-content'),
        viewSermonLinkedVerses: document.getElementById('view-sermon-linked-verses'),
        viewSermonClose: document.getElementById('view-sermon-close'),
        viewSermonCloseBtn: document.getElementById('view-sermon-close-btn'),
        viewSermonEditBtn: document.getElementById('view-sermon-edit-btn'),
        viewSermonPrintBtn: document.getElementById('view-sermon-print-btn'),
        sermonTimerDisplay: document.getElementById('sermon-timer-display'),
        btnSermonTimerToggle: document.getElementById('btn-sermon-timer-toggle'),
        btnSermonTimerReset: document.getElementById('btn-sermon-timer-reset'),
        sermonTimerPreset: document.getElementById('sermon-timer-preset'),

        // Verse Image Modal
        verseImageModal: document.getElementById('verse-image-modal'),
        verseCanvas: document.getElementById('verse-canvas'),
        verseImageModalClose: document.getElementById('verse-image-modal-close'),
        verseImageModalCancel: document.getElementById('verse-image-modal-cancel'),
        btnDownloadVerseImage: document.getElementById('btn-download-verse-image'),

        // Dictionary Modal
        dictionaryModal: document.getElementById('dictionary-modal'),
        dictSearchInput: document.getElementById('dict-search-input'),
        dictQuickChips: document.getElementById('dict-quick-chips'),
        dictResultsContainer: document.getElementById('dict-results-container'),
        dictionaryModalClose: document.getElementById('dictionary-modal-close'),
        dictionaryModalCloseBtn: document.getElementById('dictionary-modal-close-btn'),

        // Reading Plans Modal
        readingPlansModal: document.getElementById('reading-plans-modal'),
        tabPlanEvangelios: document.getElementById('tab-plan-evangelios'),
        tabPlanSabiduria: document.getElementById('tab-plan-sabiduria'),
        tabPlanAnual: document.getElementById('tab-plan-anual'),
        planProgressText: document.getElementById('plan-progress-text'),
        planProgressCounts: document.getElementById('plan-progress-counts'),
        planProgressBar: document.getElementById('plan-progress-bar'),
        planChecklist: document.getElementById('plan-checklist'),
        readingPlansModalClose: document.getElementById('reading-plans-modal-close'),
        readingPlansModalCloseBtn: document.getElementById('reading-plans-modal-close-btn'),

        // Footer & Informational Modals
        btnAboutMe: document.getElementById('btn-about-me'),
        btnPrivacy: document.getElementById('btn-privacy'),
        btnPrayerRequest: document.getElementById('btn-prayer-request'),
        btnSupportStrike: document.getElementById('btn-support-strike'),

        aboutModal: document.getElementById('about-modal'),
        aboutModalClose: document.getElementById('about-modal-close'),
        aboutModalCloseBtn: document.getElementById('about-modal-close-btn'),

        privacyModal: document.getElementById('privacy-modal'),
        privacyModalClose: document.getElementById('privacy-modal-close'),
        privacyModalCloseBtn: document.getElementById('privacy-modal-close-btn'),

        prayerModal: document.getElementById('prayer-modal'),
        prayerName: document.getElementById('prayer-name'),
        prayerContent: document.getElementById('prayer-content'),
        prayerModalClose: document.getElementById('prayer-modal-close'),
        prayerModalCancel: document.getElementById('prayer-modal-cancel'),
        prayerModalSubmit: document.getElementById('prayer-modal-submit'),

        supportModal: document.getElementById('support-modal'),
        supportModalClose: document.getElementById('support-modal-close'),
        supportModalCloseBtn: document.getElementById('support-modal-close-btn'),

        toast: document.getElementById('toast'),
        toastMessage: document.getElementById('toast-message'),
    };

    // ---- Init ----
    async function init() {
        const savedTheme = localStorage.getItem('torchbook_theme') || 'dark';
        applyTheme(savedTheme);

        loadNotes();
        loadHighlightsAndFavorites();
        loadReadingPlanState();
        updateNotesBadge();
        await loadBibleVersion(state.currentVersion);
        renderBooks();
        setupRichToolbars();
        
        populateAudioVoices();
        if ('speechSynthesis' in window) {
            window.speechSynthesis.onvoiceschanged = populateAudioVoices;
        }

        bindEvents();
        hideLoading();
    }

    // ---- Theme Switcher ----
    function applyTheme(themeName) {
        state.theme = themeName;
        document.documentElement.setAttribute('data-theme', themeName);
        localStorage.setItem('torchbook_theme', themeName);

        if (dom.themeDropdownMenu) {
            dom.themeDropdownMenu.querySelectorAll('.theme-option').forEach(opt => {
                opt.classList.toggle('active', opt.dataset.theme === themeName);
            });
        }
    }

    // ---- Load Bible Version ----
    async function loadBibleVersion(versionKey) {
        if (state.bibleData[versionKey]) return;

        const config = BIBLE_VERSIONS[versionKey];
        if (!config) return;

        try {
            updateLoadingBar(40);
            const response = await fetch(config.file);
            updateLoadingBar(80);
            const data = await response.json();
            state.bibleData[versionKey] = data;
            updateLoadingBar(100);
        } catch (error) {
            console.error(`Error loading ${versionKey}:`, error);
            showToast(`Error cargando ${config.name}`);
        }
    }

    function updateLoadingBar(percent) {
        if (dom.loadingBarFill) {
            dom.loadingBarFill.style.width = percent + '%';
        }
    }

    function hideLoading() {
        setTimeout(() => {
            dom.loadingScreen.classList.add('fade-out');
            dom.app.classList.remove('hidden');
            setTimeout(() => {
                dom.loadingScreen.style.display = 'none';
            }, 500);
        }, 300);
    }

    // ---- Rich Text Toolbars ----
    function setupRichToolbars() {
        document.querySelectorAll('.rich-toolbar').forEach(toolbar => {
            const targetId = toolbar.dataset.target;
            const editor = document.getElementById(targetId);
            if (!editor) return;

            toolbar.querySelectorAll('.rich-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    const cmd = btn.dataset.cmd;
                    if (!cmd) return;
                    editor.focus();
                    document.execCommand(cmd, false, null);
                });
            });

            const fontSelect = toolbar.querySelector('.rich-select');
            if (fontSelect) {
                fontSelect.addEventListener('change', (e) => {
                    const val = e.target.value;
                    editor.focus();
                    if (val === 'p' || val === 'h2' || val === 'h3') {
                        document.execCommand('formatBlock', false, val);
                    } else if (val === 'small') {
                        document.execCommand('fontSize', false, '2');
                    }
                });
            }
        });
    }

    // ---- Persistence ----
    function loadNotes() {
        try {
            const savedVerseNotes = localStorage.getItem('torchbook_notes');
            if (savedVerseNotes) {
                const parsed = JSON.parse(savedVerseNotes);
                const normalized = {};
                for (const k in parsed) {
                    if (typeof parsed[k] === 'string') {
                        normalized[k] = { text: parsed[k], pinned: false, date: new Date().toLocaleDateString() };
                    } else {
                        normalized[k] = parsed[k];
                    }
                }
                state.notes = normalized;
            }

            const savedFreeNotes = localStorage.getItem('torchbook_free_notes');
            if (savedFreeNotes) {
                state.freeNotes = JSON.parse(savedFreeNotes);
            }
        } catch (e) {
            console.error('Error loading notes:', e);
        }
    }

    function loadHighlightsAndFavorites() {
        try {
            const savedHighlights = localStorage.getItem('torchbook_highlights');
            if (savedHighlights) {
                state.highlights = JSON.parse(savedHighlights);
            }

            const savedFavorites = localStorage.getItem('torchbook_favorites');
            if (savedFavorites) {
                state.favorites = new Set(JSON.parse(savedFavorites));
            }
        } catch (e) {
            console.error('Error loading highlights/favorites:', e);
        }
    }

    function loadReadingPlanState() {
        try {
            const savedPlans = localStorage.getItem('torchbook_reading_plans');
            if (savedPlans) {
                state.readingPlanState = JSON.parse(savedPlans);
            }
        } catch (e) {
            console.error('Error loading reading plan state:', e);
        }
    }

    function saveVerseNotes() {
        try {
            localStorage.setItem('torchbook_notes', JSON.stringify(state.notes));
            updateNotesBadge();
            renderNotebookDrawer();
        } catch (e) {
            console.error('Error saving verse notes:', e);
        }
    }

    function saveFreeNotes() {
        try {
            localStorage.setItem('torchbook_free_notes', JSON.stringify(state.freeNotes));
            updateNotesBadge();
            renderNotebookDrawer();
        } catch (e) {
            console.error('Error saving free notes:', e);
        }
    }

    function saveHighlights() {
        try {
            localStorage.setItem('torchbook_highlights', JSON.stringify(state.highlights));
        } catch (e) {
            console.error('Error saving highlights:', e);
        }
    }

    function saveFavorites() {
        try {
            localStorage.setItem('torchbook_favorites', JSON.stringify([...state.favorites]));
            renderNotebookDrawer();
        } catch (e) {
            console.error('Error saving favorites:', e);
        }
    }

    function saveReadingPlanState() {
        try {
            localStorage.setItem('torchbook_reading_plans', JSON.stringify(state.readingPlanState));
        } catch (e) {
            console.error('Error saving reading plans:', e);
        }
    }

    function getNoteKey(bookIndex, chapter, verse) {
        return `${state.currentVersion}:${bookIndex}:${chapter}:${verse}`;
    }

    function getVerseKey(bookIndex, chapter, verse) {
        return `${bookIndex}:${chapter}:${verse}`;
    }

    function getNoteText(noteObj) {
        if (!noteObj) return '';
        if (typeof noteObj === 'string') return noteObj;
        return noteObj.text || '';
    }

    function isNotePinned(noteObj) {
        if (!noteObj || typeof noteObj === 'string') return false;
        return !!noteObj.pinned;
    }

    function updateNotesBadge() {
        const verseNotesCount = Object.keys(state.notes).length;
        const freeNotesCount = state.freeNotes.length;
        const total = verseNotesCount + freeNotesCount;
        dom.notesBadgeCount.textContent = total;
    }

    // ---- Render Books Sidebar ----
    function renderBooks() {
        const books = state.bibleData[state.currentVersion];
        if (!books) return;

        const isOld = state.testament === 'old';
        const startIndex = isOld ? 0 : OLD_TESTAMENT_COUNT;
        const endIndex = isOld ? OLD_TESTAMENT_COUNT : books.length;

        let html = '';
        for (let i = startIndex; i < endIndex; i++) {
            const book = books[i];
            const isOpen = state.openBooks.has(i);
            const isActive = state.currentBookIndex === i;
            const chaptersCount = book.chapters.length;
            const bookName = getCanonicalBookName(i);

            html += `
                <div class="book-item" id="book-item-${i}">
                    <button class="book-header ${isActive ? 'active' : ''}" data-book-index="${i}">
                        <svg class="book-chevron ${isOpen ? 'open' : ''}" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                        <span class="book-name">${bookName}</span>
                        <span class="book-chapters-count">${chaptersCount}</span>
                    </button>
                    <div class="chapters-grid ${isOpen ? 'open' : ''}" id="chapters-${i}">
                        ${renderChapterButtons(i, chaptersCount)}
                    </div>
                </div>
            `;
        }

        dom.booksList.innerHTML = html;
    }

    function renderChapterButtons(bookIndex, count) {
        let html = '';
        for (let c = 0; c < count; c++) {
            const isActive = state.currentBookIndex === bookIndex && state.currentChapter === c;
            html += `<button class="chapter-btn ${isActive ? 'active' : ''}" data-book-index="${bookIndex}" data-chapter="${c}">${c + 1}</button>`;
        }
        return html;
    }

    // Helper to find sermons linked to a specific verse
    function getSermonsForVerse(bookIndex, chapter, verseIndex) {
        const canonicalBook = getCanonicalBookName(bookIndex);
        const refWithVerse = `${canonicalBook} ${chapter + 1}:${verseIndex + 1}`;
        const refChapterOnly = `${canonicalBook} ${chapter + 1}`;

        const matchingSermons = [];
        for (const fn of state.freeNotes) {
            if (!fn.linkedVerses) continue;
            for (const ref of fn.linkedVerses) {
                const parsed = parsePassageReference(ref);
                if (parsed) {
                    if (parsed.bookIndex === bookIndex && parsed.chapter === chapter) {
                        if (parsed.verse === null || parsed.verse === verseIndex) {
                            matchingSermons.push(fn);
                            break;
                        }
                    }
                } else {
                    const cleanRef = ref.trim().toLowerCase();
                    if (cleanRef === refWithVerse.toLowerCase() || cleanRef === refChapterOnly.toLowerCase()) {
                        matchingSermons.push(fn);
                        break;
                    }
                }
            }
        }
        return matchingSermons;
    }

    // ---- Render Verses ----
    function renderVerses() {
        const booksPrimary = state.bibleData[state.currentVersion];
        if (!booksPrimary || state.currentBookIndex < 0 || state.currentChapter < 0) return;

        const bookPrimary = booksPrimary[state.currentBookIndex];
        const chapterPrimary = bookPrimary.chapters[state.currentChapter];
        const bookName = getCanonicalBookName(state.currentBookIndex);

        dom.readingBreadcrumb.innerHTML = `
            <span class="breadcrumb-book">${bookName}</span>
            <span class="breadcrumb-separator">/</span>
            <span class="breadcrumb-chapter">Capítulo ${state.currentChapter + 1}</span>
            ${state.parallelMode ? `<span class="breadcrumb-separator">|</span><span style="color: var(--gold-400); font-weight:700;">Modo Paralelo</span>` : ''}
        `;

        dom.prevChapter.disabled = (state.currentBookIndex === 0 && state.currentChapter === 0);
        const lastBookIndex = booksPrimary.length - 1;
        const lastChapter = booksPrimary[lastBookIndex].chapters.length - 1;
        dom.nextChapter.disabled = (state.currentBookIndex === lastBookIndex && state.currentChapter === lastChapter);

        if (state.parallelMode && state.bibleData[state.parallelVersion]) {
            renderParallelVerses(chapterPrimary);
        } else {
            renderSingleVerses(chapterPrimary);
        }

        dom.welcomeScreen.classList.add('hidden');
        dom.readingArea.classList.remove('hidden');
    }

    function renderSingleVerses(chapter) {
        let html = '';
        for (let v = 0; v < chapter.length; v++) {
            const noteKey = getNoteKey(state.currentBookIndex, state.currentChapter, v);
            const verseKey = getVerseKey(state.currentBookIndex, state.currentChapter, v);
            const noteObj = state.notes[noteKey];
            const noteText = getNoteText(noteObj);
            const hasNote = !!noteText;
            const highlightColor = state.highlights[verseKey] || '';
            const isFav = state.favorites.has(verseKey);

            const sermons = getSermonsForVerse(state.currentBookIndex, state.currentChapter, v);
            let sermonsBadgeHtml = '';
            if (sermons.length > 0) {
                for (const s of sermons) {
                    sermonsBadgeHtml += `
                        <div class="verse-sermon-badge" data-sermon-id="${s.id}" title="Ver prédica relacionada: ${escapeHtml(s.title)}">
                            <span class="verse-sermon-badge-icon">🎙️</span>
                            <span>Prédica: <strong>${escapeHtml(s.title)}</strong></span>
                        </div>
                    `;
                }
            }

            html += `
                <div class="verse-card ${hasNote ? 'has-note' : ''} ${highlightColor ? `highlight-${highlightColor}` : ''}" id="verse-${v}" data-verse="${v}">
                    <span class="verse-number">${v + 1}</span>
                    <div class="verse-body">
                        <p class="verse-text">${chapter[v]}</p>
                        ${hasNote ? renderNote(noteKey, noteText) : ''}
                        ${sermonsBadgeHtml}
                        <div class="verse-actions">
                            <button class="btn-star-verse" data-verse-key="${verseKey}" title="${isFav ? 'Quitar de Favoritos' : 'Marcar como Favorito'}">
                                ${isFav ? '⭐' : '☆'}
                            </button>

                            <div class="highlight-picker" title="Subrayar versículo">
                                <span class="color-dot dot-yellow" data-color="yellow" data-verse-key="${verseKey}"></span>
                                <span class="color-dot dot-green" data-color="green" data-verse-key="${verseKey}"></span>
                                <span class="color-dot dot-blue" data-color="blue" data-verse-key="${verseKey}"></span>
                                <span class="color-dot dot-pink" data-color="pink" data-verse-key="${verseKey}"></span>
                                <span class="color-dot dot-orange" data-color="orange" data-verse-key="${verseKey}"></span>
                                <span class="color-dot dot-clear" data-color="clear" data-verse-key="${verseKey}"></span>
                            </div>

                            <button class="verse-action-btn add-note-btn" data-verse="${v}" style="margin-left: auto;">
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                                ${hasNote ? 'Editar Nota' : 'Comentar'}
                            </button>
                            <button class="verse-action-btn copy-verse-btn" data-verse="${v}" title="Copiar versículo">
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                                Copiar
                            </button>
                            <button class="verse-action-btn btn-create-verse-card" data-verse="${v}" title="Crear tarjeta en imagen para compartir">
                                🖼️ Imagen
                            </button>
                            ${hasNote ? `
                                <button class="verse-action-btn delete-btn" data-note-key="${noteKey}">
                                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                                    Eliminar
                                </button>
                            ` : ''}
                        </div>
                    </div>
                </div>
            `;
        }

        dom.versesContainer.className = "verses-container";
        dom.versesContainer.innerHTML = html;
        dom.versesContainer.scrollTop = 0;
    }

    function renderParallelVerses(chapterPrimary) {
        const booksSecondary = state.bibleData[state.parallelVersion];
        const chapterSecondary = (booksSecondary && booksSecondary[state.currentBookIndex]) 
            ? booksSecondary[state.currentBookIndex].chapters[state.currentChapter] 
            : [];

        const maxVerses = Math.max(chapterPrimary.length, chapterSecondary ? chapterSecondary.length : 0);

        let leftHtml = `<div class="parallel-column-header"><span>📜 ${BIBLE_VERSIONS[state.currentVersion].name}</span></div>`;
        let rightHtml = `<div class="parallel-column-header"><span>📖 ${BIBLE_VERSIONS[state.parallelVersion].name}</span></div>`;

        for (let v = 0; v < maxVerses; v++) {
            const verseKey = getVerseKey(state.currentBookIndex, state.currentChapter, v);
            const highlightColor = state.highlights[verseKey] || '';

            if (v < chapterPrimary.length) {
                leftHtml += `
                    <div class="verse-card ${highlightColor ? `highlight-${highlightColor}` : ''}" style="margin-bottom: 0.75rem;">
                        <span class="verse-number">${v + 1}</span>
                        <div class="verse-body"><p class="verse-text">${chapterPrimary[v]}</p></div>
                    </div>
                `;
            }

            if (chapterSecondary && v < chapterSecondary.length) {
                rightHtml += `
                    <div class="verse-card ${highlightColor ? `highlight-${highlightColor}` : ''}" style="margin-bottom: 0.75rem;">
                        <span class="verse-number">${v + 1}</span>
                        <div class="verse-body"><p class="verse-text">${chapterSecondary[v]}</p></div>
                    </div>
                `;
            }
        }

        dom.versesContainer.className = "verses-container parallel-verses-grid";
        dom.versesContainer.innerHTML = `
            <div class="parallel-col-left">${leftHtml}</div>
            <div class="parallel-col-right">${rightHtml}</div>
        `;
        dom.versesContainer.scrollTop = 0;
    }

    function renderNote(key, text) {
        return `
            <div class="verse-note">
                <div class="verse-note-label">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                    Nota Personal
                </div>
                <div class="verse-note-text">${sanitizeHtml(text)}</div>
            </div>
        `;
    }

    // ---- Render Notebook Drawer ----
    function renderNotebookDrawer(filterText = '') {
        const books = state.bibleData[state.currentVersion];
        const allItems = [];

        // 1. Process Verse Notes
        if (state.notebookTab === 'all' || state.notebookTab === 'verses') {
            for (const key in state.notes) {
                const parts = key.split(':');
                if (parts.length < 4) continue;

                const [ver, bIdxStr, cIdxStr, vIdxStr] = parts;
                const bIdx = parseInt(bIdxStr);
                const cIdx = parseInt(cIdxStr);
                const vIdx = parseInt(vIdxStr);
                const noteObj = state.notes[key];
                const noteText = getNoteText(noteObj);
                const pinned = isNotePinned(noteObj);

                if (filterText && !noteText.toLowerCase().includes(filterText.toLowerCase())) {
                    continue;
                }

                let bookName = getCanonicalBookName(bIdx);
                let verseSnippet = '';
                if (books && books[bIdx]) {
                    if (books[bIdx].chapters[cIdx] && books[bIdx].chapters[cIdx][vIdx]) {
                        verseSnippet = books[bIdx].chapters[cIdx][vIdx];
                    }
                }

                allItems.push({
                    type: 'verse',
                    key,
                    bIdx,
                    cIdx,
                    vIdx,
                    title: `📖 ${bookName} ${cIdx + 1}:${vIdx + 1}`,
                    content: noteText,
                    verseSnippet,
                    pinned,
                });
            }
        }

        // 2. Process Free Notes / Sermons
        if (state.notebookTab === 'all' || state.notebookTab === 'predicas') {
            for (const fn of state.freeNotes) {
                if (state.selectedTag !== 'all' && fn.tag !== state.selectedTag) {
                    continue;
                }

                if (filterText && !fn.title.toLowerCase().includes(filterText.toLowerCase()) && !fn.content.toLowerCase().includes(filterText.toLowerCase())) {
                    continue;
                }

                allItems.push({
                    type: 'free',
                    id: fn.id,
                    title: fn.title || 'Prédica Sin Título',
                    content: fn.content || '',
                    pinned: !!fn.pinned,
                    tag: fn.tag || '',
                    linkedVerses: fn.linkedVerses || [],
                    date: fn.date || '',
                });
            }
        }

        // 3. Process Favorites
        if (state.notebookTab === 'favorites') {
            for (const favKey of state.favorites) {
                const parts = favKey.split(':');
                if (parts.length < 3) continue;
                const [bIdxStr, cIdxStr, vIdxStr] = parts;
                const bIdx = parseInt(bIdxStr);
                const cIdx = parseInt(cIdxStr);
                const vIdx = parseInt(vIdxStr);

                let bookName = getCanonicalBookName(bIdx);
                let verseSnippet = '';
                if (books && books[bIdx] && books[bIdx].chapters[cIdx]) {
                    verseSnippet = books[bIdx].chapters[cIdx][vIdx] || '';
                }

                if (filterText && !bookName.toLowerCase().includes(filterText.toLowerCase()) && !verseSnippet.toLowerCase().includes(filterText.toLowerCase())) {
                    continue;
                }

                allItems.push({
                    type: 'favorite',
                    favKey,
                    bIdx,
                    cIdx,
                    vIdx,
                    title: `⭐ ${bookName} ${cIdx + 1}:${vIdx + 1}`,
                    verseSnippet,
                    pinned: true,
                });
            }
        }

        // Sort items: pinned first, then newest
        allItems.sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0));

        if (allItems.length === 0) {
            dom.notebookNotesList.innerHTML = `
                <div class="empty-notes-state">
                    <div class="empty-notes-icon">📖</div>
                    <p>No hay elementos registrados en esta categoría.</p>
                    <small>Agrega prédicas, versículos o marca pasajes con la estrella ⭐ para verlos aquí.</small>
                </div>
            `;
            return;
        }

        let html = '';
        for (const item of allItems) {
            if (item.type === 'verse') {
                html += `
                    <div class="notebook-note-card ${item.pinned ? 'pinned' : ''}" data-type="verse" data-key="${item.key}" data-book="${item.bIdx}" data-chapter="${item.cIdx}" data-verse="${item.vIdx}">
                        <div class="note-card-header">
                            <span class="note-card-ref">${item.title}</span>
                            <span class="note-card-type-badge type-verse">💬 Versículo</span>
                        </div>
                        <div class="note-card-body">${sanitizeHtml(item.content)}</div>
                        ${item.verseSnippet ? `<div class="note-card-verse-snippet">"${escapeHtml(item.verseSnippet)}"</div>` : ''}
                        <div class="note-card-actions">
                            <button class="card-action-btn ${item.pinned ? 'active-pin' : ''} btn-pin-verse" data-key="${item.key}" title="${item.pinned ? 'Desfijar' : 'Fijar al inicio'}">
                                ${item.pinned ? '📌 Fijado' : '📌 Fijar'}
                            </button>
                            <button class="card-action-btn btn-edit-verse" data-verse="${item.vIdx}" data-book="${item.bIdx}" data-chapter="${item.cIdx}">
                                ✏️ Editar
                            </button>
                            <button class="card-action-btn btn-delete btn-delete-verse" data-key="${item.key}">
                                🗑️ Eliminar
                            </button>
                            <button class="card-action-btn btn-jump-verse" data-book="${item.bIdx}" data-chapter="${item.cIdx}" data-verse="${item.vIdx}" style="margin-left: auto;">
                                📖 Ir al Pasaje
                            </button>
                        </div>
                    </div>
                `;
            } else if (item.type === 'favorite') {
                html += `
                    <div class="notebook-note-card pinned" data-type="favorite" data-book="${item.bIdx}" data-chapter="${item.cIdx}" data-verse="${item.vIdx}">
                        <div class="note-card-header">
                            <span class="note-card-ref">${item.title}</span>
                            <span class="note-card-type-badge type-verse">⭐ Favorito</span>
                        </div>
                        <div class="note-card-verse-snippet" style="font-size:0.95rem; margin-top:0.5rem;">"${escapeHtml(item.verseSnippet)}"</div>
                        <div class="note-card-actions">
                            <button class="card-action-btn btn-jump-verse" data-book="${item.bIdx}" data-chapter="${item.cIdx}" data-verse="${item.vIdx}" style="margin-left: auto;">
                                📖 Leer Pasaje
                            </button>
                        </div>
                    </div>
                `;
            } else {
                let linkedPillsHtml = '';
                if (item.linkedVerses && item.linkedVerses.length > 0) {
                    linkedPillsHtml = `<div class="note-linked-verses">`;
                    for (const ref of item.linkedVerses) {
                        linkedPillsHtml += `<span class="linked-verse-pill" data-ref="${escapeHtml(ref)}">📖 ${escapeHtml(ref)}</span>`;
                    }
                    linkedPillsHtml += `</div>`;
                }

                html += `
                    <div class="notebook-note-card ${item.pinned ? 'pinned' : ''}" id="sermon-card-${item.id}" data-type="free" data-id="${item.id}">
                        <div class="note-card-header">
                            <span class="note-card-ref">🎙️ Prédica ${item.tag ? `<span class="category-chip active" style="font-size:0.7rem; padding:1px 6px;">${escapeHtml(item.tag)}</span>` : ''}</span>
                            <span class="note-card-type-badge type-predica">🎙️ Prédica / Nota</span>
                        </div>
                        <h4 class="note-card-title">${escapeHtml(item.title)}</h4>
                        <div class="note-card-body">${sanitizeHtml(item.content)}</div>
                        ${linkedPillsHtml}
                        <div class="note-card-actions">
                            <button class="card-action-btn btn-view-free" data-id="${item.id}">
                                👁️ Ver Prédica
                            </button>
                            <button class="card-action-btn ${item.pinned ? 'active-pin' : ''} btn-pin-free" data-id="${item.id}" title="${item.pinned ? 'Desfijar' : 'Fijar al inicio'}">
                                ${item.pinned ? '📌 Fijado' : '📌 Fijar'}
                            </button>
                            <button class="card-action-btn btn-edit-free" data-id="${item.id}">
                                ✏️ Editar
                            </button>
                            <button class="card-action-btn btn-delete btn-delete-free" data-id="${item.id}">
                                🗑️ Eliminar
                            </button>
                        </div>
                    </div>
                `;
            }
        }

        dom.notebookNotesList.innerHTML = html;
    }

    // ---- Audio Bible (SpeechSynthesis Text to Speech with Natural Voices) ----
    let availableVoices = [];

    function populateAudioVoices() {
        if (!('speechSynthesis' in window) || !dom.audioVoiceSelect) return;

        availableVoices = window.speechSynthesis.getVoices();
        const currentLang = BIBLE_VERSIONS[state.currentVersion].lang || 'es';

        const filteredVoices = availableVoices.filter(v => 
            v.lang.toLowerCase().startsWith(currentLang) || v.lang.toLowerCase().startsWith('es')
        );

        if (filteredVoices.length > 0) {
            dom.audioVoiceSelect.classList.remove('hidden');
            dom.audioSpeedSelect.classList.remove('hidden');

            let html = '<option value="">✨ Voz Óptima (Auto)</option>';
            filteredVoices.forEach(v => {
                const isNatural = /natural|google|online|neural|sabina|jorge|paulina|dalia|gonzalo|monica/i.test(v.name);
                const tag = isNatural ? ' 🌟' : '';
                html += `<option value="${escapeHtml(v.name)}">${escapeHtml(v.name)}${tag}</option>`;
            });
            dom.audioVoiceSelect.innerHTML = html;
        }
    }

    function getBestVoice(selectedVoiceName, currentLang) {
        if (selectedVoiceName) {
            const match = availableVoices.find(v => v.name === selectedVoiceName);
            if (match) return match;
        }

        // Auto-select best natural voice
        const esVoices = availableVoices.filter(v => v.lang.toLowerCase().startsWith(currentLang) || v.lang.toLowerCase().startsWith('es'));
        
        // Priority 1: Natural/Neural/Google voices
        const naturalVoice = esVoices.find(v => /natural|google|online|neural|sabina|jorge|paulina|dalia|gonzalo|monica/i.test(v.name));
        if (naturalVoice) return naturalVoice;

        // Priority 2: Any Spanish voice
        if (esVoices.length > 0) return esVoices[0];

        return null;
    }

    function toggleAudioBible() {
        if (!('speechSynthesis' in window)) {
            showToast('Tu navegador no soporta lectura por voz.');
            return;
        }

        if (isSpeechSpeaking) {
            window.speechSynthesis.cancel();
            isSpeechSpeaking = false;
            dom.btnAudioBible.innerHTML = `<span>🔊 Escuchar</span>`;
            showToast('Audio pausado');
            return;
        }

        const books = state.bibleData[state.currentVersion];
        if (!books || state.currentBookIndex < 0 || state.currentChapter < 0) return;

        const book = books[state.currentBookIndex];
        const chapter = book.chapters[state.currentChapter];
        const bookName = getCanonicalBookName(state.currentBookIndex);

        const currentLang = BIBLE_VERSIONS[state.currentVersion].lang || 'es';
        const chosenVoice = getBestVoice(dom.audioVoiceSelect.value, currentLang);

        const fullText = `${bookName}, capítulo ${state.currentChapter + 1}. ` + chapter.join(". ");

        const utterance = new SpeechSynthesisUtterance(fullText);
        if (chosenVoice) utterance.voice = chosenVoice;
        utterance.lang = chosenVoice ? chosenVoice.lang : (currentLang === 'es' ? 'es-MX' : 'en-US');

        const speedRate = parseFloat(dom.audioSpeedSelect.value) || 1.0;
        utterance.rate = speedRate;

        utterance.onend = () => {
            isSpeechSpeaking = false;
            dom.btnAudioBible.innerHTML = `<span>🔊 Escuchar</span>`;
        };

        utterance.onerror = () => {
            isSpeechSpeaking = false;
            dom.btnAudioBible.innerHTML = `<span>🔊 Escuchar</span>`;
        };

        window.speechSynthesis.speak(utterance);
        isSpeechSpeaking = true;
        dom.btnAudioBible.innerHTML = `<span>⏸️ Pausar Audio</span>`;
        
        const voiceLabel = chosenVoice ? chosenVoice.name.replace(/Microsoft|Google|Desktop|Online/gi, '').trim() : 'Estándar';
        showToast(`🔊 Lectura iniciada (${voiceLabel})`);
    }

    // ---- Pulpit Sermon Timer Logic ----
    function toggleSermonTimer() {
        if (sermonTimerRunning) {
            clearInterval(sermonTimerInterval);
            sermonTimerRunning = false;
            dom.btnSermonTimerToggle.textContent = '▶️ Reanudar';
        } else {
            sermonTimerRunning = true;
            dom.btnSermonTimerToggle.textContent = '⏸️ Pausar';
            sermonTimerInterval = setInterval(() => {
                sermonTimerSeconds++;
                updateSermonTimerDisplay();
            }, 1000);
        }
    }

    function resetSermonTimer() {
        clearInterval(sermonTimerInterval);
        sermonTimerRunning = false;
        sermonTimerSeconds = 0;
        dom.btnSermonTimerToggle.textContent = '▶️ Iniciar';
        updateSermonTimerDisplay();
    }

    function updateSermonTimerDisplay() {
        const mins = Math.floor(sermonTimerSeconds / 60);
        const secs = sermonTimerSeconds % 60;
        const formatted = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
        dom.sermonTimerDisplay.textContent = formatted;

        if (sermonTimerTarget > 0 && (sermonTimerTarget - sermonTimerSeconds <= 300) && (sermonTimerSeconds < sermonTimerTarget)) {
            dom.sermonTimerDisplay.classList.add('timer-warning');
        } else {
            dom.sermonTimerDisplay.classList.remove('timer-warning');
        }
    }

    // ---- View Sermon Modal ----
    function openViewSermonModal(id) {
        const item = state.freeNotes.find(n => n.id === id);
        if (!item) return;

        dom.viewSermonTitle.textContent = item.title || 'Prédica Sin Título';
        dom.viewSermonDate.textContent = item.date ? `Fecha: ${item.date}` : '';
        dom.viewSermonTagBadge.textContent = item.tag ? `Etiqueta: ${item.tag}` : '';
        dom.viewSermonContent.innerHTML = sanitizeHtml(item.content || '<p><i>Sin contenido registrado.</i></p>');

        let linkedHtml = '';
        if (item.linkedVerses && item.linkedVerses.length > 0) {
            linkedHtml = `<div style="font-weight: 700; font-size: 0.85rem; color: var(--gold-400); margin-bottom: 0.5rem;">Pasajes Relacionados:</div><div class="note-linked-verses">`;
            for (const ref of item.linkedVerses) {
                linkedHtml += `<span class="linked-verse-pill" data-ref="${escapeHtml(ref)}">📖 ${escapeHtml(ref)}</span>`;
            }
            linkedHtml += `</div>`;
        }
        dom.viewSermonLinkedVerses.innerHTML = linkedHtml;

        dom.viewSermonEditBtn.dataset.id = item.id;
        resetSermonTimer();
        dom.viewSermonModal.classList.remove('hidden');
    }

    function closeViewSermonModal() {
        resetSermonTimer();
        dom.viewSermonModal.classList.add('hidden');
    }

    // ---- Verse Image Generator (HTML5 Canvas) ----
    function openVerseImageModal(verseIndex) {
        const books = state.bibleData[state.currentVersion];
        if (!books) return;

        const bookName = getCanonicalBookName(state.currentBookIndex);
        const verseText = books[state.currentBookIndex].chapters[state.currentChapter][verseIndex];
        const refStr = `${bookName} ${state.currentChapter + 1}:${verseIndex + 1} (${BIBLE_VERSIONS[state.currentVersion].name.split(' ')[0]})`;

        currentTargetVerseData = {
            text: verseText,
            ref: refStr
        };

        renderVerseCanvas(selectedImageCardBg);
        dom.verseImageModal.classList.remove('hidden');
    }

    // Preload Corazon SVG icon for verse card canvas
    const heartCrossImg = new Image();
    heartCrossImg.src = 'corazon.svg';

    function renderVerseCanvas(bgStyle) {
        if (!currentTargetVerseData || !dom.verseCanvas) return;

        const canvas = dom.verseCanvas;
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;

        // Background Styles
        if (bgStyle === 'gold') {
            const grad = ctx.createLinearGradient(0, 0, width, height);
            grad.addColorStop(0, '#1E1B18');
            grad.addColorStop(1, '#4A3B2C');
            ctx.fillStyle = grad;
        } else if (bgStyle === 'soft') {
            const grad = ctx.createLinearGradient(0, 0, width, height);
            grad.addColorStop(0, '#2C221E');
            grad.addColorStop(1, '#1A1412');
            ctx.fillStyle = grad;
        } else if (bgStyle === 'neon') {
            const grad = ctx.createLinearGradient(0, 0, width, height);
            grad.addColorStop(0, '#110C24');
            grad.addColorStop(1, '#2E1065');
            ctx.fillStyle = grad;
        } else { // Dark
            const grad = ctx.createLinearGradient(0, 0, width, height);
            grad.addColorStop(0, '#0B0F19');
            grad.addColorStop(1, '#1E293B');
            ctx.fillStyle = grad;
        }
        ctx.fillRect(0, 0, width, height);

        // Gold Decorative Border
        ctx.strokeStyle = '#FBBF24';
        ctx.lineWidth = 4;
        ctx.strokeRect(30, 30, width - 60, height - 60);

        // Inner frame
        ctx.strokeStyle = 'rgba(251, 191, 36, 0.3)';
        ctx.lineWidth = 1;
        ctx.strokeRect(40, 40, width - 80, height - 80);

        // Draw Heart-Cross Icon (corazon.svg)
        if (heartCrossImg.complete && heartCrossImg.naturalWidth !== 0) {
            const iconSize = 64;
            ctx.drawImage(heartCrossImg, (width / 2) - (iconSize / 2), 65, iconSize, iconSize);
        } else {
            heartCrossImg.onload = () => renderVerseCanvas(bgStyle);
        }

        // Quote Icon / Flame Symbol
        ctx.fillStyle = '#FBBF24';
        ctx.font = '700 24px "Cinzel", serif';
        ctx.textAlign = 'center';
        ctx.fillText('TORCHBOOK', width / 2, 155);

        // Verse Text Wrapping
        ctx.fillStyle = '#FFFFFF';
        ctx.font = '500 22px "Lora", serif';
        ctx.textAlign = 'center';

        const words = currentTargetVerseData.text.split(' ');
        let line = '';
        let lines = [];
        const maxWidth = width - 120;

        for (let n = 0; n < words.length; n++) {
            const testLine = line + words[n] + ' ';
            const metrics = ctx.measureText(testLine);
            if (metrics.width > maxWidth && n > 0) {
                lines.push(line);
                line = words[n] + ' ';
            } else {
                line = testLine;
            }
        }
        lines.push(line);

        let startY = (height / 2) - ((lines.length * 32) / 2);
        for (let i = 0; i < lines.length; i++) {
            ctx.fillText(`"${lines[i].trim()}"`, width / 2, startY + (i * 34));
        }

        // Reference
        ctx.fillStyle = '#FBBF24';
        ctx.font = '700 20px "Cinzel", serif';
        ctx.fillText(`— ${currentTargetVerseData.ref}`, width / 2, height - 80);
    }

    function downloadVerseImage() {
        if (!dom.verseCanvas) return;
        const link = document.createElement('a');
        link.download = `Torchbook_Versiculo_${Date.now()}.png`;
        link.href = dom.verseCanvas.toDataURL('image/png');
        link.click();
        showToast('🖼️ Imagen de versículo descargada');
    }

    // ---- Theological Dictionary Logic ----
    function openDictionaryModal() {
        renderDictionary();
        dom.dictionaryModal.classList.remove('hidden');
    }

    function renderDictionary(query = '') {
        const q = query.trim().toLowerCase();
        let terms = DICTIONARY_TERMS;

        if (q) {
            terms = DICTIONARY_TERMS.filter(t => 
                t.term.toLowerCase().includes(q) || 
                t.def.toLowerCase().includes(q) || 
                t.origin.toLowerCase().includes(q)
            );
        }

        // Render Quick Chips
        let chipsHtml = '';
        DICTIONARY_TERMS.slice(0, 10).forEach(item => {
            chipsHtml += `<button class="category-chip" data-dict-term="${escapeHtml(item.term)}">${escapeHtml(item.term)}</button>`;
        });
        dom.dictQuickChips.innerHTML = chipsHtml;

        // Render Definitions
        if (terms.length === 0) {
            dom.dictResultsContainer.innerHTML = '<div class="empty-notes-state"><p>No se encontraron conceptos para esa búsqueda.</p></div>';
            return;
        }

        let html = '';
        terms.forEach(item => {
            html += `
                <div class="dict-item-card">
                    <div class="dict-term-title">
                        <span>${escapeHtml(item.term)}</span>
                        <span class="dict-term-origin">${escapeHtml(item.origin)}</span>
                    </div>
                    <div class="dict-definition-body">${escapeHtml(item.def)}</div>
                </div>
            `;
        });
        dom.dictResultsContainer.innerHTML = html;
    }

    // ---- Reading Plans Logic ----
    function openReadingPlansModal(planId = 'plan_evangelios') {
        renderReadingPlan(planId);
        dom.readingPlansModal.classList.remove('hidden');
    }

    function renderReadingPlan(planId) {
        const plan = READING_PLANS[planId];
        if (!plan) return;

        // Update tabs active state
        dom.tabPlanEvangelios.classList.toggle('active', planId === 'plan_evangelios');
        dom.tabPlanSabiduria.classList.toggle('active', planId === 'plan_sabiduria');
        dom.tabPlanAnual.classList.toggle('active', planId === 'plan_anual');

        let completedCount = 0;
        let html = '';

        plan.items.forEach(item => {
            const key = `${planId}:${item.id}`;
            const isDone = !!state.readingPlanState[key];
            if (isDone) completedCount++;

            html += `
                <div class="plan-item-row ${isDone ? 'completed' : ''}" data-plan-key="${key}" data-passage="${escapeHtml(item.passage)}">
                    <input type="checkbox" class="plan-checkbox" ${isDone ? 'checked' : ''}>
                    <span class="plan-item-text">${escapeHtml(item.title)}</span>
                    <button class="card-action-btn btn-jump-plan" data-passage="${escapeHtml(item.passage)}" style="margin-left: auto;">
                        📖 Ir al Pasaje
                    </button>
                </div>
            `;
        });

        const percent = Math.round((completedCount / plan.items.length) * 100) || 0;
        dom.planProgressText.textContent = `Progreso: ${percent}%`;
        dom.planProgressCounts.textContent = `${completedCount} / ${plan.items.length} lecturas`;
        dom.planProgressBar.style.width = `${percent}%`;
        dom.planChecklist.innerHTML = html;
    }

    function toggleReadingPlanItem(key) {
        state.readingPlanState[key] = !state.readingPlanState[key];
        saveReadingPlanState();
        const planId = key.split(':')[0];
        renderReadingPlan(planId);
        showToast(state.readingPlanState[key] ? '✅ Lectura completada' : 'Lectura desmarcada');
    }

    // ---- Pin / Unpin Helpers ----
    function togglePinVerseNote(key) {
        if (!state.notes[key]) return;
        if (typeof state.notes[key] === 'string') {
            state.notes[key] = { text: state.notes[key], pinned: true, date: new Date().toLocaleDateString() };
        } else {
            state.notes[key].pinned = !state.notes[key].pinned;
        }
        saveVerseNotes();
        showToast(state.notes[key].pinned ? '📌 Nota fijada al inicio' : 'Nota desfijada');
    }

    function togglePinFreeNote(id) {
        const item = state.freeNotes.find(n => n.id === id);
        if (!item) return;
        item.pinned = !item.pinned;
        saveFreeNotes();
        showToast(item.pinned ? '📌 Prédica fijada al inicio' : 'Prédica desfijada');
    }

    // ---- Free Note Modal Handlers ----
    function openFreeNoteModal(freeNoteId = null) {
        currentFreeNoteId = freeNoteId;
        currentLinkedVerses = [];

        if (freeNoteId) {
            const item = state.freeNotes.find(n => n.id === freeNoteId);
            if (item) {
                dom.freeNoteModalTitle.textContent = 'Editar Prédica / Nota Libre';
                dom.freeNoteTitle.value = item.title || '';
                dom.freeNoteTagsInput.value = item.tag || '';
                dom.freeNoteEditor.innerHTML = item.content || '';
                currentLinkedVerses = [...(item.linkedVerses || [])];
            }
        } else {
            dom.freeNoteModalTitle.textContent = 'Nueva Prédica / Nota Libre';
            dom.freeNoteTitle.value = '';
            dom.freeNoteTagsInput.value = '';
            dom.freeNoteEditor.innerHTML = '';
            currentLinkedVerses = [];
        }

        renderLinkedVerseTags();
        dom.freeNoteModal.classList.remove('hidden');
        setTimeout(() => dom.freeNoteTitle.focus(), 100);
    }

    function closeFreeNoteModal() {
        dom.freeNoteModal.classList.add('hidden');
        currentFreeNoteId = null;
        currentLinkedVerses = [];
    }

    function renderLinkedVerseTags() {
        if (currentLinkedVerses.length === 0) {
            dom.linkedVersesTags.innerHTML = '<span style="font-size: 0.775rem; color: var(--text-dark);">No hay versículos relacionados todavía.</span>';
            return;
        }

        let html = '';
        currentLinkedVerses.forEach((ref, index) => {
            html += `
                <span class="linked-tag">
                    📖 ${escapeHtml(ref)}
                    <span class="linked-tag-remove" data-index="${index}">✕</span>
                </span>
            `;
        });
        dom.linkedVersesTags.innerHTML = html;
    }

    function addLinkedVerseFromInput() {
        const inputVal = dom.linkVerseInput.value.trim();
        if (!inputVal) return;

        const parsed = parsePassageReference(inputVal);
        const formattedRef = parsed ? parsed.displayRef : inputVal;

        if (!currentLinkedVerses.includes(formattedRef)) {
            currentLinkedVerses.push(formattedRef);
            renderLinkedVerseTags();
            showToast(`Pasaje "${formattedRef}" vinculado a la prédica`);
        }
        dom.linkVerseInput.value = '';
    }

    function saveFreeNote() {
        const title = dom.freeNoteTitle.value.trim();
        const tag = dom.freeNoteTagsInput.value.trim();
        const content = dom.freeNoteEditor.innerHTML.trim();

        if (!title && !content) {
            showToast('Ingresa un título o contenido para la prédica');
            return;
        }

        if (currentFreeNoteId) {
            const index = state.freeNotes.findIndex(n => n.id === currentFreeNoteId);
            if (index !== -1) {
                state.freeNotes[index].title = title;
                state.freeNotes[index].tag = tag;
                state.freeNotes[index].content = content;
                state.freeNotes[index].linkedVerses = [...currentLinkedVerses];
                state.freeNotes[index].updatedAt = new Date().toLocaleDateString();
            }
            showToast('Prédica actualizada correctamente');
        } else {
            const newNote = {
                id: 'fn_' + Date.now(),
                title: title || 'Prédica Sin Título',
                tag: tag,
                content: content,
                pinned: false,
                linkedVerses: [...currentLinkedVerses],
                date: new Date().toLocaleDateString(),
            };
            state.freeNotes.unshift(newNote);
            showToast('🎙️ Prédica guardada en tu cuaderno');
        }

        saveFreeNotes();
        closeFreeNoteModal();
        renderVerses();
    }

    function deleteFreeNote(id) {
        if (!confirm('¿Seguro que deseas eliminar esta prédica?')) return;
        state.freeNotes = state.freeNotes.filter(n => n.id !== id);
        saveFreeNotes();
        renderVerses();
        showToast('Prédica eliminada');
    }

    // ---- Jump To Reference ----
    function jumpToReference(refString) {
        const parsed = parsePassageReference(refString);
        if (parsed) {
            if (parsed.bookIndex < OLD_TESTAMENT_COUNT) {
                state.testament = 'old';
                dom.tabOld.classList.add('active');
                dom.tabNew.classList.remove('active');
            } else {
                state.testament = 'new';
                dom.tabNew.classList.add('active');
                dom.tabOld.classList.remove('active');
            }

            navigateToChapter(parsed.bookIndex, parsed.chapter);

            if (parsed.verse !== null) {
                setTimeout(() => {
                    const verseEl = document.getElementById(`verse-${parsed.verse}`);
                    if (verseEl) {
                        verseEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        verseEl.classList.add('highlighted');
                        setTimeout(() => verseEl.classList.remove('highlighted'), 2500);
                    }
                }, 200);
            }
            return;
        }

        performSearch(refString);
        setTimeout(() => {
            const firstResult = dom.searchResults.querySelector('.search-result-item');
            if (firstResult) {
                firstResult.click();
            } else {
                showToast(`No se encontró el pasaje: "${refString}"`);
            }
        }, 100);
    }

    // ---- Navigation ----
    function navigateToChapter(bookIndex, chapter) {
        state.currentBookIndex = bookIndex;
        state.currentChapter = chapter;
        state.openBooks.add(bookIndex);

        renderBooks();
        renderVerses();

        const bookEl = document.getElementById(`book-item-${bookIndex}`);
        if (bookEl) {
            bookEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }

    function navigatePrevChapter() {
        const books = state.bibleData[state.currentVersion];
        if (!books) return;

        let bookIdx = state.currentBookIndex;
        let chapIdx = state.currentChapter - 1;

        if (chapIdx < 0) {
            bookIdx--;
            if (bookIdx < 0) return;
            chapIdx = books[bookIdx].chapters.length - 1;
        }

        navigateToChapter(bookIdx, chapIdx);
    }

    function navigateNextChapter() {
        const books = state.bibleData[state.currentVersion];
        if (!books) return;

        let bookIdx = state.currentBookIndex;
        let chapIdx = state.currentChapter + 1;

        if (chapIdx >= books[bookIdx].chapters.length) {
            bookIdx++;
            if (bookIdx >= books.length) return;
            chapIdx = 0;
        }

        navigateToChapter(bookIdx, chapIdx);
    }

    // ---- Search ----
    function performSearch(query) {
        if (!query || query.trim().length < 2) {
            dom.searchResults.classList.remove('active');
            return;
        }

        const books = state.bibleData[state.currentVersion];
        if (!books) return;

        const results = [];
        const q = query.trim().toLowerCase();

        const parsed = parsePassageReference(query);
        if (parsed && parsed.bookIndex < books.length) {
            const book = books[parsed.bookIndex];
            if (parsed.chapter >= 0 && parsed.chapter < book.chapters.length) {
                const chapter = book.chapters[parsed.chapter];
                if (parsed.verse !== null && parsed.verse >= 0 && parsed.verse < chapter.length) {
                    results.push({
                        bookIndex: parsed.bookIndex,
                        chapter: parsed.chapter,
                        verse: parsed.verse,
                        bookName: getCanonicalBookName(parsed.bookIndex),
                        text: chapter[parsed.verse],
                    });
                }
            }
        }

        if (results.length === 0 && q.length >= 2) {
            for (let b = 0; b < books.length && results.length < 25; b++) {
                const book = books[b];
                const canonicalName = getCanonicalBookName(b);
                for (let c = 0; c < book.chapters.length && results.length < 25; c++) {
                    const chapter = book.chapters[c];
                    for (let v = 0; v < chapter.length && results.length < 25; v++) {
                        if (chapter[v].toLowerCase().includes(q)) {
                            results.push({
                                bookIndex: b,
                                chapter: c,
                                verse: v,
                                bookName: canonicalName,
                                text: chapter[v],
                            });
                        }
                    }
                }
            }
        }

        renderSearchResults(results);
    }

    function renderSearchResults(results) {
        if (results.length === 0) {
            dom.searchResults.innerHTML = '<div class="search-result-item"><span class="search-result-text">Sin coincidencias encontradas.</span></div>';
            dom.searchResults.classList.add('active');
            return;
        }

        let html = '';
        for (const r of results) {
            html += `
                <div class="search-result-item" data-book="${r.bookIndex}" data-chapter="${r.chapter}" data-verse="${r.verse}">
                    <div class="search-result-ref">📖 ${r.bookName} ${r.chapter + 1}:${r.verse + 1}</div>
                    <div class="search-result-text">${escapeHtml(r.text)}</div>
                </div>
            `;
        }

        dom.searchResults.innerHTML = html;
        dom.searchResults.classList.add('active');
    }

    // ---- Verse Note Modal ----
    function openNoteModal(verseIndex) {
        const books = state.bibleData[state.currentVersion];
        if (!books) return;

        const book = books[state.currentBookIndex];
        const chapter = book.chapters[state.currentChapter];
        const verseText = chapter[verseIndex];
        const bookName = getCanonicalBookName(state.currentBookIndex);
        const noteKey = getNoteKey(state.currentBookIndex, state.currentChapter, verseIndex);
        const existingNoteObj = state.notes[noteKey];
        const existingText = getNoteText(existingNoteObj);

        editingNoteKey = noteKey;

        dom.modalTitle.textContent = existingText ? 'Editar Nota de Versículo' : 'Comentar Versículo';
        dom.modalVersePreview.textContent = `${bookName} ${state.currentChapter + 1}:${verseIndex + 1} — "${verseText}"`;
        dom.verseNoteEditor.innerHTML = existingText;

        dom.noteModal.classList.remove('hidden');
        setTimeout(() => dom.verseNoteEditor.focus(), 100);
    }

    function closeNoteModal() {
        dom.noteModal.classList.add('hidden');
        editingNoteKey = null;
    }

    function saveVerseNote() {
        if (!editingNoteKey) return;

        const text = dom.verseNoteEditor.innerHTML.trim();
        if (text && text !== '<br>') {
            const isPinned = isNotePinned(state.notes[editingNoteKey]);
            state.notes[editingNoteKey] = {
                text,
                pinned: isPinned,
                date: new Date().toLocaleDateString(),
            };
            showToast('Nota guardada correctamente');
        } else {
            delete state.notes[editingNoteKey];
            showToast('Nota eliminada');
        }

        saveVerseNotes();
        closeNoteModal();
        renderVerses();
    }

    function deleteVerseNote(noteKey) {
        if (!noteKey) return;
        delete state.notes[noteKey];
        saveVerseNotes();
        renderVerses();
        showToast('Nota eliminada');
    }

    // ---- Copy Verse ----
    function copyVerseToClipboard(verseIndex) {
        const books = state.bibleData[state.currentVersion];
        if (!books) return;

        const book = books[state.currentBookIndex];
        const verseText = book.chapters[state.currentChapter][verseIndex];
        const bookName = getCanonicalBookName(state.currentBookIndex);
        const formatted = `"${verseText}" — ${bookName} ${state.currentChapter + 1}:${verseIndex + 1} (${BIBLE_VERSIONS[state.currentVersion].name})`;

        navigator.clipboard.writeText(formatted).then(() => {
            showToast('📋 Versículo copiado al portapapeles');
        }).catch(err => {
            console.error('Error copying:', err);
        });
    }

    // ---- Backup & Restore (USB / File Export & Import) ----
    function exportBackupData() {
        const backupData = {
            appName: 'Torchbook',
            version: '5.0',
            exportedAt: new Date().toISOString(),
            dateFormatted: new Date().toLocaleDateString(),
            notes: state.notes,
            freeNotes: state.freeNotes,
            highlights: state.highlights,
            favorites: [...state.favorites],
            readingPlanState: state.readingPlanState,
            theme: state.theme
        };

        const jsonString = JSON.stringify(backupData, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const dateStr = new Date().toISOString().slice(0, 10);
        const fileName = `Torchbook_CopiaSeguridad_${dateStr}.json`;

        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        showToast('💾 Copia descargada. ¡Puedes guardarla en tu USB!');
    }

    function importBackupData(file) {
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const imported = JSON.parse(e.target.result);

                if (!imported || (typeof imported !== 'object')) {
                    showToast('Error: El archivo no tiene un formato válido.');
                    return;
                }

                const sermonCount = imported.freeNotes ? imported.freeNotes.length : 0;
                const verseNoteCount = imported.notes ? Object.keys(imported.notes).length : 0;
                const totalItems = sermonCount + verseNoteCount;

                if (!confirm(`Se han encontrado ${sermonCount} prédicas y ${verseNoteCount} notas en la copia.\n\n¿Deseas restaurar esta copia de seguridad en Torchbook?`)) {
                    return;
                }

                if (imported.notes) state.notes = imported.notes;
                if (imported.freeNotes) state.freeNotes = imported.freeNotes;
                if (imported.highlights) state.highlights = imported.highlights;
                if (imported.favorites) state.favorites = new Set(imported.favorites);
                if (imported.readingPlanState) state.readingPlanState = imported.readingPlanState;
                if (imported.theme) applyTheme(imported.theme);

                saveVerseNotes();
                saveFreeNotes();
                saveHighlights();
                saveFavorites();
                saveReadingPlanState();

                renderNotebookDrawer();
                if (state.currentBookIndex >= 0 && state.currentChapter >= 0) {
                    renderVerses();
                }

                showToast(`🎉 Restauradas ${totalItems} notas/prédicas exitosamente.`);
            } catch (err) {
                console.error('Error al importar copia:', err);
                showToast('Error al leer el archivo de copia de seguridad.');
            }
        };
        reader.readAsText(file);
    }

    // ---- Toast ----
    function showToast(message) {
        dom.toastMessage.textContent = message;
        dom.toast.classList.remove('hidden');
        dom.toast.offsetHeight;
        dom.toast.classList.add('show');

        setTimeout(() => {
            dom.toast.classList.remove('show');
            setTimeout(() => dom.toast.classList.add('hidden'), 300);
        }, 2400);
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    function sanitizeHtml(htmlStr) {
        if (!htmlStr) return '';
        if (!/<[a-z][\s\S]*>/i.test(htmlStr)) {
            return escapeHtml(htmlStr).replace(/\n/g, '<br>');
        }
        const temp = document.createElement('div');
        temp.innerHTML = htmlStr;
        const allowed = ['B', 'I', 'U', 'STRONG', 'EM', 'H2', 'H3', 'P', 'BR', 'UL', 'OL', 'LI', 'SPAN', 'DIV', 'SMALL'];
        
        function clean(node) {
            const children = Array.from(node.childNodes);
            for (const child of children) {
                if (child.nodeType === Node.ELEMENT_NODE) {
                    if (!allowed.includes(child.nodeName)) {
                        const text = document.createTextNode(child.textContent);
                        node.replaceChild(text, child);
                    } else {
                        const textAlign = child.style ? child.style.textAlign : '';
                        for (const attr of Array.from(child.attributes)) {
                            if (attr.name !== 'style') child.removeAttribute(attr.name);
                        }
                        if (textAlign) child.style.textAlign = textAlign;
                        clean(child);
                    }
                }
            }
        }
        clean(temp);
        return temp.innerHTML;
    }

    let searchTimeout = null;

    // ---- Event Binding ----
    function bindEvents() {
        // Audio Bible Toggle
        if (dom.btnAudioBible) {
            dom.btnAudioBible.addEventListener('click', toggleAudioBible);
        }

        // Dictionary Modal Toggle
        if (dom.btnOpenDictionary) {
            dom.btnOpenDictionary.addEventListener('click', openDictionaryModal);
        }
        if (dom.dictionaryModalClose) dom.dictionaryModalClose.addEventListener('click', () => dom.dictionaryModal.classList.add('hidden'));
        if (dom.dictionaryModalCloseBtn) dom.dictionaryModalCloseBtn.addEventListener('click', () => dom.dictionaryModal.classList.add('hidden'));

        if (dom.dictSearchInput) {
            dom.dictSearchInput.addEventListener('input', (e) => renderDictionary(e.target.value));
        }

        if (dom.dictQuickChips) {
            dom.dictQuickChips.addEventListener('click', (e) => {
                const chip = e.target.closest('.category-chip');
                if (chip && chip.dataset.dictTerm) {
                    dom.dictSearchInput.value = chip.dataset.dictTerm;
                    renderDictionary(chip.dataset.dictTerm);
                }
            });
        }

        // Reading Plans Modal Toggle
        if (dom.btnOpenReadingPlans) {
            dom.btnOpenReadingPlans.addEventListener('click', () => openReadingPlansModal('plan_evangelios'));
        }
        if (dom.readingPlansModalClose) dom.readingPlansModalClose.addEventListener('click', () => dom.readingPlansModal.classList.add('hidden'));
        if (dom.readingPlansModalCloseBtn) dom.readingPlansModalCloseBtn.addEventListener('click', () => dom.readingPlansModal.classList.add('hidden'));

        if (dom.tabPlanEvangelios) dom.tabPlanEvangelios.addEventListener('click', () => renderReadingPlan('plan_evangelios'));
        if (dom.tabPlanSabiduria) dom.tabPlanSabiduria.addEventListener('click', () => renderReadingPlan('plan_sabiduria'));
        if (dom.tabPlanAnual) dom.tabPlanAnual.addEventListener('click', () => renderReadingPlan('plan_anual'));

        if (dom.planChecklist) {
            dom.planChecklist.addEventListener('click', (e) => {
                const jumpBtn = e.target.closest('.btn-jump-plan');
                if (jumpBtn) {
                    const passage = jumpBtn.dataset.passage;
                    dom.readingPlansModal.classList.add('hidden');
                    jumpToReference(passage);
                    return;
                }

                const row = e.target.closest('.plan-item-row');
                if (row && row.dataset.planKey) {
                    toggleReadingPlanItem(row.dataset.planKey);
                }
            });
        }

        // Pulpit Sermon Timer Controls
        if (dom.btnSermonTimerToggle) dom.btnSermonTimerToggle.addEventListener('click', toggleSermonTimer);
        if (dom.btnSermonTimerReset) dom.btnSermonTimerReset.addEventListener('click', resetSermonTimer);
        if (dom.sermonTimerPreset) {
            dom.sermonTimerPreset.addEventListener('change', (e) => {
                sermonTimerTarget = parseInt(e.target.value) || 1800;
                updateSermonTimerDisplay();
            });
        }

        // Verse Image Card Generator Controls
        if (dom.verseImageModalClose) dom.verseImageModalClose.addEventListener('click', () => dom.verseImageModal.classList.add('hidden'));
        if (dom.verseImageModalCancel) dom.verseImageModalCancel.addEventListener('click', () => dom.verseImageModal.classList.add('hidden'));
        if (dom.btnDownloadVerseImage) dom.btnDownloadVerseImage.addEventListener('click', downloadVerseImage);

        document.querySelectorAll('.image-style-chips .category-chip').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.image-style-chips .category-chip').forEach(c => c.classList.remove('active'));
                btn.classList.add('active');
                selectedImageCardBg = btn.dataset.bgStyle;
                renderVerseCanvas(selectedImageCardBg);
            });
        });

        // Backup / Restore Buttons
        if (dom.btnExportBackup) {
            dom.btnExportBackup.addEventListener('click', exportBackupData);
        }

        if (dom.btnImportBackup && dom.importBackupFile) {
            dom.btnImportBackup.addEventListener('click', () => {
                dom.importBackupFile.value = '';
                dom.importBackupFile.click();
            });

            dom.importBackupFile.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (file) {
                    importBackupData(file);
                }
            });
        }

        // Parallel mode toggle button
        if (dom.parallelToggle) {
            dom.parallelToggle.addEventListener('click', async () => {
                state.parallelMode = !state.parallelMode;
                dom.parallelToggle.classList.toggle('active', state.parallelMode);
                dom.parallelVersionWrapper.classList.toggle('hidden', !state.parallelMode);

                if (state.parallelMode && !state.bibleData[state.parallelVersion]) {
                    showToast('Cargando traducción secundaria...');
                    await loadBibleVersion(state.parallelVersion);
                }

                renderVerses();
                showToast(state.parallelMode ? '📑 Modo Paralelo Activado' : 'Modo Vista Individual');
            });
        }

        if (dom.parallelVersionSelect) {
            dom.parallelVersionSelect.addEventListener('change', async (e) => {
                state.parallelVersion = e.target.value;
                if (!state.bibleData[state.parallelVersion]) {
                    showToast('Cargando versión secundaria...');
                    await loadBibleVersion(state.parallelVersion);
                }
                renderVerses();
            });
        }

        // Logo return home
        dom.logoBtn.addEventListener('click', () => {
            dom.readingArea.classList.add('hidden');
            dom.welcomeScreen.classList.remove('hidden');
        });

        // Sidebar toggle
        dom.sidebarToggle.addEventListener('click', () => {
            state.sidebarCollapsed = !state.sidebarCollapsed;
            dom.sidebar.classList.toggle('collapsed', state.sidebarCollapsed);
        });

        // Notebook drawer toggle
        dom.notebookToggle.addEventListener('click', () => {
            state.notebookCollapsed = !state.notebookCollapsed;
            dom.notebookDrawer.classList.toggle('collapsed', state.notebookCollapsed);
            if (!state.notebookCollapsed) {
                renderNotebookDrawer();
            }
        });

        dom.notebookClose.addEventListener('click', () => {
            state.notebookCollapsed = true;
            dom.notebookDrawer.classList.add('collapsed');
        });

        // Theme Switcher Events
        if (dom.themeMenuBtn) {
            dom.themeMenuBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                dom.themeDropdownMenu.classList.toggle('hidden');
            });
        }

        if (dom.themeDropdownMenu) {
            dom.themeDropdownMenu.addEventListener('click', (e) => {
                const opt = e.target.closest('.theme-option');
                if (opt) {
                    const theme = opt.dataset.theme;
                    applyTheme(theme);
                    dom.themeDropdownMenu.classList.add('hidden');
                    
                    const themeNames = {
                        dark: '🌙 Estilo Oscuro',
                        light: '☀️ Estilo Claro',
                        soft: '🌿 Estilo Suave (Sepia)',
                        unicolor: '🎨 Estilo Unicolor',
                        vibrant: '🔥 Estilo Llamativo (Neón)'
                    };
                    showToast(`Estilo aplicado: ${themeNames[theme] || theme}`);
                }
            });
        }

        document.addEventListener('click', (e) => {
            if (dom.themeDropdownMenu && !dom.themeDropdownMenu.contains(e.target) && !dom.themeMenuBtn.contains(e.target)) {
                dom.themeDropdownMenu.classList.add('hidden');
            }
        });

        // New Free Note / Sermon Button
        dom.btnNewFreeNote.addEventListener('click', () => openFreeNoteModal(null));

        // Notebook Tabs Filter
        dom.tabNotesAll.addEventListener('click', () => {
            state.notebookTab = 'all';
            dom.tabNotesAll.classList.add('active');
            dom.tabNotesPredicas.classList.remove('active');
            dom.tabNotesVerses.classList.remove('active');
            if (dom.tabNotesFavorites) dom.tabNotesFavorites.classList.remove('active');
            renderNotebookDrawer();
        });

        dom.tabNotesPredicas.addEventListener('click', () => {
            state.notebookTab = 'predicas';
            dom.tabNotesPredicas.classList.add('active');
            dom.tabNotesAll.classList.remove('active');
            dom.tabNotesVerses.classList.remove('active');
            if (dom.tabNotesFavorites) dom.tabNotesFavorites.classList.remove('active');
            renderNotebookDrawer();
        });

        dom.tabNotesVerses.addEventListener('click', () => {
            state.notebookTab = 'verses';
            dom.tabNotesVerses.classList.add('active');
            dom.tabNotesAll.classList.remove('active');
            dom.tabNotesPredicas.classList.remove('active');
            if (dom.tabNotesFavorites) dom.tabNotesFavorites.classList.remove('active');
            renderNotebookDrawer();
        });

        if (dom.tabNotesFavorites) {
            dom.tabNotesFavorites.addEventListener('click', () => {
                state.notebookTab = 'favorites';
                dom.tabNotesFavorites.classList.add('active');
                dom.tabNotesAll.classList.remove('active');
                dom.tabNotesPredicas.classList.remove('active');
                dom.tabNotesVerses.classList.remove('active');
                renderNotebookDrawer();
            });
        }

        // Category Chips Bar Handler
        if (dom.categoryChipsBar) {
            dom.categoryChipsBar.addEventListener('click', (e) => {
                const chip = e.target.closest('.category-chip');
                if (chip) {
                    state.selectedTag = chip.dataset.tag;
                    dom.categoryChipsBar.querySelectorAll('.category-chip').forEach(c => c.classList.remove('active'));
                    chip.classList.add('active');
                    renderNotebookDrawer();
                }
            });
        }

        dom.notesSearchInput.addEventListener('input', (e) => {
            renderNotebookDrawer(e.target.value);
        });

        // Notebook Cards Delegation (View, Pin, Edit, Delete, Jump, Linked Pills)
        dom.notebookNotesList.addEventListener('click', (e) => {
            const pill = e.target.closest('.linked-verse-pill');
            if (pill) {
                const ref = pill.dataset.ref;
                closeViewSermonModal();
                jumpToReference(ref);
                return;
            }

            const viewFreeBtn = e.target.closest('.btn-view-free');
            if (viewFreeBtn) {
                openViewSermonModal(viewFreeBtn.dataset.id);
                return;
            }

            const pinVerseBtn = e.target.closest('.btn-pin-verse');
            if (pinVerseBtn) {
                togglePinVerseNote(pinVerseBtn.dataset.key);
                return;
            }

            const editVerseBtn = e.target.closest('.btn-edit-verse');
            if (editVerseBtn) {
                const bIdx = parseInt(editVerseBtn.dataset.book);
                const cIdx = parseInt(editVerseBtn.dataset.chapter);
                const vIdx = parseInt(editVerseBtn.dataset.verse);
                navigateToChapter(bIdx, cIdx);
                openNoteModal(vIdx);
                return;
            }

            const deleteVerseBtn = e.target.closest('.btn-delete-verse');
            if (deleteVerseBtn) {
                deleteVerseNote(deleteVerseBtn.dataset.key);
                return;
            }

            const jumpVerseBtn = e.target.closest('.btn-jump-verse');
            if (jumpVerseBtn) {
                const bIdx = parseInt(jumpVerseBtn.dataset.book);
                const cIdx = parseInt(jumpVerseBtn.dataset.chapter);
                const vIdx = parseInt(jumpVerseBtn.dataset.verse);
                navigateToChapter(bIdx, cIdx);
                setTimeout(() => {
                    const verseEl = document.getElementById(`verse-${vIdx}`);
                    if (verseEl) {
                        verseEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        verseEl.classList.add('highlighted');
                        setTimeout(() => verseEl.classList.remove('highlighted'), 2500);
                    }
                }, 200);
                return;
            }

            const pinFreeBtn = e.target.closest('.btn-pin-free');
            if (pinFreeBtn) {
                togglePinFreeNote(pinFreeBtn.dataset.id);
                return;
            }

            const editFreeBtn = e.target.closest('.btn-edit-free');
            if (editFreeBtn) {
                openFreeNoteModal(editFreeBtn.dataset.id);
                return;
            }

            const deleteFreeBtn = e.target.closest('.btn-delete-free');
            if (deleteFreeBtn) {
                deleteFreeNote(deleteFreeBtn.dataset.id);
                return;
            }
        });

        // View Sermon Modal events (Print / PDF, Edit, Close)
        if (dom.viewSermonClose) dom.viewSermonClose.addEventListener('click', closeViewSermonModal);
        if (dom.viewSermonCloseBtn) dom.viewSermonCloseBtn.addEventListener('click', closeViewSermonModal);
        if (dom.viewSermonEditBtn) {
            dom.viewSermonEditBtn.addEventListener('click', () => {
                const id = dom.viewSermonEditBtn.dataset.id;
                closeViewSermonModal();
                openFreeNoteModal(id);
            });
        }
        if (dom.viewSermonPrintBtn) {
            dom.viewSermonPrintBtn.addEventListener('click', () => {
                window.print();
            });
        }

        if (dom.viewSermonLinkedVerses) {
            dom.viewSermonLinkedVerses.addEventListener('click', (e) => {
                const pill = e.target.closest('.linked-verse-pill');
                if (pill) {
                    const ref = pill.dataset.ref;
                    closeViewSermonModal();
                    jumpToReference(ref);
                }
            });
        }

        // Footer Modal Events
        if (dom.btnAboutMe) dom.btnAboutMe.addEventListener('click', () => dom.aboutModal.classList.remove('hidden'));
        if (dom.aboutModalClose) dom.aboutModalClose.addEventListener('click', () => dom.aboutModal.classList.add('hidden'));
        if (dom.aboutModalCloseBtn) dom.aboutModalCloseBtn.addEventListener('click', () => dom.aboutModal.classList.add('hidden'));

        if (dom.btnPrivacy) dom.btnPrivacy.addEventListener('click', () => dom.privacyModal.classList.remove('hidden'));
        if (dom.privacyModalClose) dom.privacyModalClose.addEventListener('click', () => dom.privacyModal.classList.add('hidden'));
        if (dom.privacyModalCloseBtn) dom.privacyModalCloseBtn.addEventListener('click', () => dom.privacyModal.classList.add('hidden'));

        if (dom.btnPrayerRequest) dom.btnPrayerRequest.addEventListener('click', () => {
            dom.prayerName.value = '';
            dom.prayerContent.value = '';
            dom.prayerModal.classList.remove('hidden');
        });
        if (dom.prayerModalClose) dom.prayerModalClose.addEventListener('click', () => dom.prayerModal.classList.add('hidden'));
        if (dom.prayerModalCancel) dom.prayerModalCancel.addEventListener('click', () => dom.prayerModal.classList.add('hidden'));
        if (dom.prayerModalSubmit) dom.prayerModalSubmit.addEventListener('click', () => {
            const content = dom.prayerContent.value.trim();
            if (!content) {
                showToast('Por favor escribe tu petición de oración');
                return;
            }
            dom.prayerModal.classList.add('hidden');
            showToast('🙏 Petición recibida. ¡Estaremos orando por ti!');
        });

        if (dom.btnSupportStrike) dom.btnSupportStrike.addEventListener('click', () => dom.supportModal.classList.remove('hidden'));
        if (dom.supportModalClose) dom.supportModalClose.addEventListener('click', () => dom.supportModal.classList.add('hidden'));
        if (dom.supportModalCloseBtn) dom.supportModalCloseBtn.addEventListener('click', () => dom.supportModal.classList.add('hidden'));

        const btnCopyPaypal = document.getElementById('btn-copy-paypal');
        if (btnCopyPaypal) {
            btnCopyPaypal.addEventListener('click', () => {
                navigator.clipboard.writeText('bpalacios347@gmail.com').then(() => {
                    showToast('📋 Correo de PayPal copiado al portapapeles');
                }).catch(() => {
                    showToast('bpalacios347@gmail.com');
                });
            });
        }

        // Font controls
        dom.fontIncrease.addEventListener('click', () => {
            if (state.fontSize < 1.6) {
                state.fontSize += 0.1;
                document.documentElement.style.setProperty('--font-scripture-size', `${state.fontSize}rem`);
            }
        });

        dom.fontDecrease.addEventListener('click', () => {
            if (state.fontSize > 0.85) {
                state.fontSize -= 0.1;
                document.documentElement.style.setProperty('--font-scripture-size', `${state.fontSize}rem`);
            }
        });

        dom.fontFamilyToggle.addEventListener('click', () => {
            if (state.fontFamily === 'lora') {
                state.fontFamily = 'sans';
                document.body.classList.remove('font-lora');
                document.body.classList.add('font-sans');
                showToast('Tipografía: Sans-Serif');
            } else {
                state.fontFamily = 'lora';
                document.body.classList.remove('font-sans');
                document.body.classList.add('font-lora');
                showToast('Tipografía: Lora Serif');
            }
        });

        // Quick Starts
        dom.quickStartGen.addEventListener('click', () => navigateToChapter(0, 0));
        dom.quickStartPsalms.addEventListener('click', () => navigateToChapter(18, 22));
        dom.quickStartJohn.addEventListener('click', () => navigateToChapter(42, 0));
        dom.btnReadVod.addEventListener('click', () => navigateToChapter(18, 118));

        // Testament tabs
        dom.tabOld.addEventListener('click', () => {
            state.testament = 'old';
            dom.tabOld.classList.add('active');
            dom.tabNew.classList.remove('active');
            renderBooks();
        });

        dom.tabNew.addEventListener('click', () => {
            state.testament = 'new';
            dom.tabNew.classList.add('active');
            dom.tabOld.classList.remove('active');
            renderBooks();
        });

        // Version change
        dom.versionSelect.addEventListener('change', async (e) => {
            const newVersion = e.target.value;
            state.currentVersion = newVersion;

            if (!state.bibleData[newVersion]) {
                showToast('Cargando traducción...');
                await loadBibleVersion(newVersion);
            }

            renderBooks();
            if (state.currentBookIndex >= 0 && state.currentChapter >= 0) {
                renderVerses();
            }
            showToast(`Versión: ${BIBLE_VERSIONS[newVersion].name}`);
        });

        // Books list
        dom.booksList.addEventListener('click', (e) => {
            const bookHeader = e.target.closest('.book-header');
            if (bookHeader) {
                const bookIndex = parseInt(bookHeader.dataset.bookIndex);
                if (state.openBooks.has(bookIndex)) {
                    state.openBooks.delete(bookIndex);
                } else {
                    state.openBooks.add(bookIndex);
                }
                renderBooks();
                return;
            }

            const chapterBtn = e.target.closest('.chapter-btn');
            if (chapterBtn) {
                const bookIndex = parseInt(chapterBtn.dataset.bookIndex);
                const chapter = parseInt(chapterBtn.dataset.chapter);
                navigateToChapter(bookIndex, chapter);
            }
        });

        // Chapter Nav
        dom.prevChapter.addEventListener('click', navigatePrevChapter);
        dom.nextChapter.addEventListener('click', navigateNextChapter);

        // Verses actions (Highlighter, Star Favorite, Note, Copy, Verse Image, Delete)
        dom.versesContainer.addEventListener('click', (e) => {
            const verseCardImageBtn = e.target.closest('.btn-create-verse-card');
            if (verseCardImageBtn) {
                const verseIndex = parseInt(verseCardImageBtn.dataset.verse);
                openVerseImageModal(verseIndex);
                return;
            }

            const starBtn = e.target.closest('.btn-star-verse');
            if (starBtn) {
                const vKey = starBtn.dataset.verseKey;
                if (state.favorites.has(vKey)) {
                    state.favorites.delete(vKey);
                    showToast('Versículo quitado de Favoritos');
                } else {
                    state.favorites.add(vKey);
                    showToast('⭐ Versículo guardado en Favoritos');
                }
                saveFavorites();
                renderVerses();
                return;
            }

            const colorDot = e.target.closest('.color-dot');
            if (colorDot) {
                const vKey = colorDot.dataset.verseKey;
                const color = colorDot.dataset.color;
                if (color === 'clear') {
                    delete state.highlights[vKey];
                    showToast('Subrayado quitado');
                } else {
                    state.highlights[vKey] = color;
                    showToast('🎨 Versículo resaltado');
                }
                saveHighlights();
                renderVerses();
                return;
            }

            const sermonBadge = e.target.closest('.verse-sermon-badge');
            if (sermonBadge) {
                const sermonId = sermonBadge.dataset.sermonId;
                openViewSermonModal(sermonId);
                return;
            }

            const addNoteBtn = e.target.closest('.add-note-btn');
            if (addNoteBtn) {
                const verseIndex = parseInt(addNoteBtn.dataset.verse);
                openNoteModal(verseIndex);
                return;
            }

            const copyBtn = e.target.closest('.copy-verse-btn');
            if (copyBtn) {
                const verseIndex = parseInt(copyBtn.dataset.verse);
                copyVerseToClipboard(verseIndex);
                return;
            }

            const deleteBtn = e.target.closest('.delete-btn');
            if (deleteBtn) {
                const noteKey = deleteBtn.dataset.noteKey;
                deleteVerseNote(noteKey);
            }
        });

        // Search
        dom.searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            const query = e.target.value;
            searchTimeout = setTimeout(() => performSearch(query), 250);
        });

        dom.searchResults.addEventListener('click', (e) => {
            const item = e.target.closest('.search-result-item');
            if (item && item.dataset.book !== undefined) {
                const bookIndex = parseInt(item.dataset.book);
                const chapter = parseInt(item.dataset.chapter);
                const verse = parseInt(item.dataset.verse);

                if (bookIndex < OLD_TESTAMENT_COUNT) {
                    state.testament = 'old';
                    dom.tabOld.classList.add('active');
                    dom.tabNew.classList.remove('active');
                } else {
                    state.testament = 'new';
                    dom.tabNew.classList.add('active');
                    dom.tabOld.classList.remove('active');
                }

                navigateToChapter(bookIndex, chapter);

                setTimeout(() => {
                    const verseEl = document.getElementById(`verse-${verse}`);
                    if (verseEl) {
                        verseEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        verseEl.classList.add('highlighted');
                        setTimeout(() => verseEl.classList.remove('highlighted'), 2500);
                    }
                }, 200);

                dom.searchResults.classList.remove('active');
                dom.searchInput.value = '';
            }
        });

        document.addEventListener('click', (e) => {
            if (!dom.searchInput.contains(e.target) && !dom.searchResults.contains(e.target)) {
                dom.searchResults.classList.remove('active');
            }
        });

        // Free Note Modal events
        dom.btnAddLinkedVerse.addEventListener('click', addLinkedVerseFromInput);
        dom.linkVerseInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                addLinkedVerseFromInput();
            }
        });

        dom.linkedVersesTags.addEventListener('click', (e) => {
            const removeBtn = e.target.closest('.linked-tag-remove');
            if (removeBtn) {
                const idx = parseInt(removeBtn.dataset.index);
                currentLinkedVerses.splice(idx, 1);
                renderLinkedVerseTags();
            }
        });

        dom.freeNoteModalClose.addEventListener('click', closeFreeNoteModal);
        dom.freeNoteModalCancel.addEventListener('click', closeFreeNoteModal);
        dom.freeNoteModalSave.addEventListener('click', saveFreeNote);

        // Shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.target.tagName === 'INPUT' || e.target.isContentEditable) return;

            if (e.key === 'ArrowLeft') navigatePrevChapter();
            if (e.key === 'ArrowRight') navigateNextChapter();

            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
                e.preventDefault();
                dom.searchInput.focus();
            }

            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'b') {
                e.preventDefault();
                dom.sidebarToggle.click();
            }
        });

        // Verse Note Modal
        dom.modalClose.addEventListener('click', closeNoteModal);
        dom.modalCancel.addEventListener('click', closeNoteModal);
        dom.modalSave.addEventListener('click', saveVerseNote);
        dom.noteModal.addEventListener('click', (e) => {
            if (e.target === dom.noteModal) closeNoteModal();
        });
    }

    init();
})();
