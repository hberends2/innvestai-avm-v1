
# Database Schema for Property Management System

This database schema represents a comprehensive property management system designed for hotel property analysis and forecasting.

## Schema Organization

The schema is organized into logical sections:

1. **Core Tables**: Basic property information and occupancy forecasts
2. **Financial Information**: Acquisition, financing, and disposition details
3. **Operations & Analytics**: CapEx, inflation assumptions, and market penetration
4. **Revenue & Expense Tables**: Operating revenue, departmental expenses, fees, etc.

## Key Features

- **Modular Design**: Tables are grouped by function for easier maintenance
- **Referential Integrity**: All related tables reference the Property_Details table with CASCADE DELETE
- **Optimized Indexes**: Strategic indexes for frequently queried columns and join operations
- **Data Types**: Appropriate types based on data requirements (NUMERIC for percentages, TEXT for string data)
- **Audit Trails**: All tables include created_at and updated_at timestamp fields

## Table Structure

```
Property_Details
 ├── Occupancy_Forecast
 ├── Acquisition
 ├── Financing
 ├── Disposition
 ├── CapEx
 ├── Inflation_Assumptions
 ├── Penetration
 ├── Operating_Revenue
 ├── Dept_Expense
 ├── Fees
 ├── Undist_Expense
 ├── NonOp_Expense
 └── FFE_Reserve
```

## Implementation Notes

1. The Property_Details table serves as the central entity
2. The Occupancy_Forecast table stores JSONB data for flexible forecast storage
3. All tables cascade on deletion to maintain data integrity
4. Indexes are created for all foreign keys and commonly filtered/sorted columns
5. All monetary values are stored as INTEGER or NUMERIC(10,2) for consistent handling
