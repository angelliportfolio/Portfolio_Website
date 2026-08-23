/* ============================================================
   ANGELLI PRODUCTIONS — Commercial Work
   ------------------------------------------------------------
   EDIT THIS BY HAND, OR USE THE CURATION TOOL:
       http://localhost:8765/curate.html
   The tool writes straight back to this file.

   ONE SHOOT = ONE PROJECT = ONE THUMBNAIL. Hovering a thumbnail
   cycles through that shoot; clicking opens it in the lightbox.

     title    — shown under the thumbnail
     client   — brand, e.g. "Charlotte Tilbury" (optional)
     year     — e.g. "2025" (optional)
     category — "campaigns" | "product" | "beauty" | "fashion"
     images   — array of paths. THE FIRST ONE IS THE COVER.
     featured — add `featured: true` to put a project on SELECTED.
   ============================================================ */

const COMMERCIAL_PROJECTS = [

  {
    title: "Charlotte Tilbury",
    featured: true,
    client: "Charlotte Tilbury",
    year: "",
    category: "campaigns",
    images: [
      "images/commercial/charlotte-tilbury/charlotte-tilbury-075.jpg",
      "images/commercial/charlotte-tilbury/charlotte-tilbury-080.jpg",
      "images/commercial/charlotte-tilbury/charlotte-tilbury-078.jpg",
      "images/commercial/charlotte-tilbury/charlotte-tilbury-083.jpg",
      "images/commercial/charlotte-tilbury/charlotte-tilbury-057.jpg",
      "images/commercial/charlotte-tilbury/charlotte-tilbury-047.jpg",
      "images/commercial/charlotte-tilbury/charlotte-tilbury-045.jpg",
      "images/commercial/charlotte-tilbury/charlotte-tilbury-042.jpg",
      "images/commercial/charlotte-tilbury/charlotte-tilbury-030.jpg",
      "images/commercial/charlotte-tilbury/charlotte-tilbury-053.jpg",
      "images/commercial/charlotte-tilbury/charlotte-tilbury-066.jpg",
      "images/commercial/charlotte-tilbury/charlotte-tilbury-004.jpg",
      "images/commercial/charlotte-tilbury/charlotte-tilbury-108.jpg",
      "images/commercial/charlotte-tilbury/charlotte-tilbury-107.jpg",
      "images/commercial/charlotte-tilbury/charlotte-tilbury-109.jpg",
      "images/commercial/charlotte-tilbury/charlotte-tilbury-117.jpg",
      "images/commercial/charlotte-tilbury/charlotte-tilbury-119.jpg",
      "images/commercial/charlotte-tilbury/charlotte-tilbury-094.jpg",
      "images/commercial/charlotte-tilbury/charlotte-tilbury-087.jpg",
    ],
  },

  {
    title: "Summer Fridays",
    featured: true,
    client: "Summer Fridays",
    year: "",
    category: "campaigns",
    images: [
      "images/commercial/summer-fridays/summer-fridays-012.jpg",
      "images/commercial/summer-fridays/summer-fridays-019.jpg",
      "images/commercial/summer-fridays/summer-fridays-006.jpg",
      "images/commercial/summer-fridays/summer-fridays-009.jpg",
      "images/commercial/summer-fridays/summer-fridays-014.jpg",
      "images/commercial/summer-fridays/summer-fridays-023.jpg",
      "images/commercial/summer-fridays/summer-fridays-017.jpg",
      "images/commercial/summer-fridays/summer-fridays-028.jpg",
      "images/commercial/summer-fridays/summer-fridays-037.jpg",
      "images/commercial/summer-fridays/summer-fridays-038.jpg",
    ],
  },

  {
    title: "Tatcha",
    featured: true,
    client: "Tatcha",
    year: "",
    category: "campaigns",
    images: [
      "images/commercial/tatcha/tatcha-028.jpg",
      "images/commercial/tatcha/tatcha-002.jpg",
      "images/commercial/tatcha/tatcha-022.jpg",
      "images/commercial/tatcha/tatcha-025.jpg",
      "images/commercial/tatcha/tatcha-015.jpg",
      "images/commercial/tatcha/tatcha-016.jpg",
    ],
  },

  {
    title: "Tessi",
    featured: true,
    client: "Tessi",
    year: "",
    category: "campaigns",
    images: [
      "images/commercial/tessi/tessi-063.jpg",
      "images/commercial/tessi/tessi-078.jpg",
      "images/commercial/tessi/tessi-022.jpg",
      "images/commercial/tessi/tessi-077.jpg",
      "images/commercial/tessi/tessi-011.jpg",
      "images/commercial/tessi/tessi-142.jpg",
      "images/commercial/tessi/tessi-076.jpg",
      "images/commercial/tessi/tessi-153.jpg",
      "images/commercial/tessi/tessi-185.jpg",
      "images/commercial/tessi/tessi-008.jpg",
      "images/commercial/tessi/tessi-086.jpg",
      "images/commercial/tessi/tessi-026.jpg",
      "images/commercial/tessi/tessi-186.jpg",
      "images/commercial/tessi/tessi-161.jpg",
    ],
  },

  {
    title: "Gucci Concept",
    featured: true,
    client: "",
    year: "",
    category: "product",
    images: [
      "images/commercial/product/product-011.jpg",
      "images/commercial/product/product-012.jpg",
      "images/commercial/product/product-013.jpg",
      "images/commercial/product/product-010.jpg",
    ],
  },

  {
    title: "Phlur",
    featured: true,
    client: "",
    year: "",
    category: "product",
    images: [
      "images/commercial/phlur/phlur-014.jpg",
    ],
  },

  {
    title: "Rare Beauty",
    featured: true,
    client: "",
    year: "",
    category: "product",
    images: [
      "images/commercial/rare-beauty/rare-beauty-023.jpg",
    ],
  },

  {
    title: "Bubble",
    client: "",
    year: "",
    category: "product",
    images: [
      "images/commercial/bubble/bubble-017.jpg",
    ],
  },

  {
    title: "Final Detox",
    client: "",
    year: "",
    category: "product",
    images: [
      "images/commercial/final-detox/final-detox-002.jpg",
      "images/commercial/final-detox/final-detox-003.jpg",
      "images/commercial/final-detox/final-detox-007.jpg",
      "images/commercial/final-detox/final-detox-006.jpg",
      "images/commercial/final-detox/final-detox-005.jpg",
      "images/commercial/final-detox/final-detox-001.jpg",
      "images/commercial/final-detox/final-detox-009.jpg",
      "images/commercial/final-detox/final-detox-008.jpg",
      "images/commercial/final-detox/final-detox-004.jpg",
    ],
  },

  {
    title: "Torriden",
    client: "",
    year: "",
    category: "product",
    images: [
      "images/commercial/torriden/torriden-015.jpg",
      "images/commercial/torriden/torriden-021.jpg",
      "images/commercial/torriden/torriden-020.jpg",
      "images/commercial/torriden/torriden-019.jpg",
      "images/commercial/torriden/torriden-022.jpg",
    ],
  },

  {
    title: "Acacia",
    featured: true,
    client: "",
    year: "",
    category: "beauty",
    images: [
      "images/commercial/acacia/acacia-008.jpg",
      "images/commercial/acacia/acacia-021.jpg",
      "images/commercial/acacia/acacia-029.jpg",
      "images/commercial/acacia/acacia-026.jpg",
      "images/commercial/acacia/acacia-025.jpg",
      "images/commercial/acacia/acacia-004.jpg",
      "images/commercial/acacia/acacia-015.jpg",
    ],
  },

  {
    title: "Alicia",
    featured: true,
    client: "",
    year: "",
    category: "beauty",
    images: [
      "images/commercial/alicia/alicia-011.jpg",
      "images/commercial/alicia/alicia-009.jpg",
      "images/commercial/alicia/alicia-012.jpg",
      "images/commercial/alicia/alicia-003.jpg",
      "images/commercial/alicia/alicia-004.jpg",
      "images/commercial/alicia/alicia-005.jpg",
      "images/commercial/alicia/alicia-007.jpg",
      "images/commercial/alicia/alicia-015.jpg",
      "images/commercial/alicia/alicia-017.jpg",
      "images/commercial/alicia/alicia-019.jpg",
      "images/commercial/alicia/alicia-021.jpg",
      "images/commercial/alicia/alicia-024.jpg",
      "images/commercial/alicia/alicia-025.jpg",
    ],
  },

  {
    title: "Chase",
    featured: true,
    client: "",
    year: "",
    category: "beauty",
    images: [
      "images/commercial/chase/chase-006.jpg",
      "images/commercial/chase/chase-001.jpg",
      "images/commercial/chase/chase-004.jpg",
      "images/commercial/chase/chase-003.jpg",
      "images/commercial/chase/chase-005.jpg",
      "images/commercial/chase/chase-002.jpg",
    ],
  },

  {
    title: "Courtney",
    featured: true,
    client: "",
    year: "",
    category: "beauty",
    images: [
      "images/commercial/courtney/courtney-031.jpg",
      "images/commercial/courtney/courtney-035.jpg",
      "images/commercial/courtney/courtney-001.jpg",
      "images/commercial/courtney/courtney-014.jpg",
      "images/commercial/courtney/courtney-018.jpg",
      "images/commercial/courtney/courtney-041.jpg",
      "images/commercial/courtney/courtney-052.jpg",
      "images/commercial/courtney/courtney-047.jpg",
    ],
  },

  {
    title: "Rare Beauty II",
    featured: true,
    client: "",
    year: "",
    category: "beauty",
    images: [
      "images/commercial/rare-beauty-ii/rare-beauty-ii-058.jpg",
      "images/commercial/rare-beauty-ii/rare-beauty-ii-055.jpg",
      "images/commercial/rare-beauty-ii/rare-beauty-ii-042.jpg",
      "images/commercial/rare-beauty-ii/rare-beauty-ii-051.jpg",
      "images/commercial/rare-beauty-ii/rare-beauty-ii-046.jpg",
      "images/commercial/rare-beauty-ii/rare-beauty-ii-053.jpg",
      "images/commercial/rare-beauty-ii/rare-beauty-ii-045.jpg",
      "images/commercial/rare-beauty-ii/rare-beauty-ii-052.jpg",
    ],
  },

  {
    title: "Tabatha",
    featured: true,
    client: "",
    year: "",
    category: "beauty",
    images: [
      "images/commercial/tabatha/tabatha-011.jpg",
      "images/commercial/tabatha/tabatha-006.jpg",
      "images/commercial/tabatha/tabatha-008.jpg",
      "images/commercial/tabatha/tabatha-001.jpg",
      "images/commercial/tabatha/tabatha-017.jpg",
      "images/commercial/tabatha/tabatha-009.jpg",
    ],
  },

  {
    title: "Ally",
    client: "",
    year: "",
    category: "beauty",
    images: [
      "images/commercial/ally/ally-007.jpg",
      "images/commercial/ally/ally-008.jpg",
    ],
  },

  {
    title: "Cameron",
    client: "",
    year: "",
    category: "beauty",
    images: [
      "images/commercial/cameron/cameron-047.jpg",
      "images/commercial/cameron/cameron-001.jpg",
      "images/commercial/cameron/cameron-015.jpg",
      "images/commercial/cameron/cameron-026.jpg",
      "images/commercial/cameron/cameron-020.jpg",
      "images/commercial/cameron/cameron-022.jpg",
      "images/commercial/cameron/cameron-028.jpg",
      "images/commercial/cameron/cameron-031.jpg",
      "images/commercial/cameron/cameron-029.jpg",
    ],
  },

  {
    title: "Chloe",
    client: "",
    year: "",
    category: "beauty",
    images: [
      "images/commercial/chloe/chloe-017.jpg",
      "images/commercial/chloe/chloe-012.jpg",
    ],
  },

  {
    title: "Destiny",
    client: "",
    year: "",
    category: "beauty",
    images: [
      "images/commercial/destiny/destiny-002.jpg",
      "images/commercial/destiny/destiny-008.jpg",
      "images/commercial/destiny/destiny-006.jpg",
      "images/commercial/destiny/destiny-010.jpg",
      "images/commercial/destiny/destiny-009.jpg",
    ],
  },

  {
    title: "Lucas",
    client: "",
    year: "",
    category: "beauty",
    images: [
      "images/commercial/lucas/lucas-001.jpg",
      "images/commercial/lucas/lucas-003.jpg",
      "images/commercial/lucas/lucas-005.jpg",
      "images/commercial/lucas/lucas-008.jpg",
      "images/commercial/lucas/lucas-009.jpg",
      "images/commercial/lucas/lucas-010.jpg",
    ],
  },

  {
    title: "Moroccan Oil",
    client: "",
    year: "",
    category: "beauty",
    images: [
      "images/commercial/moroccan-oil/moroccan-oil-022.jpg",
      "images/commercial/moroccan-oil/moroccan-oil-020.jpg",
      "images/commercial/moroccan-oil/moroccan-oil-021.jpg",
      "images/commercial/moroccan-oil/moroccan-oil-019.jpg",
      "images/commercial/moroccan-oil/moroccan-oil-023.jpg",
      "images/commercial/moroccan-oil/moroccan-oil-024.jpg",
      "images/commercial/moroccan-oil/moroccan-oil-014.jpg",
    ],
  },

  {
    title: "Nail Editorial",
    client: "",
    year: "",
    category: "beauty",
    images: [
      "images/commercial/nail-editorial/nail-editorial-025.jpg",
      "images/commercial/nail-editorial/nail-editorial-019.jpg",
      "images/commercial/nail-editorial/nail-editorial-001.jpg",
      "images/commercial/nail-editorial/nail-editorial-030.jpg",
      "images/commercial/nail-editorial/nail-editorial-050.jpg",
    ],
  },

  {
    title: "O Models",
    client: "",
    year: "",
    category: "beauty",
    images: [
      "images/commercial/o-models/o-models-019.jpg",
      "images/commercial/o-models/o-models-091.jpg",
      "images/commercial/o-models/o-models-018.jpg",
      "images/commercial/o-models/o-models-090.jpg",
      "images/commercial/o-models/o-models-063.jpg",
      "images/commercial/o-models/o-models-099.jpg",
      "images/commercial/o-models/o-models-064.jpg",
      "images/commercial/o-models/o-models-100.jpg",
    ],
  },

  {
    title: "Don Kaka",
    featured: true,
    client: "Don Kaka",
    year: "",
    category: "campaigns",
    images: [
      "images/commercial/don-kaka/don-kaka-025.jpg",
      "images/commercial/don-kaka/don-kaka-001.jpg",
      "images/commercial/don-kaka/don-kaka-002.jpg",
      "images/commercial/don-kaka/don-kaka-055.jpg",
      "images/commercial/don-kaka/don-kaka-011.jpg",
      "images/commercial/don-kaka/don-kaka-015.jpg",
      "images/commercial/don-kaka/don-kaka-017.jpg",
      "images/commercial/don-kaka/don-kaka-018.jpg",
      "images/commercial/don-kaka/don-kaka-024.jpg",
      "images/commercial/don-kaka/don-kaka-023.jpg",
      "images/commercial/don-kaka/don-kaka-053.jpg",
      "images/commercial/don-kaka/don-kaka-014.jpg",
      "images/commercial/don-kaka/don-kaka-016.jpg",
      "images/commercial/don-kaka/don-kaka-019.jpg",
      "images/commercial/don-kaka/don-kaka-021.jpg",
    ],
  },

  {
    title: "Hope",
    client: "",
    year: "",
    category: "fashion",
    images: [
      "images/commercial/hope/hope-009.jpg",
      "images/commercial/hope/hope-001.jpg",
      "images/commercial/hope/hope-010.jpg",
      "images/commercial/hope/hope-011.jpg",
      "images/commercial/hope/hope-012.jpg",
      "images/commercial/hope/hope-013.jpg",
      "images/commercial/hope/hope-005.jpg",
      "images/commercial/hope/hope-006.jpg",
      "images/commercial/hope/hope-007.jpg",
    ],
  },

  {
    title: "Isabel",
    client: "",
    year: "",
    category: "fashion",
    images: [
      "images/commercial/isabel/isabel-009.jpg",
      "images/commercial/isabel/isabel-004.jpg",
      "images/commercial/isabel/isabel-002.jpg",
      "images/commercial/isabel/isabel-007.jpg",
      "images/commercial/isabel/isabel-003.jpg",
      "images/commercial/isabel/isabel-005.jpg",
      "images/commercial/isabel/isabel-006.jpg",
      "images/commercial/isabel/isabel-001.jpg",
      "images/commercial/isabel/isabel-008.jpg",
    ],
  },

  {
    title: "Jordan",
    client: "",
    year: "",
    category: "fashion",
    images: [
      "images/commercial/jordan/jordan-019.jpg",
      "images/commercial/jordan/jordan-013.jpg",
      "images/commercial/jordan/jordan-020.jpg",
      "images/commercial/jordan/jordan-023.jpg",
      "images/commercial/jordan/jordan-027.jpg",
      "images/commercial/jordan/jordan-032.jpg",
      "images/commercial/jordan/jordan-037.jpg",
      "images/commercial/jordan/jordan-021.jpg",
      "images/commercial/jordan/jordan-039.jpg",
      "images/commercial/jordan/jordan-002.jpg",
      "images/commercial/jordan/jordan-009.jpg",
      "images/commercial/jordan/jordan-012.jpg",
      "images/commercial/jordan/jordan-016.jpg",
      "images/commercial/jordan/jordan-025.jpg",
    ],
  },

  {
    title: "Serena",
    client: "",
    year: "",
    category: "fashion",
    images: [
      "images/commercial/serena/serena-083.jpg",
      "images/commercial/serena/serena-079.jpg",
      "images/commercial/serena/serena-085.jpg",
      "images/commercial/serena/serena-090.jpg",
      "images/commercial/serena/serena-084.jpg",
      "images/commercial/serena/serena-082.jpg",
      "images/commercial/serena/serena-081.jpg",
      "images/commercial/serena/serena-092.jpg",
    ],
  },

  {
    title: "Xena",
    client: "",
    year: "",
    category: "fashion",
    images: [
      "images/commercial/xena/xena-072.jpg",
      "images/commercial/xena/xena-073.jpg",
      "images/commercial/xena/xena-076.jpg",
      "images/commercial/xena/xena-070.jpg",
      "images/commercial/xena/xena-097.jpg",
      "images/commercial/xena/xena-077.jpg",
      "images/commercial/xena/xena-079.jpg",
      "images/commercial/xena/xena-035.jpg",
      "images/commercial/xena/xena-041.jpg",
      "images/commercial/xena/xena-037.jpg",
      "images/commercial/xena/xena-038.jpg",
    ],
  },
];

/* Where every inquiry goes — both the commercial form and the general one. */
const CONTACT_EMAIL = "inquiries@angelliproductions.com";

/* OPTIONAL — Formspree endpoint for the contact form.
   Leave as-is and the form falls back to opening the visitor's
   email app addressed to you (works with zero setup).
   To collect submissions in a dashboard instead, create a free
   form at https://formspree.io and paste its endpoint here. */
const FORMSPREE_ENDPOINT = ""; // e.g. "https://formspree.io/f/abcdwxyz"
