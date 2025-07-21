
import React, { useState } from 'react';
import { Plus, Filter, ArrowUpDown, ArrowUp, ArrowDown, GripVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface PipelineItem {
  id: string;
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
  purchasePrice: string;
  capRate: string;
}

interface Column {
  key: string;
  label: string;
  sticky: boolean;
  sortable: boolean;
}

type SortDirection = 'asc' | 'desc' | null;

interface SortState {
  column: string | null;
  direction: SortDirection;
}

const Pipeline: React.FC = () => {
  const [pipelineData, setPipelineData] = useState<PipelineItem[]>([
    {
      id: '1',
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
      purchasePrice: '5,125,000',
      capRate: '5.125%'
    }
  ]);

  const [columns, setColumns] = useState<Column[]>([
    { key: 'photo', label: 'Photo', sticky: true, sortable: false },
    { key: 'id', label: 'ID', sticky: true, sortable: true },
    { key: 'name', label: 'Name', sticky: true, sortable: true },
    { key: 'city', label: 'City', sticky: false, sortable: true },
    { key: 'state', label: 'ST', sticky: false, sortable: true },
    { key: 'zip', label: 'Zip', sticky: false, sortable: true },
    { key: 'keysRooms', label: 'Keys/Rooms', sticky: false, sortable: true },
    { key: 'propertyType', label: 'Property Type', sticky: false, sortable: true },
    { key: 'status', label: 'Status', sticky: false, sortable: true },
    { key: 'brand', label: 'Brand', sticky: false, sortable: true },
    { key: 'management', label: 'Management', sticky: false, sortable: true },
    { key: 'bidDueDate', label: 'Bid Due Date', sticky: false, sortable: true },
    { key: 'dueDiligenceDate', label: 'Due Diligence Date', sticky: false, sortable: true },
    { key: 'purchasePrice', label: 'Purchase Price', sticky: false, sortable: true },
    { key: 'capRate', label: 'Cap Rate', sticky: false, sortable: true },
  ]);

  const [sortState, setSortState] = useState<SortState>({ column: null, direction: null });
  const [draggedColumn, setDraggedColumn] = useState<number | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<number | null>(null);

  const handleInputChange = (id: string, field: keyof PipelineItem, value: string) => {
    setPipelineData(prevData =>
      prevData.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const addNewRow = () => {
    const newId = (pipelineData.length + 1).toString();
    const newItem: PipelineItem = {
      id: newId,
      photo: '',
      name: '',
      city: '',
      state: '',
      zip: '',
      keysRooms: '',
      propertyType: '',
      status: '',
      brand: '',
      management: '',
      bidDueDate: '',
      dueDiligenceDate: '',
      purchasePrice: '',
      capRate: ''
    };
    setPipelineData([...pipelineData, newItem]);
  };

  const handleSort = (columnKey: string) => {
    if (!columns.find(col => col.key === columnKey)?.sortable) return;

    let newDirection: SortDirection = 'asc';
    if (sortState.column === columnKey) {
      if (sortState.direction === 'asc') newDirection = 'desc';
      else if (sortState.direction === 'desc') newDirection = null;
    }

    setSortState({ column: columnKey, direction: newDirection });

    if (newDirection === null) {
      // Reset to original order
      setPipelineData([...pipelineData]);
      return;
    }

    const sortedData = [...pipelineData].sort((a, b) => {
      const aVal = a[columnKey as keyof PipelineItem];
      const bVal = b[columnKey as keyof PipelineItem];

      // Handle numeric sorting for specific columns
      if (columnKey === 'id' || columnKey === 'zip' || columnKey === 'keysRooms') {
        const aNum = parseInt(aVal) || 0;
        const bNum = parseInt(bVal) || 0;
        return newDirection === 'asc' ? aNum - bNum : bNum - aNum;
      }

      // Handle percentage sorting
      if (columnKey === 'capRate') {
        const aNum = parseFloat(aVal.replace('%', '')) || 0;
        const bNum = parseFloat(bVal.replace('%', '')) || 0;
        return newDirection === 'asc' ? aNum - bNum : bNum - aNum;
      }

      // Handle currency sorting
      if (columnKey === 'purchasePrice') {
        const aNum = parseInt(aVal.replace(/[,$]/g, '')) || 0;
        const bNum = parseInt(bVal.replace(/[,$]/g, '')) || 0;
        return newDirection === 'asc' ? aNum - bNum : bNum - aNum;
      }

      // Handle date sorting
      if (columnKey === 'bidDueDate' || columnKey === 'dueDiligenceDate') {
        const aDate = new Date(aVal);
        const bDate = new Date(bVal);
        return newDirection === 'asc' 
          ? aDate.getTime() - bDate.getTime() 
          : bDate.getTime() - aDate.getTime();
      }

      // Default string sorting
      const result = aVal.localeCompare(bVal);
      return newDirection === 'asc' ? result : -result;
    });

    setPipelineData(sortedData);
  };

  const handleDragStart = (e: React.DragEvent, index: number) => {
    // Prevent dragging sticky columns
    if (columns[index].sticky) {
      e.preventDefault();
      return;
    }
    
    setDraggedColumn(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', ''); // Required for some browsers
    
    // Add visual feedback
    const target = e.currentTarget as HTMLElement;
    target.style.opacity = '0.5';
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    // Prevent drop on sticky columns or if no column is being dragged
    if (columns[index].sticky || draggedColumn === null || draggedColumn === index) {
      return;
    }
    
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverColumn(index);
  };

  const handleDragEnter = (e: React.DragEvent, index: number) => {
    if (columns[index].sticky || draggedColumn === null || draggedColumn === index) {
      return;
    }
    e.preventDefault();
  };

  const handleDragLeave = (e: React.DragEvent) => {
    // Only clear drag over state if we're actually leaving the element
    const relatedTarget = e.relatedTarget as HTMLElement;
    const currentTarget = e.currentTarget as HTMLElement;
    
    if (!currentTarget.contains(relatedTarget)) {
      setDragOverColumn(null);
    }
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Prevent dropping on sticky columns or invalid drops
    if (draggedColumn === null || columns[dropIndex].sticky || draggedColumn === dropIndex) {
      resetDragState();
      return;
    }

    const newColumns = [...columns];
    const draggedItem = newColumns[draggedColumn];
    
    // Remove the dragged item from its original position
    newColumns.splice(draggedColumn, 1);
    
    // Insert it at the new position
    const adjustedDropIndex = draggedColumn < dropIndex ? dropIndex - 1 : dropIndex;
    newColumns.splice(adjustedDropIndex, 0, draggedItem);

    setColumns(newColumns);
    resetDragState();
  };

  const handleDragEnd = (e: React.DragEvent) => {
    // Reset visual feedback
    const target = e.currentTarget as HTMLElement;
    target.style.opacity = '1';
    
    // Clean up drag state
    resetDragState();
  };

  const resetDragState = () => {
    setDraggedColumn(null);
    setDragOverColumn(null);
  };

  const getSortIcon = (columnKey: string) => {
    if (sortState.column !== columnKey) {
      return <ArrowUpDown className="w-3 h-3 text-muted-foreground" />;
    }
    
    if (sortState.direction === 'asc') {
      return <ArrowUp className="w-3 h-3 text-primary" />;
    } else if (sortState.direction === 'desc') {
      return <ArrowDown className="w-3 h-3 text-primary" />;
    }
    
    return <ArrowUpDown className="w-3 h-3 text-muted-foreground" />;
  };

  return (
    <div className="p-6 h-screen flex flex-col">
      {/* Header with buttons */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-foreground">Pipeline</h1>
        <div className="flex gap-2">
          <Button onClick={addNewRow} className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Plus className="w-4 h-4 mr-2" />
            Add New
          </Button>
          <Button variant="outline" className="text-muted-foreground border-border">
            Group By
          </Button>
          <Button variant="outline" className="text-muted-foreground border-border">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      {/* Table Container with scrollbars */}
      <div className="flex-1 overflow-auto border border-border rounded-lg">
        <div className="relative">
          <Table className="w-full">
            <TableHeader className="sticky top-0 z-20">
              <TableRow className="bg-muted/50 border-b border-border">
                {columns.map((column, index) => (
                  <TableHead
                    key={column.key}
                    draggable={!column.sticky}
                    onDragStart={(e) => handleDragStart(e, index)}
                    onDragOver={(e) => handleDragOver(e, index)}
                    onDragEnter={(e) => handleDragEnter(e, index)}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, index)}
                    onDragEnd={handleDragEnd}
                    className={`
                      h-8 px-2 text-left align-middle font-medium text-muted-foreground border-r border-border last:border-r-0 select-none
                      ${column.sticky ? 'sticky z-30 bg-background border-l-2 border-l-background' : ''}
                      ${index === 0 ? 'left-0' : ''}
                      ${index === 1 ? 'left-[80px]' : ''}
                      ${index === 2 ? 'left-[260px]' : ''}
                      ${dragOverColumn === index ? 'bg-primary/20 border-primary' : ''}
                      ${draggedColumn === index ? 'opacity-50' : ''}
                      ${!column.sticky ? 'cursor-move hover:bg-muted/70' : 'cursor-default'}
                      ${column.key === 'photo' ? 'w-[80px] min-w-[80px] max-w-[80px]' : 
                        column.key === 'id' ? 'w-[80px] min-w-[80px] max-w-[80px]' : 
                        column.key === 'name' ? 'w-[180px] min-w-[180px]' : 
                        column.key === 'city' ? 'w-[120px] min-w-[120px]' : 
                        column.key === 'state' ? 'w-[80px] min-w-[80px]' : 
                        column.key === 'zip' ? 'w-[100px] min-w-[100px]' : 
                        column.key === 'keys_rooms' ? 'w-[120px] min-w-[120px]' : 
                        column.key === 'status' ? 'w-[140px] min-w-[140px]' : 
                        'w-[140px] min-w-[140px]'} 
                      transition-all duration-150
                    `}
                  >
                    <div className="flex items-center justify-between">
                      <span className="truncate">{column.label}</span>
                      <div className="flex items-center gap-1">
                        {column.sortable && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSort(column.key);
                            }}
                            className="hover:bg-muted/50 p-0.5 rounded transition-colors"
                          >
                            {getSortIcon(column.key)}
                          </button>
                        )}
                        {!column.sticky && (
                          <GripVertical className="w-3 h-3 text-muted-foreground opacity-60" />
                        )}
                      </div>
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {pipelineData.map((item) => (
                <TableRow key={item.id} className="border-b border-border hover:bg-muted/50">
                  {columns.map((column, index) => (
                    <TableCell
                      key={`${item.id}-${column.key}`}
                      className={`
                        p-2 align-middle border-r border-border last:border-r-0
                        ${column.sticky ? 'sticky z-10 bg-background border-l-2 border-l-background' : ''}
                        ${index === 0 ? 'left-0' : ''}
                        ${index === 1 ? 'left-[80px]' : ''}
                        ${index === 2 ? 'left-[260px]' : ''}
                        ${column.key === 'photo' ? 'w-[80px] min-w-[80px] max-w-[80px]' : 
                          column.key === 'id' ? 'w-[80px] min-w-[80px] max-w-[80px]' : 
                          column.key === 'name' ? 'w-[180px] min-w-[180px]' : 
                          column.key === 'city' ? 'w-[120px] min-w-[120px]' : 
                          column.key === 'state' ? 'w-[80px] min-w-[80px]' : 
                          column.key === 'zip' ? 'w-[100px] min-w-[100px]' : 
                          column.key === 'keysRooms' ? 'w-[120px] min-w-[120px]' : 
                          column.key === 'status' ? 'w-[140px] min-w-[140px]' : 
                          'w-[140px] min-w-[140px]'}
                      `}
                    >
                      {column.key === 'photo' ? (
                        <div className="w-8 h-8 bg-muted rounded border border-border"></div>
                      ) : (
                        <Input
                          value={item[column.key as keyof PipelineItem]}
                          onChange={(e) => handleInputChange(item.id, column.key as keyof PipelineItem, e.target.value)}
                          placeholder={column.label}
                          className="border-0 bg-transparent p-0 h-auto text-sm focus-visible:ring-0 placeholder:text-muted-foreground/50"
                        />
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Pipeline;
