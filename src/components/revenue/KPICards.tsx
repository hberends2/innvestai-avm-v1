import React from "react";
import { Card, CardContent } from "../ui/card";

const KPICards: React.FC = () => {
  const kpis = [
    { title: "IRR", value: "12.5%" },
    { title: "ROI", value: "18.2%" },
    { title: "Avg CoC Return", value: "15.8%" },
    { title: "Cap Rate (Acquisition)", value: "6.2%" },
    { title: "Cap Rate (Exit)", value: "5.8%" }
  ];

  return (
    <div className="grid grid-cols-5 gap-4 mb-4">
      {kpis.map((kpi, index) => (
        <Card key={index} className="bg-white shadow-sm border">
          <CardContent className="py-1 px-3">
            <div className="text-center">
              <div className="text-xs text-gray-600 mb-1">{kpi.title}</div>
              <div className="text-lg font-semibold text-gray-900">{kpi.value}</div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default KPICards;