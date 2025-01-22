import { Button } from "@/components/ui/button";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetCreaterCoursesQuery } from "@/features/api/courseApi";
import { Badge } from "@/components/ui/badge";
import { Edit, Loader2 } from "lucide-react";

const AdminCoursePage = () => {

  const navigate = useNavigate()

  const {data , isLoading , refetch,error, isSuccess} = useGetCreaterCoursesQuery()

  console.log(data)
useEffect(()=>{
  refetch()
},[isSuccess, error , isLoading])

  if(isLoading) return <div>Loading...</div>
  return (
    <>
      <div className="md:p-16 p-2 mt-4 w-full ">
        <div>
        <Link to={"create"}>
          <Button className="py-4 px-6">
           Creat a new Course
          </Button>
           </Link>
        </div>
        <div className="mt-4">
          <Table className="overflow-x-auto">
            <TableHeader>
              <TableRow>
                <TableHead colSpan={3}>Title</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.courses
                .map((course) => (
                  <TableRow key={course._id}>
                    <TableCell colSpan={3}>{course.title}</TableCell>
                    <TableCell>{course.price || "NA"}</TableCell>
                    <TableCell><Badge className={"py-2 px-4"}>{course.isPublished ? "Published" : "Draft"}</Badge></TableCell>
                    <TableCell className="text-right ">
                      <Button onClick={()=> navigate(course._id)}><Edit/></Button>
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
