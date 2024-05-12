import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";

const MainContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  const { pathname } = useRouter();  

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Web site created using create-next-app"
        />
        <title>Next App</title>
      </Head>
      <div className="page">
        <header className="header">
          <div className='header-container'>
              <Link 
                href={"/"} 
                className={pathname === "/" ? "header-cats header-active" : "header-cats"}>
                  Main page
              </Link>
              <Link 
                href={"/cats"} 
                className={pathname === "/cats" ? "header-cats header-active" : "header-cats"}>
                  All cats
              </Link>
            </div>  
        </header>
        <div>{children}</div>
      </div>
    </>
  )
};

export default MainContainer;
