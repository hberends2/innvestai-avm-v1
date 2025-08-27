/**
 * Modern property data hook using new async patterns and DataService
 * Replaces the legacy usePropertyData with improved architecture
 */

import { useEffect } from 'react';
import { Property } from '../../types/PropertyTypes';
import { DataService } from '../../services/DataService';
import { useAsyncOperation } from './useAsyncOperation';

export const usePropertyData = () => {
  const propertiesOperation = useAsyncOperation<Property[]>([]);

  // Load properties on mount
  useEffect(() => {
    loadProperties();
  }, []);

  const loadProperties = async () => {
    await propertiesOperation.execute(
      () => DataService.properties.getAll(),
      'load properties',
      { showSuccessToast: false }
    );
  };

  const addProperty = async (propertyData: Omit<Property, 'id'>) => {
    const result = await propertiesOperation.execute(
      () => DataService.properties.create(propertyData),
      'add property',
      { successMessage: 'Property created successfully' }
    );

    if (result) {
      // Optimistically update the list
      const currentProperties = propertiesOperation.data || [];
      propertiesOperation.setData([...currentProperties, result]);
    }

    return result;
  };

  const updateProperty = async (property: Property) => {
    const result = await propertiesOperation.execute(
      () => DataService.properties.update(property),
      'update property',
      { successMessage: 'Property updated successfully' }
    );

    if (result) {
      // Optimistically update the list
      const currentProperties = propertiesOperation.data || [];
      const updatedProperties = currentProperties.map(p => 
        p.id === property.id ? result : p
      );
      propertiesOperation.setData(updatedProperties);
    }

    return result;
  };

  const deleteProperty = async (propertyId: string) => {
    const result = await propertiesOperation.execute(
      () => DataService.properties.delete(propertyId),
      'delete property',
      { successMessage: 'Property deleted successfully' }
    );

    if (result) {
      // Optimistically update the list
      const currentProperties = propertiesOperation.data || [];
      const filteredProperties = currentProperties.filter(p => p.id !== propertyId);
      propertiesOperation.setData(filteredProperties);
    }

    return result;
  };

  const getPropertyById = async (id: string) => {
    return await propertiesOperation.execute(
      () => DataService.properties.getById(id),
      'fetch property',
      { showSuccessToast: false }
    );
  };

  return {
    properties: propertiesOperation.data || [],
    loading: propertiesOperation.loading,
    error: propertiesOperation.error,
    addProperty,
    updateProperty,
    deleteProperty,
    getPropertyById,
    refreshProperties: loadProperties,
    reset: propertiesOperation.reset,
  };
};