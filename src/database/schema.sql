
-- Database Schema for Property Management System

---------------------------------------
-- Core Tables
---------------------------------------

-- Property Details - Primary table
CREATE TABLE Property_Details (
    id SERIAL PRIMARY KEY,
    propName TEXT NOT NULL,
    censusID INTEGER,
    propAddress TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    zipCode TEXT,
    roomsKeys INTEGER NOT NULL,
    propType TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'active',
    keyMoney INTEGER,
    version TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Occupancy Forecast - Stores JSON data for property occupancy projections
CREATE TABLE Occupancy_Forecast (
    id SERIAL PRIMARY KEY,
    property_id INTEGER NOT NULL REFERENCES Property_Details(id) ON DELETE CASCADE,
    forecast_data JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

---------------------------------------
-- Property Financial Information
---------------------------------------

-- Acquisition table
CREATE TABLE Acquisition (
    id SERIAL PRIMARY KEY,
    property_id INTEGER NOT NULL REFERENCES Property_Details(id) ON DELETE CASCADE,
    acqCosts NUMERIC(10, 2),
    acqMonth TEXT,
    acqYear INTEGER,
    capRateGoingIn NUMERIC(10, 2),
    holdPeriod INTEGER,
    purchPrice INTEGER NOT NULL,
    purchPriceMethod TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Financing table
CREATE TABLE Financing (
    id SERIAL PRIMARY KEY,
    property_id INTEGER NOT NULL REFERENCES Property_Details(id) ON DELETE CASCADE,
    amortYears INTEGER,
    discRate NUMERIC(10, 2),
    intRate NUMERIC(10, 2),
    intOnlyPeriod INTEGER,
    loanFeePct NUMERIC(10, 2),
    loanTerm INTEGER,
    ltvRatio NUMERIC(10, 2),
    capExReserve INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Disposition table
CREATE TABLE Disposition (
    id SERIAL PRIMARY KEY,
    property_id INTEGER NOT NULL REFERENCES Property_Details(id) ON DELETE CASCADE,
    capRateExit NUMERIC(10, 2),
    salesExpPct NUMERIC(10, 2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

---------------------------------------
-- Property Operations & Analytics
---------------------------------------

-- CapEx (Capital Expenditures) table
CREATE TABLE CapEx (
    id SERIAL PRIMARY KEY,
    property_id INTEGER NOT NULL REFERENCES Property_Details(id) ON DELETE CASCADE,
    capExType TEXT,
    ownerFunded NUMERIC(10, 2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Inflation Assumptions table
CREATE TABLE Inflation_Assumptions (
    id SERIAL PRIMARY KEY,
    property_id INTEGER NOT NULL REFERENCES Property_Details(id) ON DELETE CASCADE,
    infRateGeneral NUMERIC(10, 2),
    infRateInsurance NUMERIC(10, 2),
    infRateTax NUMERIC(10, 2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Penetration Analysis table
CREATE TABLE Penetration (
    id SERIAL PRIMARY KEY,
    property_id INTEGER NOT NULL REFERENCES Property_Details(id) ON DELETE CASCADE,
    compName TEXT,
    compRoomsKeys INTEGER,
    marketADRchange NUMERIC(10, 2),
    marketOccPct NUMERIC(10, 2),
    OccRoomGrowth NUMERIC(10, 2),
    propADRchange NUMERIC(10, 2),
    sampleHotelOcc NUMERIC(10, 2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

---------------------------------------
-- Revenue & Expense Tables
---------------------------------------

-- Operating Revenue table
CREATE TABLE Operating_Revenue (
    id SERIAL PRIMARY KEY,
    property_id INTEGER NOT NULL REFERENCES Property_Details(id) ON DELETE CASCADE,
    fbRev_pctRoomRev NUMERIC(10, 2),
    fbRevPOR INTEGER,
    othOpRevPOR INTEGER,
    rentalOthIncAmt INTEGER,
    rentalOthIncPOR INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Department Expense table with totals
CREATE TABLE Dept_Expense (
    id SERIAL PRIMARY KEY,
    property_id INTEGER NOT NULL REFERENCES Property_Details(id) ON DELETE CASCADE,
    fbExp_PctfbRev NUMERIC(10, 2),
    fbExpAmt INTEGER,
    fbExpPOR INTEGER,
    othOpExp_PctOthOpRev NUMERIC(10, 2),
    othOpExpAmt INTEGER,
    othOpExpPOR INTEGER,
    roomExp_pctRoomRev NUMERIC(10, 2),
    roomExpAmt INTEGER,
    roomExpPOR INTEGER,
    -- New total fields
    total_rooms_expense NUMERIC(12, 2),
    total_other_operated_expense NUMERIC(12, 2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Fees (Management & Franchise Fees) table
CREATE TABLE Fees (
    id SERIAL PRIMARY KEY,
    property_id INTEGER NOT NULL REFERENCES Property_Details(id) ON DELETE CASCADE,
    baseMgmtFee_PctTotRev NUMERIC(10, 2),
    franFee_pctFBrev NUMERIC(10, 2),
    franFee_pctRoomRev NUMERIC(10, 2),
    incentMgmtFee_pctTotRev NUMERIC(10, 2),
    incentMgmtFeeAmt INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Undistributed Expense table with totals
CREATE TABLE Undist_Expense (
    id SERIAL PRIMARY KEY,
    property_id INTEGER NOT NULL REFERENCES Property_Details(id) ON DELETE CASCADE,
    gaExp_pctRoomRev NUMERIC(10, 2),
    gaExpAmt INTEGER,
    gaExpPOR INTEGER,
    infoTele_pctTotRev NUMERIC(10, 2),
    infoTeleAmt INTEGER,
    infoTelePAR INTEGER,
    propOpMaintPAR INTEGER,
    propOpMaintPOR INTEGER,
    propOpMaint_pctTotRev NUMERIC(10, 2),
    saleMktgExp_pctTotRev NUMERIC(10, 2),
    saleMktgExpAmt INTEGER,
    saleMktgExpPAR INTEGER,
    utilPAR INTEGER,
    utilPOR INTEGER,
    -- New total field
    total_undistributed_expense NUMERIC(12, 2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Non-Operating Expenses table
CREATE TABLE NonOp_Expense (
    id SERIAL PRIMARY KEY,
    property_id INTEGER NOT NULL REFERENCES Property_Details(id) ON DELETE CASCADE,
    groundRent_pctTotRev NUMERIC(10, 2),
    groundRentAmt INTEGER,
    insExp_pctTotRev NUMERIC(10, 2),
    insExpAmt INTEGER,
    leasesOthAmt INTEGER,
    leasesOthPAR INTEGER,
    propTaxAmt INTEGER,
    propTaxPAR INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- FF&E Reserve table
CREATE TABLE FFE_Reserve (
    id SERIAL PRIMARY KEY,
    property_id INTEGER NOT NULL REFERENCES Property_Details(id) ON DELETE CASCADE,
    resRep_pctTotRev NUMERIC(10, 2),
    contingency TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- New Financial Summary table for pre-calculated totals
CREATE TABLE Financial_Summary (
    id SERIAL PRIMARY KEY,
    property_id INTEGER NOT NULL REFERENCES Property_Details(id) ON DELETE CASCADE,
    year INTEGER NOT NULL,
    total_revenue NUMERIC(12, 2),
    total_rooms_expense NUMERIC(12, 2),
    total_other_operated_expense NUMERIC(12, 2),
    total_undistributed_expense NUMERIC(12, 2),
    total_non_operating_expense NUMERIC(12, 2),
    gross_operating_profit NUMERIC(12, 2),
    net_operating_income NUMERIC(12, 2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(property_id, year)
);

---------------------------------------
-- Indexes for Performance Optimization
---------------------------------------

-- Core table indexes
CREATE INDEX idx_property_status ON Property_Details(status);
CREATE INDEX idx_occupancy_property ON Occupancy_Forecast(property_id);

-- Financial table indexes
CREATE INDEX idx_acquisition_property ON Acquisition(property_id);
CREATE INDEX idx_financing_property ON Financing(property_id);
CREATE INDEX idx_disposition_property ON Disposition(property_id);

-- Operations table indexes
CREATE INDEX idx_capex_property ON CapEx(property_id);
CREATE INDEX idx_inflation_property ON Inflation_Assumptions(property_id);
CREATE INDEX idx_penetration_property ON Penetration(property_id);

-- Revenue & Expense indexes
CREATE INDEX idx_oprevenue_property ON Operating_Revenue(property_id);
CREATE INDEX idx_deptexp_property ON Dept_Expense(property_id);
CREATE INDEX idx_fees_property ON Fees(property_id);
CREATE INDEX idx_undistexp_property ON Undist_Expense(property_id);
CREATE INDEX idx_nonopexp_property ON NonOp_Expense(property_id);
CREATE INDEX idx_ffereserve_property ON FFE_Reserve(property_id);

-- Financial Summary indexes
CREATE INDEX idx_financial_summary_property ON Financial_Summary(property_id);
CREATE INDEX idx_financial_summary_year ON Financial_Summary(year);
CREATE INDEX idx_financial_summary_property_year ON Financial_Summary(property_id, year);

-- Add CASCADE DELETE to ensure data integrity
ALTER TABLE Acquisition DROP CONSTRAINT IF EXISTS acquisition_property_id_fkey;
ALTER TABLE Acquisition ADD CONSTRAINT acquisition_property_id_fkey 
    FOREIGN KEY (property_id) REFERENCES Property_Details(id) ON DELETE CASCADE;

ALTER TABLE Financing DROP CONSTRAINT IF EXISTS financing_property_id_fkey;
ALTER TABLE Financing ADD CONSTRAINT financing_property_id_fkey 
    FOREIGN KEY (property_id) REFERENCES Property_Details(id) ON DELETE CASCADE;

-- Additional helpful indexes for frequent query patterns
CREATE INDEX idx_property_city_state ON Property_Details(city, state);
CREATE INDEX idx_property_type ON Property_Details(propType);

