import Link from "next/link";

export default function Home() {
  return (
    <>
      <section className="bg-white text-black">
        <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-3xl font-extrabold">
              Welcome to Manolla 
            </h1>

            <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
              Welcome to  Manolla. Please login or register.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/login"
                className="block w-full rounded border border-black bg-black px-12 py-3 text-sm font-medium text-white hover:bg-white hover:text-black focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
              >
                Login
              </Link>

              <Link
                href="/signup"
                className="block w-full rounded border border-black px-12 py-3 text-sm font-medium text-black hover:bg-black hover:text-white focus:outline-none focus:ring active:bg-white sm:w-auto"
              >
                Signup
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
