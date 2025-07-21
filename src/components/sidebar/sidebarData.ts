
import { CategoryItem } from "./SidebarCategory";

// Top-level categories for main navigation (reordered to move Summary below Reports)
export const mainNavCategories: CategoryItem[] = [
  {
    id: "pipeline",
    name: "Pipeline",
    path: "/pipeline"
  },
  {
    id: "propertyDetails",
    name: "Property Details",
    path: "/property-details"
  },
  {
    id: "marketData",
    name: "Market Data",
    subCategories: [
      { id: "marketComps", name: "Market Comps", path: "/market" },
      { id: "operatingStatistics", name: "Operating Statistics", path: "/operating-statistics" },
      { id: "transactionSummary", name: "Transaction Summary", path: "/transaction-summary" }
    ]
  },
  {
    id: "valuation",
    name: "Valuation",
    path: "/valuation"
  },
  {
    id: "proForma",
    name: "Pro Forma",
    path: "/revenue",
    subCategories: [
      {
        id: "penetration-analysis-group",
        name: "Penetration Analysis",
        subCategories: [
          { id: "occupancy-section", name: "Occupancy" },
          { id: "adr-section", name: "ADR" },
          { id: "revpar-section", name: "RevPAR" },
        ],
      },
      {
        id: "revenue-group",
        name: "Revenue",
        subCategories: [
          { id: "rooms-revenue-section", name: "Rooms Revenue" },
          { id: "food-beverage-section", name: "Food & Beverage" },
          { id: "other-operated-section", name: "Other Operated" },
          { id: "miscellaneous-section", name: "Miscellaneous" },
          { id: "total-revenue-section", name: "Total Revenue" },
        ],
      },
      {
        id: "expense-group",
        name: "Expense",
        subCategories: [
          { id: "rooms-expense-section", name: "Rooms Expense" },
          { id: "food-beverage-expense-section", name: "Food & Beverage" },
          { id: "other-operated-expense-section", name: "Other Operated" },
          { id: "miscellaneous-expense-section", name: "Miscellaneous" },
          {
            id: "undistributed-expense-group",
            name: "Undistributed Expense",
            subCategories: [
              { id: "administrative-general-expense-section", name: "Administrative & General" },
              { id: "info-tech-services-expense-section", name: "Info & Tech Services" },
              { id: "sales-marketing-expense-section", name: "Sales & Marketing" },
              { id: "property-operations-expense-section", name: "Property Operations & Maintenance" },
              { id: "utilities-expense-section", name: "Utilities" },
            ],
          },
          {
            id: "non-operating-expense-group",
            name: "Non-Operating Expense",
            subCategories: [
              { id: "management-fees-section", name: "Management Fees" },
              { id: "real-estate-taxes-section", name: "Real Estate Taxes" },
              { id: "insurance-section", name: "Insurance" },
              { id: "other-non-operating-section", name: "Other" },
            ],
          },
          { id: "total-expense-section", name: "Total Expense" },
        ],
      },
      { id: "capital-expense-section", name: "Capital Expense" },
    ],
  },
  {
    id: "summary",
    name: "Investment Summary",
    path: "/summary"
  },
  {
    id: "reports",
    name: "Reports",
    subCategories: [
      { id: "occupancyReport", name: "Occupancy Report", path: "/subject-occupancy" }
    ]
  },
  {
    id: "documents",
    name: "Documents",
    path: "/documents"
  }
  // Department & Item Setup removed from sidebar
];

// Parking lot categories (removed "Investment Assumptions" since it's now in main nav)
export const parkingLotCategories: CategoryItem[] = [
  {
    id: "waterfall",
    name: "Waterfall"
  }
];
