import { useState, useEffect } from 'react';

export interface PipelineItem {
  id: string;
  favorite: boolean;
  photo: string;
  name: string;
  city: string;
  state: string;
  zip: string;
  keysRooms: string;
  propertyType: string;
  status: string;
  brand: string;
  management: string;
  bidDueDate: string;
  dueDiligenceDate: string;
  closingDate: string;
  purchasePrice: string;
  capRate: string;
  marketComp: string;
  createdDate: string;
  lastModifiedDate: string;
}

export const usePipelineData = () => {
  const [pipelineData, setPipelineData] = useState<PipelineItem[]>([]);

  // Load pipeline data from localStorage or default data
  useEffect(() => {
    const savedData = localStorage.getItem('pipelineData');
    if (savedData) {
      setPipelineData(JSON.parse(savedData));
    } else {
      // Default data - matching what's in Pipeline.tsx
      setPipelineData([
        {
          id: '1',
          favorite: false,
          photo: '',
          name: 'Hotel Howie',
          city: 'Paris',
          state: 'TX',
          zip: '54521',
          keysRooms: '312',
          propertyType: 'All Inclusive',
          status: 'Under Review',
          brand: 'Mgmt 6',
          management: 'Management',
          bidDueDate: '9/15/25',
          dueDiligenceDate: '8/1/25',
          closingDate: '10/1/25',
          purchasePrice: '5,125,000',
          capRate: '5.125%',
          marketComp: 'Yes',
          createdDate: '12/15/24',
          lastModifiedDate: '1/2/25'
        }
      ]);
    }
  }, []);

  // Save to localStorage when data changes
  useEffect(() => {
    if (pipelineData.length > 0) {
      localStorage.setItem('pipelineData', JSON.stringify(pipelineData));
    }
  }, [pipelineData]);

  const getClosingDate = () => {
    // Get the first item's closing date (assuming single property for now)
    if (pipelineData.length > 0 && pipelineData[0].closingDate) {
      return pipelineData[0].closingDate;
    }
    return null;
  };

  const shouldAddYTDColumn = () => {
    const closingDate = getClosingDate();
    if (!closingDate) return { shouldAdd: false, ytdYear: null };

    try {
      // Parse the closing date (assuming MM/DD/YY format)
      const [month, day, year] = closingDate.split('/');
      const fullYear = year.length === 2 ? 2000 + parseInt(year) : parseInt(year);
      
      // Check if it's NOT Jan 1 AND NOT Dec 31
      const isNotJan1 = !(month === '1' && day === '1');
      const isNotDec31 = !(month === '12' && day === '31');
      
      if (isNotJan1 && isNotDec31) {
        return { shouldAdd: true, ytdYear: fullYear };
      }
    } catch (error) {
      console.warn('Error parsing closing date:', closingDate);
    }

    return { shouldAdd: false, ytdYear: null };
  };

  return {
    pipelineData,
    setPipelineData,
    getClosingDate,
    shouldAddYTDColumn
  };
};