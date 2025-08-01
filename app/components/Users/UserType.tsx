import React, { FC, useState, memo } from "react";
import DropDownPicker from "react-native-dropdown-picker";

interface UserTypeDropdownProps {
  valueUser: string | null;
  items: { label: string; value: string }[];
  setValueUser: (value: string | null) => void;
}

const UserTypeDropdown: FC<UserTypeDropdownProps> = ({ valueUser, items, setValueUser }) => {
  const [open, setOpen] = useState(false);
  return (
    <DropDownPicker
      open={open}
      value={valueUser}
      items={items}
      setOpen={setOpen}
      setValue={(callback) => {
        const newValue = typeof callback === "function" ? callback(valueUser) : callback;
        setValueUser(newValue);
      }}
      listMode="MODAL"
      placeholder="All users"
      modalTitle="Select user"
      modalProps={{
        animationType: "slide",
        presentationStyle: "formSheet",
      }}
      style={{ width: "100%", borderRadius: 8, borderColor: "#999" }}
      dropDownContainerStyle={{
        width: "100%",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
      }}
    />
  );
};

export default memo(UserTypeDropdown);
