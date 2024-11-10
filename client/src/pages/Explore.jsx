import React from 'react'

const Explore = () => {
    const [isDropDownOpen, setIsDropDownOpen] = useState(false);

    const toggleDropDown = ()=>{
        setIsDropDownOpen(!isDropDownOpen);
    }
  return (
    <div className="relative inline-block text-left">
      <button 
        onClick={toggleDropdown} 
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none">
        Explore
      </button>

      {isDropdownOpen && (
        <div className="absolute mt-2 w-48 bg-white rounded-md shadow-lg z-10">
          <ul className="py-1 text-gray-700">
            <li className="hover:bg-gray-100 px-4 py-2 cursor-pointer">Option 1</li>
            <li className="hover:bg-gray-100 px-4 py-2 cursor-pointer">Option 2</li>
            <li className="hover:bg-gray-100 px-4 py-2 cursor-pointer">Option 3</li>
          </ul>
        </div>
      )}
    </div>
  )
}

export default Explore
