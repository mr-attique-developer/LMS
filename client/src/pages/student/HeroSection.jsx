import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
    const searchHandler = (e) => {
      e.preventDefault();
      if(searchQuery.trim() !== ""){
        navigate(`/course/search?query=${searchQuery}`)
      }
      setSearchQuery("");
    }
  return (
    <div className="flex justify-center items-center min-h-72 bg-blue-700 p-8 md:p-16">
      <div className="flex flex-col justify-center items-center w-full md:w-2/3 lg:w-1/2 text-center">
        <h1 className="text-2xl md:text-4xl text-white font-bold">Find the Best Course for You</h1>
        <p className="text-white mt-3 md:mt-5">Discover, Learn, Upskill with our wide range of courses</p>

        <form onSubmit={searchHandler} className="flex flex-col md:flex-row items-center justify-between w-full bg-white text-black rounded-full mt-6 md:mt-8">
          <input  value={searchQuery} onChange={(e)=> setSearchQuery(e.target.value)} type="text" placeholder="Search for Courses" className="p-3 bg-transparent outline-none w-full md:w-auto flex-grow rounded-t-full md:rounded-t-none md:rounded-l-full" />
          <Button type="submit" className="p-3 md:p-6 rounded-b-full md:rounded-b-none md:rounded-r-full w-full md:w-auto">Search</Button>
        </form>
        <div className="flex flex-col md:flex-row gap-4 mt-6 w-full md:w-auto">
          <Button  onClick={()=> navigate(`/course/search?query`)} className="bg-white text-blue-600  px-6 py-2 rounded-full w-full md:w-auto" variant="outline">Explore Courses</Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;