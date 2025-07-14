
import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Edit, Trash2, Plus } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import AppSidebar from "../components/AppSidebar";
import { SidebarProvider } from "../components/ui/sidebar";
import { toast } from "../hooks/use-toast";

interface TransactionRow {
  id: string;
  propertyName: string;
  year: number | "";
  renovationAmount: number | "";
  renovationArea: number | "";
  transactionAmount: number | "";
  transactionBuyer: string;
  transactionSeller: string;
  transactionLender: string;
  notes: string;
}

const TransactionSummary: React.FC = () => {
  const [rows, setRows] = useState<TransactionRow[]>([
    {
      id: "row1",
      propertyName: "",
      year: "",
      renovationAmount: "",
      renovationArea: "",
      transactionAmount: "",
      transactionBuyer: "",
      transactionSeller: "",
      transactionLender: "",
      notes: ""
    }
  ]);

  const formatCurrency = (value: number | ""): string => {
    if (typeof value === 'number' && value > 0) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(value);
    }
    return "";
  };

  const addRow = () => {
    const newRow: TransactionRow = {
      id: `row${Date.now()}`,
      propertyName: "",
      year: "",
      renovationAmount: "",
      renovationArea: "",
      transactionAmount: "",
      transactionBuyer: "",
      transactionSeller: "",
      transactionLender: "",
      notes: ""
    };
    setRows([...rows, newRow]);
    toast({
      title: "Row Added",
      description: "New transaction row has been added",
    });
  };

  const updateRowValue = (rowId: string, field: keyof TransactionRow, value: any) => {
    setRows(rows.map(row => 
      row.id === rowId ? { ...row, [field]: value } : row
    ));
  };

  const deleteRow = (rowId: string) => {
    if (rows.length > 1) {
      setRows(rows.filter(row => row.id !== rowId));
      toast({
        title: "Row Deleted",
        description: "Transaction row has been removed",
      });
    }
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
              <h1 className="text-2xl font-bold">Transaction Summary</h1>
            </div>

            <div className="bg-white rounded-lg shadow overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Property Name</TableHead>
                    <TableHead>Year</TableHead>
                    <TableHead>Renovation Amount: $</TableHead>
                    <TableHead>Renovation Area</TableHead>
                    <TableHead>Transaction Amount</TableHead>
                    <TableHead>Transaction Buyer</TableHead>
                    <TableHead>Transaction Seller</TableHead>
                    <TableHead>Transaction Lender</TableHead>
                    <TableHead>Notes</TableHead>
                    <TableHead className="w-20">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>
                        <Input
                          value={row.propertyName}
                          onChange={(e) => updateRowValue(row.id, 'propertyName', e.target.value)}
                          className="text-blue-600"
                          placeholder="Property Name"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          value={row.year}
                          onChange={(e) => updateRowValue(row.id, 'year', parseInt(e.target.value) || "")}
                          className="text-blue-600"
                          placeholder="Year"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          value={row.renovationAmount}
                          onChange={(e) => updateRowValue(row.id, 'renovationAmount', parseInt(e.target.value) || "")}
                          className="text-blue-600"
                          placeholder="$0"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          value={row.renovationArea}
                          onChange={(e) => updateRowValue(row.id, 'renovationArea', parseInt(e.target.value) || "")}
                          className="text-blue-600"
                          placeholder="0"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          value={row.transactionAmount}
                          onChange={(e) => updateRowValue(row.id, 'transactionAmount', parseInt(e.target.value) || "")}
                          className="text-blue-600"
                          placeholder="$0"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={row.transactionBuyer}
                          onChange={(e) => updateRowValue(row.id, 'transactionBuyer', e.target.value)}
                          className="text-blue-600"
                          placeholder="Buyer"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={row.transactionSeller}
                          onChange={(e) => updateRowValue(row.id, 'transactionSeller', e.target.value)}
                          className="text-blue-600"
                          placeholder="Seller"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={row.transactionLender}
                          onChange={(e) => updateRowValue(row.id, 'transactionLender', e.target.value)}
                          className="text-blue-600"
                          placeholder="Lender"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={row.notes}
                          onChange={(e) => updateRowValue(row.id, 'notes', e.target.value)}
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
                            onClick={() => deleteRow(row.id)}
                          >
                            <Trash2 className="h-4 w-4 text-red-600" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              <div className="p-4 border-t">
                <Button onClick={addRow} className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add Property
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default TransactionSummary;
