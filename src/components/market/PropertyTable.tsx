
import React from "react";
import { Edit, Trash2, BarChart2 } from "lucide-react";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Property } from "../../types/PropertyTypes";

interface PropertyTableProps {
  properties: Property[];
  onEdit: (property: Property) => void;
  onDelete: (propertyId: string) => void;
  onAnalyze?: (property: Property) => void;
}

const PropertyTable: React.FC<PropertyTableProps> = ({
  properties,
  onEdit,
  onDelete,
  onAnalyze,
}) => {
  // Calculate total rooms
  const totalRooms = properties.reduce((sum, property) => sum + property.rooms, 0);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableCaption>Market Property Listing</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">STR Code</TableHead>
              <TableHead className="min-w-[200px]">Name of Establishment</TableHead>
              <TableHead>City</TableHead>
              <TableHead>State</TableHead>
              <TableHead>Zip Code</TableHead>
              <TableHead>Class</TableHead>
              <TableHead>Aff Date</TableHead>
              <TableHead>Open Date</TableHead>
              <TableHead className="text-right">Rooms</TableHead>
              <TableHead>Chg in Rms</TableHead>
              <TableHead>Chg in Rms 1</TableHead>
              <TableHead>Chg in Rms 2</TableHead>
              <TableHead>Chg in Rms 3</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {properties.map((property, index) => (
              <TableRow key={property.id}>
                <TableCell>{property.strCode}</TableCell>
                <TableCell>{`Comp ${index + 1}`}</TableCell>
                <TableCell>{property.city}</TableCell>
                <TableCell>{property.state}</TableCell>
                <TableCell>{property.zipCode}</TableCell>
                <TableCell>{property.class}</TableCell>
                <TableCell>{property.affDate}</TableCell>
                <TableCell>{property.openDate}</TableCell>
                <TableCell className="text-right">{property.rooms}</TableCell>
                <TableCell>{property.chgInRms}</TableCell>
                <TableCell>{property.chgInRms1}</TableCell>
                <TableCell>{property.chgInRms2}</TableCell>
                <TableCell>{property.chgInRms3}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(property)}
                    >
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(property.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                      <span className="sr-only">Delete</span>
                    </Button>
                    {onAnalyze && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onAnalyze(property)}
                      >
                        <BarChart2 className="h-4 w-4 text-blue-500" />
                        <span className="sr-only">Analyze</span>
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
            <TableRow className="font-medium">
              <TableCell colSpan={8} className="text-right">
                Total Properties: {properties.length}
              </TableCell>
              <TableCell className="text-right">{totalRooms}</TableCell>
              <TableCell colSpan={5}></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default PropertyTable;
