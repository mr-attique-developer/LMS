import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetPurchasedCoursesQuery } from "@/features/api/coursePurchaseApi";
import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const Dashboard = () => {

  const { data, isSuccess, isError, isLoading } = useGetPurchasedCoursesQuery();

  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1 className="text-red-500">Failed to get purchased course</h1>;
  
  // Ensure data is structured properly
  const purchaseCourse = data?.purchaseCourse ?? [];
  
  // Validate and filter course data
  const courseData = purchaseCourse
    .filter(course => course.courseId && course.courseId.title && course.courseId.price)
    .map(course => ({
      name: course.courseId.title || "Unknown Course",
      price: Number(course.courseId.price) || 0
    }));
  
    
  console.log("Course Data:", courseData); // Debugging
  
  const totalRevenue = purchaseCourse.reduce((acc, element) => acc + (element.amount || 0), 0);
  const totalSales = purchaseCourse.length;
  
  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader>
          <CardTitle>Total Sales</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold text-blue-600">{totalSales}</p>
        </CardContent>
      </Card>
  
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader>
          <CardTitle>Total Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold text-blue-600">{totalRevenue.toFixed(2)}</p>
        </CardContent>
      </Card>
  
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-700">
            Course Prices
          </CardTitle>
        </CardHeader>
        <CardContent>
          {courseData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300} minWidth={200} minHeight={200}>
              <LineChart data={courseData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis
                  dataKey="name"
                  stroke="#6b7280"
                  angle={-30}
                  textAnchor="end"
                  interval={0}
                />
                <YAxis stroke="#6b7280" />
                <Tooltip formatter={(value, name) => [`₹${value}`, name]} />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#4a90e2"
                  strokeWidth={3}
                  dot={{ stroke: "#4a90e2", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-500 text-center">No course data available</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
  
};

export default Dashboard;