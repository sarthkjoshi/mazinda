import { useState } from 'react';
import OrdersList from "@/components/utility/OrdersList";
import FoodOrdersList from "@/components/utility/FoodOrderList";
const OrdersTabs = ({filter}) => {
  const [activeTab, setActiveTab] = useState('myorders');
  
  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <>
      <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center" id="default-tab" role="tablist">
          <li className="me-2" role="presentation">
            <button
              className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === 'myorders' ? 'border-blue-600 text-blue-600' : 'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'}`}
              id="myorders-tab"
              type="button"
              role="tab"
              aria-controls="myorders"
              aria-selected={activeTab === 'myorders'}
              onClick={() => handleTabClick('myorders')}
            >
              My Orders
            </button>
          </li>
          <li className="me-2" role="presentation">
            <button
              className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === 'foodorders' ? 'border-blue-600 text-blue-600' : 'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'}`}
              id="foodorders-tab"
              type="button"
              role="tab"
              aria-controls="foodorders"
              aria-selected={activeTab === 'foodorders'}
              onClick={() => handleTabClick('foodorders')}
            >
              Food Orders
            </button>
          </li>
           
        </ul>
      </div>
      <div id="default-tab-content">
        <div className={`p-4 rounded-lg bg-gray-50 dark:bg-gray-800 ${activeTab === 'myorders' ? 'block' : 'hidden'}`} id="myorders" role="tabpanel" aria-labelledby="myorders-tab">
          <OrdersList filter={filter} />
        </div>
        <div className={`p-4 rounded-lg bg-gray-50 dark:bg-gray-800 ${activeTab === 'foodorders' ? 'block' : 'hidden'}`} id="foodorders" role="tabpanel" aria-labelledby="foodorders-tab">
          <FoodOrdersList filter={filter} />
        </div>
        
      </div>
    </>
  );
};

export default OrdersTabs;
