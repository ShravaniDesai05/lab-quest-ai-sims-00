
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FlaskConical } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-gray-50 p-4">
      <div className="text-center max-w-md">
        <div className="mb-6 mx-auto w-24 h-24 rounded-full bg-blue-50 flex items-center justify-center animate-float">
          <FlaskConical className="h-12 w-12 text-lab-blue" />
        </div>
        <h1 className="text-4xl font-bold mb-2 text-gray-900">404</h1>
        <p className="text-xl text-gray-600 mb-6">Experiment Not Found</p>
        <p className="text-gray-600 mb-8">
          Oops! It seems this experiment is still being developed in our laboratory.
        </p>
        <Button asChild>
          <Link to="/" className="flex items-center justify-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return to Laboratory
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
