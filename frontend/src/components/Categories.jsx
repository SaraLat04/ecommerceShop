import { categories } from '../assets/data';

const Categories = ({ category, setCategory }) => {
  return (
    <section className='max-padd-container py-16 xl:py-20' id='shop'>
      <div className="flex items-start gap-6 justify-between flex-wrap">
        {categories.map((item) => (
          <div
            onClick={() => setCategory(prev => prev === item.name ? "All" : item.name)}
            id={item.name}
            key={item.name}
            className={`py-10 px-16 md:px-24 lg:px-32 flex-1 rounded-3xl text-center cursor-pointer ${category === item.name ? "bg-[#ffd873]" : "bg-primary"}`}
          >
            <div className="flex flex-col items-center justify-center">
              <img src={item.image} alt="categoryImg" className="h-16 w-16" />
              <h4 className='mt-6 medium-18'>{item.name}</h4>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Categories;


// import {categories} from '../assets/data'

// const Categories = ({category, setCategory}) => {
//   return (
//     <section className='max-padd-container py-16 xl:py-20' id='shop'>
//       <div className="flex items-start gap-6 flex-wrap">
//         {categories.map((item) => (
//           <div
//           onClick={()=> setCategory(prev=>prev===item.name?"All":item.name)}
//           id={item.name}
//           key={item.name}
//           className={`py-10 px-32 rounded-3xl text-center cursor-pointer ${category===item.name?"bg-[#ffd873]": "bg-primary"}`}
//           >
//             <img src={item.image} alt="categoryImg" height={44} width={44}/>
//             <h4 className='mt-6 medium-18'>{item.name}</h4>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }

// export default Categories;
