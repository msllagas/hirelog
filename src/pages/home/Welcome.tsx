import { Button } from "@/components/ui/button.tsx";
import { NavLink } from "react-router";
import { Bookmark, Pen, TrendingUp } from "lucide-react";

export function Welcome() {
  return (
    <>
      <div className="relative mx-auto w-full max-w-full xl:max-w-[1400px]">
        <div className="bg-background sticky top-0">
          <nav className="py-5 xl:px-16">
            <div className="flex flex-row items-center justify-between">
              <div>
                <a href="">
                  <img
                    src="/src/assets/HireLog_Home.png"
                    alt="HireLog Logo"
                    className="h-[40px] w-auto"
                  />
                </a>
              </div>

              <div aria-label="Main navigation">
                <ul className="flex space-x-4 font-medium text-gray-600 xl:space-x-8">
                  <li>
                    <a
                      href="#"
                      className="transition-colors duration-200 hover:text-blue-500"
                    >
                      Features
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="transition-colors duration-200 hover:text-blue-500"
                    >
                      Blog
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="transition-colors duration-200 hover:text-blue-500"
                    >
                      Pricing
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="transition-colors duration-200 hover:text-blue-500"
                    >
                      Contact Us
                    </a>
                  </li>
                </ul>
              </div>

              <div className="font-inter flex items-center justify-center gap-4">
                <Button
                  className="bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 font-semibold transition hover:from-blue-800 hover:via-blue-700 hover:to-blue-600"
                  asChild
                >
                  <NavLink to="/signup">Sign Up</NavLink>
                </Button>
                <Button asChild variant="outline">
                  <NavLink to="/login">Log In</NavLink>
                </Button>
              </div>
            </div>
          </nav>
        </div>

        <div className="xl:px-16">
          <div className="py-10">
            <section className="flex">
              <div className="flex-1">
                <h1 className="font-semibold text-blue-900">
                  Job Application Tracker
                </h1>
                <h2 className="mt-2 mb-4 text-6xl leading-17 font-bold text-gray-800">
                  Track Applications. Land Your Job.
                </h2>
                <p className="mb-8 text-lg text-gray-500">
                  Stay organized, stay focused, and never lose sight of your
                  career opportunities with Hirelog.
                </p>
                <div className="mb-8">
                  <div className="mb-4 flex items-center gap-4">
                    <Bookmark className="h-5 w-5 text-amber-500" />
                    <div>
                      <div className="font-semibold text-gray-800">
                        Bookmark jobs as you go
                      </div>
                      <div className="text-sm text-gray-500">
                        Quickly update your jobs as your search progresses
                      </div>
                    </div>
                  </div>
                  <div className="mb-4 flex items-center gap-4">
                    <Pen className="h-5 w-5 text-blue-500" />
                    <div>
                      <div className="font-semibold text-gray-900">
                        Add your own job opportunities
                      </div>
                      <div className="text-sm text-gray-500">
                        Easily log openings you find anywhere
                      </div>
                    </div>
                  </div>
                  <div className="mb-4 flex items-center gap-4">
                    <TrendingUp className="h-5 w-5 text-green-500" />
                    <div>
                      <div className="font-semibold text-gray-900">
                        Track progress with insights
                      </div>
                      <div className="text-sm text-gray-500">
                        View application stats, response rates, and trends
                      </div>
                    </div>
                  </div>
                </div>
                <Button
                  className="transform bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 p-6 text-lg font-semibold transition duration-200 ease-out hover:scale-105 hover:from-blue-800 hover:via-blue-700 hover:to-blue-600 hover:shadow-lg"
                  asChild
                >
                  <NavLink to="/signup">Get Started - Free Forever</NavLink>
                </Button>
              </div>
              <div className="flex-1">
                image placeholder
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
