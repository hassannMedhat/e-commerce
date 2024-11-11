import { Link } from "react-router-dom"
import { assets } from "../assets/frontend_assets/assets"


const Footer = () => {
  return (
      <div>
          <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
              

              <div>
                  <img src={assets.logo} className="mb-5 w-32 " alt="" />
                  <p className="w-full md:w-2/3 text-gray-600">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, nisi. Quam placeat rem fugiat quia totam quod eos asperiores, doloribus, accusantium quo iure nisi ex iusto eveniet itaque? Doloribus, eaque.
                  </p>
              </div>

              <div>
                  <p className="text-xl font-medium mb-5">COMPANY</p>
                  <ul className="flex flex-col gap-1 text-gray-600">
                      <li><Link to={'/'}>Home</Link></li>
                      <li><Link to={'/about'}>About us </Link></li>
                      {/* //!               Remember to add <Link> to 'Careers'                             */}
                      <li>Careers</li>
                      <li><Link to={'/contact'}>Contact Us</Link></li>
                  </ul>
              </div>

              
              <div>
                  <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
                  <ul className="flex flex-col gap-1 text-gray-600">
                      <li>+1234567890</li>
                      <li>info@company.com</li>
                  </ul>
              </div>

              </div>
              <div>
                  <hr />
                  <p className="py-5 text-sm text-center">Copyright 2024@ kimit.com -  All Right Reserved.</p>

              </div>



          
    </div>
  )
}

export default Footer