import React from 'react';

const Color = (props) => {
    const {colorData, setColor} = props;
    console.log(colorData);
  return (
    <>
        <ul className="colors ps-5">
            {
                colorData && colorData?.map((item, index) => {
                    return (
                        <li onClick={() => setColor(item?._id)} style={{background: item?.title} }key={index}></li>
                    )})
            }
        </ul>
    </>
  );
};

export default Color;