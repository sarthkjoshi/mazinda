import AddCategory from "@/components/admin/categories/AddCategory";
import AvailableCategories from "@/components/admin/categories/AvailableCategories";

const Categories = () => {
  return (
    <div className="flex">
      <div className="w-3/4">
        <AvailableCategories />
      </div>
      <div className="w-1/4">
        <AddCategory />
      </div>
    </div>
  );
};

export default Categories;
