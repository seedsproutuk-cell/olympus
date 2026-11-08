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
      {title:"Scope and limitations",copy:"The agreed scope is confirmed before attendance. An inspection supports—rather than replaces—the responsible person’s wider fire-safety duties."}
    ],
    form: "Request a fire door inspection",
  },
  "/inspections/subcontractors/": {
    title: "Property Subcontractor Services",
    eyebrow: "Delivery support",
    intro: "Tell us what work is required and we can help identify suitable subcontractors for a clearly defined property project.",
    sections: [
      {title:"Trades and specialists",copy:"Support may include repairs, refurbishment, damp remediation, fire-door works, decorating and other defined property services."},
      {title:"A clear brief",copy:"We record the property, required work, timescale, access arrangements and available evidence before introductions are made."},
      {title:"Appointments and responsibility",copy:"Scope, competence, insurance, quotations and contracts must be checked and agreed directly before work begins."}
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
        title: "Get on the property ladder",
        copy: "Build an affordable budget, save a deposit and allow for legal, survey and moving costs.",
      },
      {
        title: "The steps to buying",
        copy: "Get a mortgage in principle, search carefully, offer, appoint a conveyancer and complete due diligence.",
      },
      {
        title: "Costs of buying",
        copy: "Budget beyond the deposit for legal work, searches, surveys, mortgage costs and moving.",
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
        copy: "Own a property and earn rent, while carrying finance, repairs, void and compliance risk.",
      },
      {
        title: "Rent to rent",
        copy: "Control property under contract without owning it. Permissions, margins and delivery are critical.",
      },
      {
        title: "Commercial and supported living",
        copy: "Specialist uses with detailed due diligence and lease terms.",
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
        title: "Residential deals",
        copy: "Price, finance, works, rent, running costs and exit assumptions reviewed together.",
      },
      {
        title: "Operator lease deals",
        copy: "Rent, setup cost, occupancy, operating costs and downside scenarios tested.",
      },
      {
        title: "How we analyse",
        copy: "We separate known facts from advertiser figures and estimates.",
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
      "Advertise a home, rental, lease opportunity or commercial property. Every submission is approved.",
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
const terms = [
  "BMV",
  "Break clause",
  "Change of use",
  "Completion date",
  "Dilapidations",
  "Exchange of contracts",
  "Exempt accommodation",
  "FRI lease",
  "Gazumping",
  "Ground rent",
  "Heads of terms",
  "Leasehold vs freehold",
  "Property chain",
  "Refurbishment",
  "Rental yield",
  "Service charge",
  "Sold STC",
  "Supported living",
  "Title deeds",
  "Under offer",
];
function A(p: { href: string; children: React.ReactNode; className?: string }) {
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
      </div>
    </footer>
  );
}
function Inner({ p, dark = false }: { p: Page; dark?: boolean }) {
  const formLabel=p.form?.includes("mentorship")?"Inquire now":p.form?.includes("Property listing")?"List your property":p.form?.includes("inspection")?"Request an inspection":p.form?"Make an enquiry":"";
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
function Form({ name, context }: { name: string; context?: string }) {
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
          ["I want to buy or rent", "/opportunities/"],
          ["I own a property", "/list-a-property/"],
          ["I operate property", "/leasing/find-a-property/"],
          ["I need premises", "/social-care/property/find-a-property/"],
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
          <p>We review every submission before it goes live.</p>
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
      {category.slug === "operator-lease" ? (
        <OperatorLeaseListings />
      ) : (
        <Grid
          title={`Current ${category.title.toLowerCase()}`}
          items={items}
          showCategories={false}
        />
      )}
      {guide && (
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
      <section className="category-directory">
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
      </section>
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
        {terms
          .filter((x) => x.toLowerCase().includes(q.toLowerCase()))
          .map((x) => (
            <article key={x}>
              <span>{x[0]}</span>
              <div>
                <h2>{x}</h2>
                <p>
                  {x === "Sold STC"
                    ? "Sold subject to contract. An offer is accepted, but the legal sale has not completed."
                    : x === "Rental yield"
                      ? "Annual rent expressed as a percentage of property value or purchase price."
                      : `${x} is a property term whose exact effect depends on the contract and circumstances. Check the underlying documents.`}
                </p>
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
