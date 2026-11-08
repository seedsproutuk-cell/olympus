"use client";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  Check,
  Home as HomeIcon,
  Menu,
  Search,
  ShieldCheck,
  Sprout,
  X,
} from "lucide-react";
type Section = { title: string; copy: string; link?: [string, string] };
type Page = {
  title: string;
  eyebrow: string;
  intro: string;
  sections: Section[];
  form?: string;
  actions?: [string, string][];
};
const P: Record<string, Page> = {
  "/leasing/": {
    title: "Rent to Rent and Operator Leases Explained",
    eyebrow: "Leasing",
    intro:
      "A clear route for landlords who want a reliable operator and operators looking for the right property.",
    sections: [
      {
        title: "What is rent to rent?",
        copy: "An operator rents a property under an agreed contract, then manages its use within the permissions set by the owner, lender and insurer.",
      },
      {
        title: "For landlords",
        copy: "Tell us about your property, preferred terms and availability.",
        link: ["Offer a property", "/leasing/offer-a-property/"],
      },
      {
        title: "For operators",
        copy: "Register your model, areas, budget and building requirements.",
        link: ["Find an opportunity", "/leasing/find-a-property/"],
      },
    ],
  },
  "/leasing/offer-a-property/": {
    title: "Lease Your Property to an Operator",
    eyebrow: "For landlords",
    intro:
      "Offer a suitable property to vetted operators and agree clear responsibilities before anything proceeds.",
    sections: [
      {
        title: "How an operator lease works",
        copy: "The lease sets out rent, permitted use, repairs, compliance, access and term. Fixed-rent commitments must be confirmed in writing.",
      },
      {
        title: "Properties we are looking for",
        copy: "Homes, HMOs and larger properties across the UK.",
      },
    ],
    form: "Owner lease offer",
  },
  "/leasing/find-a-property/": {
    title: "Rent to Rent Properties and Opportunities",
    eyebrow: "For operators",
    intro:
      "Register your operating model and brief to be matched with owners open to a lease.",
    sections: [
      {
        title: "Who we work with",
        copy: "Established HMO, serviced accommodation, housing and care operators with a clear model.",
      },
      {
        title: "How we vet operators",
        copy: "We record experience, intended use, insurance, compliance approach and references.",
      },
    ],
    form: "Operator requirement",
  },
  "/social-care/": {
    title: "Social Care Property",
    eyebrow: "Property with purpose",
    intro:
      "Matching landlords with suitable premises to care and housing providers looking for a defined use.",
    sections: [
      {
        title: "For landlords",
        copy: "Register the property, status, available documents and uses you would consider.",
        link: [
          "Offer care premises",
          "/social-care/property/offer-a-property/",
        ],
      },
      {
        title: "For providers",
        copy: "Submit a brief with location, capacity, budget and requirements.",
        link: [
          "Find suitable premises",
          "/social-care/property/find-a-property/",
        ],
      },
    ],
    actions: [["Offer a property", "/social-care/property/offer-a-property/"],["Find care premises", "/social-care/property/find-a-property/"]],
  },
  "/social-care/property/": {
    title: "Supported Living Property",
    eyebrow: "Social care property",
    intro:
      "A practical matching service for premises, owners and established care or housing organisations.",
    sections: [
      {
        title: "How leases work",
        copy: "The provider agrees a permitted use and lease structure with the owner. Planning, registration and approvals must be evidenced.",
      },
      {
        title: "What makes a property suitable",
        copy: "Location, access, layout, safety, demand and the intended care model all shape suitability.",
      },
    ],
  },
  "/social-care/property/offer-a-property/": {
    title: "Lease Your Property to a Supported Living Provider",
    eyebrow: "For owners",
    intro:
      "Register a property with its current status, documents and preferred terms.",
    sections: [
      {
        title: "What providers look for",
        copy: "Safe, well-located premises with workable layouts and an honest record of approval status.",
      },
      {
        title: "How matching works",
        copy: "We review information, identify potential matches and share details with permission.",
      },
    ],
    form: "Care premises offer",
  },
  "/social-care/property/find-a-property/": {
    title: "Find Supported Living Premises to Lease",
    eyebrow: "For providers",
    intro:
      "Tell us exactly what your organisation needs and we will look for suitable premises.",
    sections: [
      {
        title: "Who we work with",
        copy: "Care or housing organisations with a defined model, geography and decision route.",
      },
      {
        title: "How matching works",
        copy: "A match starts a conversation, not a claim of suitability or approval.",
      },
    ],
    form: "Care premises requirement",
  },
  "/inspections/": {
    title: "Building Inspections for Landlords and Housing Providers",
    eyebrow: "Specialist inspections",
    intro: "Practical inspection and contractor support for landlords, housing providers and property managers across the UK.",
    sections: [
      {
        title: "Damp and mould surveys",
        copy: "Investigate visible damp, mould, moisture and the conditions contributing to the problem.",
        link: ["View damp and mould inspections", "/inspections/damp-and-mould/"],
      },
      {
        title: "Fire door inspections",
        copy: "Structured fire-door checks for blocks, HMOs, housing and commercial premises.",
        link: ["View fire door inspections", "/inspections/fire-doors/"],
      },
      {
        title: "Subcontractor services",
        copy: "Access suitable trades and specialist subcontractors for defined property works.",
        link: ["View subcontractor services", "/inspections/subcontractors/"],
      },
    ],
  },
  "/inspections/damp-and-mould/": {
    title: "Damp and Mould Inspections",
    eyebrow: "Investigate the cause",
    intro: "A structured inspection of visible damp, mould and moisture conditions, followed by clear findings and practical next steps.",
    sections: [
      {title:"What we investigate",copy:"Visible mould growth, staining, condensation, ventilation, heating patterns, leaks, penetrating moisture and signs of rising damp."},
      {title:"What you receive",copy:"A written record of observations, photographs where appropriate, likely contributing factors and recommended next actions."},
      {title:"Awaab’s Law and housing duties",copy:"For social housing in England, Awaab’s Law sets timeframes for investigating and addressing significant damp and mould hazards. Other repair and housing-safety duties may also apply depending on the tenancy.",link:["Read official Awaab’s Law guidance","https://www.gov.uk/government/collections/awaabs-law-in-the-social-rented-sector"]},
      {title:"Who it is for",copy:"Landlords, letting agents, housing providers, block managers and occupiers who need a clearer picture of the problem."}
    ],
    form: "Request a damp and mould inspection",
  },
  "/inspections/fire-doors/": {
    title: "Fire Door Inspections",
    eyebrow: "Systematic door checks",
    intro: "Consistent inspection of fire-door condition and visible defects for residential blocks, HMOs, housing and commercial buildings.",
    sections: [
      {title:"What we check",copy:"Door leaf and frame condition, gaps, seals, hinges, closers, glazing, signage and visible damage or alteration."},
      {title:"Inspection record",copy:"Each inspected door is recorded with its location, observed condition and recommended remedial priority."},
      {title:"Fire-safety legislation",copy:"The Fire Safety Order 2005 requires a suitable fire-risk assessment. For relevant residential buildings over 11 metres, the Fire Safety (England) Regulations 2022 require quarterly communal-door checks and best endeavours to check flat entrance doors annually.",link:["Read official fire-door guidance","https://www.gov.uk/government/publications/fire-safety-england-regulations-2022-fire-door-guidance/fire-safety-england-regulations-2022-fire-door-guidance"]},
      {title:"Scope and limitations",copy:"The agreed scope is confirmed before attendance. An inspection supports—rather than replaces—the responsible person’s wider fire-safety duties."}
    ],
    form: "Request a fire door inspection",
  },
  "/inspections/subcontractors/": {
    title: "Property Subcontractor Services",
    eyebrow: "Delivery support",
    intro: "Access trusted trades and specialists backed by long-standing property-delivery experience.",
    sections: [
      {title:"30 years of working relationships",copy:"Our network includes trusted trades and specialists across repairs, refurbishment, damp remediation, fire-door works and related property services."},
      {title:"A clear brief",copy:"We record the property, required work, timescale, access arrangements and available evidence before introductions are made."},
      {title:"Quality and due diligence",copy:"We review experience and suitability before an introduction. Final scope, competence, insurance, quotations and contracts are still checked and agreed before work begins."}
    ],
    form: "Subcontractor service enquiry",
  },
  "/learn/": {
    title: "Property Guides for Buyers, Investors and Landlords",
    eyebrow: "Learn",
    intro: "Plain-English guidance for better property decisions in England.",
    sections: [
      {
        title: "First-time buyers",
        copy: "A practical route from deposit planning to completion.",
        link: ["Read the guide", "/learn/first-time-buyers/"],
      },
      {
        title: "Property income strategies",
        copy: "Compare buy-to-let, operator leases, commercial and supported living.",
        link: ["Compare strategies", "/learn/property-income/"],
      },
      {
        title: "Deal breakdowns",
        copy: "See how assumptions, costs and risks change a decision.",
        link: ["View breakdowns", "/learn/deal-breakdowns/"],
      },
    ],
  },
  "/learn/first-time-buyers/": {
    title: "First-Time Buyer Guide: How to Buy Your First Home",
    eyebrow: "Guide for England",
    intro:
      "A calm, practical overview from saving a deposit to collecting the keys.",
    sections: [
      {
        title: "Prepare your finances",
        copy: "Set an affordable monthly budget, build a deposit, review your credit position and allow for legal work, searches, surveys, mortgage fees, tax where applicable and moving costs.",
        link: ["Browse homes for buyers", "/opportunities/homes-for-sale/"],
      },
      {
        title: "Search and make an offer",
        copy: "Define your preferred areas and essentials, compare values, view carefully and make an offer that reflects condition, demand and your budget.",
      },
      {
        title: "From offer to completion",
        copy: "Appoint a conveyancer, arrange a suitable survey and mortgage, review title and searches, exchange only when ready, then complete and collect the keys.",
        link: ["Use the property glossary", "/glossary/"],
      },
      {
        title: "Keep a safety margin",
        copy: "A lender’s maximum is not necessarily a comfortable budget. Allow for repairs, insurance, service charges, maintenance and changes in interest rates.",
      },
    ],
  },
  "/learn/property-income/": {
    title: "Property Strategies: Ways to Make Money from Property",
    eyebrow: "Property income",
    intro:
      "Compare common UK property strategies by capital, work, control and risk.",
    sections: [
      {
        title: "Buy-to-let",
        copy: "Purchase a home and receive rent while carrying finance, repairs, void periods, management, tax and compliance responsibilities.",
        link: ["See investment opportunities", "/opportunities/investment/"],
      },
      {
        title: "Operator leases",
        copy: "Control a property under an agreed lease. The margin depends on rent, permitted use, occupancy, operating costs and effective delivery.",
        link: ["Explore operator leases", "/opportunities/operator-lease/"],
      },
      {
        title: "Commercial property",
        copy: "Commercial income can offer longer terms, but lease structure, repairing obligations, business demand, VAT and exit liquidity require careful review.",
        link: ["Browse commercial opportunities", "/opportunities/commercial/"],
      },
      {
        title: "Supported living and care premises",
        copy: "A defined care or housing use requires provider suitability, demand, planning, registration, building compliance and clear lease terms.",
        link: ["Explore social care property", "/social-care/property/"],
      },
    ],
  },
  "/learn/deal-breakdowns/": {
    title: "Property Deal Breakdowns",
    eyebrow: "Learn from the numbers",
    intro:
      "Illustrative cases that make assumptions, risks and decision points visible.",
    sections: [
      {
        title: "Residential purchase",
        copy: "Review price, deposit, finance, acquisition costs, works, rent, running costs, voids, maintenance and resale assumptions together.",
        link: ["View residential opportunities", "/opportunities/residential/"],
      },
      {
        title: "Operator lease",
        copy: "Test the head rent, setup cost, permitted use, achievable income, occupancy, staffing, utilities, compliance, break clauses and downside scenario.",
        link: ["View operator leases", "/opportunities/operator-lease/"],
      },
      {
        title: "Investment evidence",
        copy: "Separate verified facts from advertiser figures and estimates. Stress-test interest rates, works, income and exit timing.",
        link: ["Explore investments", "/opportunities/investment/"],
      },
      {
        title: "Bring a live deal",
        copy: "Identify missing evidence, challenge assumptions and decide what must be checked before proceeding.",
        link: ["Bring a deal to mentorship", "/mentorship/bring-a-deal/"],
      },
    ],
  },
  "/about/": {
    title: "About Olympus Property",
    eyebrow: "Property done right",
    intro:
      "A UK-based platform built to make opportunities, introductions and guidance clearer.",
    sections: [
      {
        title: "What we do",
        copy: "We connect property opportunities, operator leases, social care premises and practical education.",
      },
      {
        title: "How we work",
        copy: "Clear status, recorded permissions and evidence-led information. Team details publish once approved.",
      },
    ],
  },
  "/how-listings-work/": {
    title: "How Our Listings Work",
    eyebrow: "Submission to enquiry",
    intro:
      "Every listing is reviewed before publication and remains traceable through its lifecycle.",
    sections: [
      {
        title: "1. Submit",
        copy: "An owner, landlord or authorised agent confirms authority to advertise.",
      },
      {
        title: "2. Review",
        copy: "We check required fields, status, images and claims.",
      },
      {
        title: "3. Publish and update",
        copy: "Listings show current availability. Sold and let pages retain status and disable enquiries.",
      },
    ],
  },
  "/contact/": {
    title: "Contact Us",
    eyebrow: "Olympus Property",
    intro: "Tell us what you need and we will direct your enquiry.",
    sections: [],
    form: "Contact",
  },
  "/list-a-property/": {
    title: "List Your Property for Sale or to Rent",
    eyebrow: "Owners, landlords and agents",
    intro:
      "Advertise a home, rental, lease opportunity or commercial property.",
    sections: [
      {
        title: "What you can list",
        copy: "Homes for sale, homes to rent, commercial premises, leases and renovation projects.",
      },
      {
        title: "How listing works",
        copy: "Submit the essentials, confirm authority and add images. We review before publication.",
      },
    ],
    form: "Property listing",
  },
};
const listings = [
  {
    type: "Commercial",
    deal: "To let",
    town: "UK",
    title: "Flexible commercial space to rent",
    price: "Register your brief",
    image: "/olympus-images/commercial.png",
    href: "/opportunities/commercial-to-rent/",
    categories: ["commercial", "commercial-to-rent", "investment"],
  },
  {
    type: "Residential",
    deal: "Operator lease",
    town: "UK",
    title: "Operator lease opportunity",
    price: "Join the register",
    image: "/olympus-images/lease.png",
    href: "/opportunities/operator-lease/",
    categories: ["residential", "operator-lease", "investment"],
  },
  {
    type: "Residential",
    deal: "For sale",
    town: "UK",
    title: "Home for buyers",
    price: "Get updates",
    image: "/olympus-images/residential.png",
    href: "/opportunities/homes-for-sale/",
    categories: ["residential", "homes-for-sale"],
  },
  {
    type: "Residential",
    deal: "To rent",
    town: "UK",
    title: "Residential rental opportunity",
    price: "Register to rent",
    image: "/olympus-images/hero.png",
    href: "/opportunities/homes-to-rent/",
    categories: ["residential", "homes-to-rent"],
  },
  {
    type: "Residential",
    deal: "Investment",
    town: "UK",
    title: "Residential investment opportunity",
    price: "View the figures",
    image: "/olympus-images/residential.png",
    href: "/opportunities/investment/",
    categories: ["residential", "investment"],
  },
  {
    type: "Commercial",
    deal: "For sale",
    town: "UK",
    title: "Commercial property for sale",
    price: "Register interest",
    image: "/olympus-images/commercial.png",
    href: "/opportunities/commercial-for-sale/",
    categories: ["commercial", "commercial-for-sale", "investment"],
  },
  {
    type: "Commercial",
    deal: "Investor lease",
    town: "UK",
    title: "Income-producing lease opportunity",
    price: "Register interest",
    image: "/olympus-images/commercial.png",
    href: "/opportunities/investor-lease/",
    categories: ["commercial", "investment", "investor-lease"],
  },
];
const opportunityGuides: Record<
  string,
  {
    eyebrow: string;
    heading: string;
    intro: string;
    sections: Section[];
    form: string;
  }
> = {
  "operator-lease": {
    eyebrow: "For operators and landlords",
    heading: "A clear route into operator lease opportunities",
    intro:
      "We bring together operators looking for suitable buildings and landlords willing to consider a professionally structured lease.",
    sections: [
      {
        title: "What an operator lease entails",
        copy: "The lease defines rent, permitted use, repairs, compliance, insurance and term.",
      },
      {
        title: "How Olympus can help",
        copy: "Operators submit their brief; landlords submit suitable properties and proposed terms.",
      },
      {
        title: "Before a match proceeds",
        copy: "Both parties verify permissions, planning, insurance, experience and lease terms before proceeding.",
      },
    ],
    form: "Operator lease opportunity enquiry",
  },
  "homes-for-sale": {
    eyebrow: "Property sourcing for buyers",
    heading: "Tell us what kind of home you want to buy",
    intro:
      "Whether you are buying your first home, moving or purchasing for the longer term, we can record your brief and source relevant opportunities.",
    sections: [
      {
        title: "Your buying brief",
        copy: "Share your preferred areas, budget, property type, bedrooms and timescale.",
      },
      {
        title: "Property sourcing",
        copy: "We identify relevant opportunities for you to assess, view and investigate.",
      },
      {
        title: "From search to purchase",
        copy: "Arrange finance, surveys and legal checks before making a commitment.",
      },
    ],
    form: "Home buyer and property sourcing enquiry",
  },
  "homes-to-rent": {
    eyebrow: "Rental property sourcing",
    heading: "Register the home you need to rent",
    intro:
      "Send us a clear rental brief and we can help identify residential opportunities that match your location, budget and move-in needs.",
    sections: [
      {
        title: "What to include",
        copy: "Share your areas, monthly budget, bedrooms, household size and move date.",
      },
      {
        title: "How rental sourcing works",
        copy: "We match your brief to suitable available and newly introduced rentals.",
      },
      {
        title: "Getting ready to rent",
        copy: "Prepare your identity, right-to-rent, affordability and reference documents.",
      },
    ],
    form: "Residential rental opportunity enquiry",
  },
  investment: {
    eyebrow: "Residential investment",
    heading: "Explore investment opportunities with the numbers visible",
    intro:
      "We present residential investment routes and help investors register the strategy, budget and return profile they are looking for.",
    sections: [
      {
        title: "Opportunities we may feature",
        copy: "Browse buy-to-let, refurbishment and lease-led residential opportunities.",
      },
      {
        title: "What we show",
        copy: "Review price, income, works, running costs, assumptions and exit considerations.",
      },
      {
        title: "Your due diligence",
        copy: "Verify the title, condition, demand, finance, tax, compliance and figures independently.",
      },
    ],
    form: "Residential investment opportunity enquiry",
  },
};
const operatorLeaseListings = [
  {
    slug: "ol-2026-001",
    ref: "OL-2026-001",
    title: "Six-bedroom detached operator lease",
    area: "South Yorkshire",
    address: "Full address released after initial qualification",
    price: "£2,650 pcm proposed lease rent",
    beds: 6,
    baths: 3,
    size: "2,180 sq ft",
    type: "Detached house",
    term: "3–5 years",
    available: "Available by agreement",
    image: "/olympus-images/lease.png",
    summary:
      "A substantial detached home with two reception rooms, a large kitchen, enclosed garden and off-street parking. Suitable operating uses remain subject to owner approval and all necessary permissions.",
    features: [
      "Two reception rooms",
      "Large kitchen and utility",
      "Enclosed rear garden",
      "Off-street parking",
      "Fire and compliance review required",
      "Permitted use to be agreed",
    ],
  },
  {
    slug: "ol-2026-002",
    ref: "OL-2026-002",
    title: "Five-bedroom HMO-style property",
    area: "West Midlands",
    address: "Full address released after initial qualification",
    price: "£2,250 pcm proposed lease rent",
    beds: 5,
    baths: 2,
    size: "1,760 sq ft",
    type: "Semi-detached house",
    term: "3 years minimum",
    available: "Available within 8 weeks",
    image: "/olympus-images/hero.png",
    summary:
      "A well-proportioned residential property with five bedrooms, shared living space and good transport access. Operators must evidence their intended model, insurance and compliance approach.",
    features: [
      "Five double bedrooms",
      "Shared lounge",
      "Two bathrooms",
      "Rear garden",
      "Near local transport",
      "Licence position to be verified",
    ],
  },
  {
    slug: "ol-2026-003",
    ref: "OL-2026-003",
    title: "Seven-bedroom former guest house",
    area: "North West England",
    address: "Full address released after initial qualification",
    price: "£3,400 pcm proposed lease rent",
    beds: 7,
    baths: 6,
    size: "3,050 sq ft",
    type: "Detached former guest house",
    term: "5 years preferred",
    available: "Under operator review",
    image: "/olympus-images/residential.png",
    summary:
      "A larger property offering generous accommodation, multiple bathrooms and communal areas. Any change of use, licensing and operational suitability must be established before lease terms are agreed.",
    features: [
      "Seven bedrooms",
      "Six bathrooms",
      "Two communal rooms",
      "Commercial-style kitchen",
      "Parking for four vehicles",
      "Planning position to be confirmed",
    ],
  },
];
const opportunityCategories = [
  {
    slug: "residential",
    title: "Residential Property",
    intro:
      "Browse every residential opportunity, including homes to buy, rentals and operator lease properties.",
  },
  {
    slug: "homes-for-sale",
    title: "Homes for Buyers",
    intro:
      "Residential homes available for buyers, from first homes to longer-term purchases.",
  },
  {
    slug: "homes-to-rent",
    title: "Residential Rental Opportunities",
    intro:
      "Homes available to rent, with availability and enquiry routes shown clearly.",
  },
  {
    slug: "investment",
    title: "Property Investment Opportunities",
    intro:
      "Residential, commercial and lease opportunities where the figures and assumptions matter.",
  },
  {
    slug: "operator-lease",
    title: "Operator Lease Opportunities",
    intro:
      "Properties offered by landlords who are open to a professional operator lease.",
  },
  {
    slug: "investor-lease",
    title: "Investor Lease Opportunities",
    intro:
      "Lease-led opportunities for investors seeking income-producing property arrangements.",
  },
  {
    slug: "commercial",
    title: "Commercial Property Opportunities",
    intro:
      "Commercial premises for sale, to let or offered as an investment opportunity.",
  },
  {
    slug: "commercial-to-rent",
    title: "Commercial Property to Rent",
    intro:
      "Commercial units, offices, shops and flexible premises available to rent.",
  },
  {
    slug: "commercial-for-sale",
    title: "Commercial Property for Sale",
    intro:
      "Commercial premises available to buyers, owner-occupiers and investors.",
  },
];
const glossaryEntries=[
  {term:"BMV",definition:"Below market value: a price claimed to be lower than comparable market evidence. Verify the valuation, condition, restrictions and reason for the discount.",href:"/learn/deal-breakdowns/"},
  {term:"Break clause",definition:"A lease term allowing one or both parties to end the lease early if notice, dates and stated conditions are followed.",href:"/leasing/"},
  {term:"Change of use",definition:"A planning change from one lawful property use to another. Permission may be required even when the physical building remains unchanged.",href:"/social-care/property/"},
  {term:"Completion date",definition:"The agreed date when purchase money is transferred, legal ownership changes and the buyer normally receives the keys.",href:"/learn/first-time-buyers/"},
  {term:"Dilapidations",definition:"A commercial-lease claim concerning repair, reinstatement or decoration obligations that the tenant has not satisfied.",href:"/opportunities/commercial/"},
  {term:"Exchange of contracts",definition:"The stage when signed sale contracts are exchanged and the transaction normally becomes legally binding, subject to their terms.",href:"/learn/first-time-buyers/"},
  {term:"Exempt accommodation",definition:"Certain supported housing where care, support or supervision is provided and different Housing Benefit rules may apply. Specialist advice is essential.",href:"/social-care/property/"},
  {term:"FRI lease",definition:"A full repairing and insuring lease, commonly requiring the commercial tenant to repair the premises and meet insurance costs directly or through the landlord.",href:"/opportunities/commercial/"},
  {term:"Gazumping",definition:"When a seller accepts a higher or preferable offer from another buyer before contracts have been exchanged.",href:"/learn/first-time-buyers/"},
  {term:"Ground rent",definition:"A periodic payment that some leaseholders must make under their lease. Check the amount, review provisions and current legal restrictions.",href:"/learn/first-time-buyers/"},
  {term:"Heads of terms",definition:"A summary of the main commercial points proposed for a lease or transaction. It is usually subject to contract and legal documentation.",href:"/leasing/"},
  {term:"Leasehold vs freehold",definition:"Freehold normally means owning the building and land indefinitely. Leasehold means owning a time-limited interest subject to the lease and possible charges.",href:"/learn/first-time-buyers/"},
  {term:"Property chain",definition:"Linked purchases and sales in which one completion depends on another. Longer chains can create additional timing and failure risk.",href:"/learn/first-time-buyers/"},
  {term:"Refurbishment",definition:"Works intended to repair, modernise or reconfigure a property. Budget for surveys, permissions, contingency, finance and holding costs.",href:"/learn/deal-breakdowns/"},
  {term:"Rental yield",definition:"Annual rent divided by property value or purchase price, expressed as a percentage. Gross yield excludes finance, voids, repairs and running costs.",href:"/learn/property-income/"},
  {term:"Service charge",definition:"A payment towards shared services, maintenance, management or insurance. Review accounts, planned major works and the lease before buying.",href:"/learn/first-time-buyers/"},
  {term:"Sold STC",definition:"Sold subject to contract: an offer has been accepted, but contracts have not been exchanged and the sale is not yet legally complete.",href:"/opportunities/homes-for-sale/"},
  {term:"Supported living",definition:"Housing provided alongside support that helps a person live more independently. Property, care, funding, planning and provider requirements must be considered separately.",href:"/social-care/property/"},
  {term:"Title deeds",definition:"Documents and registered information evidencing ownership, boundaries, rights and restrictions. A conveyancer checks the legal title during a purchase.",href:"/learn/first-time-buyers/"},
  {term:"Under offer",definition:"The seller or agent has accepted an offer in principle, but the transaction has not yet exchanged contracts or completed.",href:"/opportunities/homes-for-sale/"}
];
function A(
  p: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string },
) {
  return <a {...p} />;
}
function Header() {
  const [o, setO] = useState(false);
  return (
    <>
      <div className="topbar">
        PROPERTY OPPORTUNITIES · HOMES · COMMERCIAL · LEASING
      </div>
      <header>
        <A href="/" className="brand">
          <img src="/olympus-mark.svg" alt="" />
          <span>
            Olympus<small>PROPERTY</small>
          </span>
        </A>
        <button className="menu" onClick={() => setO(!o)} aria-label="Menu">
          {o ? <X /> : <Menu />}
        </button>
        <nav className={o ? "open" : ""}>
          {[
            ["Opportunities", "/opportunities/"],
            ["Leasing", "/leasing/"],
            ["Social Care", "/social-care/"],
            ["Inspections", "/inspections/"],
            ["Learn", "/learn/"],
            ["Mentorship", "/mentorship/"],
          ].map((x) => (
            <A key={x[1]} href={x[1]}>
              {x[0]}
            </A>
          ))}
          <A href="/list-a-property/" className="button">
            List a property
          </A>
        </nav>
      </header>
    </>
  );
}
function Footer() {
  return (
    <footer>
      <div className="footer-grid">
        <div>
          <div className="brand inverse">
            <img src="/olympus-mark.svg" alt="" />
            <span>
              Olympus<small>PROPERTY</small>
            </span>
          </div>
          <p>
            Property done right.
            <br />
            UK-wide property opportunities
          </p>
        </div>
        <div>
          <h3>Explore</h3>
          <A href="/opportunities/">Property opportunities</A>
          <A href="/leasing/">Leasing</A>
          <A href="/social-care/">Social care property</A>
          <A href="/learn/">Learn</A>
        </div>
        <div>
          <h3>Olympus</h3>
          <A href="/about/">About</A>
          <A href="/contact/">Contact</A>
          <A href="/how-listings-work/">How listings work</A>
          <A href="/glossary/">Glossary</A>
        </div>
        <div>
          <h3>Stay informed</h3>
          <p>New opportunities and practical deal breakdowns.</p>
          <A href="/join/" className="arrow">
            Join the network <ArrowRight />
          </A>
        </div>
      </div>
      <div className="legal">
        © 2026 Olympus Property{" "}
        <span>
          <A href="/privacy/">Privacy</A> · <A href="/cookies/">Cookies</A> ·{" "}
          <A href="/terms/">Terms</A> ·{" "}
          <A href="/accessibility/">Accessibility</A>
        </span>
        <span className="site-credit">Built by <a href="https://theseedsprout.com" target="_blank" rel="noreferrer">SeedSprout</a></span>
      </div>
    </footer>
  );
}
function Inner({ p, dark = false }: { p: Page; dark?: boolean }) {
  const formLabel=p.form?.includes("mentorship")?"Inquire now":p.form?.includes("Property listing")?"List property":p.form?.includes("inspection")?"Request an inspection":p.form?"Make an enquiry":"";
  const actions=p.actions||(p.title==="Property Mentorship"?[["Inquire now","#form"]]:p.form?[[formLabel,"#form"]]:[]);
  return (
    <section className={dark ? "inner dark" : "inner"}>
      <div className="crumb">
        <A href="/">
          <HomeIcon /> Home
        </A>{" "}
        / {p.title}
      </div>
      <span className="kicker">{p.eyebrow}</span>
      <h1>{p.title}</h1>
      <p>{p.intro}</p>
      {actions.length>0&&<div className="inner-actions">{actions.map((action,i)=><A href={action[1]} className={i===0?"button":"button ghost"} key={action[0]}>{action[0]} <ArrowRight/></A>)}</div>}
    </section>
  );
}
function PropertyListingForm(){const[s,setS]=useState(false);if(s)return <section className="form success" id="form"><Check/><h2>Property listing prepared</h2><p>Thank you. Your property information has been recorded for review.</p></section>;return <section className="form property-listing-form" id="form"><div><span className="kicker">Start here</span><h2>List your property</h2><p>Complete the fields you know. The prompts explain what to include, so you do not need property-listing experience.</p><p className="form-note">Fields marked * are required. You can add photographs and a video-tour link.</p></div><form onSubmit={e=>{e.preventDefault();setS(true)}}><h3 className="wide">Your details</h3><label>Full name *<input name="full_name" required autoComplete="name"/></label><label>Email address *<input name="email" required type="email" autoComplete="email"/></label><label>Phone number *<input name="phone" required type="tel" autoComplete="tel"/></label><label>Your role *<select name="role" required defaultValue=""><option value="" disabled>Select</option><option>Owner</option><option>Landlord</option><option>Estate or letting agent</option><option>Authorised representative</option></select></label><label className="wide">Owner or company name<input name="company" placeholder="If different from the name above"/></label><h3 className="wide">Property address</h3><label className="wide">Address line 1 *<input name="address_1" required placeholder="House number and street" autoComplete="address-line1"/></label><label>Address line 2<input name="address_2" autoComplete="address-line2"/></label><label>Town or city *<input name="city" required autoComplete="address-level2"/></label><label>County<input name="county"/></label><label>Postcode *<input name="postcode" required autoComplete="postal-code"/></label><h3 className="wide">Listing and property type</h3><label>What are you offering? *<select name="listing_type" required defaultValue=""><option value="" disabled>Select</option><option>Residential property for sale</option><option>Residential property to rent</option><option>Commercial property for sale</option><option>Commercial property to rent</option><option>Operator lease opportunity</option><option>Social care or supported-living premises</option><option>Investment opportunity</option></select></label><label>Property style *<select name="property_style" required defaultValue=""><option value="" disabled>Select</option><option>Detached house</option><option>Semi-detached house</option><option>Terraced house</option><option>Bungalow</option><option>Flat or apartment</option><option>HMO</option><option>Guest house or hotel</option><option>Office</option><option>Retail unit</option><option>Industrial or warehouse</option><option>Land or development site</option><option>Other</option></select></label><label>Asking price or monthly rent *<input name="price" required placeholder="For example, £325,000 or £1,650 pcm"/></label><label>Tenure<select name="tenure" defaultValue=""><option value="">Select if known</option><option>Freehold</option><option>Leasehold</option><option>Share of freehold</option><option>Not applicable</option></select></label><label>Available from<input name="available_from" type="date"/></label><label>Current status<select name="status" defaultValue="Available"><option>Available</option><option>Tenanted</option><option>Vacant</option><option>Under renovation</option><option>Coming soon</option></select></label><h3 className="wide">Size and accommodation</h3><label>Bedrooms<input name="bedrooms" type="number" min="0"/></label><label>Bathrooms<input name="bathrooms" type="number" min="0"/></label><label>Separate toilets / WCs<input name="toilets" type="number" min="0"/></label><label>Reception rooms<input name="receptions" type="number" min="0"/></label><label>Kitchens<input name="kitchens" type="number" min="0"/></label><label>Total floors<input name="floors" type="number" min="0"/></label><label>Approximate internal size<input name="internal_size" placeholder="For example, 1,850 sq ft or 172 sq m"/></label><label>Plot or land size<input name="plot_size" placeholder="If applicable"/></label><h3 className="wide">Features and amenities</h3><label className="wide">Amenities and key features<textarea name="amenities" rows={4} placeholder="Garden, driveway, garage, parking, balcony, lift, en-suites, utility room, accessibility, outbuildings, furnished status"/></label><label>Parking<select name="parking" defaultValue=""><option value="">Select</option><option>None</option><option>On-street</option><option>Driveway</option><option>Garage</option><option>Allocated space</option><option>Multiple spaces</option></select></label><label>Outdoor space<select name="outdoor_space" defaultValue=""><option value="">Select</option><option>None</option><option>Private garden</option><option>Shared garden</option><option>Balcony or terrace</option><option>Land or grounds</option></select></label><label>Heating type<input name="heating" placeholder="For example, gas central heating"/></label><label>Energy rating<input name="epc" placeholder="EPC rating, if known"/></label><label>Council tax band<input name="council_tax"/></label><label>Business rates<input name="business_rates" placeholder="Commercial properties"/></label><h3 className="wide">Condition, permissions and documents</h3><label>Property condition<select name="condition" defaultValue=""><option value="">Select</option><option>New or recently built</option><option>Excellent</option><option>Good</option><option>Needs modernisation</option><option>Refurbishment project</option><option>Development opportunity</option></select></label><label>Occupancy<select name="occupancy" defaultValue=""><option value="">Select</option><option>Vacant</option><option>Owner occupied</option><option>Tenanted</option><option>Part occupied</option></select></label><label className="wide">Planning, licence or permitted-use information<textarea name="permissions" rows={3} placeholder="Planning use, HMO licence, restrictions, lease conditions or permissions"/></label><label className="wide">Works completed or required<textarea name="works" rows={3} placeholder="Recent refurbishment, known defects or work still needed"/></label><h3 className="wide">Description and media</h3><label className="wide">Property description *<textarea name="description" required rows={6} placeholder="Describe the layout, condition, location, transport, nearby amenities and what makes the property suitable"/></label><label className="wide upload-field">Property images *<input name="images" required type="file" accept="image/jpeg,image/png,image/webp" multiple/><small>Upload clear exterior, interior, kitchen, bathroom, bedroom and outdoor photographs.</small></label><label className="wide">Video-tour link<input name="video_url" type="url" placeholder="YouTube, Vimeo, Google Drive or another shareable link"/></label><label className="wide">Floorplan or brochure link<input name="brochure_url" type="url" placeholder="Optional shareable link"/></label><label className="wide">Anything else we should know<textarea name="notes" rows={4} placeholder="Access, preferred contact times, lease terms or other information"/></label><label className="wide consent"><input type="checkbox" required/> I confirm I am authorised to submit this property and the information is accurate to the best of my knowledge.</label><label className="wide consent"><input type="checkbox" required/> I agree to the <A href="/privacy/">privacy notice</A>.</label><button className="button wide">List property <ArrowRight/></button></form></section>}
function Form({ name, context }: { name: string; context?: string }) {
  if(name==="Property listing")return <PropertyListingForm/>;
  const [s, setS] = useState(false);
  if (s)
    return (
      <section className="form success">
        <Check />
        <h2>Thank you, your details are recorded</h2>
        <p>
          Your enquiry is grouped as: <strong>{context || name}</strong>.
        </p>
      </section>
    );
  return (
    <section className="form" id="form">
      <div>
        <span className="kicker">Start here</span>
        <h2>{name}</h2>
        <p>
          This enquiry will be grouped as <strong>{context || name}</strong>, so
          it reaches the right team.
        </p>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setS(true);
        }}
      >
        <label>
          Full name *<input required />
        </label>
        <label>
          Email *<input required type="email" />
        </label>
        <label>
          Phone
          <input />
        </label>
        {name==="Owner lease offer"&&<><label>Property address *<input required placeholder="Address and postcode"/></label><label>Property type *<input required placeholder="House, HMO, flat, commercial"/></label><label>Bedrooms / approximate size<input placeholder="Bedrooms or floor area"/></label><label>Current occupancy<select defaultValue=""><option value="">Select</option><option>Vacant</option><option>Owner occupied</option><option>Tenanted</option></select></label><label>Proposed monthly rent<input placeholder="If known"/></label><label>Preferred lease term<input placeholder="For example, 3–5 years"/></label><label className="wide">What uses would you consider? *<textarea required rows={3} placeholder="HMO, supported housing, serviced accommodation or other permitted use"/></label><label className="wide">Planning, licence, lender and insurance position<textarea rows={3} placeholder="Tell us what has been confirmed and what remains to be checked"/></label></>}
        {name==="Operator requirement"&&<><label>Organisation name *<input required/></label><label>Operating model *<select required defaultValue=""><option value="" disabled>Select</option><option>HMO</option><option>Supported housing</option><option>Serviced accommodation</option><option>Corporate let</option><option>Other</option></select></label><label>Preferred locations *<input required/></label><label>Maximum monthly rent *<input required/></label><label>Bedrooms / capacity required<input/></label><label>Preferred lease term<input/></label><label className="wide">Experience and current portfolio *<textarea required rows={3}/></label><label className="wide">Property requirements and intended use *<textarea required rows={4}/></label></>}
        {name==="Care premises offer"&&<><label>Property address *<input required placeholder="Address and postcode"/></label><label>Your relationship to the property *<select required defaultValue=""><option value="" disabled>Select</option><option>Owner</option><option>Landlord</option><option>Authorised agent</option></select></label><label>Property type *<input required/></label><label>Bedrooms / capacity<input/></label><label>Accessibility features<textarea rows={3} placeholder="Level access, lift, adapted bathrooms, parking or other features"/></label><label>Availability and proposed terms<textarea rows={3}/></label><label className="wide">Planning, registration, licence and compliance status *<textarea required rows={4} placeholder="State what is confirmed, pending or unknown"/></label></>}
        {name==="Care premises requirement"&&<><label>Organisation name *<input required/></label><label>Service or care model *<input required placeholder="Supported living, children’s home, residential care or other"/></label><label>Registration status<select required defaultValue=""><option value="" disabled>Select</option><option>Registered</option><option>Application in progress</option><option>Not yet required / seeking advice</option></select></label><label>Preferred areas *<input required/></label><label>Required capacity / bedrooms *<input required/></label><label>Maximum budget *<input required/></label><label>Required by *<input type="date"/></label><label>Preferred lease term<input/></label><label className="wide">Layout, accessibility and location requirements *<textarea required rows={4}/></label><label className="wide">Decision process and funding position<textarea rows={3}/></label></>}
        <label>
          Enquiry type *
          <select required defaultValue={context || ""}>
            {context && <option>{context}</option>}
            <option value="" disabled>
              Select
            </option>
            <option>Property</option>
            <option>Lease</option>
            <option>Social care</option>
            <option>Other</option>
          </select>
        </label>
        <label className="wide">
          Tell us more *<textarea required rows={5} />
        </label>
        <label className="wide">
          <input type="checkbox" required /> I agree to the{" "}
          <A href="/privacy/">privacy notice</A>.
        </label>
        <button className="button wide">
          Send enquiry <ArrowRight />
        </button>
      </form>
    </section>
  );
}
function ListingEnquiry({
  listing,
}: {
  listing: (typeof operatorLeaseListings)[number];
}) {
  const [s, setS] = useState(false);
  const [name, setName] = useState("");
  if (s)
    return (
      <section className="form success" id="enquire">
        <Check />
        <h2>Enquiry prepared for {listing.ref}</h2>
        <p>
          <strong>{name}</strong> is interested in “{listing.title}” (
          {listing.area}). The property reference, page URL and enquiry type are
          attached automatically.
        </p>
        <p className="delivery-note">
          Delivery to an inbox or CRM will be activated once Olympus supplies
          the destination email or CRM connection.
        </p>
      </section>
    );
  return (
    <section className="form" id="enquire">
      <div>
        <span className="kicker">Property enquiry · {listing.ref}</span>
        <h2>Make an enquiry</h2>
        <p>
          Your submission will be labelled{" "}
          <strong>
            {listing.ref} — {listing.title}
          </strong>
          , so the team knows exactly which property you mean.
        </p>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setS(true);
        }}
      >
        <input type="hidden" name="listing_reference" value={listing.ref} />
        <input type="hidden" name="listing_title" value={listing.title} />
        <label>
          Full name *
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Email *<input required type="email" />
        </label>
        <label>
          Phone *<input required />
        </label>
        <label>
          Organisation
          <input />
        </label>
        <label>
          Operating model *
          <select required defaultValue="">
            <option value="" disabled>
              Select
            </option>
            <option>HMO</option>
            <option>Supported housing</option>
            <option>Serviced accommodation</option>
            <option>Corporate let</option>
            <option>Other</option>
          </select>
        </label>
        <label>
          Preferred lease term
          <select defaultValue="">
            <option value="">Select</option>
            <option>3 years</option>
            <option>5 years</option>
            <option>5+ years</option>
          </select>
        </label>
        <label className="wide">
          Tell us about your experience and intended use *
          <textarea required rows={5} />
        </label>
        <label className="wide">
          <input type="checkbox" required /> I agree to the{" "}
          <A href="/privacy/">privacy notice</A>.
        </label>
        <button className="button wide">
          Send property enquiry <ArrowRight />
        </button>
      </form>
    </section>
  );
}
function OperatorLeaseListings() {
  return (
    <section className="operator-listings">
      <div className="section-head">
        <div>
          <span className="kicker">Current operator lease opportunities</span>
          <h2>Properties open to operator enquiries.</h2>
        </div>
        <p>
          Example listing content for layout approval. Replace or verify every
          fact before treating a property as live.
        </p>
      </div>
      <div className="operator-listing-grid">
        {operatorLeaseListings.map((x) => (
          <article key={x.ref}>
            <A
              href={`/opportunities/operator-lease/${x.slug}/`}
              className="operator-photo"
              style={{ backgroundImage: `url(${x.image})` }}
            >
              <span>{x.ref}</span>
            </A>
            <div className="operator-card-body">
              <small>
                {x.type} · {x.area}
              </small>
              <h3>
                <A href={`/opportunities/operator-lease/${x.slug}/`}>
                  {x.title}
                </A>
              </h3>
              <div className="property-facts">
                <span>
                  <b>{x.beds}</b> bedrooms
                </span>
                <span>
                  <b>{x.baths}</b> bathrooms
                </span>
                <span>
                  <b>{x.size}</b> internal area
                </span>
              </div>
              <p>{x.summary}</p>
              <strong>{x.price}</strong>
              <A
                href={`/opportunities/operator-lease/${x.slug}/`}
                className="button"
              >
                View property & enquire <ArrowRight />
              </A>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
function OperatorProperty({
  listing,
}: {
  listing: (typeof operatorLeaseListings)[number];
}) {
  return (
    <>
      <Inner
        p={{
          title: listing.title,
          eyebrow: `Operator lease · ${listing.ref}`,
          intro: `${listing.area} · ${listing.price}`,
          sections: [],
          actions: [["Make an enquiry", "#enquire"]],
        }}
      />
      <section className="property-detail">
        <div
          className="property-detail-photo"
          style={{ backgroundImage: `url(${listing.image})` }}
        />
        <div>
          <span className="kicker">Property information</span>
          <h2>{listing.address}</h2>
          <p>{listing.summary}</p>
          <dl>
            <div>
              <dt>Reference</dt>
              <dd>{listing.ref}</dd>
            </div>
            <div>
              <dt>Property type</dt>
              <dd>{listing.type}</dd>
            </div>
            <div>
              <dt>Bedrooms</dt>
              <dd>{listing.beds}</dd>
            </div>
            <div>
              <dt>Bathrooms</dt>
              <dd>{listing.baths}</dd>
            </div>
            <div>
              <dt>Approx. size</dt>
              <dd>{listing.size}</dd>
            </div>
            <div>
              <dt>Lease term</dt>
              <dd>{listing.term}</dd>
            </div>
            <div>
              <dt>Availability</dt>
              <dd>{listing.available}</dd>
            </div>
            <div>
              <dt>Proposed rent</dt>
              <dd>{listing.price}</dd>
            </div>
          </dl>
          <h3>Property features and considerations</h3>
          <ul>
            {listing.features.map((x) => (
              <li key={x}>
                <Check />
                {x}
              </li>
            ))}
          </ul>
          <A href="#enquire" className="button">
            Make an enquiry <ArrowRight />
          </A>
        </div>
      </section>
      <ListingEnquiry listing={listing} />
      <section className="listing-disclaimer">
        <strong>Important</strong>
        <p>
          This is example listing content created to demonstrate the approved
          listing format. Property facts, availability, permissions and
          commercial terms must be verified before publication or commitment.
        </p>
      </section>
    </>
  );
}
function Grid({
  title = "Current property opportunities",
  items = listings,
  showCategories = true,
}: {
  title?: string;
  items?: typeof listings;
  showCategories?: boolean;
}) {
  return (
    <section className="opps">
      <div className="section-head">
        <div>
          <span className="kicker">The opportunity board</span>
          <h2>{title}</h2>
        </div>
        {showCategories && (
          <div className="filters category-links">
            <A href="/opportunities/" className="active">
              All
            </A>
            <A href="/opportunities/residential/">Residential</A>
            <A href="/opportunities/homes-to-rent/">Rentals</A>
            <A href="/opportunities/operator-lease/">Operator lease</A>
            <A href="/opportunities/investment/">Investment</A>
            <A href="/opportunities/commercial/">Commercial</A>
          </div>
        )}
      </div>
      <div className="cards">
        {items.map((x) => (
          <article className="listing" key={x.title}>
            <A
              href={x.href}
              className="listing-image"
              style={{ backgroundImage: `url(${x.image})` }}
            >
              <span>{x.type}</span>
            </A>
            <div className="listing-body">
              <small>
                {x.deal} · {x.town}
              </small>
              <h3>
                <A href={x.href}>{x.title}</A>
              </h3>
              <p>{x.town} · Requirement-led matching</p>
              <div>
                <strong>{x.price}</strong>
                <A href={x.href} aria-label={`Learn more about ${x.title}`}>
                  <ArrowRight />
                </A>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
function InvestmentComingSoon(){return <section className="investment-soon"><span className="kicker">Investment opportunities</span><h2>Soon to come.</h2><p>Property investment brings people and capital together to acquire or control property with an agreed strategy. Opportunities may include buy-to-let, refurbishment, joint purchases and lease-led income structures. Each opportunity will set out its structure, assumptions and key risks before enquiries are invited.</p><A href="#form" className="button">Make an investment enquiry <ArrowRight/></A></section>}
function News({
  headline = "Join the Olympus Property Network",
}: {
  headline?: string;
}) {
  const [s, setS] = useState(false);
  return (
    <section className="newsletter">
      <div>
        <span className="kicker">Free property updates</span>
        <h2>{headline}</h2>
        <p>
          New opportunities, lease deals and a useful deal breakdown.
          Unsubscribe any time.
        </p>
      </div>
      {s ? (
        <div className="thanks">
          <Check /> You are on the list.
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setS(true);
          }}
        >
          <input required placeholder="First name" />
          <input required type="email" placeholder="Email address" />
          <label>
            <input required type="checkbox" /> I agree to receive emails. See
            our <A href="/privacy/">privacy policy</A>.
          </label>
          <button className="button cream">
            Join the network <ArrowRight />
          </button>
        </form>
      )}
    </section>
  );
}
function HomeListingRoutes() {
  const routes = [
    {
      title: "Residential property to rent",
      copy: "Browse houses and homes currently available for residential rent.",
      href: "/opportunities/homes-to-rent/",
      image: "/olympus-images/lease.png",
    },
    {
      title: "Residential property for sale",
      copy: "See homes available to buyers, including first homes and investment purchases.",
      href: "/opportunities/homes-for-sale/",
      image: "/olympus-images/residential.png",
    },
    {
      title: "Commercial property to rent",
      copy: "Find offices, shops, industrial units and flexible premises available to let.",
      href: "/opportunities/commercial-to-rent/",
      image: "/olympus-images/commercial.png",
    },
    {
      title: "Commercial property for sale",
      copy: "Browse commercial property for owner-occupation or investment.",
      href: "/opportunities/commercial-for-sale/",
      image: "/olympus-images/commercial.png",
    },
  ];
  return (
    <section className="home-listing-routes">
      <div className="home-routes-heading">
        <div>
          <span className="kicker">Browse property listings</span>
          <h2>Find property by market.</h2>
        </div>
        <p>
          Go directly to the type of listing you need. Each page contains only
          matching properties and links to related opportunities.
        </p>
      </div>
      <div className="home-route-grid">
        {routes.map((x) => (
          <A href={x.href} className="home-route-card" key={x.href}>
            <div style={{ backgroundImage: `url(${x.image})` }} />
            <span>View listings</span>
            <h3>{x.title}</h3>
            <p>{x.copy}</p>
            <b>
              Browse properties <ArrowRight />
            </b>
          </A>
        ))}
      </div>
    </section>
  );
}
function Home() {
  return (
    <>
      <section className="hero">
        <div>
          <span className="kicker">UK-wide property opportunities</span>
          <h1>
            Property done <em>right.</em>
          </h1>
          <p>
            Find homes and commercial premises, offer a property for lease, or
            get practical help with your next property decision.
          </p>
          <div className="actions">
            <A href="/opportunities/" className="button">
              Browse opportunities <ArrowRight />
            </A>
            <A href="/list-a-property/" className="button ghost">
              List a property
            </A>
          </div>
          <div className="trust">
            <span>
              <ShieldCheck /> Reviewed before publication
            </span>
            <span>
              <Check /> Clear enquiries
            </span>
          </div>
        </div>
        <div className="visual">
          <div>
            PROPERTY OPPORTUNITY <b>REQUIREMENTS OPEN</b>
          </div>
          <div className="art">
            <i />
            <span className="house a" />
            <span className="house b" />
            <span className="house c" />
          </div>
          <strong>Find the right property route</strong>
        </div>
      </section>
      <section className="routes">
        {[
          ["I want to buy or rent", "/opportunities/residential/"],
          ["I want to sell or rent out", "/list-a-property/"],
          ["I operate property", "/leasing/find-a-property/"],
          ["Property glossary", "/glossary/"],
        ].map((x) => (
          <A href={x[1]} key={x[1]}>
            {x[0]}
            <ArrowRight />
          </A>
        ))}
      </section>
      <HomeListingRoutes />
      <Grid />
      <section className="intro">
        <div>
          <span className="kicker">More than listings</span>
          <h2>
            One platform.
            <br />
            <em>Better property decisions.</em>
          </h2>
        </div>
        <p>
          Whether you own, operate, buy or learn, Olympus brings the opportunity
          and the practical next step together.
        </p>
      </section>
      <section className="services">
        {[
          ["LEASING", "Reliable routes for owners and operators", "/leasing/"],
          ["SOCIAL CARE", "Property with a defined purpose", "/social-care/"],
          ["LEARN", "Knowledge that moves you forward", "/learn/"],
        ].map((x, i) => (
          <A href={x[2]} className="service" key={x[0]}>
            <span>
              0{i + 1} / {x[0]}
            </span>
            <h3>{x[1]}</h3>
            <p>
              Clear information, useful next steps and a direct route to
              register your requirements.
            </p>
            <b>
              Explore <ArrowRight />
            </b>
          </A>
        ))}
      </section>
      <News />
      <section className="cta">
        <div>
          <span className="kicker">Have a property to advertise?</span>
          <h2>Put it in front of the right people.</h2>
        </div>
        <A href="/list-a-property/" className="button cream">
          List your property <ArrowRight />
        </A>
      </section>
    </>
  );
}
function Opportunities() {
  return (
    <>
      <Inner
        p={{
          title: "Property Opportunities",
          eyebrow: "Buy · Rent · Lease · Renovate",
          intro:
            "Homes, commercial premises and lease deals, with the key facts visible and a clear route to enquire.",
          sections: [],
        }}
      />
      <Grid title="All current opportunities" />
      <section className="info">
        <div>
          <Search />
          <h2>Browse by type</h2>
          <p>Filter residential, commercial and lease opportunities.</p>
        </div>
        <div>
          <ShieldCheck />
          <h2>Reviewed listings</h2>
          <p>
            Advertisers confirm authority and figures are labelled by source.
          </p>
        </div>
        <div>
          <Sprout />
          <h2>Nothing suitable?</h2>
          <p>Register your requirements for upcoming opportunities.</p>
        </div>
      </section>
      <News headline="Get new opportunities first" />
    </>
  );
}
function OpportunityCategory({
  category,
}: {
  category: (typeof opportunityCategories)[number];
}) {
  const items = listings.filter((x) => x.categories.includes(category.slug));
  const related = opportunityCategories
    .filter((x) => x.slug !== category.slug)
    .slice(0, 5);
  const guide = opportunityGuides[category.slug];
  return (
    <>
      <Inner
        p={{
          title: category.title,
          eyebrow: guide?.eyebrow || "Property opportunities",
          intro: guide?.intro || category.intro,
          sections: [],
          actions: guide&&category.slug!=="operator-lease"?[["Make an enquiry","#form"]]:undefined,
        }}
      />
      <div className="category-breadcrumbs">
        <A href="/opportunities/">All opportunities</A>
        <span>/</span>
        <strong>{category.title}</strong>
      </div>
      {category.slug === "investment" ? (
        <InvestmentComingSoon />
      ) : category.slug === "operator-lease" ? (
        <OperatorLeaseListings />
      ) : (
        <Grid
          title={`Current ${category.title.toLowerCase()}`}
          items={items}
          showCategories={false}
        />
      )}
      {guide && category.slug !== "investment" && (
        <section className="opportunity-guide compact">
          <div className="opportunity-guide-intro">
            <span className="kicker">How it works</span>
            <h2>A simple route from requirement to enquiry.</h2>
          </div>
          <div className="opportunity-guide-grid">
            {guide.sections.map((section, i) => (
              <article key={section.title}>
                <span>0{i + 1}</span>
                <h3>{section.title}</h3>
                <p>{section.copy}</p>
              </article>
            ))}
          </div>
        </section>
      )}
      {guide && category.slug !== "operator-lease" && (
        <Form name={guide.form} context={category.title} />
      )}
      {category.slug !== "investment" && <section className="category-directory">
        <span className="kicker">Continue browsing</span>
        <h2>Related opportunity pages</h2>
        <div>
          {related.map((x) => (
            <A href={`/opportunities/${x.slug}/`} key={x.slug}>
              {x.title}
              <ArrowRight />
            </A>
          ))}
        </div>
      </section>}
      {!guide && (
        <section className="category-action">
          <div>
            <span className="kicker">A clear next step</span>
            <h2>Cannot see the right property yet?</h2>
            <p>
              Send a property requirement and we will record the type, budget
              and arrangement you need.
            </p>
          </div>
          <div className="actions">
            <A href="/contact/" className="button ghost">
              Register requirements
            </A>
          </div>
        </section>
      )}
      <News headline={`Get new ${category.title.toLowerCase()} first`} />
    </>
  );
}
function Mentorship(){return <><Inner p={{title:"Property Mentorship",eyebrow:"One-to-one property guidance",intro:"Build your next property move with practical support shaped by more than 35 years of experience.",sections:[]}}/><section className="mentorship-intro"><div><span className="kicker">From your first property to your fifth</span><h2>Guidance built around the outcome you want.</h2></div><p>Whether you are preparing for your first acquisition or expanding an existing portfolio, the programme helps you build knowledge, assess real opportunities and move forward with a clear plan.</p></section><section className="mentorship-pillars">{[{n:"01",title:"One-to-one guidance",copy:"Work directly with experienced mentors on your goals, strategy, questions and next actions."},{n:"02",title:"Bring live deals",copy:"Review real opportunities, the numbers, risks, funding route, due diligence and negotiation before you decide."},{n:"03",title:"Source opportunities",copy:"Learn practical sourcing methods, including ways to structure and control opportunities without relying only on your own purchase capital."},{n:"04",title:"Acquisition support",copy:"Get guidance through search, analysis, offers, professional checks and the steps towards completing a suitable acquisition."},{n:"05",title:"Professional network",copy:"Understand when to involve solicitors, finance professionals, surveyors and other specialists, and what to ask them."},{n:"06",title:"Works and delivery",copy:"Plan refurbishment or property works with clearer briefs, budgets and access to relevant subcontractor support."}].map(x=><article key={x.n}><span>{x.n}</span><h3>{x.title}</h3><p>{x.copy}</p></article>)}</section><section className="mentorship-commitment"><div><span className="kicker">A holistic programme</span><h2>Knowledge, opportunities and accountable next steps.</h2></div><div><p>The programme is designed to stay close to your real objective—not simply deliver generic lessons. We help you strengthen your understanding, challenge assumptions and work through the practical stages of a property decision.</p><p>Property outcomes and finance are never guaranteed. Every acquisition remains subject to suitable opportunities, funding, professional advice and your own due diligence.</p></div></section><Form name="Join the mentorship programme" context="Property mentorship application"/></>}
function Generic({ p }: { p: Page }) {
  const formFirst=p.title==="List Your Property for Sale or to Rent";
  return (
    <>
      <Inner p={p} />
      {p.form&&formFirst&&<Form name={p.form}/>}
      {p.sections.length > 0 && (
        <section className={formFirst?"generic compact-support":"generic"}>
          {p.sections.map((s, i) => (
            <article key={s.title}>
              <span>0{i + 1}</span>
              <div>
                <h2>{s.title}</h2>
                <p>{s.copy}</p>
                {s.link && (
                  <A href={s.link[1]} className="arrow">
                    {s.link[0]} <ArrowRight />
                  </A>
                )}
              </div>
            </article>
          ))}
        </section>
      )}
      {p.form&&!formFirst&&<Form name={p.form}/>}
    </>
  );
}
function Glossary() {
  const [q, setQ] = useState("");
  return (
    <>
      <Inner
        p={{
          title: "Property Glossary",
          eyebrow: "Plain English, A to Z",
          intro:
            "Buying, renting, leasing, commercial and investment language without the fog.",
          sections: [],
        }}
      />
      <label className="search">
        <Search />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search a property term"
        />
      </label>
      <section className="term-list">
        {glossaryEntries
          .filter((x) => `${x.term} ${x.definition}`.toLowerCase().includes(q.toLowerCase()))
          .map((x) => (
            <article key={x.term}>
              <span>{x.term[0]}</span>
              <div>
                <h2>{x.term}</h2>
                <p>{x.definition}</p>
                <A href={x.href} className="arrow">Read the related guide <ArrowRight/></A>
              </div>
            </article>
          ))}
      </section>
    </>
  );
}
function App() {
  const [path, setPath] = useState("/");
  useEffect(
    () =>
      setPath(
        location.pathname.endsWith("/")
          ? location.pathname
          : location.pathname + "/",
      ),
    [],
  );
  let v: React.ReactNode;
  const categorySlug = path.split("/")[2];
  const category = opportunityCategories.find((x) => x.slug === categorySlug);
  const operatorListing = path.startsWith("/opportunities/operator-lease/")
    ? operatorLeaseListings.find(
        (x) => path === `/opportunities/operator-lease/${x.slug}/`,
      )
    : undefined;
  if (path === "/") v = <Home />;
  else if (path === "/opportunities/") v = <Opportunities />;
  else if (operatorListing) v = <OperatorProperty listing={operatorListing} />;
  else if (category) v = <OpportunityCategory category={category} />;
  else if (path === "/opportunities/commercial-property-sheffield/") {
    const p = {
      title: "Commercial Property: For Sale and To Let",
      eyebrow: "Commercial property",
      intro:
        "Industrial units, warehouses, offices and shops. See opportunities or tell us what you need.",
      sections: [],
    };
    v = (
      <>
        <Inner p={p} dark />
        <Grid title="Commercial opportunities" />
        <Form name="Commercial property requirement" />
      </>
    );
  } else if (path === "/glossary/") v = <Glossary />;
  else if (path === "/mentorship/") v = <Mentorship />;
  else if (path === "/mentorship/bring-a-deal/")
    v = (
      <Generic
        p={{
          title: "Bring a Deal: Property Deal Analysis and Review",
          eyebrow: "Structured deal review",
          intro: "Bring the facts, figures and decision you face.",
          sections: [
            {
              title: "What we review",
              copy: "Price, finance, works, income, costs, exits and evidence.",
            },
          ],
          form: "Deal review submission",
        }}
      />
    );
  else if (path === "/join/")
    v = (
      <>
        <Inner
          p={{
            title: "Get New Opportunities First",
            eyebrow: "Join the network",
            intro: "Join the free Olympus Property Network.",
            sections: [],
          }}
        />
        <News />
      </>
    );
  else if (
    ["/privacy/", "/cookies/", "/terms/", "/accessibility/"].includes(path)
  )
    v = (
      <Generic
        p={{
          title: {
            "/privacy/": "Privacy Policy",
            "/cookies/": "Cookie Policy",
            "/terms/": "Website Terms",
            "/accessibility/": "Accessibility Statement",
          }[path]!,
          eyebrow: "Last reviewed 7 November 2026",
          intro:
            "Business-specific legal wording requires review before live submissions are collected.",
          sections: [
            {
              title: "Our commitment",
              copy: "Olympus Property aims to handle information clearly, fairly and securely.",
            },
            {
              title: "Your choices",
              copy: "You can request access, correction or withdrawal of marketing consent.",
            },
          ],
        }}
      />
    );
  else
    v = (
      <Generic
        p={
          P[path] || {
            title: "Page not found",
            eyebrow: "404",
            intro: "We could not find that page.",
            sections: [
              {
                title: "Start again",
                copy: "Browse current opportunities.",
                link: ["View opportunities", "/opportunities/"],
              },
            ],
          }
        }
      />
    );
  return (
    <>
      <Header />
      <main>{v}</main>
      <Footer />
    </>
  );
}
export default App;
