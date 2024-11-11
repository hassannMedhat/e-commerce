import { assets } from "../assets/frontend_assets/assets";
import NewsLetterBox from "../components/NewsLetterBox";
import Title from "../components/Title";

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16 ">
        <img
          className="w-full md:max-w-[450px]"
          src={assets.about_img}
          alt=""
        />

        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus
            hic recusandae autem dolores ab officia, sint numquam sequi deserunt
            veritatis est, nesciunt distinctio cum exercitationem, placeat
            dignissimos corporis veniam voluptatem.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam
            molestias porro voluptate odit, accusamus cupiditate sequi ea
            consequatur cumque dignissimos id eius blanditiis obcaecati officia,
            dolor dolores temporibus iste molestiae.
          </p>
            <b className="text-gray-800">Our Mission</b>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt corrupti blanditiis officia excepturi unde dolorum, aspernatur alias vitae ex sed maxime porro quos ea dolor praesentium fuga ab voluptatibus ducimus.</p>
        </div>
      </div>
      <div className="text-xl py-4">
        <Title text1={'WHY'} text2={'CHOOSE US'} />
        <div className="flex flex-col md:flex-row text-sm mb-20">
          <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
            <b>Quality Assurance:</b>
            <p className="text-gray-600">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ab perferendis explicabo illum recusandae ipsum eveniet quisquam qui totam. Maiores adipisci incidunt perspiciatis repudiandae atque molestias architecto aut earum minus ipsa.</p>
          </div>
          <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
            <b>Convenience</b>
            <p className="text-gray-600">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ab perferendis explicabo illum recusandae ipsum eveniet quisquam qui totam. Maiores adipisci incidunt perspiciatis repudiandae atque molestias architecto aut earum minus ipsa.</p>
          </div>
          <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
            <b>Exceptional Customer Service:</b>
            <p className="text-gray-600">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ab perferendis explicabo illum recusandae ipsum eveniet quisquam qui totam. Maiores adipisci incidunt perspiciatis repudiandae atque molestias architecto aut earum minus ipsa.</p>
          </div>
        </div>
      </div>

      <NewsLetterBox />
    </div>
  );
};

export default About;
