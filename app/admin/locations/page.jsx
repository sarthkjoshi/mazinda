import ManageLocations from "@/components/admin/locations/ManageLocations";
import AddLocation from "@/components/admin/locations/AddLocation";

const Locations = () => {
  return (
    <div className="flex">
      <div className="w-2/3">
        <ManageLocations />
      </div>

      <AddLocation />
    </div>
  );
};

export default Locations;
