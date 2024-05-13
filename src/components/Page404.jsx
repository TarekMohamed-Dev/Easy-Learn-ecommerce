import { Link } from 'react-router-dom';

function Page404() {
  return (
    <section className="page_404 bg-white font-serif h-[100vh]">
      <div className="container mx-auto h-[100vh]">
        <div className="flex justify-center my-12">
          <div className="flex flex-col items-center">
            <div
              className="bg-cover bg-center h-96 w-full flex justify-center items-center"
              style={{ backgroundImage: `url('https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif')` }}
            >
              <h1 className="text-center text-9xl text-black">404</h1>
            </div>
            <div className="contant_box_404 mt-10">
              <h3 className="text-4xl">Look like you're lost</h3>
              <p className="text-xl">The page you are looking for is not available!</p>
              <Link to="/" className="link_404 inline-block bg-theme-color text-white py-2 px-4 mt-4 rounded-lg">
                Go to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Page404;
