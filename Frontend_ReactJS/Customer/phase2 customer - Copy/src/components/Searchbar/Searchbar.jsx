import React from "react";
import ReactSearchBox from "react-search-box";
import "./Searchbar.scss"


const Searchbar = () => {
     
  return (
      <div className="Search">
     <ReactSearchBox
                placeholder="Search for product"
                data={[
                    {
                    key: "john",
                    value: "John Doe"
                    },
                    {
                    key: "mary",
                    value: "Mary Phillips"
                    },
                    {
                    key: "robert",
                    value: "Robert"
                    },
                    {
                    key: "karius",
                    value: "Karius"
                    }
                ]}
                // onSelect={(record: any) => console.log(record)}
                // onFocus={() => {
                //     console.log("This function is called when is focussed");
                // }}
                onChange={(value) => console.log(value)}
                autoFocus
                leftIcon={<></>}
                iconBoxSize="48px"
    />
    </div>
  )
}
export default Searchbar;





