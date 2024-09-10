import logo from "../assets/logoo.png"
import profile from "../assets/profilee.png"

const Navbar = () => {
  return (
    <div className="max-padd-container flexBetween py-2">
      {/* <img src={logo} alt="logoIcon" height={155} width={155}/> */}
      <div className="nav-logo">
        <img src={logo} alt="" className="logo-img"/>
        <p>SHOPPER</p>
      </div>
      <div className="hidden sm:flex uppercase bold-22 text-white bg-secondary px-3 rounded-md tracking-widest line-clamp-1 max-xs:bold-18 max-xs:py-2 max-xs:px-1">Admin Panel</div>
      <img src={profile} alt="profileImg" height={46} width={46} className="rounded-full"/>
    </div>
  );
}

export default Navbar;
