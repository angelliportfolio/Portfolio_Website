/* ============================================================
   ANGELLI PRODUCTIONS — Commercial Work
   ------------------------------------------------------------
   THIS IS THE ONLY FILE YOU EDIT TO CHANGE THE COMMERCIAL GRID.

   The grid is PROJECT based, not photo based. Each entry below is
   one thumbnail. Hovering that thumbnail cycles through the rest of
   the images in its set; clicking opens the full set in the lightbox.

   Each project takes:
     title    — shown under the thumbnail (required)
     client   — brand or publication, e.g. "Rare Beauty" (optional)
     year     — e.g. "2025" (optional)
     category — "nails" | "product" | "beauty" | "advertising" | "fashion" | "directing"
     images   — array of paths. THE FIRST ONE IS THE COVER.
     featured — add `featured: true` to put a project on the HOME reel.
                Aim for 10 (see note below). While nothing is marked,
                HOME just shows every project.

   To add a project:
     1. Drop the photos into images/commercial/<category>/
     2. Copy a block below, change the title, and list the filenames.

   Cloudinary URLs work anywhere a local path does.

   >>> HOW MANY ON HOME: 10 is the target. The grid lays out in a
   >>> repeating 5-slot rhythm (2 wide + 2 + 1 alone), so 10 fills exactly
   >>> two complete cycles with no orphaned row. 5 is the clean minimum if
   >>> you'd rather run short. Avoid going past 15 — HOME is the pitch, not
   >>> the archive; the category tabs are where the full body of work lives.

   >>> NOTE: the beauty projects below were auto-grouped by camera
   >>> filename, just so the grid has real photos in it. Rename the titles, add clients and
   >>> years, and regroup/delete freely — nothing here is precious.
   ============================================================ */

const COMMERCIAL_PROJECTS = [
  /* Titles below describe each look — rename them to whatever you call
     these shoots. Client and year are blank except where known. */

  {
    title: "Studio White",
    featured: true,
    client: "",
    year: "",
    category: "nails",
    images: [
      "images/commercial/nails/nails-01.jpg",
      "images/commercial/nails/nails-02.jpg",
      "images/commercial/nails/nails-03.jpg",
      "images/commercial/nails/nails-04.jpg",
      "images/commercial/nails/nails-05.jpg",
      "images/commercial/nails/nails-06.jpg",
      "images/commercial/nails/nails-07.jpg",
      "images/commercial/nails/nails-08.jpg",
      "images/commercial/nails/nails-09.jpg",
      "images/commercial/nails/nails-10.jpg",
    ],
  },

  {
    title: "Verdant",
    client: "",
    year: "",
    category: "nails",
    images: [
      "images/commercial/nails/nails-11.jpg",
      "images/commercial/nails/nails-12.jpg",
      "images/commercial/nails/nails-13.jpg",
      "images/commercial/nails/nails-14.jpg",
      "images/commercial/nails/nails-15.jpg",
      "images/commercial/nails/nails-16.jpg",
      "images/commercial/nails/nails-17.jpg",
      "images/commercial/nails/nails-18.jpg",
      "images/commercial/nails/nails-19.jpg",
      "images/commercial/nails/nails-20.jpg",
    ],
  },

  {
    title: "Chrome",
    featured: true,
    client: "",
    year: "",
    category: "nails",
    images: [
      "images/commercial/nails/nails-21.jpg",
      "images/commercial/nails/nails-22.jpg",
      "images/commercial/nails/nails-23.jpg",
      "images/commercial/nails/nails-24.jpg",
      "images/commercial/nails/nails-25.jpg",
      "images/commercial/nails/nails-26.jpg",
      "images/commercial/nails/nails-27.jpg",
      "images/commercial/nails/nails-28.jpg",
      "images/commercial/nails/nails-29.jpg",
      "images/commercial/nails/nails-30.jpg",
    ],
  },

  {
    title: "Icon",
    featured: true,
    client: "",
    year: "",
    category: "nails",
    images: [
      "images/commercial/nails/nails-31.jpg",
      "images/commercial/nails/nails-32.jpg",
      "images/commercial/nails/nails-33.jpg",
      "images/commercial/nails/nails-34.jpg",
      "images/commercial/nails/nails-35.jpg",
      "images/commercial/nails/nails-36.jpg",
      "images/commercial/nails/nails-37.jpg",
      "images/commercial/nails/nails-38.jpg",
      "images/commercial/nails/nails-39.jpg",
      "images/commercial/nails/nails-40.jpg",
      "images/commercial/nails/nails-41.jpg",
      "images/commercial/nails/nails-42.jpg",
      "images/commercial/nails/nails-43.jpg",
      "images/commercial/nails/nails-44.jpg",
      "images/commercial/nails/nails-45.jpg",
      "images/commercial/nails/nails-46.jpg",
      "images/commercial/nails/nails-47.jpg",
      "images/commercial/nails/nails-48.jpg",
      "images/commercial/nails/nails-49.jpg",
      "images/commercial/nails/nails-50.jpg",
    ],
  },

  {
    title: "Sculpture",
    client: "",
    year: "",
    category: "nails",
    images: [
      "images/commercial/nails/nails-51.jpg",
      "images/commercial/nails/nails-52.jpg",
      "images/commercial/nails/nails-53.jpg",
      "images/commercial/nails/nails-54.jpg",
      "images/commercial/nails/nails-55.jpg",
      "images/commercial/nails/nails-56.jpg",
      "images/commercial/nails/nails-57.jpg",
      "images/commercial/nails/nails-58.jpg",
      "images/commercial/nails/nails-59.jpg",
      "images/commercial/nails/nails-60.jpg",
    ],
  },

  {
    title: "Bloom",
    client: "",
    year: "",
    category: "nails",
    images: [
      "images/commercial/nails/nails-61.jpg",
      "images/commercial/nails/nails-62.jpg",
      "images/commercial/nails/nails-63.jpg",
      "images/commercial/nails/nails-64.jpg",
      "images/commercial/nails/nails-65.jpg",
      "images/commercial/nails/nails-66.jpg",
      "images/commercial/nails/nails-67.jpg",
      "images/commercial/nails/nails-68.jpg",
      "images/commercial/nails/nails-69.jpg",
      "images/commercial/nails/nails-70.jpg",
    ],
  },

  {
    title: "Crystal",
    featured: true,
    client: "",
    year: "",
    category: "nails",
    images: [
      "images/commercial/nails/nails-71.jpg",
      "images/commercial/nails/nails-72.jpg",
      "images/commercial/nails/nails-73.jpg",
      "images/commercial/nails/nails-74.jpg",
      "images/commercial/nails/nails-75.jpg",
      "images/commercial/nails/nails-76.jpg",
      "images/commercial/nails/nails-77.jpg",
      "images/commercial/nails/nails-78.jpg",
      "images/commercial/nails/nails-79.jpg",
      "images/commercial/nails/nails-80.jpg",
    ],
  },

  {
    title: "Noir",
    featured: true,
    client: "",
    year: "",
    category: "nails",
    images: [
      "images/commercial/nails/nails-81.jpg",
      "images/commercial/nails/nails-82.jpg",
      "images/commercial/nails/nails-83.jpg",
      "images/commercial/nails/nails-84.jpg",
      "images/commercial/nails/nails-85.jpg",
      "images/commercial/nails/nails-86.jpg",
      "images/commercial/nails/nails-87.jpg",
      "images/commercial/nails/nails-88.jpg",
      "images/commercial/nails/nails-89.jpg",
      "images/commercial/nails/nails-90.jpg",
      "images/commercial/nails/nails-91.jpg",
      "images/commercial/nails/nails-92.jpg",
      "images/commercial/nails/nails-93.jpg",
      "images/commercial/nails/nails-94.jpg",
      "images/commercial/nails/nails-95.jpg",
      "images/commercial/nails/nails-96.jpg",
      "images/commercial/nails/nails-97.jpg",
    ],
  },

  {
    title: "Ritual",
    featured: true,
    client: "",
    year: "",
    category: "product",
    images: [
      "images/commercial/product/product-01.jpg",
      "images/commercial/product/product-02.jpg",
      "images/commercial/product/product-03.jpg",
      "images/commercial/product/product-04.jpg",
      "images/commercial/product/product-05.jpg",
    ],
  },

  {
    title: "Still Life",
    featured: true,
    client: "",
    year: "",
    category: "product",
    images: [
      "images/commercial/product/product-06.jpg",
      "images/commercial/product/product-07.jpg",
      "images/commercial/product/product-08.jpg",
      "images/commercial/product/product-09.jpg",
    ],
  },

  {
    title: "Colour",
    featured: true,
    client: "",
    year: "",
    category: "product",
    images: [
      "images/commercial/product/product-10.jpg",
      "images/commercial/product/product-11.jpg",
      "images/commercial/product/product-12.jpg",
      "images/commercial/product/product-13.jpg",
    ],
  },

  {
    title: "Pinks",
    featured: true,
    client: "Charlotte Tilbury",
    year: "",
    category: "advertising",
    images: [
      "images/commercial/advertising/advertising-01.jpg",
      "images/commercial/advertising/advertising-02.jpg",
      "images/commercial/advertising/advertising-03.jpg",
      "images/commercial/advertising/advertising-04.jpg",
      "images/commercial/advertising/advertising-05.jpg",
      "images/commercial/advertising/advertising-06.jpg",
      "images/commercial/advertising/advertising-07.jpg",
      "images/commercial/advertising/advertising-08.jpg",
      "images/commercial/advertising/advertising-09.jpg",
      "images/commercial/advertising/advertising-10.jpg",
      "images/commercial/advertising/advertising-11.jpg",
      "images/commercial/advertising/advertising-12.jpg",
      "images/commercial/advertising/advertising-13.jpg",
      "images/commercial/advertising/advertising-14.jpg",
      "images/commercial/advertising/advertising-15.jpg",
      "images/commercial/advertising/advertising-16.jpg",
      "images/commercial/advertising/advertising-17.jpg",
      "images/commercial/advertising/advertising-18.jpg",
      "images/commercial/advertising/advertising-19.jpg",
      "images/commercial/advertising/advertising-20.jpg",
      "images/commercial/advertising/advertising-21.jpg",
      "images/commercial/advertising/advertising-22.jpg",
      "images/commercial/advertising/advertising-23.jpg",
      "images/commercial/advertising/advertising-24.jpg",
      "images/commercial/advertising/advertising-25.jpg",
      "images/commercial/advertising/advertising-26.jpg",
      "images/commercial/advertising/advertising-27.jpg",
      "images/commercial/advertising/advertising-28.jpg",
      "images/commercial/advertising/advertising-29.jpg",
      "images/commercial/advertising/advertising-30.jpg",
      "images/commercial/advertising/advertising-31.jpg",
      "images/commercial/advertising/advertising-32.jpg",
      "images/commercial/advertising/advertising-33.jpg",
      "images/commercial/advertising/advertising-34.jpg",
      "images/commercial/advertising/advertising-35.jpg",
      "images/commercial/advertising/advertising-36.jpg",
      "images/commercial/advertising/advertising-37.jpg",
      "images/commercial/advertising/advertising-38.jpg",
      "images/commercial/advertising/advertising-39.jpg",
      "images/commercial/advertising/advertising-40.jpg",
      "images/commercial/advertising/advertising-41.jpg",
      "images/commercial/advertising/advertising-42.jpg",
      "images/commercial/advertising/advertising-43.jpg",
      "images/commercial/advertising/advertising-44.jpg",
      "images/commercial/advertising/advertising-45.jpg",
      "images/commercial/advertising/advertising-46.jpg",
      "images/commercial/advertising/advertising-47.jpg",
      "images/commercial/advertising/advertising-48.jpg",
      "images/commercial/advertising/advertising-49.jpg",
      "images/commercial/advertising/advertising-50.jpg",
      "images/commercial/advertising/advertising-51.jpg",
      "images/commercial/advertising/advertising-52.jpg",
      "images/commercial/advertising/advertising-53.jpg",
      "images/commercial/advertising/advertising-54.jpg",
      "images/commercial/advertising/advertising-55.jpg",
      "images/commercial/advertising/advertising-56.jpg",
      "images/commercial/advertising/advertising-57.jpg",
      "images/commercial/advertising/advertising-58.jpg",
      "images/commercial/advertising/advertising-59.jpg",
      "images/commercial/advertising/advertising-60.jpg",
    ],
  },

  {
    title: "Ensemble",
    client: "Charlotte Tilbury",
    year: "",
    category: "advertising",
    images: [
      "images/commercial/advertising/advertising-61.jpg",
      "images/commercial/advertising/advertising-62.jpg",
      "images/commercial/advertising/advertising-63.jpg",
      "images/commercial/advertising/advertising-64.jpg",
      "images/commercial/advertising/advertising-65.jpg",
      "images/commercial/advertising/advertising-66.jpg",
      "images/commercial/advertising/advertising-67.jpg",
      "images/commercial/advertising/advertising-68.jpg",
      "images/commercial/advertising/advertising-69.jpg",
      "images/commercial/advertising/advertising-70.jpg",
      "images/commercial/advertising/advertising-71.jpg",
      "images/commercial/advertising/advertising-72.jpg",
      "images/commercial/advertising/advertising-73.jpg",
      "images/commercial/advertising/advertising-74.jpg",
      "images/commercial/advertising/advertising-75.jpg",
      "images/commercial/advertising/advertising-76.jpg",
      "images/commercial/advertising/advertising-77.jpg",
      "images/commercial/advertising/advertising-78.jpg",
      "images/commercial/advertising/advertising-79.jpg",
      "images/commercial/advertising/advertising-80.jpg",
      "images/commercial/advertising/advertising-81.jpg",
      "images/commercial/advertising/advertising-82.jpg",
      "images/commercial/advertising/advertising-83.jpg",
      "images/commercial/advertising/advertising-84.jpg",
      "images/commercial/advertising/advertising-85.jpg",
      "images/commercial/advertising/advertising-86.jpg",
      "images/commercial/advertising/advertising-87.jpg",
      "images/commercial/advertising/advertising-88.jpg",
      "images/commercial/advertising/advertising-89.jpg",
      "images/commercial/advertising/advertising-90.jpg",
      "images/commercial/advertising/advertising-91.jpg",
      "images/commercial/advertising/advertising-92.jpg",
      "images/commercial/advertising/advertising-93.jpg",
      "images/commercial/advertising/advertising-94.jpg",
      "images/commercial/advertising/advertising-95.jpg",
      "images/commercial/advertising/advertising-96.jpg",
    ],
  },

  {
    title: "Gold",
    featured: true,
    client: "Charlotte Tilbury",
    year: "",
    category: "advertising",
    images: [
      "images/commercial/advertising/advertising-97.jpg",
      "images/commercial/advertising/advertising-98.jpg",
      "images/commercial/advertising/advertising-99.jpg",
      "images/commercial/advertising/advertising-100.jpg",
      "images/commercial/advertising/advertising-101.jpg",
      "images/commercial/advertising/advertising-102.jpg",
      "images/commercial/advertising/advertising-103.jpg",
      "images/commercial/advertising/advertising-104.jpg",
      "images/commercial/advertising/advertising-105.jpg",
      "images/commercial/advertising/advertising-106.jpg",
      "images/commercial/advertising/advertising-107.jpg",
      "images/commercial/advertising/advertising-108.jpg",
      "images/commercial/advertising/advertising-109.jpg",
      "images/commercial/advertising/advertising-110.jpg",
      "images/commercial/advertising/advertising-111.jpg",
      "images/commercial/advertising/advertising-112.jpg",
      "images/commercial/advertising/advertising-113.jpg",
      "images/commercial/advertising/advertising-114.jpg",
      "images/commercial/advertising/advertising-115.jpg",
      "images/commercial/advertising/advertising-116.jpg",
      "images/commercial/advertising/advertising-117.jpg",
      "images/commercial/advertising/advertising-118.jpg",
      "images/commercial/advertising/advertising-119.jpg",
      "images/commercial/advertising/advertising-120.jpg",
      "images/commercial/advertising/advertising-121.jpg",
      "images/commercial/advertising/advertising-122.jpg",
    ],
  },

  {
    title: "Beauty Series 01",
    client: "",
    year: "",
    category: "beauty",
    images: [
      "images/commercial/beauty/DSC07384-scaled.jpg",
      "images/commercial/beauty/DSC07414-2-scaled.jpg",
      "images/commercial/beauty/DSC07415-scaled.jpg",
      "images/commercial/beauty/DSC07479-scaled.jpg",
      "images/commercial/beauty/DSC07512-scaled.jpg",
      "images/commercial/beauty/DSC07628-2-scaled.jpg",
      "images/commercial/beauty/DSC076531-2-scaled.jpg",
      "images/commercial/beauty/DSC07731-scaled.jpg",
      "images/commercial/beauty/DSC07753-scaled.jpg",
    ],
  },

  {
    title: "Beauty Series 03",
    client: "",
    year: "",
    category: "beauty",
    images: [
      "images/commercial/beauty/DSC08034-Recovered-Recovered-scaled.jpg",
      "images/commercial/beauty/DSC08074_1.jpg",
      "images/commercial/beauty/DSC08168-scaled.jpg",
      "images/commercial/beauty/DSC08217_1.jpg",
      "images/commercial/beauty/DSC08224_1.jpg",
    ],
  },

  {
    title: "Beauty Series 04",
    client: "",
    year: "",
    category: "beauty",
    images: [
      "images/commercial/beauty/DSC08444-scaled.jpg",
      "images/commercial/beauty/DSC08472-scaled.jpg",
      "images/commercial/beauty/DSC08529-scaled.jpg",
      "images/commercial/beauty/DSC08682-scaled.jpg",
      "images/commercial/beauty/DSC08775-scaled.jpg",
      "images/commercial/beauty/DSC08938-scaled.jpg",
    ],
  },

  {
    title: "Beauty Series 05",
    client: "",
    year: "",
    category: "beauty",
    images: [
      "images/commercial/beauty/DSC02198-scaled.jpg",
      "images/commercial/beauty/DSC02977-scaled.jpg",
      "images/commercial/beauty/DSC02991.jpg",
      "images/commercial/beauty/DSC03005-scaled.jpg",
      "images/commercial/beauty/DSC03087-2-scaled.jpg",
      "images/commercial/beauty/DSC03181-scaled.jpg",
      "images/commercial/beauty/DSC03233-scaled.jpg",
      "images/commercial/beauty/DSC03279-scaled.jpg",
    ],
  },

  {
    title: "Beauty Series 06",
    client: "",
    year: "",
    category: "beauty",
    images: [
      "images/commercial/beauty/IMG_4926.jpg",
      "images/commercial/beauty/IMG_4928.jpg",
      "images/commercial/beauty/IMG_4929.jpg",
      "images/commercial/beauty/IMG_4931.jpg",
      "images/commercial/beauty/IMG_4957-2.jpg",
      "images/commercial/beauty/IMG_4957.jpg",
      "images/commercial/beauty/IMG_4961.jpg",
      "images/commercial/beauty/IMG_4967.jpg",
      "images/commercial/beauty/IMG_4973.jpg",
    ],
  },

  {
    title: "Beauty Series 07",
    client: "",
    year: "",
    category: "beauty",
    images: [
      "images/commercial/beauty/IMG_5052.jpg",
      "images/commercial/beauty/IMG_5053.jpg",
      "images/commercial/beauty/IMG_5071.jpg",
      "images/commercial/beauty/IMG_5106.jpg",
      "images/commercial/beauty/IMG_5131.jpg",
      "images/commercial/beauty/IMG_5309.jpg",
      "images/commercial/beauty/IMG_5347.jpg",
    ],
  },

  {
    title: "Beauty Series 08",
    client: "",
    year: "",
    category: "beauty",
    images: [
      "images/commercial/beauty/IMG_6120.jpg",
      "images/commercial/beauty/IMG_6147.jpg",
      "images/commercial/beauty/IMG_6148.jpg",
      "images/commercial/beauty/IMG_6155.jpg",
      "images/commercial/beauty/IMG_6156.jpg",
      "images/commercial/beauty/IMG_6181.jpg",
    ],
  },

  {
    title: "Beauty Series 09",
    client: "",
    year: "",
    category: "beauty",
    images: [
      "images/commercial/beauty/196989FA-D8EE-4F18-98E1-12DB40B65AF0.jpg",
      "images/commercial/beauty/2.jpg",
      "images/commercial/beauty/2_3.jpg",
      "images/commercial/beauty/3-scaled.jpg",
      "images/commercial/beauty/43F9DE14-F0E0-476F-BB51-EC44C3B2DCE0.jpg",
      "images/commercial/beauty/5.jpg",
      "images/commercial/beauty/AE0357FF-8778-4A51-B7BB-0A592266B65B.jpg",
      "images/commercial/beauty/DSC00674-scaled.jpg",
      "images/commercial/beauty/DSC01787-scaled.jpg",
      "images/commercial/beauty/DSC09080-scaled.jpg",
      "images/commercial/beauty/DSC09439-scaled.jpg",
      "images/commercial/beauty/IMG_184405_0-scaled.jpg",
      "images/commercial/beauty/IMG_1963.jpg",
      "images/commercial/beauty/IMG_2341.jpg",
      "images/commercial/beauty/IMG_5911.jpg",
      "images/commercial/beauty/retouch.kolesnikova-4-scaled.jpg",
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
