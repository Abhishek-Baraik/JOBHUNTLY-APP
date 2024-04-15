import React from "react";

const Categories = () => {
  const categories = [
    {
      logo: "design.svg",
      title: "Design",
      jobs: 235,
    },
    {
      logo: "sales.svg",
      title: "Sales",
      jobs: 755,
    },
    {
      logo: "marketing.svg",
      title: "Marketing",
      jobs: 140,
    },
    {
      logo: "finance.svg",
      title: "Finance",
      jobs: 325,
    },
    {
      logo: "technology.svg",
      title: "Technology",
      jobs: 244,
    },
    {
      logo: "engineering.svg",
      title: "Engineering",
      jobs: 521,
    },
    {
      logo: "business.svg",
      title: "Business",
      jobs: 211,
    },
    {
      logo: "human-resources.svg",
      title: "Human Resource",
      jobs: 235,
    },
  ];
  return (
    <section className="w-full relative z-10 bg-white">
      <h3 className="md:text-[3rem] text-[2.2rem] font-bold w-full md:ml-4">
        Explore by <span className="text-[#22D3EE]">Category</span>
      </h3>
        <div className="grid md:grid-cols-4 gap-6 p-4 mt-4 relative">
        {categories.map((element)=>{
          return (
            <div className="card border-[1px] rounded-sm relative border-zinc-300 p-4 mb-4 flex md:flex-col md:items-start items-center justify-around md:p-8 ">
              <img src={element.logo} alt="" width={50}/>
              <div className="mt-2 mb-2">
                <h4 className="font-semibold text-2xl mb-2">{element.title}</h4>
                <h6>{element.jobs} Jobs Available</h6>
              </div>
              <img src="Arrow-left.svg" alt="" width={25} className="md:absolute md:bottom-9 md:left-[10.4rem] md:w-[25px] hover:cursor-pointer"/>
            </div>
          )
        })}
        </div>
    </section>
  );
};

export default Categories;
