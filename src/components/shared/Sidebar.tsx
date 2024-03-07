import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '@/lib/redux/reducers.js';




const Sidebar = () => {

  const dispatch = useDispatch();
  const [selectedValue, setSelectedValue] = useState('');

  const handleSelectChange = (value: string) => {
    setSelectedValue(value);
    dispatch(setFilter(value))
    console.log('Selected Value:', value);
  };
 



  return (
    <div className="w-full flex bg-dark-3 my-2 p-3 gap-5">
      <button type="button">
        <img src="/assets/icons/filter.svg" alt="" />
      </button>
      <Select value={selectedValue} onValueChange={handleSelectChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="user" className="bg-dark-3">User</SelectItem>
          <SelectItem value="date"  className="bg-dark-3">Date</SelectItem>
          <SelectItem value="likes" className="bg-dark-3" >Likes</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Sidebar;
