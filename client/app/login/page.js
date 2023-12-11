import LoginForm from "../../components/LoginForm";

export default function Login() {
  return (
    <>
      <section className="min-h-screen flex items-stretch text-black px-4 lg:px-0">
      <div
          className="lg:flex w-1/2 hidden bg-white bg-no-repeat bg-cover relative items-center"
          
        >
          <div className="absolute bg-white opacity-60 inset-0 z-0"></div>
          <div className="w-full px-24 z-10">
            <h1 className="text-[100px] font-bold text-left tracking-wide text-black">Manolla</h1>
            <p className="text-3xl  text-black">Login for discover</p>
          </div>
        </div>
        <div
          className="lg:w-1/2 w-full flex items-center justify-center text-center md:px-16 px-0 z-0"
          style={{ backgroundColor: "white" }}
        >
          <div
            className="absolute lg:hidden z-10 inset-0 bg-black bg-no-repeat bg-cover items-center"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1577495508048-b635879837f1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80)",
            }}
          >
            <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
          </div>
          <div className="w-full py-6 z-20">
            <h1 className="my-6 text-5xl font-bold">Login</h1>
            <LoginForm />
          </div>
        </div>
      </section>
    </>
  );
}
