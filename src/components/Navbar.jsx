import { navOther } from "../constants";

// eslint-disable-next-line react/prop-types
const Navbar = ({ setFilter }) => {
  return (
    <div className="hidden lg:block mt-10">
      <div className="container px-4 md:px-16">
        <div className="flex w-fit gap-6 md:gap-8 mx-auto font-medium text-sm md:text-base py-3 text-black items-center bg-white/70 backdrop-blur rounded-full px-4 shadow-sm border border-gray-100">
          {/* Category Buttons */}
          <button
            onClick={() => setFilter("All")}
            className="px-3 py-1 rounded-full hover:text-primary hover:bg-primary/10 transition uppercase"
          >
            All
          </button>
          <button
            onClick={() => setFilter("Hot")}
            className="px-3 py-1 rounded-full hover:text-primary hover:bg-primary/10 transition uppercase"
          >
            Hot
          </button>
          <button
            onClick={() => setFilter("Health")}
            className="px-3 py-1 rounded-full hover:text-primary hover:bg-primary/10 transition uppercase"
          >
            Health
          </button>
          <button
            onClick={() => setFilter("Pets")}
            className="px-3 py-1 rounded-full hover:text-primary hover:bg-primary/10 transition uppercase"
          >
            Pets
          </button>
          <button
            onClick={() => setFilter("Men")}
            className="px-3 py-1 rounded-full hover:text-primary hover:bg-primary/10 transition uppercase"
          >
            Men
          </button>
          <button
            onClick={() => setFilter("Women")}
            className="px-3 py-1 rounded-full hover:text-primary hover:bg-primary/10 transition uppercase"
          >
            Women
          </button>

          {/* navOther Buttons */}
          {navOther.map((other) => (
            <button
              key={other.label}
              onClick={() => setFilter(other.label)}
              className="uppercase px-4 py-2 rounded-full bg-primary text-white hover:bg-secondary hover:text-white transition"
            >
              {other.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
