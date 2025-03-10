"use client";
import { ScrollArea } from "@/src/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";

interface ChartTableProps {
  headers: string[];
  content: string[][];
}

const ChartTable = (data: ChartTableProps) => {
  return (
    <div className="h-[280px]">
      <ScrollArea className="h-5/6">
        <Table className="border border-default-800  ">
          <TableHeader>
            <TableRow className="border-b border-default-800">
              {data.headers.map((header, index) => (
                <TableHead
                  key={index}
                  className="text-base text-default-800 py-2"
                >
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.content.map((item, key) => (
              <TableRow key={key} className="border-b border-default-800">
                {item.map((cell, index) => (
                  <TableCell key={index} className="text-base text-default-800">
                    {cell}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
};

export default ChartTable;
