
# Local Storage Data Management

This folder contains all the necessary files for data storage and management using browser's localStorage.

## Overview

Since this is a proof of concept, data is stored locally in the browser's localStorage. This allows for:

- Persistence between page refreshes
- No need for backend database setup
- Easy development and testing

## How It Works

Data is saved and retrieved using the browser's localStorage API. The application uses helper functions to:
- Serialize and deserialize JSON data
- Handle storage errors gracefully
- Provide type safety with TypeScript

## File Structure

- `supabaseClient.ts` - Provides localStorage utilities (despite the filename, this no longer uses Supabase)
- `usePropertyOperations.ts` - Manages property-related data operations
- `useOccupancyOperations.ts` - Manages occupancy data operations

## Development Notes

This implementation is intended for POC purposes only. For a production application, you would want to replace the localStorage implementation with a proper backend database.
