export type Solution = {
  slug: string;
  label: string;
  description: string;
  imageSrc: string | null;
  imageAlt: string;
  useCases: string[];
};

export const SOLUTIONS: Solution[] = [
  {
    slug: "manufacturing",
    label: "Manufacturing",
    description: "Keep production floors safe and audit-ready without interrupting throughput.",
    imageSrc: "/assets/industry-manufacturing.png",
    imageAlt: "URC autonomous floor scrubber in a modern manufacturing facility with machinery and workers",
    useCases: [
      "Night-shift floor scrubbing for aisles and lines",
      "Dust/soil removal in high-traffic material corridors",
      "Consistent cleaning routes for safety compliance",
      "Reduced downtime by cleaning around operations",
    ],
  },
  {
    slug: "transportation",
    label: "Transportation",
    description: "Autonomous cleaning that fits real schedules in terminals and transit hubs.",
    imageSrc: "/assets/industry-transportation.png",
    imageAlt: "URC X40 autonomous floor scrubber in a bright airport terminal",
    useCases: [
      "Concourse and corridor cleaning between peaks",
      "Nightly deep-clean loops with repeatable routes",
      "Spot-cleaning near entrances and ticketing areas",
      "Large-area coverage with minimal staff supervision",
    ],
  },
  {
    slug: "retail",
    label: "Retail",
    description: "Keep stores customer-ready—clean floors without slowing shopping flow.",
    imageSrc: "/assets/industry-retail.png",
    imageAlt: "URC X40 autonomous floor scrubber in a grocery store aisle",
    useCases: [
      "Aisle cleaning during low-footfall hours",
      "Entryway and checkout zone scrubbing",
      "Consistent finish for polished retail floors",
      "Cleaning routes that adapt to obstacles and carts",
    ],
  },
  {
    slug: "education",
    label: "Education",
    description: "Maintain campus hygiene across long corridors and common areas.",
    imageSrc: "/assets/industry-education.png",
    imageAlt: "URC autonomous cleaning robot in an education campus corridor",
    useCases: [
      "Hallways, lobbies, and classroom corridor loops",
      "After-hours cleaning to avoid class disruption",
      "Coverage for hostels and admin buildings",
      "Repeatable routes for predictable daily operations",
    ],
  },
  {
    slug: "healthcare",
    label: "Healthcare",
    description: "Quiet, consistent cleaning for clinical corridors and patient-facing zones.",
    imageSrc: "/assets/industry-healthcare.png",
    imageAlt: "URC autonomous cleaning robot in a healthcare corridor",
    useCases: [
      "Patient corridor scrubbing during scheduled windows",
      "High-touch zones near reception and waiting areas",
      "Repeatable cleaning routes for SOP alignment",
      "Minimize slip risk with consistent floor finish",
    ],
  },
  {
    slug: "hospitality",
    label: "Hospitality",
    description: "Operate clean, guest-ready spaces in restaurants, hotels, and lounges.",
    imageSrc: "/assets/industry-hospitality.png",
    imageAlt: "URC autonomous cleaning robot in a hospitality space",
    useCases: [
      "Dining area and lobby cleaning between rush periods",
      "Nightly cleaning for banquet halls and corridors",
      "Cleaning around staff and guests with obstacle awareness",
      "Consistent appearance for premium guest experience",
    ],
  },
  {
    slug: "workspace",
    label: "Workspace",
    description: "Maintain office floors across open areas, corridors, and shared amenities.",
    imageSrc: "/assets/industry-workspace.png",
    imageAlt: "URC autonomous cleaning robot in an office workspace",
    useCases: [
      "Evening cleaning loops for office corridors",
      "Lobby and pantry zone cleaning during low traffic",
      "Consistent routine for multi-floor facilities",
      "Reduced manual effort with predictable schedules",
    ],
  },
];

export function getSolution(slug: string): Solution | undefined {
  return SOLUTIONS.find((item) => item.slug === slug);
}
