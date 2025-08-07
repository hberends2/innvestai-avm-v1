
import React, { useState } from "react";
import AppSidebar from "../components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "../components/ui/sidebar";
import { Card, CardContent } from "../components/ui/card";
import { Construction } from "lucide-react";

const UnderConstruction = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const handleItemClick = (modalName: string) => {
    setActiveModal(modalName);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar onItemClick={handleItemClick} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="p-2 border-b bg-white">
            <SidebarTrigger />
          </div>
          <main className="flex-1 p-6 bg-gray-50">
            <div className="w-full">
              <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <Card className="w-full max-w-md">
                  <CardContent className="flex flex-col items-center text-center p-8">
                    <Construction className="h-16 w-16 text-orange-500 mb-4" />
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Under Construction</h1>
                    <p className="text-gray-600 mb-4">
                      This page is currently being built and will be available soon.
                    </p>
                    <p className="text-sm text-gray-500">
                      Please check back later for updates.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default UnderConstruction;
