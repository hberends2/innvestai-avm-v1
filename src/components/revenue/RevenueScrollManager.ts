
import { useState, useEffect } from "react";

export const useRevenueScrollManager = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const scrollToSection = (sectionId: string) => {
    console.log("🔍 Attempting to scroll to section:", sectionId);
    setActiveSection(sectionId);
    
    // Find the scroll container and target element
    const scrollContainer = document.getElementById('revenue-scroll-area');
    const targetElement = document.getElementById(sectionId);
    
    console.log("📍 Scroll container found:", !!scrollContainer);
    console.log("📍 Target element found:", !!targetElement);
    
    // Debug: Log ALL elements with IDs in the DOM
    const allElementsWithIds = document.querySelectorAll('[id]');
    console.log("🔍 ALL IDs in DOM:", Array.from(allElementsWithIds).map(el => el.id));
    
    if (scrollContainer && targetElement) {
      // Get the scroll container's viewport
      const scrollViewport = scrollContainer.querySelector('[data-radix-scroll-area-viewport]');
      
      if (scrollViewport) {
        // Calculate position to scroll to (position the section just below the summary)
        const containerRect = scrollViewport.getBoundingClientRect();
        const targetRect = targetElement.getBoundingClientRect();
        const scrollTop = scrollViewport.scrollTop;
        
        // Calculate the target scroll position
        // We want the section to be positioned just below the summary table
        const targetScrollTop = scrollTop + (targetRect.top - containerRect.top) - 20; // 20px offset
        
        console.log("✅ Scrolling to position:", targetScrollTop);
        
        // Smooth scroll to the target position
        scrollViewport.scrollTo({
          top: Math.max(0, targetScrollTop),
          behavior: 'smooth'
        });
      }
    } else {
      console.log("❌ Could not find scroll container or target element");
    }
  };

  const handleItemClick = (modalName: string) => {
    console.log("🖱️ Sidebar item clicked:", modalName);
    
    // Check if it's a section navigation request
    const sectionMappings: Record<string, string> = {
      'occupancy-section': 'occupancy-section',
      'adr-section': 'adr-section', 
      'revpar-section': 'revpar-section',
      'rooms-revenue-section': 'rooms-revenue-section',
      'food-beverage-section': 'food-beverage-section',
      'other-operated-section': 'other-operated-section',
      'miscellaneous-section': 'miscellaneous-section',
      'allocated-section': 'allocated-section',
      'total-revenue-section': 'total-revenue-section',
      'rooms-expense-section': 'rooms-expense-section',
      'food-beverage-expense-section': 'fb-expense-section',
      'other-operated-expense-section': 'other-operated-expense-item-section',
      'miscellaneous-expense-section': 'miscellaneous-expense-section',
      'allocated-expense-section': 'allocated-expense-section',
      // Based on UndistributedExpensesSection.tsx, these are the actual IDs:
      'property-operations-expense-section': 'property-operations-expense-section',
      'administrative-general-expense-section': 'administrative-general-expense-section', 
      'info-tech-services-expense-section': 'info-tech-services-expense-section',
      'sales-marketing-expense-section': 'sales-marketing-expense-section',
      'utilities-expense-section': 'utilities-expense-section',
      'undistributed-expenses-section': 'undistributed-expenses-section',
      // For Non-Operating Expenses, need to check the actual component structure
      'management-fees-section': 'management-fees-section',
      'real-estate-taxes-section': 'real-estate-taxes-section', 
      'insurance-section': 'insurance-section',
      'other-non-operating-section': 'other-non-operating-section',
      'non-operating-expenses-section': 'non-operating-expenses-section',
      'total-expense-section': 'total-expense-section',
      'capital-expense-section': 'capital-expense-section'
    };
    
    console.log("🗺️ Looking for mapping for:", modalName);
    const targetSectionId = sectionMappings[modalName];
    console.log("🎯 Mapped to section ID:", targetSectionId);
    
    if (targetSectionId) {
      scrollToSection(targetSectionId);
    } else {
      console.log("❌ No mapping found for:", modalName);
    }
  };

  // Listen for scroll events to update active section
  useEffect(() => {
    const scrollContainer = document.getElementById('revenue-scroll-area');
    if (!scrollContainer) return;

    const scrollViewport = scrollContainer.querySelector('[data-radix-scroll-area-viewport]');
    if (!scrollViewport) return;

    const handleScroll = () => {
      const sections = [
        'occupancy-section',
        'adr-section', 
        'revpar-section',
        'rooms-revenue-section',
        'food-beverage-section',
        'other-operated-section',
        'miscellaneous-section',
        'allocated-section',
        'total-revenue-section',
        'rooms-expense-section',
        'fb-expense-section',
        'other-operated-expense-item-section',
        'miscellaneous-expense-section',
        'allocated-expense-section',
        'property-operations-expense-section',
        'administrative-general-expense-section',
        'info-tech-services-expense-section',
        'sales-marketing-expense-section',
        'utilities-expense-section',
        'undistributed-expenses-section',
        'management-fees-section',
        'real-estate-taxes-section',
        'insurance-section',
        'other-non-operating-section',
        'non-operating-expenses-section',
        'total-expense-section',
        'capital-expense-section'
      ];

      let currentSection = null;
      const viewportTop = scrollViewport.scrollTop;
      const viewportHeight = scrollViewport.clientHeight;
      const midPoint = viewportTop + viewportHeight / 3; // Use top third as trigger point

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          const containerRect = scrollViewport.getBoundingClientRect();
          const elementTop = viewportTop + (rect.top - containerRect.top);
          const elementBottom = elementTop + rect.height;

          if (elementTop <= midPoint && elementBottom > midPoint) {
            currentSection = sectionId;
            break;
          }
        }
      }

      if (currentSection && currentSection !== activeSection) {
        setActiveSection(currentSection);
      }
    };

    scrollViewport.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial check
    handleScroll();

    return () => {
      scrollViewport.removeEventListener('scroll', handleScroll);
    };
  }, [activeSection]);

  return {
    activeSection,
    handleItemClick
  };
};
