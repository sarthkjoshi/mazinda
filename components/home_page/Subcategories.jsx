import React from 'react';
import Link from 'next/link'

const data = [
  {
    _id: 1,
    name: 'Electronics',
    imageUri: 'https://5.imimg.com/data5/NN/SE/OX/SELLER-11524350/mahadev-gift-and-stationary-vadgoan-belgaum-belgaum-wnsxb.jpg'
  },
  {
    _id: 2,
    name: 'Grocery',
    imageUri: 'https://media.istockphoto.com/id/164981421/photo/large-group-of-food-shoot-on-white-backdrop.jpg?s=612x612&w=0&k=20&c=S3UjegrKBG-HyZdYQmOeBCk1Cfk7C7XZrUGb0n56Gy8='
  },
  {
    _id: 3,
    name: 'Footwear',
    imageUri: 'https://images.hindustantimes.com/img/2022/12/22/1600x900/istockphoto-1279108197-170667a_1671687926903_1671687937504_1671687937504.jpg'
  },
  {
    _id: 4,
    name: 'Electronics',
    imageUri: 'https://img1.wsimg.com/isteam/ip/119e2d1b-0ed9-4a03-a51a-334684501753/news12_5.jpg/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=h:1000,cg:true'
  },
];

const renderSubcategory = ({ item }) => {
    return (
        <div className="overflow-hidden border relative h-[150px] md:h-[300px]">
          <img
            src={item.imageUri}
            alt={item.name}
            className="border-gray-300 border-1 object-cover w-full h-full" 
          />
          <div className="absolute bottom-0 left-0 bg-black w-full h-30 opacity-50 flex items-center md:py-2">
            <span className="text-white font-bold text-left ml-2">View More {' >'}</span>
          </div>
        </div>
      );
};

const Subcategories = () => {
  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">What are you looking for?</h1>
        <Link className="text-md underline mr-2" href={'/user/browse-categories'}>View All</Link>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-2">
        {data.map((item) => (
          <React.Fragment key={item._id}>{renderSubcategory({ item })}</React.Fragment>
        ))}
      </div>
    </>
  );
};

export default Subcategories;
