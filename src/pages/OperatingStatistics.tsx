
import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Edit, Trash2, Plus } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import AppSidebar from "../components/AppSidebar";
import { SidebarProvider } from "../components/ui/sidebar";
import { toast } from "../hooks/use-toast";

interface OperatingStatsRow {
  id: string;
  year: number | "";
  period: string;
  availableRooms: number | "";
  occupancy: number | "";
  adr: number | "";
  notes: string;
}

interface PropertyTable {
  id: string;
  propertyName: string;
  rows: OperatingStatsRow[];
}

const OperatingStatistics: React.FC = () => {
  const [properties, setProperties] = useState<PropertyTable[]>([
    {
      id: "prop1",
      propertyName: "Property 1",
      rows: [
        { id: "row1", year: "", period: "", availableRooms: "", occupancy: "", adr: "", notes: "" },
        { id: "row2", year: "", period: "", availableRooms: "", occupancy: "", adr: "", notes: "" }
      ]
    }
  ]);

  const calculateRevPAR = (availableRooms: number | "", occupancy: number | ""): number => {
    if (typeof availableRooms === 'number' && typeof occupancy === 'number' && availableRooms > 0 && occupancy > 0) {
      return (availableRooms * occupancy) / 100;
    }
    return 0;
  };

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatPercent = (value: number | ""): string => {
    if (typeof value === 'number' && value > 0) {
      return `${value.toFixed(1)}%`;
    }
    return "";
  };

  const addProperty = () => {
    const newProperty: PropertyTable = {
      id: `prop${Date.now()}`,
      propertyName: `Property ${properties.length + 1}`,
      rows: [
        { id: `row${Date.now()}_1`, year: "", period: "", availableRooms: "", occupancy: "", adr: "", notes: "" },
        { id: `row${Date.now()}_2`, year: "", period: "", availableRooms: "", occupancy: "", adr: "", notes: "" }
      ]
    };
    setProperties([...properties, newProperty]);
    toast({
      title: "Property Added",
      description: `${newProperty.propertyName} has been added`,
    });
  };

  const updatePropertyName = (propertyId: string, name: string) => {
    setProperties(properties.map(prop => 
      prop.id === propertyId ? { ...prop, propertyName: name } : prop
    ));
  };

  const updateRowValue = (propertyId: string, rowId: string, field: keyof OperatingStatsRow, value: any) => {
    setProperties(properties.map(prop => 
      prop.id === propertyId ? {
        ...prop,
        rows: prop.rows.map(row => 
          row.id === rowId ? { ...row, [field]: value } : row
        )
      } : prop
    ));
  };

  const deleteRow = (propertyId: string, rowId: string) => {
    setProperties(properties.map(prop => 
      prop.id === propertyId ? {
        ...prop,
        rows: prop.rows.filter(row => row.id !== rowId)
      } : prop
    ));
  };

  const handleSidebarItemClick = (modalName: string) => {
    console.log("Sidebar item clicked:", modalName);
    toast({
      title: "Navigation",
      description: `${modalName} functionality will be implemented`,
    });
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-gray-50">
        <AppSidebar onItemClick={handleSidebarItemClick} />
        
        <div className="flex-1 p-6 overflow-auto">
          <div className="w-full">
            <div className="mb-6">
              <h1 className="text-2xl font-bold">Operating Statistics</h1>
            </div>

            <div className="space-y-8">
              {properties.map((property, propertyIndex) => (
                <div key={property.id} className="bg-white rounded-lg shadow">
                  <div className="p-4 border-b">
                    <Input
                      value={property.propertyName}
                      onChange={(e) => updatePropertyName(property.id, e.target.value)}
                      className="text-lg font-medium text-blue-600 border-0 p-0 focus:ring-0"
                      placeholder="Property Name"
                    />
                  </div>
                  
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Year</TableHead>
                        <TableHead>MTD/YTD/FY</TableHead>
                        <TableHead>Available Rooms</TableHead>
                        <TableHead>Occ %</TableHead>
                        <TableHead>ADR</TableHead>
                        <TableHead>RevPAR</TableHead>
                        <TableHead>Notes</TableHead>
                        <TableHead className="w-20">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {property.rows.map((row) => (
                        <TableRow key={row.id}>
                          <TableCell>
                            <Input
                              type="number"
                              value={row.year}
                              onChange={(e) => updateRowValue(property.id, row.id, 'year', parseInt(e.target.value) || "")}
                              className="text-blue-600"
                              placeholder="Year"
                            />
                          </TableCell>
                          <TableCell>
                            <Input
                              value={row.period}
                              onChange={(e) => updateRowValue(property.id, row.id, 'period', e.target.value)}
                              className="text-blue-600"
                              placeholder="FY"
                            />
                          </TableCell>
                          <TableCell>
                            <Input
                              type="number"
                              value={row.availableRooms}
                              onChange={(e) => updateRowValue(property.id, row.id, 'availableRooms', parseInt(e.target.value) || "")}
                              className="text-blue-600"
                              placeholder="0"
                            />
                          </TableCell>
                          <TableCell>
                            <Input
                              type="number"
                              step="0.1"
                              value={row.occupancy}
                              onChange={(e) => updateRowValue(property.id, row.id, 'occupancy', parseFloat(e.target.value) || "")}
                              className="text-blue-600"
                              placeholder="0.0"
                            />
                          </TableCell>
                          <TableCell>
                            <Input
                              type="number"
                              value={row.adr}
                              onChange={(e) => updateRowValue(property.id, row.id, 'adr', parseInt(e.target.value) || "")}
                              className="text-blue-600"
                              placeholder="$0"
                            />
                          </TableCell>
                          <TableCell>
                            <span className="text-black">
                              {formatCurrency(calculateRevPAR(row.availableRooms, row.occupancy))}
                            </span>
                          </TableCell>
                          <TableCell>
                            <Input
                              value={row.notes}
                              onChange={(e) => updateRowValue(property.id, row.id, 'notes', e.target.value)}
                              className="text-blue-600"
                              placeholder="Notes"
                            />
                          </TableCell>
                          <TableCell className="w-20">
                            <div className="flex space-x-1">
                              <Button variant="ghost" size="sm" className="p-1">
                                <Edit className="h-4 w-4 text-green-600" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                className="p-1"
                                onClick={() => deleteRow(property.id, row.id)}
                              >
                                <Trash2 className="h-4 w-4 text-red-600" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ))}
              
              <Button onClick={addProperty} className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Property
              </Button>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default OperatingStatistics;
