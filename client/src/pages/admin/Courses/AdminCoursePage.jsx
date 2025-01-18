import { Button } from "@/components/ui/button";
import React from "react";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const AdminCoursePage = () => {
  return (
    <>
      <div className="p-16 w-full ">
        <div>
          <Button className="py-4 px-6">
            <Link to={"create"}>Creat a new Course</Link>
          </Button>
        </div>
        <div className="mt-4">
          <Table>
          
            <TableHeader>
              <TableRow>
                <TableHead colSpan={3}>Title</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array(6)
                .fill()
                .map((_, i) => (
                  <TableRow key={i}>
                    <TableCell colSpan={3}>Introduction to Next.js</TableCell>
                    <TableCell>$500.00</TableCell>
                    <TableCell>Pending</TableCell>
                    <TableCell className="text-right ">
                      <Button>View</Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default AdminCoursePage;
